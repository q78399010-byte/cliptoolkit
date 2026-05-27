import Link from "next/link";

export type RelatedPageLink = {
  href: string;
  label: string;
  description: string;
};

export const downloadRelatedPages: RelatedPageLink[] = [
  {
    href: "/tiktok-downloader",
    label: "TikTok Downloader",
    description: "Download public TikTok videos without watermark when available."
  },
  {
    href: "/instagram-reels-downloader",
    label: "Instagram Reels Downloader",
    description: "Save public Instagram Reels from a browser."
  },
  {
    href: "/download-tiktok-video-online",
    label: "Download TikTok Video Online",
    description: "Use the online TikTok downloader from mobile or desktop."
  },
  {
    href: "/download-tiktok-video-without-watermark",
    label: "Download TikTok Without Watermark",
    description: "Target no-watermark TikTok download intent."
  },
  {
    href: "/tiktok-downloader-hd",
    label: "TikTok Downloader HD",
    description: "Find the best available TikTok video quality."
  },
  {
    href: "/download-instagram-reels-hd",
    label: "Download Instagram Reels HD",
    description: "Download public Reels in the best available quality."
  },
  {
    href: "/how-to-download-instagram-reels",
    label: "How to Download Instagram Reels",
    description: "Step-by-step Instagram Reels download guide."
  },
  {
    href: "/how-to-download-tiktok-videos",
    label: "How to Download TikTok Videos",
    description: "Clear TikTok download instructions."
  },
  {
    href: "/blog/how-to-save-tiktok-videos-without-watermark",
    label: "TikTok No-Watermark Guide",
    description: "Blog guide for saving TikTok videos."
  },
  {
    href: "/blog/download-instagram-reels-online",
    label: "Instagram Reels Guide",
    description: "Blog guide for downloading Reels online."
  }
];

export function RelatedPages({
  currentPath,
  limit = 6,
  title = "Related Pages"
}: {
  currentPath?: string;
  limit?: number;
  title?: string;
}) {
  const links = downloadRelatedPages
    .filter((page) => page.href !== currentPath)
    .slice(0, limit);

  return (
    <section className="shell py-10 sm:py-14" aria-labelledby="related-pages">
      <div className="surface rounded-[28px] p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-mint">Internal Links</p>
        <h2 id="related-pages" className="mt-3 text-3xl font-semibold tracking-tight">
          {title}
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition hover:border-mint/40"
            >
              <h3 className="font-semibold text-white">{page.label}</h3>
              <p className="mt-2 text-sm leading-6 text-white/58">{page.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
