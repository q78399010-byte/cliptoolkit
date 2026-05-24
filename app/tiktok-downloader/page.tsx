import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";
import { tiktokPage } from "@/lib/seo/pages";

export const metadata: Metadata = tiktokPage.metadata;

export default function TikTokDownloaderPage() {
  return <LandingPage page={tiktokPage} />;
}
