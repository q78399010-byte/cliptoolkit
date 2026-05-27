import type { Metadata } from "next";
import { absoluteUrl, getSiteName, normalizePath } from "@/lib/seo/site";

export type SeoMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function createPageMetadata(input: SeoMetadataInput): Metadata {
  const canonical = normalizePath(input.path);
  const url = absoluteUrl(canonical);
  const siteName = getSiteName();

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      type: input.type ?? "website",
      siteName,
      title: input.title,
      description: input.description,
      url,
      publishedTime: input.publishedTime,
      modifiedTime: input.modifiedTime
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description
    }
  };
}
