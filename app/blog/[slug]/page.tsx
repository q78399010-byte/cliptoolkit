import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent, getMarkdownToc } from "@/components/markdown-content";
import { RelatedPages } from "@/components/related-pages";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { createBlogMetadata } from "@/lib/seo/blog";
import { getBlogPostBySlug, listBlogPostsForSeo } from "@/lib/seo/content";
import { breadcrumbForPath, createBlogPostingSchema } from "@/lib/seo/schema";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await listBlogPostsForSeo();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return createBlogMetadata(post);
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const toc = getMarkdownToc(post.content);

  return (
    <main>
      <StructuredData
        data={[
          createBlogPostingSchema({
            title: post.title,
            description: post.metaDescription,
            path: `/blog/${post.slug}`,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt
          }),
          breadcrumbForPath(post.title, `/blog/${post.slug}`)
        ]}
      />
      <SiteHeader />
      <article className="shell grid gap-8 py-14 sm:py-20 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <Link href="/blog" className="text-sm font-semibold text-mint transition hover:text-white">
            Back to Blog
          </Link>
          {toc.length ? (
            <nav className="surface mt-5 rounded-2xl p-4 text-sm" aria-label="Table of contents">
              <p className="font-semibold text-white">Table of contents</p>
              <div className="mt-3 grid gap-2">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={item.level === 3 ? "pl-3 text-white/50 hover:text-white" : "text-white/64 hover:text-white"}
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </nav>
          ) : null}
        </aside>

        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-mint">Guide</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-8 text-white/68">{post.excerpt}</p>
          <div className="surface mt-8 rounded-2xl p-6 sm:p-8">
            <MarkdownContent content={post.content} />
          </div>
        </div>
      </article>
      <RelatedPages
        currentPath={`/blog/${post.slug}`}
        limit={6}
        title="Related download pages"
      />
      <SiteFooter />
    </main>
  );
}
