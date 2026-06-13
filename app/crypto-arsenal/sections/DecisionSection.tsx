import { getCryptoArsenalTranslator } from "../i18n-server";
import { decisionBad, decisionGood, type DecisionPath } from "../data";

function DecisionCard({
  path,
  variant,
  t,
}: {
  path: DecisionPath;
  variant: "bad" | "good";
  t: (s: string) => string;
}) {
  return (
    <div className={`ca-dcard ca-dcard-${variant}`}>
      <div className="ca-dcard-head">{t(path.head)}</div>
      <div className="ca-dcard-body">
        <h3>{t(path.title)}</h3>
        <ul className="ca-steps">
          {path.steps.map((step) => (
            <li key={step}>{t(step)}</li>
          ))}
        </ul>
        <div className="ca-dcard-out">{t(path.outcome)}</div>
      </div>
    </div>
  );
}

export default async function DecisionSection() {
  const { t } = await getCryptoArsenalTranslator();
  return (
    <section id="cs-sec-decision" className="cs-section">
      <span className="ca-tag ca-tag-amber">{t("問題延伸的後果")}</span>
      <h2 className="ca-h2">{t("兩種平倉路徑，結果天差地遠")}</h2>
      <p className="ca-lead ca-narrow">
        {t(
          "問題不只是「看不到倉位」，而是使用者為了控制單筆風險去交易所平倉，反而可能讓整支策略報廢——機器人偵測到自己管理的倉位突然消失、狀態錯亂，為風險控管只能停掉策略且無法恢復。",
        )}
      </p>
      <div className="ca-decision">
        <DecisionCard path={decisionBad} variant="bad" t={t} />
        <DecisionCard path={decisionGood} variant="good" t={t} />
      </div>
      <p className="ca-lead ca-narrow ca-decision-close">
        {t(
          "所以方向很明確：把平倉收進 CA 內。手動平倉只結束當下這一筆倉位、策略進入空倉，未來再符合開倉條件時機器人仍會自動開倉，讓用戶可以同時享有自動化交易的紀律以及自主控管收益的權利。",
        )}
      </p>
    </section>
  );
}
