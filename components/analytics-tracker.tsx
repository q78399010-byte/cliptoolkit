"use client";

export function trackAnalyticsEvent(input: {
  eventName: "page_view" | "download_click" | "download_success" | "download_failed";
  pagePath?: string;
  keyword?: string;
  platform?: string;
  metadata?: Record<string, unknown>;
}) {
  void input;
}

export function AnalyticsTracker() {
  return null;
}
