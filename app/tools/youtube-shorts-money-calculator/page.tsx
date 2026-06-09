import type { Metadata } from "next";
import { CalculatorToolPage, type ContentBlock } from "@/components/calculator-tool-page";
import { YouTubeShortsMoneyCalculator } from "@/components/youtube-shorts-money-calculator";
import { getCreatorTool } from "@/data/creator-tools";
import { createToolMetadata } from "@/lib/seo/tool-metadata";

const tool = getCreatorTool("youtube-shorts-money-calculator")!;

export const metadata: Metadata = createToolMetadata(tool);

const faqItems = [
  {
    question: "How do you estimate YouTube Shorts earnings?",
    answer:
      "Multiply monthly Shorts views by Shorts RPM divided by 1,000. This calculator also estimates long-form lift and extra monthly revenue from sponsors, affiliates, products, or other creator offers."
  },
  {
    question: "What is YouTube Shorts RPM?",
    answer:
      "Shorts RPM is estimated revenue per 1,000 Shorts views. It can be much lower than long-form RPM, so creators often use Shorts for discovery and monetize through longer videos or off-platform offers."
  },
  {
    question: "Do YouTube Shorts pay less than long-form videos?",
    answer:
      "Shorts often pay less per 1,000 views than long-form videos because viewing behavior and ad inventory are different. Shorts can still be valuable when they grow subscribers, send viewers to long-form videos, or support sponsors."
  },
  {
    question: "What is long-form lift from Shorts?",
    answer:
      "Long-form lift is the estimated share of Shorts viewers who move into longer videos. Even a small lift can matter because long-form videos often have higher RPM, deeper trust, and better sponsorship inventory."
  },
  {
    question: "Can Shorts make money without AdSense?",
    answer:
      "Yes. Shorts can support sponsors, affiliate offers, UGC packages, products, services, memberships, email lists, and long-form channel growth. Many creators treat ad revenue as only one part of Shorts value."
  },
  {
    question: "Is this YouTube Shorts Money Calculator accurate?",
    answer:
      "This calculator is a planning tool, not a payout guarantee. Actual Shorts revenue depends on eligibility, viewer country, ad demand, music usage, channel quality, and monetization mix."
  }
];

