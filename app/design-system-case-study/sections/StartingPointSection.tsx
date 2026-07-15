import Image from "next/image";
import { CaseMedia, CaseSection } from "../../../components/case-study";
import { ASSET } from "../data";
import { getDsTranslator } from "../i18n-server";

export default async function StartingPointSection() {
  const { t } = await getDsTranslator();

  return (
    <CaseSection
      id="cs-sec-motivation"
      kicker={t("起心動念")}
      title={t("當作品集持續成長，分散在各頁的設計規則開始難以維護")}
      surface
    >
      <div className="ds-case-prose">
        <p className="cs-section-lead">
          {t("作品集一開始以快速完成頁面為主；隨著案例增加，原本適合單頁的做法開始讓重複版型與分散樣式增加跨頁同步與維護成本。")}
        </p>
        <p className="cs-section-lead">
          {t("我知道需要一套 Design System，把能共用的規則整理起來；但當時只有方向，還不清楚文件、元件和實際程式應該怎麼連在一起。")}
        </p>
        <p className="cs-section-lead">
          {t("我先參考 Ant Design 與 Google Material Design，逐項比較作品集的顏色層級、間距、圓角、字級，以及 hover、focus、disabled 等元件狀態，共整理出十幾個缺口。")}
        </p>
        <p className="cs-section-lead">
          {t("接著用 Figma Make 做出包含系統介紹、缺口清單與升級計畫的互動雛形，先把腦中模糊的「想要一套系統」變成看得見、可以討論的第一版規劃。")}
        </p>
      </div>

      <CaseMedia
        className="ds-case-media"
        caption={t("Figma Make 第一版互動雛形：先把 Design System 的方向變成可以討論的介面。")}
      >
        <Image
          src={`${ASSET}/research/figma-make-prototype.webp`}
          alt={t("Design System 第一版互動雛形，包含系統介紹、缺口清單與升級計畫。")}
          width={1440}
          height={960}
          sizes="(max-width: 768px) calc(100vw - 48px), calc(100vw - 96px)"
        />
      </CaseMedia>
    </CaseSection>
  );
}
