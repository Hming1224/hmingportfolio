import Image from "next/image";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import "../../styles/case-study-design-system-case-study.css";
import {
  CaseCard,
  CaseGrid,
  CaseInfoGrid,
  CaseMedia,
  CaseMetricGrid,
  CaseSection,
  CaseStudyShell,
  type TocSection,
} from "../../components/case-study";
import Button from "../../components/ui/Button";
import { getNextProject, getProjectBySlug } from "../../data/projects";
import type { Locale } from "../../i18n/routing";
import { createLocalizedMetadata } from "../../lib/metadata";
import { localizeDsTree, translateDs, translateDsData } from "./i18n";

const SLUG = "design-system-case-study";
const ASSET = "/projects/design-system-case-study";

type InfoItem = {
  label: string;
  value: string[];
};

type TermNote = {
  term: string;
  description: string;
};

const infoItems: InfoItem[] = [
  { label: "時間", value: ["2026.06 – 現在（持續迭代中）"] },
  { label: "角色", value: ["Product Designer"] },
  { label: "負責項目", value: ["研究整理", "系統規劃", "元件盤點", "AI 協作流程設計", "前端實作驗證"] },
  {
    label: "產出",
    value: [
      "Design system documentation",
      "Markdown 規格文件",
      "design tokens",
      "共用 case-study components",
      "validation scripts",
    ],
  },
];

const tocSections: TocSection[] = [
  { id: "cs-sec-why", title: "為什麼要建 Design System" },
  { id: "cs-sec-starting-point", title: "起點" },
  { id: "cs-sec-turning-points", title: "三次轉折" },
  { id: "cs-sec-framework", title: "決策框架" },
  { id: "cs-sec-evolution-a", title: "演化實例 A" },
  { id: "cs-sec-evolution-b", title: "演化實例 B" },
  { id: "cs-sec-evolution-c", title: "演化實例 C" },
  { id: "cs-sec-governance", title: "Governance 與 AI 協作" },
  { id: "cs-sec-outcome", title: "Outcome" },
  { id: "cs-sec-reflection", title: "Reflection" },
];

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

