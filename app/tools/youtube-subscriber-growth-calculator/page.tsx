import type { Metadata } from "next";
import { CalculatorToolPage, type ContentBlock } from "@/components/calculator-tool-page";
import { YouTubeSubscriberGrowthCalculator } from "@/components/youtube-subscriber-growth-calculator";
import { getCreatorTool } from "@/data/creator-tools";
import { createToolMetadata } from "@/lib/seo/tool-metadata";

const tool = getCreatorTool("youtube-subscriber-growth-calculator")!;

export const metadata: Metadata = createToolMetadata(tool);

const faqItems = [
  {
    question: "How do you calculate YouTube subscriber growth?",
    answer:
      "Multiply monthly views by the subscriber conversion rate. For example, 300,000 monthly views at a 0.8% subscriber conversion rate creates about 2,400 new subscribers per month."
  },
  {
    question: "What is subscriber conversion rate?",
    answer:
      "Subscriber conversion rate is the percentage of viewers who subscribe after watching. It helps show whether views are building the channel or only creating temporary reach."
  },
  {
    question: "What is a good YouTube subscriber conversion rate?",
    answer:
      "A good rate depends on niche, traffic source, video format, and channel size. Search-heavy tutorials, strong series, and clear channel promises can convert differently from broad entertainment or Shorts traffic."
  },
  {
    question: "How long will it take to reach a subscriber goal?",
    answer:
      "Divide the gap between current subscribers and target subscribers by estimated new subscribers per month. The calculator does this automatically and shows a planning timeline."
  },
  {
    question: "Do Shorts subscribers grow differently from long-form subscribers?",
    answer:
      "Yes. Shorts can create fast subscriber spikes, but those subscribers may behave differently from long-form subscribers. Track returning viewers, long-form watch time, and engagement quality alongside subscriber count."
  },
  {
    question: "How can I increase YouTube subscriber growth?",
    answer:
      "Improve growth by clarifying the channel promise, building repeatable topic clusters, improving retention, publishing consistently, creating series, and giving viewers a specific reason to subscribe."
  }
];

const contentBlocks: ContentBlock[] = [
  {
    title: "What this calculator does",
    paragraphs: [
      "This YouTube Subscriber Growth Calculator forecasts how many new subscribers a channel may add from monthly views and subscriber conversion rate. It also estimates subscribers per upload, a 12-month subscriber forecast, a growth band, and the time needed to reach a target subscriber count.",
      "The calculator is useful because views and subscribers answer different questions. Views show reach. Subscriber growth shows whether that reach is building a durable audience that may return, watch future videos, support sponsorships, and increase channel value."
    ]
  },
  {
    title: "How to use it",
    paragraphs: [
      "Enter the current subscriber count, recent monthly views, subscriber conversion rate, monthly upload cadence, and a target subscriber goal. If you do not know your subscriber conversion rate, divide new subscribers from a period by views from that same period, then multiply by 100.",
      "Use the result as a planning estimate. If the timeline to the target is too long, the channel can improve three levers: more qualified views, a higher subscriber conversion rate, or a steadier publishing cadence that creates more chances to convert viewers."
    ]
  },
  {
    title: "Formula explanation",
    paragraphs: [
      "The main formula multiplies monthly views by subscriber conversion rate. A channel with 300,000 monthly views and a 0.8% conversion rate adds about 2,400 subscribers per month. Subscribers per upload divides that monthly gain by upload cadence.",
      "The target timeline divides the subscriber gap by estimated monthly new subscribers. This makes the goal easier to pressure-test because a target that looks exciting may require more views, better conversion, or a different content strategy."
    ],
    formula: "New subscribers per month = monthly views x subscriber conversion rate"
  },
  {
    title: "Example calculation",
    paragraphs: [
      "Suppose a channel has 25,000 subscribers, 300,000 monthly views, a 0.8% subscriber conversion rate, and 8 uploads per month. Estimated new subscribers are 300,000 multiplied by 0.8%, which equals 2,400 per month.",
      "At that pace, the channel would have about 53,800 subscribers after 12 months. To reach 100,000 subscribers from 25,000, the channel needs 75,000 more subscribers. Dividing 75,000 by 2,400 creates a timeline of about 32 months."
    ]
  },
  {
    title: "Common mistakes to avoid",
    paragraphs: [
      "A common mistake is treating all views as equally valuable. A viewer from search, browse, suggested videos, Shorts, external links, and ads may subscribe at different rates. Subscriber growth becomes easier to improve when you know which traffic sources convert.",
      "Another mistake is asking viewers to subscribe without a clear channel promise. Viewers subscribe when they understand what future videos they will get and why those videos matter to them."
    ],
    cards: [
      ["Vague promise", "A clear channel topic gives viewers a reason to subscribe."],
      ["Wrong traffic mix", "Shorts, search, suggested, and browse can convert differently."],
      ["Low cadence", "Too few uploads can make growth data noisy and slow."],
      ["No series path", "Connected videos and playlists give new viewers a reason to stay."]
    ]
  },
  {
    title: "Growth levers to compare",
    paragraphs: [
      "Subscriber growth improves when views, conversion rate, and upload cadence work together."
    ],
    table: {
      headers: ["Lever", "What it changes", "How to improve it"],
      rows: [
        ["Monthly views", "Top-of-funnel reach", "Improve topics, titles, thumbnails, and distribution."],
        ["Conversion rate", "Viewers who subscribe", "Clarify the channel promise and next-video reason."],
        ["Upload cadence", "More conversion chances", "Publish repeatable formats on a steady schedule."],
        ["Returning viewers", "Audience durability", "Build series, playlists, and consistent topic clusters."]
      ]
    }
  }
];

export default function YouTubeSubscriberGrowthCalculatorPage() {
  return (
    <CalculatorToolPage
      tool={tool}
      calculator={<YouTubeSubscriberGrowthCalculator />}
      heroEyebrow="YouTube Growth Tools"
      heroDescription="Forecast YouTube subscriber growth from monthly views, subscriber conversion rate, upload cadence, and a target subscriber goal."
      heroSecondaryDescription="Use the estimate to see whether a channel needs more reach, better conversion, or a stronger publishing system."
      heroCards={[
        ["Monthly views", "Use recent channel views or a realistic growth target."],
        ["Conversion rate", "Estimate what share of viewers become subscribers."],
        ["Target timeline", "See how long it may take to reach the next subscriber goal."]
      ]}
      audienceLead="Use this calculator when planning YouTube growth, setting subscriber targets, reviewing content strategy, or reporting channel momentum."
      audienceCards={[
        ["YouTubers", "Forecast subscriber milestones from current traffic."],
        ["Channel Managers", "Pressure-test content plans and upload cadence."],
        ["Creator Agencies", "Report growth pace with clear assumptions."],
        ["Brand Teams", "Evaluate whether a channel is building durable audience."]
      ]}
      usageSteps={[
        ["Use matching periods", "Calculate conversion from subscribers and views in the same month."],
        ["Set a real target", "Enter the subscriber milestone you want to reach next."],
        ["Improve one lever", "Raise views, conversion rate, or cadence instead of guessing."]
      ]}
      guideEyebrow="YouTube growth guide"
      guideTitle="Turn views into durable audience growth"
      guideDescription="Subscriber growth shows whether YouTube reach is building a repeat audience, not only creating temporary video views."
      contentBlocks={contentBlocks}
      faqItems={faqItems}
      relatedToolSlugs={[
        "youtube-revenue-calculator",
        "youtube-shorts-money-calculator",
        "youtube-engagement-rate-calculator",
        "influencer-rate-calculator"
      ]}
    />
  );
}
