export function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export function getMetaContent(html: string, property: string) {
  const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`,
      "i"
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${escaped}["'][^>]*>`,
      "i"
    )
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);

    if (match?.[1]) {
      return decodeHtmlEntities(match[1]);
    }
  }

  return null;
}

export function getScriptJsonById(html: string, id: string) {
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = html.match(
    new RegExp(`<script[^>]+id=["']${escaped}["'][^>]*>([\\s\\S]*?)<\\/script>`, "i")
  );

  if (!match?.[1]) {
    return null;
  }

  try {
    return JSON.parse(decodeHtmlEntities(match[1].trim())) as unknown;
  } catch {
    return null;
  }
}

export function getLdJsonObjects(html: string) {
  const objects: unknown[] = [];
  const pattern =
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(html))) {
    try {
      objects.push(JSON.parse(decodeHtmlEntities(match[1].trim())));
    } catch {
      // Ignore unrelated or malformed structured data blocks.
    }
  }

  return objects;
}

export function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

export function asString(value: unknown) {
  return typeof value === "string" && value.trim() ? value : null;
}

export function asNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim() && Number.isFinite(Number(value))) {
    return Number(value);
  }

  return null;
}

export function compactUrl(value: unknown) {
  const url = asString(value);

  if (!url) {
    return null;
  }

  return decodeHtmlEntities(url);
}

export function walkRecords(value: unknown, visitor: (record: Record<string, unknown>) => boolean | void) {
  const seen = new Set<unknown>();
  const stack = [value];

  while (stack.length) {
    const current = stack.pop();

    if (!current || seen.has(current)) {
      continue;
    }

    seen.add(current);

    if (Array.isArray(current)) {
      for (const item of current) {
        stack.push(item);
      }
      continue;
    }

    const record = asRecord(current);

    if (!record) {
      continue;
    }

    if (visitor(record) === true) {
      return;
    }

    for (const item of Object.values(record)) {
      if (item && typeof item === "object") {
        stack.push(item);
      }
    }
  }
}
