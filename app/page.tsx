import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";
import { homePage } from "@/lib/seo/pages";

export const metadata: Metadata = homePage.metadata;

export default function HomePage() {
  return <LandingPage page={homePage} />;
}
