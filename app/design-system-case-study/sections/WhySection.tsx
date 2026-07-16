import { CaseOverview } from "../../../components/case-study";
import Button from "../../../components/ui/Button";
import { getDsTranslator } from "../i18n-server";

type OverviewDetail = {
  label: string;
  text: string;
  note?: string;
  icon: "question" | "validation" | "humanAvatar" | "aiAvatar" | "warning" | "decision" | "quality";
  variant: "default" | "highlight";
};

type OverviewItem = {
  kind: "problem" | "goal" | "impact";
  label: string;
  title: string;
  details: readonly OverviewDetail[];
};

const overviewItems: readonly OverviewItem[] = [
  {
    kind: "problem",
    label: "專案",
    title: "把持續成長的作品集，整理成可長期維護的產品系統。",
    details: [
      {
        label: "起點",
        text: "網站一開始先求快速上線，設計規則散落在各頁 CSS；頁面一多，任何微調都變成重複修改。",
        icon: "question",
        variant: "default",
      },
      {
        label: "三次轉折",
        text: "文件脫節、大範圍修改跑版、流程混雜——三次真實問題，逼我把「該不該共用」整理成一條判斷路徑。",
        note: "完整過程在下方「三次轉折」與「判斷框架」",
        icon: "warning",
        variant: "default",
      },
      {
        label: "三種決定",
        text: "同一套判斷走進三個案例，得到三種不同決定；其中一次盤點了 8 個共用候選，結論是一個都不抽。",
        note: "三個案例的取捨在下方「三個演化案例」",
        icon: "decision",
        variant: "highlight",
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
        icon: "humanAvatar",
        variant: "default",
      },
      {
        label: "AI 協助",
        text: "先盤點使用位置和重複模式，這一步不動程式；規格確認後再分批實作，每批只處理一個明確範圍。",
        icon: "aiAvatar",
        variant: "default",
      },
      {
        label: "品質閘門",
        text: "自動檢查守住技術正確，設計意圖由我人工驗收——未經人工驗收，不 push、merge 或 deploy。",
        note: "四步驟流程在下方「治理與驗證」",
        icon: "quality",
        variant: "highlight",
      },
    ],
  },
  {
    kind: "impact",
    label: "具體產出",
    title: "307 個 design token、21 個共用元件、3 支自動檢查，四個案例頁從此沿用同一套依據。",
    details: [
      {
        label: "307 個 design token",
        text: "色彩、字級、間距、圓角與元件狀態都有名字、集中管理，改一個值就全站生效。",
        icon: "validation",
        variant: "default",
      },
      {
        label: "21 個共用 case-study 元件",
        text: "只收結構、用途、行為都穩定重複的模式；只服務單一敘事的版型，刻意留在該頁。",
        icon: "validation",
        variant: "highlight",
      },
      {
        label: "3 支自動檢查腳本",
        text: "token 使用、素材連結與樣式範圍都有對應腳本檢查，在 commit 前先攔下明顯錯誤。",
        note: "數字明細在下方「最終成果」",
        icon: "validation",
        variant: "default",
      },
    ],
  },
];

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
          note: detail.note ? t(detail.note) : undefined,
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
