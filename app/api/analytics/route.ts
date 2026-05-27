import { NextResponse } from "next/server";
import { getRequestAnalyticsContext, recordAnalyticsEvent } from "@/lib/db/analytics";

const allowedEvents = new Set(["page_view", "download_click", "download_success", "download_failed"]);

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      eventName?: string;
      pagePath?: string;
      keyword?: string;
      platform?: string;
      sessionId?: string;
      metadata?: Record<string, unknown>;
    };

    if (!body.eventName || !allowedEvents.has(body.eventName)) {
      return NextResponse.json({ error: "Invalid eventName" }, { status: 400 });
    }

    const context = await getRequestAnalyticsContext();

    await recordAnalyticsEvent({
      eventName: body.eventName as "page_view" | "download_click" | "download_success" | "download_failed",
      pagePath: body.pagePath,
      keyword: body.keyword,
      platform: body.platform,
      sessionId: body.sessionId,
      metadata: body.metadata ?? {},
      ip: context.ip,
      country: context.country ?? undefined,
      device: context.device,
      referrer: context.referrer ?? undefined
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("analytics event failed", error);
    return NextResponse.json({ error: "Analytics event failed" }, { status: 500 });
  }
}
