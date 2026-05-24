import { BaseProvider } from "@/lib/providers/base-provider";

export class InstagramProvider extends BaseProvider {
  key = "stub-instagram";
  platform = "instagram" as const;

  async analyze(): Promise<never> {
    throw new Error("Instagram provider implementation is scheduled for Day 3.");
  }
}
