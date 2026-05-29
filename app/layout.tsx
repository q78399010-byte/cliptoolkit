import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getSiteName, getSiteUrl } from "@/lib/seo/site";
import "./globals.css";

const siteUrl = getSiteUrl();
const siteName = getSiteName();

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
  verification: {
    google: "4rabzGpSQmyCFXaFML5Sv1vxVbG6tCmaocFtpAUM-z8"
  }
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
        <GoogleAnalytics gaId="G-VZW61VT2Y" />
        {children}
      </body>
    </html>
  );
}
