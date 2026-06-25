import { CaseMedia, CaseSectionHeader } from "../../../components/case-study";
import { getCryptoArsenalTranslator } from "../i18n-server";
import { finalFlows } from "../data";
import FinalVideo from "./FinalVideo";

export default async function FinalSection() {
  const { t } = await getCryptoArsenalTranslator();
  return (
    <section id="cs-sec-final" className="cs-section">
      <CaseSectionHeader kicker="Final UI Design" title={t("最終介面：手動平倉和下止盈止損單")} />
      <p className="ca-lead">
        {t(
          "承接競品流程的拆解與多次提案的權衡，收斂出最適合 CA 的方案，把手動平倉和止盈止損分為三個流程依序介紹。",
        )}
      </p>
      {finalFlows.map((flow, i) => (
        <div key={i}>
          <div className="ca-final-banner">
            <span className="ca-final-banner-kicker">{t(flow.kicker)}</span>
            <h3 className="ca-final-banner-title">{t(flow.title)}</h3>
          </div>
          <CaseMedia className="ca-figure ca-final-shot" contentClassName="ca-figure-img">
            <FinalVideo
              src={flow.video}
              label={t(flow.alt)}
              mask={flow.mask}
              labels={{
                close: t("關閉放大影片"),
                separator: "：",
                zoom: t("放大播放影片"),
              }}
            />
          </CaseMedia>
        </div>
      ))}
    </section>
  );
}
