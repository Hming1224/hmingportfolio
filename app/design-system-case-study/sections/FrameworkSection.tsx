import { ArrowRight } from "lucide-react";
import { CaseSection } from "../../../components/case-study";
import TermNotes from "../components/TermNotes";
import { getDsTranslator } from "../i18n-server";

const frameworkRows = [
  {
    signal: "只有值重複：顏色、間距、字級跨頁一致",
    action: "集中管理數值與命名，不改元件結構",
    result: "Design Token",
    example: "顏色／間距／字級",
    variant: "token",
  },
  {
    signal: "結構、用途、互動穩定重複，未來通常要一起變",
    action: "先定義 API、狀態與限制，再整理共用實作",
    result: "Shared Component",
    example: "Before / After 外框",
    variant: "shared",
  },
  {
    signal: "只服務單一案例，或只有外觀像",
    action: "沿用基礎 token 與外框，特殊內容留在該頁",
    result: "Route-local",
    example: "反思卡單頁敘事",
    variant: "local",
  },
] as const;

export default async function FrameworkSection() {
  const { t } = await getDsTranslator();
  return (
    <CaseSection
      id="cs-sec-framework"
      kicker={t("判斷框架")}
      title={t("先判斷用途與風險，再決定共用或保留單頁彈性")}
      surface
    >
      <p className="cs-section-lead">
        {t("AI 能快速找出重複，但一個模式該進 token、共用元件，還是留在單頁，取決於它的語意、使用情境與未來變動——這張圖就是我判斷放哪的依據。")}
      </p>

      <div className="ds-case-decision-tree">
        <div className="ds-case-decision-tree__root">
          <span>{t("起點")}</span>
          <h3>{t("一個跨頁重複出現的模式")}</h3>
          <p>{t("先問兩件事：重複的是值還是結構？用途與未來變動一致嗎？")}</p>
        </div>

        {frameworkRows.map((row) => (
          <div className="ds-case-decision-tree__row" key={row.result}>
            <div className="ds-case-decision-tree__condition">
              <span>{t("看到的現象")}</span>
              <p>{t(row.signal)}</p>
              <small>{t(`怎麼做：${row.action}`)}</small>
            </div>
            <ArrowRight className="ds-case-decision-tree__arrow" size={24} strokeWidth={1.5} aria-hidden="true" />
            <div className={`ds-case-decision-tree__result ds-case-decision-tree__result--${row.variant}`}>
              <span className={`ds-case-term-pill ds-case-term-pill--${row.variant}`}>{t(row.result)}</span>
              <strong>{t(row.action)}</strong>
              <small>{t(`例：${row.example}`)}</small>
            </div>
          </div>
        ))}
      </div>

      <TermNotes
        title={t("名詞說明")}
        ariaLabel={t("這一段的名詞說明")}
        items={[
          { term: "Design Token", description: t("集中管理設計值（design tokens）：把顏色、字級、間距等設定放在同一處，讓不同頁面沿用相同規則。") },
          { term: "Shared Component", description: t("Shared Component 是結構、用途與互動都穩定重複時，由多個頁面共用的元件實作。") },
          { term: "route-local", description: t("Route-local 是只服務單一頁面的樣式或結構，不會被抽成全站共用規則。") },
          { term: "component API", description: t("Component API 是元件對外提供的使用方式，包括可傳入的內容、狀態與限制。") },
        ]}
      />
    </CaseSection>
  );
}
