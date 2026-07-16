import { CaseCard, CaseMetricGrid, CaseSection } from "../../../components/case-study";
import { getDsTranslator } from "../i18n-server";

const outcomes = [
  {
    value: "307",
    label: "個唯一的設計 token",
    body: "這些 CSS custom properties 集中在 styles/tokens.css，涵蓋色彩、字級、間距、圓角、陰影與動態。",
    tone: "accent",
  },
  {
    value: "21",
    label: "個共用 case-study 元件",
    body: "Shell、Section、Card、Grid、Media 與 Before／After 等元件支援四個案例頁，重複結構只需維護一次。",
    tone: "accent",
  },
  {
    value: "3",
    label: "支自動檢查腳本",
    body: "自動檢查 token、素材連結與樣式歸屬，規則會由腳本直接檢查，不必只靠人記得。",
    tone: "teal",
  },
] as const;

export default async function OutcomeSection() {
  const { t } = await getDsTranslator();
  return (
    <CaseSection
      id="cs-sec-outcome"
      kicker={t("最終成果")}
      title={t("規範最後變成三組實際產出")}
    >
      <p className="cs-section-lead">
        {t("目前的系統規模，可以直接看這三組數字：")}
      </p>
      <CaseMetricGrid className="ds-case-card-grid ds-case-outcome-grid">
        {outcomes.map((outcome) => (
          <CaseCard className={`ds-case-outcome-metric ds-case-outcome-metric--${outcome.tone}`} variant="metric" key={outcome.label}>
            <span className="cs-metric-value">{t(outcome.value)}</span>
            <h3 className="cs-metric-label">{t(outcome.label)}</h3>
            <p className="cs-metric-body">{t(outcome.body)}</p>
          </CaseCard>
        ))}
      </CaseMetricGrid>
    </CaseSection>
  );
}
