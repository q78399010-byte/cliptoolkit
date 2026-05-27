import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDownloadTask } from "@/lib/db/admin-queries";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Download Detail"
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminDownloadDetailPage({ params }: PageProps) {
  const { id } = await params;
  const task = await getDownloadTask(id);

  if (!task) {
    notFound();
  }

  const rows = [
    ["Status", task.status],
    ["Platform", task.platform],
    ["Provider", task.provider],
    ["Response Time", task.responseTime ? `${task.responseTime}ms` : "-"],
    ["Cache Hit", task.cacheHit ? "yes" : "no"],
    ["Country", task.country ?? "-"],
    ["Device", task.device ?? "-"],
    ["IP Hash", task.ipHash ?? "-"],
    ["Reason", task.reason ?? "-"],
    ["Error Code", task.errorCode ?? "-"],
    ["Created", formatDate(task.createdAt)],
    ["Updated", formatDate(task.updatedAt)]
  ];

  return (
    <section>
      <Link href="/admin/downloads" className="text-sm text-white/56 transition hover:text-white">
        Back to downloads
      </Link>
      <h1 className="mt-3 text-3xl font-semibold">Task detail</h1>
      <div className="surface mt-6 rounded-lg p-5">
        <p className="text-sm text-white/52">Source URL</p>
        <p className="mt-2 break-all text-white">{task.url}</p>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label} className="surface rounded-lg p-4">
            <p className="text-sm text-white/52">{label}</p>
            <p className="mt-2 break-words font-medium">{value}</p>
          </div>
        ))}
      </div>
      <div className="surface mt-4 rounded-lg p-5">
        <h2 className="text-lg font-semibold">Raw metadata</h2>
        <pre className="mt-3 overflow-x-auto rounded-md border border-white/8 bg-black/30 p-4 text-xs text-white/72">
          {JSON.stringify(task.metadata, null, 2)}
        </pre>
      </div>
    </section>
  );
}
