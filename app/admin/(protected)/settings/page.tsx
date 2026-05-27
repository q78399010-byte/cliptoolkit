import type { Metadata } from "next";
import { saveSettingsAction } from "@/app/admin/(protected)/settings/actions";
import { listSystemConfigs } from "@/lib/db/admin-queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Settings"
};

const importantKeys = [
  "DEFAULT_TIKTOK_PROVIDER",
  "DEFAULT_INSTAGRAM_PROVIDER",
  "CACHE_DRIVER",
  "REDIS_URL",
  "DOWNLOAD_CACHE_TTL_SECONDS",
  "RATE_LIMIT_PER_HOUR"
];

export default async function AdminSettingsPage() {
  const configs = await listSystemConfigs();
  const configMap = new Map(configs.map((item) => [item.key, item]));

  return (
    <section>
      <p className="text-sm font-semibold uppercase text-mint">Settings</p>
      <h1 className="mt-2 text-3xl font-semibold">Runtime configuration</h1>
      <form action={saveSettingsAction} className="surface mt-6 grid gap-4 rounded-lg p-5">
        {importantKeys.map((key) => {
          const config = configMap.get(key);

          return (
            <label key={key} className="grid gap-2 text-sm font-medium">
              {key}
              <input
                name={key}
                defaultValue={config?.value ?? ""}
                className="focus-ring min-h-11 rounded-md border border-white/10 bg-white px-3 text-ink"
              />
              {config?.description ? (
                <span className="text-xs font-normal text-white/48">{config.description}</span>
              ) : null}
            </label>
          );
        })}
        <button className="min-h-11 rounded-md bg-mint px-4 font-bold text-ink transition hover:bg-[#75f4c6]">
          Save Settings
        </button>
      </form>

      <section className="surface mt-5 rounded-lg p-5">
        <h2 className="text-xl font-semibold">All configs</h2>
        <div className="mt-4 grid gap-2 text-sm">
          {configs.map((config) => (
            <div
              key={config.id}
              className="grid gap-2 rounded-md border border-white/8 p-3 sm:grid-cols-[220px_1fr]"
            >
              <span className="text-white/56">{config.key}</span>
              <span className="break-all">{config.valueType === "secret" ? "********" : config.value}</span>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
