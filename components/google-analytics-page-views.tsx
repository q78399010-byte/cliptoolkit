"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { GA_TAG_ID, sendGtag } from "@/lib/google-analytics";

function GoogleAnalyticsPageViewsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  useEffect(() => {
    const pagePath = queryString ? `${pathname}?${queryString}` : pathname;

    sendGtag("config", GA_TAG_ID, {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title
    });
  }, [pathname, queryString]);

  return null;
}

export function GoogleAnalyticsPageViews() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsPageViewsInner />
    </Suspense>
  );
}
