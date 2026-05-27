import "server-only";
import crypto from "node:crypto";
import { query } from "@/lib/db/client";
import type {
  BlogPost,
  DownloadTask,
  OverviewStats,
  ProviderRecord,
  SeoPage,
  SeoPageWithFaqs,
  SystemConfig
} from "@/lib/db/types";

function toNumber(value: unknown) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    return Number(value);
  }

  return 0;
}

function createRecordId() {
  return crypto.randomUUID();
}

export async function getOverviewStats(): Promise<OverviewStats> {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const today = await query<{ total: string | number; successful: string | number; cache_hits: string | number }>(
    `
      SELECT
        count(*) AS total,
        sum(CASE WHEN status = 'success' THEN 1 ELSE 0 END) AS successful,
        sum(CASE WHEN "cacheHit" = $2 THEN 1 ELSE 0 END) AS cache_hits
      FROM download_tasks
      WHERE "deletedAt" IS NULL
        AND "createdAt" >= $1
    `,
    [todayStart, true]
  );

  const platforms = await query<{ platform: string; count: string | number }>(
    `
      SELECT platform, count(*) AS count
      FROM download_tasks
      WHERE "deletedAt" IS NULL
        AND "createdAt" >= $1
      GROUP BY platform
      ORDER BY count(*) DESC
    `,
    [sevenDaysAgo]
  );

  const total = toNumber(today.rows[0]?.total);
  const successful = toNumber(today.rows[0]?.successful);
  const cacheHits = toNumber(today.rows[0]?.cache_hits);
  const platformCounts = platforms.rows.map((row) => ({
    platform: row.platform,
    count: toNumber(row.count)
  }));

  return {
    todayDownloads: total,
    successRate: total ? Math.round((successful / total) * 100) : 0,
    cacheHitRate: total ? Math.round((cacheHits / total) * 100) : 0,
    topPlatform: platformCounts[0]?.platform ?? "none",
    platformCounts
  };
}

export async function listProviders(): Promise<ProviderRecord[]> {
  const result = await query<ProviderRecord>(`
    SELECT
      id, key, platform, "displayName", enabled, "configJson",
      "createdAt", "updatedAt", "deletedAt"
    FROM providers
    WHERE "deletedAt" IS NULL
    ORDER BY platform ASC, key ASC
  `);

  return result.rows;
}

export async function listDownloadTasks(filters: {
  query?: string;
  platform?: string;
  status?: string;
}): Promise<DownloadTask[]> {
  const clauses = ['"deletedAt" IS NULL'];
  const params: unknown[] = [];

  if (filters.query) {
    params.push(`%${filters.query}%`);
    clauses.push(
      `(LOWER(url) LIKE LOWER($${params.length}) OR LOWER(provider) LIKE LOWER($${params.length}) OR LOWER(COALESCE(reason, '')) LIKE LOWER($${params.length}))`
    );
  }

  if (filters.platform && filters.platform !== "all") {
    params.push(filters.platform);
    clauses.push(`platform = $${params.length}`);
  }

  if (filters.status && filters.status !== "all") {
    params.push(filters.status);
    clauses.push(`status = $${params.length}`);
  }

  const result = await query<DownloadTask>(
    `
      SELECT
        id, url, "normalizedUrl", "urlHash", platform, provider, status, "responseTime",
        "cacheHit", "ipHash", country, device, "userAgent", referrer, title,
        "thumbnailUrl", "videoUrl", "coverUrl", "audioUrl", reason, "errorCode",
        "retryCount", metadata, "createdAt", "updatedAt", "deletedAt"
      FROM download_tasks
      WHERE ${clauses.join(" AND ")}
      ORDER BY "createdAt" DESC
      LIMIT 100
    `,
    params
  );

  return result.rows;
}

export async function getDownloadTask(id: string): Promise<DownloadTask | null> {
  const result = await query<DownloadTask>(
    `
      SELECT
        id, url, "normalizedUrl", "urlHash", platform, provider, status, "responseTime",
        "cacheHit", "ipHash", country, device, "userAgent", referrer, title,
        "thumbnailUrl", "videoUrl", "coverUrl", "audioUrl", reason, "errorCode",
        "retryCount", metadata, "createdAt", "updatedAt", "deletedAt"
      FROM download_tasks
      WHERE id = $1 AND "deletedAt" IS NULL
      LIMIT 1
    `,
    [id]
  );

  return result.rows[0] ?? null;
}

export async function listSeoPages(): Promise<SeoPage[]> {
  const result = await query<SeoPage>(`
    SELECT
      id, slug, "pageType", title, description, h1, content, "schemaJson",
      published, "createdAt", "updatedAt", "deletedAt"
    FROM seo_pages
    WHERE "deletedAt" IS NULL
    ORDER BY "createdAt" DESC
  `);

  return result.rows;
}

export async function getSeoPage(id: string): Promise<SeoPageWithFaqs | null> {
  const page = await query<SeoPage>(
    `
      SELECT
        id, slug, "pageType", title, description, h1, content, "schemaJson",
        published, "createdAt", "updatedAt", "deletedAt"
      FROM seo_pages
      WHERE id = $1 AND "deletedAt" IS NULL
      LIMIT 1
    `,
    [id]
  );

  if (!page.rows[0]) {
    return null;
  }

  const faqs = await query<SeoPageWithFaqs["faqs"][number]>(
    `
      SELECT id, "seoPageId", question, answer, "sortOrder", published, "createdAt", "updatedAt", "deletedAt"
      FROM faq_items
      WHERE "seoPageId" = $1 AND "deletedAt" IS NULL
      ORDER BY "sortOrder" ASC, "createdAt" ASC
    `,
    [id]
  );

  return {
    ...page.rows[0],
    faqs: faqs.rows
  };
}

