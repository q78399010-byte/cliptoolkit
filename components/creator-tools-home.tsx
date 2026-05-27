"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Tool = {
  title: string;
  description: string;
  href: string;
  category: string;
  status: "Live" | "Soon";
  metric: string;
};

const featuredTools: Tool[] = [
  {
    title: "TikTok Money Calculator",
    description: "Estimate monthly earnings from views, RPM, engagement, and posting cadence.",
    href: "/tools/tiktok-money-calculator",
    category: "TikTok Tools",
    status: "Live",
    metric: "Revenue"
  },
  {
    title: "YouTube Revenue Estimator",
    description: "Model ad revenue, watch volume, sponsorship upside, and channel growth targets.",
    href: "#youtube-tools",
    category: "YouTube Tools",
    status: "Soon",
    metric: "AdSense"
  },
  {
    title: "UGC Rate Calculator",
    description: "Price UGC packages with usage rights, revisions, deliverables, and campaign scope.",
    href: "#ugc-creator-tools",
    category: "UGC Creator Tools",
    status: "Soon",
    metric: "Pricing"
  }
];

const categories = [
  {
    title: "TikTok Tools",
    id: "tiktok-tools",
    summary: "Plan TikTok revenue, content volume, engagement, and creator monetization.",
    tools: [
      featuredTools[0],
      {
        title: "TikTok Growth Planner",
        description: "Set weekly publishing goals and estimate account growth from current momentum.",
        href: "#tiktok-tools",
        category: "TikTok Tools",
        status: "Soon" as const,
        metric: "Growth"
      }
    ]
  },
  {
    title: "YouTube Tools",
    id: "youtube-tools",
    summary: "Forecast long-form and Shorts revenue with simple creator business assumptions.",
    tools: [
      featuredTools[1],
      {
        title: "Sponsor Deal Estimator",
        description: "Estimate sponsorship pricing from average views, niche, and deliverables.",
        href: "#youtube-tools",
        category: "YouTube Tools",
        status: "Soon" as const,
        metric: "Deals"
      }
    ]
  },
  {
    title: "UGC Creator Tools",
    id: "ugc-creator-tools",
    summary: "Quote brand work, usage rights, retainers, and creator service packages.",
    tools: [
      featuredTools[2],
      {
        title: "UGC Package Builder",
        description: "Build a clear package menu for hooks, raw footage, edits, and revisions.",
        href: "#ugc-creator-tools",
        category: "UGC Creator Tools",
        status: "Soon" as const,
        metric: "Offers"
      }
    ]
  },
  {
    title: "Financial Tools",
    id: "financial-tools",
    summary: "Track income targets, monthly runway, taxes, and creator business decisions.",
    tools: [
      {
        title: "Creator Income Goal Planner",
        description: "Break monthly income goals into platform revenue, UGC work, and sponsors.",
        href: "#financial-tools",
        category: "Financial Tools",
        status: "Soon" as const,
        metric: "Planning"
      },
      {
        title: "Creator Tax Reserve Calculator",
        description: "Estimate how much to set aside from variable creator income.",
        href: "#financial-tools",
        category: "Financial Tools",
        status: "Soon" as const,
        metric: "Reserve"
      }
    ]
  }
];

