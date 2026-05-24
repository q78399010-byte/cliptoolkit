import type { MarketingPage } from "@/lib/seo/pages";

export const programmaticSeoPages: MarketingPage[] = [
  {
    slug: "download-tiktok-video-online",
    eyebrow: "TikTok video downloader",
    h1: "Download TikTok Video Online",
    subtitle: "Fast, Free, HD Quality.",
    contentTitle: "Online TikTok video downloads",
    content:
      "This SEO page targets users looking for a direct online TikTok downloader. It reuses the same conversion-focused download box and can later be generated from admin-managed templates.",
    faqs: [
      {
        question: "How do I download a TikTok video online?",
        answer: "Paste a public TikTok video link into the download box and start the download flow."
      },
      {
        question: "Is this page different from the main TikTok downloader?",
        answer:
          "It targets a specific search intent while using the same provider-backed download experience."
      }
    ],
    metadata: {
      title: "Download TikTok Video Online",
      description:
        "Download TikTok video online without installing an app. Paste a link and save HD video, cover, or MP3 audio.",
      alternates: { canonical: "/download-tiktok-video-online" }
    }
  },
  {
    slug: "download-instagram-reels-hd",
    eyebrow: "Instagram Reels downloader",
    h1: "Download Instagram Reels HD",
    subtitle: "Fast, Free, HD Quality.",
    contentTitle: "HD Instagram Reels downloader",
    content:
      "This page targets HD Instagram Reels download searches and is generated from the same lightweight marketing page model used across the MVP.",
    faqs: [
      {
        question: "Can I download Instagram Reels in HD?",
        answer:
          "Creator Toolkit is designed to return HD options when they are available from the configured provider."
      },
      {
        question: "Do Instagram Reels links work on mobile?",
        answer: "Yes. The downloader is built mobile-first for fast paste and download actions."
      }
    ],
    metadata: {
      title: "Download Instagram Reels HD",
      description:
        "Download Instagram Reels in HD from public links. Save video, cover image, and MP3 audio online.",
      alternates: { canonical: "/download-instagram-reels-hd" }
    }
  },
  {
    slug: "how-to-download-tiktok-videos",
    eyebrow: "TikTok guide",
    h1: "How to Download TikTok Videos",
    subtitle: "A fast browser-based TikTok download flow.",
    contentTitle: "Simple TikTok download steps",
    content:
      "Copy a public TikTok video link, paste it into Creator Toolkit, and use the download result options. This page is structured for how-to search intent and FAQ rich results.",
    faqs: [
      {
        question: "What link should I paste?",
        answer: "Paste the public TikTok video link copied from the TikTok share menu."
      },
      {
        question: "Can I save audio too?",
        answer: "The provider pipeline is designed to expose MP3 audio when available."
      }
    ],
    metadata: {
      title: "How to Download TikTok Videos",
      description:
        "Learn how to download TikTok videos online from a public link with a fast mobile-first downloader.",
      alternates: { canonical: "/how-to-download-tiktok-videos" }
    }
  },
  {
    slug: "tiktok-video-downloader-no-watermark",
    eyebrow: "No watermark downloader",
    h1: "TikTok Video Downloader No Watermark",
    subtitle: "Download clean TikTok videos from public links.",
    contentTitle: "No watermark TikTok downloads",
    content:
      "This programmatic SEO page targets no-watermark TikTok searches and keeps the same high-conversion interface above the fold.",
    faqs: [
      {
        question: "Does this remove the TikTok watermark?",
        answer:
          "The downloader is designed to return no-watermark options when the configured provider supports them."
      },
      {
        question: "Is it free?",
        answer: "The MVP is designed as a free downloader with future monetization through ads."
      }
    ],
    metadata: {
      title: "TikTok Video Downloader No Watermark",
      description:
        "Use a TikTok video downloader with no watermark support. Paste a public link and save online.",
      alternates: { canonical: "/tiktok-video-downloader-no-watermark" }
    }
  }
];

export function getProgrammaticSeoPage(slug: string) {
  return programmaticSeoPages.find((page) => page.slug === slug) ?? null;
}
