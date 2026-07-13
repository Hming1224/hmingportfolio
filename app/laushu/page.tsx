import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import "../../styles/case-study-laushu.css";
import {
  BeforeAfterNarrativeFrame,
  CaseCard,
  CaseFeatureRow,
  CaseFlowFrame,
  CaseGrid,
  CaseMedia,
  CaseStudyShell,
  FlowScrollHint,
  ZoomableImage,
  type TocSection,
} from "../../components/case-study";
import FeatureConnectors from "../../components/case-study/FeatureConnectors";
import FeatureImageLightbox from "../advantech/components/FeatureImageLightbox";
import { getNextProject, getProjectBySlug } from "../../data/projects";
import type { Locale } from "../../i18n/routing";
import { createLocalizedMetadata } from "../../lib/metadata";
import { translateLaushu, localizeLaushuTree } from "./i18n";
import {
  StakeholderFlow,
  SurveyFlow,
  SurveyInsight,
  SurveyStats,
} from "./components/LaushuDiagrams";
import {
  TaskFlowOneDiagram,
  TaskFlowThreeDiagram,
  TaskFlowTwoDiagram,
} from "./components/TaskFlowDiagrams";
import { HeroSection, OverviewSection, ProblemSection, ReflectionSection } from "./sections";
import { ArticleBlock, InfoCard, LaushuHead } from "./components/LaushuPrimitives";

const IMG = "/projects/laushu";
const CONN1 = "/projects/advantech/solution/connector-1.svg";
const CONN2 = "/projects/advantech/solution/connector-2.svg";

const stakeholderCards = [
  { title: "會計師", body: "勞贖主要使用者，透過勞贖寄出勞報單，協助公司供外包工作者確認、彙整勞報資料（會計事務所 / 會計師 / 記帳士）。" },
  { title: "公司使用者", body: "會計事務所的主要服務對象，會計事務所協助公司向旗下外包工作者開立勞報單。" },
  { title: "外包工作者", body: "勞贖的終端使用者，確認勞報單是否成立，並向公司領取工資。" },
  { title: "勞贖管理員", body: "管理會計師帳號。" },
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
        ["使用者回饋", "系統易用性分數"],
      ],
    },
  ],
};

const surveyProfile = [
  { label: "一般公司會計", value: 71.1 },
  { label: "會計師", value: 10.5 },
  { label: "記帳士", value: 7.9 },
  { label: "其他", value: 10.5 },
];

const surveyExperience = [
  { label: "未滿 1 年", value: 10.5 },
  { label: "1–未滿 3 年", value: 42.1 },
  { label: "3–未滿 5 年", value: 18.4 },
  { label: "5 年以上", value: 28.9 },
];

const surveyVolume = [
  { label: "10 份以下", value: 23.7 },
  { label: "11–50 份", value: 36.8 },
  { label: "51–200 份", value: 26.3 },
  { label: "201 份以上", value: 13.2 },
];

const surveyStepQuotes = [
  "照著填就好",
  "電子化後變得很輕鬆",
  "存檔超簡單",
  "公司已有固定 SOP",
];

const surveyPainQuotes = [
  "整體而言有點麻煩",
  "等待回簽、追蹤進度比較麻煩",
  "大量收回勞報單時，處理就會很麻煩",
  "蠻花時間，也覺得很無趣",
];

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

