import type { ReactNode } from "react";
import Link from "next/link";
import type { CreatorTool } from "@/data/creator-tools";
import { creatorTools, getCreatorTool, toolCanonicalUrl } from "@/data/creator-tools";
import { createFaqSchema } from "@/lib/seo/schema";
import { StructuredData } from "./structured-data";

type FaqItem = {
  question: string;
  answer: string;
};

type TableBlock = {
  headers: [string, string, string];
  rows: Array<[string, string, string]>;
};

export type ContentBlock = {
  title: string;
  paragraphs: string[];
  formula?: string;
  cards?: Array<[string, string]>;
  table?: TableBlock;
};

type CalculatorToolPageProps = {
  tool: CreatorTool;
  calculator: ReactNode;
  heroEyebrow: string;
  heroDescription: string;
  heroSecondaryDescription: string;
  heroCards: Array<[string, string]>;
  audienceLead: string;
  audienceCards: Array<[string, string]>;
  usageSteps: Array<[string, string]>;
  guideEyebrow: string;
  guideTitle: string;
  guideDescription: string;
  contentBlocks: ContentBlock[];
  faqItems: FaqItem[];
  relatedToolSlugs: string[];
};

function relatedToolsForSlugs(slugs: string[]) {
  const selected = slugs
    .map((slug) => getCreatorTool(slug))
    .filter((tool): tool is CreatorTool => Boolean(tool));

  if (selected.length) {
    return selected;
  }

  return creatorTools.filter((item) => item.status === "Live").slice(0, 4);
}

export function CalculatorToolPage({
  tool,
  calculator,
  heroEyebrow,
  heroDescription,
  heroSecondaryDescription,
  heroCards,
  audienceLead,
  audienceCards,
  usageSteps,
  guideEyebrow,
  guideTitle,
  guideDescription,
  contentBlocks,
  faqItems,
  relatedToolSlugs
}: CalculatorToolPageProps) {
  const canonicalUrl = toolCanonicalUrl(tool);
  const relatedTools = relatedToolsForSlugs(relatedToolSlugs);
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: tool.title,
    description: tool.metaDescription,
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
    name: tool.title,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: canonicalUrl,
    description: tool.metaDescription,
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
              {heroEyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl">
              {tool.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{heroDescription}</p>
            <p className="mt-4 text-lg leading-8 text-slate-600">{heroSecondaryDescription}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {heroCards.map(([title, body]) => (
                <article key={title} className="rounded-lg border border-slate-200 bg-white p-4">
                  <h2 className="text-base font-bold tracking-normal">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                </article>
              ))}
            </div>
          </div>

          {calculator}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
                Built for creator teams
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-normal">
                Who should use this calculator?
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">{audienceLead}</p>
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
            {usageSteps.map(([title, body]) => (
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
              {guideEyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-normal">{guideTitle}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{guideDescription}</p>
          </div>
        </aside>

        <div className="grid gap-6">
          {contentBlocks.map((block) => (
            <article key={block.title} className="rounded-lg border border-slate-200 bg-white p-6">
              <h2 className="text-2xl font-bold tracking-normal">{block.title}</h2>
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-7 text-slate-600">
                  {paragraph}
                </p>
              ))}
              {block.formula ? (
                <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="font-mono text-sm font-bold text-slate-800">{block.formula}</p>
                </div>
              ) : null}
              {block.cards ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {block.cards.map(([title, body]) => (
                    <div key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <h3 className="font-bold tracking-normal">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                    </div>
                  ))}
                </div>
              ) : null}
              {block.table ? (
                <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
                  <div className="grid grid-cols-1 gap-2 bg-slate-950 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white sm:grid-cols-3">
                    {block.table.headers.map((header) => (
                      <span key={header}>{header}</span>
                    ))}
                  </div>
                  {block.table.rows.map((row) => (
                    <div
                      key={row.join("|")}
                      className="grid grid-cols-1 gap-2 border-t border-slate-200 px-4 py-4 text-sm sm:grid-cols-3 sm:items-center"
                    >
                      <p className="font-bold text-slate-950">{row[0]}</p>
                      <p className="font-semibold text-emerald-700">{row[1]}</p>
                      <p className="leading-6 text-slate-600">{row[2]}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
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
            Use these calculators together to compare creator revenue, ad costs, engagement, and
            campaign pricing.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {relatedTools.map((relatedTool) => (
            <Link
              key={relatedTool.href}
              href={relatedTool.href}
              className="rounded-lg border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >
              <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                {relatedTool.status}
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-normal">{relatedTool.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{relatedTool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6" aria-labelledby="faq-title">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">FAQ</p>
        <h2 id="faq-title" className="mt-2 text-3xl font-bold tracking-normal">
          {tool.title} FAQ
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
