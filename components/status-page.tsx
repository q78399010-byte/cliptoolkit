"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function StatusPage({
  code,
  title,
  body,
  primaryHref = "/",
  primaryLabel = "Back to Home",
  extraAction
}: {
  code: string;
  title: string;
  body: string;
  primaryHref?: string;
  primaryLabel?: string;
  extraAction?: ReactNode;
}) {
  return (
    <main>
      <SiteHeader />
      <section className="shell flex min-h-[68vh] items-center py-14 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-mint">{code}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-xl leading-8 text-white/64">{body}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={primaryHref}
              className="focus-ring rounded-2xl bg-mint px-6 py-3 font-black text-ink transition hover:bg-[#75f4c6]"
            >
              {primaryLabel}
            </Link>
            <Link
              href="/blog"
              className="focus-ring rounded-2xl border border-white/12 px-6 py-3 font-bold text-white transition hover:border-mint/40"
            >
              Read Guides
            </Link>
            {extraAction}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
