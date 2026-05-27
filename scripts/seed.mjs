import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import pg from "pg";
import { DatabaseSync } from "node:sqlite";

const { Pool } = pg;

function parseEnvValue(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

async function loadDotEnvLocal() {
  try {
    const content = await fs.readFile(path.join(process.cwd(), ".env.local"), "utf8");

    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
        continue;
      }

      const [key, ...valueParts] = trimmed.split("=");

      if (!process.env[key]) {
        process.env[key] = parseEnvValue(valueParts.join("="));
      }
    }
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }
}

function getDatabaseProvider() {
  return process.env.DB_PROVIDER === "postgres" ? "postgres" : "sqlite";
}

function getSqliteDatabasePath() {
  return (
    process.env.SQLITE_DATABASE_PATH ??
    path.join(process.cwd(), "data", "creator-toolkit.sqlite")
  );
}

function jsonLiteral(provider, value = "{}") {
  return provider === "postgres" ? `'${value}'::jsonb` : `'${value}'`;
}

function boolLiteral(provider, value) {
  if (provider === "postgres") {
    return value ? "true" : "false";
  }

  return value ? "1" : "0";
}

function nowLiteral(provider) {
  return provider === "postgres" ? "now()" : "strftime('%Y-%m-%dT%H:%M:%fZ', 'now')";
}

