"use client";

import type { ReactNode } from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type FeedbackTone = "success" | "warning" | "error" | "info";

const icons = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
};

export function Alert({
  children,
  className,
  dismissLabel = "Dismiss",
  onDismiss,
  tone = "info",
}: {
  children: ReactNode;
  className?: string;
  dismissLabel?: string;
  onDismiss?: () => void;
  tone?: FeedbackTone;
}) {
  const Icon = icons[tone];

  return (
    <div className={cn("hm-alert", `hm-alert-${tone}`, className)} role={tone === "error" ? "alert" : "status"}>
      <Icon aria-hidden="true" size={20} strokeWidth={1.5} />
      <div className="hm-alert-content">{children}</div>
      {onDismiss ? (
        <button className="hm-icon-button" type="button" onClick={onDismiss} aria-label={dismissLabel}>
          <X aria-hidden="true" size={16} strokeWidth={2} />
        </button>
      ) : null}
    </div>
  );
}
