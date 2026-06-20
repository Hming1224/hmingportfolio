import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import type { Locale } from "../../i18n/routing";

/* Laushu 案例頁 zh-TW → en 對照。
   找不到對應 key 時回傳原文（與 advantech / crypto 同策略），方便分批補英文。 */
const en = {
  // ── TOC ──
  "專案總覽": "Overview",
  "問題定義": "Problem",
  "了解使用者情境": "Understand Users",
  "收斂與洞察": "Converge & Insights",
  "測試與設計迭代": "Test & Iterate",
  "原型設計": "Prototype",
  "成果 Demo": "Demo",
  "學習反思": "Reflections",
  "返回首頁": "Back to Home",
  "下一個專案": "Next Project",
  "：": ": ",

  // ── Hero ──
  "Laushu 勞贖｜勞務報酬系統設計優化": "Laushu｜Labor Remuneration System UX Optimization",
  "檢視目前紙本勞報單使用流程，透過訪談、設計與測試，優化勞贖勞報數位化系統，針對發送勞報單流程，提供設計體驗優化建議。":
    "Reviewing the current paper-based labor remuneration workflow — through interviews, design and testing — to improve Laushu's digital labor-form system, with UX recommendations focused on the form-sending flow.",
  "Laushu 勞贖設計優化專案主視覺": "Laushu UX optimization project hero",
  "類型": "Type",
  "角色": "Role",
  "方法": "Methods",
  "工具": "Tools",
  "時間": "Timeline",
  "設計優化": "UX Optimization",
  "團體專案": "Team Project",
  "UIUX 設計師": "UI/UX Designer",
  "使用者研究員": "UX Researcher",
  "訪談、問卷": "Interviews & Surveys",
  "任務測試": "Task Testing",
  "易用性測試": "Usability Testing",

  // ── Overview ──
  "總覽 Overview": "Overview",
  "目標": "Goal",
  "需求": "Needs",
  "原型": "Prototype",
  "將紙本勞報單流程轉譯成可測試、可上線的數位體驗。":
    "Translating a paper-based labor-form process into a testable, launch-ready digital experience.",

  // ── Section titles ──
  "專案總覽 Overview": "Overview",
  "問題定義 Problem": "Problem",
  "了解使用者情境 Understand": "Understand Users",
  "收斂與洞察 Converge": "Converge & Insights",
  "測試與設計迭代 Iterate": "Test & Iterate",
  "原型設計 Prototype": "Prototype",
  "學習反思 Reflections": "Reflections",

  // ── Overview ──
  "Laushu 勞贖為已上線的數位化勞報單系統。此設計優化專案與其負責人合作，測試現有紙本勞報單數位化的流程易用性，於上線前提供改善建議。":
    "Laushu is a live digital labor-remuneration-form system. This UX optimization project, in collaboration with its product owner, tested the usability of digitizing the existing paper-based form flow and delivered improvement recommendations before launch.",
  "了解紙本勞報單報帳流程、拆解利害關係人需求，並優化數位化勞報單報帳體驗。":
    "Understand the paper-based filing flow, break down stakeholder needs, and improve the digital filing experience.",
  "針對公司發送勞報單給外包人員流程優化設計：包含新建外包人員、建立勞報單、合併勞報單。":
    "Optimized the flow of a company sending forms to contractors: adding contractors, creating forms, and merging forms.",
  "專案核心不是單純把紙本表單搬到線上，而是先拆解會計師、公司、外包工作者與管理員之間的任務關係，再把最影響效率的流程整理成可操作的產品原型。":
    "The core wasn't simply moving a paper form online — it was first unpacking the task relationships between accountants, companies, contractors and admins, then turning the most efficiency-critical flows into an actionable product prototype.",
  "建立外包人員資料庫": "Build a contractor database",
  "使用者掌握外包人員資料，日後有需求可立即找人展開合作。":
    "Users keep contractor records on hand, so they can find people and start collaborating instantly when needed.",
  "外包人員線上填寫資料、回簽勞報單": "Contractors fill in and counter-sign online",
  "外包人員透過系統連結線上填寫與回簽，不必專程跑一趟。":
    "Contractors fill in and counter-sign via a system link online — no dedicated trip required.",
  "合併多張勞報單": "Merge multiple forms",
  "減少回簽次數與重複麻煩的確認步驟。": "Fewer counter-signs and fewer repetitive confirmation steps.",
  "使用者掌握外包人員資料，日後有需求可立即找人展開合作":
    "Users keep contractor records on hand and can find people instantly when needed",
  "減少回簽次數與重複麻煩的確認步驟": "Fewer counter-signs and repetitive confirmation steps",
  "省時、省力、省心，提升整體工作效率，讓財務工作既快樂又自由":
    "Save time, effort and worry — boosting overall efficiency and making finance work freer and more enjoyable",
  "公司發送勞報單給外包工作者": "The company sends labor forms to contractors",

  // ── Stakeholders ──
  "彙整使用勞報單流程": "Mapping the labor-form workflow",
  "收集": "Collect",
  "訪談勞贖負責人並自行收集資料，了解外包與勞報單簽署流程，釐清會計師、公司、外包工作者三者關係。此平台至少包含四種核心利害關係人：":
    "By interviewing the Laushu owner and gathering data, I mapped the outsourcing and form-signing flow and clarified the relationship between accountant, company and contractor. The platform involves at least four core stakeholders:",
  "會計師": "Accountant",
  "勞贖主要用戶，透過勞贖寄出勞報單，協助公司供外包工作者確認、彙整勞報資料（會計事務所 / 會計師 / 記帳士）。":
    "Laushu's primary user — sends forms through Laushu and helps companies get contractor confirmations and compile records (accounting firm / accountant / bookkeeper).",
  "公司使用者": "Company user",
  "會計事務所的主要服務對象，會計事務所協助公司向旗下外包工作者開立勞報單。":
    "The accounting firm's main client; the firm helps the company issue forms to its contractors.",
  "外包工作者": "Contractor",
  "勞贖的終端用戶，確認勞報單是否成立，並向公司領取工資。":
    "Laushu's end user — confirms whether a form is valid and collects payment from the company.",
  "勞贖管理員": "Laushu admin",
  "管理會計師帳號。": "Manages accountant accounts.",
  "會計事務所": "Accounting firm",
  "公司": "Company",
  "協助彙整勞報單": "Help compile forms",
  "會計師、公司與外包工作者的勞報單流程": "Labor-form flow between accountant, company and contractor",
  "公司發送勞報單給外包工作者的流程": "Flow of the company sending labor forms to contractors",
  "回傳勞報單": "Return forms",
  "發送勞報單": "Send labor form",
  "發出工資": "Pay wages",
  "確認勞報單": "Confirm form",

  // ── Problem ──
  "過去建立紙本勞報單費時費力，但最後紙本單據僅作為佐證用。":
    "Creating paper labor forms used to be slow and laborious — yet the paper ends up serving only as supporting proof.",
  "勞務報酬單，簡稱「勞報單」，為公司支付「酬勞」給「個人」時使用的證明單據，可作為公司支出的證明，並列入領到酬勞者的綜合所得稅中。":
    "A labor remuneration form (\"labor form\") is the document used when a company pays an individual. It proves the company's expense and is included in the recipient's personal income tax.",
  "勞報單範例": "Sample labor form",
  "僅作為佐證用": "Only used as proof",
  "公司外包時，每次都須請外包人員簽署紙本勞報單，但此紙本最後僅作為交易佐證。":
    "Every time a company outsources, the contractor must sign a paper form — but the paper ultimately only serves as transaction proof.",
  "流程繁瑣": "Tedious process",
  "流程包含許多細節，像是所得類別、二代健保的計算等，很多創業者不知情下違反規定。":
    "The process has many details — income categories, second-generation health-insurance calculations — and many founders break the rules without realizing it.",
  "過程耗時": "Time-consuming",
  "會計師需人工核對且逐筆建檔；外包人員即使不須進公司，還是必須專程跑一趟公司或郵局。":
    "Accountants must check and file each entry by hand; contractors, even when they needn't visit the office, still have to make a special trip to the company or post office.",

  // ── Research strategy table ──
  "制定研究策略": "Defining the research strategy",
  "規劃": "Plan",
  "為後續設計研究制定執行策略，從了解現況、研究分析、質化分析到原型與測試。":
    "Set an execution strategy for the design research — from understanding the status quo, to analysis, qualitative analysis, prototyping and testing.",
  "研究流程": "Research phase",
  "了解現況": "Understand",
  "研究分析": "Analysis",
  "質化分析": "Qualitative",
  "原型 & 測試": "Prototype & Test",
  "研究方法": "Methods",
  "欲收集資料": "Data to collect",
  "脈絡訪查": "Contextual inquiry",
  "先詢問會計師勞報單流程，接續設計問卷 & 訪談": "First ask accountants about the form flow, then design a survey & interviews",
  "使用者歷程分析": "User journey analysis",
  "用例分析": "Use-case analysis",
  "需求優先級": "Need prioritization",
  "SUS 量表": "SUS scale",
  "報帳操作步驟": "Filing steps",
  "使用軟體": "Software used",
  "資料輸入習慣 / 順序": "Data-entry habits / order",
  "使用者動機、行為、目標": "User motivation, behavior, goals",
  "使用者潛在的需求": "Latent user needs",
  "用例重要程度": "Use-case importance",
  "使用者反饋": "User feedback",
  "系統易用性分數": "System usability score",

  // ── Survey / interview structure ──
  "篩選受訪者": "Screening interviewees",
  "問卷": "Survey",
  "設計問卷篩選受訪者，了解目前勞報單填寫過程中，哪些環節感到繁雜（會計師：建立 → 發送 → 回收 → 彙整）。":
    "Designed a survey to screen interviewees and learn which parts of the current form-filling process feel tedious (accountant: create → send → collect → compile).",
  "基本資料": "Basic info",
  "身份、年齡、年資": "Identity, age, seniority",
  "使用勞報單經驗": "Labor-form experience",
  "了解建立勞報單經驗": "Form-creation experience",
  "了解建檔的過程感受": "How filing feels",
  "了解目前勞報單填寫過程中，哪些過程感到繁雜。": "Learn which parts of the current form-filling process feel tedious.",
  "會計師：建立 → 發送 → 回收 → 彙整。": "Accountant: create → send → collect → compile.",
  "訪談大綱": "Interview guide",
  "訪談": "Interview",
  "共搜集 39 份有效問卷，篩選三位受訪者，圍繞以下三個面向深入訪談：":
    "Collected 39 valid surveys, screened three interviewees, and interviewed in depth around three areas:",
  "所屬公司工作流程": "Company workflow",
  "處理勞報起訖過程": "End-to-end form handling",
  "建立、發送勞報單到收回領據和最後結果過程。": "From creating and sending forms to collecting receipts and the final outcome.",
  "工作時間花費、人力需求": "Time & manpower cost",
  "執行勞報流程的痛點。": "Pain points of running the form process.",
  "執行線上勞報系統": "Running an online system",
  "已知的勞報線上系統": "Known online systems",
  "使用線上和實體紙本的經驗差異。": "Differences between using online vs. physical paper.",
  "簽核常見問題、執行線上簽核窒礙點": "Common approval issues & online blockers",
  "線上與紙本系統的差異、優點和缺點。": "Differences, pros and cons of online vs. paper systems.",
  "流程改善的想法": "Ideas for improvement",
  "法規報稅規定": "Tax & regulation",
  "既有勞報流程執行的必要性。": "Whether the existing form process is truly necessary.",
  "內部執行現況": "Internal status quo",
  "公司內部調整流程的想法、改善預算成本及更動規模評估。":
    "Internal thoughts on adjusting the process, improvement budget, and scale-of-change assessment.",
  "P1 攝影工作室老闆": "P1 Photography studio owner",
  "#許多外包工作 #有長期配合的人員": "#Lots of outsourcing #Long-term partners",
  "老闆會自己整理每個外包人員專屬的資料夾，存放勞報單與過去的資料，就像自己建置了一套資料庫。":
    "The owner organizes a dedicated folder for each contractor to store forms and past records — essentially building their own database by hand.",

  // ── Converge ──
  "彙整流程 & 重塑 TA": "Mapping the flow & reframing the TA",
  "洞察": "Insight",
  "挖掘使用者在建立、發放、回簽、建檔勞報單流程中的痛點，並首先聚焦會自己經手勞報單的公司端。":
    "Surfaced pain points across creating, issuing, counter-signing and filing forms, focusing first on the company side that handles forms directly.",
  "以前兩位受訪者為主，盤點建立 → 發放 → 回簽 → 建檔的完整歷程與痛點":
    "Centered on the two prior interviewees, mapping the full journey and pain points from create → issue → counter-sign → file",
  "重要用例": "Key use cases",
  "收斂訪談洞見後，使用者最在意、也覺得紙本勞報單最麻煩的三件事：如何有效管理人員、如何改善簽收確認、如何減少回簽次數。據此彙整三個重要用例，進行後續介面流程設計。":
    "After converging the interview insights, the three things users cared about most — and found most cumbersome on paper — were: managing people effectively, improving sign-off confirmation, and reducing counter-signs. These became three key use cases driving the interface flow design.",
  "Flow 1：建立外包人員資料庫": "Flow 1: Build a contractor database",
  "便於掌管人員個人資料，日後有需求可立即找人。": "Keep contractor records handy so you can find people instantly later.",
  "Flow 2：建立勞務報酬單": "Flow 2: Create a labor remuneration form",
  "發送系統連結給外包人員填寫資料 / 回簽。": "Send a system link for contractors to fill in / counter-sign.",
  "Flow 3：合併多張勞務報酬單": "Flow 3: Merge multiple forms",
  "減少回簽次數與調整稅額。": "Fewer counter-signs and adjusted tax amounts.",
  "點擊放大": "Click to zoom",
  "關閉放大圖片": "Close zoomed image",

  // ── Iterate ──
  "任務測試與易用性量表": "Task testing & usability scale",
  "邀請上次接受訪談的 2 位受訪者再次進行介面評估。針對三個重要用例繪製流程圖，透過 Figma 原型讓受訪者以放聲思考法完成任務測試，並填寫 SUS 易用性量表。":
    "Invited the two prior interviewees back to evaluate the interface. For the three key use cases I drew flows and built Figma prototypes, ran think-aloud task tests, and collected SUS usability scores.",
  "節目企劃：長期需要外包主持人": "Program planner: needs outsourced hosts long-term",
  "攝影工作室老闆：長期需要外包攝影師合作拍攝": "Studio owner: needs outsourced photographers long-term",
  "Flow 1：建立外包人員資料庫，便於掌管人員個人資料": "Flow 1: Build a contractor database to manage people's records",
  "設計迭代 1-1：對使用者而言，首頁建立人員資料庫時，重要的是知道確切是哪位人員，因此不容易變動的身份資料須置前，以利辨識。":
    "Iteration 1-1: When building the database, what matters most is knowing exactly who a person is — so stable identity fields are placed first for easier recognition.",
  "Flow 2：建立勞務報酬單，發送系統連結給外包人員填寫資料 / 回簽":
    "Flow 2: Create a form and send a link for contractors to fill in / counter-sign",
  "設計迭代 2-1：增加稅額 ％ 顯示與文字說明，讓使用者便於對照。":
    "Iteration 2-1: Added tax % display and text notes so users can cross-check easily.",
  "設計迭代 2-2：修正用詞，更容易理解。": "Iteration 2-2: Revised wording for easier comprehension.",
  "設計迭代 2-3：優化資料呈現，快速查看已建立勞報單。":
    "Iteration 2-3: Improved data presentation for quickly reviewing created forms.",
  "設計迭代 2-4：增加預覽狀態，確保資料填寫正確後，寄出電子勞報單。":
    "Iteration 2-4: Added a preview state to confirm details before sending the e-form.",
  "Flow 3：合併多張勞務報酬單，減少回簽次數與調整稅額": "Flow 3: Merge multiple forms to cut counter-signs and adjust tax",
  "設計迭代 3-1：優化合併勞報單功能，清楚顯示合併清單。":
    "Iteration 3-1: Improved the merge feature to clearly show the merge list.",
  "測試結果": "Test results",
  "根據任務測試與 SUS 分數收斂迭代方向，作為最終 Hi-fi 原型的設計依據。":
    "Converged the iteration direction from task tests and SUS scores as the basis for the final hi-fi prototype.",

  // ── Prototype ──
  "根據測試結果迭代完成 Hi-fi 原型，聚焦三條核心流程：建立外包人員、建立勞報單、合併勞報單。":
    "Iterated to a hi-fi prototype based on test results, focused on three core flows: adding contractors, creating forms, and merging forms.",
  "Flow 3｜合併多張勞務報酬單": "Flow 3｜Merge multiple labor forms",
  "測試驗證後的合併流程：合併多筆勞報資料、清楚呈現細項，減少回簽次數與稅務整理時間。":
    "The post-validation merge flow: combine multiple form records, present line items clearly, and cut counter-signs and tax-prep time.",
  "進入「勞務報酬單」頁面，輸入外包人員姓名後按下搜尋。":
    "Open the \"Labor Forms\" page, type a contractor's name and search.",
  "勾選要合併的多筆勞報單，右上方即時顯示已勾選筆數與「確認合併」。":
    "Tick the forms to merge; the top right shows the selected count and a \"Confirm merge\" action in real time.",
  "若勾選的勞務內容不相同，系統會跳出 alert 提醒，不可合併。":
    "If the selected work items differ, the system alerts that they cannot be merged.",
  "合併第一張：外國人稅率不同時系統提醒、勞健保代扣需填 ％ 數、付款日期提醒；因為一起匯款，只需要一個支付方式。":
    "Merging the first form: alerts for foreign-resident tax rates, a required withholding % for labor/health insurance, and payment-date reminders — and since it's paid together, only one payment method is needed.",
  "點選合併項目可展開，檢視被合併的每一張單張。":
    "Click a merged item to expand and review each individual form inside it.",

  // ── Demo ──
  "快速新增、查找與管理外包人員資料，降低後續建立勞報單時的重複輸入。":
    "Quickly add, find and manage contractor records, reducing repetitive entry when creating forms later.",
  "協助公司建立勞務報酬單，發送系統連結給外包人員填寫資料並完成回簽。":
    "Helps the company create forms and send a link for contractors to fill in and counter-sign.",
  "合併多筆勞報資料並清楚呈現細項，減少回簽次數與稅務整理時間。":
    "Merge multiple form records with clear line items, cutting counter-signs and tax-prep time.",

  // ── Reflection ──
  "從使用者出發的線上化策略思考": "A digitization strategy that starts from the user",
  "設計線上化流程時，首要是釐清哪些是不可或缺的核心步驟，哪些可轉化為更便捷的數位形式。唯有從使用者需求出發，才能真正掌握該數位化的重點功能。本專案因時間限制，優先聚焦核心利害關係人——公司端——進行流程盤點與優化。實作過程中也意識到，專案要真正推動上線，需進一步納入更多商業面向與跨部門的決策考量。":
    "When designing a digital flow, the first task is to clarify which steps are essential and which can become more convenient digital forms. Only by starting from user needs can you truly identify the key features worth digitizing. Due to time constraints, this project prioritized the core stakeholder — the company side — for flow mapping and optimization. Through the build I also realized that taking a project truly live requires weaving in more business considerations and cross-department decisions.",
} as const;

