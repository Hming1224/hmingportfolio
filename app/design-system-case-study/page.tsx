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
import type { Locale } from "../../i18n/routing";
import { createLocalizedMetadata } from "../../lib/metadata";

const SLUG = "design-system-case-study";
const ASSET = "/projects/design-system-case-study";

type InfoItem = {
  label: string;
  value: string[];
};

const infoItems: InfoItem[] = [
  { label: "時間", value: ["2026.06-2026.07 still updating"] },
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

const whyCards = [
  {
    title: "頁面迭代太頻繁",
    body: "同一種「前後對比」版型，三個案例頁各寫了三套 code；顏色、間距很多直接寫死。改一個地方，另外兩頁不會跟著動。",
  },
  {
    title: "多個 AI agent 同時協作",
    body: "我用 Claude、Codex 等多個 AI 幫忙寫 code。沒有共同規範時，每個 AI 都有自己的寫法，越幫越亂。",
  },
  {
    title: "想用業界的工作方式驗證自己",
    body: "與其在履歷上寫「了解 design system」，不如真的建一套、真的維護它，把過程攤開給大家看。",
  },
];

const turningPoints = [
  {
    title: "轉折一：設計文件和實際 code 脫節",
    body: "第一版規劃寫成了設計文件，但實際 code 裡還是有很多寫死的值、每頁自己的 CSS 解法。文件說一套、code 做一套，兩邊越差越遠。",
    lesson: "production code 是唯一真相（source of truth），文件描述的「理想狀態」不能被當成現況。",
  },
  {
    title: "轉折二：完整計劃書直接丟給 AI 執行，越修越糟",
    body: "AI 一口氣大範圍改動，把幾個案例頁的特殊敘事版型硬套進共用元件，造成邊框疊加、間距跑掉、手機版排版溢出。",
    lesson: "問題不在 AI 不夠聰明，而是沒有先 audit 就 implement。",
  },
  {
    title: "轉折三：把翻車經驗變成制度",
    body: "我把翻車過程拿去和 ChatGPT、Claude 反覆討論，最後收斂出一套分段工作流，之後所有改動都照這個節奏走。",
    lesson: "audit → implementation → validation → smoke → commit → push。",
  },
];

const workflowSteps = [
  {
    title: "Audit",
    body: "先盤點現況、找出 regression 風險與影響範圍，確認要改的是哪一層。",
  },
  {
    title: "Implementation",
    body: "一次只改一個明確範圍，避免把 layout、token、component API 和文案混在同一批修改。",
  },
  {
    title: "Validation",
    body: "跑靜態檢查與 build，確認格式、lint、token 使用與 production build 都通過。",
  },
  {
    title: "Smoke",
    body: "用瀏覽器檢查主要 routes 與斷點，確認水平溢出、console error、section anchor、互動狀態沒有回歸。",
  },
  {
    title: "Commit",
    body: "驗證通過後才建立 checkpoint commit，讓每個改動都可以被追蹤與 rollback。",
  },
  {
    title: "Push",
    body: "推到 feature branch，保留 main 穩定，等 preview 與人工確認後再合併。",
  },
];

const workflowSummary =
  "先診斷，再小範圍改動；每一步都驗證，最後才建立 checkpoint。";

const frameworkRows = [
  ["同一個「值」到處重複", "抽成變數", "Design Tokens"],
  ["「外框」重複、內容物每次不同", "只抽外框，內容留空給各頁自己填", "Slot-based Composition"],
  ["兩個元件長很像、用途容易混淆", "白紙黑字寫清楚各自的職責與邊界", "Component Contract"],
  ["結構＋行為都重複、且出現三次以上", "抽成共用元件", "Componentization（Rule of Three）"],
  ["只服務某一頁的特定故事", "刻意不抽，跟頁面放一起", "Local Component（colocation）"],
];

const evolutionSteps = [
  {
    title: "第一階段：各自實作",
    body: "三頁各寫各的，視覺相近但 code 完全獨立。樣式還沒穩定前抽共用，只會抽出一個誰都不滿意的元件。",
  },
  {
    title: "第二階段：先 audit，再抽出敘事外框",
    body: "盤點後確認，三頁重複的是「版面配置與 RWD 行為」，不是內容物。所以抽成 slot-based 的 BeforeAfterNarrativeFrame。",
  },
  {
    title: "第三階段：再拆出視覺外殼",
    body: "把「有標籤的面板」再拆成 BeforeAfterPanel，並做 compatibility bridge，保留舊 CSS class 掛鉤，讓已上線頁面零視覺變動遷移。",
  },
];

const brakeCases = [
  {
    verdict: "KEEP LOCAL",
    title: "各案例頁的反思卡片",
    temptation: "三個案例頁都有反思卡片，結構相似，看起來是現成的共用候選。",
    judgment:
      "Laushu 的漸層底色和數字圓標不是裝飾，是那一頁的敘事識別；硬統一等於把三頁的個性磨掉。",
    decision: "共用層停在底層的卡片外殼、Grid 和 tokens，版型各自保留。",
  },
  {
    verdict: "KEEP LOCAL",
    title: "Advantech 的多重對比版面",
    temptation: "已經有共用的 Before / After 外框了，把這兩塊也塞進去，就「全站統一」了。",
    judgment:
      "共用外框的契約是「一個外框、一組對比」；這兩塊是多組對比同框，語意不符。硬塞進去，元件會為了遷就例外長出一堆開關。",
    decision: "刻意保留在頁面本地；等真的出現第二個多重對比場景，再設計新的契約。",
  },
  {
    verdict: "DEFERRED",
    title: "通用 Tag、表格外框、影片燈箱",
    temptation: "「以後一定用得到」，先做起來放著。",
    judgment:
      "都還沒有第三個使用場景。需求出現之前抽的元件是用猜的，而猜錯的抽象比重複的 code 更貴。",
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
];

const outcomeMetrics = [
  {
    value: "300+",
    label: "design tokens",
    body: "顏色、間距、圓角、字級、動畫全部變數化，集中在單一 tokens.css。",
  },
  {
    value: "19",
    label: "共用 case-study 元件",
    body: "Section、Card、Grid、Media、Before / After 外框，組出全站的案例頁。",
  },
  {
    value: "10",
    label: "規格文件",
    body: "從 tokens、元件契約到 AI 實作規則——code 是唯一真相，文件是穩定契約。",
  },
  {
    value: "19 → 5",
    label: "圓角收斂",
    body: "盤點時全站實際用了 19 種硬寫的圓角值，收斂成 5 階 token。",
  },
  {
    value: "17 → 0",
    label: "動畫硬寫歸零",
    body: "17 處硬寫的 duration / easing 全數 token 化。",
  },
  {
    value: "3",
    label: "頁面零視覺變動遷移",
    body: "三個已上線案例頁在抽象過程中完成遷移，畫面一個像素都沒變。",
  },
];

const guardrails = [
  {
    name: "check:tokens",
    body: "掃出寫死的顏色值，防止 token 化的成果隨著日常修改慢慢流失。",
  },
  {
    name: "check-links",
    body: "比對 code 裡引用的每張圖是否真的存在，防止死連結上線。",
  },
  {
    name: "arch-audit",
    body: "稽核每個案例頁的 CSS 有沒有乖乖待在自己的 theme 範圍內，並監控肥大檔案。",
  },
];

const reflections = [
  {
    title: "「規劃完美再執行」是幻覺",
    body: "第一版雛形和完整計劃書都擋不住翻車。真正救回來的是把「診斷」和「動手」拆開——先 audit 再 implement。順序，比計劃書的厚度重要。",
  },
  {
    title: "和 AI 協作，重點是共同立守則",
    body: "翻車之後我沒有少用 AI，反而把 AI 當共事者：一起檢討錯在哪、一起把結論寫成雙方都遵守的工作流。AI 的表現上限，取決於你給它的邊界有多清楚。",
  },
  {
    title: "語彙要跟業界對齊",
    body: "我一開始自己發明了幾個詞（例如把外框元件叫 shell），後來逐一查證，改成業界通用的說法。自創詞只有自己懂；對齊的語彙，才能和工程師站在同一張圖上討論。",
  },
  {
    title: "把「搞懂」寫下來，才算真的懂",
    body: "每釐清一個概念——token 和 alias 差在哪、Button 和 LinkButton 為什麼要分——就整理成一篇學習筆記，目前累積了 4 篇。寫不出來，就代表其實還沒懂。",
  },
];

const nextSteps = [
  "新增案例頁時，重跑一輪 rule of three 評估。",
  "補齊元件的無障礙契約：focus 管理與報讀語意。",
  "讓 /design-system 文件站成為對外的完整規格入口。",
];

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const title = "把自己的作品集當產品做：一套邊用邊長出來的 Design System";
  const description =
    "Hming 在製作作品集網站期間自發建立 Design System 的 side project，記錄設計系統、AI 協作工作流與抽象決策。";

  return createLocalizedMetadata(locale, `/${SLUG}`, {
    en: { title, description },
    "zh-TW": { title, description },
  });
}

function Hero() {
  const heroInfoItems = infoItems.map((item) => ({
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
          這是我在製作作品集網站期間，自發啟動的 side project。它不是一次規劃到位的成果——中間翻過車：太早共用元件造成一堆 regression、設計文件和實際 code 脫節。這一頁記錄的就是我怎麼和 AI 一起把問題修掉，並把每次踩坑變成可以重複使用的工作流程。
        </p>
        <CaseInfoGrid items={heroInfoItems} className="cs-info-row--divided ds-case-info-grid" />
      </div>
    </section>
  );
}

export default function DesignSystemCaseStudyPage() {
  return (
    <CaseStudyShell
      theme="theme-design-system-case-study"
      tocSections={tocSections}
      nextNav={{
        homeLabel: "返回首頁",
        nextLabel: "下一個專案：Phase 3 待串接",
      }}
      hero={<Hero />}
    >
      <CaseSection id="cs-sec-why" kicker="WHY" title="為什麼要幫自己的作品集建 Design System？">
        <p className="cs-section-lead">
          問題不是「沒有設計」，而是「設計散落在每一頁」。
        </p>
        <p className="cs-section-lead">
          作品集網站是用「先把畫面做出來」的方式快速成形的——這個起點沒有錯，它讓內容先能展示。但隨著頁面越改越多，三個問題越來越明顯：
        </p>
        <CaseGrid variant="three" className="ds-case-card-grid">
          {whyCards.map((card) => (
            <CaseCard key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </CaseCard>
          ))}
        </CaseGrid>
        <blockquote className="ds-case-quote">
          把「規則」從人的腦中搬出來，變成 code 和文件都讀得到的單一來源（single source of truth）。
        </blockquote>
      </CaseSection>

      <CaseSection
        id="cs-sec-starting-point"
        kicker="STARTING POINT"
        title="起點：對標成熟系統，用 Figma Make 做第一版"
        surface
      >
        <p className="cs-section-lead">
          不從零發明，先看業界最好的系統長什麼樣。
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
            sizes="(max-width: 768px) calc(100vw - 48px), 1120px"
          />
        </CaseMedia>
      </CaseSection>

      <CaseSection id="cs-sec-turning-points" kicker="TURNING POINTS" title="三次轉折：這個專案真正的主線">
        <p className="cs-section-lead">
          系統不是建好的，是修出來的。每次轉折都逼我改掉一個天真的假設。
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
            <p>{workflowSummary}</p>
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
      </CaseSection>

      <CaseSection id="cs-sec-framework" kicker="FRAMEWORK" title="決策框架：什麼該抽象、什麼不該" surface>
        <p className="cs-section-lead">
          轉折二的核心病因，後來變成一條判斷路徑。不是所有長得像的東西都該共用。
        </p>
        <div className="ds-case-table-frame">
          <table className="ds-case-table">
            <thead>
              <tr>
                <th>看到的訊號</th>
                <th>對應做法</th>
                <th>業界說法</th>
              </tr>
            </thead>
            <tbody>
              {frameworkRows.map(([signal, action, term]) => (
                <tr key={signal}>
                  <th scope="row">{signal}</th>
                  <td>{action}</td>
                  <td>{term}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <blockquote className="ds-case-quote">
          重複的是「值」就 token 化；重複的是「殼」就留 slot；重複的是「整件事」才做成共用元件；只出現一次的，讓它留在原地。
        </blockquote>
      </CaseSection>

      <CaseSection id="cs-sec-evolution-a" kicker="EVOLUTION A" title="演化實例 A：Before / After 版型的三段抽象">
        <p className="cs-section-lead">
          同一個版型寫了三次之後，才動手抽象——而且分三步走，不是一次到位。
        </p>
        <CaseGrid variant="three" className="ds-case-card-grid">
          {evolutionSteps.map((step) => (
            <CaseCard key={step.title}>
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
            sizes="(max-width: 768px) calc(100vw - 48px), 1120px"
          />
        </CaseMedia>
      </CaseSection>

      <CaseSection id="cs-sec-evolution-b" kicker="EVOLUTION B" title="演化實例 B：知道何時「不要」抽象" surface>
        <p className="cs-section-lead">
          成熟的系統不是什麼都共用，而是每個「刻意不共用」都講得出理由。
        </p>
        <p className="cs-section-lead">
          有了共用元件之後，最大的誘惑是把所有長得像的東西都塞進去——那正是翻車的老路。所以每次手癢之前，我強迫自己把「誘惑、判斷、決定」寫下來：
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
            最有代表性的一次：我曾一口氣盤點 8 個「看起來可以抽」的 pattern，<b>結論是一個都不抽</b>。那次盤點的產出不是任何新元件，而是 8 條寫進治理文件的「為什麼不抽」——對我來說，這比多抽三個元件更能證明系統是被「治理」的，不是被「堆」出來的。
          </p>
        </CaseCard>
        <blockquote className="ds-case-quote">
          抽象是有成本的。每多一個共用元件，就多一份契約要維護、多一群頁面被綁在一起。
        </blockquote>
      </CaseSection>

      <CaseSection id="cs-sec-evolution-c" kicker="EVOLUTION C" title="演化實例 C：語意分不清時，先拆文件、不拆 code">
        <p className="cs-section-lead">
          不是每個問題都要用「改 code」來解決。
        </p>
        <p className="cs-section-lead">
          整理全站按鈕時，我卡在一個看起來很小的問題：
        </p>
        <blockquote className="ds-case-quote ds-case-quote--question">
          「View case study」長得像按鈕，那它是 Button 嗎？
        </blockquote>
        <p className="cs-section-lead">
          全站有十幾個這種「像按鈕的東西」，不先分類清楚，之後 token 化和抽元件都會踩空。查證業界做法（W3C、Material Design）後，我把它們拆成四個概念：
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
      </CaseSection>

      <CaseSection id="cs-sec-governance" kicker="GOVERNANCE" title="Governance 與 AI 協作：讓規則管人，也管 AI" surface>
        <p className="cs-section-lead">
          規範如果只存在人腦裡，AI 讀不到，就等於不存在。
        </p>
        <p className="cs-section-lead">
          這套系統比較特別的地方：主要的「使用者」除了我，還有多個 AI agent。治理最後沉澱成兩層，加一本帳：
        </p>
        <CaseGrid variant="two" className="ds-case-card-grid">
          <CaseCard>
            <h3>文件層——AI 動手前必讀</h3>
            <p>
              10 份規格文件（overview、tokens、components、patterns、accessibility、governance…）。元件的職責邊界用 component contract 寫死：哪些 props 可以用、哪些行為不保證、遇到什麼情況必須停下來回報，而不是自己猜。
            </p>
          </CaseCard>
          <CaseCard>
            <h3>流程層——每張工單都有權限邊界</h3>
            <p>
              AI 改 code 一律走分段權限，每張工單白紙黑字寫「這一段只能做什麼、禁止做什麼」：audit 只能看不能改；implementation 不能 commit；commit 只能提交指定檔案；驗證過了才能 push。防的就是 AI「順手」擴大範圍。
            </p>
          </CaseCard>
        </CaseGrid>
        <div className="ds-case-decision-log">
          <h3>決策帳——吵過的架，不吵第二次</h3>
          <p>
            所有標準化決策逐項拍板後寫進治理文件，變成查得到的紀錄。摘幾條實際的：
          </p>
          <ol>
            {decisionLog.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ol>
        </div>
        <blockquote className="ds-case-quote">
          治理的價值不是「管住」，是讓每一次協作都不用重新解釋一遍脈絡。
        </blockquote>
      </CaseSection>

      <CaseSection id="cs-sec-outcome" kicker="OUTCOME" title="產出與防護網">
        <p className="cs-section-lead">
          系統的價值不在建好那一刻，在它能不能防止之後的劣化。先看數字：
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
          再看防護網——劣化會被工具先抓到，不用等人眼：
        </p>
        <CaseGrid variant="three" className="ds-case-card-grid ds-case-guard-grid">
          {guardrails.map((guard) => (
            <CaseCard key={guard.name}>
              <h3 className="ds-case-guard-name">{guard.name}</h3>
              <p>{guard.body}</p>
            </CaseCard>
          ))}
        </CaseGrid>
        <blockquote className="ds-case-quote">
          這一頁本身就是證據：你正在看的這個 case study 頁面，就是用這套系統的 19 個共用元件組出來的——沒有為它新增或修改任何一個共用元件。
        </blockquote>
      </CaseSection>

      <CaseSection id="cs-sec-reflection" kicker="REFLECTION" title="學到什麼" surface>
        <p className="cs-section-lead">
          這個專案最有價值的產出，是那三次轉折，不是最後的系統。
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
        <div className="ds-case-next">
          <h3>下一步</h3>
          <ul>
            {nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
      </CaseSection>
    </CaseStudyShell>
  );
}
