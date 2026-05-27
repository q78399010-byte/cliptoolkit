import type { Metadata } from "next";
import Link from "next/link";
import { RelatedPages } from "@/components/related-pages";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { listBlogPostsForSeo } from "@/lib/seo/content";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbForPath, createWebPageSchema } from "@/lib/seo/schema";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    title: "Blog",
    description: "Guides for downloading TikTok videos and Instagram Reels online.",
    path: "/blog"
  });
}

export default async function BlogPage() {
  const posts = await listBlogPostsForSeo();

  return (
    <main>
      <StructuredData
        data={[
          createWebPageSchema({
            title: "Short video download guides",
            description: "Guides for downloading TikTok videos and Instagram Reels online.",
            path: "/blog"
          }),
          breadcrumbForPath("Blog", "/blog")
        ]}
      />
      <SiteHeader />
      <section className="shell py-14 sm:py-20">
        <p className="text-sm font-semibold uppercase text-signal">Blog</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Short video download guides</h1>
        <p className="mt-4 max-w-2xl leading-7 text-white/64">
          Practical guides for TikTok downloader, Instagram downloader, no-watermark downloads, and HD video saving workflows.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="surface rounded-lg p-5 transition hover:border-mint/32"
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="mt-3 leading-7 text-white/64">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
      <RelatedPages currentPath="/blog" limit={6} title="Download tools mentioned in the blog" />
      <SiteFooter />
    </main>
  );
}
