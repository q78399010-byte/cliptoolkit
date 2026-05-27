"use client";

import { useMemo, useState } from "react";

type CalculatorState = {
  monthlyViews: string;
  rpm: string;
  engagementRate: string;
  postingFrequency: string;
};

const initialState: CalculatorState = {
  monthlyViews: "500000",
  rpm: "1.25",
  engagementRate: "6",
  postingFrequency: "5"
};

function numberFromInput(value: string) {
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(Math.max(0, value));
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1
  }).format(value);
}

function getGrowthSuggestions(
  rpm: number,
  engagementRate: number,
  postingFrequency: number,
  monthlyViews: number
) {
  const suggestions: string[] = [];

  if (rpm < 0.5) {
    suggestions.push(
      "RPM is low. Improve content focus around one niche, prioritize higher-value audience countries, and test videos long enough to qualify for stronger monetization signals."
    );
  }

  if (engagementRate < 3) {
    suggestions.push(
      "Engagement is holding the estimate down. Rewrite the first three seconds, make the payoff clearer, and add a simple CTA that invites comments or saves."
    );
  }

  if (postingFrequency < 3) {
    suggestions.push(
      "Posting frequency is below a stable testing cadence. Aim for at least 3 consistent posts per week before judging whether a format is working."
    );
  }

  if (suggestions.length) {
    return suggestions;
  }

  if (monthlyViews < 100000) {
    return [
      "Focus on repeatable formats first. Publish enough test videos each week to identify hooks that can reliably pass 10,000 views."
    ];
  }

  if (engagementRate >= 8 && postingFrequency >= 5 && rpm >= 1) {
    return [
      "You have strong monetization signals. Package your results into a simple media kit and test sponsor or UGC offers alongside platform revenue."
    ];
  }

  return [
    "Keep the cadence steady and improve one variable at a time: hook rate, retention, comment quality, audience quality, or offer conversion."
  ];
}

export function TikTokMoneyCalculator() {
  const [state, setState] = useState(initialState);

  const result = useMemo(() => {
    const monthlyViews = numberFromInput(state.monthlyViews);
    const rpm = numberFromInput(state.rpm);
    const engagementRate = numberFromInput(state.engagementRate);
    const postingFrequency = numberFromInput(state.postingFrequency);
    const baseEarnings = (monthlyViews / 1000) * rpm;
    const engagementMultiplier = Math.min(1.35, Math.max(0.78, 1 + (engagementRate - 5) * 0.035));
    const cadenceMultiplier = Math.min(1.25, Math.max(0.82, 1 + (postingFrequency - 4) * 0.025));
    const adjustedEstimate = baseEarnings * engagementMultiplier * cadenceMultiplier;

    return {
      monthlyViews,
      rpm,
      engagementRate,
      postingFrequency,
      low: adjustedEstimate * 0.65,
      medium: adjustedEstimate,
      high: adjustedEstimate * 1.55,
      suggestions: getGrowthSuggestions(rpm, engagementRate, postingFrequency, monthlyViews),
      viewsPerPost:
        postingFrequency > 0 ? monthlyViews / Math.max(1, postingFrequency * 4.33) : monthlyViews
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
      aria-labelledby="calculator-title"
    >
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
            Live estimate
          </p>
          <h2 id="calculator-title" className="mt-2 text-2xl font-bold tracking-normal">
            Creator revenue snapshot
          </h2>
        </div>
        <div className="rounded-md bg-slate-950 px-3 py-2 text-right text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-300">
            Estimated monthly earnings
          </p>
          <p className="mt-1 text-lg font-black">{currency(result.medium)}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Monthly views</span>
          <input
            inputMode="numeric"
            value={state.monthlyViews}
            onChange={(event) => updateField("monthlyViews", event.target.value)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">RPM</span>
          <input
            inputMode="decimal"
            value={state.rpm}
            onChange={(event) => updateField("rpm", event.target.value)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Engagement rate</span>
          <div className="relative">
            <input
              inputMode="decimal"
              value={state.engagementRate}
              onChange={(event) => updateField("engagementRate", event.target.value)}
              className="min-h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 pr-10 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
              %
            </span>
          </div>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Posting frequency</span>
          <div className="relative">
            <input
              inputMode="numeric"
              value={state.postingFrequency}
              onChange={(event) => updateField("postingFrequency", event.target.value)}
              className="min-h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 pr-20 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
              / week
            </span>
          </div>
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["Low", result.low],
          ["Medium", result.medium],
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
            Views per post
          </p>
          <p className="mt-2 text-xl font-black tracking-normal text-slate-950">
            {formatNumber(result.viewsPerPost)}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            Effective RPM
          </p>
          <p className="mt-2 text-xl font-black tracking-normal text-slate-950">
            ${formatNumber(result.rpm)}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
          Creator Growth Suggestion
        </p>
        <div className="mt-3 grid gap-2">
          {result.suggestions.map((suggestion) => (
            <p key={suggestion} className="leading-7 text-slate-700">
              {suggestion}
            </p>
          ))}
        </div>
      </div>

      <p className="mt-5 text-xs leading-5 text-slate-500">
        Estimates are planning ranges, not guaranteed payouts. Actual earnings depend on TikTok
        monetization eligibility, region, content category, brand deals, affiliate income, and
        audience quality.
      </p>
    </section>
  );
}
