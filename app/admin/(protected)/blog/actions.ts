"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { softDeleteBlogPost, upsertBlogPost } from "@/lib/db/admin-queries";

export async function saveBlogPostAction(formData: FormData) {
  const id = String(formData.get("id") ?? "") || undefined;
  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const metaTitle = String(formData.get("metaTitle") ?? "").trim();
  const metaDescription = String(formData.get("metaDescription") ?? "").trim();
  const status = formData.get("status") === "published" ? "published" : "draft";

  if (!title || !slug || !content) {
    throw new Error("Title, slug, and content are required.");
  }

  await upsertBlogPost({
    id,
    title,
    slug,
    excerpt,
    content,
    metaTitle,
    metaDescription,
    status
  });

  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deleteBlogPostAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  if (id) {
    await softDeleteBlogPost(id);
  }

  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}
