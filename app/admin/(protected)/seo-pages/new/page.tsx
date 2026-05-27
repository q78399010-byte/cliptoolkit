import type { Metadata } from "next";
import Link from "next/link";
import { SeoPageForm } from "@/app/admin/(protected)/seo-pages/form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "New SEO Page"
};

export default function NewSeoPage() {
  return (
    <section>
      <Link href="/admin/seo-pages" className="text-sm text-white/56 transition hover:text-white">
        Back to SEO pages
      </Link>
      <h1 className="mt-3 text-3xl font-semibold">New SEO Page</h1>
      <SeoPageForm />
    </section>
  );
}
