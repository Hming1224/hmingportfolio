import { ArrowRight } from "lucide-react";
import { CaseSection } from "../../../components/case-study";
import { getDsTranslator } from "../i18n-server";

const frameworkRows = [
  {
    signal: "顏色、間距、字級等值反覆出現",
    reason: "如果只有設計值重複、元件結構各自不同，就共用規則，不抽元件。",
    term: "Design Tokens",
    action: "把這些值整理成 design token，統一管理數值與命名。",
    variant: "token",
    demo: "tokens",
  },
  {
    signal: "外框和排列方式重複，但內容每次不同",
    reason: "版面配置與響應式行為穩定重複，但每頁內容不同。",
    term: "Slot-based Composition",
    action: "抽出共用外框，文案、圖片與其他內容由各頁傳入。",
    variant: "shared",
    demo: "slot",
  },
  {
    signal: "兩個元件長得像，但用途容易混淆",
    reason: "外觀相似不代表用途相同。用途還分不清時，先釐清彼此的使用邊界，不急著共用。",
    term: "Component Contract",
    action: "把可承載的內容、支援狀態與不適用情境寫成 Component Contract。",
    variant: "shared",
    demo: "contract",
  },
  {
    signal: "同樣結構和行為穩定重複出現",
    reason: "結構、用途、互動一起重複，未來多半也要一起改。",
    term: "Componentization（Rule of Three）",
    action: "等使用場景夠明確再抽成共用元件，避免太早把例外綁進核心 API。",
    variant: "shared",
    demo: "rule",
  },
  {
    signal: "只服務某一頁的特定敘事",
    reason: "只有外觀像、或只出現一次，硬共用反而讓共用層揹例外。",
    term: "Local Component（colocation）",
    action: "沿用基礎 token 與外框，特殊內容留在該頁。",
    variant: "local",
    demo: "local",
  },
] as const;

function FrameworkDemo({ kind, t }: { kind: string; t: (key: string) => string }) {
  switch (kind) {
    case "tokens":
      return (
        <>
          <span className="ds-case-tree-demo__swatches">
            <span /><span /><span /><span />
          </span>
          <span className="ds-case-tree-demo__bars">
            <span /><span /><span />
          </span>
          <span className="ds-case-tree-demo__type">
            <span>Aa</span><span>Aa</span>
          </span>
        </>
      );
    case "slot":
      return (
        <span className="ds-case-tree-demo__frame">
          <span className="ds-case-tree-demo__slot">{t("內容")}</span>
        </span>
      );
    case "contract":
      return (
        <span className="ds-case-tree-demo__cards">
          <span className="ds-case-tree-demo__mini ds-case-tree-demo__mini--a"><span>✓</span></span>
          <span className="ds-case-tree-demo__mini ds-case-tree-demo__mini--b"><span>✕</span></span>
        </span>
      );
    case "rule":
      return (
        <span className="ds-case-tree-demo__rule">
          <span className="ds-case-tree-demo__tile">1</span>
          <span className="ds-case-tree-demo__tile">2</span>
          <span className="ds-case-tree-demo__tile">3</span>
          <span className="ds-case-tree-demo__rule-arrow">→</span>
          <span className="ds-case-tree-demo__rule-out" />
        </span>
      );
    case "local":
      return (
        <span className="ds-case-tree-demo__pinned">
          <span className="ds-case-tree-demo__tag">{t("單頁")}</span>
        </span>
      );
    default:
      return null;
  }
}

export default async function FrameworkSection() {
  const { t } = await getDsTranslator();
  return (
    <CaseSection
      id="cs-sec-framework"
      kicker={t("判斷框架")}
      title={t("先看重複的是什麼，再決定要不要共用")}
      surface
    >
      <p className="cs-section-lead">
        {t("前面的實作過程裡，我反覆遇到同一個問題：眼前這個東西到底該不該共用？後來我把判斷方式整理成一條路徑，每次看到跨頁重複的模式，就照著檢查一次。")}
      </p>
      <div className="ds-case-decision-tree">
        <div className="ds-case-decision-tree__root">
          <span>{t("起點")}</span>
          <h3>{t("一個跨頁重複出現的模式")}</h3>
          <p>{t("先問一件事：重複的是「值」、「殼」，還是「整件事」？")}</p>
        </div>

        {frameworkRows.map((row) => (
          <div className="ds-case-decision-tree__row" key={row.term}>
            <div className="ds-case-decision-tree__condition">
              <span>{t("看到的現象")}</span>
              <strong>{t(row.signal)}</strong>
              <p>{t(row.reason)}</p>
            </div>
            <ArrowRight className="ds-case-decision-tree__arrow" size={24} strokeWidth={1.5} aria-hidden="true" />
            <div className={`ds-case-decision-tree__outcome ds-case-decision-tree__outcome--${row.variant}`}>
              <div className="ds-case-decision-tree__result">
                <span className={`ds-case-term-pill ds-case-term-pill--${row.variant}`}>{t(row.term)}</span>
                <strong>{t(row.action)}</strong>
              </div>
              <div className={`ds-case-decision-tree__demo ds-case-decision-tree__demo--${row.demo}`} aria-hidden="true">
                <FrameworkDemo kind={row.demo} t={t} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <blockquote className="ds-case-decision-tree__takeaway">
        {t("最後我留下四條規則：值重複就整理成 token；外框重複就保留 slot；結構、用途與互動一起重複，才抽成共用元件；只服務單一頁面的內容，就留在該頁。接下來三個案例，分別對應這幾種判斷。")}
      </blockquote>

    </CaseSection>
  );
}
