import type { Metadata } from "next";
import { CalculatorToolPage, type ContentBlock } from "@/components/calculator-tool-page";
import { TikTokCpmCalculator } from "@/components/tiktok-cpm-calculator";
import { getCreatorTool } from "@/data/creator-tools";
import { createToolMetadata } from "@/lib/seo/tool-metadata";

const tool = getCreatorTool("tiktok-cpm-calculator")!;

export const metadata: Metadata = createToolMetadata(tool);

const faqItems = [
  {
    question: "How do you calculate TikTok CPM?",
    answer:
      "Divide ad spend by impressions, then multiply by 1,000. For example, $500 spent on 75,000 impressions equals a $6.67 CPM."
  },
  {
    question: "What does CPM mean in TikTok ads?",
    answer:
      "CPM means cost per 1,000 impressions. It shows how much you paid to get your ad shown, but it does not show whether viewers clicked, converted, or bought."
  },
  {
    question: "Is a lower TikTok CPM always better?",
    answer:
      "No. A low CPM can be useful for reach, but it can still perform poorly if the audience is too broad, clicks are weak, or conversions do not happen."
  },
  {
    question: "How is CPM different from CPC?",
    answer:
      "CPM measures the cost of impressions. CPC measures the cost of clicks. CPM is useful for reach planning, while CPC is better for traffic and offer testing."
  },
  {
    question: "Can creators use CPM for influencer pricing?",
    answer:
      "Yes. CPM can help compare paid ad reach against influencer reach, but creator pricing should also include production, trust, usage rights, exclusivity, and audience fit."
  },
  {
    question: "Why does TikTok CPM change?",
    answer:
      "TikTok CPM can change because of audience size, competition, seasonality, campaign objective, bid strategy, creative quality, frequency, and advertiser demand."
  }
];

const contentBlocks: ContentBlock[] = [
  {
    title: "What is a TikTok CPM Calculator?",
    paragraphs: [
      "A TikTok CPM Calculator shows how much you paid for every 1,000 impressions. It is useful for media buyers, creators, and agencies that need a fast way to compare reach costs across campaigns.",
      "CPM is not a complete performance metric, but it is a useful starting point. It helps you understand whether the campaign is buying attention efficiently before you review clicks, conversions, and sales."
    ]
  },
  {
    title: "TikTok CPM formula",
    paragraphs: [
      "The CPM formula divides total ad spend by total impressions, then multiplies by 1,000. Use the same currency for spend and budget inputs so the estimate stays consistent."
    ],
    formula: "CPM = ad spend / impressions x 1,000"
  },
  {
    title: "When CPM is useful",
    paragraphs: [
      "CPM is most useful when the campaign goal is awareness, reach, creator content testing, or comparing TikTok ads with influencer media value. It is less useful by itself when the goal is profitable sales."
    ],
    cards: [
      ["Reach planning", "Forecast how many impressions a budget can buy at a target CPM."],
      ["Creative testing", "Compare whether new videos are getting cheaper or more expensive delivery."],
      ["Influencer comparison", "Compare paid social reach with creator-sponsored post reach."],
      ["Budget pressure", "Spot when audience competition or creative fatigue is making delivery expensive."]
    ]
  },
  {
    title: "CPM vs CPC vs CPA",
    paragraphs: [
      "CPM, CPC, and CPA answer different questions. Strong campaign analysis usually checks all three instead of optimizing only one number."
    ],
    table: {
      headers: ["Metric", "Measures", "Best use"],
      rows: [
        ["CPM", "Cost per 1,000 impressions", "Reach and awareness planning."],
        ["CPC", "Cost per click", "Traffic and creative response testing."],
        ["CPA", "Cost per acquisition", "Lead, sale, or conversion efficiency."],
        ["ROAS", "Revenue return on ad spend", "Profitability and budget scaling."]
      ]
    }
  }
];

export default function TikTokCpmCalculatorPage() {
  return (
    <CalculatorToolPage
      tool={tool}
      calculator={<TikTokCpmCalculator />}
      heroEyebrow="TikTok Ads Tools"
      heroDescription="Calculate TikTok CPM from ad spend and impressions, then forecast how much reach a planned budget can buy."
      heroSecondaryDescription="Use CPM to compare campaign delivery, creator content tests, paid social reach, and influencer media value."
      heroCards={[
        ["Ad spend", "Enter the amount spent during the campaign period."],
        ["Impressions", "Use delivered impressions from TikTok Ads Manager or a report."],
        ["Target CPM", "Forecast expected impressions from a future budget."]
      ]}
      audienceLead="Use this calculator before scaling a TikTok ad campaign, comparing creator content against paid reach, or reporting media efficiency to a client."
      audienceCards={[
        ["Media Buyers", "Check delivery costs before changing budget."],
        ["TikTok Shop Sellers", "Compare reach cost with sales and ROAS."],
        ["Creator Agencies", "Benchmark paid reach against creator campaigns."],
        ["Influencer Marketers", "Use CPM as one input in campaign pricing."]
      ]}
      usageSteps={[
        ["Use delivered data", "Enter final spend and impressions from the same time window."],
        ["Review CPM with CPC", "Cheap impressions matter less if clicks or conversions are weak."],
        ["Forecast reach", "Use target CPM to estimate impressions for the next budget."]
      ]}
      guideEyebrow="TikTok CPM guide"
      guideTitle="Use CPM to understand reach cost"
      guideDescription="CPM helps you compare how efficiently a TikTok campaign buys impressions, but it should be reviewed alongside click and conversion quality."
      contentBlocks={contentBlocks}
      faqItems={faqItems}
      relatedToolSlugs={[
        "tiktok-cpc-calculator",
        "tiktok-shop-roi-calculator",
        "influencer-rate-calculator",
        "tiktok-engagement-rate-calculator"
      ]}
    />
  );
}
