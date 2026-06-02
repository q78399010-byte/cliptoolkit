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
    title: "What this calculator does",
    paragraphs: [
      "This Influencer Rate Calculator estimates a realistic sponsored content rate from the inputs that usually shape a creator deal: platform, average views, followers, engagement rate, niche, deliverable type, usage rights, and exclusivity. It returns a low range, a recommended rate, a premium rate, estimated engagements, and cost per engagement so creators and brands can start a negotiation with more structure.",
      "The calculator is not a replacement for judgment or a contract. It is a planning tool that turns campaign assumptions into a defensible range. A creator with a smaller audience can still deserve a strong rate when the niche is valuable, average views are consistent, engagement is active, and the brand wants paid usage. A large creator may need a lower quote if recent views are weak, the audience is broad, or the campaign deliverable has limited commercial value."
    ]
  },
  {
    title: "How to use it",
    paragraphs: [
      "Start with recent average views, not a single viral post. A practical average might use the last 10 to 20 posts in the same format, excluding obvious outliers. Enter follower count as a floor signal, then add engagement rate to estimate how much active response the campaign may create. Choose the platform, niche, deliverable, usage rights, and exclusivity option that best matches the brand brief.",
      "Use the recommended rate as the middle of the conversation, not the only acceptable price. The low range can help when the brand fit is strong, the scope is simple, or the creator wants to test a relationship. The premium range is more appropriate when there is difficult production, a tight deadline, paid media usage, category exclusivity, a valuable audience, or additional approval work. Always define the deliverables, usage window, revision rounds, reporting, payment terms, and what costs extra."
    ]
  },
  {
    title: "Formula explanation",
    paragraphs: [
      "The calculator starts with media value by multiplying average views by a platform CPM. It also calculates a follower-based floor so the estimate does not fall below a basic professional baseline when a creator has audience value but modest current reach. The base value is the higher of those two numbers. From there, the calculator applies multipliers for niche, deliverable type, usage rights, exclusivity, and engagement quality, then rounds the result into a cleaner quote.",
      "Each multiplier represents a real commercial factor. Finance, B2B, tech, beauty, and fitness campaigns can carry different value because the audience intent and product margins are different. A dedicated YouTube video takes more work than a short post. Paid usage lets the brand reuse the creator's content as advertising. Exclusivity blocks future category deals. Engagement quality adjusts the estimate when the audience is more or less active than a basic planning benchmark."
    ],
    formula:
      "Estimated rate = media value x niche x deliverable x usage rights x exclusivity x engagement quality"
  },
  {
    title: "Example calculation",
    paragraphs: [
      "Consider a TikTok creator with 50,000 average views, 75,000 followers, a 5% engagement rate, and a beauty or fashion audience. For a short-form video with organic posting only and no exclusivity, the calculator starts with TikTok media value. At an $18 CPM, 50,000 average views create a media value of about $900. The follower floor is 75,000 multiplied by 0.004, or $300, so media value remains the stronger base.",
      "The beauty or fashion niche multiplier raises the base, and the 5% engagement rate adds an engagement quality lift. With a standard short-form deliverable, organic usage, and no exclusivity, the recommended estimate rounds to about $1,150. The low range is about $850, and the premium range is about $1,700. Estimated engagements are 50,000 multiplied by 5%, or 2,500, so the recommended quote implies a cost per engagement near $0.46. If the brand adds 90 days of paid usage or category exclusivity, the rate should rise."
    ]
  },
  {
    title: "Common mistakes to avoid",
    paragraphs: [
      "The biggest mistake is pricing only from follower count. Followers can show account size, but average views usually describe expected campaign reach more directly. A creator with 40,000 followers and 30,000 average views may be more valuable for one deliverable than a creator with 200,000 followers and 8,000 average views. The calculator keeps follower count in the model, but it does not let followers override weak delivery by default.",
      "Another common mistake is treating usage rights as a small detail. Organic posting, paid social usage, whitelisting, landing page reuse, email reuse, raw footage, editing rights, and full buyouts are not the same deal. If the brand can turn the creator's content into ads or use it across many channels, the quote should reflect that extra value. Exclusivity also needs a separate price because it can block future revenue from competing brands."
    ],
    cards: [
      ["Using one viral post", "Base rates on recent averages so the quote is not built around an outlier."],
      ["Bundling rights for free", "Separate organic posting from paid usage, whitelisting, and broad buyouts."],
      ["Forgetting exclusivity", "Category lockouts should be priced by duration, market, and opportunity cost."],
      ["Skipping scope details", "Define deliverables, revisions, deadlines, reporting, and approval rounds before quoting."]
    ]
  },
  {
    title: "What affects influencer rates?",
    paragraphs: [
      "Influencer pricing changes when the brand needs more than one organic post. Paid usage, whitelisting, category exclusivity, rush deadlines, scripts, product education, and reporting all add real commercial value, and each should be visible before either side treats the number as final."
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
