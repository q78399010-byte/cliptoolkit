import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Creator Toolkit.",
  alternates: { canonical: "/privacy-policy" }
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      body="Creator Toolkit collects minimal technical data needed to operate the downloader, prevent abuse, measure traffic, and improve reliability. Production analytics, ads, and provider integrations will be documented here before launch."
    />
  );
}
