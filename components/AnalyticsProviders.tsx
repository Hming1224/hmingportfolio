"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { isAnalyticsOptedOut } from "@/lib/analytics";
import MicrosoftClarity from "./MicrosoftClarity";

interface AnalyticsProvidersProps {
  gaId?: string;
  clarityId?: string;
}

export default function AnalyticsProviders({ gaId, clarityId }: AnalyticsProvidersProps) {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const isOptOutRoute = /\/analytics-opt-out\/?$/.test(pathname);
      setEnabled(!isOptOutRoute && !isAnalyticsOptedOut());
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [pathname]);

  if (!enabled) return null;

  return (
    <>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      {clarityId ? <MicrosoftClarity id={clarityId} /> : null}
    </>
  );
}
