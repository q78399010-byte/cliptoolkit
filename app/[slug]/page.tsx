import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing-page";
import { getProgrammaticSeoPage, programmaticSeoPages } from "@/lib/seo/programmatic-pages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return programmaticSeoPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getProgrammaticSeoPage(slug);

  if (!page) {
    return {};
  }

  return page.metadata;
}

export default async function ProgrammaticSeoPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getProgrammaticSeoPage(slug);

  if (!page) {
    notFound();
  }

  return <LandingPage page={page} />;
}
