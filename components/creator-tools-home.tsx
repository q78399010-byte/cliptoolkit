"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { homepageFaqItems } from "@/lib/homepage-content";

type Tool = {
  title: string;
  description: string;
  href: string;
  category: string;
  status: "Live" | "Coming Soon";
  cta: string;
};

const featuredTools: Tool[] = [
  {
    title: "TikTok Money Calculator",
    description: "Estimate creator earnings",
    href: "/tools/tiktok-money-calculator",
    category: "TikTok Tools",
    status: "Live",
    cta: "Try Calculator"
  },
  {
    title: "UGC Rate Calculator",
    description: "Price brand collaborations",
    href: "/tools/ugc-rate-calculator",
    category: "UGC Pricing",
    status: "Coming Soon",
    cta: "Coming Soon"
  },
  {
    title: "YouTube Revenue Calculator",
    description: "Estimate creator RPM income",
    href: "/tools/youtube-revenue-calculator",
    category: "YouTube Tools",
    status: "Coming Soon",
    cta: "Coming Soon"
  },
  {
    title: "Sponsorship Rate Calculator",
    description: "Estimate brand deal pricing",
    href: "/tools/sponsorship-rate-calculator",
    category: "Creator Finance",
    status: "Coming Soon",
    cta: "Coming Soon"
  }
];

const categories = [
  {
    title: "TikTok Tools",
    id: "tiktok-tools",
    body: "Estimate TikTok revenue, RPM, engagement quality, posting cadence, and TikTok Shop creator ROI."
  },
  {
    title: "YouTube Tools",
    id: "youtube-tools",
    body: "Forecast YouTube RPM, sponsorship upside, Shorts performance, and monthly channel income."
  },
  {
    title: "UGC Pricing",
    id: "ugc-pricing",
    body: "Price UGC videos, usage rights, revisions, hooks, raw footage, retainers, and brand deliverables."
  },
  {
    title: "Creator Finance",
    id: "creator-finance",
    body: "Plan creator income goals, sponsorship pricing, tax reserves, and campaign economics."
  }
];

const trustSignals = [
  ["1 Live Creator Tool", "More tools launching weekly"],
  ["4 Creator Categories", "TikTok, UGC, YouTube, Finance"],
  ["100% Free Access", "No signup required"],
  ["Creator-first Platform", "Built for independent creators"]
];

