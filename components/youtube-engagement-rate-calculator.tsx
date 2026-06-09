"use client";

import { useMemo, useState } from "react";

type CalculatorState = {
  views: string;
  subscribers: string;
  likes: string;
  comments: string;
  shares: string;
};

const initialState: CalculatorState = {
  views: "75000",
  subscribers: "18000",
  likes: "4200",
  comments: "310",
  shares: "180"
};

const fields: Array<{ field: keyof CalculatorState; label: string }> = [
  { field: "views", label: "Video views" },
  { field: "subscribers", label: "Subscribers" },
  { field: "likes", label: "Likes" },
  { field: "comments", label: "Comments" },
  { field: "shares", label: "Shares" }
];

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

function guidanceForRate(rateByViews: number, commentRate: number, shareRate: number) {
  const guidance: string[] = [];

  if (rateByViews < 2) {
    guidance.push(
      "Engagement is light for the view volume. Improve the title promise, first 30 seconds, pacing, and calls to respond."
    );
  }

  if (commentRate < 0.15) {
    guidance.push(
      "Comment rate is low. Ask a specific question tied to the video outcome instead of using a broad generic prompt."
    );
  }

  if (shareRate < 0.15) {
    guidance.push(
      "Shares are limited. Add clearer takeaways, stronger opinions, useful examples, or moments viewers would send to someone else."
    );
  }

  if (!guidance.length) {
    guidance.push(
      "Engagement signals look solid. Track results by topic and format so sponsorship pitches use repeatable proof instead of one outlier video."
    );
  }

  return guidance;
}

export function YouTubeEngagementRateCalculator() {
  const [state, setState] = useState(initialState);

  const result = useMemo(() => {
    const views = numberFromInput(state.views);
    const subscribers = numberFromInput(state.subscribers);
    const likes = numberFromInput(state.likes);
    const comments = numberFromInput(state.comments);
    const shares = numberFromInput(state.shares);
    const totalEngagements = likes + comments + shares;
    const rateByViews = views > 0 ? (totalEngagements / views) * 100 : 0;
    const rateBySubscribers = subscribers > 0 ? (totalEngagements / subscribers) * 100 : 0;
    const commentRate = views > 0 ? (comments / views) * 100 : 0;
    const shareRate = views > 0 ? (shares / views) * 100 : 0;

    return {
      totalEngagements,
      rateByViews,
      rateBySubscribers,
      commentRate,
      shareRate,
      score: scoreLabel(rateByViews),
      guidance: guidanceForRate(rateByViews, commentRate, shareRate)
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
      aria-labelledby="youtube-engagement-calculator-title"
    >
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
            Live engagement estimate
          </p>
          <h2
            id="youtube-engagement-calculator-title"
            className="mt-2 text-2xl font-bold tracking-normal"
          >
            YouTube engagement snapshot
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
        {fields.map((item) => (
          <label key={item.field} className="grid gap-2">
            <span className="text-sm font-bold text-slate-700">{item.label}</span>
            <input
              inputMode="numeric"
              value={state[item.field]}
              onChange={(event) => updateField(item.field, event.target.value)}
              className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            />
          </label>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["By views", formatPercent(result.rateByViews)],
          ["By subscribers", formatPercent(result.rateBySubscribers)],
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
            Comment rate
          </p>
          <p className="mt-2 text-xl font-black tracking-normal text-slate-950">
            {formatPercent(result.commentRate)}
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
        Engagement rate is a planning signal. Compare videos with similar topics, lengths, traffic
        sources, audience size, and publish age before making sponsorship or content decisions.
      </p>
    </section>
  );
}
