import type { Metadata } from "next";
import { TikTokShopRoiPageContent } from "@/components/tiktok-shop-roi-page-content";
import {
  absoluteRoiUrl,
  roiMarkets,
  tiktokShopRoiBasePath,
  tiktokShopRoiDescription,
  tiktokShopRoiKeywords,
  tiktokShopRoiOgImage,
  tiktokShopRoiTitle
} from "@/lib/tiktok-shop-roi";

const canonicalUrl = absoluteRoiUrl(tiktokShopRoiBasePath);

export const metadata: Metadata = {
  title: tiktokShopRoiTitle,
  description: tiktokShopRoiDescription,
  keywords: tiktokShopRoiKeywords,
  alternates: {
    canonical: canonicalUrl,
    languages: {
      "en-US": canonicalUrl,
      "en-GB": absoluteRoiUrl(roiMarkets.gbp.path),
      "en-EU": absoluteRoiUrl(roiMarkets.eur.path)
    }
  },
  openGraph: {
    title: tiktokShopRoiTitle,
    description: tiktokShopRoiDescription,
    url: canonicalUrl,
    images: [
      {
        url: tiktokShopRoiOgImage,
        width: 1200,
        height: 630,
        alt: "TikTok Shop ROI Calculator by ClipToolkit"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: tiktokShopRoiTitle,
    description: tiktokShopRoiDescription,
    images: [tiktokShopRoiOgImage]
  }
};

export default function TikTokShopRoiCalculatorPage() {
  return <TikTokShopRoiPageContent market={roiMarkets.usd} />;
}
