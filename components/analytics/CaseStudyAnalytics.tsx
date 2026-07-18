"use client";

import { useEffect } from "react";

import type { Locale } from "@/i18n/routing";
import { rememberLastCaseSlug, sendAnalyticsEvent } from "@/lib/analytics";

interface CaseStudyAnalyticsProps {
  projectSlug: string;
  locale: Locale;
}

const ENGAGED_TIME_MS = 30_000;

export default function CaseStudyAnalytics({ projectSlug, locale }: CaseStudyAnalyticsProps) {
  useEffect(() => {
    let activeTimeMs = 0;
    let visibleSince = document.visibilityState === "visible" ? performance.now() : null;
    let maxScrollPercent = 0;
    let engagedSent = false;
    let read90Sent = false;
    let animationFrame: number | null = null;

    const getActiveTime = () =>
      activeTimeMs + (visibleSince === null ? 0 : performance.now() - visibleSince);

    const updateScrollProgress = () => {
      animationFrame = null;
      const pageHeight = document.documentElement.scrollHeight;
      if (pageHeight <= 0) return;

      const currentPercent = Math.min(
        100,
        ((window.scrollY + window.innerHeight) / pageHeight) * 100,
      );
      maxScrollPercent = Math.max(maxScrollPercent, currentPercent);

      if (!read90Sent && maxScrollPercent >= 90) {
        read90Sent = true;
        sendAnalyticsEvent("case_read_90", {
          project_slug: projectSlug,
          locale,
          scroll_percent: 90,
        });
      }
    };

    const checkEngagement = () => {
      if (engagedSent || getActiveTime() < ENGAGED_TIME_MS || maxScrollPercent < 50) return;

      engagedSent = true;
      sendAnalyticsEvent("case_engaged", {
        project_slug: projectSlug,
        locale,
        active_seconds: 30,
        scroll_percent: 50,
      });
      rememberLastCaseSlug(projectSlug);
    };

    const handleScroll = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateScrollProgress);
      }
    };

    const handleVisibilityChange = () => {
      const now = performance.now();
      if (document.visibilityState === "hidden") {
        if (visibleSince !== null) activeTimeMs += now - visibleSince;
        visibleSince = null;
      } else if (visibleSince === null) {
        visibleSince = now;
      }
    };

    updateScrollProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    const interval = window.setInterval(checkEngagement, 250);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.clearInterval(interval);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, [locale, projectSlug]);

  return null;
}
