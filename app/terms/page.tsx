import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { createPageMetadata } from "@/lib/seo/metadata";

const contactEmail = process.env.LEGAL_CONTACT_EMAIL ?? "legal@example.com";

export const metadata: Metadata = createPageMetadata({
  title: "Terms",
  description: "Terms of use for Creator Toolkit.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      intro="These Terms describe the acceptable use rules for Creator Toolkit and the responsibility users have when downloading public media."
      sections={[
        {
          title: "Permitted use",
          body:
            "Creator Toolkit is intended for downloading content you own, are authorized to use, or are legally permitted to save. Users are responsible for respecting copyright, platform rules, and local laws."
        },
        {
          title: "No misuse",
          body:
            "Users may not use the service to access private content, overload providers, bypass security controls, distribute malware, scrape at abusive rates, or infringe the rights of creators and platforms."
        },
        {
          title: "Service availability",
          body:
            "Download availability depends on public source pages, provider reliability, network conditions, and platform changes. Creator Toolkit does not guarantee that every link will produce a downloadable file."
        },
        {
          title: "Advertising and third-party services",
          body:
            "The site may include analytics, CDN, anti-abuse tools, and advertising partners. Third-party services are governed by their own terms and privacy policies."
        },
        {
          title: "Disclaimer",
          body:
            "The service is provided as-is. We may update, limit, suspend, or remove features to protect users, comply with law, or maintain service reliability."
        },
        {
          title: "Contact",
          body: `For terms questions, contact ${contactEmail}.`
        }
      ]}
    />
  );
}
