import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const posts = [
  {
    slug: "how-to-save-tiktok-videos-without-watermark",
    title: "How to Save TikTok Videos Without Watermark",
    description: "A practical guide for saving public TikTok videos from your browser.",
    body:
      "Copy the public TikTok video link, paste it into the downloader, and choose the available video, cover, or MP3 option. The production provider integration is scheduled after the Day 1 shell."
  },
  {
    slug: "download-instagram-reels-online",
    title: "Download Instagram Reels Online",
    description: "What to know before saving Instagram Reels links in HD.",
    body:
      "Instagram Reels pages target a high-intent SEO segment. The MVP keeps this flow simple, fast, and mobile-first."
  }
];

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` }
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <SiteHeader />
      <article className="shell max-w-3xl py-14 sm:py-20">
        <p className="text-sm font-semibold uppercase text-mint">Guide</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">{post.title}</h1>
        <p className="mt-5 text-lg leading-8 text-white/68">{post.description}</p>
        <div className="surface mt-8 rounded-lg p-6 leading-8 text-white/72 sm:p-8">{post.body}</div>
      </article>
      <SiteFooter />
    </main>
  );
}
