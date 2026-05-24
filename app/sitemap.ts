import type { MetadataRoute } from "next";
import { programmaticSeoPages } from "@/lib/seo/programmatic-pages";

const staticRoutes = [
  "",
  "/tiktok-downloader",
  "/instagram-reels-downloader",
  "/faq",
  "/blog",
  "/privacy-policy",
  "/terms",
  "/dmca"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://creator-toolkit.com";
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.75
    })),
    ...programmaticSeoPages.map((page) => ({
      url: `${siteUrl}/${page.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.72
    }))
  ];
}
