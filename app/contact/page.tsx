import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import type { Locale } from "../../i18n/routing";
import { createLocalizedMetadata } from "../../lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;

  return createLocalizedMetadata(locale, "/contact", {
    en: {
      title: "Contact",
      description:
        "Contact Brian Huang for product design, UX/UI design, and collaboration opportunities.",
    },
    zh: {
      title: "聯絡我",
      description:
        "聯絡黃宣銘 Brian Huang，洽談產品設計、UX/UI 設計與合作機會。",
    },
  });
}

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <Contact />
      <Footer />
    </main>
  );
}
