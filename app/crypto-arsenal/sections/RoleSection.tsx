import { getCryptoArsenalTranslator } from "../i18n-server";
import { flowSteps } from "../data";
import { CaseCard, CaseSectionHeader } from "../../../components/case-study";

export default async function RoleSection() {
  const { t } = await getCryptoArsenalTranslator();
  return (
    <section id="cs-sec-role" className="cs-section ca-section-alt">
      <CaseSectionHeader kicker={t("角色與工作流")} title={t("在 CA 的工作模式")} tone="secondary" />
      <p className="ca-lead ca-narrow">
        {t(
          "在 CA，每 1–2 週會持續一個 sprint，小功能設計時程約 2–4 周，大功能設計時程約需 1–3 個月。除了與 PO 持續討論產品功能上線時程及每週用戶反饋，多數 feature 以二手桌面研究與競品設計為基礎，我身為設計師的設計流程如下：",
        )}
      </p>
      <div className="ca-flow" role="list" aria-label={t("單一 feature 的設計流程")}>
        {flowSteps.map((step, i) => (
          <div className="ca-flow-item" role="listitem" key={step}>
            <CaseCard as="div" className="ca-flow-node">
              <span className="ca-flow-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="ca-flow-title">{t(step)}</span>
            </CaseCard>
            {i < flowSteps.length - 1 && (
              <div className="ca-flow-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
