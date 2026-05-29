"use client";

import { useEffect, useRef } from "react";
import { trackGaPageView } from "@/lib/google-analytics";

type Ga4PageViewProps = {
  toolName: string;
};

export function Ga4PageView({ toolName }: Ga4PageViewProps) {
  const sentRef = useRef(false);

  useEffect(() => {
    if (sentRef.current) {
      return;
    }

    const historyState = window.history.state as { idx?: number } | null;
    if (!historyState || historyState.idx === 0) {
      return;
    }

    sentRef.current = true;
    trackGaPageView({
      tool: toolName,
      page_path: window.location.pathname,
      page_title: document.title,
      page_location: window.location.href
    });
  }, [toolName]);

  return null;
}
