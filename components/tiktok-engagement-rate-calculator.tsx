"use client";

import { useMemo, useState } from "react";

type CalculatorState = {
  views: string;
  followers: string;
  likes: string;
  comments: string;
  shares: string;
  saves: string;
};

const initialState: CalculatorState = {
  views: "50000",
  followers: "12000",
  likes: "3200",
  comments: "180",
  shares: "240",
  saves: "420"
};

function numberFromInput(value: string) {
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
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

function scoreLabel(rateByViews: number) {
  if (rateByViews >= 8) {
    return "Excellent";
  }

  if (rateByViews >= 4) {
    return "Strong";
  }

  if (rateByViews >= 2) {
    return "Healthy";
  }

  return "Needs work";
}

function guidanceForRate(rateByViews: number, shareSaveRate: number, commentRate: number) {
  const guidance: string[] = [];

  if (rateByViews < 2) {
    guidance.push(
      "Engagement is light for the view volume. Test stronger opening hooks, clearer payoffs, and more specific calls to comment or save."
    );
  }

  if (shareSaveRate < 0.5) {
    guidance.push(
      "Shares and saves are low compared with views. Add more useful, repeatable, or reference-worthy moments that viewers want to keep."
    );
  }

  if (commentRate < 0.2) {
    guidance.push(
      "Comment activity is low. Use prompts that invite a specific answer instead of broad questions."
    );
  }

  if (!guidance.length) {
    guidance.push(
      "Engagement signals look solid. Keep tracking by content format so you can pitch brands with repeatable proof, not one viral post."
    );
  }

  return guidance;
}

export function TikTokEngagementRateCalculator() {
  const [state, setState] = useState(initialState);

  const result = useMemo(() => {
    const views = numberFromInput(state.views);
    const followers = numberFromInput(state.followers);
    const likes = numberFromInput(state.likes);
    const comments = numberFromInput(state.comments);
    const shares = numberFromInput(state.shares);
    const saves = numberFromInput(state.saves);
    const totalEngagements = likes + comments + shares + saves;
    const rateByViews = views > 0 ? (totalEngagements / views) * 100 : 0;
    const rateByFollowers = followers > 0 ? (totalEngagements / followers) * 100 : 0;
    const shareSaveRate = views > 0 ? ((shares + saves) / views) * 100 : 0;
    const commentRate = views > 0 ? (comments / views) * 100 : 0;

    return {
      views,
      followers,
      totalEngagements,
      rateByViews,
      rateByFollowers,
      shareSaveRate,
      commentRate,
      score: scoreLabel(rateByViews),
      guidance: guidanceForRate(rateByViews, shareSaveRate, commentRate)
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
      aria-labelledby="engagement-calculator-title"
    >
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
            Live engagement estimate
          </p>
          <h2 id="engagement-calculator-title" className="mt-2 text-2xl font-bold tracking-normal">
            TikTok engagement snapshot
          </h2>
        </div>
        <div className="rounded-md bg-slate-950 px-3 py-2 text-right text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-300">
            Engagement rate by views
          </p>
          <p className="mt-1 text-lg font-black">{formatPercent(result.rateByViews)}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {[
          ["views", "Video views", "numeric"],
          ["followers", "Followers", "numeric"],
          ["likes", "Likes", "numeric"],
          ["comments", "Comments", "numeric"],
          ["shares", "Shares", "numeric"],
          ["saves", "Saves", "numeric"]
        ].map(([field, label, inputMode]) => (
          <label key={field} className="grid gap-2">
            <span className="text-sm font-bold text-slate-700">{label}</span>
            <input
              inputMode={inputMode as "numeric"}
              value={state[field as keyof CalculatorState]}
              onChange={(event) => updateField(field as keyof CalculatorState, event.target.value)}
              className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            />
          </label>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["By views", formatPercent(result.rateByViews)],
          ["By followers", formatPercent(result.rateByFollowers)],
          ["Engagements", formatNumber(result.totalEngagements)]
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
            Share + save rate
          </p>
          <p className="mt-2 text-xl font-black tracking-normal text-slate-950">
            {formatPercent(result.shareSaveRate)}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            Quality score
          </p>
          <p className="mt-2 text-xl font-black tracking-normal text-slate-950">{result.score}</p>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
          Engagement guidance
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
        Engagement rate is a planning signal, not a guarantee of reach or campaign performance.
        Compare posts within the same niche, format, audience size, and time window.
      </p>
    </section>
  );
}
