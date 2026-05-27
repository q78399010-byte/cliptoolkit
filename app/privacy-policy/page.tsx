import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { createPageMetadata } from "@/lib/seo/metadata";

const contactEmail = process.env.LEGAL_CONTACT_EMAIL ?? "legal@example.com";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Creator Toolkit.",
  path: "/privacy-policy"
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This Privacy Policy explains what Creator Toolkit collects, why it is collected, and how users can contact us before and after launch."
      sections={[
        {
          title: "Information we process",
          body:
            "We process submitted public video URLs, technical request data, device type, referrer, approximate country from CDN headers, and hashed IP/session identifiers for abuse prevention, analytics, and service reliability."
        },
        {
          title: "Cookies and local storage",
          body:
            "The admin area uses a secure HTTP-only session cookie. Public analytics may use local storage for a non-sensitive session identifier. Users can clear browser storage at any time."
        },
        {
          title: "Analytics, ads, and CDN",
          body:
            "The site may use Google Analytics, Google Search Console, Cloudflare, CDN caching, and advertising partners after launch. These services can process standard technical data such as page views, browser type, IP address, and network logs."
        },
        {
          title: "Provider requests",
          body:
            "When a user submits a public TikTok or Instagram link, Creator Toolkit may request public metadata and media information from the relevant provider pipeline. Private account content is not intended to be accessed."
        },
        {
          title: "Retention and security",
          body:
            "Operational logs and analytics are kept only as long as needed for debugging, abuse prevention, and product decisions. Sensitive secrets must be stored in server environment variables and never committed to the repository."
        },
        {
          title: "Contact",
          body: `For privacy questions or deletion requests, contact ${contactEmail}.`
        }
      ]}
    />
  );
}
