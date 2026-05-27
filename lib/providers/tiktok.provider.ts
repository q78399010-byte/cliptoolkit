import { BaseProvider, normalizeProviderError, ProviderError } from "@/lib/providers/base-provider";
import {
  asNumber,
  asRecord,
  asString,
  compactUrl,
  getMetaContent,
  getScriptJsonById,
  walkRecords
} from "@/lib/providers/html";
import type { DownloadUrl, ProviderAnalyzeResult, ProviderContext } from "@/lib/providers/provider.types";

type TikTokItem = {
  title?: string | null;
  thumbnail?: string | null;
  duration?: number | null;
  videoUrls: DownloadUrl[];
  audioUrl?: string | null;
};

function firstUrl(...values: unknown[]) {
  for (const value of values) {
    if (Array.isArray(value)) {
      const found = value.map(compactUrl).find(Boolean);

      if (found) {
        return found;
      }
      continue;
    }

    const url = compactUrl(value);

    if (url) {
      return url;
    }
  }

  return null;
}

function itemFromRecord(record: Record<string, unknown>): TikTokItem | null {
  const video = asRecord(record.video);
  const music = asRecord(record.music);
  const stats = asRecord(record.stats);
  const author = asRecord(record.author);

  if (!video) {
    return null;
  }

  const downloadAddr = firstUrl(video.downloadAddr, video.downloadUrl);
  const playAddr = firstUrl(video.playAddr, video.playApi, video.playUrl);
  const thumbnail = firstUrl(video.cover, video.originCover, video.dynamicCover, record.thumbnail);
  const audioUrl = firstUrl(music?.playUrl, music?.play_url);
  const duration = asNumber(video.duration) ?? asNumber(record.duration);
  const title =
    asString(record.desc) ??
    asString(record.title) ??
    asString(music?.title) ??
    asString(author?.nickname) ??
    null;
  const videoUrls: DownloadUrl[] = [];

  if (downloadAddr) {
    videoUrls.push({
      url: downloadAddr,
      type: "video",
      quality: "source",
      format: "mp4",
      label: "Download video"
    });
  }

  if (playAddr && playAddr !== downloadAddr) {
    videoUrls.push({
      url: playAddr,
      type: "video",
      quality: "preview",
      format: "mp4",
      label: "Video stream"
    });
  }

  if (!videoUrls.length && !thumbnail && !audioUrl && !stats) {
    return null;
  }

  return {
    title,
    thumbnail,
    duration,
    videoUrls,
    audioUrl
  };
}

function findTikTokItem(json: unknown): TikTokItem | null {
  let found: TikTokItem | null = null;

  walkRecords(json, (record) => {
    const item = itemFromRecord(record);

    if (item?.videoUrls.length) {
      found = item;
      return true;
    }

    return false;
  });

  return found;
}

function parseJsonFromHtml(html: string) {
  const candidates = [
    getScriptJsonById(html, "SIGI_STATE"),
    getScriptJsonById(html, "__UNIVERSAL_DATA_FOR_REHYDRATION__"),
    getScriptJsonById(html, "__NEXT_DATA__")
  ].filter(Boolean);

  for (const candidate of candidates) {
    const item = findTikTokItem(candidate);

    if (item) {
      return item;
    }
  }

  return null;
}

function uniqueDownloadUrls(urls: DownloadUrl[]) {
  const seen = new Set<string>();
  return urls.filter((item) => {
    if (seen.has(item.url)) {
      return false;
    }

    seen.add(item.url);
    return true;
  });
}

export class TikTokProvider extends BaseProvider {
  key = "tiktok-web";
  platform = "tiktok" as const;

  async analyze(url: string, context?: Partial<ProviderContext>): Promise<ProviderAnalyzeResult> {
    let normalizedUrl = url;

    try {
      normalizedUrl = this.normalizeUrl(url);
      const { finalUrl, html } = await this.fetchText(normalizedUrl, context);
      const finalNormalizedUrl = this.normalizeUrl(finalUrl);
      const parsed = parseJsonFromHtml(html);
      const ogVideo = getMetaContent(html, "og:video") ?? getMetaContent(html, "og:video:url");
      const ogImage = getMetaContent(html, "og:image");
      const ogTitle = getMetaContent(html, "og:title");

      const downloadUrls = uniqueDownloadUrls([
        ...(parsed?.videoUrls ?? []),
        ...(ogVideo
          ? [
              {
                url: ogVideo,
                type: "video" as const,
                quality: "source",
                format: "mp4",
                label: "Download video"
              }
            ]
          : [])
      ]);

      if (!downloadUrls.length) {
        throw new ProviderError(
          "NO_DOWNLOAD_URL",
          "TikTok did not expose a downloadable video URL for this link."
        );
      }

      return {
        title: parsed?.title ?? ogTitle ?? "TikTok video",
        thumbnail: parsed?.thumbnail ?? ogImage,
        duration: parsed?.duration ?? null,
        downloadUrls,
        audioUrl: parsed?.audioUrl ?? null,
        platform: this.platform,
        status: "success",
        sourceUrl: url,
        normalizedUrl: finalNormalizedUrl,
        providerKey: this.key
      };
    } catch (error) {
      const providerError = normalizeProviderError(error);
      return this.failedResult(url, normalizedUrl, providerError.code, providerError.message);
    }
  }
}
