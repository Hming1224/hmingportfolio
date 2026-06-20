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

  const meta = createLocalizedMetadata(locale, "/", {
    en: {
      title: "Brian Huang's Portfolio",
      description:
        "Brian Huang is a product designer focused on UX research, interface design, prototyping, and AI-assisted product building.",
    },
    "zh-TW": {
      title: "黃宣銘的作品集",
      description:
        "黃宣銘 Brian Huang 的產品設計作品集，專注於使用者研究、介面設計、原型製作與 AI 協作產品開發。",
    },
  });

  // 首頁標題不套用 layout 的 "%s | Brian Huang" 模板，避免變成「Brian Huang's Portfolio | Brian Huang」重複品牌名
  return { ...meta, title: { absolute: meta.title as string } };
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
