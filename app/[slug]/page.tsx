import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing-page";
import { getMarketingPageBySlug, listMarketingPagesForSeo } from "@/lib/seo/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const pages = await listMarketingPagesForSeo();
  const reserved = new Set(["", "tiktok-downloader", "instagram-reels-downloader"]);

  return pages.filter((page) => !reserved.has(page.slug)).map((page) => ({ slug: page.slug }));
}

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getMarketingPageBySlug(slug);

  if (!page) {
    return {};
  }

  return page.metadata;
}

export default async function ProgrammaticSeoPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getMarketingPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <LandingPage page={page} />;
}
