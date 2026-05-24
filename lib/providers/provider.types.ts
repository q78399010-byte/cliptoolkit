import type { SupportedPlatform } from "@/lib/platform";

export type ProviderAssetType = "video" | "cover" | "audio";

export type ProviderAsset = {
  type: ProviderAssetType;
  url: string;
  format: "mp4" | "jpg" | "webp" | "mp3";
  quality?: string;
  filesize?: number;
};

export type ProviderAnalyzeResult = {
  platform: SupportedPlatform;
  sourceUrl: string;
  normalizedUrl: string;
  title?: string;
  duration?: number;
  thumbnailUrl?: string;
  assets: ProviderAsset[];
  providerKey: string;
};

export type ProviderContext = {
  apiKey?: string;
  timeoutMs: number;
};

export interface DownloadProvider {
  key: string;
  platform: SupportedPlatform;
  canHandle(url: string): boolean;
  normalizeUrl(url: string): string;
  analyze(url: string, context: ProviderContext): Promise<ProviderAnalyzeResult>;
}
