import { CaseCard, CaseGrid, CaseSection } from "../../../components/case-study";
import TermNotes from "../components/TermNotes";
import { getDsTranslator } from "../i18n-server";

function IconRepeat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 2.5 21 6.5l-4 4" />
      <path d="M3 11V9a3 3 0 0 1 3-3h15" />
      <path d="M7 21.5 3 17.5l4-4" />
      <path d="M21 13v2a3 3 0 0 1-3 3H3" />
    </svg>
  );
}

function IconAgents() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="5.5" cy="6" r="2.5" />
      <circle cx="18.5" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M7.6 7.6 10.2 16" />
      <path d="M16.4 7.6 13.8 16" />
      <path d="M8 6h8" />
    </svg>
  );
}

function IconBadgeCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.5l2.4 1.8 3-.3 1.1 2.8 2.8 1.1-.3 3 1.8 2.4-1.8 2.4.3 3-2.8 1.1-1.1 2.8-3-.3-2.4 1.8-2.4-1.8-3 .3-1.1-2.8-2.8-1.1.3-3L1.2 13.3 3 10.9l-.3-3 2.8-1.1 1.1-2.8 3 .3z" />
      <path d="M8.5 12.5l2.4 2.4 4.6-5" />
    </svg>
  );
}

const whyCards = [
  {
    icon: <IconRepeat />,
    title: "頁面迭代太頻繁",
    body: "同一種「前後對比」版型，在不同案例頁各自實作；顏色、間距也散落在各頁 CSS 裡。當網站越來越大，任何微調都可能變成重複修改。",
  },
  {
    icon: <IconAgents />,
    title: "AI 協作需要明確邊界",
    body: "我會使用 AI 協助盤點、實作與檢查，但如果沒有共同規範，每次修改都可能採用不同寫法。AI 要能穩定協作，前提是規則、權限和驗證方式都被寫清楚。",
  },
  {
    icon: <IconBadgeCheck />,
    title: "把理解落到真實作品裡",
    body: "與其停留在「知道 design system」的理解，我更想用自己的作品集實際做一次：從規則建立、元件盤點到長期維護，把整個過程走一遍、也記錄下來。",
  },
];

export default async function WhySection() {
  const { t } = await getDsTranslator();
  return (
    <CaseSection id="cs-sec-why" kicker={t("WHY")} title={t("為什麼要幫自己的作品集建 Design System？")}>
      <p className="cs-section-lead">
        {t("網站不是沒有設計，只是設計散落在每一頁，沒有集中管理的地方。")}
      </p>
      <p className="cs-section-lead">
        {t("作品集網站是用「先把畫面做出來」的方式快速成形的——這個起點沒有錯，它讓內容先能展示。但隨著頁面越改越多，三個問題越來越明顯：")}
      </p>
      <CaseGrid variant="three" className="ds-case-card-grid">
        {whyCards.map((card) => (
          <CaseCard className="ds-case-icon-card" key={card.title}>
            <span className="ds-case-icon" aria-hidden="true">{card.icon}</span>
            <h3>{t(card.title)}</h3>
            <p>{t(card.body)}</p>
          </CaseCard>
        ))}
      </CaseGrid>
      <blockquote className="ds-case-quote">
        {t("把「規則」從人的腦中搬出來，變成 code 和文件都讀得到的單一來源（single source of truth）。")}
      </blockquote>
      <TermNotes
        title={t("名詞註釋")}
        ariaLabel={t("專有名詞註釋")}
        items={[
          {
            term: t("Design system"),
            description: t("這裡指一套管理介面規則的方法，包含設計變數、元件使用方式、內容版型和維護流程。"),
          },
          {
            term: t("Single source of truth"),
            description: t("指團隊判斷時只依賴同一個可信來源，避免文件、設計稿和實作各說各話。"),
          },
        ]}
      />
    </CaseSection>
  );
}
