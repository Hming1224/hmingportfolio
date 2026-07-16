import Image from "next/image";
import { CaseInfoGrid } from "../../../components/case-study";
import { ASSET } from "../data";
import { getDsTranslator } from "../i18n-server";

const infoItems = [
  { label: "時間", value: ["2026.06 – 現在（持續迭代中）"] },
  { label: "角色", value: ["Product Designer / Design System Owner"] },
  { label: "我的責任", value: ["問題定義", "設計決策", "元件邊界", "驗收標準"] },
  {
    label: "AI 協助",
    value: [
      "程式與樣式盤點",
      "候選方案整理",
      "程式實作與除錯",
      "自動化檢查",
    ],
  },
];

export default async function HeroSection() {
  const { t } = await getDsTranslator();
  const heroInfoItems = infoItems.map((item) => ({
    label: t(item.label),
    value: (
      <>
        {item.value.map((value) => (
          <span key={value}>{t(value)}</span>
        ))}
      </>
    ),
  }));

  return (
    <section>
      <div className="cs-hero-cover ds-case-hero__visual">
        <div className="cs-hero-cover-img">
          <Image
            src={`${ASSET}/cover/cover.webp`}
            alt={t("Design System Case Study cover showing tokens, component cards, and governance workflow.")}
            fill
            priority
            sizes="100vw"
          />
        </div>
      </div>

      <div className="cs-hero-info ds-case-hero__info">
        <div className="cs-hero-meta">
          {t("Design System / 自發專案")}
        </div>
        <h1 className="cs-title">
          {t("把自己的作品集當產品做：一套邊用邊長出來的 Design System")}
        </h1>
        <p className="ds-case-hero__subtitle">
          {t("這個專案從製作作品集網站的過程延伸而來。我負責定義問題、元件邊界與驗收標準，AI 協助盤點、實作和驗證，再把規則與修改紀錄整理成一套可長期維護的 Design System。")}
        </p>
        <CaseInfoGrid items={heroInfoItems} className="cs-info-row--divided ds-case-info-grid" />
      </div>
    </section>
  );
}
