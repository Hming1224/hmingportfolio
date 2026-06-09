"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { useLocale } from "next-intl";
import type { Locale } from "../../../i18n/routing";
import { translateAdvantech } from "../i18n";

type FeatureImageLightboxProps = {
  alt: string;
  height: number;
  src: string;
  width: number;
};

export default function FeatureImageLightbox({
  alt,
  height,
  src,
  width,
}: FeatureImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const locale = useLocale() as Locale;
  const t = (text: string) => translateAdvantech(locale, text);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="cs-feature-zoom-trigger"
        aria-label={`${t("放大檢視")}${t("：")}${alt}`}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          unoptimized
          style={{ width: "100%", height: "auto" }}
        />
      </button>

      {isOpen ? (
        <div
          className="cs-feature-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <p id={titleId} className="sr-only">
            {alt}
          </p>
          <button
            type="button"
            className="cs-feature-lightbox-close"
            aria-label={t("關閉放大圖片")}
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            unoptimized
            className="cs-feature-lightbox-image"
            priority={false}
          />
        </div>
      ) : null}
    </>
  );
}
