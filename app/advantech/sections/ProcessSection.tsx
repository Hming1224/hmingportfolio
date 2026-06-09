import Image from "next/image";
import { CaseHeading } from "../../../components/case-study";
import { processSteps } from "../data";

export default function ProcessSection() {
  return (
    <section id="cs-sec-process" className="cs-process-bg">
      <div className="cs-process-bg-img">
        <Image
          src="/projects/advantech/research/process-bg.webp"
          alt=""
          fill
          style={{ objectFit: "cover" }}
          unoptimized
        />
      </div>
      <div className="cs-process-overlay" />
      <div className="cs-process-content">
        <CaseHeading title="設計流程" tone="white" style={{ marginBottom: 8 }} />
        <div className="cs-timeline-alt">
          {/* Row 1: cards above axis (01, 03, 05) */}
          <div className="cs-tl-tops">
            {processSteps.map((step, i) => (
              <div key={`top-${step.num}`} className="cs-tl-top">
                {i % 2 === 0 && (
                  <>
                    <div className="cs-tl-card">
                      <span className="cs-tl-num">{step.num}</span>
                      <h3 className="cs-tl-title">{step.title}</h3>
                      <p className="cs-tl-desc">{step.desc}</p>
                    </div>
                    <div className="cs-tl-vconn" />
                  </>
                )}
              </div>
            ))}
          </div>
          {/* Row 2: axis line + dots */}
          <div className="cs-tl-dots-row">
            <div className="cs-tl-axis" />
            {processSteps.map((step) => (
              <div key={`dot-${step.num}`} className="cs-tl-dot-cell">
                <div className="cs-tl-dot" />
              </div>
            ))}
          </div>
          {/* Row 3: cards below axis (02, 04, 06) */}
          <div className="cs-tl-bottoms">
            {processSteps.map((step, i) => (
              <div key={`bot-${step.num}`} className="cs-tl-bottom">
                {i % 2 !== 0 && (
                  <>
                    <div className="cs-tl-vconn" />
                    <div className="cs-tl-card">
                      <span className="cs-tl-num">{step.num}</span>
                      <h3 className="cs-tl-title">{step.title}</h3>
                      <p className="cs-tl-desc">{step.desc}</p>
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
