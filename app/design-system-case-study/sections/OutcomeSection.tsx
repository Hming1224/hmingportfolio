import { CaseCard, CaseMetricGrid, CaseSection } from "../../../components/case-study";
import { getDsTranslator } from "../i18n-server";

const outcomes = [
  {
    value: "4",
    label: "個已發布案例頁",
    body: "Advantech、Crypto Arsenal、Design System 與 Laushu 開始依循同一套 case-study 基礎規則。",
  },
  {
    value: "Shared / Local",
    label: "清楚的元件邊界",
    body: "共用元件透過 component contract 說明用途；案例限定的敘事則保留 route-local 彈性。",
  },
  {
    value: "Code + Docs",
    label: "相互對應的設計依據",
    body: "Design System 的核心規則以實際元件、Design Token 與使用方式為基準；尚未採用的候選項目會另外標示。",
  },
  {
    value: "Auto + Manual",
    label: "可重複的驗收流程",
    body: "AI 協助執行程式檢查與定位問題；我負責跨頁、視覺、互動與設計意圖的最終驗收。",
  },
];

export default async function OutcomeSection() {
  const { t } = await getDsTranslator();
  return (
    <CaseSection
      id="cs-sec-outcome"
      kicker={t("最終成果")}
      title={t("四個案例頁開始依循同一套可維護、可驗證的設計依據")}
    >
      <p className="cs-section-lead">
        {t("成果涵蓋 Design Token、共用元件，以及串連設計決策、AI 輔助執行、檢查與版本紀錄的維護方式。")}
      </p>
      <CaseMetricGrid className="ds-case-card-grid ds-case-outcome-grid">
        {outcomes.map((outcome) => (
          <CaseCard variant="metric" key={outcome.label}>
            <span className="cs-metric-value">{t(outcome.value)}</span>
            <h3 className="cs-metric-label">{t(outcome.label)}</h3>
            <p className="cs-metric-body">{t(outcome.body)}</p>
          </CaseCard>
        ))}
      </CaseMetricGrid>
      <div className="ds-case-outcome-summary">
        <h3>{t("人與 AI 的責任被固定在流程中")}</h3>
        <p>{t("我保留問題定義、元件邊界、驗收標準與最終品質責任；AI 在規格確認後協助盤點、實作、檢查與除錯。每次修改都能說明改了什麼、如何驗證，以及為什麼保留。")}</p>
      </div>
    </CaseSection>
  );
}
