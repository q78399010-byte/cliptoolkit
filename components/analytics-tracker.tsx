"use client";

import { useEffect } from "react";

function getSessionId() {
  const key = "creator_toolkit_session";
  const existing = window.localStorage.getItem(key);

  if (existing) {
    return existing;
  }

  const next = crypto.randomUUID();
  window.localStorage.setItem(key, next);
  return next;
}

export function trackAnalyticsEvent(input: {
  eventName: "page_view" | "download_click" | "download_success" | "download_failed";
  pagePath?: string;
  keyword?: string;
  platform?: string;
  metadata?: Record<string, unknown>;
}) {
  const payload = JSON.stringify({
    ...input,
    pagePath: input.pagePath ?? window.location.pathname,
    sessionId: getSessionId()
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics", new Blob([payload], { type: "application/json" }));
    return;
  }

  void fetch("/api/analytics", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
    keepalive: true
  });
}

export function AnalyticsTracker() {
  useEffect(() => {
    trackAnalyticsEvent({
      eventName: "page_view",
      pagePath: window.location.pathname,
      keyword: document.title
    });
  }, []);

  return null;
}
