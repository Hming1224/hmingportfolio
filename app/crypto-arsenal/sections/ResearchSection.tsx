import Image from "next/image";
import { getCryptoArsenalTranslator } from "../i18n-server";
import { positionShots, closeFlowShots, tpslFlowShots, type ExchangeShot } from "../data";

function ExchangeBlock({ shot, t }: { shot: ExchangeShot; t: (s: string) => string }) {
  return (
    <div className="ca-exchange">
      <div className="ca-exchange-label">
        <span className="ca-exchange-logo">
          <Image src={shot.logo} alt="" width={32} height={32} unoptimized />
        </span>
        <span className="ca-exchange-name">{shot.name}</span>
      </div>
      <div className="ca-exchange-img">
        <Image
          src={shot.img}
          alt={t(shot.alt)}
          width={shot.width}
          height={shot.height}
          sizes="(max-width: 1199px) 100vw, 700px"
          style={{ width: "100%", height: "auto" }}
          unoptimized
        />
      </div>
    </div>
  );
}

export default async function ResearchSection() {
  const { t } = await getCryptoArsenalTranslator();
  return (
    <section id="cs-sec-research" className="cs-section ca-section-alt">
      <span className="ca-tag">{t("交易所介面參考")}</span>
      <h2 className="ca-h2">{t("盤點交易所通用的倉位資訊、平倉、止盈止損流程")}</h2>
      <p className="ca-lead">
        {t(
          "為了順利讓使用者無縫熟悉流程，我以 Binance / Bybit / OKX 的實際介面進行競品流程參考，拆解三家共通的倉位資訊欄位、平倉和止盈止損流程，另外同時考量交易所能夠回傳的資料，收斂出專屬於 CA 的操作流程。",
        )}
      </p>

      {/* 倉位資訊欄位對標 */}
      <div className="ca-research-row">
        <div className="ca-research-info">
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
        </div>
        <div className="ca-research-shots">
          {positionShots.map((shot) => (
            <ExchangeBlock shot={shot} t={t} key={`pos-${shot.name}`} />
          ))}
        </div>
      </div>

      {/* 操作流程 1：合約平倉 */}
      <div className="ca-subflow-head">
        <span className="ca-subflow-kicker">{t("操作流程 1")}</span>
        <h3 className="ca-subflow-title">{t("合約平倉")}</h3>
      </div>
      <div className="ca-research-flows">
        {closeFlowShots.map((shot) => (
          <ExchangeBlock shot={shot} t={t} key={`close-${shot.name}`} />
        ))}
      </div>

      {/* 操作流程 2：合約止盈止損 */}
      <div className="ca-subflow-head">
        <span className="ca-subflow-kicker">{t("操作流程 2")}</span>
        <h3 className="ca-subflow-title">{t("合約止盈止損")}</h3>
      </div>
      <div className="ca-research-flows">
        {tpslFlowShots.map((shot) => (
          <ExchangeBlock shot={shot} t={t} key={`tpsl-${shot.name}`} />
        ))}
      </div>

      <p className="ca-lead ca-research-note">
        {t(
          "從上面流程可以觀察到無論是 Binance、OKX、Bybit 的介面或是操作流程基本雷同，僅介面元件有差異，因此 CA 的兩項操作流程也將依照上述形式進行，確保使用者可以快速銜接。",
        )}
      </p>
    </section>
  );
}
