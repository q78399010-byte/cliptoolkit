"use client";

import { useMemo, useState } from "react";

type Niche =
  | "general"
  | "gaming"
  | "beauty"
  | "tech"
  | "finance"
  | "education"
  | "business";
type ContentMix = "long-form" | "balanced" | "shorts";

type CalculatorState = {
  monthlyViews: string;
  rpm: string;
  niche: Niche;
  contentMix: ContentMix;
  uploadsPerMonth: string;
};

const nicheOptions: Array<{ value: Niche; label: string; rpm: number }> = [
  { value: "general", label: "General", rpm: 3.5 },
  { value: "gaming", label: "Gaming", rpm: 2.5 },
  { value: "beauty", label: "Beauty & Lifestyle", rpm: 4 },
  { value: "tech", label: "Tech", rpm: 7 },
  { value: "finance", label: "Finance", rpm: 12 },
  { value: "education", label: "Education", rpm: 5 },
  { value: "business", label: "Business / SaaS", rpm: 10 }
];

const contentMixOptions: Array<{ value: ContentMix; label: string; modifier: number }> = [
  { value: "long-form", label: "Mostly long-form", modifier: 1 },
  { value: "balanced", label: "Balanced", modifier: 0.75 },
  { value: "shorts", label: "Mostly Shorts", modifier: 0.35 }
];

const initialState: CalculatorState = {
  monthlyViews: "100000",
  rpm: "3.5",
  niche: "general",
  contentMix: "long-form",
  uploadsPerMonth: "8"
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

function roundToStep(value: number, step: number) {
  return Math.round(value / step) * step;
}

function roundMoney(value: number) {
  if (value < 100) {
    return roundToStep(value, 5);
  }

  if (value < 300) {
    return roundToStep(value, 10);
  }

  if (value < 600) {
    return roundToStep(value, 25);
  }

  if (value < 1000) {
    return roundToStep(value, 50);
  }

  return roundToStep(value, 100);
}

function labelForNiche(niche: Niche) {
  return nicheOptions.find((option) => option.value === niche)?.label ?? "General";
}

function labelForContentMix(contentMix: ContentMix) {
  return contentMixOptions.find((option) => option.value === contentMix)?.label ?? "Mostly long-form";
}

function modifierForContentMix(contentMix: ContentMix) {
  return contentMixOptions.find((option) => option.value === contentMix)?.modifier ?? 1;
}

function growthSuggestions(rpm: number, contentMix: ContentMix, uploadsPerMonth: number, niche: Niche) {
  const suggestions: string[] = [];

  if (rpm < 3) {
    suggestions.push(
      "RPM is below a strong planning range. Improve niche quality, audience country mix, retention, and advertiser-friendly topics before relying on ad revenue alone."
    );
  }

  if (contentMix === "shorts") {
    suggestions.push(
      "Shorts may generate lower RPM than long-form videos, but they can still help discovery and feed viewers into higher-value videos, email lists, or offers."
    );
  }

  if (uploadsPerMonth < 4) {
    suggestions.push(
      "Upload frequency is light. A more consistent schedule gives YouTube more signals and gives you cleaner data about which formats deserve more effort."
    );
  }

  if (niche === "finance" || niche === "business") {
    suggestions.push(
      "This niche can monetize well beyond ads. Build email capture, affiliate offers, and sponsorship packages so high-intent viewers have a next step."
    );
  }

  if (!suggestions.length) {
    suggestions.push(
      "Keep improving retention, topic focus, and repeatable packaging. Small RPM and watch-time gains compound quickly once monthly views are consistent."
    );
  }

  return suggestions;
}

export function YouTubeRevenueCalculator() {
  const [state, setState] = useState(initialState);

  const result = useMemo(() => {
    const monthlyViews = numberFromInput(state.monthlyViews);
    const rpm = numberFromInput(state.rpm);
    const uploadsPerMonth = Math.max(1, numberFromInput(state.uploadsPerMonth));
    const baseRevenue = (monthlyViews / 1000) * rpm;
    const mixModifier = modifierForContentMix(state.contentMix);
    const recommended = baseRevenue * mixModifier;

    return {
      monthlyViews,
      rpm,
      uploadsPerMonth,
      low: roundMoney(recommended * 0.7),
      recommended: roundMoney(recommended),
      premium: roundMoney(recommended * 1.4),
      revenuePerVideo: roundMoney(recommended / uploadsPerMonth),
      viewsPerVideo: monthlyViews / uploadsPerMonth,
      suggestions: growthSuggestions(rpm, state.contentMix, uploadsPerMonth, state.niche)
    };
  }, [state]);

  function updateField<K extends keyof CalculatorState>(field: K, value: CalculatorState[K]) {
    setState((current) => ({
      ...current,
      [field]: value
    }));
  }

  function updateNiche(value: Niche) {
    const preset = nicheOptions.find((option) => option.value === value)?.rpm ?? 3.5;

    setState((current) => ({
      ...current,
      niche: value,
      rpm: String(preset)
    }));
  }

  return (
    <section
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      aria-labelledby="youtube-calculator-title"
    >
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
            Live estimate
          </p>
          <h2 id="youtube-calculator-title" className="mt-2 text-2xl font-bold tracking-normal">
            YouTube revenue snapshot
          </h2>
        </div>
        <div className="rounded-md bg-slate-950 px-3 py-2 text-right text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-300">
            Estimated monthly revenue
          </p>
          <p className="mt-1 text-lg font-black">{currency(result.recommended)}</p>
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
          <span className="text-sm font-bold text-slate-700">Niche</span>
          <select
            value={state.niche}
            onChange={(event) => updateNiche(event.target.value as Niche)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          >
            {nicheOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Content mix</span>
          <select
            value={state.contentMix}
            onChange={(event) => updateField("contentMix", event.target.value as ContentMix)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          >
            {contentMixOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 sm:col-span-2">
          <span className="text-sm font-bold text-slate-700">Uploads per month</span>
          <input
            inputMode="numeric"
            value={state.uploadsPerMonth}
            onChange={(event) => updateField("uploadsPerMonth", event.target.value)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
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
            Revenue per video
          </p>
          <p className="mt-2 text-xl font-black tracking-normal text-slate-950">
            {currency(result.revenuePerVideo)}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            Planning inputs
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
            {labelForNiche(state.niche)} niche, {labelForContentMix(state.contentMix).toLowerCase()},
            {" "}
            {formatNumber(result.viewsPerVideo)} views per upload.
          </p>
        </div>
      </div>

      <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs leading-5 text-slate-500">
        YouTube RPM varies widely by niche, country, audience quality, watch time, and ad demand.
        Many creators use a range instead of one fixed number when planning income.
      </p>

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
        Estimates are planning ranges, not guaranteed payouts. Actual revenue depends on YouTube
        monetization eligibility, viewer geography, ad demand, watch time, Shorts performance,
        sponsorships, memberships, affiliates, and product sales.
      </p>
    </section>
  );
}
