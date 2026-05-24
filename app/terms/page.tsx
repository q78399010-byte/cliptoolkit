import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for Creator Toolkit.",
  alternates: { canonical: "/terms" }
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      body="Creator Toolkit is intended for downloading content you own, are authorized to use, or are legally permitted to save. Users are responsible for respecting platform terms, copyright, and local laws."
    />
  );
}
