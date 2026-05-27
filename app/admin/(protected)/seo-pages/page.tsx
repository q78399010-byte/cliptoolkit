import type { Metadata } from "next";
import Link from "next/link";
import { deleteSeoPageAction } from "@/app/admin/(protected)/seo-pages/actions";
import { listSeoPages } from "@/lib/db/admin-queries";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SEO Pages"
};

export default async function AdminSeoPagesPage() {
  const pages = await listSeoPages();

  return (
    <section>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-mint">SEO Pages</p>
          <h1 className="mt-2 text-3xl font-semibold">Landing and programmatic pages</h1>
        </div>
        <Link
          href="/admin/seo-pages/new"
          className="rounded-md bg-mint px-4 py-3 text-sm font-bold text-ink transition hover:bg-[#75f4c6]"
        >
          New SEO Page
        </Link>
      </div>
      <div className="surface mt-6 overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="border-b border-white/8 text-white/52">
              <tr>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Published</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id} className="border-b border-white/6 last:border-0">
                  <td className="px-4 py-3">{page.slug}</td>
                  <td className="px-4 py-3">{page.pageType}</td>
                  <td className="max-w-[280px] truncate px-4 py-3 text-white/72">{page.title}</td>
                  <td className="px-4 py-3">{page.published ? "yes" : "no"}</td>
                  <td className="px-4 py-3 text-white/56">{formatDate(page.updatedAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link className="text-mint" href={`/admin/seo-pages/${page.id}`}>
                        Edit
                      </Link>
                      <form action={deleteSeoPageAction}>
                        <input type="hidden" name="id" value={page.id} />
                        <button className="text-ember">Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
