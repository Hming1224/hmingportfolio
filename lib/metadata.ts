import type { Metadata } from "next";
import type { Locale } from "../i18n/routing";

export const siteUrl = new URL("https://hmingportfolio.vercel.app");

type LocalizedMetadata = Record<
  Locale,
  {
    title: string;
    description: string;
  }
>;

export function createLocalizedMetadata(
  locale: Locale,
  path: string,
  copy: LocalizedMetadata,
): Metadata {
  const normalizedPath = path === "/" ? "" : path;
  const localizedPath = `/${locale}${normalizedPath}`;
  const title = copy[locale].title;
  const description = copy[locale].description;

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath,
      languages: {
        en: `/en${normalizedPath}`,
        "zh-Hant-TW": `/zh-TW${normalizedPath}`,
        "x-default": `/en${normalizedPath}`,
      },
    },
    openGraph: {
      title,
      description,
      url: localizedPath,
      locale: locale === "zh-TW" ? "zh_TW" : "en_US",
      alternateLocale: locale === "zh-TW" ? ["en_US"] : ["zh_TW"],
    },
    twitter: {
      title,
      description,
    },
  };
}
