import Image from "next/image";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import "../../styles/case-study-laushu.css";
import {
  CaseSection,
  CaseStudyShell,
  ZoomableImage,
  type TocSection,
} from "../../components/case-study";
import FeatureConnectors from "../advantech/components/FeatureConnectors";
import FeatureImageLightbox from "../advantech/components/FeatureImageLightbox";
import { getNextProject, getProjectBySlug } from "../../data/projects";
import type { Locale } from "../../i18n/routing";
import { createLocalizedMetadata } from "../../lib/metadata";
import { translateLaushu, localizeLaushuTree } from "./i18n";
import { StakeholderFlow, SurveyFlow } from "./components/LaushuDiagrams";

const IMG = "/projects/laushu";
const CONN1 = "/projects/advantech/solution/connector-1.svg";
const CONN2 = "/projects/advantech/solution/connector-2.svg";

const roleItems = [
  { label: "時間", value: ["2024.3 - 2024.6"] },
  { label: "團隊成員", value: ["3x 研究員", "1x 設計師"] },
  { label: "角色", value: ["UX/UI", "設計師"] },
  { label: "負責項目", value: ["線框稿", "互動原型", "協同參與訪談、", "易用性測試"] },
  { label: "工具", value: ["FigJam", "Figma"] },
];

const overviewCards = [
  {
    title: "目標",
    body: "Laushu 勞贖為已上線的數位化勞報單系統。此設計優化專案與其負責人合作，測試現有紙本勞報單數位化的流程易用性，於上線前提供改善建議。",
  },
  {
    title: "需求",
    body: "了解紙本勞報單報帳流程、拆解利害關係人需求，並優化數位化勞報單報帳體驗。",
  },
  {
    title: "原型",
    body: "針對公司發送勞報單給外包人員流程優化設計：包含新建外包人員、建立勞報單、合併勞報單。",
  },
];

const stakeholderCards = [
  { title: "會計師", body: "勞贖主要用戶，透過勞贖寄出勞報單，協助公司供外包工作者確認、彙整勞報資料（會計事務所 / 會計師 / 記帳士）。" },
  { title: "公司使用者", body: "會計事務所的主要服務對象，會計事務所協助公司向旗下外包工作者開立勞報單。" },
  { title: "外包工作者", body: "勞贖的終端用戶，確認勞報單是否成立，並向公司領取工資。" },
  { title: "勞贖管理員", body: "管理會計師帳號。" },
];

const problemCards = [
  { title: "僅作為佐證用", body: "公司外包時，每次都須請外包人員簽署紙本勞報單，但此紙本最後僅作為交易佐證。" },
  { title: "流程繁瑣", body: "流程包含許多細節，像是所得類別、二代健保的計算等，很多創業者不知情下違反規定。" },
  { title: "過程耗時", body: "會計師需人工核對且逐筆建檔；外包人員即使不須進公司，還是必須專程跑一趟公司或郵局。" },
];

const researchTable = {
  head: ["研究流程", "了解現況", "研究分析", "質化分析", "原型 & 測試"],
  rows: [
    {
      label: "研究方法",
      cells: [
        ["脈絡訪查"],
        ["先詢問會計師勞報單流程，接續設計問卷 & 訪談"],
        ["使用者歷程分析", "用例分析", "需求優先級"],
        ["SUS 量表", "任務測試", "易用性測試"],
      ],
    },
    {
      label: "欲收集資料",
      cells: [
        ["報帳操作步驟", "使用軟體", "資料輸入習慣 / 順序"],
        ["使用者動機、行為、目標"],
        ["使用者潛在的需求", "用例重要程度"],
        ["使用者反饋", "系統易用性分數"],
      ],
    },
  ],
};

const interviewGuide = [
  {
    title: "所屬公司工作流程",
    items: [
      { head: "處理勞報起訖過程", body: "建立、發送勞報單到收回領據和最後結果過程。" },
      { head: "工作時間花費、人力需求", body: "執行勞報流程的痛點。" },
    ],
  },
  {
    title: "執行線上勞報系統",
    items: [
      { head: "已知的勞報線上系統", body: "使用線上和實體紙本的經驗差異。" },
      { head: "簽核常見問題、執行線上簽核窒礙點", body: "線上與紙本系統的差異、優點和缺點。" },
    ],
  },
  {
    title: "流程改善的想法",
    items: [
      { head: "法規報稅規定", body: "既有勞報流程執行的必要性。" },
      { head: "內部執行現況", body: "公司內部調整流程的想法、改善預算成本及更動規模評估。" },
    ],
  },
];

const personas = [
  {
    name: "P1 攝影工作室老闆",
    tags: "#許多外包工作 #有長期配合的人員",
    desc: "老闆會自己整理每個外包人員專屬的資料夾，存放勞報單與過去的資料，就像自己建置了一套資料庫。",
    image: `${IMG}/interviewee-p1.png`,
    alt: "Laushu 訪談者一 攝影工作室老闆訪談整理",
    width: 1178,
    height: 1004,
  },
  {
    name: "P2 節目企劃",
    tags: "#有長期配合的人員 #臨時工讀生",
    desc: "對他來說最麻煩的是工讀生很容易忘記帶勞報單；要簽收還得備齊身分證、存摺等證件，常常缺東缺西。",
    image: `${IMG}/interviewee-p2.png`,
    alt: "Laushu 訪談者二 節目企劃訪談整理",
    width: 1178,
    height: 965,
  },
  {
    name: "P3 會計師",
    tags: "#有許多配合的公司 #一年收一次勞報單",
    desc: "因為一年只收一次，很容易發生檔案遺失或忘記存檔的狀況；對他來說，怎麼減少會計師與公司之間的隔閡才是重點。",
    image: `${IMG}/interviewee-p3.png`,
    alt: "Laushu 訪談者三 會計師訪談整理",
    width: 1031,
    height: 881,
  },
];

