import Image from "next/image";
import { CaseCard, CaseGrid, CaseMedia, CaseSection } from "../../../components/case-study";
import TermNotes from "../components/TermNotes";
import { ASSET } from "../data";
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

const motivationCards = [
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

export default async function StartingPointSection() {
  const { t } = await getDsTranslator();

  return (
    <CaseSection
      id="cs-sec-motivation"
      kicker={t("起心動念")}
      title={t("當作品集持續成長，分散在各頁的設計規則開始難以維護")}
      surface
    >
      <div className="ds-case-prose">
        <p className="cs-section-lead">
          {t("網站不是沒有設計，只是設計散落在每一頁，沒有集中管理的地方。")}
        </p>
        <p className="cs-section-lead">
          {t("作品集網站一開始是用「先把畫面做出來」的方式快速成形，讓內容可以先上線展示。但隨著頁面越改越多，三個問題也慢慢浮現：")}
        </p>
      </div>

      <CaseGrid variant="three" className="ds-case-card-grid">
        {motivationCards.map((card) => (
          <CaseCard className="ds-case-icon-card" key={card.title}>
            <span className="ds-case-icon" aria-hidden="true">{card.icon}</span>
            <h3>{t(card.title)}</h3>
            <p>{t(card.body)}</p>
          </CaseCard>
        ))}
      </CaseGrid>

      <div className="ds-case-prose ds-case-prose--after-motivation-cards">
        <p className="cs-section-lead">
          {t("我先參考 Ant Design 與 Google Material Design，逐項比較作品集的顏色層級、間距、圓角、字級，以及 hover、focus、disabled 等元件狀態，共整理出十幾個缺口。")}
        </p>
        <p className="cs-section-lead">
          {t("接著用 Figma Make 做出包含系統介紹、缺口清單與升級計畫的互動雛形，先把腦中模糊的「想要一套系統」變成看得見、可以討論的第一版規劃。")}
        </p>
      </div>

      <CaseMedia
        className="ds-case-media"
        caption={t("Figma Make 第一版互動雛形：先把 Design System 的方向變成可以討論的介面。")}
      >
        <Image
          src={`${ASSET}/research/figma-make-prototype.webp`}
          alt={t("Design System 第一版互動雛形，包含系統介紹、缺口清單與升級計畫。")}
          width={1440}
          height={960}
          sizes="(max-width: 768px) calc(100vw - 48px), calc(100vw - 96px)"
        />
      </CaseMedia>

      <TermNotes
        title={t("名詞說明")}
        ariaLabel={t("這一段的名詞說明")}
        items={[
          { term: "design tokens", description: t("集中管理設計值（design tokens）：把顏色、字級、間距等設定放在同一處，讓不同頁面沿用相同規則。") },
          { term: "component contract", description: t("元件使用規則（component contract）：說明元件適合承載的內容、支援的狀態與不適用的情境。") },
          { term: "AI-assisted workflow", description: t("AI-assisted workflow 是由我先定義目標、範圍與驗收條件，再讓 AI 協助盤點、實作與檢查的協作流程。") },
          { term: "gap analysis", description: t("Gap analysis 是把現況和目標標準放在一起比對，找出缺口和優先改善項目。") },
          { term: "Figma Make", description: t("Figma Make 是用來快速產生互動雛形的工具，這裡用來把系統規劃先做成可討論的介面。") },
        ]}
      />
    </CaseSection>
  );
}
