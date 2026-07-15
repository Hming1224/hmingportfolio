import { CaseCard, CaseMetricGrid, CaseSection } from "../../../components/case-study";
import { getDsTranslator } from "../i18n-server";

const outcomes = [
  {
    value: "307",
    label: "個唯一設計 token",
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
    body: "自動檢查 token、素材連結與樣式 ownership，讓規則不必只靠人工記憶。",
    tone: "teal",
  },
] as const;

export default async function OutcomeSection() {
  const { t } = await getDsTranslator();
  return (
    <CaseSection
      id="cs-sec-outcome"
      kicker={t("最終成果")}
      title={t("不是一份規範，而是實際存在的產出")}
    >
      <p className="cs-section-lead">
        {t("前面談的是怎麼決定、怎麼維護；這裡直接看它實際長成什麼規模。三個數字：")}
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