const iterationBoards = [
  {
    tag: "操作流程 1",
    title: "外包人員名單資訊排序",
    label: "調整欄位優先級，提升人員辨識效率",
    paras: [
      "原本的欄位排序以一般資料欄位為主，將電子郵件與身分證字號放在前段，但在實際查找外包人員時，使用者更需要先確認姓名、戶籍地址與匯款資料，才能快速判斷是否正確對象。",
      "調整後將欄位順序改為「姓名 → 戶籍地址 → 存摺 → 身分證字號 → 電子郵件」，把變動性低、辨識度高，且與付款流程直接相關的資訊提前，降低橫向掃描成本，提升查找與核對效率。",
    ],
    before: {
      src: `${ITER}/ui-sort-before.png`,
      width: 1440,
      height: 1024,
    },
    after: {
      src: `${ITER}/ui-sort-after.png`,
      width: 1440,
      height: 1024,
    },
    alt: "Laushu 設計迭代 外包人員名單欄位排序",
  },
  {
    tag: "操作流程 2",
    title: "勞務內容與金額填寫區",
    label: "增加稅額與日期提示，提升金額核對準確性",
    paras: [
      "原本在建立勞務報酬單時，稅額資訊雖然有顯示在金額區塊中，但缺少明確的稅率百分比與文字說明。使用者對於常填寫的類別稅額較熟悉，但遇到不常填的申報類別時，容易忘記適用的扣款規則，導致需要另外查詢或人工確認。",
      "調整後在申報類別旁補上「瞭解更多」說明入口，讓使用者可以查看各類別的扣稅說明；並在付款日期下方加入提醒文字，提示付款日期須晚於勞務期間，避免填寫不合理的付款時間。金額區塊也直接標示代扣所得稅與二代健保的扣款百分比，讓填寫方與核對方都能快速確認計算依據，同時提醒需留意外國人的稅率可能不同，降低金額與稅額核對錯誤的風險。",
    ],
    before: {
      src: `${ITER}/ui-amount-before.png`,
      width: 1440,
      height: 821,
    },
    after: {
      src: `${ITER}/ui-amount-after.png`,
      width: 1440,
      height: 821,
    },
    alt: "Laushu 設計迭代 勞務內容與金額填寫區",
  },
  {
    tag: "操作流程 2",
    title: "填寫人選擇元件",
    label: "修正填寫人用詞，明確區分資料建立情境",
    paras: [
      "原本在建立勞務報酬單時，「填寫人」區塊使用「請所得人填寫」與「自行填寫」作為選項文字，但「所得人」這個用詞對使用者來說較不直覺，容易不確定是指外包人員、公司內部人員，還是報酬單建立者本人。下方的「新進人員／既有勞務人員」也容易讓人誤解為是否已建立人員資料，而不是在區分外包人員的狀態。",
      "調整後將選項文字修正為「外包人員填寫」與「自行填寫」，直接點出資料由誰填寫，讓使用者能更快理解兩種填寫方式的差異。同時將下方選項改為「首次外包人員／既有外包人員」，明確區分是第一次建立資料的外包人員，還是已存在於名單中的外包人員，降低用詞造成的判斷成本。",
    ],
    before: {
      src: `${ITER}/ui-filler-before.png`,
      width: 1440,
      height: 430,
    },
    after: {
      src: `${ITER}/ui-filler-after.png`,
      width: 1440,
      height: 430,
    },
    alt: "Laushu 設計迭代 填寫人選擇元件",
  },
  {
    tag: "操作流程 2",
    title: "列表資料呈現區",
    label: "優化資料呈現，快速查看已建立勞報單",
    paras: [
      "原本的勞務報酬單列表雖然已顯示建立日期、姓名、勞務內容、金額與簽收進度，但資料呈現較接近一般清單，缺少能幫助使用者快速判斷時間區間與資料批次的視覺提示。當勞報單數量增加時，使用者需要逐筆掃描日期，才能分辨哪些資料屬於同一年、同一批或需要優先處理的期間，查找效率較低。",
      "調整後強化「建立日期」欄位的辨識度，並以不同年份作為視覺區分，讓使用者能更快掌握勞務報酬單建立時間與資料區間。列表下方也新增分頁設計，避免大量資料一次展開造成閱讀負擔，讓使用者可以分批查看已建立的勞報單。",
    ],
    before: {
      src: `${ITER}/ui-list-before.png`,
      width: 1440,
      height: 1024,
    },
    after: {
      src: `${ITER}/ui-list-after.png`,
      width: 1440,
      height: 1024,
    },
    alt: "Laushu 設計迭代 列表資料呈現區",
  },
  {
    tag: "操作流程 2",
    title: "寄出確認視窗",
    label: "增加預覽狀態，降低寄出前的不確定感",
    paras: [
      "原本在建立勞務報酬單時，使用者填完資料後會直接進入寄出通知信的編輯視窗，雖然可以修改信件標題與內容，但無法在寄出前完整預覽勞報單實際內容。對使用者來說，這會產生「資料是否正確填寫」、「寄出去後對方會看到什麼」的不確定感，尤其勞務報酬單涉及姓名、地址、金額、稅額與付款日期等重要資訊，若沒有最後確認步驟，寄出前容易感到緊張。",
      "調整後在寄出前新增「預覽文件」狀態，讓使用者可以先從信件編輯進入勞報單預覽畫面，完整檢查基本資料、勞務內容、勞務金額與相關填寫資訊是否正確。確認無誤後，再按下確認按鈕完成寄出。",
    ],
    before: { src: `${ITER}/ui-send-before.png`, width: 1440, height: 1023 },
    after: { src: `${ITER}/ui-send-after.png`, width: 2957, height: 1023 },
    alt: "Laushu 設計迭代 寄出確認視窗",
  },
  {
    tag: "操作流程 3",
    title: "合併清單顯示",
    label: "優化合併勞報單功能，清楚顯示合併清單",
    paras: [
      "原本在合併多張勞報單時，使用者點選要合併的項目後，列表中只以一般文字或單列資料呈現合併結果，較難清楚辨識哪些勞報單已被納入同一張合併單。尤其當同一位外包人員有多筆不同日期或不同勞務內容的資料時，使用者需要重新比對清單，才能確認目前合併的是哪幾筆資料，增加核對成本。",
      "調整後將已合併的勞報單以群組方式呈現，並透過底色區塊清楚標示合併範圍，讓使用者可以一眼看出哪些資料被收合在同一張合併單中。同時在備註欄補上合併單號與合併狀態，讓合併後的資料來源與關聯性更明確。",
    ],
    before: {
      src: `${ITER}/ui-merge-before.png`,
      width: 1412,
      height: 1004,
    },
    after: {
      src: `${ITER}/ui-merge-after.png`,
      width: 1440,
      height: 1024,
    },
    alt: "Laushu 設計迭代 合併清單顯示",
  },
];

