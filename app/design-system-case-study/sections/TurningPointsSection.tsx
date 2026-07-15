import { CaseSection } from "../../../components/case-study";
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
    change: "每次修改先盤點現況與影響 route；若涉及設計意圖、用途或共用取捨，就先由我判斷，再定義範圍與驗收條件後執行。",
  },
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
          <article className="ds-case-timeline__item" key={item.title}>
            <header className="ds-case-timeline__header">
              <span className="ds-case-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{t(item.title)}</h3>
            </header>
            <p className="ds-case-timeline__body">{t(item.event)} {t(item.finding)}</p>
            <p className="ds-case-lesson"><strong>{t("修正方向")}</strong>{t(item.change)}</p>
          </article>
        ))}
      </div>
    </CaseSection>
  );
}