function seedSql(provider) {
  const json = (value) => jsonLiteral(provider, value);
  const bool = (value) => boolLiteral(provider, value);
  const now = nowLiteral(provider);

  return `
INSERT INTO providers (id, key, platform, "displayName", enabled, "configJson")
VALUES
  ('00000000-0000-4000-8000-000000000021', 'tiktok-web', 'tiktok', 'TikTok Web Provider', ${bool(true)}, ${json()}),
  ('00000000-0000-4000-8000-000000000022', 'instagram-web', 'instagram', 'Instagram Web Provider', ${bool(true)}, ${json()})
ON CONFLICT DO NOTHING;

INSERT INTO seo_pages (id, slug, "pageType", title, description, h1, content, "schemaJson", published)
VALUES
  ('00000000-0000-4000-8000-000000000101', 'home', 'home', 'Download TikTok & Instagram Videos Without Watermark', 'Fast, free TikTok and Instagram Reels downloader for HD video, cover images, and MP3 audio.', 'Download TikTok & Instagram Videos Without Watermark', 'Paste a public TikTok or Instagram Reels link and download video, cover image, or MP3 audio from one clean interface.', ${json()}, ${bool(true)}),
  ('00000000-0000-4000-8000-000000000102', 'tiktok-downloader', 'landing', 'TikTok Downloader Without Watermark', 'Download TikTok videos without watermark online. Save HD TikTok video, cover images, and MP3 audio from public links.', 'TikTok Downloader Without Watermark', 'Use Creator Toolkit to download public TikTok videos from your browser.', ${json()}, ${bool(true)}),
  ('00000000-0000-4000-8000-000000000103', 'instagram-reels-downloader', 'landing', 'Instagram Reels Downloader HD', 'Download Instagram Reels online in HD. Save public Instagram Reels videos, covers, and MP3 audio.', 'Instagram Reels Downloader', 'Creator Toolkit recognizes Instagram Reels links and routes them through a replaceable provider pipeline.', ${json()}, ${bool(true)}),
  ('00000000-0000-4000-8000-000000000104', 'download-tiktok-video-online', 'programmatic', 'Download TikTok Video Online', 'Download TikTok video online without installing an app. Paste a link and save HD video, cover, or MP3 audio.', 'Download TikTok Video Online', 'This page targets users looking for a direct online TikTok downloader.', ${json()}, ${bool(true)}),
  ('00000000-0000-4000-8000-000000000105', 'download-instagram-reels-hd', 'programmatic', 'Download Instagram Reels HD', 'Download Instagram Reels in HD from public links. Save video, cover image, and MP3 audio online.', 'Download Instagram Reels HD', 'This page targets HD Instagram Reels download searches.', ${json()}, ${bool(true)}),
  ('00000000-0000-4000-8000-000000000106', 'download-tiktok-video-without-watermark', 'programmatic', 'Download TikTok Video Without Watermark', 'Download TikTok videos without watermark from public links. Paste a TikTok URL and save the available HD video online.', 'Download TikTok Video Without Watermark', 'This page targets no-watermark TikTok download intent with a mobile-first paste, analyze, and download flow for public TikTok links.', ${json()}, ${bool(true)}),
  ('00000000-0000-4000-8000-000000000107', 'tiktok-downloader-hd', 'programmatic', 'TikTok Downloader HD', 'Use an HD TikTok downloader to save public TikTok videos online. Paste a link and download the best available video quality.', 'TikTok Downloader HD', 'This page targets HD TikTok downloader searches and keeps the conversion box above the fold for quick mobile downloads.', ${json()}, ${bool(true)}),
  ('00000000-0000-4000-8000-000000000108', 'how-to-download-instagram-reels', 'programmatic', 'How to Download Instagram Reels', 'Learn how to download Instagram Reels online from a public link with a fast mobile-first downloader.', 'How to Download Instagram Reels', 'This how-to page supports Instagram Reels download search intent with clear steps, FAQ content, and the same downloader interface.', ${json()}, ${bool(true)})
ON CONFLICT (slug) DO NOTHING;

INSERT INTO faq_items (id, "seoPageId", question, answer, "sortOrder", published)
VALUES
  ('00000000-0000-4000-8000-000000000201', '00000000-0000-4000-8000-000000000101', 'Do I need to install an app?', 'No. Creator Toolkit runs in your browser and is designed for mobile-first downloads.', 1, ${bool(true)}),
  ('00000000-0000-4000-8000-000000000202', '00000000-0000-4000-8000-000000000101', 'Which platforms are supported?', 'The MVP supports TikTok and Instagram Reels.', 2, ${bool(true)}),
  ('00000000-0000-4000-8000-000000000203', '00000000-0000-4000-8000-000000000102', 'Do I need to install an app?', 'No. Creator Toolkit runs in your browser and is designed for mobile-first downloads.', 1, ${bool(true)}),
  ('00000000-0000-4000-8000-000000000204', '00000000-0000-4000-8000-000000000102', 'Which platforms are supported?', 'The MVP supports TikTok and Instagram Reels.', 2, ${bool(true)}),
  ('00000000-0000-4000-8000-000000000205', '00000000-0000-4000-8000-000000000103', 'Do I need to install an app?', 'No. Creator Toolkit runs in your browser and is designed for mobile-first downloads.', 1, ${bool(true)}),
  ('00000000-0000-4000-8000-000000000206', '00000000-0000-4000-8000-000000000103', 'Which platforms are supported?', 'The MVP supports TikTok and Instagram Reels.', 2, ${bool(true)})
ON CONFLICT (id) DO NOTHING;

INSERT INTO blog_posts (id, title, slug, excerpt, content, "metaTitle", "metaDescription", status, "publishedAt")
VALUES
  ('00000000-0000-4000-8000-000000000301', 'How to Save TikTok Videos Without Watermark', 'how-to-save-tiktok-videos-without-watermark', 'A practical guide for saving public TikTok videos from your browser.', 'Copy a public TikTok video link, paste it into Creator Toolkit, and choose the available download option.', 'How to Save TikTok Videos Without Watermark', 'Learn how to save public TikTok videos without watermark from your browser.', 'published', ${now}),
  ('00000000-0000-4000-8000-000000000302', 'Download Instagram Reels Online', 'download-instagram-reels-online', 'What to know before saving Instagram Reels links in HD.', 'Copy a public Instagram Reels link, paste it into Creator Toolkit, and save the available video, cover, or audio option.', 'Download Instagram Reels Online', 'Learn how to download public Instagram Reels online in HD.', 'published', ${now})
ON CONFLICT (slug) DO NOTHING;

INSERT INTO system_configs (id, key, value, "valueType", "groupName", description)
VALUES
  ('00000000-0000-4000-8000-000000000401', 'DEFAULT_TIKTOK_PROVIDER', 'tiktok-web', 'string', 'provider', 'Active TikTok provider key.'),
  ('00000000-0000-4000-8000-000000000402', 'DEFAULT_INSTAGRAM_PROVIDER', 'instagram-web', 'string', 'provider', 'Active Instagram provider key.'),
  ('00000000-0000-4000-8000-000000000403', 'CACHE_DRIVER', 'memory', 'string', 'cache', 'Day 2 uses an in-memory cache mock behind the cache interface.'),
  ('00000000-0000-4000-8000-000000000404', 'REDIS_URL', '', 'string', 'cache', 'Optional future Redis URL; unused by the Day 2 memory cache.'),
  ('00000000-0000-4000-8000-000000000405', 'DOWNLOAD_CACHE_TTL_SECONDS', '604800', 'number', 'cache', 'TTL for successful download analysis cache.'),
  ('00000000-0000-4000-8000-000000000406', 'RATE_LIMIT_PER_HOUR', '80', 'number', 'security', 'Basic per-IP hourly download limit.')
ON CONFLICT (key) DO NOTHING;
`;
}

async function seedPostgres() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL must be set in .env.local when DB_PROVIDER=postgres.");
  }

  const pool = new Pool({ connectionString: databaseUrl });

  try {
    await pool.query(seedSql("postgres"));
  } finally {
    await pool.end();
  }
}

async function seedSqlite() {
  const databasePath = getSqliteDatabasePath();
  await fs.mkdir(path.dirname(databasePath), { recursive: true });

  const db = new DatabaseSync(databasePath);

  try {
    db.exec("PRAGMA foreign_keys = ON");
    db.exec(seedSql("sqlite"));
    console.log(`sqlite database: ${databasePath}`);
  } finally {
    db.close();
  }
}

async function main() {
  await loadDotEnvLocal();

  const provider = getDatabaseProvider();

  if (provider === "postgres") {
    await seedPostgres();
  } else {
    await seedSqlite();
  }

  console.log("seed complete");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
