import type { Metadata } from "next";
import { CalculatorToolPage, type ContentBlock } from "@/components/calculator-tool-page";
import { YouTubeCpmCalculator } from "@/components/youtube-cpm-calculator";
import { getCreatorTool } from "@/data/creator-tools";
import { createToolMetadata } from "@/lib/seo/tool-metadata";

const tool = getCreatorTool("youtube-cpm-calculator")!;

export const metadata: Metadata = createToolMetadata(tool);

const faqItems = [
  {
    question: "How do you calculate YouTube CPM?",
    answer:
      "Divide total ad spend by total impressions, then multiply by 1,000. For example, $1,000 spent on 125,000 impressions equals an $8 CPM."
  },
  {
    question: "What does CPM mean on YouTube?",
    answer:
      "CPM means cost per 1,000 impressions. It shows how much an advertiser paid to have ads shown, but it does not prove viewers watched, clicked, or converted."
  },
  {
    question: "Is YouTube CPM the same as RPM?",
    answer:
      "No. CPM is an advertiser cost metric. RPM is closer to a creator revenue metric because it estimates revenue per 1,000 views after monetization mix and platform revenue share."
  },
  {
    question: "What is a good YouTube CPM?",
    answer:
      "A good YouTube CPM depends on niche, country, targeting, seasonality, format, and campaign objective. Broad reach campaigns may need lower CPMs, while high-intent business, finance, or software audiences can cost more."
  },
  {
    question: "Can CPM forecast YouTube ad reach?",
    answer:
      "Yes. Divide the planned budget by the target CPM, then multiply by 1,000. The result is a planning estimate for impressions, not a guaranteed delivery number."
  },
  {
    question: "Should creators use CPM for sponsorship pricing?",
    answer:
      "Creators can use CPM as one input when comparing sponsorship value with paid media, but final pricing should also include trust, production, integration depth, usage rights, exclusivity, and conversion potential."
  }
];

const contentBlocks: ContentBlock[] = [
  {
    title: "What this calculator does",
    paragraphs: [
      "This YouTube CPM Calculator converts ad spend and delivered impressions into cost per 1,000 impressions. It also shows cost per 10,000 impressions, impressions per dollar, a CPM band, and a forecast for how much reach a future YouTube ad budget may buy at a target CPM.",
      "The calculator is useful for media buyers, creator agencies, YouTube channel owners, and sponsorship teams that need a quick way to compare paid reach. CPM does not tell the whole performance story, but it gives a clean starting point before reviewing view rate, CPC, conversion rate, audience quality, and campaign revenue."
    ]
  },
  {
    title: "How to use it",
    paragraphs: [
      "Enter ad spend and impressions from the same campaign, ad group, creative, or reporting period. If the campaign spent $1,000 during a seven-day window, use the impressions from that same seven-day window. Mixing a lifetime spend number with a short impression window will make the CPM misleading.",
      "Use the planned budget and target CPM fields to forecast reach before launching a new test. Treat the forecast as a planning range because YouTube delivery can change with auction competition, audience size, placement mix, creative quality, seasonality, and campaign objective."
    ]
  },
  {
    title: "Formula explanation",
    paragraphs: [
      "The CPM formula divides total ad spend by total impressions, then multiplies by 1,000. Multiplying by 1,000 makes the result easier to compare because campaigns usually deliver impressions in large volumes.",
      "The calculator also translates CPM into cost per 10,000 impressions and impressions per dollar. These supporting numbers make it easier to explain budget efficiency in client reports, campaign planning documents, and creator sponsorship comparisons."
    ],
    formula: "CPM = ad spend / impressions x 1,000"
  },
  {
    title: "Example calculation",
    paragraphs: [
      "Suppose a YouTube ad campaign spent $1,000 and delivered 125,000 impressions. The CPM is $1,000 divided by 125,000, multiplied by 1,000, which equals $8. The campaign delivered 125 impressions for every dollar spent.",
      "If the next campaign has a planned budget of $2,500 and a target CPM of $10, the forecast is $2,500 divided by $10, multiplied by 1,000, which equals 250,000 impressions. Actual delivery may be higher or lower depending on targeting, auction pressure, bidding, and creative performance."
    ]
  },
  {
    title: "Common mistakes to avoid",
    paragraphs: [
      "The most common mistake is judging YouTube CPM by itself. Cheap impressions can still be weak if viewers skip quickly, click quality is poor, or the landing page does not convert. A higher CPM can still be profitable when the audience has strong intent and the offer has enough value.",
      "Another mistake is comparing CPM across campaigns with different objectives. A broad awareness campaign, a retargeting campaign, a video action campaign, and a narrow B2B audience can all produce different CPMs for valid reasons."
    ],
    cards: [
      ["Mismatched windows", "Use spend and impressions from the same report period."],
      ["Ignoring objective", "Awareness, traffic, and conversion campaigns can buy different inventory."],
      ["Chasing cheap reach", "Low CPM is not useful when watch quality or conversion quality is weak."],
      ["Missing placement mix", "Shorts, in-stream, in-feed, and connected TV can change delivery cost."]
    ]
  },
  {
    title: "YouTube CPM metrics to compare",
    paragraphs: [
      "Use CPM with adjacent campaign metrics so the media cost is connected to viewer response and business value."
    ],
    table: {
      headers: ["Metric", "Measures", "Best use"],
      rows: [
        ["CPM", "Cost per 1,000 impressions", "Reach and awareness planning."],
        ["View rate", "Views / impressions", "Creative hook and format quality."],
        ["CPC", "Spend / clicks", "Traffic cost and offer response."],
        ["CPA", "Spend / conversions", "Lead, sale, or sign-up efficiency."]
      ]
    }
  }
];

