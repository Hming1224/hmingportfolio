import Image from "next/image";
import { CaseCard, CaseFlowFrame, CaseGrid, CaseMedia, CaseSection } from "../../../components/case-study";
import { ASSET } from "../data";
import { getDsTranslator } from "../i18n-server";

const motivationCards = [
  {
    title: "頁面增加後，重複實作難以同步",
    observation: "相似版型、顏色與間距分散在不同案例頁，各頁先以自己的方式完成。",
    impact: "同類畫面逐漸不一致，修改時也需要逐頁確認結構與樣式。",
    reason: "需要把穩定重複的規則集中管理，同時保留案例內容的差異。",
  },
  {
    title: "AI 協作需要明確的修改邊界",
    observation: "AI 能快速搜尋與修改大量程式碼，但外觀相似不代表用途相同。",
    impact: "若範圍、規格與驗收條件不清楚，快速修改也可能放大 visual regression。",
    reason: "需要先由我定義元件邊界與品質標準，再讓 AI 協助執行。",
  },
  {
    title: "把 Design System 的理解落實到真實產品",
    observation: "第一版規劃整理了理想狀態，但文件內容尚未完整對應實際網站。",
    impact: "若 code 與文件各自維護，規則很快又會回到個人記憶與零散說明中。",
    reason: "需要建立一套能被實際程式、文件與協作者共同使用的依據。",
  },
];

const growthFlow = ["案例增加", "重複實作", "規則分散", "修改風險提高"];

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
          {t("作品集一開始以快速完成頁面為主。這個做法讓內容能先成形並公開展示，也符合當時的需求。")}
        </p>
        <p className="cs-section-lead">
          {t("隨著案例增加，重複版型、分散樣式與跨頁修改風險逐漸浮現。使用 AI 協助盤點與開發後，我也發現速度只有在規則、分工與驗收方式清楚時，才能轉化為穩定品質。")}
        </p>
        <p className="cs-section-lead">
          {t("我參考成熟 Design System 的資訊架構，再以作品集的實際需求為準，逐步建立 design tokens、component contracts 與 AI-assisted workflow。")}
        </p>
      </div>

      <CaseFlowFrame
        className="ds-case-growth-flow"
        caption={t("各頁原本都有設計，但設計依據分散後，修改成本與影響範圍也跟著增加。")}
        scrollHintLabel={t("左右滑動查看流程")}
        variant="plain"
      >
        <ol className="ds-case-growth-flow__list">
          {growthFlow.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{t(step)}</strong>
            </li>
          ))}
        </ol>
      </CaseFlowFrame>

      <CaseGrid variant="three" className="ds-case-card-grid ds-case-motivation-grid">
        {motivationCards.map((card, index) => (
          <CaseCard className="ds-case-motivation-card" key={card.title}>
            <span className="ds-case-index-chip">{t("動機")} {String(index + 1).padStart(2, "0")}</span>
            <h3>{t(card.title)}</h3>
            <dl>
              <div><dt>{t("觀察")}</dt><dd>{t(card.observation)}</dd></div>
              <div><dt>{t("影響")}</dt><dd>{t(card.impact)}</dd></div>
              <div><dt>{t("為什麼要處理")}</dt><dd>{t(card.reason)}</dd></div>
            </dl>
          </CaseCard>
        ))}
      </CaseGrid>

      <CaseMedia
        className="ds-case-media"
        caption={t("第一版互動雛形先整理理想狀態；後續再以實際網站為準，補上元件邊界與驗證流程。")}
      >
        <Image
          src={`${ASSET}/research/figma-make-prototype.webp`}
          alt={t("Design System 第一版互動雛形，包含系統介紹、缺口清單與升級計畫。")}
          width={1440}
          height={960}
          sizes="(max-width: 768px) calc(100vw - 48px), calc(100vw - 96px)"
        />
      </CaseMedia>

      <p className="ds-case-editorial-statement">
        {t("把設計規則從個人記憶中移出，建立成 code、文件與協作者都能讀取的共同依據。")}
      </p>
    </CaseSection>
  );
}
