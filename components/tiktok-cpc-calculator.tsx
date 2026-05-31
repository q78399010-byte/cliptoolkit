"use client";

import { useMemo, useState } from "react";

type CalculatorState = {
  adSpend: string;
  clicks: string;
  impressions: string;
  plannedBudget: string;
  targetCpc: string;
};

const initialState: CalculatorState = {
  adSpend: "500",
  clicks: "850",
  impressions: "75000",
  plannedBudget: "1000",
  targetCpc: "0.65"
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

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0
  }).format(Math.max(0, value));
}

function formatPercent(value: number) {
  return `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2
  }).format(Math.max(0, value))}%`;
}

function cpcBand(cpc: number) {
  if (cpc <= 0) {
    return "Add spend and clicks";
  }

  if (cpc < 0.5) {
    return "Efficient";
  }

  if (cpc <= 1.25) {
    return "Workable";
  }

  return "Expensive";
}

function guidanceForCpc(cpc: number, ctr: number, clicks: number) {
  const guidance: string[] = [];

  if (clicks <= 0) {
    guidance.push("Enter ad spend and clicks to calculate TikTok CPC.");
    return guidance;
  }

  if (cpc > 1.25) {
    guidance.push(
      "CPC is high for a planning baseline. Test stronger hooks, clearer offers, broader audiences, and landing pages that match the ad promise."
    );
  }

  if (ctr > 0 && ctr < 0.75) {
    guidance.push(
      "CTR is light. Improve the first seconds, make the next step obvious, and test creator-style edits against polished ads."
    );
  }

  if (cpc < 0.5 && ctr >= 1) {
    guidance.push(
      "CPC and CTR look efficient. Check conversion rate and customer quality before scaling budget."
    );
  }

  if (!guidance.length) {
    guidance.push(
      "CPC is workable. Compare it with CPM, conversion rate, average order value, and influencer content cost before deciding where to spend more."
    );
  }

  return guidance;
}

export function TikTokCpcCalculator() {
  const [state, setState] = useState(initialState);

  const result = useMemo(() => {
    const adSpend = numberFromInput(state.adSpend);
    const clicks = numberFromInput(state.clicks);
    const impressions = numberFromInput(state.impressions);
    const plannedBudget = numberFromInput(state.plannedBudget);
    const targetCpc = numberFromInput(state.targetCpc);
    const cpc = clicks > 0 ? adSpend / clicks : 0;
    const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
    const clicksPerThousand = impressions > 0 ? (clicks / impressions) * 1000 : 0;
    const forecastClicks = targetCpc > 0 ? plannedBudget / targetCpc : 0;

    return {
      adSpend,
      clicks,
      impressions,
      plannedBudget,
      targetCpc,
      cpc,
      ctr,
      clicksPerThousand,
      costPerHundredClicks: cpc * 100,
      forecastClicks,
      forecastLow: forecastClicks * 0.75,
      forecastHigh: forecastClicks * 1.25,
      band: cpcBand(cpc),
      guidance: guidanceForCpc(cpc, ctr, clicks)
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
      aria-labelledby="cpc-calculator-title"
    >
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
            Live click cost estimate
          </p>
          <h2 id="cpc-calculator-title" className="mt-2 text-2xl font-bold tracking-normal">
            TikTok CPC snapshot
          </h2>
        </div>
        <div className="rounded-md bg-slate-950 px-3 py-2 text-right text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-300">
            Cost per click
          </p>
          <p className="mt-1 text-lg font-black">{currency(result.cpc)}</p>
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
          <span className="text-sm font-bold text-slate-700">Clicks</span>
          <input
            inputMode="numeric"
            value={state.clicks}
            onChange={(event) => updateField("clicks", event.target.value)}
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

        <label className="grid gap-2 sm:col-span-2">
          <span className="text-sm font-bold text-slate-700">Target CPC</span>
          <input
            inputMode="decimal"
            value={state.targetCpc}
            onChange={(event) => updateField("targetCpc", event.target.value)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["CPC", currency(result.cpc)],
          ["CTR", formatPercent(result.ctr)],
          ["CPC band", result.band]
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
            Cost per 100 clicks
          </p>
          <p className="mt-2 text-xl font-black tracking-normal text-slate-950">
            {currency(result.costPerHundredClicks)}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            Forecast clicks
          </p>
          <p className="mt-2 text-xl font-black tracking-normal text-slate-950">
            {formatNumber(result.forecastClicks)}
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Range: {formatNumber(result.forecastLow)} - {formatNumber(result.forecastHigh)}
          </p>
        </div>
      </div>

      <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs leading-5 text-slate-500">
        Current click density is {formatNumber(result.clicksPerThousand)} clicks per 1,000
        impressions. Use this with CTR and conversion rate to judge click quality.
      </p>

      <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
          CPC guidance
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
        CPC is a planning metric, not a full performance answer. A cheap click can still be
        unprofitable if the landing page, offer, or audience quality is weak.
      </p>
    </section>
  );
}
