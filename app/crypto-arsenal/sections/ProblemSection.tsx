import Image from "next/image";
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
    <section id="cs-sec-problem" className="cs-section ca-section-alt">
      <span className="ca-tag">{t("問題定義")}</span>
      <h2 className="ca-h2">{t("用戶痛點：整體策略賺賠看得到，倉位狀態卻看不見")}</h2>
      <p className="ca-lead ca-narrow">
        {t(
          "使用者在CA 平台上使用策略機器人交易時，雖然可以看到策略整體賺了多少，卻無法清楚理解「現在到底開了什麼倉位」。當同時啟動多支策略、或同一支策略可能開多也可能開空時，使用者無法直接判斷目前是多倉還是空倉、倉位數量、入場價、標記價、浮動盈虧，以及該倉位距離止盈 / 止損還有多遠。",
        )}
      </p>
      <div className="ca-pains">
        {painCards.map((card) => (
          <article className="ca-pain-card" key={card.name}>
            <p className="ca-pain-quote">{t(card.quote)}</p>
            <div className="ca-pain-who">
              <span className={`ca-avatar ca-avatar-${card.tone}`}>
                <Image
                  className="ca-avatar-img"
                  src={avatarIcons[card.tone].src}
                  alt=""
                  width={avatarIcons[card.tone].size}
                  height={avatarIcons[card.tone].size}
                  aria-hidden="true"
                />
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
