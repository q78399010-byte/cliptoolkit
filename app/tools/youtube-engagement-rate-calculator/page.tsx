import type { Metadata } from "next";
import { CalculatorToolPage, type ContentBlock } from "@/components/calculator-tool-page";
import { YouTubeEngagementRateCalculator } from "@/components/youtube-engagement-rate-calculator";
import { getCreatorTool } from "@/data/creator-tools";
import { createToolMetadata } from "@/lib/seo/tool-metadata";

const tool = getCreatorTool("youtube-engagement-rate-calculator")!;

export const metadata: Metadata = createToolMetadata(tool);

const faqItems = [
  {
    question: "How do you calculate YouTube engagement rate?",
    answer:
      "Add likes, comments, and shares, then divide that total by views or subscribers. The view-based rate is usually better for judging one video, while the subscriber-based rate helps compare channel-level response."
  },
  {
    question: "Should YouTube engagement rate use views or subscribers?",
    answer:
      "Use views when judging a specific video because it compares engagement with the people who actually saw the video. Use subscribers when you need a channel-level media kit or sponsorship comparison."
  },
  {
    question: "What counts as engagement on YouTube?",
    answer:
      "Common YouTube engagement signals include likes, comments, shares, playlist saves, subscriptions, and clicks. This calculator uses likes, comments, and shares because they are simple inputs for public video analysis."
  },
  {
    question: "What is a good YouTube engagement rate?",
    answer:
      "A good YouTube engagement rate depends on niche, video length, traffic source, channel size, and publish age. Compare similar videos on the same channel before using one universal benchmark."
  },
  {
    question: "Why are comments important for YouTube engagement?",
    answer:
      "Comments require more effort than likes and can show stronger viewer involvement. They can help creators understand topic resonance, objections, community trust, and sponsorship response."
  },
  {
    question: "Can engagement rate help price YouTube sponsorships?",
    answer:
      "Yes. Engagement rate can support sponsorship pricing, but it should be paired with average views, audience fit, retention, niche value, integration depth, usage rights, and conversion goals."
  }
];

const contentBlocks: ContentBlock[] = [
  {
    title: "What this calculator does",
    paragraphs: [
      "This YouTube Engagement Rate Calculator turns public video response into a cleaner performance snapshot. It adds likes, comments, and shares, then compares that total with either video views or subscriber count. The result is a view-based engagement rate, subscriber-based engagement rate, total engagements, comment rate, and a simple quality label.",
      "The calculator is useful when views alone do not explain content quality. A video can receive many views from search, browse, Shorts, or suggested traffic, but the stronger question is whether viewers cared enough to like, comment, share, or continue deeper into the channel."
    ]
  },
  {
    title: "How to use it",
    paragraphs: [
      "Start with one video or a consistent set of similar videos. Enter views, subscribers, likes, comments, and shares from the same reporting window. If you are auditing a sponsorship video, use the campaign video's final or current public metrics.",
      "Read the view-based engagement rate first for single-video quality. Use the subscriber-based engagement rate when comparing channels for media kits, sponsorship outreach, or creator selection. Then review the comment rate because comments often reveal stronger involvement than passive likes."
    ]
  },
  {
    title: "Formula explanation",
    paragraphs: [
      "The main formula adds likes, comments, and shares, then divides that number by views. The calculator also divides total engagements by subscribers to show how much visible response the video created relative to the channel's owned audience.",
      "Both versions are useful, but they answer different questions. Views ask how responsive the reached audience was. Subscribers ask how much response the video produced compared with the channel base. Use both when evaluating YouTube creators for brand campaigns."
    ],
    formula: "Engagement rate = (likes + comments + shares) / views x 100"
  },
  {
    title: "Example calculation",
    paragraphs: [
      "Imagine a YouTube video has 75,000 views, 18,000 subscribers, 4,200 likes, 310 comments, and 180 shares. Total engagements are 4,690. The view-based engagement rate is 4,690 divided by 75,000, multiplied by 100, which equals about 6.25%.",
      "The subscriber-based rate is 4,690 divided by 18,000, multiplied by 100, which equals about 26.06%. That higher number may show that the video reached beyond the subscriber base or that subscribers were highly active around the topic."
    ]
  },
  {
    title: "Common mistakes to avoid",
    paragraphs: [
      "A common mistake is comparing unlike videos. A product review, livestream replay, Shorts clip, educational tutorial, and entertainment video can all attract different engagement behavior. Compare videos with similar length, topic, traffic source, and channel size.",
      "Another mistake is treating likes as the only signal. Likes are useful, but comments and shares can reveal stronger intent. For sponsorships, engagement quality matters because brands care about trust, consideration, and action, not only applause."
    ],
    cards: [
      ["Mixing formats", "Compare long-form with long-form and Shorts with Shorts."],
      ["Ignoring publish age", "Newer videos may not have had time to collect comments and shares."],
      ["Counting likes only", "Include comments and shares when judging response quality."],
      ["Missing traffic source", "Search, suggested, browse, and Shorts can create different behavior."]
    ]
  },
  {
    title: "Engagement signals to compare",
    paragraphs: [
      "Use the engagement mix to understand what kind of response the video created, not only how large the response was."
    ],
    table: {
      headers: ["Signal", "What it suggests", "How to improve it"],
      rows: [
        ["Likes", "Light positive response", "Make the payoff clear and satisfying."],
        ["Comments", "Conversation or strong opinion", "Ask for specific examples or choices."],
        ["Shares", "Useful or social value", "Add clearer takeaways and repeatable ideas."],
        ["Subscriber rate", "Channel fit", "Clarify the channel promise and next video path."]
      ]
    }
  }
];

export default function YouTubeEngagementRateCalculatorPage() {
  return (
    <CalculatorToolPage
      tool={tool}
      calculator={<YouTubeEngagementRateCalculator />}
      heroEyebrow="YouTube Tools"
      heroDescription="Calculate YouTube engagement rate from likes, comments, shares, views, and subscribers."
      heroSecondaryDescription="Use view-based and subscriber-based engagement rates to compare videos, evaluate creator quality, and support sponsorship pricing."
      heroCards={[
        ["View-based ER", "Best for judging a single YouTube video or campaign upload."],
        ["Subscriber-based ER", "Useful for channel-level reporting and creator comparisons."],
        ["Comment quality", "See whether viewers are responding beyond passive likes."]
      ]}
      audienceLead="Use this calculator when auditing YouTube videos, building a media kit, selecting creators, or reporting sponsorship performance."
      audienceCards={[
        ["YouTubers", "Track which topics earn active response."],
        ["Creator Agencies", "Compare videos beyond view count."],
        ["Influencer Marketers", "Evaluate creators before sponsorship spend."],
        ["Brand Teams", "Report campaign response with clearer context."]
      ]}
      usageSteps={[
        ["Enter video metrics", "Use metrics from one video or a consistent group of similar videos."],
        ["Compare both rates", "Use views for video response and subscribers for channel context."],
        ["Read the mix", "Review comments and shares to understand engagement quality."]
      ]}
      guideEyebrow="YouTube engagement guide"
      guideTitle="Use engagement rate as a quality signal"
      guideDescription="Views show reach. Engagement rate helps show whether the reached audience cared enough to respond, discuss, or share."
      contentBlocks={contentBlocks}
      faqItems={faqItems}
      relatedToolSlugs={[
        "youtube-revenue-calculator",
        "youtube-cpm-calculator",
        "youtube-subscriber-growth-calculator",
        "influencer-rate-calculator"
      ]}
    />
  );
}
