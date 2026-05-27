import type { BlogPost, SeoPageWithFaqs } from "@/lib/db/types";
import {
  getPublishedBlogPostBySlug,
  getPublishedSeoPageBySlug,
  listPublishedBlogPosts,
  listPublishedSeoPages
} from "@/lib/db/public-content";
import { createPageMetadata } from "@/lib/seo/metadata";
import type { MarketingPage, PageFaq, SeoSection } from "@/lib/seo/pages";
import { homePage, instagramPage, staticMarketingPages, tiktokPage } from "@/lib/seo/pages";
import { programmaticSeoPages } from "@/lib/seo/programmatic-pages";
import { type SeoBlogPost, staticBlogPosts } from "@/lib/seo/blog";

type SeoPageSchemaConfig = {
  eyebrow?: unknown;
  subtitle?: unknown;
  contentTitle?: unknown;
  seoSections?: unknown;
  howToSteps?: unknown;
};

function asString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && Boolean(item.trim())) : [];
}

function asSeoSections(value: unknown): SeoSection[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const record = item as Record<string, unknown>;
      const title = asString(record.title);
      const body = asString(record.body);

      return title && body ? { title, body } : null;
    })
    .filter((item): item is SeoSection => Boolean(item));
}

function slugToRouteSlug(slug: string) {
  return slug === "home" ? "" : slug;
}

function routeSlugToDbSlug(slug: string) {
  return !slug || slug === "/" ? "home" : slug.replace(/^\//, "");
}

function pathForRouteSlug(slug: string) {
  return slug ? `/${slug}` : "/";
}

function metadataDescription(page: MarketingPage) {
  return typeof page.metadata.description === "string" ? page.metadata.description : page.subtitle;
}

function findStaticMarketingPage(routeSlug: string) {
  if (!routeSlug) {
    return homePage;
  }

  if (routeSlug === "tiktok-downloader") {
    return tiktokPage;
  }

  if (routeSlug === "instagram-reels-downloader") {
    return instagramPage;
  }

  return programmaticSeoPages.find((page) => page.slug === routeSlug) ?? null;
}

function richContent(content: string | null | undefined, fallback?: string) {
  const nextContent = content?.trim();

  if (nextContent && nextContent.length >= 180) {
    return nextContent;
  }

  return fallback ?? nextContent ?? "";
}

function mapDbSeoPage(page: SeoPageWithFaqs, fallback?: MarketingPage | null): MarketingPage {
  const config = (page.schemaJson ?? {}) as SeoPageSchemaConfig;
  const routeSlug = slugToRouteSlug(page.slug);
  const h1 = page.h1 ?? page.title;
  const description = page.description;
  const content = richContent(page.content, fallback?.content ?? description);
  const seoSections = asSeoSections(config.seoSections);
  const howToSteps = asStringArray(config.howToSteps);
  const dbFaqs: PageFaq[] = page.faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer
  }));
  const faqs = dbFaqs.length ? dbFaqs : fallback?.faqs ?? [];

  return {
    slug: routeSlug,
    eyebrow: asString(config.eyebrow) ?? fallback?.eyebrow ?? page.pageType,
    h1,
    subtitle: asString(config.subtitle) ?? fallback?.subtitle ?? description,
    contentTitle: asString(config.contentTitle) ?? fallback?.contentTitle ?? h1,
    content,
    seoSections: seoSections.length ? seoSections : fallback?.seoSections,
    howToSteps: howToSteps.length ? howToSteps : fallback?.howToSteps,
    updatedAt: page.updatedAt,
    faqs,
    metadata: createPageMetadata({
      title: page.title,
      description,
      path: pathForRouteSlug(routeSlug)
    })
  };
}

function findStaticBlogPost(slug: string) {
  return staticBlogPosts.find((post) => post.slug === slug) ?? null;
}

function richMarkdown(content: string, fallback?: string) {
  const hasMarkdownStructure = /^#{1,3}\s+/m.test(content) || /^[-*]\s+/m.test(content);

  if (hasMarkdownStructure || content.length >= 180) {
    return content;
  }

  return fallback ?? content;
}

function mapDbBlogPost(post: BlogPost, fallback?: SeoBlogPost | null): SeoBlogPost {
  const publishedAt = post.publishedAt ?? post.createdAt;
  const metaDescription = post.metaDescription || post.excerpt || `Read ${post.title}.`;

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? metaDescription,
    content: richMarkdown(post.content, fallback?.content),
    metaTitle: post.metaTitle || post.title,
    metaDescription,
    publishedAt,
    updatedAt: post.updatedAt ?? publishedAt
  };
}

function mergeBySlug<T extends { slug: string }>(base: T[], overrides: T[]) {
  const bySlug = new Map<string, T>();

  for (const item of base) {
    bySlug.set(item.slug, item);
  }

  for (const item of overrides) {
    bySlug.set(item.slug, item);
  }

  return Array.from(bySlug.values());
}

export async function getMarketingPageBySlug(slug: string): Promise<MarketingPage | null> {
  const routeSlug = slugToRouteSlug(routeSlugToDbSlug(slug));
  const staticPage = findStaticMarketingPage(routeSlug);
  const dbPage = await getPublishedSeoPageBySlug(routeSlugToDbSlug(slug));

  if (dbPage) {
    return mapDbSeoPage(dbPage, staticPage);
  }

  return staticPage;
}

export async function listMarketingPagesForSeo() {
  const dbPages = (await listPublishedSeoPages()).map((page) =>
    mapDbSeoPage({
      ...page,
      faqs: []
    }, findStaticMarketingPage(slugToRouteSlug(page.slug)))
  );

  return mergeBySlug([...staticMarketingPages, ...programmaticSeoPages], dbPages);
}

export async function getBlogPostBySlug(slug: string): Promise<SeoBlogPost | null> {
  const dbPost = await getPublishedBlogPostBySlug(slug);
  const staticPost = findStaticBlogPost(slug);

  if (dbPost) {
    return mapDbBlogPost(dbPost, staticPost);
  }

  return staticPost;
}

export async function listBlogPostsForSeo() {
  const dbPosts = (await listPublishedBlogPosts()).map((post) => mapDbBlogPost(post, findStaticBlogPost(post.slug)));
  return mergeBySlug(staticBlogPosts, dbPosts).sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
  );
}

export function getMarketingMetaDescription(page: MarketingPage) {
  return metadataDescription(page);
}
