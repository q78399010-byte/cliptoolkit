"use client";

import { useMemo, useState } from "react";

type CalculatorState = {
  monthlyShortsViews: string;
  shortsRpm: string;
  longFormClickThroughRate: string;
  longFormRpm: string;
  extraMonthlyRevenue: string;
};

const initialState: CalculatorState = {
  monthlyShortsViews: "1000000",
  shortsRpm: "0.08",
  longFormClickThroughRate: "1.5",
  longFormRpm: "3.5",
  extraMonthlyRevenue: "150"
};

function numberFromInput(value: string) {
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(Math.max(0, value));
}

function compactNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0
  }).format(Math.max(0, value));
}

function guidanceForShorts(
  shortsRpm: number,
  longFormClickThroughRate: number,
  extraMonthlyRevenue: number
) {
  const guidance: string[] = [];

  if (shortsRpm < 0.05) {
    guidance.push(
      "Shorts RPM is very low. Treat Shorts as discovery and move viewers toward long-form videos, email, affiliates, sponsors, or products."
    );
  }

  if (longFormClickThroughRate < 1) {
    guidance.push(
      "Long-form lift is limited. Add clearer pinned comments, end-card language, playlists, and Shorts topics that naturally lead to deeper videos."
    );
  }

  if (extraMonthlyRevenue <= 0) {
    guidance.push(
      "Add monetization beyond Shorts ads once the format is repeatable. Sponsors, affiliates, UGC packages, and products can change the economics quickly."
    );
  }

  if (!guidance.length) {
    guidance.push(
      "The mix has multiple revenue paths. Keep improving retention, repeat viewers, and the bridge from Shorts into higher-value channel assets."
    );
  }

  return guidance;
}

export function YouTubeShortsMoneyCalculator() {
  const [state, setState] = useState(initialState);

  const result = useMemo(() => {
    const monthlyShortsViews = numberFromInput(state.monthlyShortsViews);
    const shortsRpm = numberFromInput(state.shortsRpm);
    const longFormClickThroughRate = numberFromInput(state.longFormClickThroughRate);
    const longFormRpm = numberFromInput(state.longFormRpm);
    const extraMonthlyRevenue = numberFromInput(state.extraMonthlyRevenue);
    const directShortsRevenue = (monthlyShortsViews / 1000) * shortsRpm;
    const longFormViews = monthlyShortsViews * (longFormClickThroughRate / 100);
    const longFormRevenue = (longFormViews / 1000) * longFormRpm;
    const recommended = directShortsRevenue + longFormRevenue + extraMonthlyRevenue;

    return {
      monthlyShortsViews,
      directShortsRevenue,
      longFormViews,
      longFormRevenue,
      extraMonthlyRevenue,
      low: directShortsRevenue * 0.7 + longFormRevenue * 0.6 + extraMonthlyRevenue * 0.5,
      recommended,
      high: directShortsRevenue * 1.35 + longFormRevenue * 1.4 + extraMonthlyRevenue * 1.25,
      revenuePerMillionShorts:
        monthlyShortsViews > 0 ? (directShortsRevenue / monthlyShortsViews) * 1000000 : 0,
      guidance: guidanceForShorts(shortsRpm, longFormClickThroughRate, extraMonthlyRevenue)
    };
  }, [state]);

  function updateField(field: keyof CalculatorState, value: string) {
    setState((current) => ({
      ...current,
      [field]: value
    }));
  }

  return (
    <section
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      aria-labelledby="youtube-shorts-money-calculator-title"
    >
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
            Live Shorts estimate
          </p>
          <h2
            id="youtube-shorts-money-calculator-title"
            className="mt-2 text-2xl font-bold tracking-normal"
          >
            Shorts revenue snapshot
          </h2>
        </div>
        <div className="rounded-md bg-slate-950 px-3 py-2 text-right text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-300">
            Estimated monthly value
          </p>
          <p className="mt-1 text-lg font-black">{currency(result.recommended)}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Monthly Shorts views</span>
          <input
            inputMode="numeric"
            value={state.monthlyShortsViews}
            onChange={(event) => updateField("monthlyShortsViews", event.target.value)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Shorts RPM</span>
          <input
            inputMode="decimal"
            value={state.shortsRpm}
            onChange={(event) => updateField("shortsRpm", event.target.value)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Long-form lift rate</span>
          <div className="relative">
            <input
              inputMode="decimal"
              value={state.longFormClickThroughRate}
              onChange={(event) => updateField("longFormClickThroughRate", event.target.value)}
              className="min-h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 pr-10 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
              %
            </span>
          </div>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Long-form RPM</span>
          <input
            inputMode="decimal"
            value={state.longFormRpm}
            onChange={(event) => updateField("longFormRpm", event.target.value)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <label className="grid gap-2 sm:col-span-2">
          <span className="text-sm font-bold text-slate-700">
            Sponsor, affiliate, or product revenue
          </span>
          <input
            inputMode="decimal"
            value={state.extraMonthlyRevenue}
            onChange={(event) => updateField("extraMonthlyRevenue", event.target.value)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["Low", result.low],
          ["Recommended", result.recommended],
          ["High", result.high]
        ].map(([label, value]) => (
          <div key={label as string} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              {label as string}
            </p>
            <p className="mt-2 text-2xl font-black tracking-normal text-slate-950">
              {currency(value as number)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            Direct Shorts revenue
          </p>
          <p className="mt-2 text-xl font-black tracking-normal text-slate-950">
            {currency(result.directShortsRevenue)}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            Long-form views from Shorts
          </p>
          <p className="mt-2 text-xl font-black tracking-normal text-slate-950">
            {compactNumber(result.longFormViews)}
          </p>
        </div>
      </div>

      <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs leading-5 text-slate-500">
        Direct Shorts revenue is about {currency(result.revenuePerMillionShorts)} per 1 million
        Shorts views with the current RPM input.
      </p>

      <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
          Shorts monetization guidance
        </p>
        <div className="mt-3 grid gap-2">
          {result.guidance.map((item) => (
            <p key={item} className="leading-7 text-slate-700">
              {item}
            </p>
          ))}
        </div>
      </div>

      <p className="mt-5 text-xs leading-5 text-slate-500">
        Shorts earnings are planning estimates, not guaranteed payouts. Actual value depends on
        monetization eligibility, viewer country, ad demand, music usage, channel quality, sponsors,
        affiliates, and whether Shorts move viewers into deeper assets.
      </p>
    </section>
  );
}
