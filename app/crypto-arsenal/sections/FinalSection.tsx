import Image from "next/image";
import { getCryptoArsenalTranslator } from "../i18n-server";
import { finalFlows } from "../data";

export default async function FinalSection() {
  const { t } = await getCryptoArsenalTranslator();
  return (
    <section id="cs-sec-final" className="cs-section">
      <span className="ca-tag">Final UI Design</span>
      <h2 className="ca-h2">{t("最終介面：倉位顯示、手動平倉、下止盈止損單")}</h2>
      <p className="ca-lead">
        {t(
          "最終把倉位顯示與手動平倉做成可點的 prototype，作為交付給工程的依據，並清楚區分「平倉」與「停止策略」避免誤觸。",
        )}
      </p>
      {finalFlows.map((flow, i) => (
        <div key={i}>
          <div className="ca-final-banner">
            <span className="ca-final-banner-kicker">{t(flow.kicker)}</span>
            <h3 className="ca-final-banner-title">{t(flow.title)}</h3>
          </div>
          <figure className="ca-figure ca-final-shot">
            <div className="ca-figure-img">
              <Image
                src={flow.img}
                alt={t(flow.alt)}
                width={flow.width}
                height={flow.height}
                sizes="(max-width: 768px) 100vw, 1000px"
                style={{ width: "100%", height: "auto" }}
                unoptimized
              />
            </div>
          </figure>
        </div>
      ))}
    </section>
  );
}
