import Image from "next/image";
import { CaseCard, CaseMedia, CaseSection } from "../../../components/case-study";
import TermNotes from "../components/TermNotes";
import { ASSET } from "../data";
import { getDsTranslator } from "../i18n-server";

export default async function StartingPointSection() {
  const { t } = await getDsTranslator();
  return (
    <CaseSection
      id="cs-sec-starting-point"
      kicker={t("STARTING POINT")}
      title={t("起點：參考成熟系統，用 Figma Make 做第一版")}
      surface
    >
      <p className="cs-section-lead">
        {t("我沒有從零開始，而是先研究成熟系統怎麼整理規則、元件和文件。")}
      </p>
      <CaseCard className="ds-case-narrative-card">
        <p>
          {t("我拿 ")}<b>{t("Ant Design")}</b>{t(" 和 ")}<b>{t("Google Material Design")}</b>{t(" 當基準，逐項對照自己的網站做 ")}<b>{t("gap analysis")}</b>{t("：顏色有沒有分層？間距、圓角、字級有沒有規則？元件狀態（hover / focus / disabled）齊不齊？盤點下來列出了十幾個缺口。")}
        </p>
        <p>
          {t("接著，我用 ")}<b>{t("Figma Make")}</b>{t(" 把第一版系統規劃做成三頁互動雛形：系統介紹、缺口清單和升級計畫。原本腦中模糊的「想要一套系統」，這時終於變成看得見、可以討論的介面。")}
        </p>
        <p>
          {t("當時我還沒處理一個關鍵問題：")}<b>{t("規劃和 code 仍是兩套東西。雛形畫得再完整，也不代表網站真的照它運作。")}</b>
        </p>
      </CaseCard>
      <CaseMedia
        className="ds-case-media"
        caption={t("Figma Make 第一版互動雛形：先把 design system 的方向變成可以討論的介面。")}
      >
        <Image
          src={`${ASSET}/research/figma-make-prototype.webp`}
          alt={t("Figma Make prototype screenshot for Hming Design System.")}
          width={1440}
          height={960}
          sizes="(max-width: 768px) calc(100vw - 48px), calc(100vw - 96px)"
        />
      </CaseMedia>
      <TermNotes
        title={t("名詞註釋")}
        ariaLabel={t("專有名詞註釋")}
        items={[
          { term: t("Gap analysis"), description: t("Gap analysis 是把現況和目標標準放在一起比對，找出缺口和優先改善項目。") },
          { term: t("Figma Make"), description: t("Figma Make 是用來快速產生互動雛形的工具，這裡用來把系統規劃先做成可討論的介面。") },
        ]}
      />
    </CaseSection>
  );
}
