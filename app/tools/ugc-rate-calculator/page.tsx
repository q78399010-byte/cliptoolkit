import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import { UgcRateCalculator } from "@/components/ugc-rate-calculator";
import { createFaqSchema } from "@/lib/seo/schema";

const canonicalUrl = "https://www.cliptoolkit.com/tools/ugc-rate-calculator";
const ogImageUrl = "https://www.cliptoolkit.com/og/ugc-rate-calculator.svg";
const pageTitle = "UGC Rate Calculator (2026) | How Much Should You Charge?";
const pageDescription =
  "Free UGC Rate Calculator for 2026. Estimate realistic creator rates for UGC videos, usage rights, revisions, experience level, turnaround, and monthly packages.";

const faqItems = [
  {
    question: "How much should a beginner UGC creator charge?",
    answer:
      "A beginner UGC creator can often charge around $100 to $300 for one short-form video when the scope is simple, usage is organic only, and revisions are limited. Strong editing, a difficult niche, paid usage rights, or fast delivery can move the quote higher."
  },
  {
    question: "Should I charge extra for paid usage rights?",
    answer:
      "Yes. Paid usage rights let the brand run your content as advertising, which can directly support sales and expose your likeness or creative work to larger audiences. Price paid usage separately from organic posting, often with a percentage increase or a fixed licensing fee."
  },
  {
    question: "What is a full buyout in UGC?",
    answer:
      "A full buyout means the brand receives broad control over how the content can be used, reused, edited, and distributed. Because it gives up more control than organic or limited paid usage, a full buyout should cost significantly more."
  },
  {
    question: "How many revisions should be included?",
    answer:
      "One revision round is a practical default for many UGC projects. Extra revision rounds should be priced clearly because they add editing time, project management, and schedule risk."
  },
  {
    question: "Should I offer monthly UGC packages?",
    answer:
      "Monthly UGC packages can be useful when a brand needs a steady content pipeline. They usually include a small per-video bundle discount, but the total contract value is higher and the creator gets more predictable income."
  },
  {
    question: "How do I send a UGC rate to a brand?",
    answer:
      "Send a short quote that defines the deliverables, price, usage rights, usage duration, included revisions, turnaround time, payment terms, and what costs extra. A clear scope makes it easier to negotiate without simply discounting your rate."
  }
];

const recommendedTools = [
  ["Canva Pro", "Create portfolio visuals and pitch decks."],
  ["CapCut Pro", "Edit short-form UGC videos."],
  ["Notion", "Manage briefs, deliverables, and brand contacts."],
  ["Contra", "Find freelance creator opportunities."]
];

const internalToolLinks = [
  {
    title: "TikTok Money Calculator",
    href: "/tools/tiktok-money-calculator",
    description: "Estimate creator earnings from TikTok views, RPM, engagement, and posting cadence.",
    status: ""
  },
  {
    title: "YouTube Revenue Calculator",
    href: "/tools/youtube-revenue-calculator",
    description: "Estimate YouTube RPM income, sponsorship upside, and channel revenue scenarios.",
    status: "Live"
  },
  {
    title: "Sponsorship Rate Calculator",
    href: "/tools/sponsorship-rate-calculator",
    description: "Estimate brand deal pricing from reach, engagement, niche, and campaign value.",
    status: "Coming Soon"
  }
];

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "ugc pricing calculator",
    "ugc rate calculator",
    "how much should i charge for ugc",
    "ugc creator pricing",
    "ugc pricing guide",
    "brand deal calculator"
  ],
  alternates: {
    canonical: canonicalUrl
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonicalUrl,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "UGC Rate Calculator by ClipToolkit"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [ogImageUrl]
  }
};

