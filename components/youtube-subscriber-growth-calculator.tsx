"use client";

import { useMemo, useState } from "react";

type CalculatorState = {
  currentSubscribers: string;
  monthlyViews: string;
  subscriberConversionRate: string;
  uploadsPerMonth: string;
  targetSubscribers: string;
};

const initialState: CalculatorState = {
  currentSubscribers: "25000",
  monthlyViews: "300000",
  subscriberConversionRate: "0.8",
  uploadsPerMonth: "8",
  targetSubscribers: "100000"
};

function numberFromInput(value: string) {
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function compactNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0
  }).format(Math.max(0, value));
}

function formatPercent(value: number) {
  return `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2
  }).format(Math.max(0, value))}%`;
}

function formatMonths(months: number) {
  if (months <= 0 || !Number.isFinite(months)) {
    return "Add target";
  }

  if (months > 120) {
    return "10+ years";
  }

  if (months === 1) {
    return "1 month";
  }

  if (months < 12) {
    return `${months} months`;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (remainingMonths === 0) {
    return years === 1 ? "1 year" : `${years} years`;
  }

  return `${years} yr ${remainingMonths} mo`;
}

function growthBand(conversionRate: number) {
  if (conversionRate <= 0) {
    return "Add rate";
  }

  if (conversionRate < 0.4) {
    return "Light";
  }

  if (conversionRate <= 1.2) {
    return "Healthy";
  }

  return "Strong";
}

function guidanceForGrowth(conversionRate: number, uploadsPerMonth: number, monthsToTarget: number) {
  const guidance: string[] = [];

  if (conversionRate < 0.4) {
    guidance.push(
      "Subscriber conversion is light. Make the channel promise clearer, tighten topic clusters, and add a specific reason to subscribe inside the video."
    );
  }

  if (uploadsPerMonth < 4) {
    guidance.push(
      "Upload cadence is light for a clean growth read. Publish enough videos each month to separate topic problems from packaging problems."
    );
  }

  if (monthsToTarget > 24) {
    guidance.push(
      "The target is more than two years away at the current pace. Improve view volume, conversion rate, or upload cadence before relying on time alone."
    );
  }

  if (!guidance.length) {
    guidance.push(
      "Growth inputs are in a workable range. Keep tracking subscribers by topic, traffic source, and video format so the channel can repeat what converts."
    );
  }

  return guidance;
}

export function YouTubeSubscriberGrowthCalculator() {
  const [state, setState] = useState(initialState);

  const result = useMemo(() => {
    const currentSubscribers = numberFromInput(state.currentSubscribers);
    const monthlyViews = numberFromInput(state.monthlyViews);
    const subscriberConversionRate = numberFromInput(state.subscriberConversionRate);
    const uploadsPerMonth = Math.max(1, numberFromInput(state.uploadsPerMonth));
    const targetSubscribers = numberFromInput(state.targetSubscribers);
    const newSubscribersPerMonth = monthlyViews * (subscriberConversionRate / 100);
    const subscribersPerUpload = newSubscribersPerMonth / uploadsPerMonth;
    const annualForecast = currentSubscribers + newSubscribersPerMonth * 12;
    const gapToTarget = Math.max(0, targetSubscribers - currentSubscribers);
    const monthsToTarget =
      gapToTarget > 0 && newSubscribersPerMonth > 0
        ? Math.ceil(gapToTarget / newSubscribersPerMonth)
        : 0;

    return {
      currentSubscribers,
      monthlyViews,
      subscriberConversionRate,
      uploadsPerMonth,
      targetSubscribers,
      newSubscribersPerMonth,
      subscribersPerUpload,
      annualForecast,
      monthsToTarget,
      growthBand: growthBand(subscriberConversionRate),
      guidance: guidanceForGrowth(subscriberConversionRate, uploadsPerMonth, monthsToTarget)
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
      aria-labelledby="youtube-subscriber-growth-calculator-title"
    >
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
            Live growth estimate
          </p>
          <h2
            id="youtube-subscriber-growth-calculator-title"
            className="mt-2 text-2xl font-bold tracking-normal"
          >
            Subscriber growth snapshot
          </h2>
        </div>
        <div className="rounded-md bg-slate-950 px-3 py-2 text-right text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-300">
            New subscribers per month
          </p>
          <p className="mt-1 text-lg font-black">
            {compactNumber(result.newSubscribersPerMonth)}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Current subscribers</span>
          <input
            inputMode="numeric"
            value={state.currentSubscribers}
            onChange={(event) => updateField("currentSubscribers", event.target.value)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </label>

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
          <span className="text-sm font-bold text-slate-700">Subscriber conversion rate</span>
          <div className="relative">
            <input
              inputMode="decimal"
              value={state.subscriberConversionRate}
              onChange={(event) => updateField("subscriberConversionRate", event.target.value)}
              className="min-h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 pr-10 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
              %
            </span>
          </div>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Uploads per month</span>
          <input
            inputMode="numeric"
            value={state.uploadsPerMonth}
            onChange={(event) => updateField("uploadsPerMonth", event.target.value)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <label className="grid gap-2 sm:col-span-2">
          <span className="text-sm font-bold text-slate-700">Target subscribers</span>
          <input
            inputMode="numeric"
            value={state.targetSubscribers}
            onChange={(event) => updateField("targetSubscribers", event.target.value)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["Monthly new subs", compactNumber(result.newSubscribersPerMonth)],
          ["12-month forecast", compactNumber(result.annualForecast)],
          ["Growth band", result.growthBand]
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
            Subscribers per upload
          </p>
          <p className="mt-2 text-xl font-black tracking-normal text-slate-950">
            {compactNumber(result.subscribersPerUpload)}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            Time to target
          </p>
          <p className="mt-2 text-xl font-black tracking-normal text-slate-950">
            {formatMonths(result.monthsToTarget)}
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Current conversion rate: {formatPercent(result.subscriberConversionRate)}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
          Growth guidance
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
        Subscriber forecasts are planning estimates. Actual growth depends on topic demand, traffic
        source, retention, returning viewers, publishing consistency, channel positioning, and
        whether viewers understand why they should subscribe.
      </p>
    </section>
  );
}
