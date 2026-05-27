import type { Metadata } from "next";
import Link from "next/link";
import { getOverviewStats } from "@/lib/db/admin-queries";
import { formatPercent } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Overview"
};

const cards = [
  {
    label: "Today Downloads",
    key: "todayDownloads"
  },
  {
    label: "Success Rate",
    key: "successRate"
  },
  {
    label: "Cache Hit Rate",
    key: "cacheHitRate"
  },
  {
    label: "Top Platform",
    key: "topPlatform"
  }
] as const;

export default async function AdminOverviewPage() {
  const stats = await getOverviewStats();

  return (
    <section>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-mint">Overview</p>
          <h1 className="mt-2 text-3xl font-semibold">Operations dashboard</h1>
        </div>
        <Link
          href="/admin/downloads"
          className="rounded-md bg-mint px-4 py-3 text-sm font-bold text-ink transition hover:bg-[#75f4c6]"
        >
          View Downloads
        </Link>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const value = stats[card.key];
          const displayValue =
            card.key === "successRate" || card.key === "cacheHitRate"
              ? formatPercent(Number(value))
              : String(value);

          return (
            <article key={card.key} className="surface rounded-lg p-5">
              <p className="text-sm text-white/52">{card.label}</p>
              <p className="mt-3 text-3xl font-semibold">{displayValue}</p>
            </article>
          );
        })}
      </div>

      <section className="surface mt-6 rounded-lg p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Popular platforms</h2>
            <p className="mt-1 text-sm text-white/52">Last 7 days, based on download_tasks.</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3">
          {stats.platformCounts.length ? (
            stats.platformCounts.map((item) => (
              <div
                key={item.platform}
                className="flex items-center justify-between rounded-md border border-white/8 px-4 py-3"
              >
                <span className="font-medium capitalize">{item.platform}</span>
                <span className="text-white/62">{item.count}</span>
              </div>
            ))
          ) : (
            <p className="rounded-md border border-white/8 px-4 py-3 text-white/52">
              No download data yet.
            </p>
          )}
        </div>
      </section>
    </section>
  );
}
