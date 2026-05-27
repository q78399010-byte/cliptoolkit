import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";
import { getMarketingPageBySlug } from "@/lib/seo/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getMarketingPageBySlug("tiktok-downloader");
  return page?.metadata ?? {};
}

export default async function TikTokDownloaderPage() {
  const page = await getMarketingPageBySlug("tiktok-downloader");
  return page ? <LandingPage page={page} /> : null;
}
