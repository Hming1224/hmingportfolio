import Image from "next/image";
import { CaseCard, CaseGrid, CaseHeading } from "../../../components/case-study";
import { resultCards } from "../data";
import { localizeAdvantechTree, translateAdvantechData } from "../i18n";
import { getAdvantechTranslator } from "../i18n-server";

export default async function ResultSection() {
  const { locale, t } = await getAdvantechTranslator();
  const cards = translateAdvantechData(locale, resultCards);
  return localizeAdvantechTree(locale,
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
        <CaseHeading title={t("我學到了什麼...")} tone="white" style={{ marginBottom: 8 }} />
        <CaseGrid variant="two" className="cs-result-grid">
          {cards.map((item) => (
            <CaseCard key={item.num} className="cs-result-card">
              <span className="cs-result-num">{item.num}</span>
              <h3 className="cs-result-title">{item.title}</h3>
              <p className="cs-result-desc">{item.desc}</p>
            </CaseCard>
          ))}
        </CaseGrid>
      </div>
    </section>
  );
}
