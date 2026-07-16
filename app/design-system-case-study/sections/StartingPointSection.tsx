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
    title: "同一版型反覆實作",
    body: "同一種「前後對比」版型，在不同案例頁各做一份，顏色和間距也散落在各頁 CSS 裡。網站一變大，同一個微調就可能要重複處理。",
  },
  {
    icon: <IconAgents />,
    title: "AI 協作需要明確邊界",
    body: "我用 AI 協助盤點、實作和檢查；如果沒有共同規範，同一種修改每次都可能寫成不同版本。要讓協作結果穩定，就得先寫清楚規則、權限和驗證方式。",
  },
  {
    icon: <IconBadgeCheck />,
    title: "用自己的作品集驗證 Design System",
    body: "我不想只停在理論理解，所以直接拿作品集來做：從規則建立、元件盤點到長期維護，完整走過一次並留下紀錄。",
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
          {t("作品集一開始以快速完成頁面為主；隨著案例增加，原本適合單頁的做法開始讓重複版型與分散樣式增加跨頁同步與維護成本，後續延伸出下面三個問題：")}
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
          {t("這三個問題把下一步指向同一件事：先弄清楚作品集缺哪些規範。我參考 Ant Design 與 Google Material Design，再逐項比較顏色層級、間距、圓角、字級，以及 hover、focus、disabled 等元件狀態，共整理出十幾個缺口。")}
        </p>
        <p className="cs-section-lead">
          {t("接著用 Figma Make 做出包含系統介紹、缺口清單與升級計畫的互動雛形，先把腦中模糊的「想要一套系統」變成看得見、可以討論的第一版規劃。")}
        </p>
      </div>

      <CaseMedia
        className="ds-case-media"
        caption={t("Figma Make 第一版互動雛形，包含系統介紹、缺口清單與升級計畫。")}
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
          { term: "Ant Design / Material Design", description: t("我用這兩套設計系統當比對基準，逐項檢查作品集還缺哪些規範。") },
          { term: "hover / focus / disabled", description: t("元件在滑鼠移入、鍵盤聚焦、不能點擊時各自的樣子；設計系統要事先把這些狀態都定義好。") },
          { term: "Figma Make", description: t("用來快速產生互動雛形的工具。") },
        ]}
      />
    </CaseSection>
  );
}
