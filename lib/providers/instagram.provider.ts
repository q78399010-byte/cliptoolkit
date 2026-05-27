import { BaseProvider, normalizeProviderError, ProviderError } from "@/lib/providers/base-provider";
import {
  asNumber,
  asRecord,
  asString,
  compactUrl,
  getLdJsonObjects,
  getMetaContent,
  getScriptJsonById,
  walkRecords
} from "@/lib/providers/html";
import type { DownloadUrl, ProviderAnalyzeResult, ProviderContext } from "@/lib/providers/provider.types";

type InstagramMedia = {
  title?: string | null;
  thumbnail?: string | null;
  duration?: number | null;
  videoUrl?: string | null;
  audioUrl?: string | null;
};

type IgramApiResponse = {
  status?: boolean;
  message?: string;
  data?: Array<{
    url?: string;
    thumbnail?: string;
    type?: string;
  }>;
};

function pickText(value: unknown) {
  if (typeof value === "string") {
    return value.trim() || null;
  }

  const record = asRecord(value);
  const edges = Array.isArray(record?.edges) ? record.edges : null;
  const firstNode = asRecord(asRecord(edges?.[0])?.node);

  return asString(firstNode?.text);
}

function secondsFromIsoDuration(value: string | null) {
  if (!value) {
    return null;
  }

  const match = value.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?$/i);

  if (!match) {
    return null;
  }

  return (
    Number(match[1] ?? 0) * 3600 +
    Number(match[2] ?? 0) * 60 +
    Number(match[3] ?? 0)
  );
}

function mediaFromRecord(record: Record<string, unknown>): InstagramMedia | null {
  const videoUrl = compactUrl(record.video_url) ?? compactUrl(record.videoUrl);
  const thumbnail =
    compactUrl(record.display_url) ??
    compactUrl(record.displayUrl) ??
    compactUrl(record.thumbnail_src) ??
    compactUrl(record.thumbnailUrl);
  const title =
    pickText(record.edge_media_to_caption) ??
    asString(record.caption) ??
    asString(record.title) ??
    asString(record.description);
  const duration =
    asNumber(record.video_duration) ??
    asNumber(record.duration) ??
    secondsFromIsoDuration(asString(record.duration));

  if (!videoUrl && !thumbnail) {
    return null;
  }

  return {
    title,
    thumbnail,
    duration,
    videoUrl,
    audioUrl: compactUrl(record.audio_url)
  };
}

function findInstagramMedia(json: unknown) {
  let found: InstagramMedia | null = null;

  walkRecords(json, (record) => {
    const item = mediaFromRecord(record);

    if (item?.videoUrl) {
      found = item;
      return true;
    }

    return false;
  });

  return found;
}

function parseStructuredData(html: string) {
  for (const item of getLdJsonObjects(html)) {
    const items = Array.isArray(item) ? item : [item];

    for (const entry of items) {
      const record = asRecord(entry);

      if (!record) {
        continue;
      }

      const videoUrl =
        compactUrl(record.contentUrl) ??
        compactUrl(record.embedUrl) ??
        compactUrl(record.url);
      const thumbnailValue = record.thumbnailUrl;
      const thumbnail = Array.isArray(thumbnailValue)
        ? compactUrl(thumbnailValue[0])
        : compactUrl(thumbnailValue);

      if (videoUrl || thumbnail) {
        return {
          title: asString(record.name) ?? asString(record.caption) ?? asString(record.description),
          thumbnail,
          duration: secondsFromIsoDuration(asString(record.duration)),
          videoUrl,
          audioUrl: null
        } satisfies InstagramMedia;
      }
    }
  }

  return null;
}

