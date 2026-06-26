import { CaseBeforeAfter, CaseCard, CaseSectionHeader } from "../../../components/case-study";
import { getCryptoArsenalTranslator } from "../i18n-server";
import { iterationBoards, type IterationBoard } from "../data";
import StepLightbox from "../components/StepLightbox";

function Board({ board, t }: { board: IterationBoard; t: (s: string) => string }) {
  return (
    <CaseCard>
      <div className="cs-card-heading-row">
        <span className="cs-pill-badge">{t(board.badge)}</span>
        <h3 className="cs-card-heading-title">{t(board.title)}</h3>
      </div>
      <div className="cs-detail-row">
        <p className="cs-detail-label">{t(board.label)}</p>
        <div className="cs-detail-body">
          {board.paragraphs.map((p, i) => (
            <p key={i}>{t(p)}</p>
          ))}
        </div>
      </div>
      <CaseBeforeAfter
        before={
          <StepLightbox
            src={board.beforeImg}
            alt={t(board.beforeAlt)}
            width={board.width}
            height={board.height}
            sizes="(max-width: 768px) 560px, 480px"
            className="ca-iteration-zoom"
            imageClassName="ca-iteration-zoom-img"
          />
        }
        after={
          <StepLightbox
            src={board.afterImg}
            alt={t(board.afterAlt)}
            width={board.width}
            height={board.height}
            sizes="(max-width: 768px) 560px, 480px"
            className="ca-iteration-zoom"
            imageClassName="ca-iteration-zoom-img"
          />
        }
      />
    </CaseCard>
  );
}

export default async function IterationSection() {
  const { t } = await getCryptoArsenalTranslator();
  return (
    <section id="cs-sec-iteration" className="cs-section-surface">
      <CaseSectionHeader kicker="Design Iteration" title={t("設計元件迭代")} tone="secondary" />
      <p className="cs-section-lead">
        {t("透過內部團隊人員與工程師測試，將部分元件進行迭代修正，更加提升用戶使用體驗。")}
      </p>
      {iterationBoards.map((board) => (
        <Board board={board} t={t} key={board.title} />
      ))}
    </section>
  );
}
