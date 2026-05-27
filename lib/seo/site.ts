export function getSiteName() {
  return process.env.NEXT_PUBLIC_SITE_NAME ?? "Creator Toolkit";
}

function normalizeDomain(value: string) {
  return value.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function getSiteUrl() {
  const explicitUrl = process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL;

  if (explicitUrl) {
    return explicitUrl.replace(/\/$/, "");
  }

  if (process.env.DOMAIN) {
    return `https://${normalizeDomain(process.env.DOMAIN)}`;
  }

  return "https://creator-toolkit.com";
}

export function getCdnUrl() {
  return process.env.CDN_URL?.replace(/\/$/, "") ?? "";
}

export function normalizePath(path: string) {
  if (!path || path === "home") {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function absoluteUrl(path: string) {
  const normalizedPath = normalizePath(path);
  return `${getSiteUrl()}${normalizedPath}`;
}