const audienceCards = [
  ["TikTok Creators", "Estimate creator earnings and growth."],
  ["UGC Creators", "Price brand collaborations confidently."],
  ["YouTubers", "Forecast RPM and creator income."],
  ["Creator Agencies", "Estimate campaign economics."],
  ["TikTok Shop Sellers", "Estimate creator ROI before collaborations."]
];

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

    return featuredTools.filter((tool) =>
      normalize(`${tool.title} ${tool.description} ${tool.category}`).includes(normalizedQuery)
    );
  }, [normalizedQuery]);

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-3 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-950 text-sm font-black text-white">
              C
            </span>
            <span className="text-lg">ClipToolkit</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
            <a href="#tiktok-tools" className="transition hover:text-slate-950">
              TikTok Tools
            </a>
            <a href="#youtube-tools" className="transition hover:text-slate-950">
              YouTube Tools
            </a>
            <a href="#ugc-pricing" className="transition hover:text-slate-950">
              UGC Pricing
            </a>
            <a href="#creator-finance" className="transition hover:text-slate-950">
              Creator Finance
            </a>
          </nav>
          <Link
            href="/tools/tiktok-money-calculator"
            className="shrink-0 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Try Calculator
          </Link>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.06fr_0.94fr] lg:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
              Free creator business tools
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-6xl">
              Free Creator Business Tools for TikTok, UGC & YouTube
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Calculate TikTok earnings, price UGC brand deals, estimate YouTube revenue, and make
              smarter creator business decisions.
            </p>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
              Designed for creators, freelancers, agencies, and TikTok Shop sellers.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tools/tiktok-money-calculator"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-emerald-600 px-6 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
              >
                Try TikTok Calculator
              </Link>
              <a
                href="#featured-tools"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
              >
                Browse Creator Tools
              </a>
            </div>

            <div className="mt-8 max-w-2xl rounded-lg border border-slate-200 bg-slate-50 p-2">
              <label htmlFor="tool-search" className="sr-only">
                Search creator tools
              </label>
              <input
                id="tool-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search creator tools..."
                className="min-h-12 w-full rounded-md border border-transparent bg-white px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
              />
            </div>
          </div>

          <div className="grid content-start gap-4">
            <article className="rounded-lg border border-slate-200 bg-[#f8fbff] p-5">
              <p className="text-sm font-semibold text-slate-500">Start here</p>
              <h2 className="mt-3 text-2xl font-bold tracking-normal">
                Turn creator metrics into business decisions
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                Use calculators to estimate monthly income, pressure-test campaign value, and
                decide when to pitch brands, raise UGC rates, or increase publishing volume.
              </p>
              <Link
                href="/tools/tiktok-money-calculator"
                className="mt-5 inline-flex rounded-md bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Try TikTok Calculator
              </Link>
            </article>
            <div className="grid gap-3 sm:grid-cols-2">
              {trustSignals.map(([title, body]) => (
                <article key={title} className="rounded-lg border border-slate-200 bg-white p-4">
                  <h2 className="text-lg font-black tracking-normal text-slate-950">{title}</h2>
                  <p className="mt-2 text-sm font-medium leading-6 text-slate-500">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="featured-tools" className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
              Featured Creator Tools
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">
              Calculators for creator income, pricing, and campaign planning
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            Start with TikTok earnings today, then use the coming tool pages to plan UGC pricing,
            YouTube revenue, and sponsorship rates as ClipToolkit expands.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.href} tool={tool} />
          ))}
        </div>
      </section>

      <section id="about" className="scroll-mt-24 border-y border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <article
                key={category.id}
                id={category.id}
                className="scroll-mt-24 rounded-lg border border-slate-200 bg-slate-50 p-5"
              >
                <h2 className="text-xl font-bold tracking-normal">{category.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{category.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
              Creator business SEO guide
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-normal">
              How creator business tools help creators grow
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The goal is not to replace judgment. The goal is to make creator decisions easier to
              compare before money, time, or brand trust is on the line.
            </p>
          </div>
        </aside>

        <article className="grid gap-6">
          <section className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">
              How creator business tools help creators grow
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Creator businesses are often built from scattered signals: views in one dashboard,
              comments in another, brand emails in an inbox, UGC briefs in a spreadsheet, and income
              goals somewhere else entirely. ClipToolkit exists to turn those signals into clear
              planning numbers. A creator does not need a complicated finance model to make better
              decisions. They need a fast way to estimate revenue, compare scenarios, and understand
              which lever matters next.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              For TikTok creators, the starting point is usually views. Views show distribution, but
              they do not explain the business by themselves. A million views in a low-value niche
              can produce less income than a smaller audience with stronger buyer intent. That is
              why creator calculators use RPM, engagement rate, and posting frequency. RPM helps
              creators translate reach into estimated revenue per 1,000 views. Engagement shows
              whether the audience is active enough to support follow-up offers, sponsorships, or
              TikTok Shop conversions. Posting frequency shows whether results are coming from a
              repeatable system or a one-off spike.
            </p>
            <h3 className="mt-6 text-xl font-bold tracking-normal">
              Why RPM matters for TikTok, YouTube, and sponsorships
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              RPM is one of the most useful creator business metrics because it makes very different
              platforms easier to compare. TikTok creators may use RPM to estimate creator program
              income, affiliate revenue, or Shop performance. YouTubers use RPM to evaluate AdSense,
              Shorts, and long-form content. Agencies can use RPM-style thinking to compare campaign
              value across creators. The exact RPM will change by country, niche, season, and offer,
              but the habit of estimating revenue per 1,000 views gives creators a practical
              planning language.
            </p>
            <h3 className="mt-6 text-xl font-bold tracking-normal">
              How UGC creators price content
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              UGC pricing works differently from platform payouts. A UGC creator is not only selling
              views. They are selling production, creative strategy, hooks, editing, revisions, raw
              footage, usage rights, and sometimes paid ad performance. That is why UGC rates should
              not be copied blindly from another creator. A useful UGC calculator helps creators
              separate the base deliverable from commercial rights. One short organic video, three
              paid ad variations, and a six-month usage license are different products. Treating them
              as the same offer is how creators undercharge.
            </p>
            <h3 className="mt-6 text-xl font-bold tracking-normal">
              Forecasting sponsorship revenue
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              Sponsorship pricing sits between media value and creative value. Average views matter,
              but so do niche trust, audience quality, production effort, exclusivity, deadlines,
              approval rounds, link placement, and whether the brand can reuse the content. Creator
              tools make this easier by forcing the important questions into the open. If a campaign
              requires a dedicated video, paid usage, category exclusivity, and reporting, it should
              not be priced like a casual mention. A calculator gives creators a starting point for
              negotiation and gives agencies a cleaner way to compare campaign economics.
            </p>
            <h3 className="mt-6 text-xl font-bold tracking-normal">Creator finance basics</h3>
            <p className="mt-3 leading-7 text-slate-600">
              The creator economy rewards momentum, but a creator business survives on cash flow.
              That means tracking monthly income targets, setting aside money for taxes, knowing the
              difference between recurring revenue and one-time deals, and planning content around
              the offers that actually support the business. The best creator tools are simple
              enough to use every week. They help creators decide whether to publish more, pitch a
              sponsor, raise UGC rates, build a product, or focus on improving retention before
              monetizing harder.
            </p>
          </section>
        </article>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
                Built for creator teams
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-normal">
                Who is ClipToolkit for?
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              ClipToolkit is built for people turning content into a business, not only chasing
              views.
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {audienceCards.map(([title, body]) => (
              <article key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-bold tracking-normal">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6" aria-labelledby="creator-faq">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">FAQ</p>
        <h2 id="creator-faq" className="mt-2 text-3xl font-bold tracking-normal">
          Creator business tools FAQ
        </h2>
        <div className="mt-6 grid gap-3">
          {homepageFaqItems.map((faq) => (
            <details key={faq.question} className="rounded-lg border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer text-lg font-bold tracking-normal text-slate-950">
                {faq.question}
              </summary>
              <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="bg-slate-950 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <p className="text-lg font-bold">ClipToolkit</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
              Built for independent creators.
            </p>
          </div>
          <FooterColumn
            title="Tools"
            links={[
              ["TikTok Money Calculator", "/tools/tiktok-money-calculator"],
              ["UGC Calculator", "/tools/ugc-rate-calculator"],
              ["YouTube Revenue Calculator", "/tools/youtube-revenue-calculator"]
            ]}
          />
          <FooterColumn
            title="Categories"
            links={[
              ["TikTok Tools", "#tiktok-tools"],
              ["UGC Pricing", "#ugc-pricing"],
              ["Creator Finance", "#creator-finance"]
            ]}
          />
          <FooterColumn
            title="Company"
            links={[
              ["About", "#about"],
              ["Contact", "mailto:hello@cliptoolkit.com"],
              ["Privacy Policy", "/privacy-policy"]
            ]}
          />
        </div>
      </footer>
    </main>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const isLive = tool.status === "Live";

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
          {tool.category}
        </span>
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
      <Link
        href={tool.href}
        className={
          isLive
            ? "mt-5 inline-flex rounded-md bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
            : "mt-5 inline-flex rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:text-slate-950"
        }
      >
        {tool.cta}
      </Link>
    </article>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<[string, string]> }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-300">{title}</h2>
      <div className="mt-4 grid gap-3 text-sm text-slate-400">
        {links.map(([label, href]) => (
          href.startsWith("mailto:") ? (
            <a key={label} href={href} className="transition hover:text-white">
              {label}
            </a>
          ) : (
            <Link key={label} href={href} className="transition hover:text-white">
              {label}
            </Link>
          )
        ))}
      </div>
    </nav>
  );
}