const keyFlows = [
  { title: "Flow 1：建立外包人員資料庫", body: "便於掌管人員個人資料，日後有需求可立即找人。", image: `${IMG}/people/insight-database.png` },
  { title: "Flow 2：建立勞務報酬單", body: "發送系統連結給外包人員填寫資料 / 回簽。", image: `${IMG}/people/insight-fill.png` },
  { title: "Flow 3：合併多張勞務報酬單", body: "減少回簽次數與調整稅額。", image: `${IMG}/people/insight-merge.png` },
];

const ITER = `${IMG}/iterate`;

const iterBoardHeights: Record<string, number> = {
  [`${ITER}/iterate-1-sort.png`]: 363,
  [`${ITER}/iterate-2-amount.png`]: 314,
  [`${ITER}/iterate-3-filler.png`]: 212,
  [`${ITER}/iterate-4-list.png`]: 363,
  [`${ITER}/iterate-5-send.png`]: 265,
  [`${ITER}/iterate-6-merge.png`]: 363,
};

const iterationBoards = [
  {
    tag: "操作流程 1",
    title: "外包人員名單資訊排序",
    label: "調整欄位優先級，提升人員辨識效率",
    paras: [
      "原本的欄位排序以一般資料欄位為主，將電子郵件與身分證字號放在前段，但在實際查找外包人員時，使用者更需要先確認姓名、戶籍地址與匯款資料，才能快速判斷是否正確對象。",
      "調整後將欄位順序改為「姓名 → 戶籍地址 → 存摺 → 身分證字號 → 電子郵件」，把變動性低、辨識度高，且與付款流程直接相關的資訊提前，降低橫向掃描成本，提升查找與核對效率。",
    ],
    image: `${ITER}/iterate-1-sort.png`,
    alt: "Laushu 設計迭代 外包人員名單欄位排序 Before/After 對照",
  },
  {
    tag: "操作流程 2",
    title: "勞務內容與金額填寫區",
    label: "增加稅額與日期提示，提升金額核對準確性",
    paras: [
      "原本在建立勞務報酬單時，稅額資訊雖然有顯示在金額區塊中，但缺少明確的稅率百分比與文字說明。使用者對於常填寫的類別稅額較熟悉，但遇到不常填的申報類別時，容易忘記適用的扣款規則，導致需要另外查詢或人工確認。",
      "調整後在申報類別旁補上「瞭解更多」說明入口，讓使用者可以查看各類別的扣稅說明；並在付款日期下方加入提醒文字，提示付款日期須晚於勞務期間，避免填寫不合理的付款時間。金額區塊也直接標示代扣所得稅與二代健保的扣款百分比，讓填寫方與核對方都能快速確認計算依據，同時提醒需留意外國人的稅率可能不同，降低金額與稅額核對錯誤的風險。",
    ],
    image: `${ITER}/iterate-2-amount.png`,
    alt: "Laushu 設計迭代 勞務內容與金額填寫區 Before/After 對照",
  },
  {
    tag: "操作流程 3",
    title: "填寫人選擇元件",
    label: "修正填寫人用詞，明確區分資料建立情境",
    paras: [
      "原本在建立勞務報酬單時，「填寫人」區塊使用「請所得人填寫」與「自行填寫」作為選項文字，但「所得人」這個用詞對使用者來說較不直覺，容易不確定是指外包人員、公司內部人員，還是報酬單建立者本人。下方的「新進人員／既有勞務人員」也容易讓人誤解為是否已建立人員資料，而不是在區分外包人員的狀態。",
      "調整後將選項文字修正為「外包人員填寫」與「自行填寫」，直接點出資料由誰填寫，讓使用者能更快理解兩種填寫方式的差異。同時將下方選項改為「首次外包人員／既有外包人員」，明確區分是第一次建立資料的外包人員，還是已存在於名單中的外包人員，降低用詞造成的判斷成本。",
    ],
    image: `${ITER}/iterate-3-filler.png`,
    alt: "Laushu 設計迭代 填寫人選擇元件 Before/After 對照",
  },
  {
    tag: "操作流程 4",
    title: "列表資料呈現區",
    label: "優化資料呈現，快速查看已建立勞報單",
    paras: [
      "原本的勞務報酬單列表雖然已顯示建立日期、姓名、勞務內容、金額與簽收進度，但資料呈現較接近一般清單，缺少能幫助使用者快速判斷時間區間與資料批次的視覺提示。當勞報單數量增加時，使用者需要逐筆掃描日期，才能分辨哪些資料屬於同一年、同一批或需要優先處理的期間，查找效率較低。",
      "調整後強化「建立日期」欄位的辨識度，並以不同年份作為視覺區分，讓使用者能更快掌握勞務報酬單建立時間與資料區間。列表下方也新增分頁設計，避免大量資料一次展開造成閱讀負擔，讓使用者可以分批查看已建立的勞報單。",
    ],
    image: `${ITER}/iterate-4-list.png`,
    alt: "Laushu 設計迭代 列表資料呈現區 Before/After 對照",
  },
  {
    tag: "操作流程 5",
    title: "寄出確認視窗",
    label: "增加預覽狀態，降低寄出前的不確定感",
    paras: [
      "原本在建立勞務報酬單時，使用者填完資料後會直接進入寄出通知信的編輯視窗，雖然可以修改信件標題與內容，但無法在寄出前完整預覽勞報單實際內容。對使用者來說，這會產生「資料是否正確填寫」、「寄出去後對方會看到什麼」的不確定感，尤其勞務報酬單涉及姓名、地址、金額、稅額與付款日期等重要資訊，若沒有最後確認步驟，寄出前容易感到緊張。",
      "調整後在寄出前新增「預覽文件」狀態，讓使用者可以先從信件編輯進入勞報單預覽畫面，完整檢查基本資料、勞務內容、勞務金額與相關填寫資訊是否正確。確認無誤後，再按下確認按鈕完成寄出。",
    ],
    image: `${ITER}/iterate-5-send.png`,
    alt: "Laushu 設計迭代 寄出確認視窗 Before/After 對照",
  },
  {
    tag: "操作流程 6",
    title: "合併清單顯示",
    label: "優化合併勞報單功能，清楚顯示合併清單",
    paras: [
      "原本在合併多張勞報單時，使用者點選要合併的項目後，列表中只以一般文字或單列資料呈現合併結果，較難清楚辨識哪些勞報單已被納入同一張合併單。尤其當同一位外包人員有多筆不同日期或不同勞務內容的資料時，使用者需要重新比對清單，才能確認目前合併的是哪幾筆資料，增加核對成本。",
      "調整後將已合併的勞報單以群組方式呈現，並透過底色區塊清楚標示合併範圍，讓使用者可以一眼看出哪些資料被收合在同一張合併單中。同時在備註欄補上合併單號與合併狀態，讓合併後的資料來源與關聯性更明確。",
    ],
    image: `${ITER}/iterate-6-merge.png`,
    alt: "Laushu 設計迭代 合併清單顯示 Before/After 對照",
  },
];

