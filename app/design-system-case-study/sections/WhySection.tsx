import { CaseOverview } from "../../../components/case-study";
import Button from "../../../components/ui/Button";
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
    title: "設計決策由我負責，AI 則協助盤點程式、實作和檢查。",
    details: [
      {
        label: "我的責任",
        text: "定義問題、設計原則、元件邊界、修改範圍、方案取捨與驗收標準。",
        icon: "user",
        variant: "default",
      },
      {
        label: "AI 協助",
        text: "盤點程式與樣式，找出重複模式，再依照已確認的規格實作、測試和除錯。",
        icon: "hypothesis",
        variant: "default",
      },
      {
        label: "品質責任",
        text: "自動檢查通過後，我會再看一次跨頁版面、互動和案例差異，確認沒有偏離原本的設計意圖。",
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
        text: "重複且用途穩定的模式整理成共用元件；只服務單一案例的敘事版型，仍留在該案例頁。",
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
      title={t("用 Design System 管理作品集，也把我與 AI 的分工寫清楚")}
      lead={t("這次不只整理樣式，也把修改範圍、分工和檢查方式寫清楚，讓我和 AI 能在同一套規則下協作。")}
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
      showcase={(
        <div className="ds-case-design-system-cta">
          <div>
            <h3>{t("查看實作後的 Design System 文件")}</h3>
            <p>{t("我也把這套規則整理成可瀏覽的文件頁，內容直接對應網站正在使用的設計基礎、tokens、元件、版型和治理方式。")}</p>
          </div>
          <Button className="ds-case-design-system-cta__button" href="/design-system">
            {t("前往 Design System")}
          </Button>
        </div>
      )}
    />
  );
}
