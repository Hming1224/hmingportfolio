import { getCryptoArsenalTranslator } from "../i18n-server";
import { wireframeBoards } from "../data";
import WireframeProposalBoard from "../components/WireframeProposalBoard";

export default async function WireframeSection() {
  const { t } = await getCryptoArsenalTranslator();
  return (
    <section id="cs-sec-wireframe" className="cs-section">
      <span className="ca-tag">Wireframe</span>
      <h2 className="ca-h2">{t("打造與交易所同樣順暢且便利的操作體驗")}</h2>
      <div className="cs-divider" />
      <p className="ca-lead">
        {t(
          "雖然目前已參考交易所操作建立初步概念，但 CA 產品的交易流程與交易所仍存在差異。交易所偏向全手動操作，而 CA 目前以策略機器人全自動開單為主；交易者後續可依自身判斷，手動決定平倉時機與平倉數量。因此，在 CA 中導入手動平倉、止盈與止損功能時，需透過多種設計提案，進一步確認最終的介面樣式與操作流程。",
        )}
      </p>
      {wireframeBoards.map((board) => (
        <WireframeProposalBoard board={board} key={board.title} />
      ))}
    </section>
  );
}
