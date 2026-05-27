import { NextResponse } from "next/server";
import { analyzeUrl } from "@/lib/providers/analyze-service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    let body: { url?: string };

    try {
      body = (await request.json()) as { url?: string };
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const result = await analyzeUrl(String(body.url ?? ""));

    return NextResponse.json(result, {
      status: result.status === "success" ? 200 : 422,
      headers: result.cacheHit ? { "x-cache": "HIT" } : { "x-cache": "MISS" }
    });
  } catch (error) {
    console.error("download analyze failed", error);
    return NextResponse.json({ error: "Download task failed." }, { status: 500 });
  }
}
