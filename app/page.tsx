import type { Metadata } from "next";

const tools = [
  {
    title: "TikTok Money Calculator",
    description: "Estimate creator earnings from views, RPM, engagement, and monthly posting volume.",
    badge: "TT",
    accent: "border-cyan-200 bg-cyan-50 text-cyan-700"
  },
  {
    title: "UGC Rate Calculator",
    description: "Price creator packages with usage rights, revisions, deliverables, and campaign scope.",
    badge: "UGC",
    accent: "border-emerald-200 bg-emerald-50 text-emerald-700"
  },
  {
    title: "YouTube Revenue Estimator",
    description: "Model ad revenue, watch volume, sponsorship upside, and channel growth targets.",
    badge: "YT",
    accent: "border-rose-200 bg-rose-50 text-rose-700"
  }
];

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "ClipToolkit - Free Creator Business Tools",
  description:
    "Calculate earnings, estimate growth, and optimize your creator business with free video creator tools."
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] text-[#141923]">
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="/" className="flex items-center gap-3 font-semibold text-slate-950">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-950 text-sm font-black text-white">
              C
            </span>
            <span className="text-lg">ClipToolkit</span>
          </a>
          <a
            href="#tools"
            className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Tools
          </a>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 pb-12 pt-16 sm:px-6 sm:pb-16 sm:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
            ClipToolkit
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-6xl">
            The Ultimate Toolkit for Video Creators
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            Calculate earnings, estimate growth, and optimize your creator business.
          </p>
          <div className="mt-9">
            <a
              href="#tools"
              className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-emerald-900/12 transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200"
            >
              <span aria-hidden="true">+</span>
              Try Free Tools
            </a>
          </div>
        </div>

        <div
          id="tools"
          className="mt-14 grid gap-4 scroll-mt-24 md:grid-cols-3"
          aria-label="Free creator tools"
        >
          {tools.map((tool) => (
            <article
              key={tool.title}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-md border text-sm font-black ${tool.accent}`}
              >
                {tool.badge}
              </div>
              <h2 className="text-xl font-bold tracking-normal text-slate-950">{tool.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{tool.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
