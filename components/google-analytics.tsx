"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const defaultMeasurementId = "G-VZW61VT2Y";

type GtagArguments =
  | [command: "js", date: Date]
  | [command: "config", targetId: string, config?: Record<string, unknown>]
  | [command: "event", eventName: string, parameters?: Record<string, unknown>];

declare global {
  interface Window {
    dataLayer?: GtagArguments[];
    gtag?: (...args: GtagArguments) => void;
  }
}

function getMeasurementId() {
  const configuredId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? defaultMeasurementId;
  return /^G-[A-Z0-9]+$/i.test(configuredId) ? configuredId : defaultMeasurementId;
}

const measurementId = getMeasurementId();

function sendGtag(...args: GtagArguments) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.gtag =
    window.gtag ??
    ((...gtagArgs: GtagArguments) => {
      window.dataLayer?.push(gtagArgs);
    });
  window.gtag(...args);
}

export function trackGaEvent(eventName: string, parameters?: Record<string, unknown>) {
  sendGtag("event", eventName, parameters);
}

function GoogleAnalyticsPageViews() {
  const pathname = usePathname();

  useEffect(() => {
    const pagePath = `${window.location.pathname}${window.location.search}`;
    sendGtag("config", measurementId, {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title
    });
  }, [pathname]);

  return null;
}

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: false });
        `}
      </Script>
      <GoogleAnalyticsPageViews />
    </>
  );
}
