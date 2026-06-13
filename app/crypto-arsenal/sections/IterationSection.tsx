import Image from "next/image";
import { getCryptoArsenalTranslator } from "../i18n-server";
import { iterationBoards, type IterationBoard } from "../data";

function Arrow() {
  return (
    <div className="ca-ba-arrow" aria-hidden="true">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </div>
  );
}

function Board({ board, t }: { board: IterationBoard; t: (s: string) => string }) {
  return (
    <div className="ca-iter-board">
      <div className="ca-iter-head">
        <span className="ca-iter-badge">{t(board.badge)}</span>
        <h3 className="ca-iter-title">{t(board.title)}</h3>
      </div>
      <div className="ca-iter-row">
        <p className="ca-iter-label">{t(board.label)}</p>
        <div className="ca-iter-desc">
          {board.paragraphs.map((p, i) => (
            <p key={i}>{t(p)}</p>
          ))}
        </div>
      </div>
      <div className="ca-ba">
        <div className="ca-ba-panel">
          <div className="ca-ba-head">Before</div>
          <div className="ca-ba-content">
            <Image
              src={board.beforeImg}
              alt={t(board.beforeAlt)}
              width={board.width}
              height={board.height}
              sizes="(max-width: 768px) 100vw, 480px"
              style={{ width: "100%", height: "auto" }}
              unoptimized
            />
          </div>
        </div>
        <Arrow />
        <div className="ca-ba-panel">
          <div className="ca-ba-head">After</div>
          <div className="ca-ba-content">
            <Image
              src={board.afterImg}
              alt={t(board.afterAlt)}
              width={board.width}
              height={board.height}
              sizes="(max-width: 768px) 100vw, 480px"
              style={{ width: "100%", height: "auto" }}
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function IterationSection() {
  const { t } = await getCryptoArsenalTranslator();
  return (
    <section id="cs-sec-iteration" className="cs-section ca-section-alt">
      <span className="ca-tag ca-tag-amber">Design Iteration</span>
      <h2 className="ca-h2">{t("設計元件迭代")}</h2>
      <p className="ca-lead">
        {t("透過內部團隊人員與工程師測試，將部分元件進行迭代修正，更加提升用戶使用體驗。")}
      </p>
      {iterationBoards.map((board) => (
        <Board board={board} t={t} key={board.title} />
      ))}
    </section>
  );
}
