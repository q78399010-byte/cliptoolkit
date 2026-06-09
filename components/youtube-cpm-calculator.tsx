"use client";

import { useMemo, useState } from "react";

type CalculatorState = {
  adSpend: string;
  impressions: string;
  plannedBudget: string;
  targetCpm: string;
};

const initialState: CalculatorState = {
  adSpend: "1000",
  impressions: "125000",
  plannedBudget: "2500",
  targetCpm: "10"
};

function numberFromInput(value: string) {
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(Math.max(0, value));
}

function compactNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0
  }).format(Math.max(0, value));
}

function cpmBand(cpm: number) {
  if (cpm <= 0) {
    return "Add spend and impressions";
  }

  if (cpm < 6) {
    return "Efficient";
  }

  if (cpm <= 18) {
    return "Workable";
  }

  return "High-cost";
}

function guidanceForCpm(cpm: number, impressionsPerDollar: number) {
  const guidance: string[] = [];

  if (cpm <= 0) {
    guidance.push("Enter ad spend and impressions to calculate YouTube CPM.");
    return guidance;
  }

  if (cpm > 18) {
    guidance.push(
      "CPM is high for a broad YouTube planning baseline. Check targeting, bidding, audience size, placement mix, and whether the campaign is buying a premium niche."
    );
  }

  if (cpm < 6) {
    guidance.push(
      "CPM is efficient. Keep checking watch quality, click-through rate, landing page fit, and conversion value so cheap reach does not hide weak intent."
    );
  }

  if (impressionsPerDollar < 75) {
    guidance.push(
      "Impressions per dollar are limited. Test broader audiences, better creative packaging, and clearer viewer intent before scaling budget."
    );
  }

  if (!guidance.length) {
    guidance.push(
      "CPM is in a workable YouTube planning range. Compare it with view rate, CPC, conversion rate, and creator sponsorship costs before increasing spend."
    );
  }

  return guidance;
}

export function YouTubeCpmCalculator() {
  const [state, setState] = useState(initialState);

  const result = useMemo(() => {
    const adSpend = numberFromInput(state.adSpend);
    const impressions = numberFromInput(state.impressions);
    const plannedBudget = numberFromInput(state.plannedBudget);
    const targetCpm = numberFromInput(state.targetCpm);
    const cpm = impressions > 0 ? (adSpend / impressions) * 1000 : 0;
    const impressionsPerDollar = adSpend > 0 ? impressions / adSpend : 0;
    const forecastImpressions = targetCpm > 0 ? (plannedBudget / targetCpm) * 1000 : 0;

    return {
      cpm,
      impressionsPerDollar,
      costPerTenThousand: cpm * 10,
      forecastImpressions,
      forecastLow: forecastImpressions * 0.75,
      forecastHigh: forecastImpressions * 1.25,
      band: cpmBand(cpm),
      guidance: guidanceForCpm(cpm, impressionsPerDollar)
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
      aria-labelledby="youtube-cpm-calculator-title"
    >
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
            Live ad cost estimate
          </p>
          <h2
            id="youtube-cpm-calculator-title"
            className="mt-2 text-2xl font-bold tracking-normal"
          >
            YouTube CPM snapshot
          </h2>
        </div>
        <div className="rounded-md bg-slate-950 px-3 py-2 text-right text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-300">
            Cost per 1,000 impressions
          </p>
          <p className="mt-1 text-lg font-black">{currency(result.cpm)}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Ad spend</span>
          <input
            inputMode="decimal"
            value={state.adSpend}
            onChange={(event) => updateField("adSpend", event.target.value)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Impressions</span>
          <input
            inputMode="numeric"
            value={state.impressions}
            onChange={(event) => updateField("impressions", event.target.value)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Planned budget</span>
          <input
            inputMode="decimal"
            value={state.plannedBudget}
            onChange={(event) => updateField("plannedBudget", event.target.value)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Target CPM</span>
          <input
            inputMode="decimal"
            value={state.targetCpm}
            onChange={(event) => updateField("targetCpm", event.target.value)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["CPM", currency(result.cpm)],
          ["Cost per 10k", currency(result.costPerTenThousand)],
          ["CPM band", result.band]
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-black tracking-normal text-slate-950">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            Impressions per dollar
          </p>
          <p className="mt-2 text-xl font-black tracking-normal text-slate-950">
            {compactNumber(result.impressionsPerDollar)}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            Forecast impressions
          </p>
          <p className="mt-2 text-xl font-black tracking-normal text-slate-950">
            {compactNumber(result.forecastImpressions)}
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Range: {compactNumber(result.forecastLow)} - {compactNumber(result.forecastHigh)}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
          CPM guidance
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
        YouTube CPM is a media cost metric. It should be read with view rate, CTR, conversion rate,
        audience quality, placement type, and campaign objective.
      </p>
    </section>
  );
}
