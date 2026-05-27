import type { Metadata, Viewport } from "next";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { GoogleAnalytics } from "@/components/google-analytics";
import { getSiteName, getSiteUrl } from "@/lib/seo/site";
import "./globals.css";

const siteUrl = getSiteUrl();
const siteName = getSiteName();
const googleSiteVerification =
  process.env.GOOGLE_SITE_VERIFICATION ?? process.env.GOOGLE_SEARCH_CONSOLE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Download TikTok & Instagram Videos Without Watermark",
    template: `%s | ${siteName}`
  },
  description:
    "Fast, free TikTok and Instagram Reels downloader for HD video, cover images, and MP3 audio.",
  openGraph: {
    type: "website",
    siteName,
    title: "Download TikTok & Instagram Videos Without Watermark",
    description:
      "Paste a TikTok or Instagram Reels link and download video, cover, or MP3 audio in seconds.",
    url: siteUrl
  },
  twitter: {
    card: "summary_large_image",
    title: "Download TikTok & Instagram Videos Without Watermark",
    description: "Fast, Free, HD Quality."
  },
  verification: googleSiteVerification
    ? {
        google: googleSiteVerification
      }
    : undefined
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#080a0f"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
