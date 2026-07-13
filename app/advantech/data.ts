import type { ProposalTab } from "./components/ProposalTabs";

// ── 我的角色（cs-sec-role）radial 卡片 ──
export const roleCards = [
  {
    num: "01",
    title: "確立目標與設計範圍",
    desc: "與 PM 確立專案目標，協助釐清設計範圍與核心重點，確保 AI Chatbot 設計聚焦於設施管理的實際工作流程。",
  },
  {
    num: "02",
    title: "競品分析與設計機會點",
    desc: "研究競品功能、設計訪談大綱，協同找出能源管理與設備維護的主要痛點，轉化為設計機會點。",
  },
  {
    num: "03",
    title: "使用者訪談與團隊工作坊",
    desc: "整理使用者訪談內容，參與團隊工作坊，確保收集的需求與痛點能夠完整對應到專案目標。",
  },
  {
    num: "04",
    title: "功能設計與原型製作",
    desc: "負責超約預警與模式識別兩項功能的設計，包含線框稿、互動流程與原型，並製作影片分鏡協助利害關係人對齊。",
  },
];

// ── 設計流程（cs-sec-process）timeline 步驟 ──
export const processSteps = [
  { num: "01", title: "專案啟動與框架設定", desc: "建立專案目標、範疇與時程規劃，確認 AI Chatbot 的核心設計重點。" },
  { num: "02", title: "競品分析", desc: "研究現有 AI 競品功能，識別市場趨勢、差異與設計機會點。" },
  { num: "03", title: "使用者訪談與洞察整理", desc: "與目標使用者訪談，挖掘關鍵需求、行為模式與痛點，轉化為設計依據。" },
  { num: "04", title: "線框稿與介面設計", desc: "設計 AI Chatbot 介面線框，定義資訊架構與核心互動流程。" },
  { num: "05", title: "原型製作與互動流程", desc: "製作互動原型，與工程師協作確保設計符合 GenAI 技術可行性。" },
  { num: "06", title: "互動介面影片", desc: "製作影片展示最終設計體驗，向利害關係人溝通並作為開發對齊依據。" },
];

// ── 競品分析 01：產業 AI 工具（cs-sec-analysis）──
export const compAiTools = [
  { title: "Tableau Pulse", tag: "圖表旁呈現洞見", desc: "無需撰寫程式即可建立預測性機器學習模型，減少對數據科學團隊的依賴。", img: "/projects/advantech/research/comp-ai-tableau.webp" },
  { title: "Power BI Copilot", tag: "對話框提供圖表數據摘要", desc: "自動摘要報表、特定頁面或視覺效果，協助使用者快速掌握關鍵資訊。", img: "/projects/advantech/research/comp-ai-powerbi.webp" },
  { title: "Salesforce Einstein GPT", tag: "圖表旁提供建議執行計畫方針", desc: "根據使用者數據與業務需求提出個人化建議，支援後續行動追蹤。", img: "/projects/advantech/research/comp-ai-salesforce.webp" },
  { title: "PagerDuty AIOps", tag: "自動化告警通知視窗", desc: "整合監控系統並根據警報自動通知，協助團隊即時應對事件。", img: "/projects/advantech/research/comp-ai-pagerduty.webp" },
];

// ── 競品分析 02：能源管理 / 設備管理競品 ──
export const compEmsItems: { name: string; category: string; img: string; items: string[] }[] = [
  { name: "IBM Maximo Energy Optimization", category: "設備管理 / 能源管理", img: "/projects/advantech/research/comp-ems-ibm.webp",
    items: ["統一能源與資產管理平台，強調遠端可視性與深入見解。", "設備監測、數據分析、遠端監控，並透過 Copilot 對話式 AI 撈取資料與生成視覺報告。"] },
  { name: "ABB Ability Energy and Asset Manager", category: "設備管理", img: "/projects/advantech/research/comp-ems-abb.webp",
    items: ["優化資產效能、延長設備生命週期，並降低停機時間與成本。", "Senseye 預測性維護技術可尋找過去類似事例，支援設備狀態判讀與維護決策。"] },
  { name: "Schneider EcoStruxure Resource Advisor", category: "能源管理", img: "/projects/advantech/research/comp-ems-schneider.webp",
    items: ["可彈性定義數據指標，具擴充性與平台互通性，並支援監控預算。", "Resource Advisor / Efficiency AI 可生成視覺報告並提供能耗洞察。"] },
  { name: "Siemens EnergyIP", category: "能源管理", img: "/projects/advantech/research/comp-ems-siemens.webp",
    items: ["以能源資料管理與費用最佳化為核心，支援能源使用決策。", "主動優化建築物 HVAC 系統節能表現，並降低電費使用。"] },
];

