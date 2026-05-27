import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";
import { getMarketingPageBySlug } from "@/lib/seo/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getMarketingPageBySlug("home");
  return page?.metadata ?? {};
}

export default async function HomePage() {
  const page = await getMarketingPageBySlug("home");
  return page ? <LandingPage page={page} /> : null;
}
