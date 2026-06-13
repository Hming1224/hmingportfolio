import { getCryptoArsenalTranslator } from "../i18n-server";
import { wireframeBoards } from "../data";
import WireframeProposalBoard from "../components/WireframeProposalBoard";

export default async function WireframeSection() {
  const { t } = await getCryptoArsenalTranslator();
  return (
    <section id="cs-sec-wireframe" className="cs-section">
      <span className="ca-tag">Wireframe</span>
      <h2 className="ca-h2">{t("打造與交易所同樣順暢且便利的操作體驗")}</h2>
      <p className="ca-lead">
        {t(
          "對照交易所的操作已經有雛形概念，然而 CA 產品畢竟是由領導機器人開單，再由交易者自行決定手動平倉的時機、數量，因此多次提案以確認最終設計方向。",
        )}
      </p>
      {wireframeBoards.map((board) => (
        <WireframeProposalBoard board={board} key={board.title} />
      ))}
    </section>
  );
}
