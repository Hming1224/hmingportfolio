import { sendGAEvent } from "@next/third-parties/google";

import type { Locale } from "@/i18n/routing";

const ANALYTICS_OPT_OUT_KEY = "hming_analytics_opt_out";
const LAST_CASE_SLUG_KEY = "hming-last-case-slug";

type LastCaseAttribution = {
  project_slug?: string;
  last_case_slug?: string;
};

type AnalyticsEvents = {
  project_open: {
    project_slug: string;
    locale: Locale;
    destination_path: string;
  };
  case_engaged: {
    project_slug: string;
    locale: Locale;
    active_seconds: 30;
    scroll_percent: 50;
  };
  case_read_90: {
    project_slug: string;
    locale: Locale;
    scroll_percent: 90;
  };
  resume_click: LastCaseAttribution & {
    locale: Locale;
    href: string;
  };
  contact_form_submit: LastCaseAttribution & {
    locale: Locale;
  };
};

export function isAnalyticsOptedOut() {
  if (typeof window === "undefined") return false;

  try {
    return window.localStorage.getItem(ANALYTICS_OPT_OUT_KEY) === "1";
  } catch {
    return false;
  }
}

export function setAnalyticsOptOut(optedOut: boolean) {
  if (typeof window === "undefined") return;

  try {
    if (optedOut) {
      window.localStorage.setItem(ANALYTICS_OPT_OUT_KEY, "1");
    } else {
      window.localStorage.removeItem(ANALYTICS_OPT_OUT_KEY);
    }
  } catch {
    // Storage can be unavailable in privacy-restricted browser contexts.
  }
}

function getLastCaseSlug() {
  if (typeof window === "undefined") return null;

  try {
    return window.sessionStorage.getItem(LAST_CASE_SLUG_KEY);
  } catch {
    return null;
  }
}

export function rememberLastCaseSlug(projectSlug: string) {
  if (typeof window === "undefined" || isAnalyticsOptedOut()) return;

  try {
    window.sessionStorage.setItem(LAST_CASE_SLUG_KEY, projectSlug);
  } catch {
    // Attribution is optional when session storage is unavailable.
  }
}

export function getLastCaseAttribution(): LastCaseAttribution {
  const lastCaseSlug = getLastCaseSlug();
  if (!lastCaseSlug) return {};

  return {
    project_slug: lastCaseSlug,
    last_case_slug: lastCaseSlug,
  };
}

export function sendAnalyticsEvent<Name extends keyof AnalyticsEvents>(
  name: Name,
  params: AnalyticsEvents[Name],
) {
  if (typeof window === "undefined" || isAnalyticsOptedOut()) return;
  sendGAEvent("event", name, params);
}