function TermNotes({
  items,
  title = "名詞註釋",
  ariaLabel = "專有名詞註釋",
}: {
  items: TermNote[];
  title?: string;
  ariaLabel?: string;
}) {
  const hasCjk = items.some((item) => /[\u4e00-\u9fff]/.test(`${item.term}${item.description}`));
  const resolvedTitle = title === "名詞註釋" && !hasCjk ? "Terms" : title;
  const resolvedAriaLabel = ariaLabel === "專有名詞註釋" && !hasCjk ? "Term notes" : ariaLabel;

  return (
    <aside className="ds-case-term-notes" aria-label={resolvedAriaLabel}>
      <h3>{resolvedTitle}</h3>
      <dl>
        {items.map((item) => (
          <div className="ds-case-term-note" key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.description}</dd>
          </div>
        ))}
      </dl>
    </aside>
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

const turningPoints = [
  {
    title: "轉折一：設計文件和實際 code 脫節",
    body: "第一版規劃整理成了設計文件，但實際網站裡仍有許多寫死的顏色、間距和每頁各自的 CSS 解法。文件描述的是理想狀態，卻沒有同步反映 production code 的真實狀況。",
    lesson: "後來我把 production code 視為 source of truth：先盤點實際狀態，再更新文件和規則。",
  },
  {
    title: "轉折二：沒有先 audit 的大範圍修改，造成視覺回歸",
    body: "早期我曾讓 AI 依照完整計劃一次處理多個案例頁，結果把原本屬於單頁敘事的版型過早推進共用層，造成邊框疊加、間距跑掉和手機版水平溢出。",
    lesson: "這次學到的是：不管誰來執行，動手前都要先釐清影響範圍和層級。",
  },
  {
    title: "轉折三：把風險整理成可重複的流程",
    body: "後來我把 AI 協作拆成診斷、實作、驗證和回歸檢查的分段流程。AI 仍然可以協助執行，但每一步都有明確邊界、驗證條件和可回溯的 checkpoint。",
    lesson: "audit → implementation → validation → smoke → commit → push。",
  },
];

const workflowSteps = [
  {
    title: "Audit",
    body: "先盤點現況與風險，確認這次要改的是樣式、元件、內容，還是頁面結構。",
  },
  {
    title: "Implementation",
    body: "一次只修改一個明確範圍，避免把太多問題混在同一批改動裡。",
  },
  {
    title: "Validation",
    body: "用 lint、token 檢查與 build 確認基礎品質。",
  },
  {
    title: "Smoke",
    body: "在主要頁面與斷點快速檢查畫面、互動與 console，確認沒有明顯回歸。",
  },
  {
    title: "Commit",
    body: "驗證通過後才建立 checkpoint，讓每次改動都可以被追蹤。",
  },
  {
    title: "Push",
    body: "先推到 feature branch，經過 preview 與人工確認後再合併到 main。",
  },
];

const workflowSummary =
  "先診斷，再小範圍改動；每一步都驗證，最後才建立可回溯的 checkpoint。";

const frameworkRows = [
  [
    "顏色、間距、字級等值反覆出現",
    "先收斂成 design token，讓不同頁面共用同一組基礎規則，而不是急著抽 component。",
    "Design Tokens",
  ],
  [
    "外框和排列方式重複，但內容每次不同",
    "只抽出穩定的外框，把內容區塊留給各頁替換，讓一致性和敘事彈性同時存在。",
    "Slot-based Composition",
  ],
  [
    "兩個元件長得像，但用途容易混淆",
    "先寫清楚各自適合承載什麼內容、有哪些狀態、什麼情境下不該使用。",
    "Component Contract",
  ],
  [
    "同樣結構和行為穩定重複出現",
    "等使用場景足夠明確，再抽成共用元件，避免太早把例外綁進核心 API。",
    "Componentization（Rule of Three）",
  ],
  [
    "只服務某一頁的特定敘事",
    "刻意留在頁面本地，讓它貼近內容，不為了表面統一而增加共用層負擔。",
    "Local Component（colocation）",
  ],
];

const evolutionSteps = [
  {
    title: "各自實作",
    body: "不同案例頁各自實作類似的 Before / After 版型，視覺相近但 code 完全獨立。這時如果直接抽共用，只會把還沒穩定的差異綁在一起。",
  },
  {
    title: "先 audit，再抽出敘事外框",
    body: "盤點後確認，真正重複的是版面配置與 RWD 行為，不是內容本身。所以我抽出 slot-based 的敘事外框，讓各頁保留自己的文案、圖片和說明節奏。",
  },
  {
    title: "再拆出視覺外殼",
    body: "第二步才把「有標籤的面板」拆成更底層的視覺外殼，並保留既有樣式掛鉤，讓已上線頁面可以在不改變畫面的情況下遷移。",
  },
];

const brakeCases = [
  {
    verdict: "KEEP LOCAL",
    title: "各案例頁的反思卡片",
    temptation: "三個案例頁都有反思卡片，結構相似，看起來是現成的共用候選。",
    judgment:
      "有些反思卡片的背景、標號和排列方式其實是那一頁的敘事識別；硬統一會讓不同案例的語氣被磨平。",
    decision: "共用層停在底層的卡片外殼、Grid 和 tokens，版型各自保留。",
  },
  {
    verdict: "KEEP LOCAL",
    title: "Advantech 的多重對比版面",
    temptation: "已經有共用的 Before / After 外框了，把這兩塊也塞進去，就「全站統一」了。",
    judgment:
      "既有共用外框的契約是「一個外框、一組對比」；這類版面是多組對比同框，語意不同。硬塞進去，元件會為了遷就例外長出太多開關。",
    decision: "刻意保留在頁面本地；等真的出現第二個多重對比場景，再設計新的契約。",
  },
  {
    verdict: "DEFERRED",
    title: "通用 Tag、表格外框、影片燈箱",
    temptation: "「以後一定用得到」，先做起來放著。",
    judgment:
      "都還沒有足夠穩定的使用場景。需求出現之前抽的元件多半是在猜，而猜錯的抽象比重複的 code 更難維護。",
    decision: "行為先寫進文件、元件緩建；等 rule of three 條件成立再重啟評估。",
  },
];

const semanticRows = [
  ["Button", "在當下情境執行操作（command action）", "送出表單、複製 email、打開 lightbox"],
  ["Link", "帶使用者前往目的地（navigation action）", "去案例頁、回首頁、開外部 prototype"],
  ["LinkButton", "語意是 Link、視覺長得像 Button", "View case study、Next project"],
  ["CTA", "不是元件，是這一顆在畫面上的「角色」（usage role）", "Hero 主按鈕、卡片的 Learn More"],
];

const decisionLog = [
  "專案標籤圓角固定 4px——不再每頁各自發揮。",
  "一個畫面原則上只放一顆 primary CTA——是 guideline 不是硬規則，但偏離要有理由。",
  "Dark mode：token 先備好、公開切換先不開——場景不足前，不增加維護面。",
  "StatusBadge 這類「還沒有真實使用場景」的元件，一律緩建。",
  "未上線的案子用 disabled 底色呈現，不做假連結騙點擊。",
  "文件目錄只列 production 真的在用的元件——文件站上線後，把 30 個項目全數稽核過一輪，確認每一項都對得上實際頁面。",
  "文件站本身也吃同一套規則：讀者看的內容和維護用的規則分開寫，文件也走一樣的 audit → 修正 → 驗收流程。",
];

const outcomeMetrics = [
  {
    value: "268",
    label: "runtime design tokens",
    body: "以 styles/tokens.css 為 source of truth，目前掃到 268 個唯一 CSS custom properties，集中管理顏色、字級、間距、圓角、陰影與 motion。",
  },
  {
    value: "19",
    label: "共用 case-study 元件",
    body: "CaseStudyShell、Section、Card、Grid、Media、Before / After 等 19 個共用元件，支撐 4 個案例頁的主要敘事結構。",
  },
  {
    value: "10",
    label: "核心規格文件",
    body: "docs/design-system/00–09 收斂成 10 份核心文件，涵蓋 foundations、tokens、components、patterns、governance 與 workflow。",
  },
  {
    value: "5",
    label: "核心圓角 token",
    body: "目前 production token 層以 sm / md / lg / pill / button 作為主要圓角尺度，讓新元件優先吃同一組規則。",
  },
  {
    value: "19",
    label: "motion tokens",
    body: "duration、easing、transition 相關 token 集中在 tokens.css；route-specific 動畫可以保留，但共用節奏先回到同一層管理。",
  },
  {
    value: "3",
    label: "validation scripts",
    body: "check-design-tokens、check-links 與 architecture audit 負責檢查 token、素材連結和樣式 ownership，讓規則不是只靠人工記得。",
  },
];

const guardrails = [
  {
    name: "Token check",
    body: "檢查是否又出現寫死的顏色值，避免設計規則在日常修改中慢慢流失。",
  },
  {
    name: "Asset check",
    body: "確認頁面引用的圖片和媒體都真的存在，避免作品集上線後出現失效素材。",
  },
  {
    name: "Architecture audit",
    body: "檢查案例頁樣式是否維持在自己的範圍內，避免單頁調整影響到其他作品。",
  },
];

const reflections = [
  {
    title: "先診斷，再動手，比一次規劃到位更重要",
    body: "第一版雛形和完整計劃書都無法保證執行安全。真正讓專案穩定下來的，是把「診斷」和「動手」拆開：先 audit，再 implementation。順序比計劃書的厚度更重要。",
  },
  {
    title: "AI 協作的重點是邊界和驗證",
    body: "這次經驗沒有讓我少用 AI，而是讓我更清楚地把 AI 放在可管理的流程裡。AI 可以協助盤點和執行，但任務邊界、驗證條件和 rollback 節點必須由我先設計好。",
  },
  {
    title: "語彙要能被共同理解",
    body: "我一開始自己發明了幾個詞（例如把外框元件叫 shell），後來逐一查證，改成設計與工程更常使用的說法。自創詞只有自己懂；改用大家共同的語彙，才能和工程師順利討論。",
  },
  {
    title: "把「搞懂」寫下來，才算真的懂",
    body: "每釐清一個概念——token 和 alias 差在哪、Button 和 LinkButton 為什麼要分——我都整理成規格或筆記。寫不出來，通常代表自己還沒有真的想清楚。",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const project = getProjectBySlug(SLUG, locale);
  const description = project.seoDescription ?? project.description;

  return createLocalizedMetadata(locale, `/${SLUG}`, {
    en: { title: project.title, description },
    "zh-TW": { title: project.title, description },
  });
}

function Hero({ items }: { items: InfoItem[] }) {
  const heroInfoItems = items.map((item) => ({
    label: item.label,
    value: (
      <>
        {item.value.map((value) => (
          <span key={value}>{value}</span>
        ))}
      </>
    ),
  }));

  return (
    <section>
      <div className="cs-hero-cover ds-case-hero__visual">
        <div className="cs-hero-cover-img">
          <Image
            src={`${ASSET}/cover/cover.webp`}
            alt="Design System Case Study cover showing tokens, component cards, and governance workflow."
            fill
            priority
            sizes="100vw"
          />
        </div>
      </div>

      <div className="cs-hero-info ds-case-hero__info">
        <div className="cs-hero-meta">
          Design System / Self-initiated Side Project
        </div>
        <h1 className="cs-title">
          把自己的作品集當產品做：一套邊用邊長出來的 Design System
        </h1>
        <p className="ds-case-hero__subtitle">
          這是我在製作作品集網站期間，自發啟動的 side project。我把網站本身當成產品管理，逐步建立 design tokens、元件契約和 AI-assisted workflow。這一頁記錄的不是一次規劃到位的成果，而是我在重複樣式、元件邊界和 AI 協作風險逐漸出現後，怎麼把問題整理成可維護、可驗證、可回溯的工作流程。
        </p>
        <CaseInfoGrid items={heroInfoItems} className="cs-info-row--divided ds-case-info-grid" />
      </div>
    </section>
  );
}

export default async function DesignSystemCaseStudyPage() {
  const locale = (await getLocale()) as Locale;
  const t = (text: string) => translateDs(locale, text);
  const project = getProjectBySlug(SLUG, locale);
  const nextProject = getNextProject(project.slug, locale);
  const nextProjectLabel = nextProject.navigationTitle ?? nextProject.title;
  const localizedInfoItems = translateDsData(locale, infoItems);
  const localizedTocSections = translateDsData(locale, tocSections);

  return (
    <CaseStudyShell
      theme="theme-design-system-case-study"
      tocSections={localizedTocSections}
      nextNav={{
        homeLabel: t("返回首頁"),
        nextHref: nextProject.status === "published" ? nextProject.href : undefined,
        nextLabel: `${t("下一個專案")}${t("：")}${nextProjectLabel}`,
      }}
      hero={localizeDsTree(locale, Hero({ items: localizedInfoItems }))}
    >
      {localizeDsTree(locale, <>
      <CaseSection id="cs-sec-why" kicker="WHY" title="為什麼要幫自己的作品集建 Design System？">
        <p className="cs-section-lead">
          網站不是沒有設計，只是設計散落在每一頁，沒有集中管理的地方。
        </p>
        <p className="cs-section-lead">
          作品集網站是用「先把畫面做出來」的方式快速成形的——這個起點沒有錯，它讓內容先能展示。但隨著頁面越改越多，三個問題越來越明顯：
        </p>
        <CaseGrid variant="three" className="ds-case-card-grid">
          {whyCards.map((card) => (
            <CaseCard className="ds-case-icon-card" key={card.title}>
              <span className="ds-case-icon" aria-hidden="true">
                {card.icon}
              </span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </CaseCard>
          ))}
        </CaseGrid>
        <blockquote className="ds-case-quote">
          把「規則」從人的腦中搬出來，變成 code 和文件都讀得到的單一來源（single source of truth）。
        </blockquote>
        <TermNotes
          items={[
            {
              term: "Design system",
              description:
                "這裡指一套管理介面規則的方法，包含設計變數、元件使用方式、內容版型和維護流程。",
            },
            {
              term: "Single source of truth",
              description:
                "指團隊判斷時只依賴同一個可信來源，避免文件、設計稿和實作各說各話。",
            },
          ]}
        />
      </CaseSection>

      <CaseSection
        id="cs-sec-starting-point"
        kicker="STARTING POINT"
        title="起點：參考成熟系統，用 Figma Make 做第一版"
        surface
      >
        <p className="cs-section-lead">
          不從零發明，先看成熟系統如何整理規則、元件與文件。
        </p>
        <CaseCard className="ds-case-narrative-card">
          <p>
            我拿 <b>Ant Design</b> 和 <b>Google Material Design</b> 當基準，逐項對照自己的網站做 <b>gap analysis</b>：顏色有沒有分層？間距、圓角、字級有沒有規則？元件狀態（hover / focus / disabled）齊不齊？盤點下來列出了十幾個缺口。
          </p>
          <p>
            接著用 <b>Figma Make</b> 把第一版系統規劃做成互動雛形——包含系統介紹、缺口清單和升級計畫三個頁面。這一步幫我把腦中模糊的「想要一套系統」變成看得見、可以討論的東西。
          </p>
          <p>
            但這裡也埋下了第一個伏筆：<b>規劃是規劃，code 是 code。雛形畫得再完整，不等於網站真的照它運作。</b>
          </p>
        </CaseCard>
        <CaseMedia
          className="ds-case-media"
          caption="Figma Make 第一版互動雛形：先把 design system 的方向變成可以討論的介面。"
        >
          <Image
            src={`${ASSET}/research/figma-make-prototype.webp`}
            alt="Figma Make prototype screenshot for Hming Design System."
            width={1440}
            height={960}
            sizes="(max-width: 768px) calc(100vw - 48px), calc(100vw - 96px)"
          />
        </CaseMedia>
        <TermNotes
          items={[
            {
              term: "Gap analysis",
              description:
                "Gap analysis 是把現況和目標標準放在一起比對，找出缺口和優先改善項目。",
            },
            {
              term: "Figma Make",
              description:
                "Figma Make 是用來快速產生互動雛形的工具，這裡用來把系統規劃先做成可討論的介面。",
            },
          ]}
        />
      </CaseSection>

      <CaseSection id="cs-sec-turning-points" kicker="TURNING POINTS" title="三次轉折：這個專案學到最多的三段">
        <p className="cs-section-lead">
          這套系統很難說是一次「建」好的，比較像是一路修出來的——每次轉折，都讓我放掉一個原本以為理所當然的假設。
        </p>
        <div className="ds-case-timeline">
          {turningPoints.map((item, index) => (
            <CaseCard className="ds-case-timeline__item" key={item.title}>
              <span className="ds-case-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <p className="ds-case-lesson">{item.lesson}</p>
            </CaseCard>
          ))}
        </div>
        <div className="ds-case-workflow" aria-labelledby="ds-case-workflow-title">
          <div className="ds-case-workflow__header">
            <h3 id="ds-case-workflow-title">AI collaboration workflow</h3>
            <p>
              我設計這套 AI-assisted workflow，是為了讓 AI 協作可以被管理、驗證與回溯。
              {workflowSummary}
            </p>
          </div>
          <ol className="ds-case-workflow__list">
            {workflowSteps.map((step, index) => (
              <li className="ds-case-workflow__item" key={step.title}>
                <span className="ds-case-workflow__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4>{step.title}</h4>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <TermNotes
          items={[
            {
              term: "Regression",
              description:
                "Regression 指修改後意外破壞原本正常的畫面或互動。",
            },
            {
              term: "Smoke testing",
              description:
                "Smoke testing 是快速檢查主要頁面、斷點與互動是否仍正常，用來及早發現明顯問題。",
            },
            {
              term: "Rollback",
              description:
                "Rollback 是在改動出問題時，能回到上一個穩定版本。",
            },
            {
              term: "Production code as source of truth",
              description:
                "這裡指最終判斷以實際上線程式碼為準，而不是只看文件或設計稿。",
            },
          ]}
        />
      </CaseSection>

      <CaseSection id="cs-sec-framework" kicker="FRAMEWORK" title="決策框架：什麼該抽象、什麼不該" surface>
        <p className="cs-section-lead">
          轉折二踩過的坑，後來被我整理成一條判斷路徑：不是所有長得像的東西都該共用。
        </p>
        <div className="ds-case-table-frame">
          <table className="ds-case-table">
            <thead>
              <tr>
                <th>看到的訊號</th>
                <th>對應做法</th>
                <th>通用說法</th>
              </tr>
            </thead>
            <tbody>
              {frameworkRows.map(([signal, action, term]) => (
                <tr key={signal}>
                  <th scope="row">{signal}</th>
                  <td>{action}</td>
                  <td>
                    <span className="ds-case-term-pill">{term}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <blockquote className="ds-case-quote">
          重複的是「值」就 token 化；重複的是「殼」就留 slot；重複的是「整件事」才做成共用元件；只出現一次的，讓它留在原地。
        </blockquote>
        <TermNotes
          items={[
            {
              term: "Design tokens",
              description:
                "Design tokens 是把顏色、字級、間距等設計決策集中管理的變數，讓不同頁面能維持一致。",
            },
            {
              term: "Component contract",
              description:
                "Component contract 指的是元件的使用規則，例如它適合承載什麼內容、有哪些狀態、什麼情境下不該使用。",
            },
            {
              term: "Slot-based composition",
              description:
                "Slot-based composition 是讓元件保留固定結構，但開放部分內容區塊被替換，兼顧一致性與彈性。",
            },
            {
              term: "Rule of three",
              description:
                "Rule of three 是一個實務判斷原則：同樣結構真的重複出現多次後，再考慮抽象成共用元件。",
            },
          ]}
        />
      </CaseSection>

      <CaseSection id="cs-sec-evolution-a" kicker="EVOLUTION A" title="演化實例 A：Before / After 版型的三段抽象">
        <p className="cs-section-lead">
          同一個版型寫了三次之後，才動手抽象——而且分三步走，不是一次到位。
        </p>
        <CaseGrid variant="three" className="ds-case-card-grid ds-case-stage-grid">
          {evolutionSteps.map((step, index) => (
            <CaseCard className="ds-case-stage-card" key={step.title}>
              <span className="ds-case-stage-chip" aria-hidden="true">
                STEP {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </CaseCard>
          ))}
        </CaseGrid>
        <CaseMedia
          className="ds-case-media"
          caption="Before / After pattern 從三頁各自實作，演化成 slot-based narrative frame。"
        >
          <Image
            src={`${ASSET}/solution/before-after-evolution.webp`}
            alt="Before and after diagram showing three local implementations evolving into shared narrative frame and panel shell."
            width={1600}
            height={900}
            sizes="(max-width: 768px) calc(100vw - 48px), calc(100vw - 96px)"
          />
        </CaseMedia>
        <TermNotes
          items={[
            {
              term: "Slot-based narrative frame",
              description:
                "這裡指固定版面結構、開放內容替換的敘事外框，讓不同案例能共用排列方式但保留自己的內容。",
            },
            {
              term: "Local implementation",
              description:
                "Local implementation 是先在單一頁面完成實作，等模式穩定後再評估是否抽到共用層。",
            },
          ]}
        />
      </CaseSection>

      <CaseSection id="cs-sec-evolution-b" kicker="EVOLUTION B" title="演化實例 B：知道何時「不要」抽象" surface>
        <p className="cs-section-lead">
          我後來的理解是：系統不一定要什麼都共用，但每個「刻意不共用」的地方，最好都講得出理由。
        </p>
        <p className="cs-section-lead">
          有了共用元件之後，最大的誘惑是把所有長得像的東西都塞進去。為了避免過早抽象，每次想共用之前，我都會先把「誘惑、判斷、決定」寫下來：
        </p>
        <CaseGrid variant="three" className="ds-case-card-grid">
          {brakeCases.map((item) => (
            <CaseCard className="ds-case-brake-card" key={item.title}>
              <span
                className={`ds-case-verdict${item.verdict === "DEFERRED" ? " ds-case-verdict--deferred" : ""}`}
              >
                {item.verdict}
              </span>
              <h3>{item.title}</h3>
              <p>
                <strong>誘惑</strong>
                {item.temptation}
              </p>
              <p>
                <strong>判斷</strong>
                {item.judgment}
              </p>
              <p>
                <strong>決定</strong>
                {item.decision}
              </p>
            </CaseCard>
          ))}
        </CaseGrid>
        <CaseCard className="ds-case-narrative-card">
          <p>
            印象最深的一次：我曾一口氣盤點 8 個「看起來可以抽」的 pattern，<b>結論是一個都不抽</b>。那次盤點沒有產出任何新元件，留下的是 8 條寫進治理文件的「為什麼不抽」。對我來說，把不做的理由寫清楚，跟多做幾個元件一樣重要。
          </p>
        </CaseCard>
        <blockquote className="ds-case-quote">
          抽象是有成本的。每多一個共用元件，就多一份契約要維護、多一群頁面被綁在一起。
        </blockquote>
        <TermNotes
          items={[
            {
              term: "Local component",
              description:
                "Local component 是只服務單一頁面或單一敘事情境的元件，不一定要抽成全站共用。",
            },
            {
              term: "Component abstraction",
              description:
                "Component abstraction 是把重複的結構整理成共用元件，但它同時會增加使用規則和維護成本。",
            },
          ]}
        />
      </CaseSection>

      <CaseSection id="cs-sec-evolution-c" kicker="EVOLUTION C" title="演化實例 C：語意分不清時，先拆文件、不拆 code">
        <p className="cs-section-lead">
          不是每個問題都要用「改 code」來解決。
        </p>
        <p className="cs-section-lead">
          整理全站按鈕時，我卡在一個看起來很小的問題：
        </p>
        <p className="ds-case-question-callout">
          「View case study」長得像按鈕，那它是 Button 嗎？
        </p>
        <p className="cs-section-lead">
          全站有十幾個這種「像按鈕的東西」，不先分類清楚，之後 token 化和抽元件都會踩空。查證 W3C 與 Material Design 的相關定義後，我把它們拆成四個概念：
        </p>
        <div className="ds-case-table-frame">
          <table className="ds-case-table">
            <thead>
              <tr>
                <th>概念</th>
                <th>是什麼</th>
                <th>例子</th>
              </tr>
            </thead>
            <tbody>
              {semanticRows.map(([term, meaning, examples]) => (
                <tr key={term}>
                  <th scope="row">{term}</th>
                  <td>{meaning}</td>
                  <td>{examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CaseCard className="ds-case-narrative-card">
          <p>
            為什麼要分這麼細？因為使用者對兩者的預期不同：link 可以右鍵開新分頁、複製網址；button 是觸發一個當下的操作。Screen reader 也會把兩者報讀成不同角色——語意用錯，輔助科技的使用者會對點擊結果有錯誤期待。
          </p>
          <p>
            最後的決策是<b>「文件拆、code 不拆」</b>：在規格文件裡把 Button 和 LinkButton 的 contract 分開寫清楚；code 維持同一個 Button 元件（有 href 就 render 成連結）。因為現階段把 code 拆成兩個元件，只會製造一波 import 搬移和 regression 風險——語意的問題，用文件就能解決，就不要動 code。
          </p>
          <p>
            這正是決策框架第三列「用途易混淆 → Component Contract」的實際案例：抽象不是只有「抽元件」一種形式，把契約寫清楚，本身就是一種系統化。
          </p>
        </CaseCard>
        <TermNotes
          items={[
            {
              term: "LinkButton",
              description:
                "LinkButton 是語意上帶使用者前往另一個位置、視覺上看起來像按鈕的連結。",
            },
            {
              term: "Screen reader",
              description:
                "Screen reader 是協助視障使用者讀取畫面內容的輔助科技，會依照 HTML 語意報讀不同角色。",
            },
            {
              term: "Component contract",
              description:
                "Component contract 指的是元件的使用規則，例如它適合承載什麼內容、有哪些狀態、什麼情境下不該使用。",
            },
          ]}
        />
      </CaseSection>

      <CaseSection id="cs-sec-governance" kicker="GOVERNANCE" title="Governance 與 AI 協作：讓流程可管理、可驗證" surface>
        <p className="cs-section-lead">
          規範如果只存在人腦裡，就很難被穩定執行。
        </p>
        <p className="cs-section-lead">
          這套系統和一般做法比較不一樣的地方，是我把 AI 也當成需要被管理的協作者。相關規則最後整理成兩層文件，加上一份決策紀錄：
        </p>
        <CaseGrid variant="two" className="ds-case-card-grid">
          <CaseCard>
            <h3>文件層——把規則寫成可執行的邊界</h3>
            <p>
              10 份規格文件整理了 tokens、components、patterns、accessibility 與 governance。元件的職責邊界用 component contract 寫清楚：適合承載什麼內容、哪些行為不保證、遇到不明確情境時必須停下來確認。
            </p>
          </CaseCard>
          <CaseCard>
            <h3>流程層——每張工單都有權限邊界</h3>
            <p>
              AI-assisted implementation 一律走分段權限，每張任務都寫清楚「這一段只能做什麼、禁止做什麼」：audit 只看不改；implementation 不負責 commit；commit 只提交指定檔案；驗證通過後才 push。這樣可以避免修改範圍在過程中失控。
            </p>
          </CaseCard>
        </CaseGrid>
        <div className="ds-case-decision-log">
          <h3>決策紀錄——做過的取捨，寫下來就不用重複討論</h3>
          <p>
            所有標準化決策逐項整理後寫進治理文件，變成查得到的紀錄。摘幾條實際的：
          </p>
          <ol>
            {decisionLog.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ol>
        </div>
        <blockquote className="ds-case-quote">
          把規則寫下來之後，每一次協作都不用重新解釋一遍脈絡——這是這些文件帶給我最實際的好處。
        </blockquote>
        <TermNotes
          items={[
            {
              term: "AI-assisted workflow",
              description:
                "這裡指由我設定目標、邊界和驗證條件，再讓 AI 協助盤點或執行部分任務的工作流程。",
            },
            {
              term: "Feature branch",
              description:
                "Feature branch 是先把改動放在獨立分支驗證，避免直接影響正式站的版本。",
            },
            {
              term: "Preview",
              description:
                "Preview 是合併到正式版本前的預覽環境，用來做最後的畫面和流程確認。",
            },
          ]}
        />
      </CaseSection>

      <CaseSection id="cs-sec-outcome" kicker="OUTCOME" title="產出與防護網">
        <p className="cs-section-lead">
          系統建好只是開始，更重要的是它能不能防止之後慢慢走樣。先看幾個數字：
        </p>
        <CaseMetricGrid className="ds-case-card-grid">
          {outcomeMetrics.map((metric) => (
            <CaseCard variant="metric" key={metric.label}>
              <span className="cs-metric-value">{metric.value}</span>
              <h3 className="cs-metric-label">{metric.label}</h3>
              <p className="cs-metric-body">{metric.body}</p>
            </CaseCard>
          ))}
        </CaseMetricGrid>
        <p className="cs-section-lead ds-case-guard-lead">
          再看防護網——規則被打破時，讓工具先發現，不用只靠人工檢查：
        </p>
        <CaseGrid variant="three" className="ds-case-card-grid ds-case-guard-grid">
          {guardrails.map((guard) => (
            <CaseCard key={guard.name}>
              <h3 className="ds-case-guard-name">{guard.name}</h3>
              <p>{guard.body}</p>
            </CaseCard>
          ))}
        </CaseGrid>
        <TermNotes
          items={[
            {
              term: "Validation script",
              description:
                "Validation script 是自動檢查規則是否被破壞的小工具，例如檢查 token 使用、素材連結或架構邊界。",
            },
            {
              term: "Architecture audit",
              description:
                "Architecture audit 是檢查檔案和樣式是否仍符合約定，避免單頁修改慢慢影響到全站。",
            },
          ]}
        />
      </CaseSection>

      <CaseSection id="cs-sec-reflection" kicker="REFLECTION" title="學到什麼" surface>
        <p className="cs-section-lead">
          回頭看，這個專案讓我收穫最多的，是那三次轉折的過程，而不只是最後的系統。
        </p>
        <CaseGrid variant="two" className="ds-case-card-grid">
          {reflections.map((item, index) => (
            <CaseCard className="ds-case-reflection-card" key={item.title}>
              <span className="ds-case-reflection-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </CaseCard>
          ))}
        </CaseGrid>
        <div className="ds-case-design-system-cta">
          <div>
            <h3>查看實作後的 Design System 文件</h3>
            <p>這套規則最後整理成可瀏覽的文件頁，包含 tokens、components、patterns 與 governance。</p>
          </div>
          <Button className="ds-case-design-system-cta__button" href="/design-system">
            前往 Design System
          </Button>
        </div>
      </CaseSection>
      </>)}
    </CaseStudyShell>
  );
}