const contentBlocks: ContentBlock[] = [
  {
    title: "What this calculator does",
    paragraphs: [
      "This YouTube Shorts Money Calculator estimates monthly value from Shorts views, Shorts RPM, long-form lift, and extra creator revenue. It separates direct Shorts ad revenue from the revenue that may come when Shorts send viewers into longer videos or other monetization paths.",
      "The calculator is designed for creators who know Shorts can produce large reach but want a clearer business estimate. A million Shorts views may not produce the same direct ad revenue as a million long-form views, but Shorts can still create meaningful value when they grow subscribers, build repeat viewers, and introduce viewers to higher-value offers."
    ]
  },
  {
    title: "How to use it",
    paragraphs: [
      "Enter your monthly Shorts views and a Shorts RPM assumption. If you have YouTube Analytics data, use your own RPM. If not, start conservative and test several scenarios. Then estimate the percentage of Shorts viewers who move into long-form videos, playlists, pinned links, or deeper channel sessions.",
      "Add sponsor, affiliate, product, or other monthly revenue when Shorts support monetization outside direct ad payouts. This field is important because many Shorts-heavy creators earn more from audience movement and offers than from Shorts ad revenue alone."
    ]
  },
  {
    title: "Formula explanation",
    paragraphs: [
      "The direct Shorts estimate is monthly Shorts views divided by 1,000, multiplied by Shorts RPM. Long-form lift uses Shorts views multiplied by the lift rate, then applies long-form RPM to those estimated longer video views.",
      "The total estimate adds direct Shorts revenue, long-form lift revenue, and extra monthly monetization. Low and high scenarios adjust those pieces to create a practical planning range instead of one fragile number."
    ],
    formula:
      "Shorts value = (Shorts views / 1,000 x Shorts RPM) + long-form lift + extra revenue"
  },
  {
    title: "Example calculation",
    paragraphs: [
      "Suppose a channel receives 1,000,000 monthly Shorts views at a $0.08 Shorts RPM. Direct Shorts revenue is 1,000,000 divided by 1,000, multiplied by $0.08, which equals $80.",
      "If 1.5% of Shorts viewers move into long-form videos, that creates 15,000 estimated long-form views. At a $3.50 long-form RPM, those views add about $52.50. If the creator also earns $150 from sponsors or affiliates, the recommended monthly estimate becomes about $282.50."
    ]
  },
  {
    title: "Common mistakes to avoid",
    paragraphs: [
      "The biggest mistake is judging Shorts only by direct ad revenue. Shorts can look weak when measured only by RPM, but they can be strong if they attract subscribers, create recurring viewers, or move the right audience into long-form videos and offers.",
      "Another mistake is assuming every Shorts view has the same value. Viewer country, topic, retention, music usage, niche intent, and whether the video connects to the broader channel all affect monetization quality."
    ],
    cards: [
      ["Ignoring channel fit", "Viral Shorts are less useful when viewers do not understand the channel promise."],
      ["No next step", "Pinned comments, playlists, and follow-up videos help Shorts create deeper value."],
      ["Overstating RPM", "Use conservative Shorts RPM assumptions until analytics prove otherwise."],
      ["Missing sponsors", "Shorts can support brand deals, affiliates, and product funnels beyond ads."]
    ]
  },
  {
    title: "Shorts monetization paths",
    paragraphs: [
      "Shorts work best when the creator knows which revenue path the format is supposed to support."
    ],
    table: {
      headers: ["Revenue path", "How it earns", "Best signal"],
      rows: [
        ["Shorts ads", "RPM on Shorts views", "Consistent qualified view volume."],
        ["Long-form lift", "Shorts viewers watch longer videos", "Playlist clicks and returning viewers."],
        ["Sponsors", "Paid brand integrations", "Audience fit and repeatable reach."],
        ["Affiliates/products", "Viewer action after discovery", "Clicks, email capture, and conversion rate."]
      ]
    }
  }
];

export default function YouTubeShortsMoneyCalculatorPage() {
  return (
    <CalculatorToolPage
      tool={tool}
      calculator={<YouTubeShortsMoneyCalculator />}
      heroEyebrow="YouTube Shorts Tools"
      heroDescription="Estimate YouTube Shorts earnings from monthly Shorts views, Shorts RPM, long-form lift, and extra creator monetization."
      heroSecondaryDescription="Use the calculator to separate direct Shorts revenue from channel growth, sponsor upside, and offer-driven value."
      heroCards={[
        ["Shorts RPM", "Estimate direct revenue per 1,000 Shorts views."],
        ["Long-form lift", "Model how Shorts can send viewers into deeper videos."],
        ["Extra revenue", "Include sponsors, affiliates, products, and other creator income."]
      ]}
      audienceLead="Use this calculator before judging whether a Shorts strategy is only creating views or building a monetizable channel."
      audienceCards={[
        ["Shorts Creators", "Estimate monthly Shorts value beyond views."],
        ["YouTubers", "Compare Shorts discovery with long-form revenue."],
        ["Creator Agencies", "Model channel value for short-form strategy."],
        ["Brand Teams", "Understand where Shorts sponsorship value may come from."]
      ]}
      usageSteps={[
        ["Start with views", "Use recent monthly Shorts views or a realistic growth target."],
        ["Set conservative RPM", "Replace assumptions with YouTube Analytics when available."],
        ["Add lift and offers", "Include long-form movement and off-platform monetization."]
      ]}
      guideEyebrow="Shorts revenue guide"
      guideTitle="Read Shorts as discovery plus monetization"
      guideDescription="Shorts ad revenue can be modest, but Shorts can still create meaningful creator income when they build subscribers, trust, and higher-value sessions."
      contentBlocks={contentBlocks}
      faqItems={faqItems}
      relatedToolSlugs={[
        "youtube-revenue-calculator",
        "youtube-subscriber-growth-calculator",
        "youtube-engagement-rate-calculator",
        "tiktok-money-calculator"
      ]}
    />
  );
}
