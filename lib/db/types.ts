export type DownloadStatus = "pending" | "processing" | "success" | "failed" | "retrying";
export type Platform = "tiktok" | "instagram";
export type BlogStatus = "draft" | "published";

export type OverviewStats = {
  todayDownloads: number;
  successRate: number;
  cacheHitRate: number;
  topPlatform: string;
  platformCounts: Array<{ platform: string; count: number }>;
};

export type ProviderRecord = {
  id: string;
  key: string;
  platform: Platform;
  displayName: string;
  enabled: boolean;
  configJson: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type DownloadTask = {
  id: string;
  url: string;
  normalizedUrl: string | null;
  urlHash: string | null;
  platform: Platform;
  provider: string;
  status: DownloadStatus;
  responseTime: number | null;
  cacheHit: boolean;
  ipHash: string | null;
  country: string | null;
  device: string | null;
  userAgent: string | null;
  referrer: string | null;
  title: string | null;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  coverUrl: string | null;
  audioUrl: string | null;
  reason: string | null;
  errorCode: string | null;
  retryCount: number;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type SeoPage = {
  id: string;
  slug: string;
  pageType: string;
  title: string;
  description: string;
  h1: string | null;
  content: string | null;
  schemaJson: Record<string, unknown>;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type FaqItem = {
  id: string;
  seoPageId: string | null;
  question: string;
  answer: string;
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type SeoPageWithFaqs = SeoPage & {
  faqs: FaqItem[];
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  metaTitle: string | null;
  metaDescription: string | null;
  status: BlogStatus;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type SystemConfig = {
  id: string;
  key: string;
  value: string;
  valueType: "string" | "number" | "boolean" | "json" | "secret";
  groupName: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
