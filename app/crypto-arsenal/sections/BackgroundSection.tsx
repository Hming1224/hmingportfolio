import { CaseFlowFrame, CaseSectionHeader } from "../../../components/case-study";
import { getCryptoArsenalTranslator } from "../i18n-server";
import { EcosystemFlowDiagram, TradingFlowDiagram } from "./BackgroundFlowDiagrams";

export default async function BackgroundSection() {
  const { locale, t } = await getCryptoArsenalTranslator();
  const tradingFlowLabels = {
    aria: t("交易與策略流程圖：交易者透過交易所把法幣換成加密貨幣，並透過交易策略經由 Crypto Arsenal 在交易所自動交易"),
    buyFiat: t("用法幣買進加密貨幣"),
    cryptoSwap: t("加密貨幣互換"),
    crypto: t("Crypto"),
    selectMonitor: t("挑選 & 監控"),
    executeOrder: t("下單執行"),
    trader: t("交易者"),
    exchange: t("交易所"),
    blockchain: t("區塊鏈"),
    strategy: t("交易策略"),
  };
  const ecosystemFlowLabels = {
    aria: t("生態系圖：開發者建立交易機器人、交易者使用交易機器人，收益在雙方與平台之間流動"),
    useBots: t("使用交易機器人"),
    buildBots: t("建立交易機器人"),
    botReturns: t("機器人帶來的收益"),
    botRevenueShare: t("機器人收益 ＋ 跟單者分潤"),
    trader: t("交易者"),
    arsenal: "Crypto Arsenal",
    developer: t("開發者"),
  };

  return (
    <section id="cs-sec-background" className="cs-section-surface">
      <CaseSectionHeader kicker={t("產品介紹")} title={t("Crypto Arsenal 是做什麼？")} />

      <p className="cs-section-lead">
        {t("就像傳統金融市場，加密市場裡的交易者透過")}
        <b>{locale === "en" ? "exchange" : "交易所"}</b>
        {t("把法幣（如 USD）換成加密貨幣；交易所就像中間人，幫交易者完成買賣、並連到背後的")}
        <b>{locale === "en" ? "blockchain" : "區塊鏈"}</b>
        {t("。")}
      </p>
      <p className="cs-section-lead">
        {t("但加密交易的門檻在於：通常得")}
        <b>{t("手動盯盤、手動下單")}</b>
        {t("，還要對市場有一定了解。於是「交易策略」出現了：策略是一段程式或演算法，幫交易者監控市場、更有效率地交易。")}
      </p>

      <CaseFlowFrame
        scrollHintLabel={t("左右滑動查看更多")}
        caption={t(
          "交易者把法幣換成加密貨幣，並透過交易策略在交易所自動交易；Crypto Arsenal 位於「策略」與「交易所」之間負責執行下單。",
        )}
      >
          <TradingFlowDiagram labels={tradingFlowLabels} />
      </CaseFlowFrame>

      <div className="cs-section-block--large-gap">
        <p className="cs-section-lead">
          {t("而 ")}
          <b>Crypto Arsenal</b>
          {t(" 就是一個直接串接交易所、提供交易者自動化策略來交易的平台。它同時服務兩種角色，形成一個策略供需的生態系。")}
        </p>
      </div>

      <CaseFlowFrame
        scrollHintLabel={t("左右滑動查看更多")}
        caption={t("開發者建立交易機器人上架、交易者選用機器人；收益在雙方與平台之間流動。")}
      >
          <EcosystemFlowDiagram labels={ecosystemFlowLabels} />
      </CaseFlowFrame>

      <div className="cs-section-block--large-gap">
        <p className="cs-section-lead">
          {t("這個模式為交易者、開發者與平台本身同時創造價值。不過策略並非 ")}
          <b>{t("100% 全自動")}</b>
          {t("，往往仍需要交易者依市場狀況自己微調，這正是後來「倉位顯示與手動平倉」這個功能要解決的起點。")}
        </p>
      </div>
    </section>
  );
}