const PROTO = `${IMG}/proto`;

const prototypeFlows = [
  {
    tag: "Flow 1",
    title: "建立外包人員資料庫",
    sub: "把外包人員的基本與付款資料建檔成資料庫，日後建立勞報單可直接帶入，免去重複輸入。",
    steps: [
      { note: "進入「外包人員名單」，可瀏覽已建檔的外包人員，點「新建人員」開始建立。", image: `${PROTO}/create-1-list.png`, alt: "Laushu 建立外包人員 名單頁" },
      { note: "填寫基本資料（姓名、電子郵件、身分證字號、戶籍地址…）與付款資料（支付方式、銀行帳號），並上傳身分證、存摺封面。", image: `${PROTO}/create-2-form.png`, alt: "Laushu 建立外包人員 新建表單" },
      { note: "資料填寫完成、證件上傳後，點「儲存並離開」完成建檔。", image: `${PROTO}/create-3-saved.png`, alt: "Laushu 建立外包人員 完成填寫" },
      { note: "回到名單，新建的「王明明」已加入資料庫，日後建立勞報單可直接選用。", image: `${PROTO}/create-4-added.png`, alt: "Laushu 建立外包人員 名單新增成員" },
    ],
  },
  {
    tag: "Flow 2",
    title: "建立勞務報酬單",
    sub: "協助公司建立勞報單，系統自動計算稅額，再寄出確認信給外包人員線上簽收。",
    steps: [
      { note: "進入「勞務報酬單」頁面，點「建立勞報單」開始。", image: `${PROTO}/bill-1-list.png`, alt: "Laushu 建立勞報單 清單頁" },
      { note: "選擇填寫人（自行填寫 / 外包人員填寫），填寫基本資料、勞務內容與金額；系統自動帶出所得稅與二代健保。", image: `${PROTO}/bill-2-form.png`, alt: "Laushu 建立勞報單 表單填寫" },
      { note: "帶入存摺封面與完整金額明細，確認「實付給所得人」金額後準備寄出。", image: `${PROTO}/bill-3-preview.png`, alt: "Laushu 建立勞報單 金額明細與預覽" },
      { note: "點「填寫完畢，寄出確認信」跳出視窗，可用預設訊息或自訂信件主旨與內文，並預覽文件。", image: `${PROTO}/bill-4-alert.png`, alt: "Laushu 建立勞報單 編輯確認信視窗" },
      { note: "系統將勞報單寄到所得人 email 簽收，並提醒對方在期限前完成簽收。", image: `${PROTO}/bill-5-sent.png`, alt: "Laushu 建立勞報單 確認信已寄出" },
      { note: "回到勞報單清單，剛建立的單據已加入，可追蹤後續簽收狀態。", image: `${PROTO}/bill-6-list.png`, alt: "Laushu 建立勞報單 清單更新" },
    ],
  },
  {
    tag: "Flow 3",
    title: "合併多張勞務報酬單",
    sub: "測試驗證後的合併流程：合併多筆勞報資料、清楚呈現細項，減少回簽次數與稅務整理時間。",
    steps: [
      { note: "進入「勞務報酬單」頁面，輸入外包人員姓名後按下搜尋。", image: `${PROTO}/merge-1-search.png`, alt: "Laushu 合併流程 搜尋外包人員勞報單" },
      { note: "勾選要合併的多筆勞報單，右上方即時顯示已勾選筆數與「確認合併」。", image: `${PROTO}/merge-2-select.png`, alt: "Laushu 合併流程 勾選欲合併的勞報單" },
      { note: "若勾選的勞務內容不相同，系統會跳出 alert 提醒，不可合併。", image: `${PROTO}/merge-3-alert.png`, alt: "Laushu 合併流程 內容不同時的 alert 提醒" },
      { note: "合併第一張：外國人稅率不同時系統提醒、勞健保代扣需填 ％ 數、付款日期提醒；因為一起匯款，只需要一個支付方式。", image: `${PROTO}/merge-4-detail.png`, alt: "Laushu 合併流程 合併單據細節編輯" },
      { note: "點選合併項目可展開，檢視被合併的每一張單張。", image: `${PROTO}/merge-5-expand.png`, alt: "Laushu 合併流程 展開檢視合併單張" },
    ],
  },
];

