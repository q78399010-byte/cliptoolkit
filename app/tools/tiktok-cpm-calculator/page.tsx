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
    title: "What this calculator does",
    paragraphs: [
      "This TikTok CPM Calculator shows how much a campaign paid for every 1,000 impressions. It converts ad spend and delivered impressions into a CPM, then adds supporting outputs such as cost per 10,000 impressions, impressions per dollar, a CPM band, and a forecast for a planned budget at a target CPM. The goal is to make reach cost easier to read before you move into deeper performance metrics.",
      "CPM is most useful when the question is about attention and delivery. It helps media buyers compare campaigns, creators compare organic reach against paid reach, and agencies explain whether a TikTok campaign is buying impressions efficiently. CPM does not prove that the traffic was qualified or profitable, but it gives you a clean starting point for understanding media cost before you review CPC, CTR, conversion rate, ROAS, and audience quality."
    ]
  },
  {
    title: "How to use it",
    paragraphs: [
      "Enter the ad spend and impressions from the same TikTok Ads Manager report, campaign, ad group, or date range. If the campaign spent $500 between Monday and Sunday, use the impressions delivered during that same Monday-to-Sunday window. Mixing a lifetime spend number with a seven-day impression number will make the CPM look better or worse than it really is.",
      "Use the planned budget and target CPM fields when you want a simple reach forecast. For example, if you are preparing the next creative test and you expect an $8 CPM, the calculator can estimate how many impressions a $1,000 test may buy. Treat the forecast as a planning range, not a promise. Auction competition, creative fatigue, audience size, bid strategy, seasonality, and campaign objective can all move the final CPM."
    ]
  },
  {
    title: "Formula explanation",
    paragraphs: [
      "The CPM formula divides total ad spend by total impressions, then multiplies by 1,000. Multiplying by 1,000 makes the number easier to compare because impressions are usually delivered in large volumes. A $6.67 CPM means the campaign paid about $6.67 for each block of 1,000 impressions, not for each individual view or click.",
      "The calculator also shows cost per 10,000 impressions by multiplying CPM by 10, impressions per dollar by dividing impressions by spend, and forecast impressions by dividing planned budget by target CPM, then multiplying by 1,000. These extra outputs are still based on the same delivery logic. They simply translate CPM into numbers that are easier for campaign planning, client reporting, and creator media value comparisons."
    ],
    formula: "CPM = ad spend / impressions x 1,000"
  },
  {
    title: "Example calculation",
    paragraphs: [
      "Suppose a TikTok campaign spent $500 and delivered 75,000 impressions. The CPM is $500 divided by 75,000, multiplied by 1,000, which equals $6.67. The cost per 10,000 impressions is about $66.67, and the campaign delivered 150 impressions for every dollar spent. Those numbers suggest the campaign bought reach at a workable price, but they still need to be checked against clicks and conversions.",
      "Now imagine the next test has a planned budget of $1,000 and a target CPM of $8. The forecast is $1,000 divided by $8, multiplied by 1,000, which equals 125,000 impressions. The calculator displays a low and high range around that estimate because real delivery can move. If the final CPM comes in lower than $8, the budget may buy more impressions. If competition rises or the audience is narrow, the same budget may buy less."
    ]
  },
  {
    title: "Common mistakes to avoid",
    paragraphs: [
      "A common mistake is judging CPM by itself. A cheap CPM can be good for awareness, but it can also hide low click intent, poor landing page fit, or an audience that never converts. A higher CPM can still be acceptable when the audience is valuable, the creative earns strong clicks, or the campaign supports a high-margin product.",
      "Another mistake is comparing CPM across campaigns with different objectives. A reach campaign, conversion campaign, Spark Ad test, retargeting ad group, and narrow high-intent audience may all produce different CPMs for valid reasons. Keep the campaign objective, audience size, bid strategy, date range, and placement mix visible when you compare results. CPM becomes more useful when the context stays attached to the number."
    ],
    cards: [
      ["Mixing metrics", "Spend and impressions must come from the same campaign window."],
      ["Ignoring objective", "Reach, traffic, and conversion campaigns can have different auction costs."],
      ["Chasing cheap reach", "Low CPM matters less when clicks, watch time, or conversions are weak."],
      ["Missing fatigue", "Rising CPM can signal stale creative, audience saturation, or heavier competition."]
    ]
  },
  {
    title: "When CPM is useful",
    paragraphs: [
      "CPM is most useful when the campaign goal is awareness, reach, creator content testing, or comparing TikTok ads with influencer media value. It is less useful by itself when the goal is profitable sales, but it still helps explain whether the campaign had enough affordable delivery to generate a fair test."
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
