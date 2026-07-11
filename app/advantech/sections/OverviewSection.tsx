import { CaseSection } from "../../../components/case-study";
import AlarmLevelDemo from "../components/AlarmLevelDemo";
import { getAdvantechTranslator } from "../i18n-server";

const overviewItems = [
  { label: "問題", text: "廠務人員需要從分散的監控資訊判讀異常；新進人員缺少經驗，資深人員也難以持續投入時間逐一交接。" },
  { label: "設計目標", text: "把預警、異常原因與處理建議串成容易理解的工作流程，協助使用者更快判斷下一步。" },
  { label: "解決方案", text: "為需量超約與設備能效兩種情境設計主動通知、分級資訊與 GenAI 分析流程。" },
  { label: "影響", text: "本案為未上線的實習提案；成果以 2.5 個月內三輪設計提案、內部評審與最終跨部門簡報作為質性證據。" },
  { label: "我的角色", text: "參與問題框架、競品研究與訪談整理，負責兩項功能的流程、介面與原型，並與 PM、工程師及利害關係人對齊。" },
] as const;

export default async function OverviewSection() {
  const { t } = await getAdvantechTranslator();
  return (
    <CaseSection
      id="cs-sec-overview"
      className="cs-overview"
      kicker={t("專案總覽")}
      title={t("讓廠務人員更快看懂異常，也知道下一步怎麼處理。")}
    >
      <div className="cs-overview-body cs-stack-box">
        <p className="cs-body">
          {t("我把複雜的能源監控資訊重新組織成可判讀、可採取行動的 GenAI 工作流程，而不只是替既有系統加上一個聊天視窗。")}
        </p>
      </div>

      <div className="cs-overview-tldr" role="list" aria-label={t("專案快速總覽")}>
        {overviewItems.map((item) => (
          <article key={item.label} className="cs-overview-tldr-item cs-stack-box" role="listitem">
            <p className="cs-overview-tldr-label cs-copy-title">{t(item.label)}</p>
            <p className="cs-overview-tldr-text cs-copy-body">{t(item.text)}</p>
          </article>
        ))}
      </div>

      <div className="cs-overview-prototype cs-stack-box">
        <div className="cs-overview-prototype-copy cs-stack-box">
          <p className="cs-overview-prototype-kicker cs-copy-title">{t("代表互動")}</p>
          <h3 className="cs-overview-prototype-title">{t("切換狀態，看看報警等級如何從標籤變成可判讀的時間資訊。")}</h3>
          <p className="cs-copy-body">{t("這個微互動代表整體設計策略：先揭露風險程度，再補上能支持判斷的情境資訊。")}</p>
        </div>
        <AlarmLevelDemo interactive tooltipLines={["嚴重：超約將於 1 小時內發生", "中度：超約將於 2 小時內發生", "低度：超約將於 3 小時內發生"]} />
      </div>
    </CaseSection>
  );
}
