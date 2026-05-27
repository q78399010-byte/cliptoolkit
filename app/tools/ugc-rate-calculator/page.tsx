import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import { UgcRateCalculator } from "@/components/ugc-rate-calculator";
import { createFaqSchema } from "@/lib/seo/schema";

const canonicalUrl = "https://www.cliptoolkit.com/tools/ugc-rate-calculator";
const ogImageUrl = "https://www.cliptoolkit.com/og/ugc-rate-calculator.svg";
const pageTitle = "UGC Rate Calculator (2026)  How Much Should You Charge?";
const pageDescription =
  "Free UGC Rate Calculator. Estimate how much to charge brands for UGC content using deliverables, usage rights, revisions, experience level, and turnaround speed.";

const faqItems = [
  {
    question: "How much should beginner UGC creators charge?",
    answer:
      "Beginner UGC creators often start around $50 to $150 per deliverable, depending on video quality, niche, brief complexity, and whether usage rights are included. Even beginners should charge more when a brand wants paid ad usage, extra revisions, or rush delivery."
  },
  {
    question: "What are usage rights?",
    answer:
      "Usage rights define how a brand can use your UGC content after delivery. Organic usage usually means posting on owned social channels. Paid usage means the brand can run the content as ads. A full buyout gives the brand much broader control and should cost more."
  },
  {
    question: "Should I charge more for paid ads?",
    answer:
      "Yes. Paid ads usage gives the brand more commercial value from your content and can expose your likeness or creative work to larger audiences. Many creators add a clear licensing fee or percentage increase for paid usage."
  },
  {
    question: "What is a good UGC monthly retainer?",
    answer:
      "A good UGC monthly retainer depends on deliverable volume, usage rights, content complexity, and creator experience. Retainers can range from a few hundred dollars for simple beginner packages to several thousand dollars for advanced creators handling strategy, scripts, editing, and ad variations."
  },
  {
    question: "Do brands negotiate pricing?",
    answer:
      "Yes. Brands often negotiate deliverable count, usage length, revisions, exclusivity, and turnaround. A clear quote helps you negotiate scope instead of simply discounting your rate."
  }
];

const recommendedTools = [
  ["Canva Pro", "Creative assets"],
  ["CapCut Pro", "Video editing"],
  ["Notion", "Client workflow"],
  ["Contra", "Find creator deals"]
];

const internalToolLinks = [
  {
    title: "TikTok Money Calculator",
    href: "/tools/tiktok-money-calculator",
    description: "Estimate creator earnings from TikTok views, RPM, engagement, and posting cadence."
  },
  {
    title: "YouTube Revenue Calculator",
    href: "/tools/youtube-revenue-calculator",
    description: "Estimate YouTube RPM income, sponsorship upside, and channel revenue scenarios."
  },
  {
    title: "Sponsorship Rate Calculator",
    href: "/tools/sponsorship-rate-calculator",
    description: "Estimate brand deal pricing from reach, engagement, niche, and campaign value."
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
          <h2 className="text-2xl font-bold tracking-normal">How to use this UGC estimate</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              [
                "Quote scope clearly",
                "Separate deliverable count, revisions, usage rights, turnaround, and raw footage before discussing the final price."
              ],
              [
                "Protect paid usage",
                "Paid ad rights create more brand value, so they should be priced separately from organic posting."
              ],
              [
                "Anchor retainers",
                "Monthly packages can include a slight volume discount while still creating higher total contract value."
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
              Beginner UGC creators often start with simpler projects in the $50 to $150 per
              deliverable range. Intermediate creators with stronger portfolios, better hooks, and
              reliable editing often move into the $150 to $400 range. Advanced creators can charge
              $400 to $1,000 or more per deliverable when they bring proven creative direction,
              niche expertise, ad-ready production, and commercial licensing value.
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
                ["Turnaround speed", "Fast or urgent timelines often require schedule changes and premium pricing."]
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
              Organic vs paid usage rights
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Organic usage usually means the brand can publish the content on its own social
              channels without putting ad spend behind it. Paid usage means the brand can run the
              video as an advertisement. That creates more value and more exposure, so creators
              should charge more. A full buyout is broader still because the brand may want long
              usage windows, more placements, or fewer restrictions.
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
                ["Beginner", "$50 - $150", "One organic video, basic edit, limited revisions."],
                ["Intermediate", "$150 - $400", "Stronger hooks, clean editing, paid usage add-ons."],
                ["Advanced", "$400 - $1,000+", "Ad-ready strategy, variations, licensing, and retainers."]
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
              No affiliate links yet. These cards are placeholders for future creator stack
              recommendations.
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
              <h3 className="text-xl font-bold tracking-normal">{tool.title}</h3>
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