// ── 設計情境（cs-sec-scenario）兩個 AI 應用情境 ──
export type ScenarioData = {
  icon: string;
  titleColor: string;
  title: string;
  desc: string;
  ai: string[];
  ai0: string[];
  ai1: string[];
  fn0: string[];
  fn1: string[];
  ui0: string[];
  ui1: string[];
  ui2: string[];
};

export const scenarios: ScenarioData[] = [
  {
    icon: "/projects/advantech/research/scenario-icon-1.webp",
    titleColor: "#005796",
    title: "情境 1：需量管理決策助手",
    desc: "協助使用者擬定最佳用電方案，提前掌握需量風險，避免超約罰款。",
    ai:   ["短期預測", "分析季節性、趨勢與外部因素，支持下季用電與電費方案選擇。"],
    ai0:  ["短期預測", "基於歷史用電與即時數據，預測近期需量並找出可能超約時段。"],
    ai1:  ["長期預測", "分析季節性、趨勢與外部因素，支持下季用電與電費方案選擇。"],
    fn0:  ["超約風險識別與建議", "即時監控峰值負荷與潛在超約風險，提供調控建議。"],
    fn1:  ["電價與契約容量管理", "評估不同電價策略與契約容量，輔助使用者選擇最佳方案。"],
    ui0:  ["圖表進階資訊與 AI 預測", "在需量圖表中顯示預測與風險提示。"],
    ui1:  ["主動通知需量超約預警", "需量接近超約風險時主動提醒。"],
    ui2:  ["對話式聊天機器人", "以問答方式取得用電與契約策略建議。"],
  },
  {
    icon: "/projects/advantech/research/scenario-icon-2.webp",
    titleColor: "#1e84a6",
    title: "情境 2：設備能效主動維護",
    desc: "主動盤查設備用能模式，偵測異常熱點，並提供維護與能效優化建議。",
    ai:   [],
    ai0:  ["模式識別", "學習歷史能耗資料，辨識正常運行模式並自動標記異常數據點。"],
    ai1:  ["事件分析", "整合維運與能源管理事件，歸納過去維修經驗與異常原因。"],
    fn0:  ["能耗熱點分析", "交叉比對維運、環境與能源資料，找出設備能耗異常來源。"],
    fn1:  ["能效優化方案", "依照維保標準流程與歷史案例，提供原因分析與處理建議。"],
    ui0:  ["E-mail 與系統通知", "運用 Email、系統通知指出設備當前問題。"],
    ui1:  ["異常熱點圖表進階分析", "可視化圖表找出設備異常問題。"],
    ui2:  ["對話式聊天機器人", "以問答方式取得維修設備等建議。"],
  },
];

