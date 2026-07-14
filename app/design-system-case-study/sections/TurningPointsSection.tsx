import { CaseCard, CaseSection } from "../../../components/case-study";
import TermNotes from "../components/TermNotes";
import { getDsTranslator } from "../i18n-server";

const turningPoints = [
  {
    title: "轉折一：設計文件和實際 code 脫節",
    body: "第一版規劃整理成了設計文件，但實際網站裡仍有許多寫死的顏色、間距和每頁各自的 CSS 解法。文件描述的是理想狀態，卻沒有同步反映 production code 的真實狀況。",
    lesson: "後來我把 production code 視為 source of truth：先盤點實際狀態，再更新文件和規則。",
  },
  {
    title: "轉折二：沒有先 audit 的大範圍修改，造成視覺回歸",
    body: "早期我曾讓 AI 依照完整計劃一次處理多個案例頁，結果把原本屬於單頁敘事的版型過早推進共用層，造成邊框疊加、間距跑掉和手機版水平溢出。",
    lesson: "這次學到的是：不管誰來執行，動手前都要先釐清影響範圍和層級。",
  },
  {
    title: "轉折三：把風險整理成可重複的流程",
    body: "後來我把 AI 協作拆成診斷、實作、驗證和回歸檢查的分段流程。AI 仍然可以協助執行，但每一步都有明確邊界、驗證條件和可回溯的 checkpoint。",
    lesson: "audit → implementation → validation → smoke → commit → push。",
  },
];

const workflowSteps = [
  { title: "Audit", body: "先盤點現況與風險，確認這次要改的是樣式、元件、內容，還是頁面結構。" },
  { title: "Implementation", body: "一次只修改一個明確範圍，避免把太多問題混在同一批改動裡。" },
  { title: "Validation", body: "用 lint、token 檢查與 build 確認基礎品質。" },
  { title: "Smoke", body: "在主要頁面與斷點快速檢查畫面、互動與 console，確認沒有明顯回歸。" },
  { title: "Commit", body: "驗證通過後才建立 checkpoint，讓每次改動都可以被追蹤。" },
  { title: "Push", body: "先推到 feature branch，經過 preview 與人工確認後再合併到 main。" },
];

export default async function TurningPointsSection() {
  const { t } = await getDsTranslator();
  return (
    <CaseSection id="cs-sec-turning-points" kicker={t("TURNING POINTS")} title={t("三次轉折：這個專案學到最多的三段")}>
      <p className="cs-section-lead">
        {t("這套系統很難說是一次「建」好的，比較像是一路修出來的——每次轉折，都讓我放掉一個原本以為理所當然的假設。")}
      </p>
      <div className="ds-case-timeline">
        {turningPoints.map((item, index) => (
          <CaseCard className="ds-case-timeline__item" key={item.title}>
            <span className="ds-case-index">{String(index + 1).padStart(2, "0")}</span>
            <h3>{t(item.title)}</h3>
            <p>{t(item.body)}</p>
            <p className="ds-case-lesson">{t(item.lesson)}</p>
          </CaseCard>
        ))}
      </div>
      <div className="ds-case-workflow" aria-labelledby="ds-case-workflow-title">
        <div className="ds-case-workflow__header">
          <h3 id="ds-case-workflow-title">{t("AI collaboration workflow")}</h3>
          <p>
            {t("我設計這套 AI-assisted workflow，是為了讓 AI 協作可以被管理、驗證與回溯。")}
            {t("先診斷，再小範圍改動；每一步都驗證，最後才建立可回溯的 checkpoint。")}
          </p>
        </div>
        <ol className="ds-case-workflow__list">
          {workflowSteps.map((step, index) => (
            <li className="ds-case-workflow__item" key={step.title}>
              <span className="ds-case-workflow__index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h4>{t(step.title)}</h4>
              <p>{t(step.body)}</p>
            </li>
          ))}
        </ol>
      </div>
      <TermNotes
        title={t("名詞註釋")}
        ariaLabel={t("專有名詞註釋")}
        items={[
          { term: t("Regression"), description: t("Regression 指修改後意外破壞原本正常的畫面或互動。") },
          { term: t("Smoke testing"), description: t("Smoke testing 是快速檢查主要頁面、斷點與互動是否仍正常，用來及早發現明顯問題。") },
          { term: t("Rollback"), description: t("Rollback 是在改動出問題時，能回到上一個穩定版本。") },
          { term: t("Production code as source of truth"), description: t("這裡指最終判斷以實際上線程式碼為準，而不是只看文件或設計稿。") },
        ]}
      />
    </CaseSection>
  );
}
