import type { Metadata } from "next";
import { CreatorToolsHome } from "@/components/creator-tools-home";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "ClipToolkit - Creator Tools for TikTok, YouTube and UGC",
  description:
    "Search free creator tools for TikTok, YouTube, UGC pricing, revenue estimates, and independent creator finance planning."
};

export default function HomePage() {
  return <CreatorToolsHome />;
}
