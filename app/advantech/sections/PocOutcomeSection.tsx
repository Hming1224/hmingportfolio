import { CaseCard, CaseGrid, CaseSection } from "../../../components/case-study";
import { getAdvantechTranslator } from "../i18n-server";

const outcomes = [
  {
    kicker: "01 / 產品定位",
    title: "AI 可成為跨系統的決策輔助入口",
    body: "研究與設計過程顯示，廠務人員需要的是能直接協助判斷風險與設備狀態的分析。POC 將產品方向收斂為需量管理與設備能效兩個優先情境，並規劃 AI 與既有能源資料、圖表和異常資訊的整合方式。",
    stakeholder: "iEMS 產品負責人",
    support: "AI 應延伸到整體能源系統，支援跨產品與跨資料來源的決策需求。",
  },
  {
    kicker: "02 / 互動方向",
    title: "AI 應進入既有異常判斷與處理流程",
    body: "訪談推翻了使用者會主動開啟 Chatbot 並組織完整問題的假設。POC 將 AI 分析安排在既有圖表、通知與異常處理流程中，再透過對話協助使用者查看原因與後續建議。",
    stakeholder: "UI Team Lead",
    support: "這套互動方式符合研究情境，也能延續現有產品的異常判斷與處理流程。",
  },
  {
    kicker: "03 / 開發依據",
    title: "POC 建立了下一階段可共同評估的範圍",
    body: "互動 Prototype 將 AI 的介入時機、資訊層級、風險處理與系統需求具體呈現。產品、設計、工程與商業角色因此能針對同一套情境，討論資料條件、技術可行性、開發範圍與 Pilot 指標。",
    stakeholder: "CEO",
    support: "下一階段應定義明確指標，並以實際數據評估節能、異常發現、維修效率與商業價值。",
  },
] as const;

export default async function PocOutcomeSection() {
  const { t } = await getAdvantechTranslator();

  return (
    <CaseSection
      id="cs-sec-poc-outcome"
      surface
      kicker={t("POC 成果")}
      title={t("這次 POC 幫助團隊釐清了什麼")}
      className="ca-poc-outcome"
    >
      <p className="cs-section-lead ca-poc-outcome-intro">
        {t("本專案尚未進入真實場域 Pilot，因此目前能確認的是產品方向、互動方式與下一階段的驗證條件。實際採用率、操作效率與節能成效，仍需透過正式開發與場域測試取得證據。")}
      </p>

      <CaseGrid variant="three" className="ca-poc-outcome-grid">
        {outcomes.map((outcome) => (
          <CaseCard key={outcome.kicker} className="ca-poc-outcome-card">
            <p className="ca-poc-outcome-kicker">{t(outcome.kicker)}</p>
            <h3 className="ca-poc-outcome-title cs-copy-title">{t(outcome.title)}</h3>
            <p className="cs-copy-body">{t(outcome.body)}</p>
            <div className="ca-poc-stakeholder">
              <span className="cs-pill-badge ca-poc-stakeholder-badge">{t(outcome.stakeholder)}</span>
              <p className="cs-copy-body">{t(outcome.support)}</p>
            </div>
          </CaseCard>
        ))}
      </CaseGrid>

    </CaseSection>
  );
}
