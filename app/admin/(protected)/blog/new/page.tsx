import type { Metadata } from "next";
import Link from "next/link";
import { BlogPostForm } from "@/app/admin/(protected)/blog/form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "New Blog Post"
};

export default function NewBlogPostPage() {
  return (
    <section>
      <Link href="/admin/blog" className="text-sm text-white/56 transition hover:text-white">
        Back to blog
      </Link>
      <h1 className="mt-3 text-3xl font-semibold">Create article</h1>
      <BlogPostForm />
    </section>
  );
}
