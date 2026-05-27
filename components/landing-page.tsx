import { DownloadWidget } from "@/components/download-widget";
import { RelatedPages } from "@/components/related-pages";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { getMarketingMetaDescription } from "@/lib/seo/content";
import type { MarketingPage } from "@/lib/seo/pages";
import {
  breadcrumbForPath,
  createFaqSchema,
  createHowToSchema,
  createSoftwareApplicationSchema,
  createWebPageSchema,
  createWebsiteSchema
} from "@/lib/seo/schema";

const features = [
  {
    title: "Fast Download",
    body: "Paste a public link, analyze it, and get download options without extra screens."
  },
  {
    title: "No Watermark",
    body: "Designed to surface clean video files when supported by the public source."
  },
  {
    title: "HD Quality",
    body: "Keeps the best available video quality returned by the provider pipeline."
  },
  {
    title: "100% Free",
    body: "No account, no app install, and no paywall for the core downloader flow."
  }
];

const steps = ["Paste link", "Analyze video", "Download file"];

const defaultSeoBlocks = [
  {
    title: "TikTok downloader without watermark",
    body:
      "Use the TikTok downloader to save public TikTok videos from your browser. The page is built for quick mobile use: paste a TikTok URL, let the analyzer detect the platform, then download the available video or audio file."
  },
  {
    title: "Instagram downloader for Reels",
    body:
      "The Instagram downloader recognizes public Instagram Reels links and prepares download options in the same interface. It is optimized for short videos, cover previews, and a simple result card that keeps the next action obvious."
  }
];

export function LandingPage({ page }: { page: MarketingPage }) {
  const path = page.slug ? `/${page.slug}` : "/";
  const metaDescription = getMarketingMetaDescription(page);
  const seoBlocks = page.seoSections?.length ? page.seoSections : defaultSeoBlocks;
  const howToSteps = page.howToSteps?.length ? page.howToSteps : steps;

  return (
    <main>
      <StructuredData
        data={[
          path === "/" ? createWebsiteSchema() : null,
          createSoftwareApplicationSchema(path),
          createWebPageSchema({
            title: page.h1,
            description: metaDescription,
            path
          }),
          breadcrumbForPath(page.h1, path),
          createFaqSchema(page.faqs),
          createHowToSchema({
            title: page.h1,
            description: metaDescription,
            path,
            steps: howToSteps
          })
        ]}
      />
      <SiteHeader />

      <section className="relative overflow-hidden pb-12 pt-10 sm:pb-20 sm:pt-16">
        <div className="grid-lines pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[720px] -translate-x-1/2 rounded-full bg-mint/8 blur-3xl" />

        <div className="shell relative">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-mint">
              {page.eyebrow}
            </p>
            <h1 className="mx-auto max-w-4xl text-balance text-4xl font-semibold leading-[1.04] text-white sm:text-6xl">
              {page.h1}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-xl font-medium leading-8 text-white/72">
              {page.subtitle}
            </p>
          </div>

          <div className="mt-8">
            <DownloadWidget />
          </div>

          <div className="mx-auto mt-6 grid max-w-3xl grid-cols-3 gap-2 text-center text-xs font-semibold text-white/62 sm:text-sm">
            {howToSteps.slice(0, 3).map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/8 bg-white/[0.035] px-2 py-3">
                <span className="mr-1 text-mint">{index + 1}</span>
                {step}
              </div>
            ))}
          </div>

          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-6 text-white/46">
            Works best with public TikTok videos and Instagram Reels. No app install. No account
            required.
          </p>
        </div>
      </section>

      <section className="shell py-10 sm:py-14" aria-labelledby="why-us">
        <div className="mx-auto mb-7 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-signal">Why Choose Us</p>
          <h2 id="why-us" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Built for quick downloads.
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/56">
            The interface keeps the main job visible: paste a link, analyze, download.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article key={feature.title} className="surface rounded-2xl p-5">
              <div className="mb-5 h-1.5 w-10 rounded-full bg-mint" />
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/60">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shell grid gap-5 py-10 lg:grid-cols-[0.92fr_1.08fr] lg:py-14">
        <article className="surface rounded-[28px] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-ember">FAQ Preview</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Common questions</h2>
          <div className="mt-6 grid gap-3">
            {page.faqs.slice(0, 3).map((faq) => (
              <details key={faq.question} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <summary className="cursor-pointer font-semibold">{faq.question}</summary>
                <p className="mt-3 leading-7 text-white/62">{faq.answer}</p>
              </details>
            ))}
          </div>
        </article>

        <article className="surface rounded-[28px] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-mint">How it works</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">A cleaner download flow.</h2>
          <p className="mt-4 leading-7 text-white/64">{page.content}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {howToSteps.map((step, index) => (
              <div key={step} id={`step-${index + 1}`} className="rounded-2xl border border-white/8 bg-black/10 p-4">
                <p className="text-sm font-bold text-mint">Step {index + 1}</p>
                <p className="mt-2 font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="shell py-10 sm:py-14" aria-labelledby="seo-content">
        <div className="surface rounded-[32px] p-6 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-signal">SEO Content</p>
          <h2 id="seo-content" className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {page.contentTitle}
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-white/62">
            {page.content}
          </p>

          <div className="mt-7 grid gap-4 lg:grid-cols-2">
            {seoBlocks.map((block) => (
              <article key={block.title} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <h3 className="text-xl font-semibold">{block.title}</h3>
                <p className="mt-3 leading-7 text-white/60">{block.body}</p>
              </article>
            ))}
          </div>

          <p className="mt-7 text-sm text-white/48">
            Use the related pages below to explore TikTok downloader, Instagram downloader, no-watermark,
            HD download, and how-to search intents.
          </p>
        </div>
      </section>

      <RelatedPages currentPath={path} limit={10} title="Related download pages" />

      <SiteFooter />
    </main>
  );
}
