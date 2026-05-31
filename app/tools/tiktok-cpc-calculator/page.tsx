import type { Metadata } from "next";
import { CalculatorToolPage, type ContentBlock } from "@/components/calculator-tool-page";
import { TikTokCpcCalculator } from "@/components/tiktok-cpc-calculator";
import { getCreatorTool } from "@/data/creator-tools";
import { createToolMetadata } from "@/lib/seo/tool-metadata";

const tool = getCreatorTool("tiktok-cpc-calculator")!;

export const metadata: Metadata = createToolMetadata(tool);

const faqItems = [
  {
    question: "How do you calculate TikTok CPC?",
    answer:
      "Divide total ad spend by total clicks. For example, $500 spent on 850 clicks equals a $0.59 CPC."
  },
  {
    question: "What does CPC mean in TikTok ads?",
    answer:
      "CPC means cost per click. It shows how much you paid for each click from a TikTok ad, creator ad, Spark Ad, or paid social campaign."
  },
  {
    question: "How is CTR calculated?",
    answer:
      "CTR is clicks divided by impressions, multiplied by 100. It shows the percentage of impressions that turned into clicks."
  },
  {
    question: "Is low CPC always good?",
    answer:
      "No. Low CPC is useful only when the clicks are relevant. If users do not convert, a cheap click can still waste budget."
  },
  {
    question: "What affects TikTok CPC?",
    answer:
      "TikTok CPC can change because of creative quality, offer clarity, audience competition, placement, landing page fit, bid strategy, seasonality, and campaign objective."
  },
  {
    question: "Should I optimize for CPC or CPM?",
    answer:
      "Use CPM when the goal is reach and CPC when the goal is traffic. For revenue campaigns, compare both metrics with conversion rate, average order value, and ROAS."
  }
];

const contentBlocks: ContentBlock[] = [
  {
    title: "What is a TikTok CPC Calculator?",
    paragraphs: [
      "A TikTok CPC Calculator shows the average cost of each click from a campaign. It helps advertisers understand whether creative, audience, and offer choices are creating affordable traffic.",
      "CPC is especially useful when testing hooks, calls to action, landing pages, product pages, TikTok Shop offers, or creator ads where clicks are the next step after attention."
    ]
  },
  {
    title: "TikTok CPC formula",
    paragraphs: [
      "The CPC formula divides total ad spend by total clicks. Add impressions to calculate CTR and understand whether the campaign is earning clicks from the reach it receives."
    ],
    formula: "CPC = ad spend / clicks"
  },
  {
    title: "How to read CPC with CTR",
    paragraphs: [
      "CPC tells you the cost of each click. CTR tells you how often impressions become clicks. A campaign can have a low CPC because traffic is cheap, or because the ad is reaching a broad audience that may not buy."
    ],
    cards: [
      ["High CTR, low CPC", "The creative and offer are likely earning attention efficiently."],
      ["Low CTR, high CPC", "The hook, audience, or offer may need a clearer reason to click."],
      ["Low CPC, low conversion", "Traffic is cheap, but the landing page or audience may be weak."],
      ["High CPC, high AOV", "Premium clicks can still work when order value and conversion quality support it."]
    ]
  },
  {
    title: "TikTok click metrics to compare",
    paragraphs: [
      "Use CPC with adjacent metrics so you do not optimize for cheap traffic at the expense of revenue quality."
    ],
    table: {
      headers: ["Metric", "Formula", "Why it matters"],
      rows: [
        ["CPC", "Spend / clicks", "Shows traffic cost."],
        ["CTR", "Clicks / impressions x 100", "Shows creative response."],
        ["CVR", "Conversions / clicks x 100", "Shows landing page or offer fit."],
        ["CPA", "Spend / conversions", "Shows acquisition cost."]
      ]
    }
  }
];

export default function TikTokCpcCalculatorPage() {
  return (
    <CalculatorToolPage
      tool={tool}
      calculator={<TikTokCpcCalculator />}
      heroEyebrow="TikTok Ads Tools"
      heroDescription="Calculate TikTok CPC from ad spend and clicks, then use impressions to estimate CTR and click density."
      heroSecondaryDescription="Use CPC to evaluate traffic cost, compare creator ads, and forecast how many clicks a future budget may generate."
      heroCards={[
        ["Ad spend", "Use the amount spent in TikTok Ads Manager or your report."],
        ["Clicks", "Enter link clicks, destination clicks, or the click type you track."],
        ["CTR", "Add impressions to understand whether reach is becoming traffic."]
      ]}
      audienceLead="Use this calculator when testing TikTok ads, Spark Ads, creator content, TikTok Shop traffic, or landing page offers."
      audienceCards={[
        ["Performance Marketers", "Measure traffic cost and click quality."],
        ["TikTok Shop Sellers", "Compare clicks with product page conversion."],
        ["Creator Agencies", "Evaluate creator ad traffic after launch."],
        ["Influencer Marketers", "Compare paid clicks with sponsored creator traffic."]
      ]}
      usageSteps={[
        ["Match the time window", "Use spend, clicks, and impressions from the same campaign period."],
        ["Check CTR", "Low CTR usually points to hook, offer, or audience issues."],
        ["Connect to revenue", "CPC matters most when paired with conversion rate and order value."]
      ]}
      guideEyebrow="TikTok CPC guide"
      guideTitle="Use CPC to understand traffic cost"
      guideDescription="CPC helps you see how efficiently TikTok campaigns turn reach into clicks, but profitable scaling still depends on conversion quality."
      contentBlocks={contentBlocks}
      faqItems={faqItems}
      relatedToolSlugs={[
        "tiktok-cpm-calculator",
        "tiktok-shop-roi-calculator",
        "tiktok-engagement-rate-calculator",
        "influencer-rate-calculator"
      ]}
    />
  );
}
