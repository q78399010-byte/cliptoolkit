"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { trackGaEvent } from "@/components/google-analytics";
import type { RoiMarket } from "@/lib/tiktok-shop-roi";

type CostModel = "cpm" | "cpc";
type ScenarioKey = "A" | "B";
type TemplateField = "costModel" | "adRate" | "conversionRate" | "returnRate" | "commissionRate";

type ScenarioState = {
  productPrice: string;
  traffic: string;
  conversionRate: string;
  adSpend: string;
  costModel: CostModel;
  adRate: string;
  commissionRate: string;
  shippingCost: string;
  returnRate: string;
  miscCosts: string;
};

type Metrics = {
  orders: number;
  netOrders: number;
  totalRevenue: number;
  totalCost: number;
  netProfit: number;
  roi: number;
  roas: number | null;
  adSpendUsed: number;
  benchmarkAdCost: number;
  commissionCost: number;
  shippingCost: number;
};

type DiagnosisTone = "warning" | "neutral" | "positive" | "mid";

type Diagnosis = {
  tone: DiagnosisTone;
  title: string;
  message: string;
  suggestions: string[];
};

type IndustryTemplate = {
  name: string;
  cpc: string;
  conversionRate: string;
  returnRate: string;
  commissionRate: string;
};

const industryTemplates: IndustryTemplate[] = [
  {
    name: "Beauty / Cosmetics",
    cpc: "0.8",
    conversionRate: "2.5",
    returnRate: "12",
    commissionRate: "8"
  },
  {
    name: "Fashion / Apparel",
    cpc: "0.9",
    conversionRate: "2.0",
    returnRate: "18",
    commissionRate: "10"
  },
  {
    name: "Electronics",
    cpc: "1.5",
    conversionRate: "1.3",
    returnRate: "5",
    commissionRate: "6"
  },
  {
    name: "Home Goods",
    cpc: "1.0",
    conversionRate: "2.1",
    returnRate: "8",
    commissionRate: "8"
  }
];

const templateFields: TemplateField[] = [
  "costModel",
  "adRate",
  "conversionRate",
  "returnRate",
  "commissionRate"
];

const inputBaseClass =
  "min-h-12 rounded-md border px-4 text-base text-slate-950 outline-none transition-all duration-500 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100";

function fieldInputClass(isHighlighted: boolean) {
  return isHighlighted
    ? `${inputBaseClass} border-emerald-300 bg-emerald-50 ring-4 ring-emerald-100`
    : `${inputBaseClass} border-slate-200 bg-slate-50`;
}

const initialScenarios: Record<ScenarioKey, ScenarioState> = {
  A: {
    productPrice: "29",
    traffic: "100000",
    conversionRate: "2.5",
    adSpend: "1500",
    costModel: "cpm",
    adRate: "12",
    commissionRate: "6",
    shippingCost: "4.5",
    returnRate: "5",
    miscCosts: "300"
  },
  B: {
    productPrice: "29",
    traffic: "140000",
    conversionRate: "3",
    adSpend: "2200",
    costModel: "cpm",
    adRate: "11",
    commissionRate: "6",
    shippingCost: "4.5",
    returnRate: "4",
    miscCosts: "420"
  }
};

function numberFromInput(value: string) {
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function percent(value: number) {
  return `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1
  }).format(value)}%`;
}

function plainNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0
  }).format(Math.max(0, value));
}

function currencyFormatter(market: RoiMarket) {
  return new Intl.NumberFormat(market.locale, {
    style: "currency",
    currency: market.currencyCode,
    maximumFractionDigits: 0
  });
}

function decimalCurrencyFormatter(market: RoiMarket) {
  return new Intl.NumberFormat(market.locale, {
    style: "currency",
    currency: market.currencyCode,
    maximumFractionDigits: 2
  });
}

