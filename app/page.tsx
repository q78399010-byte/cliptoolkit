import type { Metadata } from "next";
import { CreatorToolsHome } from "@/components/creator-tools-home";
import { StructuredData } from "@/components/structured-data";
import { homepageFaqItems } from "@/lib/homepage-content";
import { createFaqSchema } from "@/lib/seo/schema";

const canonicalUrl = "https://www.cliptoolkit.com";
const ogImageUrl = "https://www.cliptoolkit.com/og/homepage.svg";
const pageTitle = "ClipToolkit  Free Creator Business Tools for TikTok, YouTube & UGC";
const pageDescription =
  "Free creator business tools for TikTok creators, UGC creators, YouTubers, and creator agencies. Estimate earnings, price sponsorships, calculate UGC rates, and grow your creator business.";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "creator tools",
    "tiktok money calculator",
    "ugc rate calculator",
    "youtube revenue calculator",
    "creator business tools",
    "creator income calculator"
  ],
  alternates: {
    canonical: canonicalUrl
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonicalUrl,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "ClipToolkit creator business tools"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [ogImageUrl]
  }
};

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ClipToolkit",
    url: canonicalUrl,
    logo: "https://www.cliptoolkit.com/og/homepage.svg",
    description: pageDescription
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ClipToolkit",
    url: canonicalUrl,
    description: pageDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: `${canonicalUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <StructuredData data={[organizationSchema, websiteSchema, createFaqSchema(homepageFaqItems)]} />
      <CreatorToolsHome />
    </>
  );
}
