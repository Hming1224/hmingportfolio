import { BeforeAfterNarrativeFrame, CaseSectionHeader } from "../../../components/case-study";
import { getCryptoArsenalTranslator } from "../i18n-server";
import { iterationBoards, type IterationBoard } from "../data";
import StepLightbox from "../components/StepLightbox";

function Board({ board, t }: { board: IterationBoard; t: (s: string) => string }) {
  return (
    <BeforeAfterNarrativeFrame
      badge={t(board.badge)}
      title={t(board.title)}
      points={[
        {
          label: t(board.label),
          content: (
            <>
              {board.paragraphs.map((p, i) => (
                <p key={i}>{t(p)}</p>
              ))}
            </>
          ),
        },
      ]}
      beforeLabel="Before"
      afterLabel="After"
      before={
        <StepLightbox
          src={board.beforeImg}
          alt={t(board.beforeAlt)}
          width={board.width}
          height={board.height}
          sizes="(max-width: 768px) 560px, 480px"
          className="cs-before-after-zoom"
          imageClassName="cs-before-after-zoom-media"
        />
      }
      after={
        <StepLightbox
          src={board.afterImg}
          alt={t(board.afterAlt)}
          width={board.width}
          height={board.height}
          sizes="(max-width: 768px) 560px, 480px"
          className="cs-before-after-zoom"
          imageClassName="cs-before-after-zoom-media"
        />
      }
    />
  );
}

export default async function IterationSection() {
  const { t } = await getCryptoArsenalTranslator();
  return (
    <section id="cs-sec-iteration" className="cs-section-surface">
      <CaseSectionHeader kicker="Design Iteration" title={t("設計元件迭代")} tone="secondary" />
      <p className="cs-section-lead">
        {t("我們找內部團隊和工程師實測，逐一修過策略機器人 Bar 的資訊顯示、平倉的數量互動與止盈止損按鈕文字，讓每個元件都更貼近使用者實際的操作理解。")}
      </p>
      {iterationBoards.map((board) => (
        <Board board={board} t={t} key={board.title} />
      ))}
    </section>
  );
}
