import Image from "next/image";
import { CaseSection, FlowScrollHint } from "../../../components/case-study";
import FlowConnectors from "../components/FlowConnectors";
import { scenarios } from "../data";
import { localizeAdvantechTree, translateAdvantechData } from "../i18n";
import { getAdvantechTranslator } from "../i18n-server";

// 「由我負責」標記：卡片 header 右上角的小頭像（對應 Figma 圖例）
function OwnerMark({ label }: { label: string }) {
  return (
    <span className="cs-ds-owner cs-object-box">
      <Image src="/avatar/avatar-yellow-icon.png" alt={label} width={22} height={22} />
    </span>
  );
}

export default async function ScenarioSection() {
  const { locale, t } = await getAdvantechTranslator();
  const localizedScenarios = translateAdvantechData(locale, scenarios);
  return localizeAdvantechTree(locale,
    <CaseSection
      id="cs-sec-scenario"
      kicker={t("設計策略")}
      title={t("將使用者痛點轉化為兩個可落地的 AI 情境。")}
    >
      <p className="cs-body-muted" style={{ marginBottom: 48 }}>
        {t("專案研究過後，團隊透過工作坊討論功能優先級，將使用者痛點轉譯為兩個可落地的 AI 應用情境。每個情境都從底層 AI 機制出發，對應到核心功能，最後落到使用者會接觸的介面呈現。")}
      </p>

      {localizedScenarios.map((sc) => (
        <div key={sc.title} className="cs-ds-scenario">
          {/* ── Scenario header ── */}
          <div className="cs-ds-head cs-flex-cluster">
            <Image src={sc.icon} width={48} height={48} alt="" />
            <div>
              <h3 className="cs-ds-title cs-copy-title" style={{ color: sc.titleColor }}>{sc.title}</h3>
              <p className="cs-ds-subdesc cs-copy-body">{sc.desc}</p>
            </div>
          </div>

          {/* ── Flow diagram ── */}
          {/* Swipe hint — shown only when the flow row overflows (small screens). */}
          <FlowScrollHint label={t("左右滑動查看更多")} />
          <div className="cs-ds-flow-wrap">
            {/* Inner box holds the connectors + cards at one shared width so the
                SVG scrolls together with the cards when the row overflows. */}
            <div className="cs-ds-flow-inner">
            {/* Connector lines are drawn by <FlowConnectors />, which measures the
                real rendered position of each card (data-flow anchors below) so the
                lines stay aligned no matter how the cards reflow / change height. */}
            <svg className="cs-ds-svg-overlay" preserveAspectRatio="none" aria-hidden="true" />

            {/* ── Card grid ──
                Cards are placed by explicit row/column so each grid row equalises
                its cards' heights: row 2 = top cards (top-aligned, equal height),
                row 4 = bottom cards (bottom-aligned, equal height), row 3 = the
                middle UI card. Equal per-row heights keep card centres level, so
                the centre-anchored connectors stay horizontal no matter how the
                text wraps or the language changes — no fixed heights needed. */}
            <div className="cs-ds-flow-cols cs-track-grid">
              {/* Row 1: column labels */}
              <p className="cs-ds-col-label cs-copy-title" style={{ color: "#6b46a3", gridColumn: 1, gridRow: 1 }}>{t("底層 AI 邏輯")}</p>
              <p className="cs-ds-col-label cs-copy-title" style={{ color: "#d88400", gridColumn: 2, gridRow: 1 }}>{t("對應功能策略")}</p>
              <p className="cs-ds-col-label cs-copy-title" style={{ color: "#005796", gridColumn: 3, gridRow: 1 }}>{t("介面呈現方式")}</p>

              {/* Row 2: top cards (ai1 · fn1 · ui1) */}
              <div className="cs-ds-card cs-ds-card-ai cs-ds-card-primary cs-stack-box" data-flow="ai1" style={{ gridColumn: 1, gridRow: 2 }}>
                <div className="cs-ds-card-head cs-flex-cluster">
                  <span className="cs-ds-pill cs-inline-pill" style={{ color: "#6b46a3" }}>{sc.ai0[0]}</span>
                  <OwnerMark label={t("由我負責")} />
                </div>
                <p className="cs-ds-card-desc cs-copy-body">{sc.ai0[1]}</p>
              </div>
              <div className="cs-ds-card cs-ds-card-func cs-ds-card-primary cs-stack-box" data-flow="fn1" style={{ gridColumn: 2, gridRow: 2 }}>
                <div className="cs-ds-card-head cs-flex-cluster">
                  <span className="cs-ds-pill cs-inline-pill" style={{ color: "#d88400" }}>{sc.fn0[0]}</span>
                  <OwnerMark label={t("由我負責")} />
                </div>
                <p className="cs-ds-card-desc cs-copy-body">{sc.fn0[1]}</p>
              </div>
              <div className="cs-ds-card cs-ds-card-ui cs-ds-card-primary cs-stack-box" data-flow="ui1" style={{ gridColumn: 3, gridRow: 2 }}>
                <div className="cs-ds-card-head cs-flex-cluster">
                  <span className="cs-ds-pill cs-inline-pill" style={{ color: "#005796" }}>{sc.ui0[0]}</span>
                  <OwnerMark label={t("由我負責")} />
                </div>
                <p className="cs-ds-card-desc cs-copy-body">{sc.ui0[1]}</p>
              </div>

              {/* Row 3: middle UI card (ui2) */}
              <div className="cs-ds-card cs-ds-card-ui cs-ds-card-primary cs-stack-box" data-flow="ui2" style={{ gridColumn: 3, gridRow: 3 }}>
                <div className="cs-ds-card-head cs-flex-cluster">
                  <span className="cs-ds-pill cs-inline-pill" style={{ color: "#005796" }}>{sc.ui1[0]}</span>
                  <OwnerMark label={t("由我負責")} />
                </div>
                <p className="cs-ds-card-desc cs-copy-body">{sc.ui1[1]}</p>
              </div>

              {/* Row 4: bottom cards (ai2 · fn2 · ui3) */}
              <div className="cs-ds-card cs-ds-card-ai cs-stack-box" data-flow="ai2" style={{ gridColumn: 1, gridRow: 4 }}>
                <span className="cs-ds-pill cs-inline-pill" style={{ color: "#6b46a3" }}>{sc.ai1[0]}</span>
                <p className="cs-ds-card-desc cs-copy-body">{sc.ai1[1]}</p>
              </div>
              <div className="cs-ds-card cs-ds-card-func cs-stack-box" data-flow="fn2" style={{ gridColumn: 2, gridRow: 4 }}>
                <span className="cs-ds-pill cs-inline-pill" style={{ color: "#d88400" }}>{sc.fn1[0]}</span>
                <p className="cs-ds-card-desc cs-copy-body">{sc.fn1[1]}</p>
              </div>
              <div className="cs-ds-card cs-ds-card-ui cs-ds-card-primary cs-stack-box" data-flow="ui3" style={{ gridColumn: 3, gridRow: 4 }}>
                <div className="cs-ds-card-head cs-flex-cluster">
                  <span className="cs-ds-pill cs-inline-pill" style={{ color: "#005796" }}>{sc.ui2[0]}</span>
                  <OwnerMark label={t("由我負責")} />
                </div>
                <p className="cs-ds-card-desc cs-copy-body">{sc.ui2[1]}</p>
              </div>
            </div>
            </div>
          </div>

          {/* Legend: 由我負責 */}
          <div className="cs-ds-legend cs-flex-cluster">
            <OwnerMark label={t("由我負責")} />
            <span>{t("：")}{t("由我負責")}</span>
          </div>
        </div>
      ))}
      <FlowConnectors />
    </CaseSection>
  );
}
