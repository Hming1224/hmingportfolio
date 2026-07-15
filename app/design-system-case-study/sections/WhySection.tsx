import { CaseOverview } from "../../../components/case-study";
import { getDsTranslator } from "../i18n-server";

const overviewItems = [
  {
    kind: "problem",
    label: "專案",
    title: "把持續成長的作品集，整理成可長期維護的產品系統。",
    details: [
      {
        label: "起點",
        text: "作品集先以完成內容與頁面為主，讓案例可以快速成形並公開展示。",
        icon: "question",
        variant: "default",
      },
      {
        label: "範圍",
        text: "以四個既有案例頁為範圍，整理設計規則、共用版型、文件與檢查方式。",
        icon: "question",
        variant: "default",
      },
      {
        label: "目標",
        text: "讓 code、文件與協作者使用同一套規則，同時保留每個案例需要的敘事差異。",
        icon: "question",
        variant: "default",
      },
    ],
  },
  {
    kind: "goal",
    label: "責任分工",
    title: "我負責定義方向、做出判斷並驗收結果；AI 協助分析、實作與驗證。",
    details: [
      {
        label: "我的責任",
        text: "定義問題、設計原則、元件邊界、修改範圍、方案取捨與驗收標準。",
        icon: "user",
        variant: "default",
      },
      {
        label: "AI 協助",
        text: "搜尋程式與樣式、比較重複模式、依照已確認規格實作、測試與除錯。",
        icon: "hypothesis",
        variant: "default",
      },
      {
        label: "品質責任",
        text: "自動檢查通過後，我仍會確認跨頁版面、互動與案例差異是否符合原本設計意圖。",
        icon: "validation",
        variant: "default",
      },
    ],
  },
  {
    kind: "impact",
    label: "具體產出",
    title: "設計規則、共用元件、文件與檢查流程形成同一套維護依據。",
    details: [
      {
        label: "四個案例頁",
        text: "四個既有案例頁開始依循集中管理的設計規則與共用案例元件。",
        icon: "validation",
        variant: "default",
      },
      {
        label: "元件邊界",
        text: "重複且用途穩定的模式整理成共用元件；案例限定的敘事保留在 route-local。",
        icon: "validation",
        variant: "default",
      },
      {
        label: "文件與檢查",
        text: "規格文件對應實際程式，並搭配自動檢查與人工視覺驗收。",
        icon: "validation",
        variant: "default",
      },
    ],
  },
] as const;

export default async function WhySection() {
  const { t } = await getDsTranslator();

  return (
    <CaseOverview
      id="cs-sec-overview"
      kicker={t("專案總覽")}
      title={t("用 Design System 管理作品集，也用明確分工控制 AI 協作品質")}
      lead={t("這是一個持續迭代的自發專案。除了整理樣式，也建立人與 AI 都能依循、驗證與回溯的維護方式。")}
      items={overviewItems.map((item) => ({
        kind: item.kind,
        label: t(item.label),
        title: t(item.title),
        details: item.details.map((detail) => ({
          label: t(detail.label),
          text: t(detail.text),
          icon: detail.icon,
          variant: detail.variant,
        })),
      }))}
      itemsLabel={t("專案快速總覽")}
    />
  );
}
