import { getCryptoArsenalTranslator } from "../i18n-server";
import { reflectCards } from "../data";

export default async function ReflectSection() {
  const { t } = await getCryptoArsenalTranslator();
  return (
    <section id="cs-sec-reflect" className="cs-section ca-section-alt">
      <span className="ca-tag ca-tag-teal">{t("學習反思")}</span>
      <h2 className="ca-h2">{t("在快節奏與限制下做設計")}</h2>
      <p className="ca-lead ca-narrow">
        {t(
          "這份實習讓我誠實面對業界 cadence：多數決策建立在二手研究與競品對標上，沒有充裕時間做一手使用者研究——但也因此學會在限制下快速收斂、持續出貨。",
        )}
      </p>
      <div className="ca-reflect">
        {reflectCards.map((card) => (
          <div className="ca-reflect-card" key={card.num}>
            <span className="ca-reflect-num">{card.num}</span>
            <h3>{t(card.title)}</h3>
            <p>{t(card.body)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
