import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import { YouTubeRevenueCalculator } from "@/components/youtube-revenue-calculator";
import { createFaqSchema } from "@/lib/seo/schema";

const canonicalUrl = "https://www.cliptoolkit.com/tools/youtube-revenue-calculator";
const ogImageUrl = "https://www.cliptoolkit.com/og/youtube-revenue-calculator.svg";
const pageTitle = "YouTube Revenue Calculator (2026)  Estimate YouTube Earnings";
const pageDescription =
  "Free YouTube Revenue Calculator. Estimate monthly YouTube earnings using views, RPM, niche, upload frequency, and Shorts vs long-form content mix.";

const faqItems = [
  {
    question: "How much does YouTube pay per 1,000 views?",
    answer:
      "YouTube pay per 1,000 views depends on RPM, niche, country, watch time, ad demand, viewer intent, and content format. Many creators estimate earnings with a range because the same view count can produce very different revenue across channels."
  },
  {
    question: "What is a good YouTube RPM?",
    answer:
      "A good YouTube RPM depends on the niche and audience. Broad entertainment or gaming channels may plan with lower RPMs, while finance, business, software, education, and high-intent product niches can often support higher RPMs."
  },
  {
    question: "Do YouTube Shorts pay less than long-form videos?",
    answer:
      "YouTube Shorts often pay less per 1,000 views than long-form videos because the ad model and viewing behavior are different. Shorts can still be valuable for discovery, audience growth, and sending viewers toward longer videos or offers."
  },
  {
    question: "Which YouTube niches have the highest RPM?",
    answer:
      "Finance, business, software, investing, career, education, and buyer-intent technology content often have stronger RPM potential because advertisers can earn more from each customer. Audience country and trust still matter."
  },
  {
    question: "How can creators increase YouTube revenue?",
    answer:
      "Creators can increase YouTube revenue by improving retention, targeting higher-intent topics, building a consistent upload schedule, improving titles and thumbnails, adding sponsors, testing affiliate offers, and building email or product funnels."
  },
  {
    question: "Is this YouTube Revenue Calculator accurate?",
    answer:
      "This calculator is a planning tool, not a payout guarantee. It uses views, RPM, niche, upload frequency, and content mix to estimate low, recommended, and premium scenarios, but actual earnings depend on YouTube monetization rules and channel quality."
  }
];

const rpmByNiche = [
  ["General", "$2 - $5", "Broad audiences can work well at scale, but advertiser intent is mixed."],
  ["Gaming", "$1.50 - $4", "Often strong engagement, but RPM depends heavily on game, region, and sponsor fit."],
  ["Beauty & Lifestyle", "$3 - $7", "Product demand and affiliate opportunities can improve total creator income."],
  ["Tech", "$5 - $10+", "Product research and buyer intent often support stronger ad and sponsor rates."],
  ["Finance", "$8 - $20+", "High advertiser value, but trust, compliance, and audience quality matter more."],
  ["Education", "$3 - $8", "Evergreen search demand can support stable long-form revenue."],
  ["Business / SaaS", "$7 - $18+", "Software and B2B audiences can support premium sponsorships and affiliate offers."]
];

const audienceCards = [
  ["YouTubers", "Estimate monthly AdSense and planning ranges."],
  ["Shorts creators", "Compare Shorts-heavy revenue against long-form income."],
  ["Creator agencies", "Model channel value before sponsorship or campaign planning."],
  ["Educators", "Pressure-test RPM assumptions for search-driven evergreen content."]
];

