export type SupportedPlatform = "tiktok" | "instagram";

const platformMatchers: Array<{
  platform: SupportedPlatform;
  pattern: RegExp;
}> = [
  {
    platform: "tiktok",
    pattern: /(^|\.)tiktok\.com|(^|\.)vm\.tiktok\.com|(^|\.)vt\.tiktok\.com/i
  },
  {
    platform: "instagram",
    pattern: /(^|\.)instagram\.com|(^|\.)instagr\.am/i
  }
];

export function detectSupportedPlatform(value: string): SupportedPlatform | null {
  try {
    const url = new URL(value.trim());
    const host = url.hostname.replace(/^www\./, "");
    return platformMatchers.find((matcher) => matcher.pattern.test(host))?.platform ?? null;
  } catch {
    return null;
  }
}

export function normalizeInputUrl(value: string): string {
  const parsed = new URL(value.trim());
  parsed.hash = "";
  return parsed.toString();
}
