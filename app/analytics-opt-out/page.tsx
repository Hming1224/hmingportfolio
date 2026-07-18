import type { Metadata } from "next";

import AnalyticsOptOutControl from "@/components/analytics/AnalyticsOptOutControl";

export const metadata: Metadata = {
  title: "Analytics settings",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AnalyticsOptOutPage() {
  return <AnalyticsOptOutControl />;
}
