import { getLocale } from "next-intl/server";
import type { Locale } from "../../i18n/routing";
import { translateDs } from "./i18n";

export async function getDsTranslator() {
  const locale = (await getLocale()) as Locale;
  return {
    locale,
    t: (text: string) => translateDs(locale, text),
  };
}
