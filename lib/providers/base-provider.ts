import { detectSupportedPlatform, normalizeInputUrl, type SupportedPlatform } from "@/lib/platform";
import type {
  DownloadProvider,
  ProviderAnalyzeResult,
  ProviderContext
} from "@/lib/providers/provider.types";

export abstract class BaseProvider implements DownloadProvider {
  abstract key: string;
  abstract platform: SupportedPlatform;
  abstract analyze(url: string, context: ProviderContext): Promise<ProviderAnalyzeResult>;

  canHandle(url: string): boolean {
    return detectSupportedPlatform(url) === this.platform;
  }

  normalizeUrl(url: string): string {
    return normalizeInputUrl(url);
  }
}
