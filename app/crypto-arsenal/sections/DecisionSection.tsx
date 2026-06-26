import { CaseCard, CaseGrid, CaseSectionHeader } from "../../../components/case-study";
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
    <CaseCard className={`cs-status-card--${variant}`}>
      <div className="cs-status-head">{t(path.head)}</div>
      <div className="cs-status-body">
        <h3>{t(path.title)}</h3>
        <ul className="cs-counter-list">
          {path.steps.map((step) => (
            <li key={step}>{t(step)}</li>
          ))}
        </ul>
        <div className="cs-status-outcome">{t(path.outcome)}</div>
      </div>
    </CaseCard>
  );
}

export default async function DecisionSection() {
  const { t } = await getCryptoArsenalTranslator();
  return (
    <section id="cs-sec-decision" className="cs-section">
      <CaseSectionHeader kicker={t("關鍵決策")} title={t("兩種平倉路徑，結果天差地遠")} tone="warning" />
      <p className="cs-section-lead">
        {t(
          "問題不只是「看不到倉位」，而是使用者為了控制單筆風險去交易所平倉，反而可能讓整支策略報廢——機器人偵測到自己管理的倉位突然消失、狀態錯亂，為風險控管只能停掉策略且無法恢復。",
        )}
      </p>
      <CaseGrid variant="two">
        <DecisionCard path={decisionBad} variant="bad" t={t} />
        <DecisionCard path={decisionGood} variant="good" t={t} />
      </CaseGrid>
      <p className="cs-section-lead cs-section-lead--medium-gap">
        {t(
          "所以方向很明確：把平倉收進 CA 內。手動平倉只結束當下這一筆倉位、策略進入空倉，未來再符合開倉條件時機器人仍會自動開倉，讓用戶可以同時享有自動化交易的紀律以及自主控管收益的權利。",
        )}
      </p>
    </section>
  );
}
