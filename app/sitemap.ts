import type { MetadataRoute } from "next";
import { routing } from "../i18n/routing";
import { siteUrl } from "../lib/metadata";

const paths = ["", "/about-me", "/contact", "/ai-impact", "/advantech", "/laushu", "/crypto-arsenal"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: new URL(`/${locale}${path}`, siteUrl).toString(),
      alternates: {
        languages: {
          en: new URL(`/en${path}`, siteUrl).toString(),
          "zh-Hant-TW": new URL(`/zh${path}`, siteUrl).toString(),
          "x-default": new URL(`/en${path}`, siteUrl).toString(),
        },
      },
    })),
  );
}
