import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPostForm } from "@/app/admin/(protected)/blog/form";
import { getBlogPost } from "@/lib/db/admin-queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Blog Post"
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditBlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getBlogPost(id);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <Link href="/admin/blog" className="text-sm text-white/56 transition hover:text-white">
        Back to blog
      </Link>
      <h1 className="mt-3 text-3xl font-semibold">Edit article</h1>
      <BlogPostForm post={post} />
    </section>
  );
}
