"use client";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

import type { Locale } from "@/i18n/routing";
import { isAnalyticsOptedOut, setAnalyticsOptOut } from "@/lib/analytics";
import Button from "@/components/ui/Button";

export default function AnalyticsOptOutControl() {
  const locale = useLocale() as Locale;
  const [optedOut, setOptedOut] = useState<boolean | null>(null);
  const zh = locale === "zh-TW";

  useEffect(() => {
    const timeout = window.setTimeout(() => setOptedOut(isAnalyticsOptedOut()), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  const updatePreference = (nextValue: boolean) => {
    setAnalyticsOptOut(nextValue);
    window.location.reload();
  };

  return (
    <main>
      <h1>{zh ? "分析追蹤設定" : "Analytics settings"}</h1>
      <p>
        {optedOut === null
          ? zh ? "正在讀取目前設定⋯⋯" : "Reading current setting…"
          : optedOut
            ? zh ? "這個瀏覽器目前不會載入 GA4 或 Microsoft Clarity。" : "GA4 and Microsoft Clarity are disabled in this browser."
            : zh ? "這個瀏覽器目前允許載入 GA4 與 Microsoft Clarity。" : "GA4 and Microsoft Clarity are enabled in this browser."}
      </p>
      {optedOut ? (
        <Button onClick={() => updatePreference(false)}>
          {zh ? "恢復分析追蹤" : "Enable analytics"}
        </Button>
      ) : (
        <Button onClick={() => updatePreference(true)} disabled={optedOut === null}>
          {zh ? "停用分析追蹤" : "Disable analytics"}
        </Button>
      )}
    </main>
  );
}
