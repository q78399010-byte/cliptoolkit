import "server-only";
import { query } from "@/lib/db/client";
import type { BlogPost, FaqItem, SeoPage, SeoPageWithFaqs } from "@/lib/db/types";

async function safeQuery<T>(sql: string, params: unknown[] = []) {
  try {
    return await query<T>(sql, params);
  } catch (error) {
    console.warn("public content query skipped", error);
    return { rows: [], rowCount: 0 };
  }
}

export async function listPublishedSeoPages(): Promise<SeoPage[]> {
  const result = await safeQuery<SeoPage>(`
    SELECT
      id, slug, "pageType", title, description, h1, content, "schemaJson",
      published, "createdAt", "updatedAt", "deletedAt"
    FROM seo_pages
    WHERE "deletedAt" IS NULL AND published = $1
    ORDER BY "updatedAt" DESC
  `, [true]);

  return result.rows;
}

export async function getPublishedSeoPageBySlug(slug: string): Promise<SeoPageWithFaqs | null> {
  const page = await safeQuery<SeoPage>(
    `
      SELECT
        id, slug, "pageType", title, description, h1, content, "schemaJson",
        published, "createdAt", "updatedAt", "deletedAt"
      FROM seo_pages
      WHERE slug = $1 AND "deletedAt" IS NULL AND published = $2
      LIMIT 1
    `,
    [slug, true]
  );

  const row = page.rows[0];

  if (!row) {
    return null;
  }

  const faqs = await safeQuery<FaqItem>(
    `
      SELECT id, "seoPageId", question, answer, "sortOrder", published, "createdAt", "updatedAt", "deletedAt"
      FROM faq_items
      WHERE "seoPageId" = $1 AND "deletedAt" IS NULL AND published = $2
      ORDER BY "sortOrder" ASC, "createdAt" ASC
    `,
    [row.id, true]
  );

  return {
    ...row,
    faqs: faqs.rows
  };
}

export async function listPublishedBlogPosts(): Promise<BlogPost[]> {
  const result = await safeQuery<BlogPost>(`
    SELECT
      id, title, slug, excerpt, content, "metaTitle", "metaDescription",
      status, "publishedAt", "createdAt", "updatedAt", "deletedAt"
    FROM blog_posts
    WHERE "deletedAt" IS NULL AND status = 'published'
    ORDER BY COALESCE("publishedAt", "createdAt") DESC
  `);

  return result.rows;
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const result = await safeQuery<BlogPost>(
    `
      SELECT
        id, title, slug, excerpt, content, "metaTitle", "metaDescription",
        status, "publishedAt", "createdAt", "updatedAt", "deletedAt"
      FROM blog_posts
      WHERE slug = $1 AND "deletedAt" IS NULL AND status = 'published'
      LIMIT 1
    `,
    [slug]
  );

  return result.rows[0] ?? null;
}
