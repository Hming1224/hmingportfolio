import Image from "next/image";
import { CaseCard, CaseMedia, CaseSectionHeader, FlowScrollHint } from "../../../components/case-study";
import { getCryptoArsenalTranslator } from "../i18n-server";
import {
  positionShots,
  closeMatrix,
  tpslMatrix,
  STEP_W,
  STEP_H,
  type ExchangeShot,
  type FlowMatrix,
} from "../data";
import StepLightbox from "../components/StepLightbox";

function ExchangeBlock({ shot, t }: { shot: ExchangeShot; t: (s: string) => string }) {
  return (
    <CaseCard className="ca-exchange">
      <div className="ca-exchange-label">
        <span className="ca-exchange-logo">
          <Image src={shot.logo} alt="" width={32} height={32} unoptimized />
        </span>
        <span className="ca-exchange-name">{shot.name}</span>
      </div>
      <CaseMedia className="ca-exchange-media" contentClassName="ca-exchange-img">
        <Image
          src={shot.img}
          alt={t(shot.alt)}
          width={shot.width}
          height={shot.height}
          sizes="(max-width: 1199px) 100vw, 700px"
          style={{ width: "100%", height: "auto" }}
          unoptimized
        />
      </CaseMedia>
    </CaseCard>
  );
}

function FlowMatrixBoard({ matrix, t }: { matrix: FlowMatrix; t: (s: string) => string }) {
  const cols = `clamp(72px, 12%, 116px) repeat(${matrix.stepLabels.length}, minmax(0, 1fr))`;
  return (
    <>
      <div className="ca-subflow-head">
        <h3 className="ca-subflow-title">
          {t(matrix.kicker)}{t("：")}{t(matrix.title)}
        </h3>
      </div>
      <FlowScrollHint label={t("左右滑動查看更多")} />
      <div className="ca-matrix-scroll">
        <div className="ca-matrix" style={{ minWidth: matrix.stepLabels.length === 3 ? 720 : 560 }}>
          <div className="ca-matrix-head" style={{ gridTemplateColumns: cols }}>
            <span className="ca-matrix-corner" aria-hidden="true" />
            {matrix.stepLabels.map((label) => {
              const translated = t(label);
              // 允許步驟編號帶 a/b 後綴（如 ②a / ②b），表示「二擇一」而非先後順序
              const match = translated.match(/^([①-⑨])([a-z]?)\s*([\s\S]*)$/);
              if (match) {
                const circleNum = match[1];
                const suffix = match[2];
                const text = match[3];
                const numMap: Record<string, number> = {
                  "①": 1, "②": 2, "③": 3, "④": 4, "⑤": 5, "⑥": 6, "⑦": 7, "⑧": 8, "⑨": 9
                };
                const num = numMap[circleNum] || 1;
                return (
                  <div className="ca-matrix-step" key={label}>
                    <span className="ca-matrix-step-num">{num}{suffix}</span>
                    <span className="ca-matrix-step-text">{text}</span>
                  </div>
                );
              }
              return (
                <div className="ca-matrix-step" key={label}>
                  {translated}
                </div>
              );
            })}
          </div>
          {matrix.rows.map((row) => (
            <div className="ca-matrix-row" style={{ gridTemplateColumns: cols }} key={row.name}>
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
      </div>
      <div className="ca-matrix-synth">
        <span className="ca-matrix-synth-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7h11M4 7l3-3M4 7l3 3" />
            <path d="M20 17H9M20 17l-3-3M20 17l-3 3" />
          </svg>
        </span>
        <p>{t(matrix.synthesis)}</p>
      </div>
    </>
  );
}

export default async function ResearchSection() {
  const { t } = await getCryptoArsenalTranslator();
  return (
    <section id="cs-sec-research" className="cs-section ca-section-alt">
      <CaseSectionHeader kicker={t("交易所介面參考")} title={t("盤點交易所通用的倉位資訊、平倉、止盈止損流程")} />
      <p className="ca-lead">
        {t(
          "為了順利讓使用者無縫熟悉流程，我以 Binance / Bybit / OKX 的實際介面進行競品流程參考，拆解三家共通的倉位資訊欄位、平倉和止盈止損流程，另外同時考量交易所能夠回傳的資料，收斂出專屬於 CA 的操作流程。",
        )}
      </p>

      {/* 倉位資訊欄位對標 */}
      <div className="ca-research-row">
        <CaseCard className="ca-research-info">
          <div className="ca-research-info-head">{t("交易詳細資訊確認")}</div>
          <div className="ca-research-info-body">
            <p>{t("從三家交易所介面收斂出交易合約中倉位最通用、可從交易所撈取之數據，並且也是使用者最關心的欄位。")}</p>
            <div className="ca-chip">
              <p className="ca-chip-label">{t("交易資訊 Tab")}</p>
              <p className="ca-chip-body">{t("Position、Open Orders、Order History、Position History")}</p>
            </div>
            <div className="ca-chip">
              <p className="ca-chip-label">{t("倉位資訊")}</p>
              <p className="ca-chip-body">Symbol、Side、Size、Entry Price、Mark Price、Liq. Price、Margin、PnL (ROE%)</p>
            </div>
          </div>
        </CaseCard>
        <div className="ca-research-shots">
          {positionShots.map((shot) => (
            <ExchangeBlock shot={shot} t={t} key={`pos-${shot.name}`} />
          ))}
        </div>
      </div>

      {/* 操作流程對比矩陣：合約平倉 / 合約止盈止損 */}
      <FlowMatrixBoard matrix={closeMatrix} t={t} />
      <FlowMatrixBoard matrix={tpslMatrix} t={t} />

      <p className="ca-lead ca-research-note">
        {t(
          "從上面流程可以觀察到無論是 Binance、OKX、Bybit 的介面或是操作流程基本雷同，僅介面元件有差異，因此 CA 的兩項操作流程也將依照上述形式進行，確保使用者可以快速銜接。",
        )}
      </p>
    </section>
  );
}
