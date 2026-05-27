import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SeoPageForm } from "@/app/admin/(protected)/seo-pages/form";
import { getSeoPage } from "@/lib/db/admin-queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit SEO Page"
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditSeoPage({ params }: PageProps) {
  const { id } = await params;
  const page = await getSeoPage(id);

  if (!page) {
    notFound();
  }

  return (
    <section>
      <Link href="/admin/seo-pages" className="text-sm text-white/56 transition hover:text-white">
        Back to SEO pages
      </Link>
      <h1 className="mt-3 text-3xl font-semibold">Edit SEO Page</h1>
      <SeoPageForm page={page} />
    </section>
  );
}