// ── 設計成果（cs-sec-solution）提案 tabs ──
export const proposalScenario1Tabs: ProposalTab[] = [
  {
    label: "提案一：警示通知欄",
    slides: [
      { image: "/projects/advantech/solution/prop-sc1-t1-01.webp", caption: "系統以 notification bar 主動提示目前出現需量異常。" },
      { image: "/projects/advantech/solution/prop-sc1-t1-02.webp", caption: "使用者點擊 notification bar 後，開啟超約預警分析視窗。" },
      { image: "/projects/advantech/solution/prop-sc1-t1-03.webp", caption: "視窗中呈現目前異常的需量分析與高耗能設備列表。" },
      { image: "/projects/advantech/solution/prop-sc1-t1-04.webp", caption: "使用者可查看 AI 建議內容，判斷後續節能或調度方向。" },
      { image: "/projects/advantech/solution/prop-sc1-t1-05.webp", caption: "使用者針對 AI 建議給予回饋，讓系統累積後續優化依據。" },
    ],
    reasonTitle: "未採納原因",
    reason: "目前的前端介面與 design system 未有此 bar 設計，需要重新刻新的 component，以最低成本導入 AI 機制來說較為麻煩，且需使用者驗證效益。",
  },
  {
    label: "提案二：系統通知",
    adopted: true,
    slides: [
      { image: "/projects/advantech/solution/prop-sc1-t2-01.webp", caption: "使用者從既有 notification icon 接收需量超約提醒。" },
      { image: "/projects/advantech/solution/prop-sc1-t2-02.webp", caption: "通知依嚴重程度分級顯示，協助使用者先判斷風險等級。" },
      { image: "/projects/advantech/solution/prop-sc1-t2-03.webp", caption: "使用者點擊「了解詳細資訊」，進入需量異常分析內容。" },
      { image: "/projects/advantech/solution/prop-sc1-t2-04.webp", caption: "系統整理目前需量分析與高耗能設備，讓使用者快速掌握問題來源。" },
      { image: "/projects/advantech/solution/prop-sc1-t2-05.webp", caption: "AI 依據目前數據提出處理建議，協助使用者決定下一步。" },
      { image: "/projects/advantech/solution/prop-sc1-t2-06.webp", caption: "使用者針對 AI 建議提供回饋，讓後續預警判斷更貼近現場需求。" },
    ],
    reasonTitle: "採納理由",
    reason: "將不同緊急程度的預警通知提供給使用者，讓當前負責人員判斷問題嚴重性，並決定是否需要進一步的需量分析與能耗改善建議。",
  },
  {
    label: "提案三：圖表按鈕",
    adopted: true,
    slides: [
      { image: "/projects/advantech/solution/prop-sc1-t3-01.webp", caption: "需量圖表右上角出現警示 button，提示使用者目前有異常狀況。" },
      { image: "/projects/advantech/solution/prop-sc1-t3-02.webp", caption: "使用者點擊警示 button 後，直接開啟超約預警分析 modal。" },
      { image: "/projects/advantech/solution/prop-sc1-t3-03.webp", caption: "modal 先呈現需量異常分析，讓使用者理解風險發生原因。" },
      { image: "/projects/advantech/solution/prop-sc1-t3-04.webp", caption: "使用者查看高耗能設備列表，對照目前需要優先處理的項目。" },
      { image: "/projects/advantech/solution/prop-sc1-t3-05.webp", caption: "使用者閱讀 AI 建議並回饋結果，完成一次需量異常處理流程。" },
    ],
    reasonTitle: "採納理由",
    reason: "目前廠務人員主要視覺鎖定區域為需量分析的折線圖，直接在右上角提供醒目的 button，可以讓使用者快速發覺異常，並且點擊一次即可快速取得預警資訊。",
  },
];

