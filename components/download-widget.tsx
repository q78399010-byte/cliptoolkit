"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { trackAnalyticsEvent } from "@/components/analytics-tracker";
import { detectSupportedPlatform, type SupportedPlatform } from "@/lib/platform";

type AnalyzeStatus = "idle" | "ready" | "invalid" | "analyzing" | "success" | "failed";

type DownloadAsset = {
  url: string;
  type: "video" | "audio";
  quality?: string;
  format?: string;
  label?: string;
};

type AnalyzeResult = {
  title: string | null;
  thumbnail: string | null;
  duration: number | null;
  downloadUrls: DownloadAsset[];
  audioUrl: string | null;
  platform: SupportedPlatform;
  status: "success" | "failed";
  sourceUrl?: string;
  normalizedUrl?: string;
  error?: string;
  taskId?: string;
  cacheHit?: boolean;
};

const loadingSteps = ["Analyzing Video...", "Fetching Download Links...", "Preparing Download..."];

const platformLabels: Record<SupportedPlatform, string> = {
  tiktok: "TikTok",
  instagram: "Instagram"
};

function cleanCandidate(value: string) {
  return value.trim().replace(/[),.;]+$/g, "");
}

function extractSupportedUrl(value: string) {
  const candidates = value.match(/https?:\/\/[^\s"'<>]+/gi) ?? [];
  const supported = candidates.map(cleanCandidate).find((candidate) => detectSupportedPlatform(candidate));

  return supported ?? cleanCandidate(value);
}

function formatDuration(value: number | null) {
  if (!value || !Number.isFinite(value)) {
    return "Duration unavailable";
  }

  const totalSeconds = Math.max(0, Math.round(value));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function mediaDownloadHref(url: string, title: string | null, type: "video" | "audio") {
  const params = new URLSearchParams({
    url,
    type,
    filename: title ?? "creator-toolkit-download"
  });

  return `/api/download-media?${params.toString()}`;
}

function AnalyzeLoading({
  activeStepIndex,
  progress,
  platform
}: {
  activeStepIndex: number;
  progress: number;
  platform: SupportedPlatform | null;
}) {
  return (
    <section
      className="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left sm:p-5"
      aria-live="polite"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-mint">
            {platform ? `${platformLabels[platform]} link detected` : "Processing"}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">{loadingSteps[activeStepIndex]}</h2>
        </div>
        <p className="rounded-full border border-white/10 px-3 py-1 text-sm font-semibold text-white/72">
          {Math.round(progress)}%
        </p>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full bg-mint transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {loadingSteps.map((step, index) => (
          <div
            key={step}
            className={`rounded-xl border p-3 transition ${
              index <= activeStepIndex
                ? "border-mint/28 bg-mint/8 text-white"
                : "border-white/8 bg-white/[0.02] text-white/42"
            }`}
          >
            <span className="text-xs font-semibold">{String(index + 1).padStart(2, "0")}</span>
            <p className="mt-2 text-sm font-medium">{step}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 rounded-xl border border-white/8 bg-black/10 p-3 sm:grid-cols-[132px_1fr]">
        <div className="shimmer aspect-[4/5] rounded-xl" />
        <div className="grid content-center gap-3">
          <div className="shimmer h-5 w-4/5 rounded-full" />
          <div className="shimmer h-4 w-2/3 rounded-full" />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="shimmer h-12 rounded-xl" />
            <div className="shimmer h-12 rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function DownloadWidget() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<AnalyzeStatus>("idle");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLElement>(null);

  const candidateUrl = useMemo(() => extractSupportedUrl(url), [url]);
  const platform = useMemo(() => detectSupportedPlatform(candidateUrl), [candidateUrl]);
  const activeStepIndex = progress < 42 ? 0 : progress < 78 ? 1 : 2;
  const videoAsset = result?.downloadUrls.find((item) => item.type === "video") ?? null;
  const audioAsset =
    result?.downloadUrls.find((item) => item.type === "audio") ??
    (result?.audioUrl ? ({ url: result.audioUrl, type: "audio" } satisfies DownloadAsset) : null);

  useEffect(() => {
    if (status !== "analyzing") {
      return;
    }

    const timer = window.setInterval(() => {
      setProgress((current) => {
        const increment = current < 42 ? 11 : current < 78 ? 7 : 3;
        return Math.min(current + increment, 94);
      });
    }, 650);

    return () => window.clearInterval(timer);
  }, [status]);

  async function pasteFromClipboard({ focusInput = true }: { focusInput?: boolean } = {}) {
    setMessage("");
    setResult(null);

    try {
      const clipboardText = await navigator.clipboard.readText();
      const nextUrl = extractSupportedUrl(clipboardText);
      const nextPlatform = detectSupportedPlatform(nextUrl);

      setUrl(nextUrl);
      setStatus(nextPlatform ? "ready" : "invalid");
      setMessage(nextPlatform ? `${platformLabels[nextPlatform]} link recognized.` : "Clipboard does not contain a supported link.");

      if (focusInput) {
        inputRef.current?.focus();
      }
    } catch {
      setStatus("invalid");
      setMessage("Clipboard access is blocked. Paste the link manually.");
      inputRef.current?.focus();
    }
  }

  function resetForNewLink() {
    setUrl("");
    setStatus("idle");
    setMessage("");
    setResult(null);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  async function submitAnalyze(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextUrl = extractSupportedUrl(url);
    const nextPlatform = detectSupportedPlatform(nextUrl);

    if (!nextPlatform) {
      setStatus("invalid");
      setMessage("Paste a valid TikTok or Instagram link.");
      setResult(null);
      inputRef.current?.focus();
      return;
    }

    setUrl(nextUrl);
    setStatus("analyzing");
    setProgress(10);
    setMessage("");
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ url: nextUrl })
      });
      const payload = (await response.json()) as AnalyzeResult;

      if (!response.ok || payload.status !== "success") {
        throw new Error(payload.error ?? "Analyze failed. Try another public link.");
      }

      setProgress(100);
      setResult(payload);
      setStatus("success");
      setMessage(payload.cacheHit ? "Ready from cache. Choose a download option." : "Ready. Choose a download option.");
      window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    } catch (error) {
      setStatus("failed");
      setProgress(0);
      setMessage(error instanceof Error ? error.message : "Analyze failed. Try another public link.");
    }
  }

  function trackDownloadClick(type: "video" | "audio") {
    if (!result) {
      return;
    }

    trackAnalyticsEvent({
      eventName: "download_click",
      platform: result.platform,
      metadata: {
        type,
        cacheHit: result.cacheHit ?? false
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="surface rounded-[28px] p-3 shadow-soft sm:p-4">
        <form onSubmit={submitAnalyze} className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <label className="sr-only" htmlFor="download-url">
            Paste TikTok or Instagram Link
          </label>
          <div className="flex min-h-16 items-center gap-2 rounded-2xl border border-white/10 bg-white px-3 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
            <input
              ref={inputRef}
              id="download-url"
              value={url}
              onChange={(event) => {
                const value = event.target.value;
                const nextPlatform = detectSupportedPlatform(extractSupportedUrl(value));

                setUrl(value);
                setStatus(value ? (nextPlatform ? "ready" : "idle") : "idle");
                setMessage("");
                setResult(null);
              }}
              inputMode="url"
              autoComplete="url"
              placeholder="Paste TikTok or Instagram Link"
              className="min-h-12 min-w-0 flex-1 bg-transparent text-base font-medium text-ink outline-none placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => void pasteFromClipboard()}
              className="focus-ring rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
            >
              Paste
            </button>
          </div>
          <button
            type="submit"
            disabled={status === "analyzing"}
            className="focus-ring min-h-16 rounded-2xl bg-mint px-8 text-base font-black text-ink transition hover:bg-[#75f4c6] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Analyze
          </button>
        </form>

        <div className="mt-3 flex min-h-7 flex-wrap items-center gap-2 px-1 text-sm">
          {platform ? (
            <span className="rounded-full border border-mint/30 bg-mint/10 px-3 py-1 font-semibold text-mint">
              {platformLabels[platform]} link recognized
            </span>
          ) : (
            <span className="text-white/50">Paste any public TikTok or Instagram video link.</span>
          )}
          {message ? (
            <span className={status === "failed" || status === "invalid" ? "text-ember" : "text-white/62"}>
              {message}
            </span>
          ) : null}
        </div>

        {status === "analyzing" ? (
          <AnalyzeLoading activeStepIndex={activeStepIndex} progress={progress} platform={platform} />
        ) : null}
      </div>

      {result?.status === "success" ? (
        <section
          ref={resultRef}
          id="download-result"
          className="mt-5 scroll-mt-24 overflow-hidden rounded-[28px] border border-mint/18 bg-[#10141d] text-left shadow-[0_30px_90px_rgba(0,0,0,0.32)]"
        >
          <div className="grid gap-0 lg:grid-cols-[300px_1fr]">
            <div className="relative min-h-[280px] bg-black/28">
              {result.thumbnail ? (
                <img
                  src={result.thumbnail}
                  alt="Video cover"
                  className="h-full max-h-[420px] w-full object-cover lg:max-h-none"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="flex h-full min-h-[280px] items-center justify-center px-8 text-center text-white/48">
                  Cover preview unavailable
                </div>
              )}
              <div className="absolute left-4 top-4 rounded-full border border-white/14 bg-black/58 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
                {platformLabels[result.platform]}
              </div>
            </div>

            <div className="flex min-w-0 flex-col justify-between gap-6 p-5 sm:p-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-mint">
                  Download ready
                </p>
                <h2 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  {result.title ?? "Untitled video"}
                </h2>
                <div className="mt-4 flex flex-wrap gap-2 text-sm text-white/64">
                  <span className="rounded-full border border-white/10 px-3 py-1">
                    {platformLabels[result.platform]}
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1">
                    {formatDuration(result.duration)}
                  </span>
                  {result.cacheHit ? (
                    <span className="rounded-full border border-white/10 px-3 py-1">Cached result</span>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {videoAsset ? (
                  <a
                    href={mediaDownloadHref(videoAsset.url, result.title, "video")}
                    onClick={() => trackDownloadClick("video")}
                    className="focus-ring flex min-h-14 items-center justify-center rounded-2xl bg-mint px-5 text-center text-base font-black text-ink transition hover:bg-[#75f4c6]"
                  >
                    Download Video
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="min-h-14 rounded-2xl border border-white/8 px-5 text-base font-black text-white/32"
                  >
                    Video Unavailable
                  </button>
                )}

                {audioAsset ? (
                  <a
                    href={mediaDownloadHref(audioAsset.url, result.title, "audio")}
                    onClick={() => trackDownloadClick("audio")}
                    className="focus-ring flex min-h-14 items-center justify-center rounded-2xl border border-white/14 bg-white/[0.04] px-5 text-center text-base font-black text-white transition hover:border-mint/40 hover:bg-white/[0.07]"
                  >
                    Download Audio
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="min-h-14 rounded-2xl border border-white/8 px-5 text-base font-black text-white/32"
                  >
                    Audio Unavailable
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-3 border-t border-white/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-white/48">Have another video? Paste a new link and analyze again.</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => void pasteFromClipboard()}
                    className="focus-ring rounded-xl border border-white/10 px-4 py-2 text-sm font-bold text-white transition hover:border-white/24 hover:bg-white/8"
                  >
                    Paste New Link
                  </button>
                  <button
                    type="button"
                    onClick={resetForNewLink}
                    className="focus-ring rounded-xl px-4 py-2 text-sm font-bold text-white/58 transition hover:bg-white/8 hover:text-white"
                  >
                    New Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