type IterationImage = {
  src: string;
  width: number;
  height: number;
};

function getIterationPanelClass(image: IterationImage) {
  return `cs-before-after-narrative-panel--laushu-w-${image.width}`;
}

const PROTO = `${IMG}/proto`;

const protoImageSizes: Record<string, { width: number; height: number }> = {
  [`${PROTO}/create-1-list.png`]: { width: 1440, height: 1024 },
  [`${PROTO}/create-2-form.png`]: { width: 1440, height: 1741 },
  [`${PROTO}/create-3-saved.png`]: { width: 1440, height: 1850 },
  [`${PROTO}/create-4-added.png`]: { width: 1440, height: 1024 },
  [`${PROTO}/bill-1-list.png`]: { width: 1440, height: 1024 },
  [`${PROTO}/bill-2-form.png`]: { width: 1162, height: 2048 },
  [`${PROTO}/bill-3-preview.png`]: { width: 1115, height: 2048 },
  [`${PROTO}/bill-4-alert.png`]: { width: 1440, height: 1024 },
  [`${PROTO}/bill-5-sent.png`]: { width: 1440, height: 1024 },
  [`${PROTO}/bill-6-list.png`]: { width: 1440, height: 1024 },
  [`${PROTO}/merge-1-search.png`]: { width: 1440, height: 1024 },
  [`${PROTO}/merge-2-select.png`]: { width: 1440, height: 1024 },
  [`${PROTO}/merge-3-alert.png`]: { width: 1440, height: 1024 },
  [`${PROTO}/merge-4-detail.png`]: { width: 1440, height: 2028 },
  [`${PROTO}/merge-5-expand.png`]: { width: 1440, height: 1024 },
};

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
  const nextProjectLabel = nextProject.navigationTitle ?? nextProject.title;

  const tocSections: TocSection[] = [
    { id: "cs-sec-overview", title: t("專案總覽") },
    { id: "cs-sec-problem", title: t("問題定義") },
    { id: "cs-sec-understand", title: t("研究設計") },
    { id: "cs-sec-converge", title: t("收斂與洞察") },
    { id: "cs-sec-iterate", title: t("測試與迭代") },
    { id: "cs-sec-prototype", title: t("原型設計") },
    { id: "cs-sec-demo", title: t("最終成果") },
    { id: "cs-sec-reflection", title: t("學習反思") },
  ];

  return (
    <CaseStudyShell
      theme="theme-laushu"
      tocSections={tocSections}
      nextNav={{
        nextHref: nextProject.status === "published" ? nextProject.href : undefined,
        homeLabel: t("返回首頁"),
        nextLabel: `${t("下一個專案")}${t("：")}${nextProjectLabel}`,
      }}
      hero={<HeroSection />}
    >
      <OverviewSection />
      <ProblemSection />
      {localizeLaushuTree(locale, UnderstandSection())}
      {localizeLaushuTree(locale, ConvergeSection())}
      {localizeLaushuTree(locale, IterateSection(t("← 左右滑動查看更多")))}
      {localizeLaushuTree(locale, PrototypeSection())}
      {localizeLaushuTree(locale, DemoSection())}
      <ReflectionSection />
    </CaseStudyShell>
  );
}

