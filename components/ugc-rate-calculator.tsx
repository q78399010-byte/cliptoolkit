"use client";

import { useMemo, useState } from "react";

type ExperienceLevel = "beginner" | "intermediate" | "advanced";
type UsageRights = "organic" | "paid" | "buyout";
type TurnaroundSpeed = "standard" | "fast" | "urgent";
type PackageType = "one-time" | "retainer";

type CalculatorState = {
  deliverables: string;
  experience: ExperienceLevel;
  usage: UsageRights;
  revisions: string;
  turnaround: TurnaroundSpeed;
  packageType: PackageType;
};

const initialState: CalculatorState = {
  deliverables: "3",
  experience: "intermediate",
  usage: "paid",
  revisions: "1",
  turnaround: "standard",
  packageType: "one-time"
};

const baseRates: Record<ExperienceLevel, { low: number; medium: number; high: number }> = {
  beginner: { low: 50, medium: 100, high: 150 },
  intermediate: { low: 150, medium: 275, high: 400 },
  advanced: { low: 400, medium: 700, high: 1000 }
};

const usageMultipliers: Record<UsageRights, number> = {
  organic: 1,
  paid: 1.35,
  buyout: 1.7
};

const turnaroundMultipliers: Record<TurnaroundSpeed, number> = {
  standard: 1,
  fast: 1.2,
  urgent: 1.4
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

function roundToNearestTwentyFive(value: number) {
  return Math.round(value / 25) * 25;
}

function guidanceForExperience(experience: ExperienceLevel) {
  if (experience === "beginner") {
    return "Do not underprice yourself. Keep the first packages simple, build a portfolio, collect testimonials, and charge extra when the brand wants paid usage rights.";
  }

  if (experience === "intermediate") {
    return "Start increasing rates for paid usage and monthly retainers. Brands are paying for reliability, concept quality, hooks, editing, and lower revision risk.";
  }

  return "Prioritize retainers and paid ads licensing. At this level, usage rights, exclusivity, reporting, and campaign value should drive pricing as much as deliverable count.";
}

export function UgcRateCalculator() {
  const [state, setState] = useState(initialState);

  const result = useMemo(() => {
    const deliverables = Math.max(1, numberFromInput(state.deliverables));
    const revisions = Math.max(0, numberFromInput(state.revisions));
    const base = baseRates[state.experience];
    const usageMultiplier = usageMultipliers[state.usage];
    const revisionMultiplier = 1 + Math.max(0, revisions - 1) * 0.08;
    const turnaroundMultiplier = turnaroundMultipliers[state.turnaround];
    const packageMultiplier = state.packageType === "retainer" ? 0.9 : 1;

    function estimate(rate: number) {
      return (
        rate *
        deliverables *
        usageMultiplier *
        revisionMultiplier *
        turnaroundMultiplier *
        packageMultiplier
      );
    }

    const low = estimate(base.low);
    const medium = estimate(base.medium);
    const high = estimate(base.high);
    const pitch = roundToNearestTwentyFive(state.packageType === "retainer" ? medium * 1.08 : medium);

    return {
      low,
      medium,
      high,
      pitch,
      deliverables,
      revisions,
      guidance: guidanceForExperience(state.experience)
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
      aria-labelledby="ugc-calculator-title"
    >
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
            Live pricing estimate
          </p>
          <h2 id="ugc-calculator-title" className="mt-2 text-2xl font-bold tracking-normal">
            UGC pricing snapshot
          </h2>
        </div>
        <div className="rounded-md bg-slate-950 px-3 py-2 text-right text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-300">
            Suggested brand pitch price
          </p>
          <p className="mt-1 text-lg font-black">{currency(result.pitch)}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Number of deliverables</span>
          <input
            inputMode="numeric"
            value={state.deliverables}
            onChange={(event) => updateField("deliverables", event.target.value)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Creator experience level</span>
          <select
            value={state.experience}
            onChange={(event) => updateField("experience", event.target.value as ExperienceLevel)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Usage rights</span>
          <select
            value={state.usage}
            onChange={(event) => updateField("usage", event.target.value as UsageRights)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          >
            <option value="organic">Organic only</option>
            <option value="paid">Paid ads usage</option>
            <option value="buyout">Full buyout</option>
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Number of revisions</span>
          <input
            inputMode="numeric"
            value={state.revisions}
            onChange={(event) => updateField("revisions", event.target.value)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Turnaround speed</span>
          <select
            value={state.turnaround}
            onChange={(event) => updateField("turnaround", event.target.value as TurnaroundSpeed)}
            className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          >
            <option value="standard">Standard</option>
            <option value="fast">Fast (48h)</option>
            <option value="urgent">Urgent (24h)</option>
          </select>
        </label>

        <fieldset className="grid gap-2">
          <legend className="text-sm font-bold text-slate-700">Monthly package</legend>
          <div className="grid grid-cols-2 gap-2 rounded-lg border border-slate-200 bg-slate-50 p-1">
            {[
              ["one-time", "One-time collaboration"],
              ["retainer", "Monthly retainer"]
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => updateField("packageType", value as PackageType)}
                className={
                  state.packageType === value
                    ? "min-h-11 rounded-md bg-slate-950 px-3 text-sm font-bold text-white"
                    : "min-h-11 rounded-md px-3 text-sm font-bold text-slate-600 transition hover:bg-white"
                }
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["LOW", result.low],
          ["MEDIUM", result.medium],
          ["HIGH", result.high]
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

      <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
          Creator guidance
        </p>
        <p className="mt-3 leading-7 text-slate-700">{result.guidance}</p>
      </div>

      <p className="mt-5 text-xs leading-5 text-slate-500">
        This calculator is a pricing planning tool, not a guarantee. Adjust for production quality,
        niche expertise, brand complexity, usage length, exclusivity, and whether the brand wants
        raw footage or paid ad variations.
      </p>
    </section>
  );
}
