import Image from "next/image";
import { CaseFlowFrame, CaseSection } from "../../../components/case-study";
import DecisionFlowConnectors from "../components/DecisionFlowConnectors";
import { getDsTranslator } from "../i18n-server";

function DecisionOwnerMark({ owner, label }: { owner: "human" | "ai"; label: string }) {
  return (
    <span className={`ds-case-decision-owner ds-case-decision-owner--${owner}`} aria-label={label} title={label}>
      {owner === "human" ? (
        <Image src="/avatar/avatar-yellow.png" alt="" width={28} height={28} loading="eager" unoptimized />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/projects/crypto-arsenal/background/icons/bot.svg" alt="" width={28} height={28} loading="eager" />
      )}
    </span>
  );
}

const frameworkRows = [
  {
    signal: "顏色、間距或字級跨頁重複",
    basis: "語意穩定，而且會被多個元件共同使用。",
    action: "集中管理數值與命名，不改變各元件結構。",
    result: "Design Token",
  },
  {
    signal: "結構、用途與互動穩定重複",
    basis: "內容模型相近，未來變更通常也需要同步。",
    action: "先定義 API、狀態與使用限制，再整理共用實作。",
    result: "Shared Component",
  },
  {
    signal: "只服務單一案例，或只有外觀相似",
    basis: "用途、敘事或變動方式不同，共用後會增加條件與例外。",
    action: "沿用基礎 token 與共用外框，特殊內容留在該頁。",
    result: "Route-local Implementation",
  },
];

export default async function FrameworkSection() {
  const { t } = await getDsTranslator();
  return (
    <CaseSection
      id="cs-sec-framework"
      kicker={t("判斷框架")}
      title={t("先判斷用途與風險，再決定共用或保留單頁彈性")}
      surface
    >
      <p className="cs-section-lead">
        {t("AI 可以快速找出重複，但是否值得共用仍涉及設計語意、使用情境與未來變動風險，因此由我做出最後判斷。")}
      </p>

      <CaseFlowFrame
        className="ds-case-decision-flow"
        caption={t("若涉及語意或取捨，就先由我判斷；只有規格、範圍與驗收條件都清楚時，才交由 AI 執行。")}
        scrollHintLabel={t("左右滑動查看分流")}
        variant="plain"
      >
        <div className="ds-case-decision-flow__tree">
          <DecisionFlowConnectors
            labels={{
              yes: t("是"),
              no: t("否"),
              incomplete: t("不完整"),
              clear: t("已明確"),
              reviewAgain: t("補足後重新確認"),
            }}
          />
          <div className="ds-case-decision-node ds-case-decision-node--question" data-decision-node="question">
            <div className="ds-case-decision-node__meta">
              <span className="ds-case-decision-node__step">01</span>
              <DecisionOwnerMark owner="human" label={t("由我負責")} />
            </div>
            <strong>{t("是否涉及語意、設計意圖或方案取捨？")}</strong>
          </div>
          <div className="ds-case-decision-node ds-case-decision-node--human" data-decision-node="human">
            <div className="ds-case-decision-node__meta ds-case-decision-node__meta--owner-only">
              <DecisionOwnerMark owner="human" label={t("由我負責")} />
            </div>
            <strong>{t("由我判斷方向與標準")}</strong>
          </div>
          <div className="ds-case-decision-node ds-case-decision-node--confirm" data-decision-node="confirm">
            <div className="ds-case-decision-node__meta ds-case-decision-node__meta--owner-only">
              <DecisionOwnerMark owner="human" label={t("由我負責")} />
            </div>
            <strong>{t("確認規格、範圍與驗收條件")}</strong>
          </div>
          <div className="ds-case-decision-node ds-case-decision-node--incomplete" data-decision-node="incomplete">
            <div className="ds-case-decision-node__meta ds-case-decision-node__meta--owner-only">
              <DecisionOwnerMark owner="human" label={t("由我負責")} />
            </div>
            <strong>{t("先補足規則，不直接實作")}</strong>
          </div>
          <div className="ds-case-decision-node ds-case-decision-node--execute" data-decision-node="execute">
            <div className="ds-case-decision-node__meta ds-case-decision-node__meta--owner-only">
              <span className="ds-case-decision-owner-group">
                <DecisionOwnerMark owner="ai" label={t("AI 執行")} />
                <DecisionOwnerMark owner="human" label={t("由我負責")} />
              </span>
            </div>
            <strong>{t("AI 執行並回報，我進行驗收")}</strong>
          </div>
        </div>
        <div className="ds-case-decision-legend" aria-label={t("流程責任圖例")}>
          <span>
            <DecisionOwnerMark owner="human" label={t("由我負責")} />
            <span><strong>{t("由我負責")}</strong>{t("定義語意、取捨與驗收標準。")}</span>
          </span>
          <span>
            <DecisionOwnerMark owner="ai" label={t("AI 執行")} />
            <span><strong>{t("AI 執行")}</strong>{t("在規格、範圍與驗收條件明確後實作並回報。")}</span>
          </span>
        </div>
      </CaseFlowFrame>

      <div className="ds-case-table-frame ds-case-framework-table-frame">
        <table className="ds-case-table ds-case-framework-table">
          <thead><tr><th>{t("看到的現象")}</th><th>{t("判斷依據")}</th><th>{t("採取方式")}</th><th>{t("最終放置位置")}</th></tr></thead>
          <tbody>
            {frameworkRows.map((row) => (
              <tr key={row.signal}>
                <th scope="row">{t(row.signal)}</th>
                <td>{t(row.basis)}</td>
                <td>{t(row.action)}</td>
                <td><span className={`ds-case-term-pill ds-case-term-pill--${row.result === "Design Token" ? "token" : row.result === "Shared Component" ? "shared" : "local"}`}>{t(row.result)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CaseSection>
  );
}
