import type { Metadata } from "next";
import type { CreatorTool } from "@/data/creator-tools";
import { toolCanonicalUrl, toolOgImageUrl } from "@/data/creator-tools";

export function createToolMetadata(tool: CreatorTool): Metadata {
  const canonicalUrl = toolCanonicalUrl(tool);
  const ogImageUrl = toolOgImageUrl(tool);

  return {
    title: tool.pageTitle,
    description: tool.metaDescription,
    keywords: tool.keywords,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: tool.pageTitle,
      description: tool.metaDescription,
      url: canonicalUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${tool.title} by ClipToolkit`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: tool.pageTitle,
      description: tool.metaDescription,
      images: [ogImageUrl]
    }
  };
}
