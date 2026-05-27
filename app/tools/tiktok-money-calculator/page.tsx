import type { Metadata } from "next";
import Link from "next/link";
import { TikTokMoneyCalculator } from "@/components/tiktok-money-calculator";

export const metadata: Metadata = {
  title: "TikTok Money Calculator - Estimate Creator Earnings",
  description:
    "Estimate TikTok monthly earnings with monthly views, RPM, engagement rate, and posting frequency. Includes low, medium, and high creator revenue ranges."
};

export default function TikTokMoneyCalculatorPage() {
  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-950 text-sm font-black text-white">
              C
            </span>
            <span className="text-lg">ClipToolkit</span>
          </Link>
          <Link
            href="/"
            className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            All Tools
          </Link>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
              TikTok Tools
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl">
              TikTok Money Calculator
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Estimate monthly TikTok earnings from views, RPM, engagement rate, and posting
              frequency. Use the low, medium, and high ranges to plan realistic creator income.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["Monthly views", "Your current or target TikTok view volume."],
                ["RPM", "Revenue per 1,000 views from your niche and monetization mix."],
                ["Cadence", "How often you publish and compound creator growth."]
              ].map(([title, body]) => (
                <article key={title} className="rounded-lg border border-slate-200 bg-white p-4">
                  <h2 className="text-base font-bold tracking-normal">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                </article>
              ))}
            </div>
          </div>

          <TikTokMoneyCalculator />
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
          <h2 className="text-2xl font-bold tracking-normal">How to use this estimate</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              [
                "Start conservative",
                "Creator RPM changes by region, niche, season, and monetization source, so use the low estimate for planning."
              ],
              [
                "Improve engagement",
                "Higher engagement usually increases distribution and makes sponsor pricing easier to justify."
              ],
              [
                "Track weekly",
                "Update the calculator after each content batch so revenue planning follows your actual momentum."
              ]
            ].map(([title, body]) => (
              <article key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-bold tracking-normal">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