function parseJsonFromHtml(html: string) {
  const candidates = [
    getScriptJsonById(html, "__NEXT_DATA__"),
    getScriptJsonById(html, "__additionalDataLoaded")
  ].filter(Boolean);

  for (const candidate of candidates) {
    const item = findInstagramMedia(candidate);

    if (item) {
      return item;
    }
  }

  const sharedData = html.match(/window\._sharedData\s*=\s*({[\s\S]*?});<\/script>/);

  if (sharedData?.[1]) {
    try {
      const item = findInstagramMedia(JSON.parse(sharedData[1]));

      if (item) {
        return item;
      }
    } catch {
      return null;
    }
  }

  const additionalDataPattern = /__additionalDataLoaded\([^,]+,\s*({[\s\S]*?})\s*\);/g;
  let match: RegExpExecArray | null;

  while ((match = additionalDataPattern.exec(html))) {
    try {
      const item = findInstagramMedia(JSON.parse(match[1]));

      if (item) {
        return item;
      }
    } catch {
      // Continue scanning for the next data block.
    }
  }

  return null;
}

async function fetchIgramFallback(url: string, timeoutMs: number): Promise<InstagramMedia | null> {
  const endpoint = process.env.INSTAGRAM_FALLBACK_API_URL;

  if (!endpoint) {
    return null;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${endpoint}?url=${encodeURIComponent(url)}`, {
      cache: "no-store",
      signal: controller.signal,
      headers: {
        accept: "application/json",
        referer: "https://igram.site/",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
      }
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as IgramApiResponse;

    if (!payload.status || !Array.isArray(payload.data)) {
      return null;
    }

    const video =
      payload.data.find((item) => item.type === "video" && item.url) ??
      payload.data.find((item) => item.url);

    if (!video?.url) {
      return null;
    }

    return {
      title: "Instagram video",
      thumbnail: video.thumbnail ?? null,
      duration: null,
      videoUrl: video.url,
      audioUrl: null
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export class InstagramProvider extends BaseProvider {
  key = "instagram-web";
  platform = "instagram" as const;

  protected getFetchHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      ...super.getFetchHeaders()
    } as Record<string, string>;
    const appId = process.env.INSTAGRAM_APP_ID;
    const cookie = process.env.INSTAGRAM_COOKIE;

    if (appId) {
      headers["x-ig-app-id"] = appId;
    }

    if (cookie) {
      headers.cookie = cookie;
    }

    return headers;
  }

  async analyze(url: string, context?: Partial<ProviderContext>): Promise<ProviderAnalyzeResult> {
    let normalizedUrl = url;

    try {
      normalizedUrl = this.normalizeUrl(url);
      const { finalUrl, html } = await this.fetchText(normalizedUrl, context);
      const finalNormalizedUrl = this.normalizeUrl(finalUrl);
      let parsed: InstagramMedia | null = parseJsonFromHtml(html) ?? parseStructuredData(html);
      let ogVideo =
        getMetaContent(html, "og:video") ??
        getMetaContent(html, "og:video:url") ??
        getMetaContent(html, "og:video:secure_url");
      let ogImage = getMetaContent(html, "og:image");
      let ogTitle = getMetaContent(html, "og:title");

      if (!parsed?.videoUrl && !ogVideo) {
        const embedUrl = `${finalNormalizedUrl.replace(/\/$/, "")}/embed/`;
        const embed = await this.fetchText(embedUrl, context);
        parsed = parseJsonFromHtml(embed.html) ?? parseStructuredData(embed.html) ?? parsed;
        ogVideo =
          getMetaContent(embed.html, "og:video") ??
          getMetaContent(embed.html, "og:video:url") ??
          getMetaContent(embed.html, "og:video:secure_url") ??
          ogVideo;
        ogImage = getMetaContent(embed.html, "og:image") ?? ogImage;
        ogTitle = getMetaContent(embed.html, "og:title") ?? ogTitle;
      }

      if (!parsed?.videoUrl && !ogVideo) {
        parsed = (await fetchIgramFallback(finalNormalizedUrl, context?.timeoutMs ?? 12000)) ?? parsed;
      }

      const videoUrl = parsed?.videoUrl ?? ogVideo;

      if (!videoUrl) {
        throw new ProviderError(
          "NO_DOWNLOAD_URL",
          "Instagram did not expose a downloadable video URL for this public link."
        );
      }

      const downloadUrls: DownloadUrl[] = [
        {
          url: videoUrl,
          type: "video",
          quality: "source",
          format: "mp4",
          label: "Download video"
        }
      ];

      return {
        title: parsed?.title ?? ogTitle ?? "Instagram video",
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
