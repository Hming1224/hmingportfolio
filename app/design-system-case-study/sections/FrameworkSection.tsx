import { ArrowRight } from "lucide-react";
import { CaseSection } from "../../../components/case-study";
import TermNotes from "../components/TermNotes";
import { getDsTranslator } from "../i18n-server";

const frameworkRows = [
  {
    signal: "顏色、間距、字級等值反覆出現",
    reason: "重複的只是設計值，元件結構各自不同——該共用的是規則，不是元件。",
    term: "Design Tokens",
    action: "先收斂成 design token，集中管理數值與命名。",
    variant: "token",
    demo: "tokens",
  },
  {
    signal: "外框和排列方式重複，但內容每次不同",
    reason: "重複的是「殼」：版面與響應式行為穩定，內容要留給各頁發揮。",
    term: "Slot-based Composition",
    action: "只抽出穩定外框，內容區塊留給各頁替換。",
    variant: "shared",
    demo: "slot",
  },
  {
    signal: "兩個元件長得像，但用途容易混淆",
    reason: "外觀相似不代表用途相同，先分清楚彼此的邊界，再談要不要共用。",
    term: "Component Contract",
    action: "先寫清楚各自適合承載什麼內容、有哪些狀態、什麼情境下不該使用。",
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
        {t("這幾個轉折裡，最常讓我猶豫的都是同一件事：眼前這個東西到底該不該共用。與其每次憑感覺決定，我後來把它整理成一條判斷路徑，遇到重複的東西就照著走一遍。")}
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
            <div className={`ds-case-decision-tree__result ds-case-decision-tree__result--${row.variant}`}>
              <span className={`ds-case-term-pill ds-case-term-pill--${row.variant}`}>{t(row.term)}</span>
              <strong>{t(row.action)}</strong>
            </div>
            <div className={`ds-case-decision-tree__demo ds-case-decision-tree__demo--${row.demo}`} aria-hidden="true">
              <FrameworkDemo kind={row.demo} t={t} />
            </div>
          </div>
        ))}
      </div>

      <blockquote className="ds-case-decision-tree__takeaway">
        {t("重複的是「值」就 token 化；重複的是「殼」就留 slot；重複的是「整件事」才做成共用元件；只出現一次的，讓它留在原地。")}
      </blockquote>

      <TermNotes
        title={t("名詞說明")}
        ariaLabel={t("這一段的名詞說明")}
        items={[
          { term: "Design Token", description: t("有名稱、可重複引用的設計值。") },
          {
            term: "Slot-based Composition",
            description: t("固定外框、內容可替換的組合方式，兼顧一致性與各頁彈性。"),
          },
          {
            term: "Component Contract",
            description: t("元件的使用規則：適合承載什麼內容、有哪些狀態、什麼情境不該使用。"),
          },
          {
            term: "Rule of Three",
            description: t("實務判斷原則：同樣結構重複出現三次左右，再抽成共用元件。"),
          },
          { term: "route-local", description: t("只存在特定頁面的樣式或結構。") },
        ]}
      />
    </CaseSection>
  );
}
