"use client";

import lottie, { type AnimationItem } from "lottie-web";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const languageOptions: Array<{ locale: Locale; label: string }> = [
  { locale: "en", label: "English" },
  { locale: "zh-TW", label: "繁體中文" },
];

export default function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const switcherRef = useRef<HTMLDivElement>(null);
  const loadingTimerRef = useRef<number | null>(null);
  const [prevLocale, setPrevLocale] = useState(locale);

  // locale 切換完成後關閉 loading overlay：render 階段條件式更新，
  // 是 React 建議的「prop 改變時調整 state」做法，避免在 effect 內同步 setState。
  if (prevLocale !== locale) {
    setPrevLocale(locale);
    if (showLoading) {
      setShowLoading(false);
    }
  }

  useEffect(() => {
    document.documentElement.lang = locale === "zh-TW" ? "zh-Hant-TW" : "en";
  }, [locale]);

  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) {
        window.clearTimeout(loadingTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!switcherRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale) {
      setOpen(false);
      return;
    }

    const hash = window.location.hash;
    setOpen(false);
    setShowLoading(true);
    loadingTimerRef.current = window.setTimeout(() => {
      startTransition(() => {
        router.replace(`${pathname}${hash}`, { locale: nextLocale });
      });
    }, 2160);
  }

  return (
    <>
      <div ref={switcherRef} className={`language-switcher ${open ? "is-open" : ""}`}>
        <button
          className="language-switcher-trigger"
          type="button"
          aria-label={t("select")}
          aria-expanded={open}
          aria-haspopup="menu"
          disabled={isPending || showLoading}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{t("current")}</span>
          <ChevronDown aria-hidden="true" size={12} strokeWidth={1.5} />
        </button>

        <div className="language-switcher-menu" role="menu" aria-label={t("menu")}>
          {languageOptions.map((option) => (
            <button
              key={option.locale}
              type="button"
              role="menuitemradio"
              aria-checked={locale === option.locale}
              className={locale === option.locale ? "is-active" : ""}
              disabled={isPending || showLoading}
              onClick={() => switchLocale(option.locale)}
            >
              <span>{option.label}</span>
              {locale === option.locale && <span aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
      </div>
      {(showLoading || isPending) && (
        <LanguageLoadingPortal label={t("loading")} />
      )}
    </>
  );
}

function LanguageLoadingPortal({ label }: { label: string }) {
  return createPortal(
    <>
      <div className="language-loading-backdrop" aria-hidden="true" />
      <LanguageLoadingOverlay label={label} />
    </>,
    document.body,
  );
}

function LanguageLoadingOverlay({ label }: { label: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animation: AnimationItem = lottie.loadAnimation({
      container,
      renderer: "svg",
      loop: !reducedMotion,
      autoplay: !reducedMotion,
      path: "/animations/language-loading.json",
    });

    if (reducedMotion) {
      const showFirstFrame = () => animation.goToAndStop(0, true);
      animation.addEventListener("DOMLoaded", showFirstFrame);
    }

    return () => {
      animation.destroy();
    };
  }, []);

  return (
    <div className="language-loading-overlay" role="status" aria-label={label}>
      <div ref={containerRef} className="language-loading-animation" aria-hidden="true" />
    </div>
  );
}
