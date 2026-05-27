import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { createPageMetadata } from "@/lib/seo/metadata";

const contactEmail = process.env.LEGAL_CONTACT_EMAIL ?? "dmca@example.com";

export const metadata: Metadata = createPageMetadata({
  title: "DMCA",
  description: "DMCA policy for Creator Toolkit.",
  path: "/dmca"
});

export default function DmcaPage() {
  return (
    <LegalPage
      title="DMCA"
      intro="Creator Toolkit respects copyright and will review complete takedown notices from rights holders or their authorized agents."
      sections={[
        {
          title: "Takedown notice requirements",
          body:
            "A notice should include the copyrighted work, the URL or location of the allegedly infringing material, the rights holder's contact information, a good-faith statement, an accuracy statement, and a physical or electronic signature."
        },
        {
          title: "Where to send notices",
          body: `Send DMCA notices to ${contactEmail}. Include enough detail for us to identify the affected page, cached record, or provider result.`
        },
        {
          title: "Counter notices",
          body:
            "If content is removed by mistake, the affected party may send a counter notice with identification of the removed material, contact information, a good-faith statement, consent to jurisdiction where applicable, and a signature."
        },
        {
          title: "Repeat infringement",
          body:
            "We may restrict access, remove cached records, or block abusive usage patterns when repeat infringement or bad-faith requests are identified."
        },
        {
          title: "Important note",
          body:
            "Creator Toolkit does not host TikTok or Instagram content by default. The service analyzes public links and may proxy downloads only when a user requests an available media file."
        }
      ]}
    />
  );
}
