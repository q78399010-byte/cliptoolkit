export type RoiCurrency = "usd" | "gbp" | "eur";

export type RoiMarket = {
  currency: RoiCurrency;
  currencyCode: "USD" | "GBP" | "EUR";
  locale: string;
  label: string;
  path: string;
  canonicalPath: string;
};

export const tiktokShopRoiBasePath = "/tools/tiktok-shop-roi-calculator";
export const tiktokShopRoiTitle = "TikTok Shop ROI Calculator  Optimize Ad Spend & Profit";
export const tiktokShopRoiDescription =
  "Free TikTok Shop ROI Calculator to estimate revenue, profit, and ad efficiency. Compare scenarios and optimize campaigns.";
export const tiktokShopRoiOgImage =
  "https://www.cliptoolkit.com/og/tiktok-shop-roi-calculator.svg";

export const roiMarkets: Record<RoiCurrency, RoiMarket> = {
  usd: {
    currency: "usd",
    currencyCode: "USD",
    locale: "en-US",
    label: "United States",
    path: `${tiktokShopRoiBasePath}/usd`,
    canonicalPath: tiktokShopRoiBasePath
  },
  gbp: {
    currency: "gbp",
    currencyCode: "GBP",
    locale: "en-GB",
    label: "United Kingdom",
    path: `${tiktokShopRoiBasePath}/gbp`,
    canonicalPath: `${tiktokShopRoiBasePath}/gbp`
  },
  eur: {
    currency: "eur",
    currencyCode: "EUR",
    locale: "en-IE",
    label: "Europe",
    path: `${tiktokShopRoiBasePath}/eur`,
    canonicalPath: `${tiktokShopRoiBasePath}/eur`
  }
};

export const roiCurrencyParams = Object.keys(roiMarkets) as RoiCurrency[];

export const tiktokShopRoiKeywords = [
  "tiktok shop roi calculator",
  "tiktok shop profit calculator",
  "tiktok shop roas calculator",
  "tiktok ads roi calculator",
  "tiktok shop ad spend calculator",
  "tiktok ecommerce calculator"
];

export const tiktokShopRoiFaqItems = [
  {
    question: "How to calculate TikTok Shop ROI?",
    answer:
      "TikTok Shop ROI is calculated by subtracting total costs from revenue, then dividing net profit by total cost. A practical model includes ad spend, platform commission, shipping, returns, and miscellaneous operating costs."
  },
  {
    question: "How to optimize ad spend for TikTok Shop?",
    answer:
      "Optimize TikTok Shop ad spend by improving product page conversion rate, testing stronger creatives, watching CPM or CPC efficiency, reducing return rate, and shifting budget toward campaigns with positive ROAS and profit after fees."
  },
  {
    question: "Difference between ROI and ROAS",
    answer:
      "ROAS compares revenue to ad spend only, while ROI compares net profit to total cost. A campaign can have strong ROAS but weak ROI if shipping, commission, returns, or product costs are too high."
  }
];

export function getRoiMarket(currency: string): RoiMarket | null {
  return roiMarkets[currency as RoiCurrency] ?? null;
}

export function absoluteRoiUrl(path: string) {
  return `https://www.cliptoolkit.com${path}`;
}
