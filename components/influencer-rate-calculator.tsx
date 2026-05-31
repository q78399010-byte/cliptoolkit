"use client";

import { useMemo, useState } from "react";

type Platform = "tiktok" | "instagram" | "youtube";
type Niche = "general" | "beauty" | "fitness" | "tech" | "finance" | "b2b";
type Deliverable = "short-video" | "reel" | "youtube-short" | "dedicated-youtube" | "bundle";
type UsageRights = "organic" | "paid-30" | "paid-90" | "buyout";
type Exclusivity = "none" | "category-30" | "category-90";

type CalculatorState = {
  platform: Platform;
  averageViews: string;
  followers: string;
  engagementRate: string;
  niche: Niche;
  deliverable: Deliverable;
  usage: UsageRights;
  exclusivity: Exclusivity;
};

const initialState: CalculatorState = {
  platform: "tiktok",
  averageViews: "50000",
  followers: "75000",
  engagementRate: "5",
  niche: "beauty",
  deliverable: "short-video",
  usage: "organic",
  exclusivity: "none"
};

const platformOptions: Record<Platform, { label: string; cpm: number }> = {
  tiktok: { label: "TikTok", cpm: 18 },
  instagram: { label: "Instagram", cpm: 22 },
  youtube: { label: "YouTube", cpm: 35 }
};

const nicheOptions: Record<Niche, { label: string; multiplier: number }> = {
  general: { label: "General lifestyle", multiplier: 1 },
  beauty: { label: "Beauty / fashion", multiplier: 1.15 },
  fitness: { label: "Fitness / wellness", multiplier: 1.15 },
  tech: { label: "Tech / apps", multiplier: 1.3 },
  finance: { label: "Finance / business", multiplier: 1.45 },
  b2b: { label: "B2B / SaaS", multiplier: 1.5 }
};

const deliverableOptions: Record<Deliverable, { label: string; multiplier: number }> = {
  "short-video": { label: "Short-form video", multiplier: 1 },
  reel: { label: "Instagram Reel", multiplier: 1.1 },
  "youtube-short": { label: "YouTube Short", multiplier: 1.2 },
  "dedicated-youtube": { label: "Dedicated YouTube video", multiplier: 2.4 },
  bundle: { label: "Multi-post bundle", multiplier: 2 }
};

const usageOptions: Record<UsageRights, { label: string; multiplier: number }> = {
  organic: { label: "Organic posting only", multiplier: 1 },
  "paid-30": { label: "30 days paid usage", multiplier: 1.25 },
  "paid-90": { label: "90 days paid usage", multiplier: 1.5 },
  buyout: { label: "Broad buyout", multiplier: 2 }
};

