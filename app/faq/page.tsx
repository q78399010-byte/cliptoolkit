import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbForPath, createFaqSchema, createWebPageSchema } from "@/lib/seo/schema";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    title: "FAQ",
    description: "Frequently asked questions about Creator Toolkit video downloads.",
    path: "/faq"
  });
}

const faqs = [
  {
    question: "Which platforms are supported in the MVP?",
    answer: "The first release focuses only on TikTok and Instagram Reels."
  },
  {
    question: "Will links be cached?",
    answer:
      "Yes. The download service is planned to cache successful analysis results so repeated links return faster."
  },
  {
    question: "Can the parsing source be replaced?",
    answer:
      "Yes. Providers use a shared interface, so TikTok and Instagram parsing sources can be switched without rewriting the UI."
  }
];

export default function FaqPage() {
  return (
    <main>
      <StructuredData
        data={[
          createWebPageSchema({
            title: "Questions before launch",
            description: "Frequently asked questions about Creator Toolkit video downloads.",
            path: "/faq"
          }),
          breadcrumbForPath("FAQ", "/faq"),
          createFaqSchema(faqs)
        ]}
      />
      <SiteHeader />
      <section className="shell py-14 sm:py-20">
        <p className="text-sm font-semibold uppercase text-mint">FAQ</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Questions before launch</h1>
        <div className="mt-8 grid gap-3">
          {faqs.map((faq) => (
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
