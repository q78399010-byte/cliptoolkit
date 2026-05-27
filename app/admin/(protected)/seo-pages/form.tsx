import type { SeoPageWithFaqs } from "@/lib/db/types";
import { saveSeoPageAction } from "@/app/admin/(protected)/seo-pages/actions";

export function SeoPageForm({ page }: { page?: SeoPageWithFaqs | null }) {
  const faqText =
    page?.faqs.map((faq) => `${faq.question} | ${faq.answer}`).join("\n") ??
    "Do I need to install an app? | No. Creator Toolkit works in your browser.";

  return (
    <form action={saveSeoPageAction} className="surface mt-6 grid gap-4 rounded-lg p-5">
      <input type="hidden" name="id" value={page?.id ?? ""} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Slug
          <input
            name="slug"
            defaultValue={page?.slug ?? ""}
            required
            className="focus-ring min-h-11 rounded-md border border-white/10 bg-white px-3 text-ink"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Page Type
          <select
            name="pageType"
            defaultValue={page?.pageType ?? "landing"}
            className="focus-ring min-h-11 rounded-md border border-white/10 bg-white px-3 text-ink"
          >
            <option value="home">home</option>
            <option value="landing">landing</option>
            <option value="programmatic">programmatic</option>
            <option value="static">static</option>
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium">
        Title
        <input
          name="title"
          defaultValue={page?.title ?? ""}
          required
          className="focus-ring min-h-11 rounded-md border border-white/10 bg-white px-3 text-ink"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Description
        <textarea
          name="description"
          defaultValue={page?.description ?? ""}
          required
          rows={3}
          className="focus-ring rounded-md border border-white/10 bg-white px-3 py-2 text-ink"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        H1
        <input
          name="h1"
          defaultValue={page?.h1 ?? ""}
          className="focus-ring min-h-11 rounded-md border border-white/10 bg-white px-3 text-ink"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        SEO Content
        <textarea
          name="content"
          defaultValue={page?.content ?? ""}
          rows={6}
          className="focus-ring rounded-md border border-white/10 bg-white px-3 py-2 text-ink"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        FAQ lines
        <textarea
          name="faqs"
          defaultValue={faqText}
          rows={5}
          className="focus-ring rounded-md border border-white/10 bg-white px-3 py-2 text-ink"
        />
        <span className="text-xs text-white/48">Use one line per FAQ: Question | Answer</span>
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Schema JSON
        <textarea
          name="schemaJson"
          defaultValue={JSON.stringify(page?.schemaJson ?? {}, null, 2)}
          rows={5}
          className="focus-ring rounded-md border border-white/10 bg-white px-3 py-2 font-mono text-xs text-ink"
        />
        <span className="text-xs text-white/48">
          Optional: eyebrow, subtitle, contentTitle, howToSteps, seoSections. Frontend generates FAQ, HowTo, Breadcrumb, SoftwareApplication, and WebPage schema automatically.
        </span>
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input name="published" type="checkbox" defaultChecked={page?.published ?? true} />
        Published
      </label>
      <button className="min-h-11 rounded-md bg-mint px-4 font-bold text-ink transition hover:bg-[#75f4c6]">
        Save SEO Page
      </button>
    </form>
  );
}
