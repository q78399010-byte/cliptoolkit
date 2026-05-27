CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS schema_migrations (
  id text PRIMARY KEY,
  "createdAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE,
  name text,
  role text NOT NULL DEFAULT 'user',
  country text,
  device text,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "deletedAt" timestamptz
);

CREATE TABLE IF NOT EXISTS download_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  "normalizedUrl" text,
  "urlHash" text,
  platform text NOT NULL CHECK (platform IN ('tiktok', 'instagram')),
  provider text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'processing', 'success', 'failed', 'retrying')),
  "responseTime" integer,
  "cacheHit" boolean NOT NULL DEFAULT false,
  "ipHash" text,
  country text,
  device text,
  "userAgent" text,
  referrer text,
  title text,
  "thumbnailUrl" text,
  "videoUrl" text,
  "coverUrl" text,
  "audioUrl" text,
  reason text,
  "errorCode" text,
  "retryCount" integer NOT NULL DEFAULT 0,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "deletedAt" timestamptz
);

CREATE INDEX IF NOT EXISTS idx_download_tasks_created_at ON download_tasks ("createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_download_tasks_platform ON download_tasks (platform);
CREATE INDEX IF NOT EXISTS idx_download_tasks_status ON download_tasks (status);
CREATE INDEX IF NOT EXISTS idx_download_tasks_url_hash ON download_tasks ("urlHash");
CREATE INDEX IF NOT EXISTS idx_download_tasks_country ON download_tasks (country);

CREATE TABLE IF NOT EXISTS provider_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "taskId" uuid REFERENCES download_tasks(id) ON DELETE SET NULL,
  platform text NOT NULL CHECK (platform IN ('tiktok', 'instagram')),
  provider text NOT NULL,
  status text NOT NULL CHECK (status IN ('success', 'failed')),
  "responseTime" integer,
  "cacheHit" boolean NOT NULL DEFAULT false,
  "requestUrl" text,
  "errorMessage" text,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "deletedAt" timestamptz
);

CREATE INDEX IF NOT EXISTS idx_provider_logs_created_at ON provider_logs ("createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_provider_logs_provider ON provider_logs (provider);
CREATE INDEX IF NOT EXISTS idx_provider_logs_status ON provider_logs (status);

CREATE TABLE IF NOT EXISTS seo_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  "pageType" text NOT NULL DEFAULT 'landing',
  title text NOT NULL,
  description text NOT NULL,
  h1 text,
  content text,
  "schemaJson" jsonb NOT NULL DEFAULT '{}'::jsonb,
  published boolean NOT NULL DEFAULT true,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "deletedAt" timestamptz
);

CREATE INDEX IF NOT EXISTS idx_seo_pages_published ON seo_pages (published);
CREATE INDEX IF NOT EXISTS idx_seo_pages_slug ON seo_pages (slug);

CREATE TABLE IF NOT EXISTS faq_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "seoPageId" uuid REFERENCES seo_pages(id) ON DELETE CASCADE,
  question text NOT NULL,
  answer text NOT NULL,
  "sortOrder" integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "deletedAt" timestamptz
);

CREATE INDEX IF NOT EXISTS idx_faq_items_seo_page ON faq_items ("seoPageId");

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL,
  "metaTitle" text,
  "metaDescription" text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  "publishedAt" timestamptz,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "deletedAt" timestamptz
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts (status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug);

CREATE TABLE IF NOT EXISTS system_configs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  value text NOT NULL,
  "valueType" text NOT NULL DEFAULT 'string' CHECK ("valueType" IN ('string', 'number', 'boolean', 'json', 'secret')),
  "groupName" text NOT NULL DEFAULT 'general',
  description text,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "deletedAt" timestamptz
);

CREATE INDEX IF NOT EXISTS idx_system_configs_group ON system_configs ("groupName");

CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "eventName" text NOT NULL CHECK ("eventName" IN ('page_view', 'download_click', 'download_success', 'download_failed')),
  "pagePath" text,
  keyword text,
  platform text,
  country text,
  device text,
  referrer text,
  "ipHash" text,
  "sessionHash" text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "deletedAt" timestamptz
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events ("createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON analytics_events ("eventName");
CREATE INDEX IF NOT EXISTS idx_analytics_events_country ON analytics_events (country);
CREATE INDEX IF NOT EXISTS idx_analytics_events_keyword ON analytics_events (keyword);

INSERT INTO seo_pages (slug, "pageType", title, description, h1, content, "schemaJson", published)
VALUES
  ('home', 'home', 'Download TikTok & Instagram Videos Without Watermark', 'Fast, free TikTok and Instagram Reels downloader for HD video, cover images, and MP3 audio.', 'Download TikTok & Instagram Videos Without Watermark', 'Paste a public TikTok or Instagram Reels link and download video, cover image, or MP3 audio from one clean interface.', '{}'::jsonb, true),
  ('tiktok-downloader', 'landing', 'TikTok Downloader Without Watermark', 'Download TikTok videos without watermark online. Save HD TikTok video, cover images, and MP3 audio from public links.', 'TikTok Downloader Without Watermark', 'Use Creator Toolkit to download public TikTok videos from your browser.', '{}'::jsonb, true),
  ('instagram-reels-downloader', 'landing', 'Instagram Reels Downloader HD', 'Download Instagram Reels online in HD. Save public Instagram Reels videos, covers, and MP3 audio.', 'Instagram Reels Downloader', 'Creator Toolkit recognizes Instagram Reels links and routes them through a replaceable provider pipeline.', '{}'::jsonb, true),
  ('download-tiktok-video-online', 'programmatic', 'Download TikTok Video Online', 'Download TikTok video online without installing an app. Paste a link and save HD video, cover, or MP3 audio.', 'Download TikTok Video Online', 'This page targets users looking for a direct online TikTok downloader.', '{}'::jsonb, true),
  ('download-instagram-reels-hd', 'programmatic', 'Download Instagram Reels HD', 'Download Instagram Reels in HD from public links. Save video, cover image, and MP3 audio online.', 'Download Instagram Reels HD', 'This page targets HD Instagram Reels download searches.', '{}'::jsonb, true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO faq_items ("seoPageId", question, answer, "sortOrder", published)
SELECT id, 'Do I need to install an app?', 'No. Creator Toolkit runs in your browser and is designed for mobile-first downloads.', 1, true
FROM seo_pages
WHERE slug IN ('home', 'tiktok-downloader', 'instagram-reels-downloader')
ON CONFLICT DO NOTHING;

INSERT INTO faq_items ("seoPageId", question, answer, "sortOrder", published)
SELECT id, 'Which platforms are supported?', 'The MVP supports TikTok and Instagram Reels.', 2, true
FROM seo_pages
WHERE slug IN ('home', 'tiktok-downloader', 'instagram-reels-downloader')
ON CONFLICT DO NOTHING;

INSERT INTO blog_posts (title, slug, excerpt, content, "metaTitle", "metaDescription", status, "publishedAt")
VALUES
  ('How to Save TikTok Videos Without Watermark', 'how-to-save-tiktok-videos-without-watermark', 'A practical guide for saving public TikTok videos from your browser.', 'Copy a public TikTok video link, paste it into Creator Toolkit, and choose the available download option.', 'How to Save TikTok Videos Without Watermark', 'Learn how to save public TikTok videos without watermark from your browser.', 'published', now()),
  ('Download Instagram Reels Online', 'download-instagram-reels-online', 'What to know before saving Instagram Reels links in HD.', 'Copy a public Instagram Reels link, paste it into Creator Toolkit, and save the available video, cover, or audio option.', 'Download Instagram Reels Online', 'Learn how to download public Instagram Reels online in HD.', 'published', now())
ON CONFLICT (slug) DO NOTHING;

INSERT INTO system_configs (key, value, "valueType", "groupName", description)
VALUES
  ('DEFAULT_TIKTOK_PROVIDER', 'stub-tiktok', 'string', 'provider', 'Active TikTok provider key.'),
  ('DEFAULT_INSTAGRAM_PROVIDER', 'stub-instagram', 'string', 'provider', 'Active Instagram provider key.'),
  ('REDIS_URL', 'redis://redis:6379', 'string', 'cache', 'Redis connection URL used by cache and locks.'),
  ('DOWNLOAD_CACHE_TTL_SECONDS', '604800', 'number', 'cache', 'TTL for successful download analysis cache.'),
  ('RATE_LIMIT_PER_HOUR', '80', 'number', 'security', 'Basic per-IP hourly download limit.')
ON CONFLICT (key) DO NOTHING;
