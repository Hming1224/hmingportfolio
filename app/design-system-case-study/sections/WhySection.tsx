import { CaseSection } from "../../../components/case-study";
import { getDsTranslator } from "../i18n-server";

const overviewGroups = [
  {
    kind: "problem",
    label: "專案",
    title: "把持續成長的作品集，整理成可長期維護的產品系統。",
    dotted: false,
    details: [
      { label: "起點", text: "作品集先以完成內容與頁面為主，讓案例可以快速成形並公開展示。" },
      { label: "範圍", text: "以四個既有案例頁為範圍，整理設計規則、共用版型、文件與檢查方式。" },
      { label: "目標", text: "讓 code、文件與協作者使用同一套規則，同時保留每個案例需要的敘事差異。" },
    ],
  },
  {
    kind: "goal",
    label: "責任分工",
    title: "我負責定義方向、做出判斷並驗收結果；AI 協助分析、實作與驗證。",
    dotted: false,
    details: [
      { label: "我的責任", text: "定義問題、設計原則、元件邊界、修改範圍、方案取捨與驗收標準。" },
      { label: "AI 協助", text: "搜尋程式與樣式、比較重複模式、依照已確認規格實作、測試與除錯。" },
      { label: "品質責任", text: "自動檢查通過後，我仍會確認跨頁版面、互動與案例差異是否符合原本設計意圖。" },
    ],
  },
  {
    kind: "impact",
    label: "具體產出",
    title: "設計規則、共用元件、文件與檢查流程形成同一套維護依據。",
    dotted: true,
    details: [
      { label: "四個案例頁", text: "四個既有案例頁開始依循集中管理的設計規則與共用案例元件。" },
      { label: "元件邊界", text: "重複且用途穩定的模式整理成共用元件；案例限定的敘事保留在 route-local。" },
      { label: "文件與檢查", text: "規格文件對應實際程式，並搭配自動檢查與人工視覺驗收。" },
    ],
  },
] as const;

export default async function WhySection() {
  const { t } = await getDsTranslator();

  return (
    <CaseSection
      id="cs-sec-overview"
      kicker={t("專案總覽")}
      title={t("用 Design System 管理作品集，也用明確分工控制 AI 協作品質")}
      surface
    >
      <p className="cs-section-lead">
        {t("這是一個持續迭代的自發專案。除了整理樣式，也建立人與 AI 都能依循、驗證與回溯的維護方式。")}
      </p>
      <div className="ds-case-overview-grid">
        {overviewGroups.map((group) => (
          <div className="ds-case-overview-col" key={group.kind}>
            <span className="ds-case-overview-col__label">{t(group.label)}</span>
            <h3 className="ds-case-overview-col__statement">{t(group.title)}</h3>
            <dl className="ds-case-overview-col__list">
              {group.details.map((detail) => (
                <div
                  className={
                    group.dotted
                      ? "ds-case-overview-detail ds-case-overview-detail--dot"
                      : "ds-case-overview-detail"
                  }
                  key={detail.label}
                >
                  <dt>{t(detail.label)}</dt>
                  <dd>{t(detail.text)}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </CaseSection>
  );
}
