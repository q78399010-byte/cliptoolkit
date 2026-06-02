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
    title: "What this calculator does",
    paragraphs: [
      "This TikTok Engagement Rate Calculator turns the public signals on a TikTok post into a cleaner performance snapshot. Instead of looking at likes alone, it adds likes, comments, shares, and saves, then compares that total with either video views or follower count. The result is a view-based engagement rate, a follower-based engagement rate, total engagements, share and save rate, comment rate, and a simple quality label that helps you read the numbers faster.",
      "The calculator is useful when you want to understand whether a post created active response, not just reach. A video can collect a large number of views because the algorithm tested it with a broad audience, but that does not always mean viewers cared enough to comment, save, or share. For creators, the estimate can support media kits and content reviews. For brands and agencies, it gives a practical way to compare creators beyond follower count and spot posts with stronger audience intent."
    ]
  },
  {
    title: "How to use it",
    paragraphs: [
      "Start with one TikTok video or a consistent set of similar videos. Enter the views, followers, likes, comments, shares, and saves from the same reporting window. If you are auditing one post, use the metrics shown for that post. If you are comparing a creator over time, use averages from recent videos in the same format, such as product demos, tutorials, reviews, or talking-head posts.",
      "Read the view-based engagement rate first when judging a specific video because it compares responses with the people who actually saw the post. Use the follower-based rate when you need an account-level signal for a media kit or creator comparison. Then look below the headline number. A post with many likes but few saves or shares may be entertaining but not very useful. A post with modest views and strong saves can be valuable for education, shopping research, or B2B content."
    ]
  },
  {
    title: "Formula explanation",
    paragraphs: [
      "The main formula adds the engagement actions that usually show up on a public TikTok post: likes, comments, shares, and saves. That total is divided by views to calculate engagement rate by views. The same engagement total is also divided by followers to calculate engagement rate by followers. Both numbers are percentages, so the calculator multiplies the ratio by 100.",
      "The two denominators answer different questions. Views ask, \"Of the people who saw this video, how many acted?\" Followers ask, \"How much response did this post create compared with the creator's owned audience?\" On TikTok, the view-based rate is often more useful for single videos because posts can reach many non-followers. The follower-based rate is still helpful for account reporting, especially when every creator is being measured with the same method."
    ],
    formula: "Engagement rate = (likes + comments + shares + saves) / views x 100"
  },
  {
    title: "Example calculation",
    paragraphs: [
      "Imagine a TikTok video has 50,000 views, 12,000 followers on the account, 3,200 likes, 180 comments, 240 shares, and 420 saves. Total engagements are 3,200 + 180 + 240 + 420, which equals 4,040. The view-based engagement rate is 4,040 divided by 50,000, then multiplied by 100, for an estimated 8.08%. The follower-based engagement rate is 4,040 divided by 12,000, then multiplied by 100, for about 33.67%.",
      "Those two numbers tell different stories. The 8.08% view-based rate says the post created strong response from the people it reached. The higher follower-based rate says the post performed well relative to the creator's follower base, but it may also show that TikTok pushed the video beyond followers. The share and save rate is 660 divided by 50,000, or 1.32%, which is useful if the goal is word of mouth, reference value, or creator content that a brand may want to reuse."
    ]
  },
  {
    title: "Common mistakes to avoid",
    paragraphs: [
      "The biggest mistake is treating one engagement rate as a universal grade. A comedy post, a product review, a finance explainer, and a beauty tutorial can all earn engagement in different ways. Compare posts within the same niche, format, and audience size before calling a result good or bad.",
      "Another mistake is using mismatched data. Views, followers, likes, comments, shares, and saves should come from the same post or the same group of posts. Do not combine one viral video's views with another post's engagement count. Also avoid judging a campaign only by likes. Comments, shares, and saves often show stronger intent, and they can matter more when a brand cares about trust, education, or purchase consideration."
    ],
    cards: [
      ["Counting likes only", "Likes are easy to earn. Include comments, shares, and saves for a fuller view of audience response."],
      ["Mixing time windows", "Use metrics from the same post, campaign period, or recent average set."],
      ["Ignoring format", "Compare tutorials with tutorials, reviews with reviews, and entertainment posts with similar posts."],
      ["Overpricing one spike", "Use engagement rate with average views, audience fit, usage rights, and deliverable scope."]
    ]
  },
  {
    title: "Engagement signals to compare",
    paragraphs: [
      "Do not treat every engagement as equal. Likes are useful, but comments require more effort, shares show social value, and saves often mean the viewer wants to return later. When a post is being used to price an influencer campaign, these differences matter because they describe the kind of attention the creator is creating."
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
