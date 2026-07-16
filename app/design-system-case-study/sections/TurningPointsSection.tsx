import { CaseSection } from "../../../components/case-study";
import { getDsTranslator } from "../i18n-server";

const turningPoints = [
  {
    title: "文件描述與實際網站逐漸脫節",
    event: "第一版文件整理的是預期狀態，但網站仍保留寫死的顏色、分散的間距與各頁獨立 CSS。",
    finding: "比對文件與正式頁面後，才確認規劃內容不能直接代表實際使用方式。",
    change: "後來改成先盤點正式站，再依實際使用的結構更新規則與文件。",
  },
  {
    title: "大範圍修改讓跑版問題一起擴大",
    event: "早期有一批 AI 輔助修改同時動到多個案例頁，也太早把部分單頁版型抽成共用元件。",
    finding: "結果出現邊框重疊、間距改變，手機版也發生水平溢出。我因此確認：外觀相似，還不能當成共用依據。",
    change: "修改前先確認用途、會影響哪些頁面，以及哪些項目不能動，再決定是否共用。",
  },
  {
    title: "盤點、決策與實作混在同一批",
    event: "當盤點、決策、實作與檢查混在同一批工作中，問題發生後很難定位來源。",
    finding: "把階段拆開後，每次修改都能對應到明確範圍和檢查條件，也會留下可以退回的版本。",
    change: "每次修改先盤點現況和受影響頁面。遇到設計意圖、用途或共用取捨，再由我先做判斷，寫清楚範圍與驗收條件後才執行。",
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
        {t("問題依序出在文件、改動範圍和工作批次；每一次都讓我補上一條新的執行規則。")}
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
