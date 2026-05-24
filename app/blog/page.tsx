import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides for downloading TikTok videos and Instagram Reels online.",
  alternates: { canonical: "/blog" }
};

const posts = [
  {
    href: "/blog/how-to-save-tiktok-videos-without-watermark",
    title: "How to Save TikTok Videos Without Watermark",
    excerpt: "A practical guide for saving public TikTok videos from your browser."
  },
  {
    href: "/blog/download-instagram-reels-online",
    title: "Download Instagram Reels Online",
    excerpt: "What to know before saving Instagram Reels links in HD."
  }
];

export default function BlogPage() {
  return (
    <main>
      <SiteHeader />
      <section className="shell py-14 sm:py-20">
        <p className="text-sm font-semibold uppercase text-signal">Blog</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Short video download guides</h1>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.href} href={post.href} className="surface rounded-lg p-5 transition hover:border-mint/32">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="mt-3 leading-7 text-white/64">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
