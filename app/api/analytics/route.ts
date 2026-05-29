import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  void request;
  return new NextResponse(null, { status: 204 });
}