const demoItems = [
  { title: "Flow 1：建立外包人員資料庫", body: "快速新增、查找與管理外包人員資料，降低後續建立勞報單時的重複輸入。", video: `${IMG}/demo/EXKqZMroni8.mp4`, poster: `${IMG}/demo/demo-01-poster.jpg`, duration: "00:12" },
  { title: "Flow 2：建立勞務報酬單", body: "協助公司建立勞務報酬單，發送系統連結給外包人員填寫資料並完成回簽。", video: `${IMG}/demo/EzwEWYr2QgQ.mp4`, poster: `${IMG}/demo/demo-02-poster.jpg`, duration: "00:22" },
  { title: "Flow 3：合併多張勞務報酬單", body: "合併多筆勞報資料並清楚呈現細項，減少回簽次數與稅務整理時間。", video: `${IMG}/demo/WpLXr671epg.mp4`, poster: `${IMG}/demo/demo-03-poster.jpg`, duration: "00:44" },
];

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const project = getProjectBySlug("laushu", locale);
  const description = project.seoDescription ?? project.description;
  return createLocalizedMetadata(locale, "/laushu", {
    en: { title: project.title, description },
    "zh-TW": { title: project.title, description },
  });
}

export default async function LaushuPage() {
  const locale = (await getLocale()) as Locale;
  const t = (text: string) => translateLaushu(locale, text);
  const project = getProjectBySlug("laushu", locale);
  const nextProject = getNextProject(project.slug, locale);

  const tocSections: TocSection[] = [
    { id: "cs-sec-overview", title: t("專案總覽") },
    { id: "cs-sec-problem", title: t("問題定義") },
    { id: "cs-sec-understand", title: t("了解使用者情境") },
    { id: "cs-sec-converge", title: t("收斂與洞察") },
    { id: "cs-sec-iterate", title: t("測試與設計迭代") },
    { id: "cs-sec-prototype", title: t("原型設計") },
    { id: "cs-sec-demo", title: t("成果 Demo") },
    { id: "cs-sec-reflection", title: t("學習反思") },
  ];

  return (
    <CaseStudyShell
      theme="theme-laushu"
      tocSections={tocSections}
      nextNav={{
        nextHref: nextProject.status === "published" ? nextProject.href : undefined,
        homeLabel: t("返回首頁"),
        nextLabel: `${t("下一個專案")}${t("：")}${nextProject.title}`,
      }}
      hero={localizeLaushuTree(locale, HeroSection())}
    >
      {localizeLaushuTree(locale, OverviewSection())}
      {localizeLaushuTree(locale, ProblemSection())}
      {localizeLaushuTree(locale, UnderstandSection())}
      {localizeLaushuTree(locale, ConvergeSection())}
      {localizeLaushuTree(locale, IterateSection())}
      {localizeLaushuTree(locale, PrototypeSection())}
      {localizeLaushuTree(locale, DemoSection())}
      {localizeLaushuTree(locale, ReflectionSection())}
    </CaseStudyShell>
  );
}

