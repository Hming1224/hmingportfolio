"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";
import type { Locale } from "../../../i18n/routing";
import { ZoomableImage } from "../../../components/case-study";
import { translateAdvantech } from "../i18n";
import { setupFeatureConnectors } from "../../../components/case-study/FeatureConnectors";

type FeatureImageLightboxProps = {
  alt: string;
  className?: string;
  height: number;
  imageClassName?: string;
  lightboxMode?: "default" | "fullscreen";
  sizes?: string;
  src: string;
  width: number;
};

export default function FeatureImageLightbox({
  alt,
  className,
  height,
  imageClassName,
  lightboxMode,
  sizes,
  src,
  width,
}: FeatureImageLightboxProps) {
  const locale = useLocale() as Locale;
  const t = (text: string) => translateAdvantech(locale, text);

  useEffect(() => {
    setupFeatureConnectors();
  }, []);

  return (
    <ZoomableImage
      alt={alt}
      className={`cs-feature-zoom-trigger${className ? ` ${className}` : ""}`}
      height={height}
      imageClassName={imageClassName}
      labels={{
        close: t("關閉放大圖片"),
        separator: t("："),
        zoom: t("放大檢視"),
      }}
      lightboxMode={lightboxMode}
      sizes={sizes}
      src={src}
      width={width}
    />
  );
}