export const proposalScenario2Tabs: ProposalTab[] = [
  {
    label: "提案一：系統通知",
    adopted: true,
    slides: [
      { image: "/projects/advantech/solution/prop-sc2-t1-01.webp", caption: "系統以 notification icon 主動提示設備能耗異常。" },
      { image: "/projects/advantech/solution/prop-sc2-t1-02.webp", caption: "通知依嚴重程度分類，協助使用者判斷是否需要立即處理。" },
      { image: "/projects/advantech/solution/prop-sc2-t1-03.webp", caption: "使用者點擊「進階分析」，查看設備能耗資料與冷卻水溫圖表。" },
      { image: "/projects/advantech/solution/prop-sc2-t1-04.webp", caption: "AI 依據異常數據提供維護建議，讓負責人員能針對問題處理。" },
    ],
    reasonTitle: "採納理由",
    reason: "設備能耗問題目前主要由廠務人員手動檢查各項設備，非時刻監控儀表板，為了第一時間通知負責人員，透過系統通知方式（含 Email、簡訊），可以讓負責人員接收到異常後針對性解決狀況。",
  },
  {
    label: "提案二：3D 圖按鈕",
    slides: [
      { image: "/projects/advantech/solution/prop-sc2-t2-01.webp", caption: "3D 圖中標記異常圖標，讓使用者在設備視覺化畫面中發現問題。" },
      { image: "/projects/advantech/solution/prop-sc2-t2-02.webp", caption: "使用者 hover 異常圖標後，查看目前設備問題摘要。" },
    ],
    reasonTitle: "未採納原因",
    reason: "3D 圖目前僅有預覽線路功能，雖然圖表中快速顯示異常問題很方便，但是與原有維護工程師討論後，在系統實作上較複雜，因此優先順序較後。",
  },
  {
    label: "提案三：圖表按鈕",
    slides: [
      { image: "/projects/advantech/solution/prop-sc2-t3-01.webp", caption: "報警列表右上角顯示 AI button，提供設備能耗事件分析入口。" },
      { image: "/projects/advantech/solution/prop-sc2-t3-02.webp", caption: "使用者點擊 button 後，AI chatbot 自動輸入「分析冰機設備能耗事件？」。" },
      { image: "/projects/advantech/solution/prop-sc2-t3-03.webp", caption: "AI chatbot 整理各項冰機運轉情形，協助使用者了解目前異常狀況。" },
    ],
    reasonTitle: "未採納原因",
    reason: "雖然與超約預警按鈕使用模式一致，但是當前 HVAC 系統主要使用者：廠務人員的工作流程主要圍繞在收到異常通知，才會查看系統，因此本方案與使用者習慣有所出入，因此未採納。",
  },
];

// ── 下一步（cs-sec-next）卡片 ──
export const nextStepCards = [
  {
    num: "01",
    title: "RAG 知識庫架構建構",
    text: "透過 Azure OpenAI 與本地端 Llama 模型協作，在兼顧廠區資料安全與運算效能的前提下，設計低延遲、高準確度的資料處理流程。資料流將透過 LangChain 進行 Pipeline 封裝，並優化文本切塊與向量檢索機制，讓 AI 能更準確地回應廠務管理、設備維護與能源分析問題，最終封裝為企業內部可使用的知識問答 API。",
    tags: ["Azure OpenAI", "Llama", "LangChain", "RAG", "Vector DB"],
  },
  {
    num: "02",
    title: "削峰填谷電力預測與自動化聯動",
    text: "將 AI 預測模型串接至涵蓋多站點的監控環境，讓系統能持續分析每日用電負載曲線，並建立自動化的閾值警報流程。當 AI 預測即將發生用電尖峰或超約風險時，系統能提前觸發警報，協助管理端即時進行電力調度與降載，達到預防性的能源控管目標。",
    tags: ["AI 預測模型", "自動化警報", "多站點監控", "負載分析"],
  },
];

// ── 學習反思（cs-sec-result）卡片 ──
export const resultCards = [
  {
    num: "01",
    title: "先交代誰在做決策，再展示 AI 能做什麼",
    desc: "期中發表讓我發現，功能完整不等於價值清楚。面對不熟悉能管系統的聽眾，必須先建立角色、情境與決策阻礙，再讓痛點緊接對應畫面，設計價值才不會消失在操作細節裡。",
  },
  {
    num: "02",
    title: "讓判斷主動抵達，不必等使用者開口問 AI",
    desc: "研究推翻了等待廠務主動開啟聊天框的假設。我將問題改寫為「判斷何時、以什麼形式抵達」，讓分析進入原生圖表、主動通知與延伸對話，不要求使用者先提出正確問題。",
  },
  {
    num: "03",
    title: "把產業規則拆成可驗證的介面與資料假設",
    desc: "面對需量計價，我與產品、資料和工程一起釐清 15 分鐘更新、超約時間點與高耗電清單。先把複雜規則拆成可驗證的小模型，也讓我能依資料與技術條件控制介面承諾。",
  },
  {
    num: "04",
    title: "AI 信任來自可控邊界與專家回饋",
    desc: "能源決策不能承受 AI 看似合理卻答錯。除了限制可回答的任務與資料範圍，我也把輸出定位為專業判斷的參考，並讓現場人員回饋處理方式，使經驗能被後續分析沿用。",
  },
];
