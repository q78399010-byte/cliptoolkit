import type { Metadata } from "next";
import { CalculatorToolPage, type ContentBlock } from "@/components/calculator-tool-page";
import { InfluencerRateCalculator } from "@/components/influencer-rate-calculator";
import { getCreatorTool } from "@/data/creator-tools";
import { createToolMetadata } from "@/lib/seo/tool-metadata";

const tool = getCreatorTool("influencer-rate-calculator")!;

export const metadata: Metadata = createToolMetadata(tool);

const faqItems = [
  {
    question: "How do you calculate an influencer rate?",
    answer:
      "A practical influencer rate uses average views, engagement rate, platform, niche, deliverables, usage rights, and exclusivity. Follower count can help, but average views and audience quality usually matter more for campaign planning."
  },
  {
    question: "Should influencer pricing be based on followers or views?",
    answer:
      "Views are usually more useful for pricing a specific deliverable because they show expected reach. Followers can still help set a professional floor, especially when the creator has strong trust or niche authority."
  },
  {
    question: "Do usage rights increase influencer rates?",
    answer:
      "Yes. If a brand wants to run creator content as paid ads, reuse it on landing pages, whitelist it, or keep broad licensing rights, the rate should increase beyond organic posting."
  },
  {
    question: "Should exclusivity cost extra?",
    answer:
      "Yes. Category exclusivity can block future brand deals, so it should be priced separately and limited by category, time period, and geography when possible."
  },
  {
    question: "What is cost per engagement?",
    answer:
      "Cost per engagement divides the proposed rate by estimated likes, comments, shares, saves, or other engagement actions. It helps brands compare campaign options, but it should not replace audience fit or creative quality."
  },
  {
    question: "Is this influencer rate calculator accurate?",
    answer:
      "This calculator is a planning tool. Final rates should account for brand fit, audience country, production effort, deadlines, revisions, reporting, usage terms, and the creator's negotiation leverage."
  }
];

const contentBlocks: ContentBlock[] = [
  {
    title: "What is an Influencer Rate Calculator?",
    paragraphs: [
      "An Influencer Rate Calculator estimates what a creator could charge for a sponsored post, short-form video, YouTube integration, or campaign bundle. It gives both creators and brands a starting point before negotiation.",
      "The strongest estimates do not rely only on follower count. They combine expected reach, engagement quality, niche value, production scope, paid usage, exclusivity, and platform context."
    ]
  },
  {
    title: "Influencer pricing formula",
    paragraphs: [
      "A practical rate starts with media value, then adjusts for niche, deliverable complexity, usage rights, exclusivity, and engagement quality. The calculator also uses a creator floor so small accounts do not price below professional production value."
    ],
    formula:
      "Estimated rate = media value x niche x deliverable x usage rights x exclusivity x engagement quality"
  },
  {
    title: "What affects influencer rates?",
    paragraphs: [
      "Influencer pricing changes when the brand needs more than one organic post. Paid usage, whitelisting, category exclusivity, rush deadlines, scripts, product education, and reporting all add real commercial value."
    ],
    cards: [
      ["Average views", "Expected reach is usually stronger than follower count for a single deliverable."],
      ["Audience fit", "Niche trust can make a smaller creator more valuable than a broad account."],
      ["Usage rights", "Paid ads, whitelisting, and broader licensing should increase the quote."],
      ["Exclusivity", "Blocking competitor deals should be priced as a separate campaign term."]
    ]
  },
  {
    title: "Common influencer rate inputs",
    paragraphs: [
      "Use the same inputs every time you quote a brand or compare creators. That makes rate discussions easier to explain and defend."
    ],
    table: {
      headers: ["Input", "Why it matters", "Pricing effect"],
      rows: [
        ["Average views", "Expected campaign reach", "Higher views usually raise media value."],
        ["Engagement rate", "Audience response quality", "Strong engagement supports a premium."],
        ["Usage rights", "Brand reuse value", "Paid rights increase the quote."],
        ["Exclusivity", "Lost future opportunities", "Longer category locks cost more."]
      ]
    }
  }
];

export default function InfluencerRateCalculatorPage() {
  return (
    <CalculatorToolPage
      tool={tool}
      calculator={<InfluencerRateCalculator />}
      heroEyebrow="Influencer Marketing"
      heroDescription="Estimate influencer rates for TikTok, Instagram, and YouTube campaigns using views, followers, engagement, niche, usage rights, and exclusivity."
      heroSecondaryDescription="Use low, recommended, and premium pricing ranges to plan sponsored posts, creator ads, and campaign bundles."
      heroCards={[
        ["Average views", "Price around expected reach, not just follower count."],
        ["Usage rights", "Charge more when brands want paid ads or broad reuse."],
        ["Exclusivity", "Account for category lockouts that limit future deals."]
      ]}
      audienceLead="Use this calculator before pitching a brand, reviewing an influencer quote, planning a paid creator campaign, or building a media kit."
      audienceCards={[
        ["Influencers", "Set a defensible sponsored post starting point."],
        ["Creator Managers", "Standardize pricing inputs across talent."],
        ["Brand Teams", "Compare creator quotes with campaign value."],
        ["Agencies", "Plan rates, usage rights, and exclusivity terms."]
      ]}
      usageSteps={[
        ["Start with averages", "Use recent average views, not one viral outlier."],
        ["Define rights", "Separate organic posting from paid usage and buyouts."],
        ["Pressure-test value", "Compare the rate with engagement, CPM, CPC, and expected campaign outcomes."]
      ]}
      guideEyebrow="Influencer pricing guide"
      guideTitle="Price creator campaigns with clear inputs"
      guideDescription="Influencer rates are easier to defend when reach, engagement, usage rights, exclusivity, and creative scope are visible."
      contentBlocks={contentBlocks}
      faqItems={faqItems}
      relatedToolSlugs={[
        "tiktok-engagement-rate-calculator",
        "ugc-rate-calculator",
        "tiktok-cpm-calculator",
        "youtube-revenue-calculator"
      ]}
    />
  );
}
