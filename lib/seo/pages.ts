import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo/metadata";

export type PageFaq = {
  question: string;
  answer: string;
};

export type SeoSection = {
  title: string;
  body: string;
};

export type MarketingPage = {
  slug: string;
  eyebrow: string;
  h1: string;
  subtitle: string;
  contentTitle: string;
  content: string;
  seoSections?: SeoSection[];
  howToSteps?: string[];
  updatedAt?: Date;
  faqs: PageFaq[];
  metadata: Metadata;
};

const defaultFaqs: PageFaq[] = [
  {
    question: "Can I download TikTok videos without watermark?",
    answer:
      "Yes. Paste a public TikTok link and Creator Toolkit is built to return clean video options when the provider supports that source."
  },
  {
    question: "Does it work with Instagram Reels?",
    answer:
      "Yes. Instagram Reels links are recognized automatically and will use the Instagram provider pipeline."
  },
  {
    question: "Do I need to install an app?",
    answer:
      "No. Creator Toolkit runs in the browser and is designed for quick mobile downloads."
  }
];

export const homePage: MarketingPage = {
  slug: "",
  eyebrow: "Free video downloader",
  h1: "Download TikTok & Instagram Videos Without Watermark",
  subtitle: "Fast, Free, HD Quality.",
  contentTitle: "TikTok downloader and Instagram downloader for fast HD saves",
  content:
    "Creator Toolkit is a lightweight web downloader for TikTok videos and Instagram Reels. Paste a public video link, let the analyzer identify the platform, and use the download result card to save the available video or audio file. The flow is intentionally simple because most users arrive with one job: copy a link, paste it, and download without confusion.",
  seoSections: [
    {
      title: "TikTok downloader built for mobile search intent",
      body:
        "When someone searches for a TikTok downloader, they usually need a fast answer on a phone. Creator Toolkit keeps the input field above the fold, recognizes TikTok URLs automatically, and prepares the download options in a single result card. When the configured provider returns a clean source file, the tool can support no-watermark downloads without forcing users through extra pages."
    },
    {
      title: "Instagram downloader for Reels and short videos",
      body:
        "The Instagram downloader path follows the same interface, so users do not need to pick a platform before pasting a link. Public Instagram Reels URLs are routed to the Instagram provider, then presented with cover, duration, platform, and download actions. This creates a consistent experience for creators who save short videos from multiple social platforms."
    },
    {
      title: "HD video download without keyword stuffing",
      body:
        "The page is structured around real download intent rather than repeated phrases. It explains TikTok downloader, Instagram downloader, without watermark, and HD video download use cases naturally while keeping the primary conversion action visible. That balance helps the homepage stay useful for users and crawlable for search engines."
    }
  ],
  howToSteps: ["Paste a public TikTok or Instagram link", "Analyze the video", "Download video or audio"],
  faqs: defaultFaqs,
  metadata: createPageMetadata({
    title: "Download TikTok & Instagram Videos Without Watermark",
    description:
      "Fast, free TikTok and Instagram Reels downloader for HD video, cover images, and MP3 audio.",
    path: "/"
  })
};

export const tiktokPage: MarketingPage = {
  slug: "tiktok-downloader",
  eyebrow: "TikTok downloader",
  h1: "TikTok Downloader Without Watermark",
  subtitle: "Paste a TikTok link and save HD video, cover, or MP3 audio.",
  contentTitle: "Save TikTok videos online",
  content:
    "Use Creator Toolkit to download public TikTok videos from your browser. Paste a TikTok URL, let the analyzer detect the video, and choose the available HD video or audio download option. The TikTok provider layer is isolated, so parsing sources can be replaced without changing the user experience.",
  seoSections: [
    {
      title: "Online TikTok downloader",
      body:
        "This TikTok downloader is designed for quick browser-based use. It keeps the paste box visible, validates TikTok links automatically, and returns download actions as soon as provider data is available."
    },
    {
      title: "No-watermark download support",
      body:
        "When no-watermark files are exposed by the configured provider, the result card prioritizes the clean video download path so users can save the file with fewer taps."
    }
  ],
  howToSteps: ["Copy a public TikTok video link", "Paste it into the downloader", "Download the available HD video"],
  faqs: defaultFaqs,
  metadata: createPageMetadata({
    title: "TikTok Downloader Without Watermark",
    description:
      "Download TikTok videos without watermark online. Save HD TikTok video, cover images, and MP3 audio from public links.",
    path: "/tiktok-downloader"
  })
};

export const instagramPage: MarketingPage = {
  slug: "instagram-reels-downloader",
  eyebrow: "Instagram downloader",
  h1: "Instagram Reels Downloader",
  subtitle: "Download Instagram Reels in HD from a public link.",
  contentTitle: "Save Instagram Reels in HD",
  content:
    "Creator Toolkit recognizes Instagram links and routes them to a replaceable provider pipeline. Paste a public Instagram Reels URL, analyze the page, and download the available video or audio asset from a clean mobile-first result card.",
  seoSections: [
    {
      title: "Instagram Reels downloader",
      body:
        "The Instagram downloader supports high-intent Reels download searches with a direct paste-and-analyze flow. It avoids platform selection screens and keeps the result focused on the available media files."
    },
    {
      title: "HD Instagram video download",
      body:
        "When an HD video source is available from the provider, Creator Toolkit presents it as the primary download action so users can save the best available version quickly."
    }
  ],
  howToSteps: ["Copy a public Instagram Reels link", "Paste it into Creator Toolkit", "Download the available HD video"],
  faqs: defaultFaqs,
  metadata: createPageMetadata({
    title: "Instagram Reels Downloader HD",
    description:
      "Download Instagram Reels online in HD. Save public Instagram Reels videos, covers, and MP3 audio.",
    path: "/instagram-reels-downloader"
  })
};

export const staticMarketingPages = [homePage, tiktokPage, instagramPage];
