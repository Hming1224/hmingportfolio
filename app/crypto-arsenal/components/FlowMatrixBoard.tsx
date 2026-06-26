import Image from "next/image";
import { CaseCard, CaseFlowFrame } from "../../../components/case-study";
import { STEP_H, STEP_W, type FlowMatrix } from "../data";
import StepLightbox from "./StepLightbox";

type FlowMatrixBoardProps = {
  matrix: FlowMatrix;
  t: (text: string) => string;
};

const CIRCLE_NUMBERS: Record<string, number> = {
  "①": 1,
  "②": 2,
  "③": 3,
  "④": 4,
  "⑤": 5,
  "⑥": 6,
  "⑦": 7,
  "⑧": 8,
  "⑨": 9,
};

export default function FlowMatrixBoard({ matrix, t }: FlowMatrixBoardProps) {
  const columns = `clamp(72px, 12%, 116px) repeat(${matrix.stepLabels.length}, minmax(0, 1fr))`;

  return (
    <CaseCard>
      <h3 className="cs-subsection-title">
        {t(matrix.kicker)}
        {t("：")}
        {t(matrix.title)}
      </h3>
      <CaseFlowFrame
        scrollHintLabel={t("左右滑動查看更多")}
        variant="plain"
      >
        <div className="ca-matrix" style={{ minWidth: matrix.stepLabels.length === 3 ? 720 : 560 }}>
          <div className="ca-matrix-head" style={{ gridTemplateColumns: columns }}>
            <span className="ca-matrix-corner" aria-hidden="true" />
            {matrix.stepLabels.map((label) => {
              const translated = t(label);
              const match = translated.match(/^([①-⑨])([a-z]?)\s*([\s\S]*)$/);

              if (!match) {
                return (
                  <div className="ca-matrix-step" key={label}>
                    {translated}
                  </div>
                );
              }

              return (
                <div className="ca-matrix-step" key={label}>
                  <span className="ca-matrix-step-num">
                    {CIRCLE_NUMBERS[match[1]] ?? 1}
                    {match[2]}
                  </span>
                  <span className="ca-matrix-step-text">{match[3]}</span>
                </div>
              );
            })}
          </div>
          {matrix.rows.map((row) => (
            <div className="ca-matrix-row" style={{ gridTemplateColumns: columns }} key={row.name}>
              <div className="ca-matrix-ex">
                <span className="ca-matrix-ex-logo">
                  <Image src={row.logo} alt="" width={28} height={28} unoptimized />
                </span>
                <span className="ca-matrix-ex-name">{row.name}</span>
              </div>
              {row.cells.map((cell) => (
                <div
                  className={cell.extraImg ? "ca-matrix-cell ca-matrix-cell-stack" : "ca-matrix-cell"}
                  key={cell.img}
                >
                  <StepLightbox src={cell.img} alt={t(cell.alt)} width={STEP_W} height={STEP_H} />
                  {cell.extraImg ? (
                    <StepLightbox
                      src={cell.extraImg}
                      alt={t(cell.extraAlt ?? cell.alt)}
                      width={STEP_W}
                      height={STEP_H}
                    />
                  ) : null}
                  {cell.note ? <span className="ca-matrix-cell-note">{t(cell.note)}</span> : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </CaseFlowFrame>
      <div className="ca-matrix-synth">
        <span className="ca-matrix-synth-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 7h11M4 7l3-3M4 7l3 3" />
            <path d="M20 17H9M20 17l-3-3M20 17l-3 3" />
          </svg>
        </span>
        <p>{t(matrix.synthesis)}</p>
      </div>
    </CaseCard>
  );
}
