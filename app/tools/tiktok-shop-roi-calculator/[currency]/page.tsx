import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TikTokShopRoiPageContent } from "@/components/tiktok-shop-roi-page-content";
import {
  absoluteRoiUrl,
  getRoiMarket,
  roiCurrencyParams,
  roiMarkets,
  tiktokShopRoiDescription,
  tiktokShopRoiKeywords,
  tiktokShopRoiOgImage,
  tiktokShopRoiTitle
} from "@/lib/tiktok-shop-roi";

type PageProps = {
  params: Promise<{ currency: string }>;
};

export function generateStaticParams() {
  return roiCurrencyParams.map((currency) => ({ currency }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { currency } = await params;
  const market = getRoiMarket(currency);

  if (!market) {
    return {};
  }

  const canonicalUrl = absoluteRoiUrl(market.canonicalPath);
  const title =
    market.currency === "usd"
      ? tiktokShopRoiTitle
      : `TikTok Shop ROI Calculator (${market.currencyCode})  Optimize Ad Spend & Profit`;

  return {
    title,
    description: tiktokShopRoiDescription,
    keywords: tiktokShopRoiKeywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": absoluteRoiUrl(roiMarkets.usd.canonicalPath),
        "en-GB": absoluteRoiUrl(roiMarkets.gbp.path),
        "en-EU": absoluteRoiUrl(roiMarkets.eur.path)
      }
    },
    openGraph: {
      title,
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
      title,
      description: tiktokShopRoiDescription,
      images: [tiktokShopRoiOgImage]
    }
  };
}

export default async function TikTokShopRoiCurrencyPage({ params }: PageProps) {
  const { currency } = await params;
  const market = getRoiMarket(currency);

  if (!market) {
    notFound();
  }

  return <TikTokShopRoiPageContent market={market} />;
}
