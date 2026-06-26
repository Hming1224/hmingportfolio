import Image from "next/image";
import { CaseSection } from "../../../components/case-study";
import { getAdvantechTranslator } from "../i18n-server";

export default async function OverviewSection() {
  const { t } = await getAdvantechTranslator();
  return (
    <CaseSection id="cs-sec-overview" title={t("專案背景")}>
      <div className="cs-overview-body cs-stack-box">
        <p className="cs-body">
          {t("這個專案聚焦於透過 UX/UI 設計優化 ECOWatch 與 HVAC 的 AI Chatbot 體驗，以改善使用者操作流程並提升整體可用性。")}
        </p>
        <p className="cs-body-muted">
          {t("透過競品研究與終端使用者訪談，我們挖掘出關鍵的市場需求與使用者痛點，進一步作為聊天機器人介面設計方向的依據。設計過程中並非只是單純加入 AI 功能，而是更著重於思考生成式 AI 如何更有效地支援實際的設施管理任務。透過與後端工程師密切合作，我們將這些洞察轉化為更流暢、高效且友善的互動體驗。")}
        </p>
      </div>
      <div className="cs-overview-img cs-object-box">
        <Image
          src="/projects/advantech/research/overview-bg.webp"
          alt={t("WISE-iEMS 系統介面與 AI Chatbot 概覽")}
          fill
          style={{ objectFit: "cover" }}
          unoptimized
        />
      </div>
    </CaseSection>
  );
}
