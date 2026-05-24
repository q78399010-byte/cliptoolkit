import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function LegalPage({ title, body }: { title: string; body: string }) {
  return (
    <main>
      <SiteHeader />
      <section className="shell max-w-3xl py-14 sm:py-20">
        <p className="text-sm font-semibold uppercase text-signal">Legal</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{title}</h1>
        <div className="surface mt-8 rounded-lg p-6 leading-8 text-white/72 sm:p-8">{body}</div>
      </section>
      <SiteFooter />
    </main>
  );
}
