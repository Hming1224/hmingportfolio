import { getCryptoArsenalTranslator } from "../i18n-server";
import { painCards } from "../data";

function FaceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 14c.9 1.1 2.1 1.7 3.5 1.7s2.6-.6 3.5-1.7" />
      <circle cx="9" cy="10" r=".7" fill="currentColor" />
      <circle cx="15" cy="10" r=".7" fill="currentColor" />
    </svg>
  );
}

export default async function ProblemSection() {
  const { t } = await getCryptoArsenalTranslator();
  return (
    <section id="cs-sec-problem" className="cs-section">
      <span className="ca-tag">{t("問題定義")}</span>
      <h2 className="ca-h2">{t("用戶痛點：整體策略賺賠看得到，倉位狀態卻看不見")}</h2>
      <p className="ca-lead ca-narrow">
        {t(
          "CA 介面只呈現策略的整體績效（獲利、ROI、未實現 ROI、資產分布），卻沒直接顯示這支策略目前實際持有哪些倉位。使用者因此卡在幾個反覆出現的情境裡。",
        )}
      </p>
      <div className="ca-pains">
        {painCards.map((card) => (
          <article className="ca-pain-card" key={card.name}>
            <p className="ca-pain-quote">{t(card.quote)}</p>
            <div className="ca-pain-who">
              <span className={`ca-avatar ca-avatar-${card.tone}`}>
                <FaceIcon />
              </span>
              <span className="ca-pain-name">{t(card.name)}</span>
              <span className="ca-pain-line" aria-hidden="true" />
              <span className="ca-pain-role">{t(card.role)}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
