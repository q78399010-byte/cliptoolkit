import type { Metadata } from "next";
import Link from "next/link";
import { deleteBlogPostAction } from "@/app/admin/(protected)/blog/actions";
import { listBlogPosts } from "@/lib/db/admin-queries";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog Admin"
};

export default async function AdminBlogPage() {
  const posts = await listBlogPosts();

  return (
    <section>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-mint">Blog</p>
          <h1 className="mt-2 text-3xl font-semibold">SEO blog posts</h1>
        </div>
        <Link
          href="/admin/blog/new"
          className="rounded-md bg-mint px-4 py-3 text-sm font-bold text-ink transition hover:bg-[#75f4c6]"
        >
          New Post
        </Link>
      </div>

      <div className="surface mt-6 overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-white/8 text-white/52">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Published</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-white/6 last:border-0">
                  <td className="max-w-[260px] truncate px-4 py-3">{post.title}</td>
                  <td className="px-4 py-3 text-white/64">{post.slug}</td>
                  <td className="px-4 py-3">{post.status}</td>
                  <td className="px-4 py-3 text-white/56">{formatDate(post.publishedAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link className="text-mint" href={`/admin/blog/${post.id}`}>
                        Edit
                      </Link>
                      <form action={deleteBlogPostAction}>
                        <input type="hidden" name="id" value={post.id} />
                        <button className="text-ember">Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!posts.length ? <p className="px-4 py-6 text-sm text-white/52">No blog posts yet.</p> : null}
      </div>
    </section>
  );
}
