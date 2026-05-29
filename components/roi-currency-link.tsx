"use client";

import Link from "next/link";

type RoiCurrencyLinkProps = {
  active: boolean;
  currencyCode: string;
  href: string;
};

export function RoiCurrencyLink({ active, currencyCode, href }: RoiCurrencyLinkProps) {
  return (
    <Link
      href={href}
      className={
        active
          ? "rounded-md bg-slate-950 px-3 py-2 text-sm font-bold text-white"
          : "rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-slate-300"
      }
    >
      {currencyCode}
    </Link>
  );
}
