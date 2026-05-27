import type { MetadataRoute } from "next";
import { listBlogPostsForSeo, listMarketingPagesForSeo } from "@/lib/seo/content";
import { getSiteUrl, normalizePath } from "@/lib/seo/site";

const toolRoutes = [
  "/tools/tiktok-money-calculator",
  "/tools/ugc-rate-calculator",
  "/tools/youtube-revenue-calculator",
  "/tools/sponsorship-rate-calculator"
];
const supportRoutes = ["/faq", "/blog", "/privacy-policy", "/terms", "/dmca"];

function priorityForPath(path: string) {
  if (path === "/") {
    return 1;
  }

  if (["/tiktok-downloader", "/instagram-reels-downloader"].includes(path)) {
    return 0.9;
  }

  if (path.startsWith("/tools/")) {
    return 0.88;
  }

  if (path.startsWith("/blog")) {
    return 0.68;
  }

  if (["/privacy-policy", "/terms", "/dmca"].includes(path)) {
    return 0.32;
  }

  return 0.78;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const marketingPages = await listMarketingPagesForSeo();
  const blogPosts = await listBlogPostsForSeo();
  const routes = [
    ...marketingPages.map((page) => normalizePath(page.slug)),
    ...toolRoutes,
    ...supportRoutes,
    ...blogPosts.map((post) => `/blog/${post.slug}`)
  ];
  const uniqueRoutes = Array.from(new Set(routes));

  return uniqueRoutes.map((route) => ({
      url: route === "/" ? `${siteUrl}/` : `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: route.startsWith("/blog") ? "monthly" : "weekly",
      priority: priorityForPath(route)
  }));
}
