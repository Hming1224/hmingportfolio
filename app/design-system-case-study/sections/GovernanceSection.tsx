import { CaseCard, CaseGrid, CaseSection } from "../../../components/case-study";
import TermNotes from "../components/TermNotes";
import { getDsTranslator } from "../i18n-server";

const decisionLog = [
  "專案標籤圓角固定 4px——不再每頁各自發揮。",
  "一個畫面原則上只放一顆 primary CTA——是 guideline 不是硬規則，但偏離要有理由。",
  "Dark mode：token 先備好、公開切換先不開——場景不足前，不增加維護面。",
  "StatusBadge 這類「還沒有真實使用場景」的元件，一律緩建。",
  "未上線的案子用 disabled 底色呈現，不做假連結騙點擊。",
  "文件目錄只列 production 真的在用的元件——文件站上線後，把 30 個項目全數稽核過一輪，確認每一項都對得上實際頁面。",
  "文件站本身也吃同一套規則：讀者看的內容和維護用的規則分開寫，文件也走一樣的 audit → 修正 → 驗收流程。",
];

export default async function GovernanceSection() {
  const { t } = await getDsTranslator();
  return (
    <CaseSection id="cs-sec-governance" kicker={t("GOVERNANCE")} title={t("Governance 與 AI 協作：讓流程可管理、可驗證")} surface>
      <p className="cs-section-lead">{t("規範如果只存在人腦裡，就很難被穩定執行。")}</p>
      <p className="cs-section-lead">{t("這套系統和一般做法比較不一樣的地方，是我把 AI 也當成需要被管理的協作者。相關規則最後整理成兩層文件，加上一份決策紀錄：")}</p>
      <CaseGrid variant="two" className="ds-case-card-grid">
        <CaseCard>
          <h3>{t("文件層——把規則寫成可執行的邊界")}</h3>
          <p>{t("10 份規格文件整理了 tokens、components、patterns、accessibility 與 governance。元件的職責邊界用 component contract 寫清楚：適合承載什麼內容、哪些行為不保證、遇到不明確情境時必須停下來確認。")}</p>
        </CaseCard>
        <CaseCard>
          <h3>{t("流程層——每張工單都有權限邊界")}</h3>
          <p>{t("AI-assisted implementation 一律走分段權限，每張任務都寫清楚「這一段只能做什麼、禁止做什麼」：audit 只看不改；implementation 不負責 commit；commit 只提交指定檔案；驗證通過後才 push。這樣可以避免修改範圍在過程中失控。")}</p>
        </CaseCard>
      </CaseGrid>
      <div className="ds-case-decision-log">
        <h3>{t("決策紀錄——做過的取捨，寫下來就不用重複討論")}</h3>
        <p>{t("所有標準化決策逐項整理後寫進治理文件，變成查得到的紀錄。摘幾條實際的：")}</p>
        <ol>{decisionLog.map((entry) => <li key={entry}>{t(entry)}</li>)}</ol>
      </div>
      <blockquote className="ds-case-quote">{t("把規則寫下來之後，每一次協作都不用重新解釋一遍脈絡——這是這些文件帶給我最實際的好處。")}</blockquote>
      <TermNotes
        title={t("名詞註釋")}
        ariaLabel={t("專有名詞註釋")}
        items={[
          { term: t("AI-assisted workflow"), description: t("這裡指由我設定目標、邊界和驗證條件，再讓 AI 協助盤點或執行部分任務的工作流程。") },
          { term: t("Feature branch"), description: t("Feature branch 是先把改動放在獨立分支驗證，避免直接影響正式站的版本。") },
          { term: t("Preview"), description: t("Preview 是合併到正式版本前的預覽環境，用來做最後的畫面和流程確認。") },
        ]}
      />
    </CaseSection>
  );
}