const exclusivityOptions: Record<Exclusivity, { label: string; multiplier: number }> = {
  none: { label: "No exclusivity", multiplier: 1 },
  "category-30": { label: "30 days category exclusivity", multiplier: 1.15 },
  "category-90": { label: "90 days category exclusivity", multiplier: 1.3 }
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

function preciseCurrency(value: number) {
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

function roundToStep(value: number, step: number) {
  return Math.round(value / step) * step;
}

function roundMoney(value: number) {
  if (value < 500) {
    return roundToStep(value, 25);
  }

  if (value < 1500) {
    return roundToStep(value, 50);
  }

  return roundToStep(value, 100);
}

function engagementMultiplier(engagementRate: number) {
  return Math.min(1.45, Math.max(0.75, 1 + (engagementRate - 3) * 0.06));
}

function guidanceForRate(state: CalculatorState, recommended: number, costPerEngagement: number) {
  const guidance: string[] = [];

  if (numberFromInput(state.averageViews) < 10000) {
    guidance.push(
      "Average views are still early-stage. Anchor the quote around creative quality, niche fit, and usage rights instead of follower count alone."
    );
  }

  if (state.usage !== "organic") {
    guidance.push(
      "Paid usage creates extra value for the brand. Keep the usage window, platforms, edits, and whitelisting terms clear in the quote."
    );
  }

  if (state.exclusivity !== "none") {
    guidance.push(
      "Exclusivity blocks other category deals. Price it separately so a short campaign does not quietly limit future revenue."
    );
  }

  if (costPerEngagement > 1.5) {
    guidance.push(
      "Cost per engagement is high. Make sure the campaign has strong niche fit, a valuable offer, or usage rights that justify the premium."
    );
  }

  if (!guidance.length) {
    guidance.push(
      "The rate is a practical starting point. Adjust for production complexity, audience country, deadlines, approval rounds, and brand fit."
    );
  }

  if (recommended < 150) {
    guidance.push(
      "Avoid quoting below a professional floor when the brand expects scripting, filming, editing, reporting, or revisions."
    );
  }

  return guidance;
}

export function InfluencerRateCalculator() {
  const [state, setState] = useState(initialState);

  const result = useMemo(() => {
    const averageViews = numberFromInput(state.averageViews);
    const followers = numberFromInput(state.followers);
    const engagementRate = numberFromInput(state.engagementRate);
    const estimatedEngagements = averageViews * (engagementRate / 100);
    const mediaValue = (averageViews / 1000) * platformOptions[state.platform].cpm;
    const followerFloor = Math.max(150, followers * 0.004);
    const baseValue = Math.max(mediaValue, followerFloor);
    const recommended = roundMoney(
      baseValue *
        nicheOptions[state.niche].multiplier *
        deliverableOptions[state.deliverable].multiplier *
        usageOptions[state.usage].multiplier *
        exclusivityOptions[state.exclusivity].multiplier *
        engagementMultiplier(engagementRate)
    );
    const low = roundMoney(recommended * 0.75);
    const premium = roundMoney(recommended * 1.45);
    const costPerEngagement = estimatedEngagements > 0 ? recommended / estimatedEngagements : 0;

    return {
      averageViews,
      followers,
      engagementRate,
      estimatedEngagements,
      mediaValue,
      recommended,
      low,
      premium,
      costPerEngagement,
      guidance: guidanceForRate(state, recommended, costPerEngagement)
    };
  }, [state]);

  function updateField<K extends keyof CalculatorState>(field: K, value: CalculatorState[K]) {
    setState((current) => ({
      ...current,
      [field]: value
    }));
  }

  return (
    <section
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      aria-labelledby="influencer-rate-calculator-title"
    >
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
            Live rate estimate
          </p>
          <h2
            id="influencer-rate-calculator-title"
            className="mt-2 text-2xl font-bold tracking-normal"
          >
            Influencer pricing snapshot
          </h2>
        </div>
        <div className="rounded-md bg-slate-950 px-3 py-2 text-right text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-300">
            Suggested rate
          </p>
          <p className="mt-1 text-lg font-black">{currency(result.recommended)}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Platform</span>
          <select
            value={state.platform}
            onChange={(event) => updateField("platform", event.target.value as Platform)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          >
            {Object.entries(platformOptions).map(([value, option]) => (
              <option key={value} value={value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Average views</span>
          <input
            inputMode="numeric"
            value={state.averageViews}
            onChange={(event) => updateField("averageViews", event.target.value)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Followers</span>
          <input
            inputMode="numeric"
            value={state.followers}
            onChange={(event) => updateField("followers", event.target.value)}
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
          <span className="text-sm font-bold text-slate-700">Niche</span>
          <select
            value={state.niche}
            onChange={(event) => updateField("niche", event.target.value as Niche)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          >
            {Object.entries(nicheOptions).map(([value, option]) => (
              <option key={value} value={value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Deliverable</span>
          <select
            value={state.deliverable}
            onChange={(event) => updateField("deliverable", event.target.value as Deliverable)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          >
            {Object.entries(deliverableOptions).map(([value, option]) => (
              <option key={value} value={value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Usage rights</span>
          <select
            value={state.usage}
            onChange={(event) => updateField("usage", event.target.value as UsageRights)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          >
            {Object.entries(usageOptions).map(([value, option]) => (
              <option key={value} value={value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Exclusivity</span>
          <select
            value={state.exclusivity}
            onChange={(event) => updateField("exclusivity", event.target.value as Exclusivity)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          >
            {Object.entries(exclusivityOptions).map(([value, option]) => (
              <option key={value} value={value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["Low", result.low],
          ["Recommended", result.recommended],
          ["Premium", result.premium]
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
            Estimated engagements
          </p>
          <p className="mt-2 text-xl font-black tracking-normal text-slate-950">
            {formatNumber(result.estimatedEngagements)}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            Cost per engagement
          </p>
          <p className="mt-2 text-xl font-black tracking-normal text-slate-950">
            {preciseCurrency(result.costPerEngagement)}
          </p>
        </div>
      </div>

      <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs leading-5 text-slate-500">
        Planning base: {platformOptions[state.platform].label} CPM,{" "}
        {nicheOptions[state.niche].label.toLowerCase()} niche,{" "}
        {deliverableOptions[state.deliverable].label.toLowerCase()}, and{" "}
        {usageOptions[state.usage].label.toLowerCase()}.
      </p>

      <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
          Rate guidance
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
        Influencer pricing is a planning estimate. Final quotes should account for creative effort,
        category fit, audience geography, usage terms, exclusivity, deadlines, and reporting.
      </p>
    </section>
  );
}
