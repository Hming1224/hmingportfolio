import Image from "next/image";
import { CaseHeading } from "../../../components/case-study";
import { resultCards } from "../data";

export default function ResultSection() {
  return (
    <section id="cs-sec-result" className="cs-result-bg">
      <div className="cs-result-bg-img">
        <Image
          src="/projects/advantech/result/advantech-result-bg.webp"
          alt=""
          fill
          style={{ objectFit: "cover", opacity: 0.6 }}
        />
      </div>
      <div className="cs-result-overlay" />
      <div className="cs-result-content">
        <CaseHeading title="我學到了什麼..." tone="white" style={{ marginBottom: 8 }} />
        <div className="cs-result-grid">
          {resultCards.map((item) => (
            <div key={item.num} className="cs-result-card">
              <span className="cs-result-num">{item.num}</span>
              <h3 className="cs-result-title">{item.title}</h3>
              <p className="cs-result-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
