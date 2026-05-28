import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import { TikTokMoneyCalculator } from "@/components/tiktok-money-calculator";
import { createFaqSchema } from "@/lib/seo/schema";

const canonicalUrl = "https://www.cliptoolkit.com/tools/tiktok-money-calculator";
const ogImageUrl = "https://www.cliptoolkit.com/og/tiktok-money-calculator.svg";
const pageTitle = "TikTok Money Calculator (2026)  Estimate Creator Earnings Free";
const pageDescription =
  "Free TikTok Money Calculator. Estimate creator earnings using views, RPM, engagement rate, and posting frequency. Built for creators, UGC creators, and TikTok Shop sellers.";

const faqItems = [
  {
    question: "How much does TikTok pay per 1,000 views?",
    answer:
      "TikTok pay per 1,000 views varies widely by country, niche, watch quality, monetization eligibility, and the type of revenue included. Many creators use an RPM range instead of one fixed number, then compare conservative, middle, and upside scenarios."
  },
  {
    question: "How much can TikTok creators make per month?",
    answer:
      "Monthly TikTok earnings depend on monthly views, RPM, posting volume, audience quality, and non-platform income such as brand deals, affiliate offers, UGC work, and product sales. A creator with strong views but no offer may earn less than a smaller creator with a clear niche and sponsor demand."
  },
  {
    question: "What is a good TikTok RPM?",
    answer:
      "A good TikTok RPM is the rate that makes your content model profitable. For planning, many creators test ranges under $1 for broad entertainment content and higher ranges for finance, software, education, business, or buyer-intent niches."
  },
  {
    question: "Does engagement rate affect TikTok earnings?",
    answer:
      "Engagement rate can affect earnings indirectly because strong retention, comments, saves, and shares can help videos earn more distribution. Better engagement also gives creators stronger proof when pricing sponsorships or UGC packages."
  },
  {
    question: "How can I increase TikTok creator earnings?",
    answer:
      "Increase earnings by tightening your niche, improving the opening hook, posting consistently, building an audience in higher-value markets, testing longer videos when relevant, and adding revenue streams beyond platform payouts."
  },
  {
    question: "Is this TikTok Money Calculator accurate?",
    answer:
      "This calculator is a planning tool, not a payout guarantee. It uses your inputs to create low, medium, and high estimates, but actual earnings depend on TikTok program rules, region, eligibility, advertiser demand, brand deals, and audience quality."
  }
];

const rpmByNiche = [
  ["Entertainment and trends", "$0.20 - $0.80", "High reach, lower buyer intent."],
  ["Lifestyle and beauty", "$0.50 - $1.50", "Often stronger when paired with affiliate or UGC offers."],
  ["Fitness and wellness", "$0.60 - $2.00", "Depends heavily on product fit and audience trust."],
  ["Education and career", "$1.00 - $3.50", "Better intent when viewers are solving a specific problem."],
  ["Business, finance, software", "$2.00 - $6.00+", "Usually stronger advertiser demand and sponsor value."]
];

const recommendedTools = [
  {
    title: "CapCut Pro",
    description: "Video editing for creators who need fast mobile edits, templates, captions, and social exports.",
    focus: "Video editing for creators"
  },
  {
    title: "Descript",
    description: "AI editing and captions for creators turning scripts, podcasts, and interviews into polished clips.",
    focus: "AI editing and captions"
  },
  {
    title: "OpusClip",
    description: "Turn long videos into shorts for TikTok, Reels, and YouTube Shorts distribution.",
    focus: "Turn long videos into shorts"
  }
];

const audienceCards = [
  ["TikTok Creators", "Estimate creator income potential"],
  ["UGC Creators", "Price brand collaborations better"],
  ["TikTok Shop Sellers", "Forecast creator ROI"],
  ["Creator Agencies", "Estimate creator campaign value"]
];

