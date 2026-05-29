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
  void args;
}

export function trackGaEvent(eventName: string, parameters?: Record<string, unknown>) {
  void eventName;
  void parameters;
}