export default function UgcRateCalculatorPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "UGC Rate Calculator",
    description: pageDescription,
    url: canonicalUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "ClipToolkit",
      url: "https://www.cliptoolkit.com"
    }
  };
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "UGC Rate Calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: canonicalUrl,
    description:
      "Estimate UGC creator pricing using deliverables, usage rights, revisions, experience level, turnaround speed, and retainer scope.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <StructuredData data={[webPageSchema, softwareApplicationSchema, createFaqSchema(faqItems)]} />
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
              UGC Pricing
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl">
              UGC Rate Calculator
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Estimate how much to charge for UGC content based on deliverables, revisions,
              experience, usage rights, and turnaround speed.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Plan realistic pricing before sending your next brand pitch.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["Deliverables", "Price by the number of videos, hooks, edits, or content assets."],
                ["Usage rights", "Charge more when brands want paid ads usage or a full buyout."],
                ["Retainers", "Estimate monthly packages with slightly discounted per-video rates."]
              ].map(([title, body]) => (
                <article key={title} className="rounded-lg border border-slate-200 bg-white p-4">
                  <h2 className="text-base font-bold tracking-normal">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                </article>
              ))}
            </div>
          </div>

          <UgcRateCalculator />
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
          <h2 className="text-2xl font-bold tracking-normal">How to quote brands confidently</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "Define scope",
                "Separate deliverables, concepts, hooks, edits, raw footage, and posting formats before sending the final number."
              ],
              [
                "Limit revisions",
                "Include one revision round by default, then charge for extra review rounds that add editing and management time."
              ],
              [
                "Clarify usage duration",
                "State whether the brand can use the content for organic posts, paid ads, a fixed window, or a broader license."
              ],
              [
                "Protect rights",
                "Avoid unlimited rights unless the brand is paying extra for broad control, exclusivity, or a full buyout."
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

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
              UGC pricing guide
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-normal">
              Price UGC like a creator business
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              A useful UGC quote should explain what the brand gets, how it can use the content,
              and what changes if the scope expands.
            </p>
          </div>
        </aside>

        <article className="grid gap-6">
          <section className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">What is UGC pricing?</h2>
            <p className="mt-4 leading-7 text-slate-600">
              UGC pricing is the process of setting a fair rate for user-generated content that a
              brand can use in organic social posts, ads, product pages, email campaigns, or landing
              pages. Unlike influencer pricing, UGC pricing is not only based on audience size. A
              creator is charging for creative strategy, production, scripting, filming, editing,
              delivery, revisions, and the commercial rights attached to the finished content.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              This is why a short UGC video can have very different prices depending on the scope.
              One organic TikTok-style video for a small brand is not the same as three ad-ready
              variations with hooks, captions, usage rights, raw footage, and a 24-hour turnaround.
              A calculator helps creators slow the conversation down and price each variable instead
              of guessing.
            </p>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">
              How much should UGC creators charge?
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              In 2026, beginner UGC creators commonly quote around $100 to $250 per short-form
              video for simple organic usage. Intermediate creators with stronger portfolios,
              reliable hooks, and cleaner editing often price projects around $250 to $600 per
              video. Advanced creators can charge $600 to $1,200 or more per video when they bring
              proven creative direction, niche expertise, ad-ready production, and commercial
              licensing value.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              The best rate is not always the highest number. The best rate is the number that
              matches the project scope and protects your time. If a brand wants paid usage, multiple
              revisions, rush delivery, exclusivity, or a full buyout, your price should move up.
            </p>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">What affects UGC pricing?</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                ["Deliverable count", "More videos, hooks, edits, and concepts increase production time."],
                ["Usage rights", "Paid ads and full buyouts create more commercial value for the brand."],
                ["Revisions", "Extra review rounds should be priced because they increase project management time."],
                ["Turnaround speed", "Fast or urgent timelines often require schedule changes and premium pricing."],
                ["Experience level", "A stronger portfolio, better strategy, and reliable delivery support higher rates."],
                ["Niche complexity", "Technical, regulated, luxury, or high-consideration products often require more research and precision."]
              ].map(([title, body]) => (
                <div key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <h3 className="font-bold tracking-normal">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">
              Organic usage vs paid usage rights
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Organic usage usually means the brand can publish the content on its own social
              channels without putting ad spend behind it. Paid usage means the brand can run the
              video as an advertisement. That creates more value and more exposure, so creators
              should charge more. A full buyout is broader still because the brand may want long
              usage windows, more placements, or fewer restrictions.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              When you quote paid usage, define the duration, platforms, whitelisting permissions,
              edits, and whether the brand can reuse the content in landing pages, email, or other
              campaigns. Clear usage terms make the price feel more professional and protect the
              creator if the campaign expands.
            </p>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">
              Monthly retainers vs one-off projects
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              One-off projects are useful for testing a brand relationship. Monthly retainers are
              better when the brand needs a steady content pipeline and the creator can batch
              production. Retainers often include a slight per-deliverable discount, but the total
              contract value is higher because the scope includes multiple videos, repeat planning,
              and a predictable workflow.
            </p>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">UGC pricing examples</h2>
            <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
              <div className="grid grid-cols-[1fr_0.8fr_1.2fr] bg-slate-950 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white">
                <span>Creator level</span>
                <span>Starting point</span>
                <span>Typical scope</span>
              </div>
              {[
                ["Beginner", "$100 - $250", "One organic short-form video, basic edit, one included revision."],
                ["Intermediate", "$250 - $600", "Stronger hooks, clean editing, paid usage add-ons, clearer process."],
                ["Advanced", "$600 - $1,200+", "Ad-ready strategy, variations, licensing, and retainer scope."]
              ].map(([level, range, scope]) => (
                <div
                  key={level}
                  className="grid grid-cols-1 gap-2 border-t border-slate-200 px-4 py-4 text-sm sm:grid-cols-[1fr_0.8fr_1.2fr] sm:items-center"
                >
                  <p className="font-bold text-slate-950">{level}</p>
                  <p className="font-semibold text-emerald-700">{range}</p>
                  <p className="leading-6 text-slate-600">{scope}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
                Recommended creator stack
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-normal">
                Tools for UGC production and client workflow
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              A practical stack for building UGC assets, editing short-form videos, organizing
              client work, and finding freelance opportunities.
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recommendedTools.map(([title, body]) => (
              <article key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-xl font-bold tracking-normal">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
              Internal tools
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-normal">
              Explore More Creator Tools
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            Use these calculators together to price campaigns, forecast income, and plan creator
            business decisions.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {internalToolLinks.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-lg border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >
              {tool.status ? (
                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  {tool.status}
                </span>
              ) : null}
              <h3 className={tool.status ? "mt-4 text-xl font-bold tracking-normal" : "text-xl font-bold tracking-normal"}>
                {tool.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6" aria-labelledby="faq-title">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">FAQ</p>
        <h2 id="faq-title" className="mt-2 text-3xl font-bold tracking-normal">
          UGC Rate Calculator FAQ
        </h2>
        <div className="mt-6 grid gap-3">
          {faqItems.map((faq) => (
            <details key={faq.question} className="rounded-lg border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer text-lg font-bold tracking-normal text-slate-950">
                {faq.question}
              </summary>
              <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
