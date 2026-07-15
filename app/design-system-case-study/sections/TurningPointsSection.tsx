import { CaseCard, CaseSection } from "../../../components/case-study";
import { getDsTranslator } from "../i18n-server";

const turningPoints = [
  {
    title: "文件描述與實際網站逐漸脫節",
    event: "第一版文件整理的是預期狀態，但網站仍保留寫死的顏色、分散的間距與各頁獨立 CSS。",
    finding: "比對文件與正式頁面後，才確認規劃內容不能直接代表實際使用方式。",
    change: "後續改為先盤點 live site，再依真實結構更新規則與文件。",
  },
  {
    title: "大範圍修改放大 visual regression",
    event: "早期一次 AI 輔助修改同時觸及多個案例頁，部分單頁版型過早共用。",
    finding: "邊框重疊、間距改變與手機版水平溢出，顯示外觀相似不足以成為共用依據。",
    change: "修改前先確認用途、影響 route 與不可改動項目，再決定是否共用。",
  },
  {
    title: "改成小批次實作與逐批驗收",
    event: "當盤點、決策、實作與檢查混在同一批工作中，問題發生後很難定位來源。",
    finding: "拆開階段後，每次修改都有明確範圍、檢查條件與可回復版本。",
    change: "形成先盤點、後決策、再實作與驗收的維護方式。",
  },
];

const workflowSteps = [
  { title: "唯讀盤點", body: "先找出實際使用位置、重複模式與可能受影響的頁面，不直接修改。" },
  { title: "確認決策與範圍", body: "由我確認元件邊界、不可修改項目與驗收標準。" },
  { title: "小批次實作", body: "規格確認後，由 AI 在有限範圍內調整程式，避免一次觸及過多頁面。" },
  { title: "自動檢查與人工驗收", body: "先檢查程式與 route，再確認雙語、版面、互動與案例差異；通過後保留版本紀錄。" },
];

export default async function TurningPointsSection() {
  const { t } = await getDsTranslator();
  return (
    <CaseSection
      id="cs-sec-turning-points"
      kicker={t("三次轉折")}
      title={t("三次實際問題，讓流程轉向先盤點、小批次修改與驗收")}
    >
      <p className="cs-section-lead">
        {t("這三次轉折讓我重新界定設計決策、AI 執行範圍與品質驗收的責任。")}
      </p>
      <div className="ds-case-timeline">
        {turningPoints.map((item, index) => (
          <CaseCard className="ds-case-timeline__item" key={item.title}>
            <span className="ds-case-index">{String(index + 1).padStart(2, "0")}</span>
            <h3>{t(item.title)}</h3>
            <p><strong>{t("發生什麼")}</strong>{t(item.event)}</p>
            <p><strong>{t("如何發現")}</strong>{t(item.finding)}</p>
            <p className="ds-case-lesson"><strong>{t("因此改變")}</strong>{t(item.change)}</p>
          </CaseCard>
        ))}
      </div>

      <div className="ds-case-workflow" aria-labelledby="ds-case-workflow-title">
        <div className="ds-case-workflow__header">
          <h3 id="ds-case-workflow-title">{t("調整後的修改流程")}</h3>
          <p>{t("流程先把判斷與執行分開，再用自動檢查與人工驗收共同決定是否保留變更。")}</p>
        </div>
        <ol className="ds-case-workflow__list ds-case-workflow__list--four">
          {workflowSteps.map((step, index) => (
            <li className="ds-case-workflow__item" key={step.title}>
              <span className="ds-case-workflow__index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h4>{t(step.title)}</h4>
              <p>{t(step.body)}</p>
            </li>
          ))}
        </ol>
      </div>
    </CaseSection>
  );
}
