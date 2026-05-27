import { createPageMetadata } from "@/lib/seo/metadata";
import type { MarketingPage, PageFaq, SeoSection } from "@/lib/seo/pages";

type ProgrammaticSeoConfig = {
  slug: string;
  eyebrow: string;
  h1: string;
  title: string;
  description: string;
  subtitle: string;
  contentTitle: string;
  content: string;
  seoSections: SeoSection[];
  howToSteps: string[];
  faqs: PageFaq[];
};

function createProgrammaticPage(config: ProgrammaticSeoConfig): MarketingPage {
  return {
    slug: config.slug,
    eyebrow: config.eyebrow,
    h1: config.h1,
    subtitle: config.subtitle,
    contentTitle: config.contentTitle,
    content: config.content,
    seoSections: config.seoSections,
    howToSteps: config.howToSteps,
    faqs: config.faqs,
    metadata: createPageMetadata({
      title: config.title,
      description: config.description,
      path: `/${config.slug}`
    })
  };
}

const programmaticConfigs: ProgrammaticSeoConfig[] = [
  {
    slug: "download-tiktok-video-online",
    eyebrow: "TikTok video downloader",
    h1: "Download TikTok Video Online",
    title: "Download TikTok Video Online",
    description:
      "Download TikTok video online without installing an app. Paste a link and save HD video, cover, or MP3 audio.",
    subtitle: "Fast, Free, HD Quality.",
    contentTitle: "Online TikTok video downloads",
    content:
      "This SEO page targets users who want to download a TikTok video online from a browser. It uses the same high-conversion downloader as the homepage, so visitors can paste a public TikTok URL, analyze it, and download available media without navigating to another tool.",
    seoSections: [
      {
        title: "Download TikTok video from a browser",
        body:
          "The online flow is useful when a user does not want to install an app or extension. Creator Toolkit keeps the TikTok downloader accessible from mobile and desktop browsers with a direct paste field and clear result card."
      },
      {
        title: "Built for public TikTok links",
        body:
          "The downloader is intended for public videos that users are allowed to save. It detects TikTok URLs automatically and routes them through the configured TikTok provider."
      }
    ],
    howToSteps: ["Copy a public TikTok URL", "Paste it into the online downloader", "Choose the available download option"],
    faqs: [
      {
        question: "How do I download a TikTok video online?",
        answer: "Paste a public TikTok video link into the download box, analyze it, and choose the available video or audio option."
      },
      {
        question: "Do I need to install an app?",
        answer: "No. The TikTok downloader runs in your browser and is designed for fast mobile use."
      }
    ]
  },
  {
    slug: "download-tiktok-video-without-watermark",
    eyebrow: "No watermark TikTok downloader",
    h1: "Download TikTok Video Without Watermark",
    title: "Download TikTok Video Without Watermark",
    description:
      "Download TikTok videos without watermark from public links. Paste a TikTok URL and save the available HD video online.",
    subtitle: "Clean TikTok downloads when the source supports it.",
    contentTitle: "TikTok downloads without watermark",
    content:
      "This page is built for no-watermark TikTok download intent. Paste a public TikTok link, let the analyzer fetch available media, and use the primary video button when a clean file is returned by the provider.",
    seoSections: [
      {
        title: "No-watermark TikTok intent",
        body:
          "People searching for no-watermark TikTok downloads usually want the cleanest available video file quickly. The result card puts the video action first and avoids extra choices that slow the download."
      },
      {
        title: "Provider-based availability",
        body:
          "No-watermark availability depends on the media source returned by the configured provider. When it is available, Creator Toolkit presents it as a direct download option."
      }
    ],
    howToSteps: ["Copy the TikTok share link", "Paste it into Creator Toolkit", "Download the available no-watermark video"],
    faqs: [
      {
        question: "Can I download TikTok without watermark?",
        answer: "The downloader is designed to return no-watermark options when the configured provider exposes a clean source file."
      },
      {
        question: "Is the no-watermark downloader free?",
        answer: "Yes. The core TikTok downloader flow is free to use."
      }
    ]
  },
  {
    slug: "tiktok-downloader-hd",
    eyebrow: "HD TikTok downloader",
    h1: "TikTok Downloader HD",
    title: "TikTok Downloader HD",
    description:
      "Use an HD TikTok downloader to save public TikTok videos online. Paste a link and download the best available video quality.",
    subtitle: "Save the best available TikTok video quality.",
    contentTitle: "HD TikTok video downloader",
    content:
      "This page targets users who care about video quality. Creator Toolkit analyzes the public TikTok link and surfaces the available download file with a large mobile-friendly action button.",
    seoSections: [
      {
        title: "HD video download flow",
        body:
          "The interface is optimized for quick HD video downloads. It shows the platform, title, cover, and duration so users can confirm the right video before saving."
      },
      {
        title: "Mobile-first TikTok downloader",
        body:
          "Most TikTok download searches happen on phones. The input, loading feedback, and result buttons are sized for touch screens first."
      }
    ],
    howToSteps: ["Paste a public TikTok video link", "Wait for the HD download result", "Tap Download Video"],
    faqs: [
      {
        question: "Can I download TikTok videos in HD?",
        answer: "Creator Toolkit presents the best available video file returned by the configured TikTok provider."
      },
      {
        question: "Does HD download work on mobile?",
        answer: "Yes. The downloader UI is mobile-first and works from a browser."
      }
    ]
  },
  {
    slug: "download-instagram-reels-hd",
    eyebrow: "Instagram Reels downloader",
    h1: "Download Instagram Reels HD",
    title: "Download Instagram Reels HD",
    description:
      "Download Instagram Reels in HD from public links. Save video, cover image, and MP3 audio online.",
    subtitle: "Fast, Free, HD Quality.",
    contentTitle: "HD Instagram Reels downloader",
    content:
      "This page targets HD Instagram Reels download searches. Paste a public Reels URL, let the system detect the Instagram link, and use the result card to save the available video or audio file.",
    seoSections: [
      {
        title: "Instagram Reels HD download",
        body:
          "The Reels downloader keeps quality and speed visible. When the provider returns an HD source, the video download button becomes the main action."
      },
      {
        title: "One interface for short video links",
        body:
          "Users can paste Instagram and TikTok links into the same field. Creator Toolkit handles platform detection automatically."
      }
    ],
    howToSteps: ["Copy an Instagram Reels URL", "Paste the link into the downloader", "Download the available HD video"],
    faqs: [
      {
        question: "Can I download Instagram Reels in HD?",
        answer: "Creator Toolkit is designed to return HD options when they are available from the configured provider."
      },
      {
        question: "Do Instagram Reels links work on mobile?",
        answer: "Yes. The downloader is built mobile-first for fast paste and download actions."
      }
    ]
  },
  {
    slug: "how-to-download-instagram-reels",
    eyebrow: "Instagram Reels guide",
    h1: "How to Download Instagram Reels",
    title: "How to Download Instagram Reels",
    description:
      "Learn how to download Instagram Reels online from a public link with a fast mobile-first downloader.",
    subtitle: "Copy a Reels link, paste it, and download.",
    contentTitle: "Simple Instagram Reels download steps",
    content:
      "This how-to page is structured for users who need a clear Instagram Reels download process. It explains the basic steps while keeping the functional downloader visible above the fold.",
    seoSections: [
      {
        title: "How the Reels downloader works",
        body:
          "Start from the Instagram share menu, copy the public Reels URL, and paste it into Creator Toolkit. The analyzer checks the link and prepares the available download options."
      },
      {
        title: "Clear steps for search users",
        body:
          "How-to search traffic needs direct instructions, not a long introduction. The page pairs concise guidance with FAQ and HowTo schema for better eligibility in search results."
      }
    ],
    howToSteps: ["Open the Instagram Reel", "Copy the public share link", "Paste it into Creator Toolkit", "Download the available video"],
    faqs: [
      {
        question: "What Instagram link should I paste?",
        answer: "Paste the public Instagram Reels link copied from the share menu."
      },
      {
        question: "Can I download Reels without an app?",
        answer: "Yes. Creator Toolkit runs in the browser and does not require an app install."
      }
    ]
  },
  {
    slug: "how-to-download-tiktok-videos",
    eyebrow: "TikTok guide",
    h1: "How to Download TikTok Videos",
    title: "How to Download TikTok Videos",
    description:
      "Learn how to download TikTok videos online from a public link with a fast mobile-first downloader.",
    subtitle: "A fast browser-based TikTok download flow.",
    contentTitle: "Simple TikTok download steps",
    content:
      "Copy a public TikTok video link, paste it into Creator Toolkit, and use the download result options. This page is structured for how-to search intent and FAQ rich results.",
    seoSections: [
      {
        title: "TikTok download steps",
        body:
          "The process starts with the TikTok share link. After pasting it into Creator Toolkit, the analyzer checks the URL and prepares the available download options."
      },
      {
        title: "Useful for repeat downloads",
        body:
          "After one download, users can paste a new link and run the same flow again without leaving the page."
      }
    ],
    howToSteps: ["Copy a public TikTok video link", "Paste it into the analyzer", "Download video or audio"],
    faqs: [
      {
        question: "What link should I paste?",
        answer: "Paste the public TikTok video link copied from the TikTok share menu."
      },
      {
        question: "Can I save audio too?",
        answer: "The provider pipeline is designed to expose MP3 audio when available."
      }
    ]
  },
  {
    slug: "tiktok-video-downloader-no-watermark",
    eyebrow: "No watermark downloader",
    h1: "TikTok Video Downloader No Watermark",
    title: "TikTok Video Downloader No Watermark",
    description:
      "Use a TikTok video downloader with no watermark support. Paste a public link and save online.",
    subtitle: "Download clean TikTok videos from public links.",
    contentTitle: "No watermark TikTok downloads",
    content:
      "This programmatic SEO page targets no-watermark TikTok searches and keeps the same high-conversion interface above the fold.",
    seoSections: [
      {
        title: "Clean TikTok video downloads",
        body:
          "The page is optimized for users who want a simple TikTok video downloader no watermark flow with the main action visible immediately."
      },
      {
        title: "Expandable SEO page template",
        body:
          "This page uses the shared programmatic template, so more long-tail download pages can be added without creating new UI code."
      }
    ],
    howToSteps: ["Paste a TikTok video link", "Analyze the public video", "Download the available clean video"],
    faqs: [
      {
        question: "Does this remove the TikTok watermark?",
        answer: "The downloader is designed to return no-watermark options when the configured provider supports them."
      },
      {
        question: "Is it free?",
        answer: "The MVP is designed as a free downloader with future monetization through ads."
      }
    ]
  }
];

export const programmaticSeoPages: MarketingPage[] = programmaticConfigs.map(createProgrammaticPage);

export function getProgrammaticSeoPage(slug: string) {
  return programmaticSeoPages.find((page) => page.slug === slug) ?? null;
}
