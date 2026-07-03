import Image from "next/image";
import { CaseCard, CaseGrid } from "../../../components/case-study";
import { resultCards } from "../data";
import { localizeAdvantechTree, translateAdvantechData } from "../i18n";
import { getAdvantechTranslator } from "../i18n-server";

export default async function ResultSection() {
  const { locale, t } = await getAdvantechTranslator();
  const cards = translateAdvantechData(locale, resultCards);
  return localizeAdvantechTree(locale,
    <section id="cs-sec-result" className="cs-result-bg cs-stack-box">
      <div className="cs-result-bg-img cs-object-box">
        <Image
          src="/projects/advantech/result/advantech-result-bg.webp"
          alt=""
          fill
          style={{ objectFit: "cover", opacity: 0.6 }}
        />
      </div>
      <div className="cs-result-overlay cs-object-box" />
      <div className="cs-result-content cs-stack-box">
        <p className="cs-result-kicker cs-section-kicker">REFLECTIONS</p>
        <h2 className="cs-heading-white" style={{ marginBottom: 8 }}>
          {t("設計真正融入工作流程、並建立信任感的 AI 體驗。")}
        </h2>
        <div className="cs-divider-white" />
        <CaseGrid variant="two" className="cs-result-grid">
          {cards.map((item) => (
            <CaseCard key={item.num} className="cs-result-card">
              <span className="cs-result-num cs-inline-pill">{item.num}</span>
              <h3 className="cs-result-title cs-copy-title">{item.title}</h3>
              <p className="cs-result-desc cs-copy-body">{item.desc}</p>
            </CaseCard>
          ))}
        </CaseGrid>
      </div>
    </section>
  );
}
