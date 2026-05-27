"use server";

import { revalidatePath } from "next/cache";
import { updateSystemConfig } from "@/lib/db/admin-queries";

const editableKeys = [
  "DEFAULT_TIKTOK_PROVIDER",
  "DEFAULT_INSTAGRAM_PROVIDER",
  "CACHE_DRIVER",
  "REDIS_URL",
  "DOWNLOAD_CACHE_TTL_SECONDS",
  "RATE_LIMIT_PER_HOUR"
];

export async function saveSettingsAction(formData: FormData) {
  for (const key of editableKeys) {
    const value = String(formData.get(key) ?? "").trim();
    await updateSystemConfig(key, value);
  }

  revalidatePath("/admin/settings");
}
