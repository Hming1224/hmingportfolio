"use client";

import { useEffect } from "react";
import { Alert } from "./Alert";
import type { FeedbackTone } from "./Alert";

export function Toast({
  duration = 3000,
  message,
  onClose,
  tone = "info",
}: {
  duration?: number;
  message: string;
  onClose: () => void;
  tone?: FeedbackTone;
}) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="hm-toast-region" aria-live="polite">
      <Alert tone={tone} onDismiss={onClose}>
        {message}
      </Alert>
    </div>
  );
}
