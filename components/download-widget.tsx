"use client";

import { FormEvent, useMemo, useState } from "react";
import { detectSupportedPlatform } from "@/lib/platform";

type WidgetStatus = "idle" | "ready" | "invalid" | "pending";

export function DownloadWidget() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<WidgetStatus>("idle");
  const [message, setMessage] = useState("");

  const platform = useMemo(() => detectSupportedPlatform(url), [url]);

  async function pasteFromClipboard() {
    setMessage("");
    try {
      const clipboardText = await navigator.clipboard.readText();
      setUrl(clipboardText.trim());
      setStatus(detectSupportedPlatform(clipboardText) ? "ready" : "invalid");
    } catch {
      setStatus("invalid");
      setMessage("Clipboard access is blocked. Paste the link manually.");
    }
  }

  function submitDownload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextPlatform = detectSupportedPlatform(url);

    if (!nextPlatform) {
      setStatus("invalid");
      setMessage("Paste a valid TikTok or Instagram Reels link.");
      return;
    }

    setStatus("pending");
    setMessage(
      `${nextPlatform === "tiktok" ? "TikTok" : "Instagram"} link detected. The provider engine connects in Day 3.`
    );
  }

  return (
    <div className="surface mx-auto w-full max-w-3xl rounded-lg p-3 sm:p-4">
      <form onSubmit={submitDownload} className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="download-url">
          Paste Link
        </label>
        <input
          id="download-url"
          value={url}
          onChange={(event) => {
            const value = event.target.value;
            setUrl(value);
            setStatus(value ? (detectSupportedPlatform(value) ? "ready" : "idle") : "idle");
            setMessage("");
          }}
          inputMode="url"
          autoComplete="url"
          placeholder="Paste Link"
          className="focus-ring min-h-14 flex-1 rounded-md border border-white/10 bg-white px-4 text-base text-ink placeholder:text-slate-500"
        />
        <div className="grid grid-cols-[0.8fr_1fr] gap-3 sm:flex">
          <button
            type="button"
            onClick={pasteFromClipboard}
            className="focus-ring min-h-14 rounded-md border border-white/10 px-4 font-semibold text-white transition hover:border-white/24 hover:bg-white/8"
          >
            Paste
          </button>
          <button
            type="submit"
            className="focus-ring min-h-14 rounded-md bg-mint px-6 font-bold text-ink transition hover:bg-[#75f4c6]"
          >
            Download
          </button>
        </div>
      </form>

      <div className="mt-3 flex min-h-6 flex-wrap items-center gap-2 text-sm">
        {platform ? (
          <span className="rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-mint">
            {platform === "tiktok" ? "TikTok" : "Instagram"} link recognized
          </span>
        ) : (
          <span className="text-white/50">Supports TikTok and Instagram Reels links.</span>
        )}
        {status === "invalid" && message ? <span className="text-ember">{message}</span> : null}
        {status === "pending" && message ? <span className="text-signal">{message}</span> : null}
      </div>
    </div>
  );
}
