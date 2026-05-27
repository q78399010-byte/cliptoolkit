import type { JsonLd } from "@/lib/seo/schema";

export function StructuredData({ data }: { data: Array<JsonLd | null | undefined> }) {
  const graph = data.filter(Boolean);

  if (!graph.length) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph.length === 1 ? graph[0] : graph).replace(/</g, "\\u003c")
      }}
    />
  );
}
