import Image from "next/image";
import { CaseSection } from "../../../components/case-study";
import FlowConnectors from "../components/FlowConnectors";
import { scenarios } from "../data";
import { localizeAdvantechTree, translateAdvantechData } from "../i18n";
import { getAdvantechTranslator } from "../i18n-server";

// 「由我負責」標記：卡片 header 右上角的小頭像（對應 Figma 圖例）
function OwnerMark({ label }: { label: string }) {
  return (
    <span className="cs-ds-owner">
      <Image src="/avatar/avatar-yellow.png" alt={label} width={22} height={22} />
    </span>
  );
}

export default async function ScenarioSection() {
  const { locale, t } = await getAdvantechTranslator();
  const localizedScenarios = translateAdvantechData(locale, scenarios);
  return localizeAdvantechTree(locale,
    <CaseSection id="cs-sec-scenario" title={t("AI 應用情境：從底層機制到介面落地")}>
      <p className="cs-body-muted" style={{ marginBottom: 48 }}>
        {t("專案研究過後，團隊透過工作坊討論功能優先級，將使用者痛點轉譯為兩個可落地的 AI 應用情境。每個情境都從底層 AI 機制出發，對應到核心功能，最後落到使用者會接觸的介面呈現。")}
      </p>

      {localizedScenarios.map((sc) => (
        <div key={sc.title} className="cs-ds-scenario">
          {/* ── Scenario header ── */}
          <div className="cs-ds-head">
            <Image src={sc.icon} width={48} height={48} alt="" unoptimized />
            <div>
              <h3 className="cs-ds-title" style={{ color: sc.titleColor }}>{sc.title}</h3>
              <p className="cs-ds-subdesc">{sc.desc}</p>
            </div>
          </div>

          {/* ── Flow diagram ── */}
          <div className="cs-ds-flow-wrap">
            {/* Inner box holds the connectors + cards at one shared width so the
                SVG scrolls together with the cards when the row overflows. */}
            <div className="cs-ds-flow-inner">
            {/* Connector lines are drawn by <FlowConnectors />, which measures the
                real rendered position of each card (data-flow anchors below) so the
                lines stay aligned no matter how the cards reflow / change height. */}
            <svg className="cs-ds-svg-overlay" preserveAspectRatio="none" aria-hidden="true" />

            {/* ── Three card columns ── */}
            <div className="cs-ds-flow-cols">
              {/* Column 1: AI Logic */}
              <div>
                <p className="cs-ds-col-label" style={{ color: "#6b46a3" }}>{t("底層 AI 邏輯")}</p>
                <div style={{ marginTop: 27 }}>
                  <div className="cs-ds-card cs-ds-card-ai cs-ds-card-primary" data-flow="ai1">
                    <div className="cs-ds-card-head">
                      <span className="cs-ds-pill" style={{ color: "#6b46a3" }}>{sc.ai0[0]}</span>
                      <OwnerMark label={t("由我負責")} />
                    </div>
                    <p className="cs-ds-card-desc">{sc.ai0[1]}</p>
                  </div>
                  <div className="cs-ds-ai-gap" />
                  <div className="cs-ds-card cs-ds-card-ai" data-flow="ai2">
                    <span className="cs-ds-pill" style={{ color: "#6b46a3" }}>{sc.ai1[0]}</span>
                    <p className="cs-ds-card-desc">{sc.ai1[1]}</p>
                  </div>
                </div>
              </div>

              {/* Column 2: Feature Strategy */}
              <div>
                <p className="cs-ds-col-label" style={{ color: "#d88400" }}>{t("對應功能策略")}</p>
                <div style={{ marginTop: 27 }}>
                  <div className="cs-ds-card cs-ds-card-func cs-ds-card-primary" data-flow="fn1">
                    <div className="cs-ds-card-head">
                      <span className="cs-ds-pill" style={{ color: "#d88400" }}>{sc.fn0[0]}</span>
                      <OwnerMark label={t("由我負責")} />
                    </div>
                    <p className="cs-ds-card-desc">{sc.fn0[1]}</p>
                  </div>
                  <div className="cs-ds-ai-gap" />
                  <div className="cs-ds-card cs-ds-card-func" data-flow="fn2">
                    <span className="cs-ds-pill" style={{ color: "#d88400" }}>{sc.fn1[0]}</span>
                    <p className="cs-ds-card-desc">{sc.fn1[1]}</p>
                  </div>
                </div>
              </div>

              {/* Column 3: UI Presentation */}
              <div>
                <p className="cs-ds-col-label" style={{ color: "#005796" }}>{t("介面呈現方式")}</p>
                <div style={{ marginTop: 37 }}>
                  <div className="cs-ds-card cs-ds-card-ui cs-ds-card-primary" data-flow="ui1">
                    <div className="cs-ds-card-head">
                      <span className="cs-ds-pill" style={{ color: "#005796" }}>{sc.ui0[0]}</span>
                      <OwnerMark label={t("由我負責")} />
                    </div>
                    <p className="cs-ds-card-desc">{sc.ui0[1]}</p>
                  </div>
                  <div className="cs-ds-ui-gap" />
                  <div className="cs-ds-card cs-ds-card-ui cs-ds-card-primary" data-flow="ui2">
                    <div className="cs-ds-card-head">
                      <span className="cs-ds-pill" style={{ color: "#005796" }}>{sc.ui1[0]}</span>
                      <OwnerMark label={t("由我負責")} />
                    </div>
                    <p className="cs-ds-card-desc">{sc.ui1[1]}</p>
                  </div>
                  <div className="cs-ds-ui-gap" />
                  <div className="cs-ds-card cs-ds-card-ui cs-ds-card-primary" data-flow="ui3">
                    <div className="cs-ds-card-head">
                      <span className="cs-ds-pill" style={{ color: "#005796" }}>{sc.ui2[0]}</span>
                      <OwnerMark label={t("由我負責")} />
                    </div>
                    <p className="cs-ds-card-desc">{sc.ui2[1]}</p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Legend: 由我負責 */}
          <div className="cs-ds-legend">
            <OwnerMark label={t("由我負責")} />
            <span>：{t("由我負責")}</span>
          </div>
        </div>
      ))}
      <FlowConnectors />
    </CaseSection>
  );
}
