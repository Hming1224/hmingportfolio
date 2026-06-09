"use client";

import { useLocale } from "next-intl";
import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const languageOptions: Array<{ locale: Locale; label: string }> = [
  { locale: "en", label: "English" },
  { locale: "zh", label: "中文" },
];

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const switcherRef = useRef<HTMLDivElement>(null);

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
    startTransition(() => {
      router.replace(`${pathname}${hash}`, { locale: nextLocale });
    });
  }

  return (
    <div ref={switcherRef} className={`language-switcher ${open ? "is-open" : ""}`}>
      <button
        className="language-switcher-trigger"
        type="button"
        aria-label="選擇語言"
        aria-expanded={open}
        aria-haspopup="menu"
        disabled={isPending}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{locale === "en" ? "EN" : "中文"}</span>
        <svg viewBox="0 0 12 12" aria-hidden="true">
          <path d="m2.5 4.5 3.5 3 3.5-3" />
        </svg>
      </button>

      <div className="language-switcher-menu" role="menu" aria-label="語言選單">
        {languageOptions.map((option) => (
          <button
            key={option.locale}
            type="button"
            role="menuitemradio"
            aria-checked={locale === option.locale}
            className={locale === option.locale ? "is-active" : ""}
            onClick={() => switchLocale(option.locale)}
          >
            <span>{option.label}</span>
            {locale === option.locale && <span aria-hidden="true">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
