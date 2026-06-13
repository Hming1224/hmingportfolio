"use client";

import { useLocale } from "next-intl";
import type { Locale } from "../../../i18n/routing";
import { ZoomableImage } from "../../../components/case-study";
import { translateCryptoArsenal } from "../i18n";

type StepLightboxProps = {
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  src: string;
  width: number;
  height: number;
};

export default function StepLightbox({
  alt,
  className = "ca-step-zoom",
  height,
  imageClassName,
  sizes,
  src,
  width,
}: StepLightboxProps) {
  const locale = useLocale() as Locale;
  const t = (text: string) => translateCryptoArsenal(locale, text);

  return (
    <ZoomableImage
      alt={alt}
      className={className}
      height={height}
      imageClassName={imageClassName}
      labels={{
        close: t("關閉放大圖片"),
        separator: t("："),
        zoom: t("放大檢視"),
      }}
      sizes={sizes}
      src={src}
      width={width}
    />
  );
}