function UnderstandSection() {
  return (
    <section id="cs-sec-understand" className="cs-section laushu-process-section laushu-understand-section">
      <LaushuHead eyebrow="研究設計" title="了解使用者情境" />
      <ArticleBlock title="彙整使用勞報單流程" number="01">
        <p>訪談勞贖負責人並自行收集資料，了解外包與勞報單簽署流程，釐清會計師、公司、外包工作者三者關係。此平台至少包含四種核心利害關係人：</p>
      </ArticleBlock>
      <CaseGrid variant="four" className="cs-topic-grid cs-topic-grid--stakeholder">
        {stakeholderCards.map((card, index) => (
          <InfoCard title={card.title} number={`0${index + 1}`} key={card.title}>{card.body}</InfoCard>
        ))}
      </CaseGrid>
      {StakeholderFlow()}

      <ArticleBlock title="制定研究策略" number="02">
        <p>為後續設計研究制定執行策略，從了解現況、研究分析、質化分析到原型與測試。</p>
      </ArticleBlock>
      {ResearchTable()}

      <ArticleBlock title="篩選受訪者" number="03">
        <p>設計問卷篩選受訪者，了解目前勞報單填寫過程中，哪些環節感到繁雜（會計師：建立 → 發送 → 回收 → 彙整），並回收問卷驗證樣本輪廓。</p>
      </ArticleBlock>
      {SurveyFlow({ note: <p>了解目前勞報單填寫過程中，哪些過程感到繁雜。<br />會計師：建立 → 發送 → 回收 → 彙整。</p> })}
      {SurveyStats({
        profile: surveyProfile,
        experience: surveyExperience,
        volume: surveyVolume,
      })}
      {SurveyInsight({
        stepQuotes: surveyStepQuotes,
        painQuotes: surveyPainQuotes,
      })}

      <ArticleBlock title="訪談大綱" number="04">
        <p>本次共回收 39 份有效問卷。雖然問卷回收對象以會計師／會計人員為主，但實際聯繫訪談者的過程未如預期順利，最終僅成功訪談 1 位會計師。因此，後續利害關係人訪談調整為以公司負責人／負責單位為主要對象，並圍繞以下三個面向進行深入訪談：</p>
      </ArticleBlock>
      <div className="cs-guide-list-grid">
        {interviewGuide.map((group) => (
          <CaseCard className="cs-guide-list-card" key={group.title}>
            <h4>{group.title}</h4>
            <ul>
              {group.items.map((item) => (
                <li key={item.head}>
                  <span className="cs-guide-list-marker" aria-hidden="true">
                    <span className="cs-guide-list-dot" />
                    <span className="cs-guide-list-line" />
                  </span>
                  <div className="cs-guide-list-item">
                    <strong>{item.head}</strong>
                    <span>{item.body}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CaseCard>
        ))}
      </div>

      <ArticleBlock title="受訪者輪廓" number="05">
        <p>下面整理三位受訪者的訪談摘要，從資料管理、會計配合到勞報單流程，盤點他們各自的經手方式與最有感的痛點。</p>
      </ArticleBlock>
      <div className="cs-persona-list">
        {personas.map((p) => (
          <CaseCard className="cs-persona-card" key={p.name}>
            <div className="cs-persona-copy">
              <strong>{p.name}</strong>
              <span className="cs-persona-tags">{p.tags}</span>
              <p>{p.desc}</p>
            </div>
            <ZoomableImage
              src={p.image}
              alt={p.alt}
              width={p.width}
              height={p.height}
              labels={{ close: "關閉放大圖片", separator: "：", zoom: "點擊放大" }}
            />
          </CaseCard>
        ))}
      </div>
    </section>
  );
}

function ConvergeSection() {
  return (
    <section id="cs-sec-converge" className="cs-section laushu-process-section laushu-converge-section">
      <LaushuHead eyebrow="收斂與洞察" title="找出最適合分析的使用者流程" />
      <ArticleBlock title="彙整流程 & 重塑 TA" number="01">
        <p>挖掘使用者在建立、發放、回簽、建檔勞報單流程中的痛點，並首先聚焦會自己經手勞報單的公司端。</p>
      </ArticleBlock>
      <CaseMedia
        className="cs-showcase-media cs-showcase-media--caption-center"
        caption="以前兩位受訪者為主，盤點建立 → 發放 → 回簽 → 建檔的完整歷程與痛點"
        variant="full"
      >
        <ZoomableImage
          src={`${IMG}/labor-form-flow-1.png`}
          alt="Laushu 勞報單使用者歷程 journey map"
          width={1472}
          height={645}
          labels={{ close: "關閉放大圖片", separator: "：", zoom: "點擊放大" }}
        />
      </CaseMedia>
      <ArticleBlock title="重要用例" number="02">
        <p>收斂訪談洞見後，使用者最在意、也覺得紙本勞報單最麻煩的三件事：如何有效管理人員、如何改善簽收確認、如何減少回簽次數。據此彙整三個重要用例，進行後續介面流程設計。</p>
      </ArticleBlock>
      <CaseGrid variant="three" className="cs-topic-grid cs-topic-grid--usecase">
        {keyFlows.map((item) => (
          <InfoCard title={item.title} image={item.image} key={item.title}>{item.body}</InfoCard>
        ))}
      </CaseGrid>
    </section>
  );
}

function TaskFlowChart({
  tag,
  title,
  scrollHintLabel,
  children,
}: {
  tag: string;
  title: string;
  scrollHintLabel: string;
  children: ReactNode;
}) {
  return (
    <CaseFlowFrame
      scrollHintLabel={scrollHintLabel}
      variant="split"
      header={
        <>
        <span className="cs-flow-frame-badge">{tag}</span>
        <span className="cs-flow-frame-title">{title}</span>
        </>
      }
    >
      {children}
    </CaseFlowFrame>
  );
}

function TaskFlow1(scrollHintLabel: string) {
  return (
    <TaskFlowChart
      tag="操作流程 1"
      title="建立外包人員資料庫，便於掌管人員個人資料"
      scrollHintLabel={scrollHintLabel}
    >
      {TaskFlowOneDiagram()}
    </TaskFlowChart>
  );
}

function TaskFlow2(scrollHintLabel: string) {
  return (
    <TaskFlowChart
      tag="操作流程 2"
      title="建立勞務報酬單，發送系統連結給外包人員填寫資料 / 回簽"
      scrollHintLabel={scrollHintLabel}
    >
      {TaskFlowTwoDiagram()}
    </TaskFlowChart>
  );
}

function TaskFlow3(scrollHintLabel: string) {
  return (
    <TaskFlowChart
      tag="操作流程 3"
      title="合併多張勞務報酬單，減少回簽次數與調整稅額"
      scrollHintLabel={scrollHintLabel}
    >
      {TaskFlowThreeDiagram()}
    </TaskFlowChart>
  );
}

function IterateSection(scrollHintLabel: string) {
  return (
    <section id="cs-sec-iterate" className="cs-section laushu-process-section laushu-iterate-section">
      <LaushuHead eyebrow="測試與迭代" title="從任務測試中，修正既有的流程與介面問題" />
      <ArticleBlock title="任務測試與易用性量表" number="01">
        <p>邀請上次接受訪談的 2 位受訪者再次進行介面評估：</p>
        <ul>
          <li>節目企劃：長期需要外包主持人</li>
          <li>攝影工作室老闆：長期需要外包攝影師合作拍攝</li>
        </ul>
        <p>針對三個重要用例繪製流程圖，透過 Figma 原型讓受訪者以放聲思考法完成任務測試，並填寫 SUS 易用性量表：</p>
      </ArticleBlock>
      <div className="cs-flow-frame-list">
        {TaskFlow1(scrollHintLabel)}
        {TaskFlow2(scrollHintLabel)}
        {TaskFlow3(scrollHintLabel)}
      </div>
      <ArticleBlock title="設計介面、元件迭代" number="02">
        <p>這次介面與元件迭代聚焦在降低判斷成本、提升核對效率。透過調整資訊排序、用詞、提示文字與列表呈現，讓使用者能更快找到正確資料、理解欄位意義，並在寄出或合併前完成確認，降低錯填、漏填與誤合併的風險。</p>
      </ArticleBlock>
      <div className="cs-iteration-list">
        {iterationBoards.map((board) => (
          <BeforeAfterNarrativeFrame
            key={board.title}
            className="cs-iteration-board"
            badge={board.tag}
            title={board.title}
            points={[
              {
                label: board.label,
                content: (
                  <>
                    {board.paras.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </>
                ),
              },
            ]}
            beforeLabel="Before"
            afterLabel="After"
            beforeClassName={getIterationPanelClass(board.before)}
            afterClassName={getIterationPanelClass(board.after)}
            before={<IterationComparisonMedia image={board.before} alt={`${board.alt} Before`} />}
            after={<IterationComparisonMedia image={board.after} alt={`${board.alt} After`} />}
          />
        ))}
      </div>
      <ArticleBlock title="測試結果" number="03">
        <p>根據任務測試與 SUS 分數收斂迭代方向，作為最終 Hi-fi 原型的設計依據。</p>
      </ArticleBlock>
      <CaseMedia className="cs-showcase-media" variant="full">
        <ZoomableImage
          src={`${IMG}/test-result.png`}
          alt="Laushu 任務測試與 SUS 結果"
          width={2752}
          height={1968}
          labels={{ close: "關閉放大圖片", separator: "：", zoom: "點擊放大" }}
        />
      </CaseMedia>
    </section>
  );
}

function IterationComparisonMedia({
  image,
  alt,
}: {
  image: IterationImage;
  alt: string;
}) {
  return (
    <ZoomableImage
      src={image.src}
      alt={alt}
      width={image.width}
      height={image.height}
      className="cs-iteration-panel-image"
      labels={{ close: "關閉放大圖片", separator: "：", zoom: "點擊放大" }}
    />
  );
}

function PrototypeSection() {
  return (
    <section id="cs-sec-prototype" className="cs-section laushu-process-section laushu-prototype-section">
      <LaushuHead eyebrow="原型設計" title="最終 UI flow 展示" />
      <p className="cs-section-lead cs-section-lead--wide cs-section-lead--top-gap">
        根據測試結果迭代完成 Hi-fi 原型，聚焦三條核心流程：建立外包人員、建立勞報單、合併勞報單。
      </p>
      <CaseMedia className="cs-showcase-media cs-showcase-media--framed" variant="full">
        <FeatureImageLightbox src={`${IMG}/figma-design.png`} alt="Laushu Hi-fi 原型設計總覽" width={1472} height={793} />
      </CaseMedia>
      <FeatureConnectors />
      <div className="cs-sol-block cs-sol-block--prototype">
        {prototypeFlows.map((flow, gi) => (
          <div className="cs-sol-fgroup cs-sol-fgroup--prototype" key={flow.tag}>
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
    </section>
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
  const imageSize = protoImageSizes[step.image] ?? { width: 1440, height: 1024 };

  return (
    <>
      <CaseFeatureRow
        flipped={flip}
        note={<p>{step.note}</p>}
        media={
          <CaseMedia variant="full">
            <FeatureImageLightbox src={step.image} alt={step.alt} width={imageSize.width} height={imageSize.height} />
          </CaseMedia>
        }
      />
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
    <section id="cs-sec-demo" className="cs-section laushu-demo-section">
      <LaushuHead eyebrow="最終成果" title="UI 互動影片介紹" />
      <div className="cs-video-showcase-list">
        {demoItems.map((item, index) => (
          <CaseCard className="cs-video-showcase-card" key={item.title}>
            <CaseMedia className="cs-video-showcase-media-wrap" contentClassName="cs-video-showcase-media" variant="full">
              <div className="cs-video-showcase-meta">
                <span>{`0${index + 1}`}</span>
                <span>{item.duration}</span>
              </div>
              <video className="cs-video-showcase-video" controls preload="metadata" poster={item.poster} playsInline>
                <source src={item.video} type="video/mp4" />
              </video>
            </CaseMedia>
            <div className="cs-video-showcase-copy">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </CaseCard>
        ))}
      </div>
    </section>
  );
}

function ResearchTable() {
  return (
    <>
      <FlowScrollHint label="← 左右滑動查看更多" />
      <CaseMedia className="cs-data-table-frame cs-data-table-frame--wide" variant="scroll">
        <table className="cs-data-table cs-data-table--matrix">
          <thead>
            <tr>
              {researchTable.head.map((h, i) => (
                <th key={h} className={i === 0 ? "cs-data-table-corner" : undefined}>{h}</th>
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
      </CaseMedia>
    </>
  );
}
