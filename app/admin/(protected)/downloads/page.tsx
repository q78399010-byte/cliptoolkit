import type { Metadata } from "next";
import Link from "next/link";
import { listDownloadTasks } from "@/lib/db/admin-queries";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Downloads"
};

type PageProps = {
  searchParams: Promise<{
    q?: string;
    platform?: string;
    status?: string;
  }>;
};

const statuses = ["all", "pending", "processing", "success", "failed", "retrying"];
const platforms = ["all", "tiktok", "instagram"];

export default async function AdminDownloadsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const tasks = await listDownloadTasks({
    query: params.q,
    platform: params.platform,
    status: params.status
  });

  return (
    <section>
      <p className="text-sm font-semibold uppercase text-mint">Downloads</p>
      <h1 className="mt-2 text-3xl font-semibold">Download tasks</h1>

      <form className="surface mt-6 grid gap-3 rounded-lg p-4 sm:grid-cols-[1fr_180px_180px_auto]">
        <input
          name="q"
          defaultValue={params.q ?? ""}
          placeholder="Search URL, provider, error"
          className="focus-ring min-h-11 rounded-md border border-white/10 bg-white px-3 text-ink"
        />
        <select
          name="platform"
          defaultValue={params.platform ?? "all"}
          className="focus-ring min-h-11 rounded-md border border-white/10 bg-white px-3 text-ink"
        >
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
        <select
          name="status"
          defaultValue={params.status ?? "all"}
          className="focus-ring min-h-11 rounded-md border border-white/10 bg-white px-3 text-ink"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <button className="rounded-md bg-mint px-4 py-2 font-bold text-ink">Search</button>
      </form>

      <div className="surface mt-5 overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="border-b border-white/8 text-white/52">
              <tr>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Platform</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Provider</th>
                <th className="px-4 py-3 font-medium">Cache</th>
                <th className="px-4 py-3 font-medium">Country</th>
                <th className="px-4 py-3 font-medium">URL</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b border-white/6 last:border-0">
                  <td className="px-4 py-3 text-white/62">{formatDate(task.createdAt)}</td>
                  <td className="px-4 py-3 capitalize">{task.platform}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-white/10 px-2 py-1 text-xs">
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/72">{task.provider}</td>
                  <td className="px-4 py-3">{task.cacheHit ? "hit" : "miss"}</td>
                  <td className="px-4 py-3">{task.country ?? "-"}</td>
                  <td className="max-w-[260px] truncate px-4 py-3 text-white/62">{task.url}</td>
                  <td className="px-4 py-3">
                    <Link className="text-mint hover:text-[#75f4c6]" href={`/admin/downloads/${task.id}`}>
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!tasks.length ? <p className="px-4 py-6 text-sm text-white/52">No matching tasks.</p> : null}
      </div>
    </section>
  );
}
