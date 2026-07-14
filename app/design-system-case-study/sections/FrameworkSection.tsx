import { CaseSection } from "../../../components/case-study";
import TermNotes from "../components/TermNotes";
import { getDsTranslator } from "../i18n-server";

const frameworkRows = [
  ["顏色、間距、字級等值反覆出現", "先收斂成 design token，讓不同頁面共用同一組基礎規則，而不是急著抽 component。", "Design Tokens"],
  ["外框和排列方式重複，但內容每次不同", "只抽出穩定的外框，把內容區塊留給各頁替換，讓一致性和敘事彈性同時存在。", "Slot-based Composition"],
  ["兩個元件長得像，但用途容易混淆", "先寫清楚各自適合承載什麼內容、有哪些狀態、什麼情境下不該使用。", "Component Contract"],
  ["同樣結構和行為穩定重複出現", "等使用場景足夠明確，再抽成共用元件，避免太早把例外綁進核心 API。", "Componentization（Rule of Three）"],
  ["只服務某一頁的特定敘事", "刻意留在頁面本地，讓它貼近內容，不為了表面統一而增加共用層負擔。", "Local Component（colocation）"],
];

export default async function FrameworkSection() {
  const { t } = await getDsTranslator();
  return (
    <CaseSection id="cs-sec-framework" kicker={t("FRAMEWORK")} title={t("決策框架：什麼該抽象、什麼不該")} surface>
      <p className="cs-section-lead">{t("轉折二踩過的坑，後來被我整理成一條判斷路徑：不是所有長得像的東西都該共用。")}</p>
      <div className="ds-case-table-frame">
        <table className="ds-case-table">
          <thead><tr><th>{t("看到的訊號")}</th><th>{t("對應做法")}</th><th>{t("通用說法")}</th></tr></thead>
          <tbody>
            {frameworkRows.map(([signal, action, term]) => (
              <tr key={signal}>
                <th scope="row">{t(signal)}</th>
                <td>{t(action)}</td>
                <td><span className="ds-case-term-pill">{t(term)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <blockquote className="ds-case-quote">{t("重複的是「值」就 token 化；重複的是「殼」就留 slot；重複的是「整件事」才做成共用元件；只出現一次的，讓它留在原地。")}</blockquote>
      <TermNotes
        title={t("名詞註釋")}
        ariaLabel={t("專有名詞註釋")}
        items={[
          { term: t("Design tokens"), description: t("Design tokens 是把顏色、字級、間距等設計決策集中管理的變數，讓不同頁面能維持一致。") },
          { term: t("Component contract"), description: t("Component contract 指的是元件的使用規則，例如它適合承載什麼內容、有哪些狀態、什麼情境下不該使用。") },
          { term: t("Slot-based composition"), description: t("Slot-based composition 是讓元件保留固定結構，但開放部分內容區塊被替換，兼顧一致性與彈性。") },
          { term: t("Rule of three"), description: t("Rule of three 是一個實務判斷原則：同樣結構真的重複出現多次後，再考慮抽象成共用元件。") },
        ]}
      />
    </CaseSection>
  );
}
