import { NextResponse } from "next/server";

export const runtime = "nodejs";

function cleanFilename(value: string | null) {
  const base = value?.trim() || "creator-toolkit-download";
  return base.replace(/[^a-z0-9._-]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "download";
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const mediaUrl = requestUrl.searchParams.get("url");
  const filename = cleanFilename(requestUrl.searchParams.get("filename"));
  const type = requestUrl.searchParams.get("type") === "audio" ? "audio" : "video";

  if (!mediaUrl) {
    return NextResponse.json({ error: "Missing media URL." }, { status: 400 });
  }

  let parsed: URL;

  try {
    parsed = new URL(mediaUrl);
  } catch {
    return NextResponse.json({ error: "Invalid media URL." }, { status: 400 });
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    return NextResponse.json({ error: "Invalid media URL." }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(parsed, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        accept: type === "audio" ? "audio/*,*/*;q=0.8" : "video/*,*/*;q=0.8",
        referer: `${parsed.protocol}//${parsed.host}/`
      }
    });

    if (!response.ok || !response.body) {
      return NextResponse.json({ error: "Media download failed." }, { status: 502 });
    }

    const contentType =
      response.headers.get("content-type") ?? (type === "audio" ? "audio/mpeg" : "video/mp4");
    const extension = type === "audio" ? "mp3" : "mp4";

    return new Response(response.body, {
      status: 200,
      headers: {
        "content-type": contentType,
        "content-disposition": `attachment; filename="${filename}.${extension}"`,
        "cache-control": "private, max-age=300"
      }
    });
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "Media download timed out."
        : "Media download failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
