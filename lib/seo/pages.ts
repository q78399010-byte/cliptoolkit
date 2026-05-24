import type { Metadata } from "next";

export type PageFaq = {
  question: string;
  answer: string;
};

export type MarketingPage = {
  slug: string;
  eyebrow: string;
  h1: string;
  subtitle: string;
  contentTitle: string;
  content: string;
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
  contentTitle: "Download short videos faster",
  content:
    "Creator Toolkit is a lightweight web downloader for TikTok and Instagram Reels. Paste a public video link, let the system identify the platform, and save video, cover image, or MP3 audio from one clean interface.",
  faqs: defaultFaqs,
  metadata: {
    title: "Download TikTok & Instagram Videos Without Watermark",
    description:
      "Fast, free TikTok and Instagram Reels downloader for HD video, cover images, and MP3 audio.",
    alternates: { canonical: "/" }
  }
};

export const tiktokPage: MarketingPage = {
  slug: "tiktok-downloader",
  eyebrow: "TikTok downloader",
  h1: "TikTok Downloader Without Watermark",
  subtitle: "Paste a TikTok link and save HD video, cover, or MP3 audio.",
  contentTitle: "Save TikTok videos online",
  content:
    "Use Creator Toolkit to download public TikTok videos from your browser. The TikTok provider layer is isolated, so parsing sources can be replaced without changing the user experience.",
  faqs: defaultFaqs,
  metadata: {
    title: "TikTok Downloader Without Watermark",
    description:
      "Download TikTok videos without watermark online. Save HD TikTok video, cover images, and MP3 audio from public links.",
    alternates: { canonical: "/tiktok-downloader" }
  }
};

export const instagramPage: MarketingPage = {
  slug: "instagram-reels-downloader",
  eyebrow: "Instagram downloader",
  h1: "Instagram Reels Downloader",
  subtitle: "Download Instagram Reels in HD from a public link.",
  contentTitle: "Save Instagram Reels in HD",
  content:
    "Creator Toolkit recognizes Instagram links and routes them to a replaceable provider pipeline. The MVP keeps the page fast, simple, and focused on Reels download intent.",
  faqs: defaultFaqs,
  metadata: {
    title: "Instagram Reels Downloader HD",
    description:
      "Download Instagram Reels online in HD. Save public Instagram Reels videos, covers, and MP3 audio.",
    alternates: { canonical: "/instagram-reels-downloader" }
  }
};

export const staticMarketingPages = [homePage, tiktokPage, instagramPage];
