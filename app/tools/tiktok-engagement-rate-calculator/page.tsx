import type { Metadata } from "next";
import { CalculatorToolPage, type ContentBlock } from "@/components/calculator-tool-page";
import { TikTokEngagementRateCalculator } from "@/components/tiktok-engagement-rate-calculator";
import { getCreatorTool } from "@/data/creator-tools";
import { createToolMetadata } from "@/lib/seo/tool-metadata";

const tool = getCreatorTool("tiktok-engagement-rate-calculator")!;

export const metadata: Metadata = createToolMetadata(tool);

const faqItems = [
  {
    question: "How do you calculate TikTok engagement rate?",
    answer:
      "Add likes, comments, shares, and saves, then divide that total by views or followers. The view-based formula is usually better for single videos because it compares engagement to the number of people who actually saw the post."
  },
  {
    question: "Should TikTok engagement rate use views or followers?",
    answer:
      "Use views when judging a specific video and followers when comparing account-level audience activity. View-based engagement is often more practical for TikTok because videos can reach many non-followers."
  },
  {
    question: "What counts as engagement on TikTok?",
    answer:
      "Common engagement signals include likes, comments, shares, saves, and sometimes profile actions. This calculator uses likes, comments, shares, and saves because they are easy to collect from a public post."
  },
  {
    question: "What is a good TikTok engagement rate?",
    answer:
      "A good engagement rate depends on niche, account size, and content format. Instead of using one universal benchmark, compare posts within the same format and audience size, then look for repeatable improvements."
  },
  {
    question: "Why do saves and shares matter?",
    answer:
      "Saves and shares often show stronger intent than passive likes. They can indicate that a video is useful, reference-worthy, entertaining enough to send, or strong enough to support brand campaign pricing."
  },
  {
    question: "Can engagement rate help price influencer campaigns?",
    answer:
      "Yes. Engagement rate helps brands understand audience activity, but it should be paired with average views, audience fit, deliverables, usage rights, and conversion goals before setting a final campaign rate."
  }
];

const contentBlocks: ContentBlock[] = [
  {
    title: "What is a TikTok Engagement Rate Calculator?",
    paragraphs: [
      "A TikTok Engagement Rate Calculator turns likes, comments, shares, saves, views, and followers into clear engagement percentages. It helps creators understand whether a video only reached people or actually made them respond.",
      "For brands and agencies, engagement rate is a quick way to compare creators beyond follower count. A smaller creator with active comments, saves, and shares may be more useful than a larger account with passive reach."
    ]
  },
  {
    title: "TikTok engagement rate formula",
    paragraphs: [
      "The most practical single-video formula divides total engagements by views. Account-level reporting can also divide total engagements by followers, especially when comparing creators in the same niche."
    ],
    formula: "Engagement rate = (likes + comments + shares + saves) / views x 100"
  },
  {
    title: "What affects TikTok engagement rate?",
    paragraphs: [
      "Engagement changes by content format, hook strength, audience fit, niche, viewer intent, posting time, and whether the video gives people a reason to respond. A tutorial may earn more saves, while a discussion post may earn more comments."
    ],
    cards: [
      ["Hook clarity", "Viewers need to understand the promise of the video immediately."],
      ["Audience fit", "Engagement is stronger when the topic matches why people followed or watched."],
      ["Save value", "Checklists, examples, scripts, and frameworks often increase saves."],
      ["Comment prompt", "Specific prompts usually perform better than broad questions."]
    ]
  },
  {
    title: "Engagement signals to compare",
    paragraphs: [
      "Do not treat every engagement as equal. Likes are easy, comments require more effort, and saves or shares can show stronger usefulness or entertainment value."
    ],
    table: {
      headers: ["Signal", "What it suggests", "How to improve it"],
      rows: [
        ["Likes", "Light positive feedback", "Make the payoff obvious and satisfying."],
        ["Comments", "Conversation or disagreement", "Ask for a specific opinion or example."],
        ["Shares", "Social value", "Make the video useful, funny, or identity-driven."],
        ["Saves", "Reference value", "Add steps, checklists, examples, or repeatable advice."]
      ]
    }
  }
];

export default function TikTokEngagementRateCalculatorPage() {
  return (
    <CalculatorToolPage
      tool={tool}
      calculator={<TikTokEngagementRateCalculator />}
      heroEyebrow="TikTok Tools"
      heroDescription="Calculate TikTok engagement rate from likes, comments, shares, saves, views, and followers."
      heroSecondaryDescription="Use view-based and follower-based engagement rates to compare posts, evaluate creator quality, and support campaign pricing."
      heroCards={[
        ["View-based ER", "Best for judging a specific TikTok post or campaign creative."],
        ["Follower-based ER", "Useful for account-level comparisons and media kit reporting."],
        ["Quality signals", "Separate comments, saves, and shares from passive likes."]
      ]}
      audienceLead="Use this calculator when auditing creator performance, building a media kit, or deciding whether a TikTok post has enough audience response to scale."
      audienceCards={[
        ["TikTok Creators", "Track which formats earn active responses."],
        ["Influencer Marketers", "Compare creators beyond follower count."],
        ["Creator Agencies", "Audit campaign posts and report engagement quality."],
        ["UGC Creators", "Use engagement proof when pitching brands."]
      ]}
      usageSteps={[
        ["Enter post metrics", "Use metrics from one post or a consistent group of similar posts."],
        ["Compare both rates", "Use views for post quality and followers for account-level audience activity."],
        ["Review signals", "Look at saves, shares, and comments to understand why the rate moved."]
      ]}
      guideEyebrow="Engagement guide"
      guideTitle="Read TikTok engagement as a quality signal"
      guideDescription="Follower count is only a starting point. Engagement rate shows whether the audience is active enough to support reach, trust, and campaign value."
      contentBlocks={contentBlocks}
      faqItems={faqItems}
      relatedToolSlugs={[
        "tiktok-money-calculator",
        "influencer-rate-calculator",
        "tiktok-cpm-calculator",
        "ugc-rate-calculator"
      ]}
    />
  );
}
