import { CaseCard, CaseGrid } from "../../../components/case-study";
import { LaushuHead } from "../components/LaushuPrimitives";
import { getLaushuTranslator } from "../i18n-server";

const reflections = [
  {
    title: "以替代研究策略推進流程驗證",
    body: "如果重新執行一次，我會在研究初期建立主要與替代受訪者名單，降低招募不順對研究進度的影響。當無法訪談核心利害關係人時，會改以協作角色訪談、非同步訪談或流程文件分析補足資訊缺口。\n\n設計策略上，會先將已掌握的會計人員流程定義為 MVP 假設，並透過第一版上線後的任務完成率、錯誤率與使用者回饋進行驗證。若初版成效不如預期，再依據實際使用情境推出 v2 上線版本，持續優化流程。",
  },
  {
    title: "介面用詞與說明，本身就是體驗",
    body: "勞報單牽涉稅率、申報類別、二代健保這些專業概念，使用者不見得懂。回頭看會發現很多次迭代其實都在「改用詞」和「補說明」，例如把不直覺的「所得人」換成看得懂的講法、在容易卡住的地方補一句解釋、把扣稅百分比直接標出來。這讓我體會到：介面文字本身就是體驗的一部分，把專業術語翻成使用者的語言，常常比多加一個功能更能降低操作門檻。",
  },
  {
    title: "從流程優化走向商業導入驗證",
    body: "若後續繼續推進，我會將重點從流程可用性延伸到商業導入驗證。Laushu 不只是勞務報酬單的線上化工具，更需要釐清誰是實際使用者、誰是導入決策者，以及系統能為公司降低多少行政與溝通成本。\n\n因此，下一步會補充訪談公司負責人、財務／人資主管與會計事務所，了解不同角色對導入工具的決策標準。同時將 UX 指標轉化為更具商業意義的成效指標，例如處理時間、錯誤率、來回確認次數與人力成本變化，進一步評估產品是否具備 B2B SaaS、按使用量計費，或作為會計事務所工具包的商業潛力。",
  },
];

export default async function ReflectionSection() {
  const { t } = await getLaushuTranslator();

  return (
    <section id="cs-sec-reflection" className="cs-section laushu-learning-section">
      <LaushuHead eyebrow={t("學習反思")} title={t("線下與線上整合的數位流程考驗")} />
      <CaseGrid variant="three" className="cs-reflection-grid">
        {reflections.map((r, index) => (
          <CaseCard variant="accent" className="cs-reflection-card" key={r.title}>
            <span className="cs-reflection-card-num">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="cs-reflection-card-title">{t(r.title)}</h3>
            <p>{t(r.body)}</p>
          </CaseCard>
        ))}
      </CaseGrid>
    </section>
  );
}
