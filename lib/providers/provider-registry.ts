import type { SupportedPlatform } from "@/lib/platform";
import type { DownloadProvider } from "@/lib/providers/provider.types";
import { InstagramProvider } from "@/lib/providers/instagram.provider";
import { TikTokProvider } from "@/lib/providers/tiktok.provider";

const providers: DownloadProvider[] = [new TikTokProvider(), new InstagramProvider()];

const envProviderKeys: Record<SupportedPlatform, string | undefined> = {
  tiktok: process.env.DEFAULT_TIKTOK_PROVIDER,
  instagram: process.env.DEFAULT_INSTAGRAM_PROVIDER
};

export function listProviders() {
  return providers;
}

export function getProviderForUrl(url: string) {
  return providers.find((provider) => provider.canHandle(url)) ?? null;
}

export function getDefaultProvider(platform: SupportedPlatform) {
  const configuredKey = envProviderKeys[platform];

  return (
    providers.find((provider) => provider.platform === platform && provider.key === configuredKey) ??
    providers.find((provider) => provider.platform === platform) ??
    null
  );
}
