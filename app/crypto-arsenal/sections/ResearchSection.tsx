import Image from "next/image";
import { CaseCard, CaseGrid, CaseMedia, CaseSectionHeader } from "../../../components/case-study";
import { getCryptoArsenalTranslator } from "../i18n-server";
import {
  positionShots,
  closeMatrix,
  tpslMatrix,
  type ExchangeShot,
} from "../data";
import FlowMatrixBoard from "../components/FlowMatrixBoard";

function ExchangeBlock({ shot, t }: { shot: ExchangeShot; t: (s: string) => string }) {
  return (
    <CaseCard>
      <div className="cs-brand-label">
        <span className="cs-brand-mark">
          <Image src={shot.logo} alt="" width={32} height={32} />
        </span>
        <span className="cs-brand-name">{shot.name}</span>
      </div>
      <CaseMedia>
        <Image
          src={shot.img}
          alt={t(shot.alt)}
          width={shot.width}
          height={shot.height}
          sizes="(max-width: 1199px) 100vw, 700px"
          style={{ width: "100%", height: "auto" }}
        />
      </CaseMedia>
    </CaseCard>
  );
}

export default async function ResearchSection() {
  const { t } = await getCryptoArsenalTranslator();
  return (
    <section id="cs-sec-research" className="cs-section-surface">
      <CaseSectionHeader kicker={t("交易所介面參考")} title={t("盤點交易所通用的倉位資訊、平倉、止盈止損流程")} />
      <p className="cs-section-lead">
        {t(
          "為了讓使用者一上手就熟悉流程，我參考 Binance / Bybit / OKX 的實際介面，拆解三家共通的倉位資訊欄位、平倉和止盈止損流程，同時考量交易所能回傳的資料，收斂出專屬於 CA 的操作流程。",
        )}
      </p>

      {/* 倉位資訊欄位對標 */}
      <CaseGrid variant="two" className="cs-grid--aside-main cs-section-block--large-gap">
        <CaseCard>
          <div className="cs-panel-head">{t("交易詳細資訊確認")}</div>
          <div className="cs-panel-body">
            <p>{t("從三家交易所介面收斂出交易合約中倉位最通用、可從交易所撈取之數據，並且也是使用者最關心的欄位。")}</p>
            <div className="cs-info-chip">
              <p className="cs-info-chip-label">{t("交易資訊 Tab")}</p>
              <p className="cs-info-chip-body">{t("Position、Open Orders、Order History、Position History")}</p>
            </div>
            <div className="cs-info-chip">
              <p className="cs-info-chip-label">{t("倉位資訊")}</p>
              <p className="cs-info-chip-body">Symbol、Side、Size、Entry Price、Mark Price、Liq. Price、Margin、PnL (ROE%)</p>
            </div>
          </div>
        </CaseCard>
        <CaseGrid variant="stack" className="cs-grid--research-shots">
          {positionShots.map((shot) => (
            <ExchangeBlock shot={shot} t={t} key={`pos-${shot.name}`} />
          ))}
        </CaseGrid>
      </CaseGrid>

      {/* 操作流程對比矩陣：合約平倉 / 合約止盈止損 */}
      <FlowMatrixBoard matrix={closeMatrix} t={t} />
      <FlowMatrixBoard matrix={tpslMatrix} t={t} />

      <p className="cs-section-lead cs-section-lead--large-gap">
        {t(
          "從上面流程可以觀察到無論是 Binance、OKX、Bybit 的介面或是操作流程基本雷同，僅介面元件有差異，因此 CA 的兩項操作流程也將依照上述形式進行，確保使用者可以快速銜接。",
        )}
      </p>
    </section>
  );
}