export async function upsertSeoPage(input: {
  id?: string;
  slug: string;
  pageType: string;
  title: string;
  description: string;
  h1: string;
  content: string;
  schemaJson: Record<string, unknown>;
  published: boolean;
  faqs: Array<{ question: string; answer: string }>;
}) {
  const now = new Date();
  const pageResult = input.id
    ? await query<{ id: string }>(
        `
          UPDATE seo_pages
          SET slug = $2, "pageType" = $3, title = $4, description = $5, h1 = $6,
              content = $7, "schemaJson" = $8, published = $9, "updatedAt" = $10
          WHERE id = $1 AND "deletedAt" IS NULL
          RETURNING id
        `,
        [
          input.id,
          input.slug,
          input.pageType,
          input.title,
          input.description,
          input.h1,
          input.content,
          input.schemaJson,
          input.published,
          now
        ]
      )
    : await query<{ id: string }>(
        `
          INSERT INTO seo_pages (
            id, slug, "pageType", title, description, h1, content,
            "schemaJson", published
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING id
        `,
        [
          createRecordId(),
          input.slug,
          input.pageType,
          input.title,
          input.description,
          input.h1,
          input.content,
          input.schemaJson,
          input.published
        ]
      );

  const pageId = pageResult.rows[0]?.id;

  if (!pageId) {
    throw new Error("SEO page was not saved.");
  }

  await query('UPDATE faq_items SET "deletedAt" = $1, "updatedAt" = $1 WHERE "seoPageId" = $2', [
    now,
    pageId
  ]);

  for (const [index, faq] of input.faqs.entries()) {
    await query(
      `
        INSERT INTO faq_items (id, "seoPageId", question, answer, "sortOrder", published)
        VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [createRecordId(), pageId, faq.question, faq.answer, index, true]
    );
  }

  return pageId;
}

export async function softDeleteSeoPage(id: string) {
  const now = new Date();
  await query('UPDATE seo_pages SET "deletedAt" = $1, "updatedAt" = $1 WHERE id = $2', [now, id]);
}

export async function listBlogPosts(): Promise<BlogPost[]> {
  const result = await query<BlogPost>(`
    SELECT
      id, title, slug, excerpt, content, "metaTitle", "metaDescription",
      status, "publishedAt", "createdAt", "updatedAt", "deletedAt"
    FROM blog_posts
    WHERE "deletedAt" IS NULL
    ORDER BY "createdAt" DESC
  `);

  return result.rows;
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  const result = await query<BlogPost>(
    `
      SELECT
        id, title, slug, excerpt, content, "metaTitle", "metaDescription",
        status, "publishedAt", "createdAt", "updatedAt", "deletedAt"
      FROM blog_posts
      WHERE id = $1 AND "deletedAt" IS NULL
      LIMIT 1
    `,
    [id]
  );

  return result.rows[0] ?? null;
}

export async function upsertBlogPost(input: {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  status: "draft" | "published";
}) {
  const now = new Date();

  if (input.id) {
    const existing = await getBlogPost(input.id);
    const publishedAt =
      input.status === "published" ? existing?.publishedAt ?? now : null;

    await query(
      `
        UPDATE blog_posts
        SET title = $2, slug = $3, excerpt = $4, content = $5,
            "metaTitle" = $6, "metaDescription" = $7, status = $8,
            "publishedAt" = $9, "updatedAt" = $10
        WHERE id = $1 AND "deletedAt" IS NULL
      `,
      [
        input.id,
        input.title,
        input.slug,
        input.excerpt,
        input.content,
        input.metaTitle,
        input.metaDescription,
        input.status,
        publishedAt,
        now
      ]
    );

    return input.id;
  }

  const result = await query<{ id: string }>(
    `
      INSERT INTO blog_posts (
        id, title, slug, excerpt, content, "metaTitle",
        "metaDescription", status, "publishedAt"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
    `,
    [
      createRecordId(),
      input.title,
      input.slug,
      input.excerpt,
      input.content,
      input.metaTitle,
      input.metaDescription,
      input.status,
      input.status === "published" ? now : null
    ]
  );

  return result.rows[0].id;
}

export async function softDeleteBlogPost(id: string) {
  const now = new Date();
  await query('UPDATE blog_posts SET "deletedAt" = $1, "updatedAt" = $1 WHERE id = $2', [now, id]);
}

export async function listSystemConfigs(): Promise<SystemConfig[]> {
  const result = await query<SystemConfig>(`
    SELECT id, key, value, "valueType", "groupName", description, "createdAt", "updatedAt", "deletedAt"
    FROM system_configs
    WHERE "deletedAt" IS NULL
    ORDER BY "groupName" ASC, key ASC
  `);

  return result.rows;
}

export async function updateSystemConfig(key: string, value: string) {
  const now = new Date();

  await query(
    `
      INSERT INTO system_configs (id, key, value, "valueType", "groupName", "updatedAt")
      VALUES ($1, $2, $3, 'string', 'general', $4)
      ON CONFLICT (key)
      DO UPDATE SET value = excluded.value, "updatedAt" = $4, "deletedAt" = NULL
    `,
    [createRecordId(), key, value, now]
  );
}
