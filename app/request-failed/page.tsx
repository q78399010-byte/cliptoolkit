import type { Metadata } from "next";
import { StatusPage } from "@/components/status-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Request Failed",
  description: "The requested download or analysis task failed. Try again with a public TikTok or Instagram link.",
  path: "/request-failed"
});

export default function RequestFailedPage() {
  return (
    <StatusPage
      code="Request Failed"
      title="We could not complete that request"
      body="The video source may be private, unavailable, blocked by the provider, or temporarily unreachable. Paste a public TikTok or Instagram link and try again."
      primaryHref="/"
      primaryLabel="Try Another Link"
    />
  );
}
