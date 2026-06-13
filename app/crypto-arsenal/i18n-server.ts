import { getLocale } from "next-intl/server";
import type { Locale } from "../../i18n/routing";
import { translateCryptoArsenal } from "./i18n";

export async function getCryptoArsenalTranslator() {
  const locale = (await getLocale()) as Locale;
  return {
    locale,
    t: (text: string) => translateCryptoArsenal(locale, text),
  };
}