const allTools = categories.flatMap((category) => category.tools);

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function CreatorToolsHome() {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalize(query);
  const filteredTools = useMemo(() => {
    if (!normalizedQuery) {
      return featuredTools;
    }

    return allTools.filter((tool) =>
      normalize(`${tool.title} ${tool.description} ${tool.category} ${tool.metric}`).includes(
        normalizedQuery
      )
    );
  }, [normalizedQuery]);

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-950 text-sm font-black text-white">
              C
            </span>
            <span className="text-lg">ClipToolkit</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#tiktok-tools" className="transition hover:text-slate-950">
              TikTok
            </a>
            <a href="#youtube-tools" className="transition hover:text-slate-950">
              YouTube
            </a>
            <a href="#ugc-creator-tools" className="transition hover:text-slate-950">
              UGC
            </a>
            <a href="#financial-tools" className="transition hover:text-slate-950">
              Finance
            </a>
          </nav>
          <Link
            href="/tools/tiktok-money-calculator"
            className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Open Calculator
          </Link>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
              Creator business tools
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-6xl">
              The operating system for independent creators
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Calculate TikTok earnings, price UGC work, estimate YouTube revenue, and make
              better business decisions from one focused toolkit.
            </p>

            <div className="mt-8 max-w-2xl rounded-lg border border-slate-200 bg-slate-50 p-2 shadow-sm">
              <label htmlFor="tool-search" className="sr-only">
                Search creator tools
              </label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  id="tool-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search creator tools..."
                  className="min-h-12 flex-1 rounded-md border border-transparent bg-white px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                />
                <a
                  href="#featured-tools"
                  className="inline-flex min-h-12 items-center justify-center rounded-md bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                >
                  Browse Tools
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-sm font-medium text-slate-600">
              {["TikTok revenue", "UGC pricing", "YouTube income", "Creator finance"].map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setQuery(item)}
                    className="rounded-md border border-slate-200 bg-white px-3 py-2 transition hover:border-slate-300 hover:text-slate-950"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="grid content-start gap-4">
            <div className="rounded-lg border border-slate-200 bg-[#f8fbff] p-5">
              <p className="text-sm font-semibold text-slate-500">Featured workflow</p>
              <h2 className="mt-3 text-2xl font-bold tracking-normal">Estimate revenue before you post</h2>
              <p className="mt-3 leading-7 text-slate-600">
                Start with monthly views, RPM, engagement rate, and posting frequency to turn
                TikTok performance into practical income ranges.
              </p>
              <Link
                href="/tools/tiktok-money-calculator"
                className="mt-5 inline-flex rounded-md bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Try TikTok Calculator
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                ["4", "tool categories"],
                ["8", "creator workflows"],
                ["0", "signup required"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-slate-200 bg-white p-4">
                  <p className="text-2xl font-black text-slate-950">{value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="featured-tools" className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
              Featured tools
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">
              Start with the highest leverage calculators
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            Search results update instantly so creators can move from question to tool quickly.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {filteredTools.map((tool) => (
            <ToolCard key={`${tool.category}-${tool.title}`} tool={tool} featured />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6">
        <div className="grid gap-8">
          {categories.map((category) => (
            <section
              key={category.id}
              id={category.id}
              className="scroll-mt-24 border-t border-slate-200 pt-8"
              aria-labelledby={`${category.id}-title`}
            >
              <div className="grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
                <div>
                  <h2 id={`${category.id}-title`} className="text-2xl font-bold tracking-normal">
                    {category.title}
                  </h2>
                  <p className="mt-3 leading-7 text-slate-600">{category.summary}</p>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {category.tools.map((tool) => (
                    <ToolCard key={tool.title} tool={tool} />
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
              Built for independent creators
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal">
              Practical numbers for people building on their own terms
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["No account wall", "Use the calculators without signing up first."],
              ["Creator-first math", "Inputs match how creators actually plan content and deals."],
              ["Fast decisions", "Turn messy platform metrics into clear next steps."]
            ].map(([title, body]) => (
              <article key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-bold tracking-normal">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="font-semibold">ClipToolkit</p>
          <p className="text-slate-400">Creator tools for TikTok, YouTube, UGC, and finance.</p>
        </div>
      </footer>
    </main>
  );
}

function ToolCard({ tool, featured = false }: { tool: Tool; featured?: boolean }) {
  const isLive = tool.status === "Live";
  const className = featured
    ? "rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    : "rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white";

  return (
    <article className={className}>
      <div className="flex items-start justify-between gap-3">
        <div className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
          {tool.metric}
        </div>
        <span
          className={
            isLive
              ? "rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700"
              : "rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500"
          }
        >
          {tool.status}
        </span>
      </div>
      <h3 className="mt-4 text-xl font-bold tracking-normal text-slate-950">{tool.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{tool.description}</p>
      {isLive ? (
        <Link
          href={tool.href}
          className="mt-5 inline-flex rounded-md bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          Open Tool
        </Link>
      ) : (
        <a
          href={tool.href}
          className="mt-5 inline-flex rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:text-slate-950"
        >
          Preview
        </a>
      )}
    </article>
  );
}
