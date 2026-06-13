"use client";

import { useLocale } from "next-intl";
import type { Locale } from "../../../i18n/routing";
import { ZoomableImage } from "../../../components/case-study";
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
  const locale = useLocale() as Locale;
  const t = (text: string) => translateAdvantech(locale, text);

  return (
    <ZoomableImage
      alt={alt}
      className="cs-feature-zoom-trigger"
      height={height}
      labels={{
        close: t("關閉放大圖片"),
        separator: t("："),
        zoom: t("放大檢視"),
      }}
      src={src}
      width={width}
    />
  );
}
