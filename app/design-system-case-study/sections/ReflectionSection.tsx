import { CaseCard, CaseGrid, CaseSection } from "../../../components/case-study";
import Button from "../../../components/ui/Button";
import { getDsTranslator } from "../i18n-server";

const reflections = [
  {
    title: "先診斷，再動手，比一次規劃到位更重要",
    body: "第一版雛形和完整計劃書都無法保證執行安全。專案後來能穩定下來，是因為我把「診斷」和「動手」拆開：先 audit，再 implementation。順序比計劃書寫得多完整更重要。",
  },
  {
    title: "AI 協作的重點是邊界和驗證",
    body: "這次經驗沒有讓我少用 AI，而是讓我更清楚地把 AI 放在可管理的流程裡。AI 可以協助盤點和執行，但任務邊界、驗證條件和 rollback 節點必須由我先設計好。",
  },
  {
    title: "語彙要能被共同理解",
    body: "我一開始自己發明了幾個詞，例如把外框元件叫 shell；後來逐一查證，改成設計與工程更常使用的說法。自創詞會增加溝通成本，換成彼此熟悉的語彙後，和工程師討論也更順。",
  },
  {
    title: "把「搞懂」寫下來，才算真的懂",
    body: "每釐清一個概念——token 和 alias 差在哪、Button 和 LinkButton 為什麼要分——我都整理成規格或筆記。寫不出來，通常代表自己還沒有真的想清楚。",
  },
];

export default async function ReflectionSection() {
  const { t } = await getDsTranslator();
  return (
    <CaseSection id="cs-sec-reflection" kicker={t("REFLECTION")} title={t("學到什麼")} surface>
      <p className="cs-section-lead">{t("回頭看，這個專案讓我收穫最多的，是那三次轉折的過程，而不只是最後的系統。")}</p>
      <CaseGrid variant="two" className="ds-case-card-grid">
        {reflections.map((item, index) => (
          <CaseCard className="ds-case-reflection-card" key={item.title}>
            <span className="ds-case-reflection-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <h3>{t(item.title)}</h3>
            <p>{t(item.body)}</p>
          </CaseCard>
        ))}
      </CaseGrid>
      <div className="ds-case-design-system-cta">
        <div>
          <h3>{t("查看實作後的 Design System 文件")}</h3>
          <p>{t("這套規則最後整理成可瀏覽的文件頁，包含 tokens、components、patterns 與 governance。")}</p>
        </div>
        <Button className="ds-case-design-system-cta__button" href="/design-system">{t("前往 Design System")}</Button>
      </div>
    </CaseSection>
  );
}
