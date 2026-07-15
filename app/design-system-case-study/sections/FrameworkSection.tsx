import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CaseFlowFrame, CaseSection } from "../../../components/case-study";
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

function DecisionFlowArrow() {
  return (
    <span className="ds-case-decision-flow__arrow" aria-hidden="true">
      <ArrowRight size={24} strokeWidth={1.5} />
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

      <div className="ds-case-framework-block">
        <h3 className="cs-subsection-title ds-case-framework-subtitle">{t("判斷流程")}</h3>
        <CaseFlowFrame
          className="ds-case-decision-flow"
          header={(
            <div className="ds-case-decision-legend">
              <span className="ds-case-decision-legend__item">
                <DecisionOwnerMark owner="ai" label="AI" />
                {t("AI 負責掃描分析與依規格執行")}
              </span>
              <span className="ds-case-decision-legend__item">
                <DecisionOwnerMark owner="human" label={t("我")} />
                {t("我負責設定目標、判斷、訂規格與驗收")}
              </span>
            </div>
          )}
          headerClassName="ds-case-decision-flow__header"
          scrollHintLabel={t("左右滑動查看流程")}
          variant="plain"
        >
          <div className="ds-case-decision-flow__tree">
          <div className="ds-case-decision-node ds-case-decision-node--ai">
            <div className="ds-case-decision-node__meta">
              <span className="ds-case-decision-node__step">01</span>
              <DecisionOwnerMark owner="ai" label={t("AI 分析")} />
            </div>
            <strong>{t("先掃描跨頁模式與影響範圍")}</strong>
            <p>{t("找出重複、差異與可能受影響的 route，先整理成可判讀的證據。")}</p>
          </div>
          <DecisionFlowArrow />
          <div className="ds-case-decision-node ds-case-decision-node--human">
            <div className="ds-case-decision-node__meta">
              <span className="ds-case-decision-node__step">02</span>
              <DecisionOwnerMark owner="human" label={t("我做決策")} />
            </div>
            <strong>{t("依目標判斷是否值得共用")}</strong>
            <p>{t("從使用情境、設計意圖與未來變動，決定 token、shared component 或 route-local。")}</p>
          </div>
          <DecisionFlowArrow />
          <div className="ds-case-decision-node ds-case-decision-node--human">
            <div className="ds-case-decision-node__meta">
              <span className="ds-case-decision-node__step">03</span>
              <DecisionOwnerMark owner="human" label={t("我訂規格")} />
            </div>
            <strong>{t("把範圍、不可動項與驗收寫清楚")}</strong>
            <p>{t("將要改的條件和不該改的限制具體化，讓實作有明確邊界。")}</p>
          </div>
          <DecisionFlowArrow />
          <div className="ds-case-decision-node ds-case-decision-node--ai">
            <div className="ds-case-decision-node__meta">
              <span className="ds-case-decision-node__step">04</span>
              <DecisionOwnerMark owner="ai" label={t("AI 執行")} />
            </div>
            <strong>{t("依明確規格小批次實作與檢查")}</strong>
            <p>{t("只在指定 route 與範圍內完成修改，並回報變更與檢查結果。")}</p>
          </div>
          <DecisionFlowArrow />
          <div className="ds-case-decision-node ds-case-decision-node--human ds-case-decision-node--review">
            <div className="ds-case-decision-node__meta">
              <span className="ds-case-decision-node__step">05</span>
              <DecisionOwnerMark owner="human" label={t("我驗收")} />
            </div>
            <strong>{t("比對實頁與原本目標，決定是否收斂")}</strong>
            <p>{t("確認視覺、互動及案例差異；不符就回到第 3 步補足規則。")}</p>
          </div>
          </div>
        </CaseFlowFrame>
      </div>

      <div className="ds-case-framework-block">
        <h3 className="cs-subsection-title ds-case-framework-subtitle">{t("判斷示例")}</h3>
        <div className="cs-data-table-frame ds-case-framework-table-frame">
          <table className="cs-data-table cs-data-table--matrix ds-case-framework-table">
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
      </div>
    </CaseSection>
  );
}