const internalToolLinks = [
  {
    title: "UGC Rate Calculator",
    href: "/tools/ugc-rate-calculator",
    description: "Estimate UGC content rates, usage rights, revisions, and package pricing.",
    status: "Live"
  },
  {
    title: "TikTok Shop ROI Calculator",
    href: "/tools/tiktok-shop-roi-calculator",
    description: "Estimate TikTok Shop revenue, ad spend efficiency, ROAS, and net profit.",
    status: "Live"
  },
  {
    title: "YouTube Revenue Calculator",
    href: "/tools/youtube-revenue-calculator",
    description: "Model YouTube AdSense, Shorts revenue, sponsorships, and monthly channel income.",
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
    "tiktok money calculator",
    "tiktok earnings calculator",
    "tiktok rpm calculator",
    "creator income calculator",
    "ugc creator calculator",
    "tiktok revenue calculator"
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
        alt: "TikTok Money Calculator by ClipToolkit"
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

export default function TikTokMoneyCalculatorPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "TikTok Money Calculator",
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
    name: "TikTok Money Calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: canonicalUrl,
    description:
      "Estimate TikTok creator income using RPM, views, engagement and posting cadence.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <StructuredData
        data={[
          webPageSchema,
          softwareApplicationSchema,
          createFaqSchema(faqItems)
        ]}
      />
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
              Estimate how much TikTok creators can realistically earn from views, RPM,
              engagement, and posting frequency.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Compare low, medium, and high earning scenarios to plan sponsorships, UGC pricing,
              and creator growth.
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
              Use the estimate before pricing a campaign, setting a monthly revenue target, or
              deciding whether a creator partnership is worth the spend.
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

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
              Creator earnings guide
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-normal">
              Use the calculator, then pressure-test the assumptions
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              TikTok revenue is not one clean number. A useful estimate separates reach, RPM,
              engagement quality, and publishing consistency so you can see which lever matters
              most.
            </p>
          </div>
        </aside>

        <div className="grid gap-6">
          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">What is a TikTok Money Calculator?</h2>
            <p className="mt-4 leading-7 text-slate-600">
              A TikTok Money Calculator estimates how much a creator might earn from a given level
              of monthly views. Instead of pretending every account earns the same amount, it uses
              RPM, engagement rate, and posting frequency to create a practical planning range. That
              makes it useful for creators deciding whether to increase content volume, pitch
              sponsors, launch UGC services, or build a higher-value niche.
            </p>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">How TikTok earnings are estimated</h2>
            <p className="mt-4 leading-7 text-slate-600">
              The baseline estimate starts with views and RPM. RPM means revenue per 1,000 views,
              so an account with 500,000 monthly views and a $1 RPM has a $500 baseline before
              adjustments. The calculator then applies small modifiers for engagement and posting
              cadence because high-retention, active audiences and consistent publishing usually
              create more monetization opportunities.
            </p>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">TikTok earnings formula</h2>
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="font-mono text-sm font-bold text-slate-800">
                Estimated earnings = (monthly views / 1,000) x RPM x quality adjustment
              </p>
            </div>
            <p className="mt-4 leading-7 text-slate-600">
              Use the simple formula for a quick baseline, then treat low, medium, and high outputs
              as planning ranges. The low number is better for budgeting. The medium number is a
              realistic operating target. The high number is useful when modeling upside from better
              retention, higher-value audiences, sponsors, affiliate offers, or UGC retainers.
            </p>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">What affects TikTok RPM?</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                ["Audience country", "Advertiser demand is usually stronger in markets with higher ad spend."],
                ["Niche intent", "Finance, software, education, and business content often monetize better than broad trends."],
                ["Video length", "Longer videos may create stronger monetization opportunities when retention stays healthy."],
                ["Audience quality", "Saves, comments, profile clicks, and repeat viewers can support stronger sponsorship pricing."]
              ].map(([title, body]) => (
                <div key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <h3 className="font-bold tracking-normal">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">Average TikTok RPM by niche</h2>
            <p className="mt-4 leading-7 text-slate-600">
              These are planning ranges, not fixed payout rates. Use them to choose a starting RPM,
              then replace the estimate with your own dashboard data as soon as you have it.
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
            <h2 className="text-2xl font-bold tracking-normal">How to increase your TikTok earnings</h2>
            <div className="mt-5 grid gap-4">
              {[
                [
                  "Narrow the content promise",
                  "A clear niche helps viewers understand why to follow and helps brands understand what they are buying."
                ],
                [
                  "Improve the first three seconds",
                  "Most revenue upside starts with retention. Make the problem, result, or tension obvious immediately."
                ],
                [
                  "Add monetization beyond platform payouts",
                  "UGC retainers, affiliate offers, digital products, sponsorships, and consulting can out-earn platform revenue."
                ],
                [
                  "Review by content batch",
                  "Judge formats after a consistent batch of posts, not after one upload. Look for repeatable saves, comments, and shares."
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

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
                Next steps
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-normal">
                Recommended creator stack
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              A practical software stack for turning TikTok performance into better content,
              cleaner production, and more reusable short-form assets.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {recommendedTools.map((tool) => (
              <article key={tool.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <span className="rounded-md bg-white px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  {tool.focus}
                </span>
                <h3 className="mt-4 text-xl font-bold tracking-normal">{tool.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{tool.description}</p>
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
            Keep planning creator revenue across UGC pricing, YouTube income, and sponsored content
            campaigns.
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
          TikTok Money Calculator FAQ
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
