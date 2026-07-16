import { CaseSection } from "../../../components/case-study";
import { getDsTranslator } from "../i18n-server";

const reflections = [
  {
    title: "共用不是越多越好",
    body: "AI 很快就能找出相似模式。用途、內容模型與未來變動方式都穩定後，我才會整理成共用元件，確定它真的能降低維護成本。",
  },
  {
    title: "規則要落進程式，也要讓協作者能照著做",
    body: "每一條 design token、component contract 與決策紀錄，都要對應到實際程式和可檢查的使用方式。只寫在說明文件裡不夠。",
  },
  {
    title: "驗證流程也是 Design System 的一部分",
    body: "我把修改範圍、自動檢查、人工驗收與版本紀錄串成固定流程，不把品質押在某一次生成結果上。",
  },
];

export default async function ReflectionSection() {
  const { t } = await getDsTranslator();
  return (
    <CaseSection
      id="cs-sec-reflection"
      kicker={t("學習反思")}
      title={t("做完這套系統，我留下三個判斷")}
      surface
    >
      <p className="cs-section-lead">
        {t("這三組數字說明做出了什麼；回頭看整個過程，我更在意哪些工作適合交給 AI，哪些判斷仍要由我負責。")}
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
        {t("目前主要還是我一個人維護，所以還沒有多人協作或長期維護時間的前後比較。接下來會記錄兩件事：自動檢查實際攔下哪些問題，以及常見修改需要多少步驟。")}
      </p>
    </CaseSection>
  );
}
