export const GA_TAG_ID = "G-VZW61VT2Y";

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

export function sendGtag(...args: GtagArguments) {
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

export function trackGaPageView(parameters: Record<string, unknown>) {
  trackGaEvent("page_view", parameters);
}
