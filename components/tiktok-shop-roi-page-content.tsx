import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import { TikTokShopRoiCalculator } from "@/components/tiktok-shop-roi-calculator";
import {
  absoluteRoiUrl,
  roiMarkets,
  tiktokShopRoiBasePath,
  tiktokShopRoiDescription,
  tiktokShopRoiFaqItems,
  tiktokShopRoiTitle,
  type RoiMarket
} from "@/lib/tiktok-shop-roi";
import { createFaqSchema } from "@/lib/seo/schema";

const partnerResources = [
  {
    title: "TikTok ad agency partners",
    category: "Ad agency",
    description:
      "Find campaign specialists who can help with Spark Ads, creative testing, and scaling profitable TikTok Shop traffic.",
    href: "https://www.tiktok.com/business/en/marketing-partners"
  },
  {
    title: "3PL fulfillment support",
    category: "Fulfillment",
    description:
      "Compare fulfillment partners when shipping cost, pick-pack fees, or delivery speed start limiting profit.",
    href: "https://www.shopify.com/fulfillment"
  },
  {
    title: "Product research tools",
    category: "Product research",
    description:
      "Use creative and trend research to find stronger product angles, hooks, and competitor positioning.",
    href: "https://ads.tiktok.com/business/creativecenter/"
  }
];

