import { getCryptoArsenalTranslator } from "../i18n-server";

export default async function BackgroundSection() {
  const { t } = await getCryptoArsenalTranslator();
  return (
    <section id="cs-sec-background" className="cs-section ca-section-alt">
      <span className="ca-tag">{t("專案背景")}</span>
      <h2 className="ca-h2">{t("Crypto Arsenal 是做什麼？")}</h2>
      <div className="ca-narrow">
        <p className="ca-lead">
          {t(
            "就像傳統金融市場，加密市場裡的交易者透過交易所把法幣（如 USD）換成加密貨幣；交易所就像中間人，幫交易者完成買賣、並連到背後的區塊鏈。",
          )}
        </p>
        <p className="ca-lead">
          {t(
            "但加密交易的門檻在於：通常得手動盯盤、手動下單，還要對市場有一定了解。於是「交易策略」出現了——策略是一段程式或演算法，幫交易者監控市場、更有效率地交易。",
          )}
        </p>
      </div>

      <div className="ca-diagram">
        <svg
          viewBox="0 0 960 320"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={t(
            "交易與策略流程圖：交易者透過交易所把法幣換成加密貨幣，並透過交易策略經由 Crypto Arsenal 在交易所自動交易",
          )}
        >
          <defs>
            <marker id="ca-arr" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0.5,1 L9,5 L0.5,9" fill="none" stroke="#9aa3c2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
            <marker id="ca-arr2" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0.5,1 L9,5 L0.5,9" fill="none" stroke="#376adc" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>
          <line x1="150" y1="60" x2="522" y2="60" stroke="#c4cbe0" strokeWidth="1.6" markerEnd="url(#ca-arr)" />
          <text x="336" y="48" textAnchor="middle" fontSize="13" fill="#6c6e77">{t("用法幣買進加密貨幣")}</text>
          <line x1="522" y1="96" x2="150" y2="96" stroke="#c4cbe0" strokeWidth="1.6" markerEnd="url(#ca-arr)" />
          <text x="336" y="114" textAnchor="middle" fontSize="13" fill="#6c6e77">{t("加密貨幣互換")}</text>
          <line x1="592" y1="78" x2="812" y2="78" stroke="#c4cbe0" strokeWidth="1.6" markerStart="url(#ca-arr)" markerEnd="url(#ca-arr)" />
          <text x="702" y="64" textAnchor="middle" fontSize="13" fill="#6c6e77">Crypto</text>
          <path d="M110,104 V238 H300" fill="none" stroke="#c4cbe0" strokeWidth="1.6" markerEnd="url(#ca-arr)" />
          <text x="122" y="180" fontSize="13" fill="#6c6e77">{t("挑選 & 監控")}</text>
          <line x1="360" y1="238" x2="486" y2="238" stroke="#c4cbe0" strokeWidth="1.6" markerEnd="url(#ca-arr)" />
          <path d="M560,218 V104" fill="none" stroke="#376adc" strokeWidth="1.7" markerEnd="url(#ca-arr2)" />
          <text x="572" y="170" fontSize="13" fontWeight="600" fill="#376adc">{t("下單執行")}</text>
          <g transform="translate(110,78)" fill="none" stroke="#334dab" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle r="24" fill="#e8eafa" stroke="none" />
            <circle cx="0" cy="-5" r="6" />
            <path d="M-10,11 a10,9 0 0 1 20,0" />
          </g>
          <text x="110" y="124" textAnchor="middle" fontSize="15" fontWeight="700" fill="#252a47">{t("交易者")}</text>
          <g transform="translate(560,78)" fill="none" stroke="#334dab" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle r="24" fill="#e8eafa" stroke="none" />
            <path d="M-13,-4 L0,-13 L13,-4" />
            <line x1="-13" y1="10" x2="13" y2="10" />
            <line x1="-9" y1="-4" x2="-9" y2="10" />
            <line x1="-3" y1="-4" x2="-3" y2="10" />
            <line x1="3" y1="-4" x2="3" y2="10" />
            <line x1="9" y1="-4" x2="9" y2="10" />
          </g>
          <text x="560" y="124" textAnchor="middle" fontSize="15" fontWeight="700" fill="#252a47">{t("交易所")}</text>
          <g transform="translate(840,78)" fill="none" stroke="#334dab" strokeWidth="1.7">
            <circle r="24" fill="#e8eafa" stroke="none" />
            <circle r="12" />
            <line x1="-12" y1="0" x2="12" y2="0" />
            <ellipse rx="5" ry="12" />
          </g>
          <text x="840" y="124" textAnchor="middle" fontSize="15" fontWeight="700" fill="#252a47">{t("區塊鏈")}</text>
          <g transform="translate(330,238)" fill="none" stroke="#334dab" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle r="24" fill="#e8eafa" stroke="none" />
            <rect x="-11" y="-8" width="22" height="18" rx="4" />
            <line x1="0" y1="-8" x2="0" y2="-13" />
            <circle cx="0" cy="-14" r="1.6" fill="#334dab" stroke="none" />
            <circle cx="-4.5" cy="-1" r="1.8" fill="#334dab" stroke="none" />
            <circle cx="4.5" cy="-1" r="1.8" fill="#334dab" stroke="none" />
            <line x1="-4" y1="5" x2="4" y2="5" />
          </g>
          <text x="330" y="282" textAnchor="middle" fontSize="15" fontWeight="700" fill="#252a47">{t("交易策略")}</text>
          <rect x="490" y="219" width="140" height="38" rx="19" fill="#376adc" />
          <text x="560" y="243" textAnchor="middle" fontSize="14" fontWeight="700" fill="#ffffff">Crypto Arsenal</text>
        </svg>
        <p className="ca-diagram-cap">
          {t(
            "交易者把法幣換成加密貨幣，並透過交易策略在交易所自動交易；Crypto Arsenal 位於「策略」與「交易所」之間負責執行下單。",
          )}
        </p>
      </div>

      <div className="ca-narrow ca-overview-gap">
        <p className="ca-lead">
          {t(
            "而 Crypto Arsenal 就是一個直接串接交易所、提供交易者自動化策略來交易的平台。它同時服務兩種角色，形成一個策略供需的生態系。",
          )}
        </p>
      </div>

      <div className="ca-diagram">
        <svg
          viewBox="0 0 880 270"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={t("生態系圖：開發者建立交易機器人、交易者使用交易機器人，收益在雙方與平台之間流動")}
        >
          <defs>
            <marker id="ca-arrB" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0.5,1 L9,5 L0.5,9" fill="none" stroke="#9aa3c2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>
          <line x1="172" y1="74" x2="384" y2="74" stroke="#c4cbe0" strokeWidth="1.6" markerEnd="url(#ca-arrB)" />
          <text x="278" y="60" textAnchor="middle" fontSize="13" fill="#6c6e77">{t("使用交易機器人")}</text>
          <line x1="708" y1="74" x2="496" y2="74" stroke="#c4cbe0" strokeWidth="1.6" markerEnd="url(#ca-arrB)" />
          <text x="602" y="60" textAnchor="middle" fontSize="13" fill="#6c6e77">{t("建立交易機器人")}</text>
          <path d="M414,206 H120 V106" fill="none" stroke="#c4cbe0" strokeWidth="1.6" markerEnd="url(#ca-arrB)" />
          <text x="250" y="232" textAnchor="middle" fontSize="13" fill="#6c6e77">{t("機器人帶來的收益")}</text>
          <path d="M466,206 H760 V106" fill="none" stroke="#c4cbe0" strokeWidth="1.6" markerEnd="url(#ca-arrB)" />
          <text x="620" y="232" textAnchor="middle" fontSize="13" fill="#6c6e77">{t("機器人收益 ＋ 跟單者分潤")}</text>
          <g transform="translate(120,80)" fill="none" stroke="#334dab" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle r="24" fill="#e8eafa" stroke="none" />
            <circle cx="0" cy="-5" r="6" />
            <path d="M-10,11 a10,9 0 0 1 20,0" />
          </g>
          <text x="120" y="124" textAnchor="middle" fontSize="15" fontWeight="700" fill="#252a47">{t("交易者")}</text>
          <g transform="translate(440,80)" fill="none" stroke="#376adc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle r="26" fill="#dde2fb" stroke="none" />
            <path d="M0,-13 L13,12 L-13,12 Z" />
            <line x1="-6.5" y1="2" x2="6.5" y2="2" />
          </g>
          <text x="440" y="126" textAnchor="middle" fontSize="15" fontWeight="700" fill="#376adc">Crypto Arsenal</text>
          <g transform="translate(760,80)" fill="none" stroke="#334dab" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle r="24" fill="#e8eafa" stroke="none" />
            <circle cx="0" cy="-7" r="5" />
            <path d="M-8,2 a8,7 0 0 1 16,0" />
            <rect x="-11" y="6" width="22" height="4" rx="1.5" />
          </g>
          <text x="760" y="124" textAnchor="middle" fontSize="15" fontWeight="700" fill="#252a47">{t("開發者")}</text>
          <g transform="translate(440,206)" fill="none" stroke="#334dab" strokeWidth="1.7">
            <circle r="22" fill="#e8eafa" stroke="none" />
            <circle r="13" />
          </g>
          <text x="440" y="212" textAnchor="middle" fontSize="16" fontWeight="700" fill="#334dab">$</text>
        </svg>
        <p className="ca-diagram-cap">
          {t("開發者建立交易機器人上架、交易者選用機器人；收益在雙方與平台之間流動。")}
        </p>
      </div>

      <div className="ca-narrow ca-overview-gap">
        <p className="ca-lead">
          {t(
            "這個模式為交易者、開發者與平台本身同時創造價值。不過策略並非 100% 全自動，往往仍需要交易者依市場狀況自己微調——這正是後來「倉位顯示與手動平倉」這個功能要解決的起點。",
          )}
        </p>
      </div>
    </section>
  );
}
