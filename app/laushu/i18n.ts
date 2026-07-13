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
  "測試與迭代": "Test & Iterate",
  "原型設計": "Prototype",
  "成果 Demo": "Demo",
  "最終成果": "Final outcome",
  "學習反思": "Reflections",
  "返回首頁": "Back to Home",
  "下一個專案": "Next Project",
  "← 左右滑動查看更多": "← Scroll horizontally to see more",
  "：": ": ",

  // ── Hero ──
  "從紙本化繁為簡：勞務報酬系統的數位流程優化": "From Paper to a Smooth Digital Flow:UX Optimization for a Contractor Payment System",
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
  "團隊成員": "Team Members",
  "3x 研究員": "3x Researchers",
  "1x 設計師": "1x Designer",
  "UX/UI 設計師": "UX/UI Designer",
  "設計師": "Designer",
  "UX/UI": "UX/UI",
  "負責項目": "Responsibilities",
  "線框稿": "Wireframes",
  "互動原型": "Interactive Prototype",
  "協同參與訪談、": "Co-conducting interviews",

  // ── Overview ──
  "總覽 Overview": "Overview",
  "問題": "Problem",
  "影響": "Impact",
  "目標": "Goal",
  "需求": "Needs",
  "原型": "Prototype",
  "設計流程": "Design Process",
  "專案快速總覽": "Project at a glance",
  "勞贖（Laushu）想把紙本勞務報酬單搬上線，但真正要解的是會計師、公司與外包工作者三方的協作：建檔、稅額計算、寄送與回簽分散在不同人手上，重複輸入與來回確認吃掉大量時間。我與研究團隊從問卷與訪談出發，把最影響效率的三條流程做成可直接操作的原型，再用任務測試與 SUS 量表驗證，完成六處介面迭代。":
    "Laushu set out to move paper labor forms online, but the real challenge was coordination among accountants, companies, and contractors. Record setup, tax calculations, delivery, and countersigning were split across different people, consuming time through repeated entry and back-and-forth confirmation. Working with the research team, I used surveys and interviews to turn the three highest-impact flows into interactive prototypes, then validated them through task testing and the SUS questionnaire, leading to six interface iterations.",
  "紙本勞報單牽動三方來回，最後卻只是一張佐證用的單據。":
    "Paper labor forms send three parties back and forth, only to end as supporting records.",
  "公司：每次外包都要開單的人": "Company: the party issuing a form for every outsourced job",
  "每次外包都須請外包人員簽署紙本勞報單，流程還牽涉所得類別、二代健保的計算，很多創業者不知情就違反規定；追回簽、追進度全靠人工。":
    "Every outsourced job requires the contractor to sign a paper labor form. The process also involves income categories and supplementary health-insurance calculations, so many founders break the rules without realizing it; chasing signatures and tracking progress are entirely manual.",
  "會計師：協助公司彙整勞報資料的人": "Accountant: the person compiling labor-form records for the company",
  "需要人工核對且逐筆建檔；一年才收一次勞報單，容易發生檔案遺失或忘記存檔，會計師與公司之間的資訊隔閡是他最有感的痛點。":
    "Each record must be checked and entered manually. Because labor forms are collected only once a year, files can be lost or left unsaved; the information gap between accountants and companies was the accountant's most pressing pain point.",
  "外包工作者：簽收領錢的人": "Contractor: the person signing to receive payment",
  "即使工作不須進公司，還是得備齊身分證、存摺等證件，專程跑一趟公司或郵局簽紙本；證件缺東缺西，就得再跑一次。":
    "Even when the work does not require an office visit, contractors still have to gather an ID, passbook, and other documents, then make a dedicated trip to the company or post office to sign on paper. If anything is missing, they have to make the trip again.",
  "勞務報酬單範例": "Sample labor remuneration form",
  "紙本勞報單範例：欄位多、計算細，簽完最後只作為交易佐證。":
    "Sample paper labor form: many fields and detailed calculations, ultimately signed only as proof of the transaction.",
  "在產品上線前，把三方協作的紙本流程轉譯成清楚、可完成的數位任務。":
    "Before launch, translate the three-party paper workflow into clear digital tasks people can complete.",
  "研究路線的轉折": "Research pivot",
  "問卷回收 39 份、以會計人員為主，但實際只約到 1 位會計師受訪；我們把訪談對象調整為會自己經手勞報單的公司負責人，並收斂出他們最麻煩的三件事：管理外包人員、確認簽收、減少回簽次數。":
    "Most of the 39 survey responses came from accounting staff, but we were able to interview only one accountant. We shifted recruitment to company owners who handle labor forms themselves and narrowed their biggest pain points to three tasks: managing contractors, confirming receipt, and reducing countersigning rounds.",
  "How might we": "How might we",
  "我們如何讓公司、會計師與外包工作者在同一套系統完成建檔、計算、寄送與回簽，減少來回確認的時間與行政成本？":
    "How might we help companies, accountants, and contractors complete record setup, calculations, delivery, and countersigning in one system, reducing time spent on back-and-forth confirmation and administrative costs?",
  "Laushu 勞報單使用者歷程 journey map": "Laushu labor-form user journey map",
  "以受訪者經驗盤點建立 → 發放 → 回簽 → 建檔的完整歷程，找出最卡的環節。":
    "Mapping the full setup → issue → countersign → filing journey from participant experiences revealed the biggest bottlenecks.",
  "SUS 易用性分數達 82.5，任務測試推動六處設計迭代。":
    "A SUS usability score of 82.5 and task testing drove six design iterations.",
  "測試方式": "Testing method",
  "邀請 2 位受訪過的使用者（節目企劃、攝影工作室老闆）以放聲思考法完成三條核心流程的任務測試，並填寫 SUS 易用性量表，據此收斂迭代方向。":
    "Two previously interviewed users—a program planner and a photography studio owner—completed task tests across the three core flows using think-aloud protocol, then filled out the SUS questionnaire to guide the iteration priorities.",
  "迭代重點": "Iteration focus",
  "六處調整都在降低判斷成本：欄位排序、稅額與日期提示、把「所得人」換成看得懂的用詞、列表分頁、寄出前預覽、合併清單分組，讓使用者更快找到資料、寄出前敢按確認。":
    "All six changes reduced decision effort: column order, tax and date guidance, replacing the term ‘income recipient’ with clearer wording, list pagination, a pre-send preview, and grouped merged forms. Users could find records faster and confirm with more confidence before sending.",
  "SUS 易用性分數": "SUS usability score",
  "2 位使用者完成三條核心流程任務測試後填寫 SUS 量表。":
    "Two users completed task tests across the three core flows, then filled out the SUS questionnaire.",
  "介面與流程迭代": "Interface and flow iterations",
  "依任務測試與 SUS 結果，完成六處介面與流程調整。":
    "Task-testing and SUS results led to six interface and flow improvements.",
  "本案屬上線前驗證；大量單據情境仍需上線後以真實數據驗證。":
    "This was pre-launch validation; performance with high form volumes still needs verification with real post-launch data.",
  "成果走查": "Outcome walkthrough",
  "建檔、開單到合併，三條核心流程都在同一套系統完成。":
    "From record setup and form creation to merging, all three core flows happen in one system.",
  "建立勞務報酬單": "Create a labor remuneration form",
  "流程01": "Flow 01",
  "流程02": "Flow 02",
  "流程03": "Flow 03",
  "Laushu 建立外包人員資料庫操作示範影片": "Laushu contractor-database flow demo video",
  "Laushu 建立勞務報酬單操作示範影片": "Laushu labor-form creation flow demo video",
  "Laushu 合併多張勞報單操作示範影片": "Laushu labor-form merging flow demo video",
  "成果走查流程切換": "Switch outcome flow",
  "成果走查影片": "Outcome walkthrough video",
  "流程": "Flow",
  "← 上一步": "← Previous",
  "下一步 →": "Next →",
  "跳到步驟": "Go to step",

  // ── Section ledes (Figma 描述句副標) ──
  "研究設計": "Research Design",
  "受訪者輪廓": "Participant Profiles",
  "找出最適合分析的使用者流程": "Finding the user flow best suited for analysis",
  "從任務測試中，修正既有的流程與介面問題": "Fixing existing flow and interface issues found in task testing",
  "UI 互動影片介紹": "UI interaction video walkthrough",
  "線下與線上整合的數位流程考驗": "The challenge of integrating offline and online into one digital flow",

  // ── Problem section framing ──
  "科普小知識": "Quick primer",
  "勞報單是什麼？": "What is a labor form?",
  "現階段勞報單的問題": "Current problems with labor forms",
  "將紙本勞報單流程轉譯成可測試、可上線的數位體驗。":
    "Translating a paper-based labor-form process into a testable, launch-ready digital experience.",
  "讓建檔、計算、寄送與回簽，從紙本往返變成一條數位流程。":
    "Turning record setup, calculation, delivery, and countersigning from paper handoffs into one digital flow.",

  // ── Section titles ──
  "專案總覽 Overview": "Overview",
  "問題定義 Problem": "Problem",
  "了解使用者情境 Understand": "Understand Users",
  "收斂與洞察 Converge": "Converge & Insights",
  "測試與設計迭代 Iterate": "Test & Iterate",
  "原型設計 Prototype": "Prototype",
  "學習反思 Reflections": "Reflections",

  // ── Overview ──
  "Laushu 勞贖為籌備上線中的數位化勞報單系統。此設計優化專案與其負責人合作，測試現有紙本勞報單數位化的流程易用性，於上線前提供改善建議。":
    "Laushu is a digital labor-remuneration-form system preparing for launch. This UX optimization project, in collaboration with its product owner, tested the usability of digitizing the existing paper-based form flow and delivered improvement recommendations before launch.",
  "了解紙本勞報單報帳流程、拆解利害關係人需求，並優化數位化勞報單報帳體驗。":
    "Understand the paper-based filing flow, break down stakeholder needs, and improve the digital filing experience.",
  "針對公司發送勞報單給外包人員流程優化設計：包含新建外包人員、建立勞報單、合併勞報單。":
    "Optimized the flow of a company sending forms to contractors: adding contractors, creating forms, and merging forms.",
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
  "勞贖主要使用者，透過勞贖寄出勞報單，協助公司供外包工作者確認、彙整勞報資料（會計事務所 / 會計師 / 記帳士）。":
    "Laushu's primary user — sends forms through Laushu and helps companies get contractor confirmations and compile records (accounting firm / accountant / bookkeeper).",
  "公司使用者": "Company user",
  "會計事務所的主要服務對象，會計事務所協助公司向旗下外包工作者開立勞報單。":
    "The accounting firm's main client; the firm helps the company issue forms to its contractors.",
  "外包工作者": "Contractor",
  "勞贖的終端使用者，確認勞報單是否成立，並向公司領取工資。":
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
  "使用者回饋": "User feedback",
  "系統易用性分數": "System usability score",

  // ── Survey / interview structure ──
  "篩選受訪者": "Screening interviewees",
  "問卷": "Survey",
  "設計問卷篩選受訪者，了解目前勞報單填寫過程中，哪些環節感到繁雜（會計師：建立 → 發送 → 回收 → 彙整）。":
    "Designed a survey to screen interviewees and learn which parts of the current form-filling process feel tedious (accountant: create → send → collect → compile).",
  "設計問卷篩選受訪者，了解目前勞報單填寫過程中，哪些環節感到繁雜（會計師：建立 → 發送 → 回收 → 彙整），並回收問卷驗證樣本輪廓。":
    "Designed a survey to screen interviewees, identify which parts of the form-filling process feel tedious (accountant: create → send → collect → compile), and validate the participant profile.",
  "基本資料": "Basic info",
  "身份、年齡、年資": "Identity, age, seniority",
  "使用勞報單經驗": "Labor-form experience",
  "了解建立勞報單經驗": "Form-creation experience",
  "了解建檔的過程感受": "How filing feels",
  "了解目前勞報單填寫過程中，哪些過程感到繁雜。": "Learn which parts of the current form-filling process feel tedious.",
  "會計師：建立 → 發送 → 回收 → 彙整。": "Accountant: create → send → collect → compile.",
  "問卷結果": "Survey results",
  "量化精選": "Quantitative highlights",
  "份問卷收集": "surveys collected",
  "份有效問卷": "valid responses",
  "篩選題回答「是」": "answered “yes” to the screening question",
  "受訪者職業分布": "Participant role distribution",
  "位填答": "respondents",
  "一般公司會計": "In-house accountant",
  "記帳士": "Bookkeeper",
  "其他": "Other",
  "處理經驗": "Experience",
  "未滿 1 年": "Under 1 year",
  "1–未滿 3 年": "1–under 3 years",
  "3–未滿 5 年": "3–under 5 years",
  "5 年以上": "5+ years",
  "每次處理份數": "Forms handled at a time",
  "10 份以下": "10 or fewer",
  "11–50 份": "11–50",
  "51–200 份": "51–200",
  "201 份以上": "201 or more",
  "樣本與原先規劃的 TA 相符，且多數填答者具一年以上實務經驗，能作為後續訪談篩選與研究方向的參考。":
    "The sample matched the planned target audience, and most respondents had over a year of hands-on experience, making the results useful for interview screening and research direction.",
  "核心洞察": "Core insight",
  "單一步驟不難，整體流程卻很耗時": "Each step feels easy, but the full process is time-consuming",
  "單步驟感受": "Individual steps",
  "熟悉後多半不覺得困難": "Most steps feel easy once familiar",
  "照著填就好": "Just follow the form",
  "電子化後變得很輕鬆": "Digitization made it much easier",
  "存檔超簡單": "Filing is very simple",
  "公司已有固定 SOP": "The company already has a standard process",
  "整體痛點": "End-to-end pain points",
  "量一大、要追蹤時就變麻煩": "High volume and tracking make it tedious",
  "整體而言有點麻煩": "Overall, it is somewhat tedious",
  "等待回簽、追蹤進度比較麻煩": "Waiting for signatures and tracking progress is troublesome",
  "大量收回勞報單時，處理就會很麻煩": "Handling a large batch of returned forms becomes difficult",
  "蠻花時間，也覺得很無趣": "It takes time and feels repetitive",
  "拆開看，每個步驟都不難，甚至已習慣成自然；但合起來、數量增加、需要追蹤回簽進度時，整體就變得花時間又無趣。因此下一步透過深入訪談，先聚焦會自己經手勞報單的公司端。":
    "Each step is easy in isolation and often habitual. But when combined at scale with signature tracking, the process becomes time-consuming and repetitive. This led us to conduct deeper interviews, focusing first on company-side users who handle the forms themselves.",
  "訪談大綱": "Interview guide",
  "訪談": "Interview",
  "本次共回收 39 份有效問卷。雖然問卷回收對象以會計師／會計人員為主，但實際聯繫訪談者的過程未如預期順利，最終僅成功訪談 1 位會計師。因此，後續利害關係人訪談調整為以公司負責人／負責單位為主要對象，並圍繞以下三個面向進行深入訪談：":
    "This round collected 39 valid survey responses. Although most respondents were accountants or accounting staff, recruiting interview participants did not go as smoothly as expected, and only one accountant was ultimately interviewed. As a result, the follow-up stakeholder interviews shifted toward company owners or responsible teams as the primary participants, exploring the following three areas in depth:",
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
  "三位受訪者的訪談整理": "Synthesis of the three interviews",
  "摘要": "Summary",
  "下面整理三位受訪者的訪談摘要，從資料管理、會計配合到勞報單流程，盤點他們各自的經手方式與最有感的痛點。":
    "Below is a synthesis of the three interviews — covering data management, working with accountants, and the labor-form flow — capturing how each person handles things and the pain points they feel most.",
  "P2 節目企劃": "P2 Program planner",
  "#有長期配合的人員 #臨時工讀生": "#Long-term partners #Temp part-timers",
  "對他來說最麻煩的是工讀生很容易忘記帶勞報單；要簽收還得備齊身分證、存摺等證件，常常缺東缺西。":
    "His biggest headache is that part-timers easily forget to bring their forms — and signing off requires documents like ID cards and bankbooks, which often end up missing.",
  "P3 會計師": "P3 Accountant",
  "#有許多配合的公司 #一年收一次勞報單": "#Many client companies #Collects forms once a year",
  "因為一年只收一次，很容易發生檔案遺失或忘記存檔的狀況；對他來說，怎麼減少會計師與公司之間的隔閡才是重點。":
    "Because forms are collected only once a year, files easily get lost or go unsaved — so for him, the key is reducing the gap between accountants and companies.",
  "Laushu 訪談者一 攝影工作室老闆訪談整理": "Laushu interviewee 1 — photography studio owner synthesis",
  "Laushu 訪談者二 節目企劃訪談整理": "Laushu interviewee 2 — program planner synthesis",
  "Laushu 訪談者三 會計師訪談整理": "Laushu interviewee 3 — accountant synthesis",

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
  "邀請上次接受訪談的 2 位受訪者再次進行介面評估：":
    "Invited the two prior interviewees back to evaluate the interface:",
  "邀請上次接受訪談的 2 位受訪者再次進行介面評估。針對三個重要用例繪製流程圖，透過 Figma 原型讓受訪者以放聲思考法完成任務測試，並填寫 SUS 易用性量表。":
    "Invited the two prior interviewees back to evaluate the interface. For the three key use cases I drew flows and built Figma prototypes, ran think-aloud task tests, and collected SUS usability scores.",
  "節目企劃：長期需要外包主持人": "Program planner: needs outsourced hosts long-term",
  "攝影工作室老闆：長期需要外包攝影師合作拍攝": "Studio owner: needs outsourced photographers long-term",
  "針對三個重要用例繪製流程圖，透過 Figma 原型讓受訪者以放聲思考法完成任務測試，並填寫 SUS 易用性量表：":
    "For the three key use cases, I drew flow diagrams, used Figma prototypes for think-aloud task testing, and collected SUS usability scores:",
  "設計介面、元件迭代": "Interface and component iteration",
  "這次介面與元件迭代聚焦在降低判斷成本、提升核對效率。透過調整資訊排序、用詞、提示文字與列表呈現，讓使用者能更快找到正確資料、理解欄位意義，並在寄出或合併前完成確認，降低錯填、漏填與誤合併的風險。":
    "This interface and component iteration focused on lowering decision cost and improving checking efficiency. By adjusting information order, wording, helper text, and list presentation, users can find the right records faster, understand field meaning, and confirm details before sending or merging, reducing wrong entries, omissions, and mistaken merges.",
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
  "SUS ：82.5 (excellent) 介面容易了解與使用。": "SUS: 82.5 (excellent). The interface was easy to understand and use.",
  "根據任務測試與 SUS 分數收斂迭代方向，作為最終 Hi-fi 原型的設計依據。":
    "Converged the iteration direction from task tests and SUS scores as the basis for the final hi-fi prototype.",

  // ── Prototype ──
  "最終 UI flow 展示": "Final UI flow showcase",
  "根據測試結果迭代完成 Hi-fi 原型，聚焦三條核心流程：建立外包人員、建立勞報單、合併勞報單。":
    "Iterated to a hi-fi prototype based on test results, focused on three core flows: adding contractors, creating forms, and merging forms.",
  "Flow 1｜建立外包人員資料庫": "Flow 1｜Build the contractor database",
  "把外包人員的基本與付款資料建檔成資料庫，日後建立勞報單可直接帶入，免去重複輸入。":
    "Save each contractor's basic and payment details as a database, so labor forms can pull them in later without re-typing.",
  "進入「外包人員名單」，可瀏覽已建檔的外包人員，點「新建人員」開始建立。":
    "Open the contractor list to browse existing contractors, then click \"Add contractor\" to start.",
  "填寫基本資料（姓名、電子郵件、身分證字號、戶籍地址…）與付款資料（支付方式、銀行帳號），並上傳身分證、存摺封面。":
    "Fill in basic details (name, email, ID number, registered address…) and payment details (method, bank account), then upload the ID and passbook cover.",
  "資料填寫完成、證件上傳後，點「儲存並離開」完成建檔。":
    "Once the form is complete and documents are uploaded, click \"Save and leave\" to finish the record.",
  "回到名單，新建的「王明明」已加入資料庫，日後建立勞報單可直接選用。":
    "Back on the list, the new contractor \"Wang Ming-ming\" is now in the database, ready to be selected for future forms.",
  "Flow 2｜建立勞務報酬單": "Flow 2｜Create a labor-payment form",
  "協助公司建立勞報單，系統自動計算稅額，再寄出確認信給外包人員線上簽收。":
    "Help the company create a form, auto-calculate the tax, then send a confirmation email for the contractor to counter-sign online.",
  "進入「勞務報酬單」頁面，點「建立勞報單」開始。":
    "Open the \"Labor Forms\" page and click \"Create form\" to start.",
  "選擇填寫人（自行填寫 / 外包人員填寫），填寫基本資料、勞務內容與金額；系統自動帶出所得稅與二代健保。":
    "Choose who fills it in (yourself / the contractor), then enter basic info, work details and amount; the system auto-calculates income tax and supplementary health insurance.",
  "帶入存摺封面與完整金額明細，確認「實付給所得人」金額後準備寄出。":
    "The passbook cover and full amount breakdown are pulled in; confirm the \"net paid to recipient\" amount before sending.",
  "點「填寫完畢，寄出確認信」跳出視窗，可用預設訊息或自訂信件主旨與內文，並預覽文件。":
    "Clicking \"Done, send confirmation email\" opens a dialog where you can use the default message or customize the subject and body, and preview the document.",
  "系統將勞報單寄到所得人 email 簽收，並提醒對方在期限前完成簽收。":
    "The system emails the form to the recipient for counter-signing and reminds them to sign before the deadline.",
  "回到勞報單清單，剛建立的單據已加入，可追蹤後續簽收狀態。":
    "Back on the form list, the newly created form has been added, so its counter-sign status can be tracked.",
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
  "以替代研究策略推進流程驗證": "Advancing flow validation with alternative research strategies",
  "如果重新執行一次，我會在研究初期建立主要與替代受訪者名單，降低招募不順對研究進度的影響。當無法訪談核心利害關係人時，會改以協作角色訪談、非同步訪談或流程文件分析補足資訊缺口。\n\n設計策略上，會先將已掌握的會計人員流程定義為 MVP 假設，並透過第一版上線後的任務完成率、錯誤率與使用者回饋進行驗證。若初版成效不如預期，再依據實際使用情境推出 v2 上線版本，持續優化流程。":
    "If I were to run the project again, I would build both primary and backup participant lists early in the research phase to reduce the impact of recruiting delays. When core stakeholders cannot be interviewed, I would use collaborator interviews, asynchronous interviews, or process document analysis to fill the information gaps.\n\nStrategically, I would first define the accounting-staff workflow already understood as an MVP hypothesis, then validate it after the first release through task completion rate, error rate, and user feedback. If the initial version underperforms, I would use real usage scenarios to shape a v2 release and continue improving the flow.",
  "介面用詞與說明，本身就是體驗": "Interface wording and guidance are part of the experience",
  "勞報單牽涉稅率、申報類別、二代健保這些專業概念，使用者不見得懂。回頭看會發現很多次迭代其實都在「改用詞」和「補說明」，例如把不直覺的「所得人」換成看得懂的講法、在容易卡住的地方補一句解釋、把扣稅百分比直接標出來。這讓我體會到：介面文字本身就是體驗的一部分，把專業術語翻成使用者的語言，常常比多加一個功能更能降低操作門檻。":
    "Labor forms involve professional concepts such as tax rates, filing categories, and supplementary health insurance that users don't necessarily understand. Looking back, many iterations were really about \"rewording\" and \"adding guidance\": replacing the unintuitive term \"income recipient\" with plainer language, adding a line of explanation where people got stuck, and surfacing the withholding percentage directly. It made me realize interface copy is itself part of the experience; translating jargon into the user's language often lowers the barrier more than adding another feature.",
  "從流程優化走向商業導入驗證": "From flow optimization to business adoption validation",
  "若後續繼續推進，我會將重點從流程可用性延伸到商業導入驗證。Laushu 不只是勞務報酬單的線上化工具，更需要釐清誰是實際使用者、誰是導入決策者，以及系統能為公司降低多少行政與溝通成本。\n\n因此，下一步會補充訪談公司負責人、財務／人資主管與會計事務所，了解不同角色對導入工具的決策標準。同時將 UX 指標轉化為更具商業意義的成效指標，例如處理時間、錯誤率、來回確認次數與人力成本變化，進一步評估產品是否具備 B2B SaaS、按使用量計費，或作為會計事務所工具包的商業潛力。":
    "If the project continues, I would extend the focus from flow usability to business adoption validation. Laushu is not only a tool for digitizing labor-remuneration forms; it also needs to clarify who the actual users are, who makes adoption decisions, and how much administrative and communication cost the system can reduce for companies.\n\nThe next step would be to interview company owners, finance or HR leads, and accounting firms to understand each role's decision criteria for adopting the tool. I would also translate UX metrics into more business-relevant outcome metrics, such as processing time, error rate, back-and-forth confirmation count, and labor cost change, to further evaluate whether the product has potential as a B2B SaaS product, a usage-based service, or part of an accounting-firm toolkit.",

  // ── Design iteration boards ──
  "設計迭代與元件迭代": "Design & component iterations",
  "依任務測試發現的問題，逐一調整介面流程與元件用詞。下面以 Before / After 對照，呈現每個操作流程的調整重點。":
    "Based on problems surfaced in the task tests, I adjusted interface flows and component wording one by one. Each task flow's key changes are shown below as a Before / After comparison.",
  "操作流程 1": "Task flow 1",
  "操作流程 2": "Task flow 2",
  "操作流程 3": "Task flow 3",
  "操作流程 4": "Task flow 4",
  "操作流程 5": "Task flow 5",
  "操作流程 6": "Task flow 6",
  "外包人員名單資訊排序": "Reordering the contractor list columns",
  "調整欄位優先級，提升人員辨識效率": "Reprioritize columns to speed up contractor recognition",
  "原本的欄位排序以一般資料欄位為主，將電子郵件與身分證字號放在前段，但在實際查找外包人員時，使用者更需要先確認姓名、戶籍地址與匯款資料，才能快速判斷是否正確對象。":
    "Originally the columns led with general data fields, putting email and ID number up front. But when actually looking up a contractor, users first need to confirm the name, registered address and remittance details to quickly judge whether it's the right person.",
  "原本的欄位排序以一般資料欄位為主，將電子郵件與身分證字號放在前段，但在實際查找外包人員時，使用者更需要先確認姓名、戶籍地址與匯款資料，才能快速判斷是否為正確對象。":
    "Originally the columns led with general data fields, putting email and ID number up front. But when actually looking up a contractor, users first need to confirm the name, registered address and remittance details to quickly judge whether it's the right person.",
  "調整後將欄位順序改為「姓名 → 戶籍地址 → 存摺 → 身分證字號 → 電子郵件」，把變動性低、辨識度高，且與付款流程直接相關的資訊提前，降低橫向掃描成本，提升查找與核對效率。":
    "After the change, the column order became \"Name → Registered address → Passbook → ID number → Email,\" moving low-volatility, high-recognition information directly tied to payment to the front — lowering horizontal scanning cost and improving lookup and cross-checking efficiency.",
  "勞務內容與金額填寫區": "Work details and amount entry area",
  "增加稅額與日期提示，提升金額核對準確性": "Add tax and date hints to improve amount-checking accuracy",
  "原本在建立勞務報酬單時，稅額資訊雖然有顯示在金額區塊中，但缺少明確的稅率百分比與文字說明。使用者對於常填寫的類別稅額較熟悉，但遇到不常填的申報類別時，容易忘記適用的扣款規則，導致需要另外查詢或人工確認。":
    "When creating a labor form, tax information appeared in the amount block but lacked an explicit tax-rate percentage and explanation. Users knew the tax for categories they filed often, but for less common filing categories they easily forgot the applicable rules, leading to extra lookups or manual checks.",
  "調整後在申報類別旁補上「瞭解更多」說明入口，讓使用者可以查看各類別的扣稅說明；並在付款日期下方加入提醒文字，提示付款日期須晚於勞務期間，避免填寫不合理的付款時間。金額區塊也直接標示代扣所得稅與二代健保的扣款百分比，讓填寫方與核對方都能快速確認計算依據，同時提醒需留意外國人的稅率可能不同，降低金額與稅額核對錯誤的風險。":
    "After the change, a \"Learn more\" entry was added beside the filing category so users can view each category's withholding explanation; a reminder below the payment date notes it must fall after the work period, preventing unreasonable payment times. The amount block now directly shows the withholding percentages for income tax and supplementary health insurance, letting both filer and checker confirm the calculation basis quickly, while flagging that foreign residents' rates may differ — reducing the risk of amount and tax mismatches.",
  "填寫人選擇元件": "The \"who fills it in\" selector",
  "修正填寫人用詞，明確區分資料建立情境": "Fix the wording to clearly distinguish data-entry scenarios",
  "原本在建立勞務報酬單時，「填寫人」區塊使用「請所得人填寫」與「自行填寫」作為選項文字，但「所得人」這個用詞對使用者來說較不直覺，容易不確定是指外包人員、公司內部人員，還是報酬單建立者本人。下方的「新進人員／既有勞務人員」也容易讓人誤解為是否已建立人員資料，而不是在區分外包人員的狀態。":
    "The \"filler\" block originally used \"Have the income recipient fill it in\" and \"Fill in yourself\" as option labels, but \"income recipient\" was unintuitive — users weren't sure whether it meant the contractor, internal staff, or the form creator. The \"New staff / Existing labor personnel\" options below were also misread as whether a record already existed, rather than distinguishing the contractor's status.",
  "調整後將選項文字修正為「外包人員填寫」與「自行填寫」，直接點出資料由誰填寫，讓使用者能更快理解兩種填寫方式的差異。同時將下方選項改為「首次外包人員／既有外包人員」，明確區分是第一次建立資料的外包人員，還是已存在於名單中的外包人員，降低用詞造成的判斷成本。":
    "After the change, the options were corrected to \"Contractor fills in\" and \"Fill in yourself,\" directly stating who enters the data so users grasp the difference faster. The lower options became \"First-time contractor / Existing contractor,\" clearly distinguishing a contractor recorded for the first time from one already on the list — lowering the judgment cost caused by wording.",
  "調整後將選項文字修正為「外包人員填寫」與「自行填寫」，直接點出由誰完成，讓使用者能更快理解兩種填寫方式的差異。同時將下方選項改為「首次外包人員／既有外包人員」，明確區分是第一次建立資料的外包人員，還是已存在於名單中的外包人員，降低用詞造成的判斷成本。":
    "After the change, the options were corrected to \"Contractor fills in\" and \"Fill in yourself,\" directly stating who completes it so users grasp the difference faster. The lower options became \"First-time contractor / Existing contractor,\" clearly distinguishing a contractor recorded for the first time from one already on the list — lowering the judgment cost caused by wording.",
  "列表資料呈現區": "List data presentation",
  "優化資料呈現，快速查看已建立勞報單": "Improve presentation for quickly reviewing created forms",
  "原本的勞務報酬單列表雖然已顯示建立日期、姓名、勞務內容、金額與簽收進度，但資料呈現較接近一般清單，缺少能幫助使用者快速判斷時間區間與資料批次的視覺提示。當勞報單數量增加時，使用者需要逐筆掃描日期，才能分辨哪些資料屬於同一年、同一批或需要優先處理的期間，查找效率較低。":
    "The labor-form list already showed creation date, name, work details, amount and counter-sign progress, but the presentation read like an ordinary list, lacking visual cues to help users judge time ranges and batches quickly. As forms grew, users had to scan dates row by row to tell which belonged to the same year, batch, or priority period — making lookup inefficient.",
  "調整後強化「建立日期」欄位的辨識度，並以不同年份作為視覺區分，讓使用者能更快掌握勞務報酬單建立時間與資料區間。列表下方也新增分頁設計，避免大量資料一次展開造成閱讀負擔，讓使用者可以分批查看已建立的勞報單。":
    "After the change, the \"Creation date\" column was made more prominent, using different years as a visual divider so users grasp form creation time and data ranges faster. Pagination was added below the list to avoid the reading burden of expanding all data at once, letting users review created forms in batches.",
  "寄出確認視窗": "Send-confirmation dialog",
  "增加預覽狀態，降低寄出前的不確定感": "Add a preview state to reduce pre-send uncertainty",
  "原本在建立勞務報酬單時，使用者填完資料後會直接進入寄出通知信的編輯視窗，雖然可以修改信件標題與內容，但無法在寄出前完整預覽勞報單實際內容。對使用者來說，這會產生「資料是否正確填寫」、「寄出去後對方會看到什麼」的不確定感，尤其勞務報酬單涉及姓名、地址、金額、稅額與付款日期等重要資訊，若沒有最後確認步驟，寄出前容易感到緊張。":
    "Originally, after filling in the data users went straight to the notification-email editor. They could edit the email's title and content but couldn't fully preview the labor form's actual content before sending. This created uncertainty about whether the data was correct and what the recipient would see — and since labor forms involve names, addresses, amounts, taxes and payment dates, without a final check step users easily felt anxious before sending.",
  "調整後在寄出前新增「預覽文件」狀態，讓使用者可以先從信件編輯進入勞報單預覽畫面，完整檢查基本資料、勞務內容、勞務金額與相關填寫資訊是否正確。確認無誤後，再按下確認按鈕完成寄出。":
    "After the change, a \"Preview document\" state was added before sending, so users can enter the labor-form preview from the email editor and fully check basic info, work details, amount and related fields. Once confirmed correct, they press the button to complete the send.",
  "合併清單顯示": "Merged-list display",
  "優化合併勞報單功能，清楚顯示合併清單": "Improve merging to clearly show the merged list",
  "原本在合併多張勞報單時，使用者點選要合併的項目後，列表中只以一般文字或單列資料呈現合併結果，較難清楚辨識哪些勞報單已被納入同一張合併單。尤其當同一位外包人員有多筆不同日期或不同勞務內容的資料時，使用者需要重新比對清單，才能確認目前合併的是哪幾筆資料，增加核對成本。":
    "Originally, when merging multiple forms, after selecting items the list showed the result as plain text or a single row, making it hard to tell which forms had been combined into the same merged form. Especially when one contractor had several records of different dates or work content, users had to re-compare the list to confirm which records were merged — adding checking cost.",
  "調整後將已合併的勞報單以群組方式呈現，並透過底色區塊清楚標示合併範圍，讓使用者可以一眼看出哪些資料被收合在同一張合併單中。同時在備註欄補上合併單號與合併狀態，讓合併後的資料來源與關聯性更明確。":
    "After the change, merged forms are shown as a group, with a background-colored block clearly marking the merge scope so users can see at a glance which records are folded into the same merged form. A merge number and merge status were added in the notes column, making the merged data's source and relationships clearer.",

  // ── Task flowcharts ──
  "針對三個重要用例繪製任務流程圖，作為原型測試的腳本依據（手機可左右滑動檢視）。":
    "Task flowcharts were drawn for the three key use cases as the script for prototype testing (swipe horizontally on mobile).",
  "是": "Yes",
  "否": "No",
  "建立外包人員資料庫任務流程圖": "Build a contractor database — task flow",
  "建立勞務報酬單任務流程圖": "Create a labor form — task flow",
  "合併多張勞務報酬單任務流程圖": "Merge multiple labor forms — task flow",
  // Flow 2
  "建立勞務報酬單，發送系統連結給外包人員填寫資料 / 回簽":
    "Create a labor form and send a link for the contractor to fill in / counter-sign",
  "↩ 流程中可「儲存並返回」勞務報酬單頁面；點選「寄出確認信」後返回首頁，並發送信件給外包人員。":
    "↩ You can \"save and return\" to the labor-form page along the way; after \"Send confirmation email,\" it returns to the home page and emails the contractor.",
  "儲存並返回": "Save and return",
  "取消": "Cancel",
  "返回勞務報酬單頁面，且發送信件給外包人員": "Return to the labor-form page and email the contractor",
  "勞務報酬單頁面": "Labor-form page",
  "建立勞報單（所得人填寫）": "Create form (recipient fills in)",
  "建立勞報單（公司客戶填寫・新增外包人員）": "Create form (company fills in · new contractor)",
  "建立勞報單（公司客戶填寫・既有外包人員）": "Create form (company fills in · existing contractor)",
  "建立勞務報酬單頁面": "Create labor-form page",
  "填寫資料：基本資料、勞報內容與金額、付款資訊": "Fill in: basic info, work details & amount, payment info",
  "填寫資料：接待姓名、勞報內容與金額": "Fill in: name, work details & amount",
  "點擊「填寫完畢」": "Click \"Done\"",
  "編輯發送信件頁面": "Edit & send email page",
  "點選「寄出確認信」": "Click \"Send confirmation email\"",
  // Flow 1
  "建立外包人員資料庫，便於掌管人員個人資料": "Build a contractor database to manage personal data",
  "↩ 「儲存」後返回外包人員資料頁；「編輯／查看人員頁」返回人員業務頁；「儲存並建立勞報單」接續建立勞報單流程。":
    "↩ After \"Save,\" it returns to the contractor data page; \"Edit / View person page\" returns to the staff-tasks page; \"Save and create form\" continues into the create-form flow.",
  "外包人員資料頁": "Contractor data page",
  "建立人員勞報單": "Create the person's labor form",
  "建立勞報單頁": "Create-form page",
  "新增外包人員": "Add contractor",
  "新增人員頁": "Add-person page",
  "填寫身份資料": "Fill in identity data",
  "是否已有相同身分證字號": "Same ID number exists?",
  "上傳身分證存摺影本": "Upload ID & passbook copy",
  "儲存並建立勞報單": "Save and create form",
  "儲存": "Save",
  "系統提醒曾建立過": "System warns it already exists",
  "查看業務": "View tasks",
  "人員業務頁": "Staff-tasks page",
  "編輯個人資料": "Edit personal data",
  "編輯人員頁": "Edit-person page",
  "查看個人資料": "View personal data",
  "查看人員頁": "View-person page",
  // Flow 3
  "合併多張勞務報酬單，減少回簽次數與調整稅額": "Merge multiple labor forms to cut counter-signs and adjust tax",
  "↩ 「是否超過兩萬」為否、或「單張確認頁」確認後，皆進入「寄送簽收」。":
    "↩ If \"over NT$20,000\" is no, or after the single-form confirmation page, both proceed to \"send for counter-sign.\"",
  "承辦人建立外包人員資訊": "Officer creates contractor info",
  "承辦人建立勞報單頁": "Officer's create-form page",
  "活動結束，承辦人執行支付款項": "After the event, the officer makes the payment",
  "搜尋外包者姓名": "Search contractor name",
  "同一個外包者多張勞報單結果畫面": "Results showing multiple forms for the same contractor",
  "勾選同一外包者的多張勞報單": "Select multiple forms of the same contractor",
  "合併": "Merge",
  "選擇單張、確認合併": "Select forms and confirm merge",
  "是否超過兩萬": "Over NT$20,000?",
  "文字提醒：代扣二代健保": "Note: withhold supplementary health insurance",
  "是否拆單": "Split the form?",
  "單張確認頁": "Single-form confirmation page",
  "寄送簽收": "Send for counter-sign",
} as const;

type LaushuKey = keyof typeof en;

export function translateLaushu(locale: Locale, text: string) {
  return locale === "en" ? en[text as LaushuKey] ?? text : text;
}
