CREATE TABLE IF NOT EXISTS schema_migrations (
  id text PRIMARY KEY,
  "createdAt" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS users (
  id text PRIMARY KEY,
  email text UNIQUE,
  name text,
  role text NOT NULL DEFAULT 'user',
  country text,
  device text,
  "createdAt" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  "updatedAt" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  "deletedAt" text
);

CREATE TABLE IF NOT EXISTS providers (
  id text PRIMARY KEY,
  key text NOT NULL UNIQUE,
  platform text NOT NULL CHECK (platform IN ('tiktok', 'instagram')),
  "displayName" text NOT NULL,
  enabled integer NOT NULL DEFAULT 1,
  "configJson" text NOT NULL DEFAULT '{}',
  "createdAt" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  "updatedAt" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  "deletedAt" text
);

CREATE INDEX IF NOT EXISTS idx_providers_platform ON providers (platform);
CREATE INDEX IF NOT EXISTS idx_providers_enabled ON providers (enabled);

CREATE TABLE IF NOT EXISTS download_tasks (
  id text PRIMARY KEY,
  url text NOT NULL,
  "normalizedUrl" text,
  "urlHash" text,
  platform text NOT NULL CHECK (platform IN ('tiktok', 'instagram')),
  provider text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'processing', 'success', 'failed', 'retrying')),
  "responseTime" integer,
  "cacheHit" integer NOT NULL DEFAULT 0,
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
  metadata text NOT NULL DEFAULT '{}',
  "createdAt" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  "updatedAt" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  "deletedAt" text
);

CREATE INDEX IF NOT EXISTS idx_download_tasks_created_at ON download_tasks ("createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_download_tasks_platform ON download_tasks (platform);
CREATE INDEX IF NOT EXISTS idx_download_tasks_status ON download_tasks (status);
CREATE INDEX IF NOT EXISTS idx_download_tasks_url_hash ON download_tasks ("urlHash");
CREATE INDEX IF NOT EXISTS idx_download_tasks_country ON download_tasks (country);

CREATE TABLE IF NOT EXISTS provider_logs (
  id text PRIMARY KEY,
  "taskId" text REFERENCES download_tasks(id) ON DELETE SET NULL,
  platform text NOT NULL CHECK (platform IN ('tiktok', 'instagram')),
  provider text NOT NULL,
  status text NOT NULL CHECK (status IN ('success', 'failed')),
  "responseTime" integer,
  "cacheHit" integer NOT NULL DEFAULT 0,
  "requestUrl" text,
  "errorMessage" text,
  payload text NOT NULL DEFAULT '{}',
  "createdAt" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  "updatedAt" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  "deletedAt" text
);

CREATE INDEX IF NOT EXISTS idx_provider_logs_created_at ON provider_logs ("createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_provider_logs_provider ON provider_logs (provider);
CREATE INDEX IF NOT EXISTS idx_provider_logs_status ON provider_logs (status);

CREATE TABLE IF NOT EXISTS seo_pages (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  "pageType" text NOT NULL DEFAULT 'landing',
  title text NOT NULL,
  description text NOT NULL,
  h1 text,
  content text,
  "schemaJson" text NOT NULL DEFAULT '{}',
  published integer NOT NULL DEFAULT 1,
  "createdAt" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  "updatedAt" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  "deletedAt" text
);

CREATE INDEX IF NOT EXISTS idx_seo_pages_published ON seo_pages (published);
CREATE INDEX IF NOT EXISTS idx_seo_pages_slug ON seo_pages (slug);

CREATE TABLE IF NOT EXISTS faq_items (
  id text PRIMARY KEY,
  "seoPageId" text REFERENCES seo_pages(id) ON DELETE CASCADE,
  question text NOT NULL,
  answer text NOT NULL,
  "sortOrder" integer NOT NULL DEFAULT 0,
  published integer NOT NULL DEFAULT 1,
  "createdAt" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  "updatedAt" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  "deletedAt" text
);

CREATE INDEX IF NOT EXISTS idx_faq_items_seo_page ON faq_items ("seoPageId");

CREATE TABLE IF NOT EXISTS blog_posts (
  id text PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL,
  "metaTitle" text,
  "metaDescription" text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  "publishedAt" text,
  "createdAt" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  "updatedAt" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  "deletedAt" text
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts (status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug);

CREATE TABLE IF NOT EXISTS system_configs (
  id text PRIMARY KEY,
  key text NOT NULL UNIQUE,
  value text NOT NULL,
  "valueType" text NOT NULL DEFAULT 'string' CHECK ("valueType" IN ('string', 'number', 'boolean', 'json', 'secret')),
  "groupName" text NOT NULL DEFAULT 'general',
  description text,
  "createdAt" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  "updatedAt" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  "deletedAt" text
);

CREATE INDEX IF NOT EXISTS idx_system_configs_group ON system_configs ("groupName");

CREATE TABLE IF NOT EXISTS analytics_events (
  id text PRIMARY KEY,
  "eventName" text NOT NULL CHECK ("eventName" IN ('page_view', 'download_click', 'download_success', 'download_failed')),
  "pagePath" text,
  keyword text,
  platform text,
  country text,
  device text,
  referrer text,
  "ipHash" text,
  "sessionHash" text,
  metadata text NOT NULL DEFAULT '{}',
  "createdAt" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  "updatedAt" text NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  "deletedAt" text
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events ("createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON analytics_events ("eventName");
CREATE INDEX IF NOT EXISTS idx_analytics_events_country ON analytics_events (country);
CREATE INDEX IF NOT EXISTS idx_analytics_events_keyword ON analytics_events (keyword);
