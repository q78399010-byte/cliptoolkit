import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://creator-toolkit.com";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Creator Toolkit";

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
      <body>{children}</body>
    </html>
  );
}
