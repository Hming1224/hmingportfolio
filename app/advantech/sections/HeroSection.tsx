import { CaseHero, type CaseInfoItem } from "../../../components/case-study";
import { getAdvantechTranslator } from "../i18n-server";

export default async function HeroSection() {
  const { t } = await getAdvantechTranslator();
  const infoItems: CaseInfoItem[] = [
    {
      label: t("時間進程"),
      value: (
        <span className="cs-info-value--timeline">
          <span>2024.06</span>
          <span className="cs-info-timeline-sep" aria-hidden="true">–</span>
          <span>2024.08</span>
        </span>
      ),
    },
    {
      label: t("團隊成員"),
      value: (
        <>
          {t("2 位設計師")}
          <br />
          {t("2 位後端工程師")}
          <br />
          {t("1 位 PM")}
        </>
      ),
    },
    { label: t("我的角色"), value: t("UIUX 設計師") },
    {
      label: t("負責項目"),
      value: (
        <>
          {t("競品分析")}
          <br />
          {t("終端使用者訪談")}
          <br />
          {t("線框稿")}
          <br />
          {t("原型設計")}
          <br />
          {t("產品行銷影片")}
        </>
      ),
    },
    {
      label: t("使用軟體"),
      value: (
        <>
          Figma
          <br />
          FigJam
          <br />
          Canva
          <br />
          Screen studio
          <br />
          Adobe After Effects
        </>
      ),
    },
  ];

  return (
    <CaseHero
      cover={{
        src: "/projects/advantech/cover/hero-cover.webp",
        alt: "WISE-iEMS ECOWatch UI",
      }}
      meta={
        <>
          <span className="cs-badge">Early Design Project</span>
          <span className="cs-tags">WEB・B2B・AI Chatbot・UX Design・UI Design</span>
        </>
      }
      title={t("賦能廠務人員與系統整合商：以生成式 AI 優化 EcoWatch 與 HVAC 維運使用流程")}
      infoItems={infoItems}
      infoGridClassName="cs-info-row--divided"
    />
  );
}