function HeroSection() {
  return (
    <section>
      <div className="cs-hero-cover laushu-hero-cover">
        <div className="cs-hero-cover-img">
          <Image src={`${IMG}/hero-cover.png`} alt="Laushu 勞贖設計優化專案主視覺" fill sizes="100vw" priority />
        </div>
      </div>
      <div className="cs-hero-info laushu-hero-info">
        <div className="cs-hero-meta">
          <span className="cs-tags">WEB・SaaS・UX Research・UI Design</span>
        </div>
        <h1 className="cs-title">Laushu 勞贖｜勞務報酬系統設計優化</h1>
        <p className="laushu-hero-lead">
          檢視目前紙本勞報單使用流程，透過訪談、設計與測試，優化勞贖勞報數位化系統，針對發送勞報單流程，提供設計體驗優化建議。
        </p>
        <div className="cs-info-row laushu-info-row">
          {roleItems.map((item) => (
            <div className="cs-info-card" key={item.label}>
              <span className="cs-info-label">{item.label}</span>
              <span className="cs-info-value">
                {item.value.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < item.value.length - 1 ? <br /> : null}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OverviewSection() {
  return (
    <CaseSection id="cs-sec-overview" title="專案總覽 Overview" className="laushu-overview-section">
      <div className="laushu-overview-intro">
        <h3>將紙本勞報單流程轉譯成可測試、可上線的數位體驗。</h3>
        <p>
          專案核心不是單純把紙本表單搬到線上，而是先拆解會計師、公司、外包工作者與管理員之間的任務關係，再把最影響效率的流程整理成可操作的產品原型。
        </p>
      </div>
      <div className="laushu-summary-grid">
        {overviewCards.map((card) => (
          <InfoCard title={card.title} key={card.title}>{card.body}</InfoCard>
        ))}
      </div>
      <figure className="laushu-overview-hero">
        <Image
          src={`${IMG}/overview-hero.png`}
          alt="Laushu 勞務報酬系統介面總覽"
          width={2268}
          height={1376}
          sizes="(max-width: 768px) calc(100vw - 48px), 1440px"
        />
      </figure>
    </CaseSection>
  );
}

function ProblemSection() {
  return (
    <CaseSection id="cs-sec-problem" title="問題定義 Problem" surface className="laushu-problem-section">
      <div className="laushu-problem-layout">
        <div className="laushu-problem-copy">
          <span className="laushu-section-tag">Pain Point</span>
          <h3>過去建立紙本勞報單費時費力，但最後紙本單據僅作為佐證用。</h3>
          <p>
            勞務報酬單，簡稱「勞報單」，為公司支付「酬勞」給「個人」時使用的證明單據，可作為公司支出的證明，並列入領到酬勞者的綜合所得稅中。
          </p>
        </div>
        <figure className="laushu-form-card">
          <ImageBlock src={`${IMG}/labor-form-example.png`} alt="勞務報酬單範例" variant="plain" />
          <figcaption>勞報單範例</figcaption>
        </figure>
      </div>
      <div className="laushu-problem-grid">
        {problemCards.map((card, index) => (
          <InfoCard title={card.title} number={`0${index + 1}`} key={card.title}>{card.body}</InfoCard>
        ))}
      </div>
    </CaseSection>
  );
}

function UnderstandSection() {
  return (
    <CaseSection id="cs-sec-understand" title="了解使用者情境 Understand" className="laushu-process-section">
      <ArticleBlock title="彙整使用勞報單流程" kicker="收集">
        <p>訪談勞贖負責人並自行收集資料，了解外包與勞報單簽署流程，釐清會計師、公司、外包工作者三者關係。此平台至少包含四種核心利害關係人：</p>
      </ArticleBlock>
      <div className="laushu-stakeholder-grid">
        {stakeholderCards.map((card, index) => (
          <InfoCard title={card.title} number={`0${index + 1}`} key={card.title}>{card.body}</InfoCard>
        ))}
      </div>
      {StakeholderFlow()}

      <ArticleBlock title="制定研究策略" kicker="規劃">
        <p>為後續設計研究制定執行策略，從了解現況、研究分析、質化分析到原型與測試。</p>
      </ArticleBlock>
      {ResearchTable()}

      <ArticleBlock title="篩選受訪者" kicker="問卷">
        <p>設計問卷篩選受訪者，了解目前勞報單填寫過程中，哪些環節感到繁雜（會計師：建立 → 發送 → 回收 → 彙整）。</p>
      </ArticleBlock>
      {SurveyFlow({ note: <p>了解目前勞報單填寫過程中，哪些過程感到繁雜。<br />會計師：建立 → 發送 → 回收 → 彙整。</p> })}

      <ArticleBlock title="訪談大綱" kicker="訪談">
        <p>共搜集 39 份有效問卷，篩選三位受訪者，圍繞以下三個面向深入訪談：</p>
      </ArticleBlock>
      <div className="laushu-guide-grid">
        {interviewGuide.map((group) => (
          <article className="laushu-guide-card" key={group.title}>
            <h4>{group.title}</h4>
            <ul>
              {group.items.map((item) => (
                <li key={item.head}>
                  <strong>{item.head}</strong>
                  <span>{item.body}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <ArticleBlock title="三位受訪者的訪談整理" kicker="摘要">
        <p>下面整理三位受訪者的訪談摘要，從資料管理、會計配合到勞報單流程，盤點他們各自的經手方式與最有感的痛點。</p>
      </ArticleBlock>
      <div className="laushu-persona-list">
        {personas.map((p) => (
          <div className="laushu-persona" key={p.name}>
            <div className="laushu-persona-copy">
              <strong>{p.name}</strong>
              <span className="laushu-persona-tags">{p.tags}</span>
              <p>{p.desc}</p>
            </div>
            <ZoomableImage
              src={p.image}
              alt={p.alt}
              width={p.width}
              height={p.height}
              labels={{ close: "關閉放大圖片", separator: "：", zoom: "點擊放大" }}
            />
          </div>
        ))}
      </div>
    </CaseSection>
  );
}

function ConvergeSection() {
  return (
    <CaseSection id="cs-sec-converge" title="收斂與洞察 Converge" surface className="laushu-process-section">
      <ArticleBlock title="彙整流程 & 重塑 TA" kicker="洞察">
        <p>挖掘使用者在建立、發放、回簽、建檔勞報單流程中的痛點，並首先聚焦會自己經手勞報單的公司端。</p>
      </ArticleBlock>
      <figure className="laushu-journey">
        <ZoomableImage
          src={`${IMG}/labor-form-flow-1.png`}
          alt="Laushu 勞報單使用者歷程 journey map"
          width={1600}
          height={620}
          labels={{ close: "關閉放大圖片", separator: "：", zoom: "點擊放大" }}
        />
        <figcaption>以前兩位受訪者為主，盤點建立 → 發放 → 回簽 → 建檔的完整歷程與痛點</figcaption>
      </figure>
      <ArticleBlock title="重要用例">
        <p>收斂訪談洞見後，使用者最在意、也覺得紙本勞報單最麻煩的三件事：如何有效管理人員、如何改善簽收確認、如何減少回簽次數。據此彙整三個重要用例，進行後續介面流程設計。</p>
      </ArticleBlock>
      <div className="laushu-usecase-grid">
        {keyFlows.map((item) => (
          <InfoCard title={item.title} image={item.image} key={item.title}>{item.body}</InfoCard>
        ))}
      </div>
    </CaseSection>
  );
}

function FcNode({ type, children }: { type: "page" | "action" | "decision"; children: ReactNode }) {
  return (
    <div className={`laushu-fc-node laushu-fc-node--${type}`}>
      <span>{children}</span>
    </div>
  );
}

function FcArrow({ label }: { label?: string }) {
  return (
    <div className="laushu-fc-arrow" aria-hidden="true">
      {label ? <span className="laushu-fc-arrow-label">{label}</span> : null}
      <span className="laushu-fc-arrow-line" />
    </div>
  );
}

function TaskFlowChart({ tag, title, children, note }: { tag: string; title: string; children: ReactNode; note: string }) {
  return (
    <figure className="laushu-fc-figure">
      <figcaption className="laushu-fc-cap">
        <span className="laushu-fc-badge">{tag}</span>
        <span className="laushu-fc-title">{title}</span>
      </figcaption>
      <div className="laushu-fc-scroll">
        <div className="laushu-fc-track">{children}</div>
      </div>
      <p className="laushu-fc-note">{note}</p>
    </figure>
  );
}

function TaskFlow1() {
  return (
    <TaskFlowChart
      tag="操作流程 1"
      title="建立外包人員資料庫，便於掌管人員個人資料"
      note="↩ 「儲存」後返回外包人員資料頁；「編輯／查看人員頁」返回人員業務頁；「儲存並建立勞報單」接續建立勞報單流程。"
    >
      <FcNode type="page">外包人員資料頁</FcNode>
      <FcArrow />
      <div className="laushu-fc-rows">
        <div className="laushu-fc-row">
          <FcNode type="action">建立人員勞報單</FcNode>
          <FcArrow />
          <FcNode type="page">建立勞報單頁</FcNode>
        </div>
        <div className="laushu-fc-row">
          <FcNode type="action">新增外包人員</FcNode>
          <FcArrow />
          <FcNode type="page">新增人員頁</FcNode>
          <FcArrow />
          <FcNode type="action">填寫身份資料</FcNode>
          <FcArrow />
          <FcNode type="decision">是否已有相同身分證字號</FcNode>
          <div className="laushu-fc-rows">
            <div className="laushu-fc-row">
              <FcArrow label="否" />
              <FcNode type="action">上傳身分證存摺影本</FcNode>
              <div className="laushu-fc-rows">
                <div className="laushu-fc-row"><FcArrow /><FcNode type="action">儲存並建立勞報單</FcNode></div>
                <div className="laushu-fc-row"><FcArrow /><FcNode type="action">儲存</FcNode></div>
              </div>
            </div>
            <div className="laushu-fc-row">
              <FcArrow label="是" />
              <FcNode type="action">系統提醒曾建立過</FcNode>
            </div>
          </div>
        </div>
        <div className="laushu-fc-row">
          <FcNode type="action">查看業務</FcNode>
          <FcArrow />
          <FcNode type="page">人員業務頁</FcNode>
          <div className="laushu-fc-rows">
            <div className="laushu-fc-row"><FcArrow /><FcNode type="action">編輯個人資料</FcNode><FcArrow /><FcNode type="page">編輯人員頁</FcNode></div>
            <div className="laushu-fc-row"><FcArrow /><FcNode type="action">查看個人資料</FcNode><FcArrow /><FcNode type="page">查看人員頁</FcNode></div>
          </div>
        </div>
      </div>
    </TaskFlowChart>
  );
}

function TaskFlow2() {
  const rows: { who: string; fill: string }[] = [
    { who: "建立勞報單（所得人填寫）", fill: "填寫資料：基本資料、勞報內容與金額、付款資訊" },
    { who: "建立勞報單（公司客戶填寫・新增外包人員）", fill: "填寫資料：基本資料、勞報內容與金額、付款資訊" },
    { who: "建立勞報單（公司客戶填寫・既有外包人員）", fill: "填寫資料：接待姓名、勞報內容與金額" },
  ];
  return (
    <TaskFlowChart
      tag="操作流程 2"
      title="建立勞務報酬單，發送系統連結給外包人員填寫資料 / 回簽"
      note="↩ 流程中可「儲存並返回」勞務報酬單頁面；點選「寄出確認信」後返回首頁，並發送信件給外包人員。"
    >
      <FcNode type="page">勞務報酬單頁面</FcNode>
      <FcArrow />
      <div className="laushu-fc-rows">
        {rows.map((r, i) => (
          <div className="laushu-fc-row" key={i}>
            <FcNode type="action">{r.who}</FcNode>
            <FcArrow />
            <FcNode type="page">建立勞務報酬單頁面</FcNode>
            <FcArrow />
            <FcNode type="action">{r.fill}</FcNode>
          </div>
        ))}
      </div>
      <FcArrow />
      <FcNode type="action">點擊「填寫完畢」</FcNode>
      <FcArrow />
      <FcNode type="page">編輯發送信件頁面</FcNode>
      <FcArrow />
      <FcNode type="action">點選「寄出確認信」</FcNode>
    </TaskFlowChart>
  );
}

function TaskFlow3() {
  return (
    <TaskFlowChart
      tag="操作流程 3"
      title="合併多張勞務報酬單，減少回簽次數與調整稅額"
      note="↩ 「是否超過兩萬」為否、或「單張確認頁」確認後，皆進入「寄送簽收」。"
    >
      <FcNode type="action">承辦人建立外包人員資訊</FcNode>
      <FcArrow />
      <FcNode type="page">承辦人建立勞報單頁</FcNode>
      <FcArrow />
      <FcNode type="action">活動結束，承辦人執行支付款項</FcNode>
      <FcArrow />
      <FcNode type="page">搜尋外包者姓名</FcNode>
      <FcArrow />
      <FcNode type="page">勾選同一外包者的多張勞報單</FcNode>
      <FcArrow />
      <FcNode type="action">合併</FcNode>
      <FcArrow />
      <FcNode type="page">選擇單張、確認合併</FcNode>
      <FcArrow />
      <FcNode type="decision">是否超過兩萬</FcNode>
      <FcArrow label="是" />
      <FcNode type="page">文字提醒：代扣二代健保</FcNode>
      <FcArrow />
      <FcNode type="decision">是否拆單</FcNode>
      <FcArrow label="是" />
      <FcNode type="page">單張確認頁</FcNode>
      <FcArrow />
      <FcNode type="action">寄送簽收</FcNode>
    </TaskFlowChart>
  );
}

function IterateSection() {
  return (
    <CaseSection id="cs-sec-iterate" title="測試與設計迭代 Iterate" className="laushu-process-section">
      <ArticleBlock title="任務測試與易用性量表">
        <p>邀請上次接受訪談的 2 位受訪者再次進行介面評估。針對三個重要用例繪製流程圖，透過 Figma 原型讓受訪者以放聲思考法完成任務測試，並填寫 SUS 易用性量表。</p>
        <ul>
          <li>節目企劃：長期需要外包主持人</li>
          <li>攝影工作室老闆：長期需要外包攝影師合作拍攝</li>
        </ul>
        <p>針對三個重要用例繪製任務流程圖，作為原型測試的腳本依據（手機可左右滑動檢視）。</p>
      </ArticleBlock>
      <div className="laushu-fc-list">
        {TaskFlow1()}
        {TaskFlow2()}
        {TaskFlow3()}
      </div>
      <ArticleBlock title="設計迭代與元件迭代">
        <p>依任務測試發現的問題，逐一調整介面流程與元件用詞。下面以 Before / After 對照，呈現每個操作流程的調整重點。</p>
      </ArticleBlock>
      <div className="laushu-iter-list">
        {iterationBoards.map((board) => (
          <article className="laushu-iter-board" key={board.title}>
            <header className="laushu-iter-head">
              <span className="laushu-iter-badge">{board.tag}</span>
              <h3 className="laushu-iter-title">{board.title}</h3>
            </header>
            <div className="laushu-iter-body">
              <p className="laushu-iter-label">{board.label}</p>
              <div className="laushu-iter-paras">
                {board.paras.map((p, i) => (<p key={i}>{p}</p>))}
              </div>
            </div>
            <ZoomableImage
              src={board.image}
              alt={board.alt}
              width={896}
              height={iterBoardHeights[board.image] ?? 363}
              className="laushu-iter-figure"
              labels={{ close: "關閉放大圖片", separator: "：", zoom: "點擊放大" }}
            />
          </article>
        ))}
      </div>
      <ArticleBlock title="測試結果">
        <p>根據任務測試與 SUS 分數收斂迭代方向，作為最終 Hi-fi 原型的設計依據。</p>
        <ImageBlock src={`${IMG}/test-result.png`} alt="Laushu 任務測試與 SUS 結果" />
      </ArticleBlock>
    </CaseSection>
  );
}

function PrototypeSection() {
  return (
    <CaseSection id="cs-sec-prototype" title="原型設計 Prototype" surface className="laushu-prototype-section">
      <p className="cs-body-muted" style={{ marginBottom: 40 }}>
        根據測試結果迭代完成 Hi-fi 原型，聚焦三條核心流程：建立外包人員、建立勞報單、合併勞報單。
      </p>
      <FeatureImageLightbox src={`${IMG}/figma-design.png`} alt="Laushu Hi-fi 原型設計總覽" width={1472} height={793} className="laushu-proto-overview" />
      <FeatureConnectors />
      <div className="cs-sol-block laushu-proto-block">
        {prototypeFlows.map((flow, gi) => (
          <div className="cs-sol-fgroup laushu-proto-group" key={flow.tag}>
            {gi > 0 ? <div className="cs-sol-fhr" /> : null}
            <div className="cs-sol-fc">
              <div className="cs-sol-fchead">
                <p className="cs-sol-ftitle">{`${flow.tag}｜${flow.title}`}</p>
              </div>
              <div className="cs-sol-fcbody">
                <p className="cs-sol-fsub">{flow.sub}</p>
              </div>
            </div>
            {flow.steps.map((step, i) => (
              <ProtoStep key={step.image} step={step} index={i} isLast={i === flow.steps.length - 1} />
            ))}
          </div>
        ))}
      </div>
    </CaseSection>
  );
}

function ProtoStep({
  step,
  index,
  isLast,
}: {
  step: { note: string; image: string; alt: string };
  index: number;
  isLast: boolean;
}) {
  const flip = index % 2 === 1;
  return (
    <>
      <div className="cs-sol-fr cs-sol-fr-mid">
        {flip ? (
          <>
            <div className="cs-sol-fimg">
              <FeatureImageLightbox src={step.image} alt={step.alt} width={1440} height={1024} />
            </div>
            <div className="cs-sol-fnote"><p>{step.note}</p></div>
          </>
        ) : (
          <>
            <div className="cs-sol-fnote"><p>{step.note}</p></div>
            <div className="cs-sol-fimg">
              <FeatureImageLightbox src={step.image} alt={step.alt} width={1440} height={1024} />
            </div>
          </>
        )}
      </div>
      {!isLast ? (
        <div className="cs-sol-fconn" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element -- connector SVG is resized at runtime by FeatureConnectors JS */}
          <img src={index % 2 === 0 ? CONN1 : CONN2} alt="" suppressHydrationWarning />
        </div>
      ) : null}
    </>
  );
}

function DemoSection() {
  return (
    <CaseSection id="cs-sec-demo" title="成果 Demo" className="laushu-demo-section">
      <div className="laushu-demo-list">
        {demoItems.map((item, index) => (
          <article className="laushu-demo-card" key={item.title}>
            <div className="laushu-demo-media">
              <div className="laushu-demo-meta">
                <span>{`0${index + 1}`}</span>
                <span>{item.duration}</span>
              </div>
              <video className="laushu-demo-video" controls preload="metadata" poster={item.poster} playsInline>
                <source src={item.video} type="video/mp4" />
              </video>
            </div>
            <div className="laushu-demo-copy">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </CaseSection>
  );
}

const reflections = [
  {
    title: "從使用者出發的線上化策略思考",
    body: "設計線上化流程時，首要是釐清哪些是不可或缺的核心步驟，哪些可轉化為更便捷的數位形式。唯有從使用者需求出發，才能真正掌握該數位化的重點功能。本專案因時間限制，優先聚焦核心利害關係人——公司端——進行流程盤點與優化。實作過程中也意識到，專案要真正推動上線，需進一步納入更多商業面向與跨部門的決策考量。",
  },
  {
    title: "介面用詞與說明，本身就是體驗",
    body: "勞報單牽涉稅率、申報類別、二代健保這些專業概念，使用者不見得懂。回頭看會發現很多次迭代其實都在「改用詞」和「補說明」——像把不直覺的「所得人」換成看得懂的講法、在容易卡住的地方補一句解釋、把扣稅百分比直接標出來。這讓我體會到：介面文字本身就是體驗的一部分，把專業術語翻成使用者的語言，常常比多加一個功能更能降低操作門檻。",
  },
  {
    title: "用可驗證的小步迭代推進設計",
    body: "Laushu 是已經上線的系統，這次是在既有架構上做優化，而不是從零重來。過程中要一邊尊重原本的流程與限制，一邊找出真正值得改的地方。透過放聲思考測試加上 SUS 量表去驗證每一次調整，讓我學會用「可以被驗證的小步迭代」往前推，而不是一次大改；也更清楚設計要能落地，得把開發成本與既有限制一起算進來。",
  },
];

function ReflectionSection() {
  return (
    <CaseSection id="cs-sec-reflection" title="學習反思 Reflections" surface className="laushu-learning-section">
      <div className="laushu-learning-grid">
        {reflections.map((r) => (
          <div className="laushu-learning-card" key={r.title}>
            <h3 className="laushu-learning-title">{r.title}</h3>
            <p>{r.body}</p>
          </div>
        ))}
      </div>
    </CaseSection>
  );
}

function ResearchTable() {
  return (
    <div className="laushu-table-wrap">
      <table className="laushu-research-table">
        <thead>
          <tr>
            {researchTable.head.map((h, i) => (
              <th key={h} className={i === 0 ? "laushu-th-corner" : undefined}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {researchTable.rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              {row.cells.map((cell, ci) => (
                <td key={ci}>
                  <ul>
                    {cell.map((c) => (<li key={c}>{c}</li>))}
                  </ul>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InfoCard({ title, number, image, children }: { title: string; number?: string; image?: string; children: ReactNode }) {
  return (
    <article className={`laushu-info-card${image ? " laushu-info-card--illustrated" : ""}`}>
      {number ? <span>{number}</span> : null}
      {image ? (
        <span className="laushu-info-card-art" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" loading="lazy" />
        </span>
      ) : null}
      <h4>{title}</h4>
      <p>{children}</p>
    </article>
  );
}

function ArticleBlock({ title, kicker, children }: { title: string; kicker?: string; children: ReactNode }) {
  return (
    <section className="laushu-article">
      {kicker ? <p className="laushu-kicker">{kicker}</p> : null}
      <h3>{title}</h3>
      <div className="laushu-copy">{children}</div>
    </section>
  );
}

function ImageBlock({
  src,
  alt,
  variant = "default",
}: {
  src: string;
  alt: string;
  variant?: "default" | "plain" | "wide" | "flush";
}) {
  return (
    <div className={`laushu-image-frame laushu-image-frame--${variant}`}>
      <Image src={src} alt={alt} width={1472} height={828} sizes="(max-width: 768px) calc(100vw - 48px), 960px" />
    </div>
  );
}
