import Image from "next/image";
import { getCryptoArsenalTranslator } from "../i18n-server";
import { wireframeBoards, type WireframeBoard } from "../data";

function Board({ board, t }: { board: WireframeBoard; t: (s: string) => string }) {
  return (
    <>
      <div className="ca-wf-banner">
        <span className="ca-wf-banner-kicker">{t(board.kicker)}</span>
        <h3 className="ca-wf-banner-title">{t(board.title)}</h3>
      </div>
      <div className="ca-wf-board">
        <div className="ca-wf-tabs" role="tablist" aria-label={t(board.title)}>
          {board.tabs.map((tab, i) => (
            <span
              key={tab.label}
              role="tab"
              aria-selected={tab.active ? "true" : "false"}
              className={`ca-wf-tab${tab.active ? " is-active" : i === board.tabs.length - 1 ? " is-pending" : ""}`}
            >
              {t(tab.label)}
            </span>
          ))}
        </div>
        <div className="ca-wf-panel">
          <div className="ca-wf-shot">
            <Image
              src={board.img}
              alt={t(board.alt)}
              width={board.width}
              height={board.height}
              sizes="(max-width: 768px) 100vw, 1000px"
              style={{ width: "100%", height: "auto" }}
              unoptimized
            />
          </div>
          <p className="ca-wf-cap">{t(board.caption)}</p>
          <div className="ca-wf-reason">
            <p className="ca-wf-reason-title">{t(board.reasonTitle)}</p>
            <p className="ca-wf-reason-body">{t(board.reasonBody)}</p>
          </div>
        </div>
      </div>
    </>
  );
}

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
        <Board board={board} t={t} key={board.title} />
      ))}
    </section>
  );
}
