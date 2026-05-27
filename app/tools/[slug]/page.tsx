import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const comingSoonTools = {
  "youtube-revenue-calculator": {
    title: "YouTube Revenue Calculator",
    description:
      "Estimate YouTube creator revenue from views, RPM, Shorts performance, sponsorships, and channel growth.",
    category: "YouTube Tools"
  },
  "sponsorship-rate-calculator": {
    title: "Sponsorship Rate Calculator",
    description:
      "Estimate creator sponsorship rates using views, engagement, niche, deliverables, and campaign value.",
    category: "Financial Tools"
  }
} as const;

type ToolSlug = keyof typeof comingSoonTools;

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getTool(slug: string) {
  return comingSoonTools[slug as ToolSlug] ?? null;
}

export function generateStaticParams() {
  return Object.keys(comingSoonTools).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);

  if (!tool) {
    return {};
  }

  return {
    title: `${tool.title} - Coming Soon | ClipToolkit`,
    description: tool.description,
    alternates: {
      canonical: `https://www.cliptoolkit.com/tools/${slug}`
    }
  };
}

export default async function ComingSoonToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getTool(slug);

  if (!tool) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-950 text-sm font-black text-white">
              C
            </span>
            <span className="text-lg">ClipToolkit</span>
          </Link>
          <Link
            href="/tools/tiktok-money-calculator"
            className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            TikTok Calculator
          </Link>
        </div>
      </header>

      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
            {tool.category}
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-normal text-slate-950">
            {tool.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{tool.description}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/tools/tiktok-money-calculator"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Use TikTok Money Calculator
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-200 px-5 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Browse all tools
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