const internalToolLinks = [
  {
    title: "TikTok Money Calculator",
    href: "/tools/tiktok-money-calculator",
    description: "Estimate creator earnings from TikTok views, RPM, engagement, and posting cadence.",
    status: "Live"
  },
  {
    title: "TikTok Shop ROI Calculator",
    href: "/tools/tiktok-shop-roi-calculator",
    description: "Estimate TikTok Shop revenue, ad spend efficiency, ROAS, and net profit.",
    status: "Live"
  },
  {
    title: "UGC Rate Calculator",
    href: "/tools/ugc-rate-calculator",
    description: "Estimate UGC content rates, usage rights, revisions, and package pricing.",
    status: "Live"
  },
  {
    title: "Sponsorship Rate Calculator",
    href: "/tools/sponsorship-rate-calculator",
    description: "Price sponsored posts using views, engagement, niche, deliverables, and campaign value.",
    status: "Coming Soon"
  }
];

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "youtube revenue calculator",
    "youtube earnings calculator",
    "youtube rpm calculator",
    "youtube cpm calculator",
    "youtube money calculator",
    "youtube income estimator"
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
        alt: "YouTube Revenue Calculator by ClipToolkit"
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

export default function YouTubeRevenueCalculatorPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "YouTube Revenue Calculator",
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
    name: "YouTube Revenue Calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: canonicalUrl,
    description:
      "Estimate YouTube creator earnings using monthly views, RPM, niche, upload frequency, and Shorts vs long-form content mix.",
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
              YOUTUBE TOOLS
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl">
              YouTube Revenue Calculator
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Estimate how much YouTube creators can earn from monthly views, RPM, niche, upload
              frequency, and Shorts vs long-form content mix.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Use realistic low, recommended, and premium scenarios to plan creator income and
              sponsorship goals.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["Monthly views", "Start with your recent monthly channel views or a realistic target."],
                ["RPM by niche", "Use the suggested RPM presets, then replace them with your own analytics."],
                ["Content mix", "Compare long-form, balanced, and Shorts-heavy revenue expectations."]
              ].map(([title, body]) => (
                <article key={title} className="rounded-lg border border-slate-200 bg-white p-4">
                  <h2 className="text-base font-bold tracking-normal">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                </article>
              ))}
            </div>
          </div>

          <YouTubeRevenueCalculator />
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
                Built for creator businesses
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-normal">
                Who should use this calculator?
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Use the estimate before setting revenue targets, pitching sponsors, or deciding
              whether your channel needs more views, better RPM, or a stronger offer.
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {audienceCards.map(([title, body]) => (
              <article key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-bold tracking-normal">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
          <h2 className="text-2xl font-bold tracking-normal">How to use this estimate</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              [
                "Start with analytics",
                "Use your real monthly views and RPM when you have them. The defaults are only planning assumptions."
              ],
              [
                "Compare formats",
                "A Shorts-heavy channel may need more total views or stronger off-platform monetization than a long-form channel."
              ],
              [
                "Plan beyond ads",
                "Use the revenue range to decide when to pitch sponsorships, affiliates, products, or email capture."
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
              YouTube earnings guide
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-normal">
              Forecast revenue with practical assumptions
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              YouTube income is shaped by views, RPM, topic value, viewer geography, watch time,
              Shorts mix, and business model. A useful estimate keeps those variables visible.
            </p>
          </div>
        </aside>

        <div className="grid gap-6">
          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">
              What is a YouTube Revenue Calculator?
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              A YouTube Revenue Calculator estimates monthly creator income from views and RPM.
              Instead of assuming every channel earns the same amount, it lets creators adjust for
              niche, Shorts vs long-form mix, and upload frequency. The result is a planning range
              that is more useful than one fixed number.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              The calculator is useful for setting income goals, comparing channel formats, deciding
              whether a content strategy has enough upside, and preparing sponsorship conversations.
              It does not replace YouTube Analytics, but it gives creators a fast way to pressure-test
              assumptions before changing strategy.
            </p>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">
              How YouTube earnings are estimated
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              The basic formula is monthly views divided by 1,000, multiplied by RPM. A channel with
              100,000 monthly views and a $3.50 RPM has a $350 baseline before content mix
              adjustments. The calculator then lowers the estimate for balanced or Shorts-heavy
              channels because long-form views usually carry more ad inventory and stronger RPM.
            </p>
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="font-mono text-sm font-bold text-slate-800">
                Estimated revenue = (monthly views / 1,000) x RPM x content mix modifier
              </p>
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">YouTube RPM vs CPM</h2>
            <p className="mt-4 leading-7 text-slate-600">
              CPM is what advertisers pay for 1,000 ad impressions. RPM is closer to what creators
              actually use for revenue planning because it reflects estimated revenue per 1,000
              views after YouTube's revenue share and the channel's monetization mix. Creators
              usually plan with RPM because it is tied to the money reaching the channel.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              CPM can still be useful when talking to advertisers, but RPM is the cleaner input for
              forecasting creator income. If your analytics show different RPM values for long-form,
              Shorts, livestreams, or countries, use the number that best matches the content you
              are modeling.
            </p>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">What affects YouTube RPM?</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                ["Niche intent", "Finance, software, business, education, and product research topics often attract higher-value advertisers."],
                ["Audience country", "RPM is usually stronger in markets where advertisers spend more per customer."],
                ["Watch time", "Longer sessions can create more ad opportunities and stronger monetization signals."],
                ["Audience quality", "Trust, repeat viewers, search intent, and buyer readiness can support higher sponsor and affiliate income."],
                ["Content format", "Long-form, Shorts, livestreams, and podcasts can each produce different RPM patterns."],
                ["Seasonality", "Advertiser demand often changes by quarter, holiday season, and product launch cycles."]
              ].map(([title, body]) => (
                <div key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <h3 className="font-bold tracking-normal">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">Suggested YouTube RPM by niche</h2>
            <p className="mt-4 leading-7 text-slate-600">
              These ranges are starting assumptions, not fixed payout rates. Replace them with your
              own YouTube Analytics RPM as soon as you have enough data.
            </p>
            <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
              <div className="grid grid-cols-[1fr_0.8fr_1.2fr] bg-slate-950 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white">
                <span>Niche</span>
                <span>Planning RPM</span>
                <span>Notes</span>
              </div>
              {rpmByNiche.map(([niche, rpm, notes]) => (
                <div
                  key={niche}
                  className="grid grid-cols-1 gap-2 border-t border-slate-200 px-4 py-4 text-sm sm:grid-cols-[1fr_0.8fr_1.2fr] sm:items-center"
                >
                  <p className="font-bold text-slate-950">{niche}</p>
                  <p className="font-semibold text-emerald-700">{rpm}</p>
                  <p className="leading-6 text-slate-600">{notes}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">
              YouTube Shorts vs long-form revenue
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Shorts can reach large audiences quickly, but Shorts RPM is often lower than long-form
              RPM. Long-form videos usually create more room for ads, deeper viewer intent, stronger
              watch time, and more sponsorship integrations. That is why a smaller long-form channel
              can sometimes earn more than a Shorts-heavy channel with many more views.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              Shorts still have a business role. They can help discovery, test topics, create demand
              for long-form videos, and keep the channel active between larger uploads. The best mix
              depends on the channel's audience, niche, and offer.
            </p>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">
              How to increase YouTube creator income
            </h2>
            <div className="mt-5 grid gap-4">
              {[
                [
                  "Improve retention",
                  "Stronger retention helps videos earn more distribution and can create more monetizable watch time."
                ],
                [
                  "Target higher-intent topics",
                  "Tutorials, reviews, comparisons, and problem-solving videos often attract viewers with stronger purchase intent."
                ],
                [
                  "Package sponsorships",
                  "Use views, audience fit, and content integration quality to sell sponsorships beyond AdSense revenue."
                ],
                [
                  "Add owned channels",
                  "Email capture, affiliate offers, digital products, and consulting can raise income without requiring more views."
                ]
              ].map(([title, body]) => (
                <div key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <h3 className="font-bold tracking-normal">{title}</h3>
                  <p className="mt-2 leading-6 text-slate-600">{body}</p>
                </div>
              ))}
            </div>
          </article>
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
            Keep planning creator revenue across TikTok earnings, UGC pricing, and sponsored
            content campaigns.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {internalToolLinks.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-lg border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >
              <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                {tool.status}
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-normal">{tool.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6" aria-labelledby="faq-title">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">FAQ</p>
        <h2 id="faq-title" className="mt-2 text-3xl font-bold tracking-normal">
          YouTube Revenue Calculator FAQ
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
