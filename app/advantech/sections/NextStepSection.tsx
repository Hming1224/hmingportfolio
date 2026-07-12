import { CaseCard, CaseGrid } from "../../../components/case-study";
import { nextStepCards } from "../data";
import { localizeAdvantechTree, translateAdvantechData } from "../i18n";
import { getAdvantechTranslator } from "../i18n-server";

export default async function NextStepSection() {
  const { locale, t } = await getAdvantechTranslator();
  const cards = translateAdvantechData(locale, nextStepCards);
  return localizeAdvantechTree(locale,
    <section id="cs-sec-next" className="cs-ns-section cs-stack-box">
      <div className="cs-ns-header cs-stack-box">
        <p className="cs-section-kicker">{locale === "en" ? "NEXT STEPS" : t("下一步")}</p>
        <h2 className="cs-ns-title cs-copy-title">{t("工程實作與 AI 系統落地")}</h2>
        <div className="cs-ns-divider" />
        <p className="cs-ns-desc cs-text-ink cs-copy-body">UI/UX 設計階段完成後，專案將進入工程實作與 AI 能力持續優化階段。設計師已先定義 AI Chatbot 的使用情境、互動流程與介面體驗；接下來，後端工程師將承接這些設計方向，進一步建構 AI 資料庫、訓練模型能力，並將設計中的功能情境轉化為可運作的系統架構。</p>
      </div>

      <CaseGrid variant="two" className="cs-ns-cards">
        {cards.map((card) => (
          <CaseCard key={card.num} className="cs-ns-card">
            <div className="cs-ns-card-hd cs-flex-cluster">
              <span className="cs-ns-badge cs-inline-pill">{card.num}</span>
              <h3 className="cs-ns-card-title cs-copy-title">{card.title}</h3>
            </div>
            <div className="cs-ns-divider" />
            <p className="cs-ns-card-text cs-copy-body">{card.text}</p>
            <div className="cs-ns-tags cs-flex-cluster">
              {card.tags.map((tag) => (
                <span key={tag} className="cs-ns-tag cs-inline-pill">{tag}</span>
              ))}
            </div>
          </CaseCard>
        ))}
      </CaseGrid>

      <div className="cs-ns-vision cs-stack-box">
        <p className="cs-ns-vision-title cs-copy-title">{t("智慧工作流程平台願景")}</p>
        <p className="cs-ns-vision-text cs-copy-body">最終，我們期待這套 AI 系統能從「把 Chatbot 回答得更好」，逐步長成支援廠務管理決策的智慧工作流程平台。隨著 AI 資料庫更完整、模型判斷力持續提升，系統會幫使用者更快讀懂數據、預測風險、拿到行動建議。</p>
      </div>
    </section>
  );
}
