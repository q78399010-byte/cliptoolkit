import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "DMCA",
  description: "DMCA policy for Creator Toolkit.",
  alternates: { canonical: "/dmca" }
};

export default function DmcaPage() {
  return (
    <LegalPage
      title="DMCA"
      body="Creator Toolkit respects copyright. Rights holders can submit takedown requests with the copyrighted work, the affected URL, contact information, and a good-faith statement. A production contact address will be configured before launch."
    />
  );
}
