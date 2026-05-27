import { detectSupportedPlatform, normalizeInputUrl, type SupportedPlatform } from "@/lib/platform";
import type {
  DownloadProvider,
  ProviderAnalyzeResult,
  ProviderContext,
  ProviderErrorCode
} from "@/lib/providers/provider.types";

const defaultTimeoutMs = 12000;

export class ProviderError extends Error {
  code: ProviderErrorCode;
  statusCode: number;

  constructor(code: ProviderErrorCode, message: string, statusCode = 422) {
    super(message);
    this.name = "ProviderError";
    this.code = code;
    this.statusCode = statusCode;
  }
}

export abstract class BaseProvider implements DownloadProvider {
  abstract key: string;
  abstract platform: SupportedPlatform;

  canHandle(url: string): boolean {
    return detectSupportedPlatform(url) === this.platform;
  }

  normalizeUrl(url: string): string {
    return normalizeInputUrl(url);
  }

  async download(url: string, context?: Partial<ProviderContext>) {
    return this.analyze(url, context);
  }

  abstract analyze(url: string, context?: Partial<ProviderContext>): Promise<ProviderAnalyzeResult>;

  protected getContext(context?: Partial<ProviderContext>): ProviderContext {
    return {
      timeoutMs: context?.timeoutMs ?? defaultTimeoutMs,
      apiKey: context?.apiKey
    };
  }

  protected emptyResult(url: string, normalizedUrl: string): ProviderAnalyzeResult {
    return {
      title: null,
      thumbnail: null,
      duration: null,
      downloadUrls: [],
      audioUrl: null,
      platform: this.platform,
      status: "failed",
      sourceUrl: url,
      normalizedUrl,
      providerKey: this.key
    };
  }

  protected failedResult(
    url: string,
    normalizedUrl: string,
    code: ProviderErrorCode,
    error: string
  ): ProviderAnalyzeResult {
    return {
      ...this.emptyResult(url, normalizedUrl),
      errorCode: code,
      error
    };
  }

  protected async fetchText(url: string, context?: Partial<ProviderContext>) {
    const nextContext = this.getContext(context);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), nextContext.timeoutMs);

    try {
      const response = await fetch(url, {
        cache: "no-store",
        redirect: "follow",
        signal: controller.signal,
        headers: this.getFetchHeaders()
      });

      if (response.status === 404) {
        throw new ProviderError("NOT_FOUND", "The link is no longer available.", 404);
      }

      if (!response.ok) {
        throw new ProviderError("PROVIDER_DOWN", "The provider did not return a usable page.", 502);
      }

      return {
        finalUrl: response.url,
        html: await response.text()
      };
    } catch (error) {
      if (error instanceof ProviderError) {
        throw error;
      }

      if (error instanceof Error && error.name === "AbortError") {
        throw new ProviderError("TIMEOUT", "The provider timed out. Try again in a moment.", 504);
      }

      throw new ProviderError("PROVIDER_DOWN", "The provider is temporarily unavailable.", 502);
    } finally {
      clearTimeout(timeout);
    }
  }

  protected getFetchHeaders(): HeadersInit {
    return {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "accept-language": "en-US,en;q=0.9",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
    };
  }
}

export function normalizeProviderError(error: unknown) {
  if (error instanceof ProviderError) {
    return error;
  }

  if (error instanceof Error) {
    return new ProviderError("PARSE_FAILED", error.message);
  }

  return new ProviderError("PARSE_FAILED", "The provider response could not be parsed.");
}
