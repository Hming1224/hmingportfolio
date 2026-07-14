import { CaseCard, CaseGrid, CaseMetricGrid, CaseSection } from "../../../components/case-study";
import TermNotes from "../components/TermNotes";
import { getDsTranslator } from "../i18n-server";

const outcomeMetrics = [
  {
    value: "268",
    label: "runtime design tokens",
    body: "以 styles/tokens.css 為 source of truth，目前掃到 268 個唯一 CSS custom properties，集中管理顏色、字級、間距、圓角、陰影與 motion。",
  },
  {
    value: "19",
    label: "共用 case-study 元件",
    body: "CaseStudyShell、Section、Card、Grid、Media、Before / After 等 19 個共用元件，支撐 4 個案例頁的主要敘事結構。",
  },
  {
    value: "10",
    label: "核心規格文件",
    body: "docs/design-system/00–09 收斂成 10 份核心文件，涵蓋 foundations、tokens、components、patterns、governance 與 workflow。",
  },
  {
    value: "5",
    label: "核心圓角 token",
    body: "目前 production token 層以 sm / md / lg / pill / button 作為主要圓角尺度，讓新元件優先吃同一組規則。",
  },
  {
    value: "19",
    label: "motion tokens",
    body: "duration、easing、transition 相關 token 集中在 tokens.css；route-specific 動畫可以保留，但共用節奏先回到同一層管理。",
  },
  {
    value: "3",
    label: "validation scripts",
    body: "check-design-tokens、check-links 與 architecture audit 負責檢查 token、素材連結和樣式 ownership，讓規則不是只靠人工記得。",
  },
];

const guardrails = [
  { name: "Token check", body: "檢查是否又出現寫死的顏色值，避免設計規則在日常修改中慢慢流失。" },
  { name: "Asset check", body: "確認頁面引用的圖片和媒體都真的存在，避免作品集上線後出現失效素材。" },
  { name: "Architecture audit", body: "檢查案例頁樣式是否維持在自己的範圍內，避免單頁調整影響到其他作品。" },
];

export default async function OutcomeSection() {
  const { t } = await getDsTranslator();
  return (
    <CaseSection id="cs-sec-outcome" kicker={t("OUTCOME")} title={t("產出與防護網")}>
      <p className="cs-section-lead">{t("系統建好只是開始，更重要的是它能不能防止之後慢慢走樣。先看幾個數字：")}</p>
      <CaseMetricGrid className="ds-case-card-grid">
        {outcomeMetrics.map((metric) => (
          <CaseCard variant="metric" key={metric.label}>
            <span className="cs-metric-value">{t(metric.value)}</span>
            <h3 className="cs-metric-label">{t(metric.label)}</h3>
            <p className="cs-metric-body">{t(metric.body)}</p>
          </CaseCard>
        ))}
      </CaseMetricGrid>
      <p className="cs-section-lead ds-case-guard-lead">{t("再看防護網——規則被打破時，讓工具先發現，不用只靠人工檢查：")}</p>
      <CaseGrid variant="three" className="ds-case-card-grid ds-case-guard-grid">
        {guardrails.map((guard) => (
          <CaseCard key={guard.name}>
            <h3 className="ds-case-guard-name">{t(guard.name)}</h3>
            <p>{t(guard.body)}</p>
          </CaseCard>
        ))}
      </CaseGrid>
      <TermNotes
        title={t("名詞註釋")}
        ariaLabel={t("專有名詞註釋")}
        items={[
          { term: t("Validation script"), description: t("Validation script 是自動檢查規則是否被破壞的小工具，例如檢查 token 使用、素材連結或架構邊界。") },
          { term: t("Architecture audit"), description: t("Architecture audit 是檢查檔案和樣式是否仍符合約定，避免單頁修改慢慢影響到全站。") },
        ]}
      />
    </CaseSection>
  );
}
