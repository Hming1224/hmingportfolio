import Image from "next/image";
import { getCryptoArsenalTranslator } from "../i18n-server";

export default async function CurrentSection() {
  const { t } = await getCryptoArsenalTranslator();
  return (
    <section id="cs-sec-current" className="cs-section ca-section-alt">
      <span className="ca-tag">{t("介面現況")}</span>
      <h2 className="ca-h2">{t("策略在 CA、倉位卻要去交易所看")}</h2>
      <div className="cs-divider" />
      <p className="ca-lead ca-narrow">
        {t(
          "目前 CA 的 Portfolio 頁面可查看所有運行中的策略機器人，並在右上角呈現策略整體績效，例如獲利、ROI、未實現 ROI 與資產分布。然而，介面尚未直接顯示單一策略目前實際持有的倉位資訊，例如多 / 空方向、數量、入場價、標記價、浮動盈虧。使用者若想確認單一倉位狀態，仍需登入交易所查閱，導致 CA 作為策略管理平台，無法讓使用者在站內完整掌握個別策略的實際收益與風險狀態。",
        )}
      </p>
      <figure className="ca-figure ca-current-figure">
        <div className="ca-figure-img ca-current-figure-img">
          <Image
            src="/projects/crypto-arsenal/current/current-state-figure.png"
            alt={t("Crypto Arsenal 策略詳情頁現況：上方策略列表與績效指標，下方訂單與倉位清單仍分散於交易所端")}
            width={1441}
            height={1371}
            sizes="(max-width: 768px) 100vw, 1440px"
            style={{ width: "100%", height: "auto" }}
            unoptimized
          />
        </div>
      </figure>
    </section>
  );
}
