import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export type LegalSection = {
  title: string;
  body: ReactNode;
};

export function LegalPage({
  title,
  intro,
  sections
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <main>
      <SiteHeader />
      <section className="shell max-w-3xl py-14 sm:py-20">
        <p className="text-sm font-semibold uppercase text-signal">Legal</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{title}</h1>
        <p className="mt-5 leading-8 text-white/64">{intro}</p>
        <div className="surface mt-8 grid gap-7 rounded-lg p-6 leading-8 text-white/72 sm:p-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <div className="mt-3 text-white/70">{section.body}</div>
            </section>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
