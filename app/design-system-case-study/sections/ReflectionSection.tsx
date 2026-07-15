import { CaseSection } from "../../../components/case-study";
import Button from "../../../components/ui/Button";
import { getDsTranslator } from "../i18n-server";

const reflections = [
  {
    title: "共用不是越多越好",
    body: "AI 能快速找出相似模式，但只有用途、內容模型與未來變動方式都穩定時，整理成共用元件才真正降低維護成本。",
  },
  {
    title: "規則必須能被程式與協作者執行",
    body: "Design Token、component contract 與決策紀錄不能只停留在說明文件，還要對應實際程式與可檢查的使用方式。",
  },
  {
    title: "驗證流程也是 Design System 的一部分",
    body: "穩定品質來自有限範圍、自動檢查、人工驗收與可回溯版本，不依賴單次生成結果。",
  },
];

export default async function ReflectionSection() {
  const { t } = await getDsTranslator();
  return (
    <CaseSection
      id="cs-sec-reflection"
      kicker={t("學習反思")}
      title={t("穩定品質來自清楚邊界與驗證流程，不是更多共用元件")}
      surface
    >
      <p className="cs-section-lead">
        {t("AI 適合大量搜尋、比較、實作與驗證；設計語意、元件邊界與最終品質仍需要人的判斷。")}
      </p>
      <ol className="ds-case-reflection-list">
        {reflections.map((item, index) => (
          <li key={item.title}>
            <span className="ds-case-reflection-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div><h3>{t(item.title)}</h3><p>{t(item.body)}</p></div>
          </li>
        ))}
      </ol>
      <p className="ds-case-limit-note">
        {t("目前主要由我維護，尚未累積多人協作或長期維護時間的前後比較；後續會持續記錄自動檢查攔下的問題與常見修改所需步驟。")}
      </p>
      <div className="ds-case-design-system-cta">
        <div>
          <h3>{t("查看實作後的 Design System 文件")}</h3>
          <p>{t("這套規則最後整理成可瀏覽的文件頁，內容對應實際使用的 foundations、tokens、components、patterns 與 governance。")}</p>
        </div>
        <Button className="ds-case-design-system-cta__button" href="/design-system">{t("前往 Design System")}</Button>
      </div>
    </CaseSection>
  );
}
