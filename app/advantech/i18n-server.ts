import { getLocale } from "next-intl/server";
import type { Locale } from "../../i18n/routing";
import { translateAdvantech } from "./i18n";

export async function getAdvantechTranslator() {
  const locale = (await getLocale()) as Locale;
  return {
    locale,
    t: (text: string) => translateAdvantech(locale, text),
  };
}
