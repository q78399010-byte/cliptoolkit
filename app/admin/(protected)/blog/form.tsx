import { saveBlogPostAction } from "@/app/admin/(protected)/blog/actions";
import type { BlogPost } from "@/lib/db/types";

export function BlogPostForm({ post }: { post?: BlogPost | null }) {
  return (
    <form action={saveBlogPostAction} className="surface mt-6 grid gap-4 rounded-lg p-5">
      <input type="hidden" name="id" value={post?.id ?? ""} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Title
          <input
            name="title"
            defaultValue={post?.title ?? ""}
            required
            className="focus-ring min-h-11 rounded-md border border-white/10 bg-white px-3 text-ink"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Slug
          <input
            name="slug"
            defaultValue={post?.slug ?? ""}
            required
            className="focus-ring min-h-11 rounded-md border border-white/10 bg-white px-3 text-ink"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium">
        Excerpt
        <textarea
          name="excerpt"
          defaultValue={post?.excerpt ?? ""}
          rows={3}
          className="focus-ring rounded-md border border-white/10 bg-white px-3 py-2 text-ink"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Markdown Content
        <textarea
          name="content"
          defaultValue={post?.content ?? ""}
          required
          rows={10}
          className="focus-ring rounded-md border border-white/10 bg-white px-3 py-2 text-ink"
        />
        <span className="text-xs text-white/48">Supports Markdown headings, paragraphs, links, and bullet lists. H2/H3 headings generate the table of contents.</span>
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Meta Title
          <input
            name="metaTitle"
            defaultValue={post?.metaTitle ?? ""}
            className="focus-ring min-h-11 rounded-md border border-white/10 bg-white px-3 text-ink"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Status
          <select
            name="status"
            defaultValue={post?.status ?? "draft"}
            className="focus-ring min-h-11 rounded-md border border-white/10 bg-white px-3 text-ink"
          >
            <option value="draft">draft</option>
            <option value="published">published</option>
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium">
        Meta Description
        <textarea
          name="metaDescription"
          defaultValue={post?.metaDescription ?? ""}
          rows={3}
          className="focus-ring rounded-md border border-white/10 bg-white px-3 py-2 text-ink"
        />
      </label>
      <button className="min-h-11 rounded-md bg-mint px-4 font-bold text-ink transition hover:bg-[#75f4c6]">
        Save Blog Post
      </button>
    </form>
  );
}
