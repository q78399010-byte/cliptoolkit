"use client";

import { useEffect } from "react";
import { StatusPage } from "@/components/status-page";

export default function ErrorPage({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("app error", error);
  }, [error]);

  return (
    <StatusPage
      code="500"
      title="Something went wrong"
      body="The request failed while the server was preparing the page. You can retry, return home, or check the guides."
      extraAction={
        <button
          type="button"
          onClick={reset}
          className="focus-ring rounded-2xl border border-white/12 px-6 py-3 font-bold text-white transition hover:border-mint/40"
        >
          Try Again
        </button>
      }
    />
  );
}
