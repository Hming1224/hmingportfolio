import Image from "next/image";
import { getCryptoArsenalTranslator } from "../i18n-server";
import { heroTasks } from "../data";

export default async function HeroSection() {
  const { t } = await getCryptoArsenalTranslator();
  return (
    <section>
      <div className="cs-hero-cover">
        <div className="cs-hero-cover-img">
          <Image
            src="/projects/crypto-arsenal/cover/hero-cover.webp"
            alt={t("Crypto Arsenal 量化交易平台介面主視覺")}
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
            unoptimized
          />
        </div>
      </div>

      <div className="cs-hero-info">
        <div className="cs-hero-meta">
          <span className="cs-tags">WEB・FinTech・Crypto・UX Design・UI Design</span>
        </div>
        <h1 className="cs-title">{t("策略倉位資訊顯示、手動平倉與止盈止損")}</h1>
        <div className="cs-info-row">
          <div className="cs-info-card">
            <span className="cs-info-label">{t("時間進程")}</span>
            <span className="cs-info-value">2023.06 – 2023.08</span>
          </div>
          <div className="cs-info-card">
            <span className="cs-info-label">{t("團隊成員")}</span>
            <span className="cs-info-value">
              {t("1位產品負責人")}
              <br />
              {t("1位UIUX設計師")}
              <br />
              {t("2位全端工程師")}
            </span>
          </div>
          <div className="cs-info-card">
            <span className="cs-info-label">{t("我的角色")}</span>
            <span className="cs-info-value">{t("產品設計師 · UI/UX")}</span>
          </div>
          <div className="cs-info-card">
            <span className="cs-info-label">{t("負責項目")}</span>
            <div className="cs-info-tasks">
              {heroTasks.map((item) => (
                <span key={item}>{t(item)}</span>
              ))}
            </div>
          </div>
          <div className="cs-info-card">
            <span className="cs-info-label">{t("使用軟體")}</span>
            <div className="cs-info-tasks">
              {["Figma", "FigJam", "Jira"].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
