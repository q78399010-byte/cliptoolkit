import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";
import { instagramPage } from "@/lib/seo/pages";

export const metadata: Metadata = instagramPage.metadata;

export default function InstagramReelsDownloaderPage() {
  return <LandingPage page={instagramPage} />;
}