type LaushuKey = keyof typeof en;

export function translateLaushu(locale: Locale, text: string) {
  return locale === "en" ? en[text as LaushuKey] ?? text : text;
}

export function translateLaushuData<T>(locale: Locale, value: T): T {
  if (typeof value === "string") return translateLaushu(locale, value) as T;
  if (Array.isArray(value)) {
    const translateItem = (item: unknown) => translateLaushuData(locale, item);
    return (value.some(isValidElement)
      ? Children.map(value, translateItem)
      : value.map(translateItem)) as T;
  }
  if (isValidElement(value)) return localizeLaushuTree(locale, value) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, translateLaushuData(locale, item)]),
    ) as T;
  }
  return value;
}

export function localizeLaushuTree(locale: Locale, node: ReactNode): ReactNode {
  if (typeof node === "string") return translateLaushu(locale, node);
  if (Array.isArray(node)) {
    return Children.map(node, (item) => localizeLaushuTree(locale, item));
  }
  if (!isValidElement(node)) return node;

  const element = node as ReactElement<Record<string, unknown>>;
  const { children, ...restProps } = element.props;
  const props = translateLaushuData(locale, restProps);
  const localizedChildren = Children.map(children as ReactNode, (child) =>
    localizeLaushuTree(locale, child),
  );
  return cloneElement(element, props, localizedChildren);
}
