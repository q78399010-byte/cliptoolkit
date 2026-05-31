export type ToolStatus = "Live" | "Coming Soon";

export type CreatorTool = {
  title: string;
  shortTitle: string;
  description: string;
  href: string;
  slug: string;
  category: string;
  categoryId: string;
  status: ToolStatus;
  cta: string;
  pageTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage: string;
  sitemap: boolean;
};

export type ToolCategory = {
  title: string;
  id: string;
  body: string;
};

export const toolCategories: ToolCategory[] = [
  {
    title: "TikTok Tools",
    id: "tiktok-tools",
    body:
      "Estimate TikTok revenue, engagement rate, CPM, CPC, posting cadence, and TikTok Shop creator ROI."
  },
  {
    title: "YouTube Tools",
    id: "youtube-tools",
    body: "Forecast YouTube RPM, sponsorship upside, Shorts performance, and monthly channel income."
  },
  {
    title: "UGC Pricing",
    id: "ugc-pricing",
    body: "Price UGC videos, usage rights, revisions, hooks, raw footage, retainers, and brand deliverables."
  },
  {
    title: "Influencer Marketing",
    id: "influencer-marketing",
    body: "Estimate influencer rates, campaign costs, engagement value, usage rights, and paid social economics."
  },
  {
    title: "Creator Finance",
    id: "creator-finance",
    body: "Plan creator income goals, sponsorship pricing, tax reserves, and campaign economics."
  }
];