const internalToolLinks = [
  {
    title: "TikTok Money Calculator",
    href: "/tools/tiktok-money-calculator",
    description: "Estimate creator earnings from TikTok views, RPM, engagement, and posting cadence.",
    status: "Live"
  },
  {
    title: "UGC Rate Calculator",
    href: "/tools/ugc-rate-calculator",
    description: "Estimate UGC content rates, usage rights, revisions, and package pricing.",
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

function currencyHref(market: RoiMarket) {
  return market.currency === "usd" ? tiktokShopRoiBasePath : market.path;
}

export function TikTokShopRoiPageContent({ market }: { market: RoiMarket }) {
  const canonicalUrl = absoluteRoiUrl(market.canonicalPath);
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "TikTok Shop ROI Calculator",
    description: tiktokShopRoiDescription,
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
    name: "TikTok Shop ROI Calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: canonicalUrl,
    description:
      "Estimate TikTok Shop revenue, profit, ROI, ROAS, ad spend efficiency, commission, returns, and fulfillment costs.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: market.currencyCode
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <StructuredData
        data={[webPageSchema, softwareApplicationSchema, createFaqSchema(tiktokShopRoiFaqItems)]}
      />
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 xl:max-w-[1400px]">
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

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 xl:max-w-[1400px]">
        <div className="grid gap-6 lg:grid-cols-[minmax(260px,0.42fr)_minmax(0,1fr)] lg:items-start xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-8">
          <div className="lg:sticky lg:top-6 lg:self-start">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
              TIKTOK SHOP TOOLS
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-4xl xl:text-[2.8rem]">
              TikTok Shop ROI Calculator
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600 lg:text-base lg:leading-7 xl:text-lg xl:leading-8">
              Estimate revenue, total cost, net profit, ROI, and ROAS for TikTok Shop campaigns.
              Compare A/B scenarios and see how ad spend, CVR, returns, commission, and shipping
              affect profit.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-600 lg:text-base lg:leading-7 xl:text-lg xl:leading-8">
              Current version: {market.label} planning model in {market.currencyCode}.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {Object.values(roiMarkets).map((item) => (
                <Link
                  key={item.currency}
                  href={currencyHref(item)}
                  className={
                    item.currency === market.currency
                      ? "rounded-md bg-slate-950 px-3 py-2 text-sm font-bold text-white"
                      : "rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-slate-300"
                  }
                >
                  {item.currencyCode}
                </Link>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["ROI and ROAS", "Separate total business return from ad efficiency so profit is clearer."],
                ["A/B scenarios", "Compare two campaign assumptions before scaling budget."],
                ["Exportable report", "Add your email and export a printable PDF report for planning."]
              ].map(([title, body]) => (
                <article key={title} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <h2 className="text-base font-bold tracking-normal">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                </article>
              ))}
            </div>
          </div>

          <TikTokShopRoiCalculator market={market} />
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 xl:max-w-[1400px]">
          <h2 className="text-2xl font-bold tracking-normal">How to use this TikTok Shop estimate</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              [
                "Start with real inputs",
                "Use recent campaign traffic, CVR, ad spend, commission, shipping, and return rate from your seller dashboard."
              ],
              [
                "Watch ROAS and profit",
                "ROAS can look healthy while net profit is weak, so review total cost and ROI before increasing spend."
              ],
              [
                "Compare before scaling",
                "Use Scenario A/B to test a new creative, offer, shipping setup, or bid strategy before committing more budget."
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

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] xl:max-w-[1400px]">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
              TikTok Shop ROI guide
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-normal">
              Optimize ad spend around profit
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              TikTok Shop campaigns need more than a revenue target. Profitable scaling depends on
              ad efficiency, conversion rate, commission, shipping, return rate, and fulfillment.
            </p>
          </div>
        </aside>

        <div className="grid gap-6">
          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">
              What is a TikTok Shop ROI Calculator?
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              A TikTok Shop ROI Calculator estimates whether a TikTok Shop campaign is profitable
              after ad spend, platform commission, shipping, returns, and other operating costs. It
              gives sellers a clearer view than revenue alone because a campaign can generate sales
              while still losing money after fees and fulfillment.
            </p>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">How to calculate TikTok Shop ROI</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Start with revenue from net orders after returns. Then subtract TikTok ad spend,
              platform commission, shipping cost, and miscellaneous operating costs. ROI is net
              profit divided by total cost. ROAS is revenue divided by ad spend. Both matter, but ROI
              is usually better for deciding whether the campaign is actually profitable.
            </p>
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="font-mono text-sm font-bold text-slate-800">
                ROI = (revenue - total cost) / total cost
              </p>
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">ROI vs ROAS for TikTok Shop</h2>
            <p className="mt-4 leading-7 text-slate-600">
              ROAS measures ad efficiency only. If you spend $1,000 on ads and generate $3,000 in
              revenue, ROAS is 300%. ROI goes further by including the rest of the business model.
              Commission, shipping, refunds, product costs, and miscellaneous fees can turn a strong
              ROAS campaign into a weak profit campaign.
            </p>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">What affects TikTok Shop profit?</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                ["Product price", "Higher price can improve contribution margin, but only if CVR and returns remain healthy."],
                ["Traffic quality", "Creator traffic, paid traffic, and cold impressions can convert at very different rates."],
                ["Conversion rate", "Small CVR improvements can create large profit changes when ad spend scales."],
                ["Ad cost", "CPM, CPC, and total ad spend determine how expensive each sales opportunity becomes."],
                ["Commission and shipping", "Platform fees and fulfillment costs can quietly reduce margin."],
                ["Return rate", "Returns reduce recognized revenue while many acquisition and shipping costs remain."]
              ].map(([title, body]) => (
                <div key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <h3 className="font-bold tracking-normal">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-bold tracking-normal">
              How to optimize TikTok ads and fulfillment costs
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Start by improving creative testing and product page clarity before raising budget.
              Better hooks, stronger creator proof, clearer shipping expectations, and tighter
              offer positioning can improve CVR without increasing spend. On the cost side, review
              fulfillment fees, return reasons, packaging, and shipping speed because operational
              costs can erase paid media gains.
            </p>
          </article>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 xl:max-w-[1400px]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
                Monetization and growth
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-normal">
                Affiliate-ready partner resources
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              These partner slots are structured for sponsored or affiliate links. Replace the URLs
              with approved tracking links when partnerships are active.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {partnerResources.map((resource) => (
              <a
                key={resource.title}
                href={resource.href}
                rel="sponsored nofollow"
                target="_blank"
                className="rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <span className="rounded-md bg-white px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  {resource.category}
                </span>
                <h3 className="mt-4 text-xl font-bold tracking-normal">{resource.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{resource.description}</p>
              </a>
            ))}
          </div>
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-xl font-bold tracking-normal">Optional 1-on-1 consultation</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Need help interpreting the numbers? Request a review of your TikTok Shop ad spend,
              product margin, and fulfillment assumptions.
            </p>
            <a
              href="mailto:hello@cliptoolkit.com?subject=TikTok%20Shop%20ROI%20consultation"
              className="mt-4 inline-flex min-h-11 items-center rounded-md bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Request consultation
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 xl:max-w-[1400px]">
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
            Use these calculators together to forecast creator revenue, price content, and plan
            campaign economics.
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

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 xl:max-w-[1400px]" aria-labelledby="faq-title">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">FAQ</p>
        <h2 id="faq-title" className="mt-2 text-3xl font-bold tracking-normal">
          TikTok Shop ROI Calculator FAQ
        </h2>
        <div className="mt-6 grid gap-3">
          {tiktokShopRoiFaqItems.map((faq) => (
            <details key={faq.question} className="rounded-lg border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer text-lg font-bold tracking-normal text-slate-950">
                {faq.question}
              </summary>
              <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 xl:max-w-[1400px]">
        <p className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs leading-5 text-slate-500">
          Based on current TikTok platform commission assumptions as of May 2026. Actual may vary.
          Always confirm your current seller fee schedule, tax treatment, shipping contract, and
          return policy before making budget decisions.
        </p>
      </section>
    </main>
  );
}