function calculateMetrics(
  scenario: ScenarioState,
  adjustment: { cvr?: number; adSpend?: number; returnRate?: number } = {}
): Metrics {
  const productPrice = numberFromInput(scenario.productPrice);
  const traffic = numberFromInput(scenario.traffic);
  const conversionRate = numberFromInput(scenario.conversionRate) * (adjustment.cvr ?? 1);
  const returnRate = numberFromInput(scenario.returnRate) * (adjustment.returnRate ?? 1);
  const adSpendInput = numberFromInput(scenario.adSpend) * (adjustment.adSpend ?? 1);
  const adRate = numberFromInput(scenario.adRate);
  const commissionRate = numberFromInput(scenario.commissionRate);
  const shippingCostPerUnit = numberFromInput(scenario.shippingCost);
  const miscCosts = numberFromInput(scenario.miscCosts);

  // Core TikTok Shop ROI model: traffic creates orders, returns reduce recognized revenue,
  // while ad spend, commission, shipping, and miscellaneous costs reduce profit.
  const orders = traffic * (conversionRate / 100);
  const returnedOrders = orders * (returnRate / 100);
  const netOrders = Math.max(0, orders - returnedOrders);
  const totalRevenue = netOrders * productPrice;
  const benchmarkAdCost =
    scenario.costModel === "cpm" ? (traffic / 1000) * adRate : traffic * adRate;
  const adSpendUsed = adSpendInput > 0 ? adSpendInput : benchmarkAdCost;
  const commissionCost = totalRevenue * (commissionRate / 100);
  const shippingCost = orders * shippingCostPerUnit;
  const totalCost = adSpendUsed + commissionCost + shippingCost + miscCosts;
  const netProfit = totalRevenue - totalCost;
  const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;
  const roas = adSpendUsed > 0 ? (totalRevenue / adSpendUsed) * 100 : null;

  return {
    orders,
    netOrders,
    totalRevenue,
    totalCost,
    netProfit,
    roi,
    roas,
    adSpendUsed,
    benchmarkAdCost,
    commissionCost,
    shippingCost
  };
}

function adviceFor(metrics: Metrics, scenario: ScenarioState) {
  const cvr = numberFromInput(scenario.conversionRate);
  const returnRate = numberFromInput(scenario.returnRate);
  const messages: string[] = [];

  if (metrics.roas !== null && metrics.roas < 200) {
    messages.push(
      "ROAS is under 200%. Tighten targeting, refresh creatives, and pause ad groups that spend without profitable orders."
    );
  }

  if (cvr < 2) {
    messages.push(
      "CVR is low. Improve product page proof, offer clarity, creator videos, shipping promise, and product-market fit before scaling budget."
    );
  }

  if (returnRate > 8) {
    messages.push(
      "Return rate is pressuring profit. Improve product descriptions, sizing guidance, quality control, and post-purchase expectations."
    );
  }

  if (metrics.netProfit > 0 && metrics.roi > 30) {
    messages.push(
      "The scenario is profitable. Test gradual budget increases while watching marginal ROAS, return rate, and fulfillment capacity."
    );
  }

  return messages.length
    ? messages
    : [
        "Keep testing one variable at a time: creative angle, offer, landing page proof, bid strategy, shipping economics, or product bundle size."
      ];
}

function diagnoseCampaign(roi: number): Diagnosis {
  if (roi < 0) {
    return {
      tone: "warning",
      title: "Campaign Losing Money",
      message: "Your campaign is currently unprofitable.",
      suggestions: [
        "Improve product margin",
        "Lower shipping costs",
        "Test higher CTR creatives",
        "Reduce ad spend waste"
      ]
    };
  }

  if (roi <= 15) {
    return {
      tone: "neutral",
      title: "Tight Margins",
      message: "Your campaign is profitable but margins are thin.",
      suggestions: [
        "Improve conversion rate",
        "Test stronger creatives",
        "Increase AOV (average order value)",
        "Optimize landing page"
      ]
    };
  }

  if (roi > 30) {
    return {
      tone: "positive",
      title: "🚀 Healthy Growth",
      message: "Your campaign performance looks strong.",
      suggestions: [
        "Gradually scale ad budget",
        "Expand winning creatives",
        "Increase inventory readiness",
        "Test new audiences"
      ]
    };
  }

  return {
    tone: "mid",
    title: "Scaling Window",
    message: "Your campaign has room to improve before aggressive scaling.",
    suggestions: [
      "Increase conversion rate",
      "Trim weak ad placements",
      "Test stronger hooks",
      "Review shipping and return friction"
    ]
  };
}

