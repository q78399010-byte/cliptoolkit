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
    title: "What this calculator does",
    paragraphs: [
      "This TikTok CPC Calculator shows the average cost of each click from a TikTok campaign. It uses ad spend and clicks to calculate CPC, then uses impressions to estimate CTR and click density. The calculator also shows cost per 100 clicks, a CPC band, and a click forecast based on a planned budget and target CPC.",
      "The calculator is designed for traffic and offer testing. It helps advertisers, TikTok Shop sellers, creator agencies, and influencer marketers understand whether a video is turning reach into affordable clicks. CPC does not tell you whether those clicks became customers, but it does show how expensive the next step was after the impression. That makes it useful when testing hooks, calls to action, landing pages, product pages, Spark Ads, and creator-style ads."
    ]
  },
  {
    title: "How to use it",
    paragraphs: [
      "Enter ad spend, clicks, and impressions from the same campaign, ad group, creative, or reporting window. Decide which click type you are measuring before you start. TikTok reports can include link clicks, destination clicks, product clicks, profile clicks, and other actions depending on setup. The calculator will work with any click count, but your comparisons only make sense when the click definition stays consistent.",
      "Use the planned budget and target CPC fields to estimate future traffic. If you want to know how many clicks a $1,000 test might generate at a $0.65 CPC, the forecast gives you a planning number and a range. After you calculate CPC, read it with CTR. CPC tells you what each click cost. CTR tells you whether the creative turned impressions into clicks at a healthy rate. Together, they make it easier to separate traffic cost from creative response."
    ]
  },
  {
    title: "Formula explanation",
    paragraphs: [
      "The CPC formula is straightforward: divide total ad spend by total clicks. If a campaign spent $500 and generated 850 clicks, each click cost a little under sixty cents. CPC is a cost metric, so lower usually looks better, but lower is not automatically stronger. Cheap traffic can still be a poor result if the audience does not buy, sign up, watch the next step, or match the brand's target customer.",
      "The calculator also uses impressions to calculate CTR, or click-through rate. CTR is clicks divided by impressions, multiplied by 100. It answers a different question: out of all impressions, what percentage became clicks? The forecast uses planned budget divided by target CPC. Cost per 100 clicks multiplies CPC by 100, which can be useful when presenting traffic cost to a client or comparing several creatives in a simple table."
    ],
    formula: "CPC = ad spend / clicks"
  },
  {
    title: "Example calculation",
    paragraphs: [
      "Imagine a TikTok campaign spent $500, generated 850 clicks, and delivered 75,000 impressions. CPC is $500 divided by 850, which equals about $0.59. CTR is 850 divided by 75,000, multiplied by 100, which equals about 1.13%. Click density is 850 divided by 75,000, multiplied by 1,000, or roughly 11 clicks per 1,000 impressions. The cost per 100 clicks is about $58.82.",
      "For a future test, suppose the planned budget is $1,000 and the target CPC is $0.65. The forecast is $1,000 divided by $0.65, or about 1,538 clicks. The actual result can be lower or higher because TikTok delivery changes with auction pressure, audience quality, creative fatigue, bid strategy, and landing page relevance. The forecast is still useful because it tells you whether the budget is large enough to generate a meaningful click sample."
    ]
  },
  {
    title: "Common mistakes to avoid",
    paragraphs: [
      "The most common mistake is celebrating low CPC without checking what happened after the click. If users bounce from the landing page, ignore the product page, or fail to convert, a cheap click can still waste budget. CPC should be reviewed with conversion rate, CPA, average order value, and ROAS before you decide to scale a campaign.",
      "Another mistake is mixing click definitions. One report may use link clicks, another may use destination clicks, and a third may include profile or product clicks. Those numbers can look similar but represent different user actions. Keep the click type consistent, match spend and clicks to the same date range, and compare creatives within the same objective when possible."
    ],
    cards: [
      ["Wrong click type", "Choose one click definition and use it across every comparison."],
      ["Cheap but weak", "Low CPC is not useful when conversion rate or lead quality is poor."],
      ["Missing CTR", "CPC needs CTR to show whether the creative is earning clicks from reach."],
      ["Uneven windows", "Use spend, clicks, and impressions from the same reporting period."]
    ]
  },
  {
    title: "How to read CPC with CTR",
    paragraphs: [
      "CPC tells you the cost of each click. CTR tells you how often impressions become clicks. A campaign can have a low CPC because the ad is efficient, or because it is reaching a broad audience where clicks are inexpensive but not necessarily valuable."
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