export default function YouTubeCpmCalculatorPage() {
  return (
    <CalculatorToolPage
      tool={tool}
      calculator={<YouTubeCpmCalculator />}
      heroEyebrow="YouTube Ads Tools"
      heroDescription="Calculate YouTube CPM from ad spend and impressions, then forecast how much reach a planned ad budget can buy."
      heroSecondaryDescription="Use CPM to compare YouTube campaign delivery, creator sponsorship media value, and paid video reach."
      heroCards={[
        ["Ad spend", "Use the amount spent in Google Ads or your campaign report."],
        ["Impressions", "Enter delivered impressions from the same reporting window."],
        ["Target CPM", "Forecast expected impressions from a future YouTube ad budget."]
      ]}
      audienceLead="Use this calculator before scaling a YouTube ad campaign, comparing paid reach with creator sponsorships, or reporting media efficiency to a client."
      audienceCards={[
        ["Media Buyers", "Check delivery costs before changing budget."],
        ["YouTube Creators", "Compare sponsorship media value against paid ads."],
        ["Creator Agencies", "Benchmark video ad reach for campaign planning."],
        ["Performance Marketers", "Read CPM before reviewing clicks and conversions."]
      ]}
      usageSteps={[
        ["Match the report window", "Use spend and impressions from the same campaign period."],
        ["Check downstream metrics", "CPM should be reviewed with view rate, CPC, and conversions."],
        ["Forecast reach", "Use target CPM to estimate impressions before launching a test."]
      ]}
      guideEyebrow="YouTube CPM guide"
      guideTitle="Use CPM to understand YouTube reach cost"
      guideDescription="CPM helps explain how efficiently a YouTube campaign buys impressions, but profitable scaling depends on viewer quality and conversion value."
      contentBlocks={contentBlocks}
      faqItems={faqItems}
      relatedToolSlugs={[
        "youtube-revenue-calculator",
        "youtube-engagement-rate-calculator",
        "youtube-shorts-money-calculator",
        "tiktok-cpm-calculator"
      ]}
    />
  );
}
