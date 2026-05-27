import { createPageMetadata } from "@/lib/seo/metadata";

export type SeoBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  publishedAt: Date;
  updatedAt: Date;
};

const publishedAt = new Date("2026-01-01T00:00:00.000Z");

export const staticBlogPosts: SeoBlogPost[] = [
  {
    slug: "how-to-save-tiktok-videos-without-watermark",
    title: "How to Save TikTok Videos Without Watermark",
    excerpt: "A practical guide for saving public TikTok videos from your browser.",
    metaTitle: "How to Save TikTok Videos Without Watermark",
    metaDescription: "Learn how to save public TikTok videos without watermark from your browser.",
    publishedAt,
    updatedAt: publishedAt,
    content: `
## Quick answer

Copy the public TikTok video link, paste it into Creator Toolkit, and analyze the video. If the configured provider returns a clean source file, use the Download Video button to save it.

## Step-by-step

- Open the TikTok video you want to save.
- Use the share menu to copy the public video link.
- Paste the link into the downloader input.
- Wait for the result card and choose the available video or audio option.

## Notes before downloading

Only download videos you own, are authorized to use, or are legally allowed to save. Availability can vary by provider and by the public media sources exposed for a specific video.
`.trim()
  },
  {
    slug: "download-instagram-reels-online",
    title: "Download Instagram Reels Online",
    excerpt: "What to know before saving Instagram Reels links in HD.",
    metaTitle: "Download Instagram Reels Online",
    metaDescription: "Learn how to download public Instagram Reels online in HD.",
    publishedAt,
    updatedAt: publishedAt,
    content: `
## Quick answer

Copy a public Instagram Reels link, paste it into Creator Toolkit, and analyze the URL. The result card shows the available video, cover, or audio options returned by the provider.

## How to download a Reel

- Open the public Instagram Reel.
- Copy the Reel link from the share menu.
- Paste the link into the downloader.
- Download the available HD video option when it appears.

## Why the result can vary

Instagram pages can expose different media data depending on region, privacy, and provider availability. Creator Toolkit keeps the interface consistent while the provider layer handles parsing.
`.trim()
  }
];

export function getStaticBlogPost(slug: string) {
  return staticBlogPosts.find((post) => post.slug === slug) ?? null;
}

export function createBlogMetadata(post: SeoBlogPost) {
  return createPageMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt.toISOString(),
    modifiedTime: post.updatedAt.toISOString()
  });
}
