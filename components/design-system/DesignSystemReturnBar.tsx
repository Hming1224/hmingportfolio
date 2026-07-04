"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { DesignSystemLocale } from "@/lib/design-system-docs";
import styles from "./DesignSystemExplorer.module.css";

const RETURN_TARGET_KEY = "hm-design-system-return-target";
const RESTORE_TARGET_KEY = "hm-design-system-return-restore";
const RETURN_TTL = 30 * 60 * 1000;

type ReturnPayload = {
  createdAt: number;
  locale: DesignSystemLocale;
  scrollY: number;
  target: string;
};

function readPayload(key: string) {
  try {
    const raw = window.sessionStorage.getItem(key);
    if (!raw) return null;

    return JSON.parse(raw) as ReturnPayload;
  } catch {
    window.sessionStorage.removeItem(key);
    return null;
  }
}

function isDesignSystemPath(pathname: string) {
  return pathname === "/design-system" || pathname.endsWith("/design-system");
}

export function registerDesignSystemReturnTarget({
  locale,
  scrollY,
  target,
}: {
  locale: DesignSystemLocale;
  scrollY: number;
  target: string;
}) {
  window.sessionStorage.setItem(
    RETURN_TARGET_KEY,
    JSON.stringify({
      createdAt: Date.now(),
      locale,
      scrollY,
      target,
    } satisfies ReturnPayload),
  );
}

export default function DesignSystemReturnBar() {
  const pathname = usePathname();
  const [payload, setPayload] = useState<ReturnPayload | null>(null);

  useEffect(() => {
    let cancelled = false;
    const schedulePayload = (nextPayload: ReturnPayload | null) => {
      window.setTimeout(() => {
        if (!cancelled) {
          setPayload(nextPayload);
        }
      }, 0);
    };
    const current = readPayload(RETURN_TARGET_KEY);

    if (!current) {
      schedulePayload(null);
      return () => {
        cancelled = true;
      };
    }

    if (Date.now() - current.createdAt > RETURN_TTL) {
      window.sessionStorage.removeItem(RETURN_TARGET_KEY);
      schedulePayload(null);
      return () => {
        cancelled = true;
      };
    }

    if (isDesignSystemPath(pathname)) {
      const restore = readPayload(RESTORE_TARGET_KEY);

      window.sessionStorage.removeItem(RETURN_TARGET_KEY);
      window.sessionStorage.removeItem(RESTORE_TARGET_KEY);
      schedulePayload(null);

      if (restore) {
        window.setTimeout(() => {
          window.scrollTo({ top: restore.scrollY, behavior: "auto" });
        }, 120);
      }
      return () => {
        cancelled = true;
      };
    }

    schedulePayload(current);
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  if (!payload) {
    return null;
  }

  const label = payload.locale === "zh-TW" ? "返回 Design System" : "Return to Design System";

  return (
    <div className={styles.returnBar} role="region" aria-label={label}>
      <button
        className={styles.returnBarAction}
        onClick={() => {
          window.sessionStorage.setItem(RESTORE_TARGET_KEY, JSON.stringify(payload));
          window.location.assign(payload.target);
        }}
        type="button"
      >
        <span aria-hidden="true">←</span>
        {label}
      </button>
      <button
        aria-label={payload.locale === "zh-TW" ? "關閉返回提示" : "Dismiss return prompt"}
        className={styles.returnBarDismiss}
        onClick={() => {
          window.sessionStorage.removeItem(RETURN_TARGET_KEY);
          window.sessionStorage.removeItem(RESTORE_TARGET_KEY);
          setPayload(null);
        }}
        type="button"
      >
        ×
      </button>
    </div>
  );
}
