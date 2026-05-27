import { NextResponse } from "next/server";
import { analyzeUrl } from "@/lib/providers/analyze-service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    let body: { url?: string };

    try {
      body = (await request.json()) as { url?: string };
    } catch {
      return NextResponse.json(
        {
          title: null,
          thumbnail: null,
          duration: null,
          downloadUrls: [],
          audioUrl: null,
          platform: null,
          status: "failed",
          error: "Invalid request body.",
          errorCode: "INVALID_URL"
        },
        { status: 400 }
      );
    }

    const result = await analyzeUrl(String(body.url ?? ""));
    const status = result.status === "success" ? 200 : result.errorCode === "UNSUPPORTED_URL" ? 400 : 422;

    return NextResponse.json(result, {
      status,
      headers: result.cacheHit ? { "x-cache": "HIT" } : { "x-cache": "MISS" }
    });
  } catch (error) {
    console.error("analyze failed", error);
    return NextResponse.json(
      {
        title: null,
        thumbnail: null,
        duration: null,
        downloadUrls: [],
        audioUrl: null,
        platform: null,
        status: "failed",
        error: "Analyze failed. Please try again.",
        errorCode: "PARSE_FAILED"
      },
      { status: 500 }
    );
  }
}
