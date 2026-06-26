import Image from "next/image";
import { CaseCard, CaseGrid, CaseMedia, CaseSection } from "../../../components/case-study";
import { getAdvantechTranslator } from "../i18n-server";

export default async function ProductBackgroundSection() {
  const { t } = await getAdvantechTranslator();
  return (
    <CaseSection id="cs-sec-background" surface title={t("認識 ECOWatch 與 HVAC 模組")}>
      <p className="cs-body-muted" style={{ marginBottom: 32 }}>
        {t("本專案的設計對象為研華科技 WISE-IoT 平台下的兩大能源管理模組。ECOWatch 負責建築能源用量的即時可視化監控；WISE iEMS HVAC 模組則整合 AI 演算法主動優化空調系統能效。兩者共同構成智慧設施管理的核心解決方案，也是本次 AI Chatbot 設計用於整合各項功能的系統。")}
      </p>
      <CaseGrid variant="two" className="cs-product-grid">
        <CaseCard variant="accent" className="cs-product-card">
          <div className="cs-product-card-header cs-flex-cluster">
            <div className="cs-product-logo cs-object-box">
              <Image src="/projects/advantech/research/ecowatch-icon.webp" alt="ECOWatch" fill style={{ objectFit: "cover" }} unoptimized />
            </div>
            <h3 className="cs-product-card-name cs-copy-title">ECOWatch</h3>
          </div>
          <div className="cs-product-card-divider" />
          <p className="cs-product-card-body cs-copy-body">
            {t("監控建築內水、電、氣、熱等公共資源的即時用量，整合子計量、能耗分析、即時告警與自動報表功能，協助設施管理者全面掌握能源消耗狀況。平均可達 3–10% 的節能成效，節省 80% 的人工巡查時間。")}
          </p>
          <div className="cs-product-tags cs-flex-cluster">
            {["能耗監控", "即時告警", "子計量", "自動報表"].map((tag) => (
              <span key={tag} className="cs-product-tag cs-inline-pill">{t(tag)}</span>
            ))}
          </div>
          <CaseMedia className="cs-product-media" contentClassName="cs-product-screen cs-object-box">
            <Image
              src="/projects/advantech/research/ecowatch-screen.webp"
              alt={t("ECOWatch 系統截圖")}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              unoptimized
            />
          </CaseMedia>
        </CaseCard>

        <CaseCard variant="accent" className="cs-product-card">
          <div className="cs-product-card-header cs-flex-cluster">
            <div className="cs-product-logo cs-object-box">
              <Image src="/projects/advantech/research/hvac-icon.webp" alt="HVAC" fill style={{ objectFit: "cover" }} unoptimized />
            </div>
            <h3 className="cs-product-card-name cs-copy-title">HVAC</h3>
          </div>
          <div className="cs-product-card-divider" />
          <p className="cs-product-card-body cs-copy-body">
            {t("整合 AI 演算法、IoT 感測與數位孿生技術，對 HVAC（暖通空調）設備進行即時效能監控與異常偵測，透過多維度分析主動化設備運行策略，達到節能降本的目標。")}
          </p>
          <div className="cs-product-tags cs-flex-cluster">
            {["AI 優化", "異常偵測", "能效診斷", "策略優化"].map((tag) => (
              <span key={tag} className="cs-product-tag cs-inline-pill">{t(tag)}</span>
            ))}
          </div>
          <CaseMedia className="cs-product-media" contentClassName="cs-product-screen cs-object-box">
            <Image
              src="/projects/advantech/research/hvac-screen.webp"
              alt={t("HVAC 系統截圖")}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              unoptimized
            />
          </CaseMedia>
        </CaseCard>
      </CaseGrid>
    </CaseSection>
  );
}
