import Image from "next/image";
import { CaseCard, CaseGrid, CaseSectionHeader } from "../../../components/case-study";
import { getCryptoArsenalTranslator } from "../i18n-server";
import { painCards } from "../data";

const avatarIcons = {
  orange: {
    src: "/projects/crypto-arsenal/problem/icons/developer.svg",
    size: 36,
  },
  blue: {
    src: "/projects/crypto-arsenal/problem/icons/trader.svg",
    size: 32,
  },
} as const;

export default async function ProblemSection() {
  const { t } = await getCryptoArsenalTranslator();
  return (
    <section id="cs-sec-problem" className="cs-section-surface">
      <CaseSectionHeader kicker={t("問題定義")} title={t("使用者痛點：整體策略賺賠看得到，倉位狀態卻看不見")} />
      <p className="cs-section-lead">
        {t(
          "使用者在 CA 平台上使用策略機器人交易時，雖然可以看到策略整體賺了多少，卻無法清楚理解「現在到底開了什麼倉位」。當同時啟動多支策略、或同一支策略可能開多也可能開空時，使用者無法直接判斷目前是多倉還是空倉、倉位數量、入場價、標記價、浮動盈虧，以及該倉位距離止盈 / 止損還有多遠。",
        )}
      </p>
      <CaseGrid variant="three">
        {painCards.map((card) => (
          <CaseCard key={card.name}>
            <p className="cs-quote-text">{t(card.quote)}</p>
            <div className="cs-quote-meta">
              <span className={`cs-avatar cs-avatar--${card.tone}`}>
                <Image
                  className="cs-avatar-img"
                  src={avatarIcons[card.tone].src}
                  alt=""
                  width={avatarIcons[card.tone].size}
                  height={avatarIcons[card.tone].size}
                  aria-hidden="true"
                />
              </span>
              <span className="cs-quote-name">{t(card.name)}</span>
              <span className="cs-quote-line" aria-hidden="true" />
              <span className="cs-quote-role">{t(card.role)}</span>
            </div>
          </CaseCard>
        ))}
      </CaseGrid>
    </section>
  );
}
