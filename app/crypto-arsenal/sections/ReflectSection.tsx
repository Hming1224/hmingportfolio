import { CaseCard, CaseGrid, CaseSectionHeader } from "../../../components/case-study";
import { getCryptoArsenalTranslator } from "../i18n-server";
import { reflectCards } from "../data";

export default async function ReflectSection() {
  const { t } = await getCryptoArsenalTranslator();
  return (
    <section id="cs-sec-reflect" className="cs-section ca-section-alt">
      <CaseSectionHeader kicker={t("學習反思")} title={t("在快節奏與限制下做設計")} tone="secondary" />
      <p className="ca-lead ca-narrow">
        {t(
          "這份實習讓我學會在快節奏產品開發中做設計判斷：當沒有額外資源安排正式用戶測試時，透過內部團隊與工程師快速驗證流程，再把交易所既有操作習慣、CA 原本的設計系統與技術限制一起納入取捨。",
        )}
      </p>
      <CaseGrid variant="three" className="ca-reflect">
        {reflectCards.map((card) => (
          <CaseCard className="ca-reflect-card" key={card.num}>
            <span className="ca-reflect-num">{card.num}</span>
            <h3>{t(card.title)}</h3>
            <p>{t(card.body)}</p>
          </CaseCard>
        ))}
      </CaseGrid>
    </section>
  );
}