export const creatorTools: CreatorTool[] = [
  {
    title: "TikTok Money Calculator",
    shortTitle: "TikTok Money",
    description: "Estimate creator earnings",
    href: "/tools/tiktok-money-calculator",
    slug: "tiktok-money-calculator",
    category: "TikTok Tools",
    categoryId: "tiktok-tools",
    status: "Live",
    cta: "Try Calculator",
    pageTitle: "TikTok Money Calculator (2026) | Estimate Creator Earnings Free",
    metaDescription:
      "Free TikTok Money Calculator. Estimate creator earnings using views, RPM, engagement rate, and posting frequency.",
    keywords: [
      "tiktok money calculator",
      "tiktok earnings calculator",
      "tiktok revenue calculator"
    ],
    ogImage: "/og/tiktok-money-calculator.svg",
    sitemap: true
  },
  {
    title: "TikTok Engagement Rate Calculator",
    shortTitle: "Engagement Rate",
    description: "Calculate TikTok engagement quality",
    href: "/tools/tiktok-engagement-rate-calculator",
    slug: "tiktok-engagement-rate-calculator",
    category: "TikTok Tools",
    categoryId: "tiktok-tools",
    status: "Live",
    cta: "Try Calculator",
    pageTitle: "TikTok Engagement Rate Calculator (2026) | Free ER Tool",
    metaDescription:
      "Free TikTok Engagement Rate Calculator. Calculate engagement rate by views and followers using likes, comments, shares, saves, views, and followers.",
    keywords: [
      "tiktok engagement rate calculator",
      "tiktok engagement calculator",
      "tiktok er calculator",
      "engagement rate calculator tiktok"
    ],
    ogImage: "/og/tiktok-engagement-rate-calculator.svg",
    sitemap: true
  },
  {
    title: "TikTok CPM Calculator",
    shortTitle: "TikTok CPM",
    description: "Calculate cost per 1,000 impressions",
    href: "/tools/tiktok-cpm-calculator",
    slug: "tiktok-cpm-calculator",
    category: "TikTok Tools",
    categoryId: "tiktok-tools",
    status: "Live",
    cta: "Try Calculator",
    pageTitle: "TikTok CPM Calculator (2026) | Calculate Cost Per 1,000 Impressions",
    metaDescription:
      "Free TikTok CPM Calculator. Calculate cost per 1,000 impressions from ad spend and impressions, then forecast reach from a TikTok ad budget.",
    keywords: [
      "tiktok cpm calculator",
      "tiktok ads cpm calculator",
      "cost per mille calculator",
      "tiktok ad cost calculator"
    ],
    ogImage: "/og/tiktok-cpm-calculator.svg",
    sitemap: true
  },
  {
    title: "TikTok CPC Calculator",
    shortTitle: "TikTok CPC",
    description: "Calculate cost per click and CTR",
    href: "/tools/tiktok-cpc-calculator",
    slug: "tiktok-cpc-calculator",
    category: "TikTok Tools",
    categoryId: "tiktok-tools",
    status: "Live",
    cta: "Try Calculator",
    pageTitle: "TikTok CPC Calculator (2026) | Calculate Cost Per Click",
    metaDescription:
      "Free TikTok CPC Calculator. Calculate cost per click, CTR, and clicks from TikTok ad spend, impressions, and link clicks.",
    keywords: [
      "tiktok cpc calculator",
      "tiktok cost per click calculator",
      "tiktok ads cpc",
      "tiktok ctr calculator"
    ],
    ogImage: "/og/tiktok-cpc-calculator.svg",
    sitemap: true
  },
  {
    title: "TikTok Shop ROI Calculator",
    shortTitle: "TikTok Shop ROI",
    description: "Estimate ad profit and ROAS",
    href: "/tools/tiktok-shop-roi-calculator",
    slug: "tiktok-shop-roi-calculator",
    category: "TikTok Tools",
    categoryId: "tiktok-tools",
    status: "Live",
    cta: "Try Calculator",
    pageTitle: "TikTok Shop ROI Calculator (2026) | Calculate Profit & ROAS",
    metaDescription:
      "Free TikTok Shop ROI Calculator. Estimate TikTok Shop revenue, ad spend efficiency, ROAS, net profit, and creator campaign performance.",
    keywords: [
      "tiktok shop roi calculator",
      "tiktok shop calculator",
      "tiktok shop profit calculator"
    ],
    ogImage: "/og/tiktok-shop-roi-calculator.svg",
    sitemap: true
  },
  {
    title: "UGC Rate Calculator",
    shortTitle: "UGC Rates",
    description: "Price brand collaborations",
    href: "/tools/ugc-rate-calculator",
    slug: "ugc-rate-calculator",
    category: "UGC Pricing",
    categoryId: "ugc-pricing",
    status: "Live",
    cta: "Try Calculator",
    pageTitle: "UGC Rate Calculator (2026) | How Much Should You Charge?",
    metaDescription:
      "Free UGC Rate Calculator. Estimate realistic creator rates for UGC videos, usage rights, revisions, experience level, turnaround, and monthly packages.",
    keywords: ["ugc rate calculator", "ugc pricing calculator", "ugc creator pricing"],
    ogImage: "/og/ugc-rate-calculator.svg",
    sitemap: true
  },
  {
    title: "Influencer Rate Calculator",
    shortTitle: "Influencer Rates",
    description: "Estimate sponsored post pricing",
    href: "/tools/influencer-rate-calculator",
    slug: "influencer-rate-calculator",
    category: "Influencer Marketing",
    categoryId: "influencer-marketing",
    status: "Live",
    cta: "Try Calculator",
    pageTitle: "Influencer Rate Calculator (2026) | Estimate Sponsored Post Rates",
    metaDescription:
      "Free Influencer Rate Calculator. Estimate influencer pricing for TikTok, Instagram, and YouTube campaigns using views, engagement, niche, usage rights, and exclusivity.",
    keywords: [
      "influencer rate calculator",
      "influencer pricing calculator",
      "sponsored post rate calculator",
      "creator rate calculator"
    ],
    ogImage: "/og/influencer-rate-calculator.svg",
    sitemap: true
  },
  {
    title: "YouTube Revenue Calculator",
    shortTitle: "YouTube Revenue",
    description: "Estimate creator RPM income",
    href: "/tools/youtube-revenue-calculator",
    slug: "youtube-revenue-calculator",
    category: "YouTube Tools",
    categoryId: "youtube-tools",
    status: "Live",
    cta: "Try Calculator",
    pageTitle: "YouTube Revenue Calculator (2026) | Estimate YouTube Earnings",
    metaDescription:
      "Free YouTube Revenue Calculator. Estimate monthly YouTube earnings using views, RPM, niche, upload frequency, and Shorts vs long-form content mix.",
    keywords: [
      "youtube revenue calculator",
      "youtube earnings calculator",
      "youtube rpm calculator"
    ],
    ogImage: "/og/youtube-revenue-calculator.svg",
    sitemap: true
  },
  {
    title: "Sponsorship Rate Calculator",
    shortTitle: "Sponsorship Rates",
    description: "Estimate brand deal pricing",
    href: "/tools/sponsorship-rate-calculator",
    slug: "sponsorship-rate-calculator",
    category: "Creator Finance",
    categoryId: "creator-finance",
    status: "Coming Soon",
    cta: "Coming Soon",
    pageTitle: "Sponsorship Rate Calculator - Coming Soon | ClipToolkit",
    metaDescription:
      "Estimate creator sponsorship rates using views, engagement, niche, deliverables, and campaign value.",
    keywords: [
      "sponsorship rate calculator",
      "brand deal calculator",
      "creator sponsorship pricing"
    ],
    ogImage: "/og/homepage.svg",
    sitemap: true
  }
];

export const homepageTools = creatorTools;

export const liveCreatorTools = creatorTools.filter((tool) => tool.status === "Live");

export const sitemapToolRoutes = creatorTools
  .filter((tool) => tool.sitemap)
  .map((tool) => tool.href);

export function getCreatorTool(slug: string) {
  return creatorTools.find((tool) => tool.slug === slug) ?? null;
}

export function toolCanonicalUrl(tool: CreatorTool) {
  return `https://www.cliptoolkit.com${tool.href}`;
}

export function toolOgImageUrl(tool: CreatorTool) {
  return tool.ogImage.startsWith("http")
    ? tool.ogImage
    : `https://www.cliptoolkit.com${tool.ogImage}`;
}
