import { BaseProvider } from "@/lib/providers/base-provider";

export class TikTokProvider extends BaseProvider {
  key = "stub-tiktok";
  platform = "tiktok" as const;

  async analyze(): Promise<never> {
    throw new Error("TikTok provider implementation is scheduled for Day 3.");
  }
}
