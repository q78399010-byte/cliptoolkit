import type { PageFaq } from "@/lib/seo/pages";
import { absoluteUrl, getSiteName, getSiteUrl, normalizePath } from "@/lib/seo/site";

export type JsonLd = Record<string, unknown>;

export function createWebsiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: getSiteName(),
    url: getSiteUrl()
  };
}

export function createSoftwareApplicationSchema(path = "/"): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: getSiteName(),
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    url: absoluteUrl(path),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };
}

export function createWebPageSchema(input: {
  title: string;
  description: string;
  path: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: {
      "@type": "WebSite",
      name: getSiteName(),
      url: getSiteUrl()
    }
  };
}

export function createBreadcrumbSchema(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function createFaqSchema(faqs: PageFaq[]): JsonLd | null {
  const mainEntity = faqs
    .filter((faq) => faq.question && faq.answer)
    .map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }));

  if (!mainEntity.length) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity
  };
}

export function createHowToSchema(input: {
  title: string;
  description: string;
  path: string;
  steps: string[];
}): JsonLd | null {
  if (!input.steps.length) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.title,
    description: input.description,
    totalTime: "PT1M",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Public TikTok or Instagram video link"
      }
    ],
    step: input.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step,
      text: step,
      url: `${absoluteUrl(input.path)}#step-${index + 1}`
    }))
  };
}

export function createBlogPostingSchema(input: {
  title: string;
  description: string;
  path: string;
  publishedAt?: Date | null;
  updatedAt?: Date | null;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    datePublished: input.publishedAt?.toISOString(),
    dateModified: input.updatedAt?.toISOString() ?? input.publishedAt?.toISOString(),
    author: {
      "@type": "Organization",
      name: getSiteName()
    },
    publisher: {
      "@type": "Organization",
      name: getSiteName()
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(input.path)
    }
  };
}

export function breadcrumbForPath(title: string, path: string) {
  const normalized = normalizePath(path);

  if (normalized === "/") {
    return createBreadcrumbSchema([{ name: "Home", path: "/" }]);
  }

  return createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: title, path: normalized }
  ]);
}
