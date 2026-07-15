import Image from "next/image";
import { CaseInfoGrid } from "../../../components/case-study";
import { ASSET } from "../data";
import { getDsTranslator } from "../i18n-server";

const infoItems = [
  { label: "時間", value: ["2026.06 – 現在（持續迭代中）"] },
  { label: "角色", value: ["Product Designer"] },
  { label: "負責項目", value: ["研究整理", "系統規劃", "元件盤點", "AI 協作流程設計", "前端實作驗證"] },
  {
    label: "產出",
    value: [
      "Design system documentation",
      "Markdown 規格文件",
      "design tokens",
      "共用 case-study components",
      "validation scripts",
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
          {t("Design System / Self-initiated Side Project")}
        </div>
        <h1 className="cs-title">
          {t("把自己的作品集當產品做：一套邊用邊長出來的 Design System")}
        </h1>
        <p className="ds-case-hero__subtitle">
          {t("這是我在製作作品集網站時主動開始的 side project。我把網站本身當成產品，逐步建立 design tokens、元件契約和 AI-assisted workflow。隨著樣式開始重複、元件邊界變得模糊，AI 協作也出現風險，我把一路遇到的問題整理成能維護、能驗證，也查得到修改紀錄的工作方式。")}
        </p>
        <CaseInfoGrid items={heroInfoItems} className="cs-info-row--divided ds-case-info-grid" />
      </div>
    </section>
  );
}
