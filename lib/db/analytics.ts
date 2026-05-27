import "server-only";
import crypto from "node:crypto";
import { headers } from "next/headers";
import { query } from "@/lib/db/client";

export type AnalyticsEventName =
  | "page_view"
  | "download_click"
  | "download_success"
  | "download_failed";

function hashValue(value: string | null) {
  if (!value) {
    return null;
  }

  const salt = process.env.ANALYTICS_SALT ?? process.env.ANALYTICS_HASH_SALT;

  if (!salt) {
    throw new Error("ANALYTICS_SALT must be set in .env.local before recording analytics.");
  }

  return crypto.createHash("sha256").update(`${salt}:${value}`).digest("hex");
}

export async function recordAnalyticsEvent(input: {
  eventName: AnalyticsEventName;
  pagePath?: string;
  keyword?: string;
  platform?: string;
  country?: string;
  device?: string;
  referrer?: string;
  ip?: string | null;
  sessionId?: string | null;
  metadata?: Record<string, unknown>;
}) {
  const now = new Date();

  await query(
    `
      INSERT INTO analytics_events (
        id, "eventName", "pagePath", keyword, platform, country, device, referrer,
        "ipHash", "sessionHash", metadata, "createdAt", "updatedAt"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $12)
    `,
    [
      crypto.randomUUID(),
      input.eventName,
      input.pagePath ?? null,
      input.keyword ?? null,
      input.platform ?? null,
      input.country ?? null,
      input.device ?? null,
      input.referrer ?? null,
      hashValue(input.ip ?? null),
      hashValue(input.sessionId ?? null),
      input.metadata ?? {},
      now
    ]
  );
}

export async function getRequestAnalyticsContext() {
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() ?? requestHeaders.get("x-real-ip");
  const country = requestHeaders.get("cf-ipcountry") ?? null;
  const userAgent = requestHeaders.get("user-agent") ?? "";
  const referrer = requestHeaders.get("referer") ?? null;
  const device = /mobile|android|iphone|ipad/i.test(userAgent) ? "mobile" : "desktop";

  return {
    ip,
    country,
    device,
    referrer,
    userAgent
  };
}