function diagnosisStyles(tone: DiagnosisTone) {
  if (tone === "warning") {
    return {
      border: "border-rose-200",
      background: "bg-rose-50",
      badge: "bg-rose-100 text-rose-700",
      title: "text-rose-900"
    };
  }

  if (tone === "positive") {
    return {
      border: "border-emerald-200",
      background: "bg-emerald-50",
      badge: "bg-emerald-100 text-emerald-700",
      title: "text-emerald-900"
    };
  }

  if (tone === "neutral") {
    return {
      border: "border-amber-200",
      background: "bg-amber-50",
      badge: "bg-amber-100 text-amber-700",
      title: "text-amber-900"
    };
  }

  return {
    border: "border-slate-200",
    background: "bg-slate-50",
    badge: "bg-slate-100 text-slate-700",
    title: "text-slate-900"
  };
}

function RevenueCostChart({
  metrics,
  money
}: {
  metrics: Metrics;
  money: Intl.NumberFormat;
}) {
  const maxValue = Math.max(metrics.totalRevenue, metrics.totalCost, 1);
  const revenueWidth = Math.max(4, (metrics.totalRevenue / maxValue) * 100);
  const costWidth = Math.max(4, (metrics.totalCost / maxValue) * 100);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
        Revenue vs cost
      </p>
      <div className="mt-4 grid gap-4">
        {[
          ["Revenue", metrics.totalRevenue, revenueWidth, "bg-emerald-500"],
          ["Cost", metrics.totalCost, costWidth, "bg-slate-950"]
        ].map(([label, value, width, color]) => (
          <div key={label as string}>
            <div className="flex items-center justify-between gap-3 text-sm font-bold text-slate-700">
              <span>{label as string}</span>
              <span>{money.format(value as number)}</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${color as string}`}
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TikTokShopRoiCalculator({ market }: { market: RoiMarket }) {
  const [scenarios, setScenarios] = useState(initialScenarios);
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>("A");
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [adviceMessage, setAdviceMessage] = useState("");
  const [activeTemplateByScenario, setActiveTemplateByScenario] = useState<Record<ScenarioKey, string>>({
    A: "",
    B: ""
  });
  const [highlightedTemplateFields, setHighlightedTemplateFields] = useState<TemplateField[]>([]);
  const highlightTimer = useRef<number | null>(null);

  const money = useMemo(() => currencyFormatter(market), [market]);
  const moneyWithDecimals = useMemo(() => decimalCurrencyFormatter(market), [market]);
  const activeInputs = scenarios[activeScenario];
  const activeMetrics = useMemo(() => calculateMetrics(activeInputs), [activeInputs]);
  const comparison = useMemo(
    () => ({
      A: calculateMetrics(scenarios.A),
      B: calculateMetrics(scenarios.B)
    }),
    [scenarios]
  );
  const simulations = useMemo(
    () => [
      {
        label: "Low",
        note: "Lower CVR, higher returns, and less efficient spend.",
        metrics: calculateMetrics(activeInputs, { cvr: 0.75, adSpend: 1.1, returnRate: 1.15 })
      },
      {
        label: "Medium",
        note: "Current campaign assumptions.",
        metrics: activeMetrics
      },
      {
        label: "High",
        note: "Better CVR, lower returns, and improved ad efficiency.",
        metrics: calculateMetrics(activeInputs, { cvr: 1.25, adSpend: 0.95, returnRate: 0.85 })
      }
    ],
    [activeInputs, activeMetrics]
  );
  const guidance = adviceFor(activeMetrics, activeInputs);
  const diagnosis = useMemo(() => diagnoseCampaign(activeMetrics.roi), [activeMetrics.roi]);
  const diagnosisStyle = diagnosisStyles(diagnosis.tone);
  const activeTemplateName = activeTemplateByScenario[activeScenario];

  useEffect(() => {
    return () => {
      if (highlightTimer.current) {
        window.clearTimeout(highlightTimer.current);
      }
    };
  }, []);

  function updateScenario<K extends keyof ScenarioState>(field: K, value: ScenarioState[K]) {
    setScenarios((current) => ({
      ...current,
      [activeScenario]: {
        ...current[activeScenario],
        [field]: value
      }
    }));
    setActiveTemplateByScenario((current) => ({
      ...current,
      [activeScenario]: ""
    }));
  }

  function handleLoadTemplate(template: IndustryTemplate) {
    trackGaEvent("industry_template_apply", {
      currency: market.currencyCode,
      industry_template: template.name,
      scenario: activeScenario
    });

    setScenarios((current) => ({
      ...current,
      [activeScenario]: {
        ...current[activeScenario],
        costModel: "cpc",
        adRate: template.cpc,
        conversionRate: template.conversionRate,
        returnRate: template.returnRate,
        commissionRate: template.commissionRate
      }
    }));
    setActiveTemplateByScenario((current) => ({
      ...current,
      [activeScenario]: template.name
    }));
    setStatusMessage(`${template.name} benchmark loaded into Scenario ${activeScenario}.`);
    setHighlightedTemplateFields(templateFields);

    if (highlightTimer.current) {
      window.clearTimeout(highlightTimer.current);
    }

    highlightTimer.current = window.setTimeout(() => {
      setHighlightedTemplateFields([]);
    }, 900);
  }

  function isTemplateFieldHighlighted(field: TemplateField) {
    return highlightedTemplateFields.includes(field);
  }

  function handleCompareToggle() {
    const nextEnabled = !compareEnabled;

    trackGaEvent("ab_toggle", {
      currency: market.currencyCode,
      enabled: nextEnabled,
      scenario: activeScenario
    });

    setCompareEnabled(nextEnabled);
  }

  function handleCalculate() {
    setStatusMessage("ROI updated from the current inputs. Results refresh automatically as you edit.");
  }

  function handleOptimizeAds() {
    const roasText = activeMetrics.roas === null ? "unavailable" : percent(activeMetrics.roas);
    setAdviceMessage(
      `Focus on the biggest constraint first. Current ROAS is ${roasText}, ROI is ${percent(
        activeMetrics.roi
      )}, and net profit is ${money.format(activeMetrics.netProfit)}.`
    );
  }

  function handlePersonalizedAdvice() {
    trackGaEvent("get_personalized_advice", {
      currency: market.currencyCode,
      has_email: email.includes("@"),
      scenario: activeScenario
    });

    if (!email.includes("@")) {
      setStatusMessage("Enter an email address first so the advice request can include your report.");
      return;
    }

    const subject = encodeURIComponent("TikTok Shop ROI advice request");
    const body = encodeURIComponent(
      `Email: ${email}\nScenario: ${activeScenario}\nRevenue: ${money.format(
        activeMetrics.totalRevenue
      )}\nCost: ${money.format(activeMetrics.totalCost)}\nProfit: ${money.format(
        activeMetrics.netProfit
      )}\nROI: ${percent(activeMetrics.roi)}\nROAS: ${
        activeMetrics.roas === null ? "N/A" : percent(activeMetrics.roas)
      }`
    );

    window.location.href = `mailto:hello@cliptoolkit.com?subject=${subject}&body=${body}`;
  }

  function handleExportPdf() {
    trackGaEvent("export_pdf", {
      currency: market.currencyCode,
      has_email: email.includes("@"),
      scenario: activeScenario
    });

    if (!email.includes("@")) {
      setStatusMessage("Enter an email address to unlock the PDF export.");
      return;
    }

    // Browser print keeps PDF export dependency-free. Users can choose "Save as PDF"
    // in the print dialog, while the generated report contains the current scenario.
    const printWindow = window.open("", "_blank", "width=860,height=960");

    if (!printWindow) {
      setStatusMessage("Allow pop-ups for this page to export the PDF report.");
      return;
    }

    const roas = activeMetrics.roas === null ? "N/A" : percent(activeMetrics.roas);
    const reportRows = [
      ["Total Revenue", money.format(activeMetrics.totalRevenue)],
      ["Total Cost", money.format(activeMetrics.totalCost)],
      ["Net Profit", money.format(activeMetrics.netProfit)],
      ["ROI", percent(activeMetrics.roi)],
      ["ROAS", roas],
      ["Orders", plainNumber(activeMetrics.orders)],
      ["Net Orders After Returns", plainNumber(activeMetrics.netOrders)]
    ];

    printWindow.document.write(`
      <html>
        <head>
          <title>TikTok Shop ROI Report</title>
          <style>
            body { font-family: Arial, sans-serif; color: #0f172a; padding: 32px; }
            h1 { margin: 0 0 8px; font-size: 28px; }
            p { color: #475569; line-height: 1.6; }
            table { width: 100%; border-collapse: collapse; margin-top: 24px; }
            th, td { border-bottom: 1px solid #d7dde8; padding: 12px; text-align: left; }
            th { background: #f8fafc; font-size: 12px; text-transform: uppercase; letter-spacing: .08em; }
            .profit { color: ${activeMetrics.netProfit >= 0 ? "#047857" : "#b91c1c"}; font-weight: 800; }
            .note { margin-top: 24px; padding: 14px; background: #f8fafc; border: 1px solid #d7dde8; }
          </style>
        </head>
        <body>
          <h1>TikTok Shop ROI Report</h1>
          <p>Prepared for ${email} using ${market.currencyCode} assumptions. Scenario ${activeScenario}.</p>
          <table>
            <thead><tr><th>Metric</th><th>Value</th></tr></thead>
            <tbody>
              ${reportRows
                .map(
                  ([label, value]) =>
                    `<tr><td>${label}</td><td class="${label === "Net Profit" ? "profit" : ""}">${value}</td></tr>`
                )
                .join("")}
            </tbody>
          </table>
          <div class="note">
            Based on current TikTok platform commission assumptions as of May 2026. Actual may vary.
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    window.setTimeout(() => printWindow.print(), 250);
    setStatusMessage("PDF report opened. Choose Save as PDF in the print dialog.");
  }

  return (
    <section
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.08)] sm:p-6 xl:p-7"
      aria-labelledby="roi-calculator-title"
    >
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
            Live ROI estimate
          </p>
          <h2 id="roi-calculator-title" className="mt-2 text-2xl font-bold tracking-normal">
            TikTok Shop profit snapshot
          </h2>
        </div>
        <div className="rounded-md bg-slate-950 px-3 py-2 text-right text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-300">
            Net profit
          </p>
          <p className="mt-1 text-lg font-black">{money.format(activeMetrics.netProfit)}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid grid-cols-2 gap-2 rounded-lg border border-slate-200 bg-slate-50 p-1">
          {(["A", "B"] as ScenarioKey[]).map((scenario) => (
            <button
              key={scenario}
              type="button"
              onClick={() => setActiveScenario(scenario)}
              className={
                activeScenario === scenario
                  ? "min-h-10 rounded-md bg-slate-950 px-4 text-sm font-bold text-white"
                  : "min-h-10 rounded-md px-4 text-sm font-bold text-slate-600 transition hover:bg-white"
              }
            >
              Scenario {scenario}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleCompareToggle}
          className={
            compareEnabled
              ? "min-h-10 rounded-md bg-emerald-600 px-4 text-sm font-bold text-white"
              : "min-h-10 rounded-md border border-slate-200 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          }
        >
          A/B comparison {compareEnabled ? "On" : "Off"}
        </button>
      </div>

      <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
              Load Industry Template
            </p>
            <h3 className="mt-1 text-lg font-bold tracking-normal text-slate-950">
              Benchmark assumptions
            </h3>
          </div>
          <p className="text-sm leading-6 text-slate-500">
            Preloaded benchmark assumptions for your category
          </p>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {industryTemplates.map((template) => {
            const isActive = activeTemplateName === template.name;

            return (
              <button
                key={template.name}
                type="button"
                onClick={() => handleLoadTemplate(template)}
                className={
                  isActive
                    ? "min-h-[152px] rounded-lg border border-emerald-300 bg-white p-4 text-left shadow-sm ring-4 ring-emerald-100 transition-all duration-300"
                    : "min-h-[152px] rounded-lg border border-slate-200 bg-white p-4 text-left transition-all duration-300 hover:border-emerald-200 hover:shadow-sm"
                }
                aria-pressed={isActive}
              >
                <span className="block text-sm font-black text-slate-950">{template.name}</span>
                <span className="mt-3 grid grid-cols-2 gap-2 text-xs font-semibold leading-5 text-slate-600">
                  <span>CPC: {moneyWithDecimals.format(Number(template.cpc))}</span>
                  <span>CVR: {template.conversionRate}%</span>
                  <span>Returns: {template.returnRate}%</span>
                  <span>Fee: {template.commissionRate}%</span>
                </span>
                <span
                  className={
                    isActive
                      ? "mt-4 inline-flex rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700"
                      : "mt-4 inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500"
                  }
                >
                  {isActive ? "Loaded" : "Apply"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.78fr)] xl:items-start">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-1 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Campaign assumptions
              </p>
              <h3 className="mt-1 text-lg font-bold tracking-normal text-slate-950">
                Input model
              </h3>
            </div>
            <p className="text-sm leading-6 text-slate-500">Scenario {activeScenario}</p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-700">Product price per unit</span>
              <input
                inputMode="decimal"
                value={activeInputs.productPrice}
                onChange={(event) => updateScenario("productPrice", event.target.value)}
                className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-700">Conversion Rate (CVR %)</span>
              <input
                inputMode="decimal"
                value={activeInputs.conversionRate}
                onChange={(event) => updateScenario("conversionRate", event.target.value)}
                className={fieldInputClass(isTemplateFieldHighlighted("conversionRate"))}
              />
            </label>

            <label className="grid gap-2 sm:col-span-2">
              <span className="flex items-center justify-between gap-3 text-sm font-bold text-slate-700">
                <span>Traffic / Impressions</span>
                <span className="text-slate-500">
                  {plainNumber(numberFromInput(activeInputs.traffic))}
                </span>
              </span>
              <input
                type="range"
                min="1000"
                max="1000000"
                step="1000"
                value={numberFromInput(activeInputs.traffic)}
                onChange={(event) => updateScenario("traffic", event.target.value)}
                className="accent-emerald-600"
              />
              <input
                inputMode="numeric"
                value={activeInputs.traffic}
                onChange={(event) => updateScenario("traffic", event.target.value)}
                className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
            </label>

            <label className="grid gap-2 sm:col-span-2">
              <span className="flex items-center justify-between gap-3 text-sm font-bold text-slate-700">
                <span>Ad spend (TikTok Ads)</span>
                <span className="text-slate-500">
                  {money.format(numberFromInput(activeInputs.adSpend))}
                </span>
              </span>
              <input
                type="range"
                min="0"
                max="50000"
                step="100"
                value={numberFromInput(activeInputs.adSpend)}
                onChange={(event) => updateScenario("adSpend", event.target.value)}
                className="accent-emerald-600"
              />
              <input
                inputMode="decimal"
                value={activeInputs.adSpend}
                onChange={(event) => updateScenario("adSpend", event.target.value)}
                className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-700">CPM / CPC</span>
              <div className="grid grid-cols-[0.8fr_1fr] gap-2">
                <select
                  value={activeInputs.costModel}
                  onChange={(event) => updateScenario("costModel", event.target.value as CostModel)}
                  className={fieldInputClass(isTemplateFieldHighlighted("costModel"))}
                >
                  <option value="cpm">CPM</option>
                  <option value="cpc">CPC</option>
                </select>
                <input
                  inputMode="decimal"
                  value={activeInputs.adRate}
                  onChange={(event) => updateScenario("adRate", event.target.value)}
                  className={fieldInputClass(isTemplateFieldHighlighted("adRate"))}
                />
              </div>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-700">Platform commission (%)</span>
              <input
                inputMode="decimal"
                value={activeInputs.commissionRate}
                onChange={(event) => updateScenario("commissionRate", event.target.value)}
                className={fieldInputClass(isTemplateFieldHighlighted("commissionRate"))}
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-700">Shipping cost per unit</span>
              <input
                inputMode="decimal"
                value={activeInputs.shippingCost}
                onChange={(event) => updateScenario("shippingCost", event.target.value)}
                className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-700">Return rate (%)</span>
              <input
                inputMode="decimal"
                value={activeInputs.returnRate}
                onChange={(event) => updateScenario("returnRate", event.target.value)}
                className={fieldInputClass(isTemplateFieldHighlighted("returnRate"))}
              />
            </label>

            <label className="grid gap-2 sm:col-span-2">
              <span className="text-sm font-bold text-slate-700">Miscellaneous costs</span>
              <input
                inputMode="decimal"
                value={activeInputs.miscCosts}
                onChange={(event) => updateScenario("miscCosts", event.target.value)}
                className="min-h-12 rounded-md border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
            </label>
          </div>
        </div>

        <div className="grid gap-4 xl:sticky xl:top-6">
          <div className="rounded-lg border border-slate-900 bg-slate-950 p-5 text-white shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
                  Results dashboard
                </p>
                <h3 className="mt-2 text-xl font-bold tracking-normal">Profit and efficiency</h3>
              </div>
              <div className="rounded-md border border-white/10 bg-white/10 px-3 py-2 text-left sm:text-right">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-300">
                  Active scenario
                </p>
                <p className="mt-1 text-sm font-black">Scenario {activeScenario}</p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                Net profit
              </p>
              <p
                className={
                  activeMetrics.netProfit < 0
                    ? "mt-2 break-words text-4xl font-black tracking-normal text-rose-300 sm:text-5xl xl:text-4xl 2xl:text-5xl"
                    : "mt-2 break-words text-4xl font-black tracking-normal text-white sm:text-5xl xl:text-4xl 2xl:text-5xl"
                }
              >
                {money.format(activeMetrics.netProfit)}
              </p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-2">
              {[
                ["Total Revenue", money.format(activeMetrics.totalRevenue)],
                ["Total Cost", money.format(activeMetrics.totalCost)],
                ["ROI", percent(activeMetrics.roi)],
                ["ROAS", activeMetrics.roas === null ? "N/A" : percent(activeMetrics.roas)]
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-white/[0.07] p-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    {label}
                  </p>
                  <p className="mt-2 break-words text-xl font-black tracking-normal text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`rounded-lg border p-5 ${diagnosisStyle.border} ${diagnosisStyle.background}`}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p
                  className={`inline-flex rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] ${diagnosisStyle.badge}`}
                >
                  Campaign Diagnosis
                </p>
                <h3 className={`mt-3 text-xl font-bold tracking-normal ${diagnosisStyle.title}`}>
                  {diagnosis.title}
                </h3>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-600">{diagnosis.message}</p>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {diagnosis.suggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className="rounded-md border border-white/60 bg-white/80 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm"
                >
                  {suggestion}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-1">
            <RevenueCostChart metrics={activeMetrics} money={money} />
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Order economics
              </p>
              <div className="mt-4 grid gap-2 text-sm text-slate-600">
                <p>
                  Orders:{" "}
                  <strong className="text-slate-950">{plainNumber(activeMetrics.orders)}</strong>
                </p>
                <p>
                  Net orders after returns:{" "}
                  <strong className="text-slate-950">
                    {plainNumber(activeMetrics.netOrders)}
                  </strong>
                </p>
                <p>
                  Commission cost:{" "}
                  <strong className="text-slate-950">
                    {money.format(activeMetrics.commissionCost)}
                  </strong>
                </p>
                <p>
                  Shipping cost:{" "}
                  <strong className="text-slate-950">
                    {money.format(activeMetrics.shippingCost)}
                  </strong>
                </p>
                <p>
                  {activeInputs.costModel.toUpperCase()} benchmark cost:{" "}
                  <strong className="text-slate-950">
                    {money.format(activeMetrics.benchmarkAdCost)}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {compareEnabled ? (
        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
            Scenario comparison
          </p>
          <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
            <div className="grid grid-cols-[1fr_1fr_1fr] bg-slate-950 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white">
              <span>Metric</span>
              <span>Scenario A</span>
              <span>Scenario B</span>
            </div>
            {[
              ["Revenue", money.format(comparison.A.totalRevenue), money.format(comparison.B.totalRevenue)],
              ["Cost", money.format(comparison.A.totalCost), money.format(comparison.B.totalCost)],
              ["Profit", money.format(comparison.A.netProfit), money.format(comparison.B.netProfit)],
              ["ROI", percent(comparison.A.roi), percent(comparison.B.roi)],
              [
                "ROAS",
                comparison.A.roas === null ? "N/A" : percent(comparison.A.roas),
                comparison.B.roas === null ? "N/A" : percent(comparison.B.roas)
              ]
            ].map(([label, valueA, valueB]) => (
              <div
                key={label}
                className="grid grid-cols-1 gap-2 border-t border-slate-200 px-4 py-4 text-sm sm:grid-cols-[1fr_1fr_1fr]"
              >
                <p className="font-bold text-slate-950">{label}</p>
                <p className="font-semibold text-slate-700">{valueA}</p>
                <p className="font-semibold text-slate-700">{valueB}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-6">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
          Low / Medium / High simulation
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {simulations.map((simulation) => (
            <article key={simulation.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-bold tracking-normal text-slate-950">{simulation.label}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-500">{simulation.note}</p>
              <div className="mt-4 grid gap-2 text-sm">
                <p>Profit: <strong>{money.format(simulation.metrics.netProfit)}</strong></p>
                <p>ROI: <strong>{percent(simulation.metrics.roi)}</strong></p>
                <p>ROAS: <strong>{simulation.metrics.roas === null ? "N/A" : percent(simulation.metrics.roas)}</strong></p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
          Creator growth suggestion
        </p>
        <div className="mt-3 grid gap-2">
          {guidance.map((item) => (
            <p key={item} className="leading-7 text-slate-700">
              {item}
            </p>
          ))}
          {adviceMessage ? <p className="font-semibold leading-7 text-slate-800">{adviceMessage}</p> : null}
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-700">Email for PDF download and recommendations</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="min-h-12 rounded-md border border-slate-200 bg-white px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
          />
        </label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <button
            type="button"
            onClick={handleCalculate}
            className="min-h-11 rounded-md bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Calculate ROI
          </button>
          <button
            type="button"
            onClick={handleOptimizeAds}
            className="min-h-11 rounded-md border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-slate-300"
          >
            Optimize TikTok Ads
          </button>
          <button
            type="button"
            onClick={handlePersonalizedAdvice}
            className="min-h-11 rounded-md border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-slate-300"
          >
            Get Personalized Advice
          </button>
          <button
            type="button"
            onClick={handleExportPdf}
            className="min-h-11 rounded-md bg-emerald-600 px-4 text-sm font-bold text-white transition hover:bg-emerald-700"
          >
            Export PDF
          </button>
        </div>
        {statusMessage ? <p className="mt-3 text-sm leading-6 text-slate-600">{statusMessage}</p> : null}
      </div>

      <p className="mt-5 text-xs leading-5 text-slate-500">
        Based on current TikTok platform commission assumptions as of May 2026. Actual may vary.
        Currency: {market.currencyCode}. Product cost of goods is not included unless you add it to
        miscellaneous costs. Unit values can be entered as {moneyWithDecimals.format(12.5)}.
      </p>
    </section>
  );
}
