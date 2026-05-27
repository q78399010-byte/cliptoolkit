import "server-only";
import { getCacheStore } from "@/lib/cache/cache";
import { getRequestAnalyticsContext, recordAnalyticsEvent } from "@/lib/db/analytics";
import { createDownloadTask } from "@/lib/db/downloads";
import { detectSupportedPlatform } from "@/lib/platform";
import { getDefaultProvider } from "@/lib/providers/provider-registry";
import type { ProviderAnalyzeResult } from "@/lib/providers/provider.types";
import { checkRateLimit } from "@/lib/rate-limit/memory";

export type AnalyzeServiceResult = ProviderAnalyzeResult & {
  taskId?: string;
  rateLimit?: {
    remaining: number;
    resetAt: number;
  };
};

function getAnalyzeCacheTtl() {
  const value = Number(process.env.DOWNLOAD_CACHE_TTL_SECONDS ?? 604800);
  return Number.isFinite(value) && value > 0 ? value : 604800;
}

function getRateLimitPerHour() {
  const value = Number(process.env.RATE_LIMIT_PER_HOUR ?? 80);
  return Number.isFinite(value) && value > 0 ? value : 80;
}

function clientKey(ip: string | null | undefined) {
  return ip || "unknown-client";
}

function primaryVideoUrl(result: ProviderAnalyzeResult) {
  return result.downloadUrls.find((item) => item.type === "video")?.url ?? null;
}

export async function analyzeUrl(url: string): Promise<AnalyzeServiceResult> {
  const rawUrl = String(url ?? "").trim();
  const context = await getRequestAnalyticsContext();
  const limit = checkRateLimit({
    key: `analyze:${clientKey(context.ip)}`,
    limit: getRateLimitPerHour(),
    windowMs: 60 * 60 * 1000
  });

  if (!limit.allowed) {
    return {
      title: null,
      thumbnail: null,
      duration: null,
      downloadUrls: [],
      audioUrl: null,
      platform: "tiktok",
      status: "failed",
      error: "Too many requests. Please wait before trying again.",
      errorCode: "PROVIDER_DOWN",
      sourceUrl: rawUrl,
      normalizedUrl: rawUrl,
      providerKey: "rate-limit",
      rateLimit: {
        remaining: limit.remaining,
        resetAt: limit.resetAt
      }
    };
  }

  const platform = detectSupportedPlatform(rawUrl);

  if (!rawUrl || !platform) {
    return {
      title: null,
      thumbnail: null,
      duration: null,
      downloadUrls: [],
      audioUrl: null,
      platform: "tiktok",
      status: "failed",
      error: "Paste a valid TikTok or Instagram Reels link.",
      errorCode: "UNSUPPORTED_URL",
      sourceUrl: rawUrl,
      normalizedUrl: rawUrl,
      providerKey: "registry",
      rateLimit: {
        remaining: limit.remaining,
        resetAt: limit.resetAt
      }
    };
  }

  const provider = getDefaultProvider(platform);

  if (!provider) {
    return {
      title: null,
      thumbnail: null,
      duration: null,
      downloadUrls: [],
      audioUrl: null,
      platform,
      status: "failed",
      error: "No provider is configured for this platform.",
      errorCode: "PROVIDER_DOWN",
      sourceUrl: rawUrl,
      normalizedUrl: rawUrl,
      providerKey: "registry",
      rateLimit: {
        remaining: limit.remaining,
        resetAt: limit.resetAt
      }
    };
  }

  let normalizedUrl: string;

  try {
    normalizedUrl = provider.normalizeUrl(rawUrl);
  } catch {
    normalizedUrl = rawUrl;
  }

  const cache = getCacheStore();
  const cacheKey = `analyze:${provider.key}:${normalizedUrl}`;
  const cached = await cache.get<ProviderAnalyzeResult>(cacheKey);
  const startedAt = Date.now();
  const result = cached
    ? {
        ...cached,
        cacheHit: true
      }
    : await provider.analyze(normalizedUrl, {
        timeoutMs: 12000
      });
  const responseTime = Date.now() - startedAt;

  if (!cached && result.status === "success") {
    await cache.set(cacheKey, result, getAnalyzeCacheTtl());
  }

  const taskId = await createDownloadTask({
    url: rawUrl,
    normalizedUrl: result.normalizedUrl || normalizedUrl,
    platform,
    provider: provider.key,
    status: result.status === "success" ? "success" : "failed",
    cacheHit: Boolean(cached),
    responseTime,
    ip: context.ip,
    country: context.country,
    device: context.device,
    userAgent: context.userAgent,
    referrer: context.referrer,
    title: result.title,
    thumbnailUrl: result.thumbnail,
    videoUrl: primaryVideoUrl(result),
    coverUrl: result.thumbnail,
    audioUrl: result.audioUrl,
    reason: result.error ?? null,
    errorCode: result.errorCode ?? null,
    metadata: {
      day: "day3",
      providerKey: provider.key,
      downloadUrls: result.downloadUrls,
      cacheHit: Boolean(cached)
    }
  });

  await recordAnalyticsEvent({
    eventName: result.status === "success" ? "download_success" : "download_failed",
    pagePath: "/api/analyze",
    platform,
    ip: context.ip,
    country: context.country ?? undefined,
    device: context.device,
    referrer: context.referrer ?? undefined,
    metadata: {
      taskId,
      provider: provider.key,
      cacheHit: Boolean(cached),
      errorCode: result.errorCode ?? null
    }
  });

  return {
    ...result,
    taskId,
    rateLimit: {
      remaining: limit.remaining,
      resetAt: limit.resetAt
    }
  };
}
