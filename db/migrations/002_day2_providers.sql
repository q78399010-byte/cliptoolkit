CREATE TABLE IF NOT EXISTS providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  platform text NOT NULL CHECK (platform IN ('tiktok', 'instagram')),
  "displayName" text NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  "configJson" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "deletedAt" timestamptz
);

CREATE INDEX IF NOT EXISTS idx_providers_platform ON providers (platform);
CREATE INDEX IF NOT EXISTS idx_providers_enabled ON providers (enabled);
