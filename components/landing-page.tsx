import Link from "next/link";
import { DownloadWidget } from "@/components/download-widget";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { MarketingPage } from "@/lib/seo/pages";

const features = [
  {
    title: "No Watermark",
    body: "Save clean videos from supported public links when you have the right to download them."
  },
  {
    title: "HD Video",
    body: "Built for fast video, cover image, and MP3 extraction with cache-first delivery."
  },
  {
    title: "Mobile First",
    body: "Paste, analyze, and download from your phone without extra steps or clutter."
  }
];

const relatedTools = [
  { href: "/tiktok-downloader", label: "TikTok Downloader" },
  { href: "/instagram-reels-downloader", label: "Instagram Reels Downloader" },
  { href: "/download-tiktok-video-online", label: "Download TikTok Video Online" },
  { href: "/download-instagram-reels-hd", label: "Download Instagram Reels HD" }
];

export function LandingPage({ page }: { page: MarketingPage }) {
  return (
    <main>
      <SiteHeader />
      <section className="relative overflow-hidden pb-14 pt-14 sm:pb-20 sm:pt-20">
        <div className="grid-lines absolute inset-0 pointer-events-none" />
        <div className="shell relative text-center">
          <p className="mb-4 text-sm font-semibold uppercase text-mint">{page.eyebrow}</p>
          <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-6xl">
            {page.h1}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">{page.subtitle}</p>
          <div className="mt-8">
            <DownloadWidget />
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/48">
            No app install. No account required. Works best with public TikTok and Instagram Reels
            links.
          </p>
        </div>
      </section>

      <section className="shell py-10 sm:py-14" aria-labelledby="why-us">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase text-signal">Why Choose Us</p>
            <h2 id="why-us" className="mt-2 text-2xl font-semibold sm:text-3xl">
              Fast downloads with less friction.
            </h2>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="surface rounded-lg p-5">
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shell grid gap-6 py-10 sm:grid-cols-[1.1fr_0.9fr] sm:py-14">
        <article className="surface rounded-lg p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase text-mint">SEO Content Block</p>
          <h2 className="mt-3 text-2xl font-semibold">{page.contentTitle}</h2>
          <p className="mt-4 leading-7 text-white/68">{page.content}</p>
        </article>
        <aside className="surface rounded-lg p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase text-signal">Related Tools</p>
          <div className="mt-4 grid gap-3">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-md border border-white/10 px-4 py-3 text-sm font-semibold transition hover:border-mint/40 hover:bg-mint/8"
              >
                {tool.label}
              </Link>
            ))}
          </div>
        </aside>
      </section>

      <section className="shell py-10 sm:py-14" aria-labelledby="faq">
        <p className="text-sm font-semibold uppercase text-ember">FAQ</p>
        <h2 id="faq" className="mt-2 text-2xl font-semibold sm:text-3xl">
          Common questions
        </h2>
        <div className="mt-6 grid gap-3">
          {page.faqs.map((faq) => (
            <details key={faq.question} className="surface rounded-lg p-5">
              <summary className="cursor-pointer font-semibold">{faq.question}</summary>
              <p className="mt-3 leading-7 text-white/64">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
