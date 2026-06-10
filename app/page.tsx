import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Works from '../components/Works';
import Footer from '../components/Footer';
import type { Locale } from "../i18n/routing";
import { createLocalizedMetadata } from "../lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;

  return createLocalizedMetadata(locale, "/", {
    en: {
      title: "Product Designer Portfolio",
      description:
        "Brian Huang is a product designer focused on UX research, interface design, prototyping, and AI-assisted product building.",
    },
    "zh-TW": {
      title: "產品設計師作品集",
      description:
        "黃宣銘 Brian Huang 的產品設計作品集，專注於使用者研究、介面設計、原型製作與 AI 協作產品開發。",
    },
  });
}

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Works />
      <Footer />
    </main>
  );
}
