import "server-only";
import crypto from "node:crypto";
import { query } from "@/lib/db/client";
import type { DownloadTask, Platform } from "@/lib/db/types";

function hashValue(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export async function createDownloadTask(input: {
  url: string;
  normalizedUrl: string;
  platform: Platform;
  provider: string;
  status?: DownloadTask["status"];
  cacheHit?: boolean;
  ip?: string | null;
  country?: string | null;
  device?: string | null;
  userAgent?: string | null;
  referrer?: string | null;
  title?: string | null;
  thumbnailUrl?: string | null;
  videoUrl?: string | null;
  coverUrl?: string | null;
  audioUrl?: string | null;
  responseTime?: number | null;
  reason?: string | null;
  errorCode?: string | null;
  metadata?: Record<string, unknown>;
}) {
  const id = crypto.randomUUID();
  const now = new Date();
  const normalizedUrl = input.normalizedUrl || input.url;

  const result = await query<{ id: string }>(
    `
      INSERT INTO download_tasks (
        id, url, "normalizedUrl", "urlHash", platform, provider, status,
        "responseTime", "cacheHit", "ipHash", country, device, "userAgent", referrer,
        title, "thumbnailUrl", "videoUrl", "coverUrl", "audioUrl",
        reason, "errorCode", metadata, "createdAt", "updatedAt"
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12, $13, $14,
        $15, $16, $17, $18, $19,
        $20, $21, $22, $23, $23
      )
      RETURNING id
    `,
    [
      id,
      input.url,
      normalizedUrl,
      hashValue(normalizedUrl),
      input.platform,
      input.provider,
      input.status ?? "pending",
      input.responseTime ?? null,
      input.cacheHit ?? false,
      input.ip ? hashValue(input.ip) : null,
      input.country ?? null,
      input.device ?? null,
      input.userAgent ?? null,
      input.referrer ?? null,
      input.title ?? null,
      input.thumbnailUrl ?? null,
      input.videoUrl ?? null,
      input.coverUrl ?? null,
      input.audioUrl ?? null,
      input.reason ?? null,
      input.errorCode ?? null,
      input.metadata ?? {},
      now
    ]
  );

  return result.rows[0]?.id ?? id;
}
