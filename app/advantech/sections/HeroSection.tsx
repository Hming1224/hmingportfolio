import Image from "next/image";
import { getAdvantechTranslator } from "../i18n-server";

export default async function HeroSection() {
  const { t } = await getAdvantechTranslator();
  return (
    <section>
        <div className="cs-hero-cover">
          <div className="cs-hero-cover-img">
            <Image
              src="/projects/advantech/cover/hero-cover.webp"
              alt="WISE-iEMS ECOWatch UI"
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
              unoptimized
            />
          </div>
        </div>

        <div className="cs-hero-info">
          <div className="cs-hero-meta">
            <span className="cs-badge">Early Design Project</span>
            <span className="cs-tags">WEB・B2B・AI Chatbot・UX Design・UI Design</span>
          </div>
          <h1 className="cs-title">
            {t("以生成式 AI 聊天機器人驅動智慧能源與空調維運系統介面設計")}
          </h1>
          <div className="cs-info-row">
            <div className="cs-info-card">
              <span className="cs-info-label">{t("時間進程")}</span>
              <span className="cs-info-value">2024.06 – 2024.08</span>
            </div>
            <div className="cs-info-card">
              <span className="cs-info-label">{t("團隊成員")}</span>
              <span className="cs-info-value">
                {t("2 位設計師")}
                <br />
                {t("2 位後端工程師")}
                <br />
                {t("1 位 PM")}
              </span>
            </div>
            <div className="cs-info-card">
              <span className="cs-info-label">{t("我的角色")}</span>
              <span className="cs-info-value">{t("UIUX 設計師")}</span>
            </div>
            <div className="cs-info-card">
              <span className="cs-info-label">{t("負責項目")}</span>
              <span className="cs-info-value">
                {t("競品分析")}
                <br />
                {t("終端使用者訪談")}
                <br />
                {t("線框稿")}
                <br />
                {t("原型設計")}
                <br />
                {t("產品行銷影片")}
              </span>
            </div>
            <div className="cs-info-card">
              <span className="cs-info-label">{t("使用軟體")}</span>
              <span className="cs-info-value">
                Figma
                <br />
                FigJam
                <br />
                Canva
                <br />
                Screen studio
                <br />
                Adobe After Effects
              </span>
            </div>
          </div>
        </div>
      </section>
  );
}
