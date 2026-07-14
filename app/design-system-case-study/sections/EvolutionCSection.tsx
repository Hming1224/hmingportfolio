import { CaseCard, CaseSection } from "../../../components/case-study";
import TermNotes from "../components/TermNotes";
import { getDsTranslator } from "../i18n-server";

const semanticRows = [
  ["Button", "在當下情境執行操作（command action）", "送出表單、複製 email、打開 lightbox"],
  ["Link", "帶使用者前往目的地（navigation action）", "去案例頁、回首頁、開外部 prototype"],
  ["LinkButton", "語意是 Link、視覺長得像 Button", "View case study、Next project"],
  ["CTA", "不是元件，是這一顆在畫面上的「角色」（usage role）", "Hero 主按鈕、卡片的 Learn More"],
];

export default async function EvolutionCSection() {
  const { t } = await getDsTranslator();
  return (
    <CaseSection id="cs-sec-evolution-c" kicker={t("EVOLUTION C")} title={t("演化實例 C：語意分不清時，先拆文件、不拆 code")}>
      <p className="cs-section-lead">{t("不是每個問題都要用「改 code」來解決。")}</p>
      <p className="cs-section-lead">{t("整理全站按鈕時，我卡在一個看起來很小的問題：")}</p>
      <p className="ds-case-question-callout">{t("「View case study」長得像按鈕，那它是 Button 嗎？")}</p>
      <p className="cs-section-lead">{t("全站有十幾個這種「像按鈕的東西」，不先分類清楚，之後 token 化和抽元件都會踩空。查證 W3C 與 Material Design 的相關定義後，我把它們拆成四個概念：")}</p>
      <div className="ds-case-table-frame">
        <table className="ds-case-table">
          <thead><tr><th>{t("概念")}</th><th>{t("是什麼")}</th><th>{t("例子")}</th></tr></thead>
          <tbody>
            {semanticRows.map(([term, meaning, examples]) => (
              <tr key={term}><th scope="row">{t(term)}</th><td>{t(meaning)}</td><td>{t(examples)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <CaseCard className="ds-case-narrative-card">
        <p>{t("為什麼要分這麼細？因為使用者對兩者的預期不同：link 可以右鍵開新分頁、複製網址；button 是觸發一個當下的操作。Screen reader 也會把兩者報讀成不同角色——語意用錯，輔助科技的使用者會對點擊結果有錯誤期待。")}</p>
        <p>{t("最後的決策是")}<b>{t("「文件拆、code 不拆」")}</b>{t("：在規格文件裡把 Button 和 LinkButton 的 contract 分開寫清楚；code 維持同一個 Button 元件（有 href 就 render 成連結）。因為現階段把 code 拆成兩個元件，只會製造一波 import 搬移和 regression 風險——語意的問題，用文件就能解決，就不要動 code。")}</p>
        <p>{t("這正是決策框架第三列「用途易混淆 → Component Contract」的實際案例：抽象不是只有「抽元件」一種形式，把契約寫清楚，本身就是一種系統化。")}</p>
      </CaseCard>
      <TermNotes
        title={t("名詞註釋")}
        ariaLabel={t("專有名詞註釋")}
        items={[
          { term: t("LinkButton"), description: t("LinkButton 是語意上帶使用者前往另一個位置、視覺上看起來像按鈕的連結。") },
          { term: t("Screen reader"), description: t("Screen reader 是協助視障使用者讀取畫面內容的輔助科技，會依照 HTML 語意報讀不同角色。") },
          { term: t("Component contract"), description: t("Component contract 指的是元件的使用規則，例如它適合承載什麼內容、有哪些狀態、什麼情境下不該使用。") },
        ]}
      />
    </CaseSection>
  );
}
