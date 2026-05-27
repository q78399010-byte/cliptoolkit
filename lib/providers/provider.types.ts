import type { SupportedPlatform } from "@/lib/platform";

export type ProviderStatus = "success" | "failed";

export type ProviderErrorCode =
  | "UNSUPPORTED_URL"
  | "INVALID_URL"
  | "NOT_FOUND"
  | "TIMEOUT"
  | "PROVIDER_DOWN"
  | "PARSE_FAILED"
  | "NO_DOWNLOAD_URL";

export type DownloadUrl = {
  url: string;
  type: "video" | "audio";
  quality?: string;
  format?: string;
  label?: string;
};

export type ProviderAnalyzeResult = {
  title: string | null;
  thumbnail: string | null;
  duration: number | null;
  downloadUrls: DownloadUrl[];
  audioUrl: string | null;
  platform: SupportedPlatform;
  status: ProviderStatus;
  error?: string;
  errorCode?: ProviderErrorCode;
  sourceUrl: string;
  normalizedUrl: string;
  providerKey: string;
  cacheHit?: boolean;
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
  analyze(url: string, context?: Partial<ProviderContext>): Promise<ProviderAnalyzeResult>;
  download(url: string, context?: Partial<ProviderContext>): Promise<ProviderAnalyzeResult>;
}
