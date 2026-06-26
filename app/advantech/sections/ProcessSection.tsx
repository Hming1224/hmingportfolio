import Image from "next/image";
import { CaseHeading, FlowScrollHint } from "../../../components/case-study";
import { processSteps } from "../data";
import { localizeAdvantechTree, translateAdvantechData } from "../i18n";
import { getAdvantechTranslator } from "../i18n-server";

export default async function ProcessSection() {
  const { locale, t } = await getAdvantechTranslator();
  const steps = translateAdvantechData(locale, processSteps);
  return localizeAdvantechTree(locale,
    <section id="cs-sec-process" className="cs-process-bg cs-stack-box">
      <div className="cs-process-bg-img cs-object-box">
        <Image
          src="/projects/advantech/research/process-bg.webp"
          alt=""
          fill
          style={{ objectFit: "cover" }}
          unoptimized
        />
      </div>
      <div className="cs-process-overlay cs-object-box" />
      <div className="cs-process-content cs-stack-box">
        <CaseHeading title={t("設計流程")} tone="white" style={{ marginBottom: 8 }} />
        <FlowScrollHint label={t("左右滑動查看更多")} />
        <div className="cs-timeline-alt cs-stack-box">
          {/* Row 1: cards above axis (01, 03, 05) */}
          <div className="cs-tl-tops cs-track-grid">
            {steps.map((step, i) => (
              <div key={`top-${step.num}`} className="cs-tl-top cs-stack-box">
                {i % 2 === 0 && (
                  <>
                    <div className="cs-tl-card cs-stack-box">
                      <span className="cs-tl-num cs-inline-pill">{step.num}</span>
                      <h3 className="cs-tl-title cs-copy-title">{step.title}</h3>
                      <p className="cs-tl-desc cs-copy-body">{step.desc}</p>
                    </div>
                    <div className="cs-tl-vconn cs-object-box" />
                  </>
                )}
              </div>
            ))}
          </div>
          {/* Row 2: axis line + dots */}
          <div className="cs-tl-dots-row cs-track-grid">
            <div className="cs-tl-axis cs-object-box" />
            {steps.map((step) => (
              <div key={`dot-${step.num}`} className="cs-tl-dot-cell cs-flex-cluster">
                <div className="cs-tl-dot cs-object-box" />
              </div>
            ))}
          </div>
          {/* Row 3: cards below axis (02, 04, 06) */}
          <div className="cs-tl-bottoms cs-track-grid">
            {steps.map((step, i) => (
              <div key={`bot-${step.num}`} className="cs-tl-bottom cs-stack-box">
                {i % 2 !== 0 && (
                  <>
                    <div className="cs-tl-vconn cs-object-box" />
                    <div className="cs-tl-card cs-stack-box">
                      <span className="cs-tl-num cs-inline-pill">{step.num}</span>
                      <h3 className="cs-tl-title cs-copy-title">{step.title}</h3>
                      <p className="cs-tl-desc cs-copy-body">{step.desc}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
