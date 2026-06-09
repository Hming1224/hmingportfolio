export type ExperiencePoint =
  | string
  | { text: string; highlight?: boolean }[];

export const experiences = [
  {
    year: "2024",
    title: "Advantech 研華科技",
    role: "UIUX 設計實習生",
    date: "2024.06 - 2024.08",
    image: "/projects/advantech/cover/cover.webp",
    points: [
      [
        { text: "參與 Edge AI 平台產品設計，於 " },
        { text: "2.5 個月內完成 3 次設計提案", highlight: true },
        { text: "，並依時程通過上級主管/ CEO 審查。" },
      ],
      "進行使用者訪談與痛點分析，將企業級 AI 產品需求整理為可討論、可驗證的功能方向。",
      "設計並提案 AI Chatbot 整合方案，與專案 PM 協助團隊評估後續產品路線與功能模組優先順序。",
      [
        { text: "最終提案中有 " },
        { text: "2 項主要模組功能獲採納", highlight: true },
        { text: "，順利進入工程開發排程。" },
      ],
    ] satisfies ExperiencePoint[],
  },
  {
    year: "2023",
    title: "Crypto-Arsenal",
    role: "UIUX & PM 實習生",
    date: "2023.03 - 2023.10",
    image: "https://framerusercontent.com/images/dIryK4ZcMPoWUc9rlwSZzl9F88Y.jpeg",
    points: [
      "維護並重整 Design System，統一 3大不同功能元件與對應頁面，並應用於 20+ 個產品設計流程，提升視覺與互動一致性。",
      "進行使用者訪談與競品分析，完成 6+ 個產品功能，既有產品優化 12+ 項 UX 問題，與 20+ 個 RWD 頁面設計。",
      [
        { text: "在 Scrum 中擔任助理 PO，優化設計流程與檔案管理，" },
        { text: "協助 Sprint 產出提升至過往 1.5 倍", highlight: true },
        { text: "。" },
      ],
    ] satisfies ExperiencePoint[],
  },
  {
    year: "2022",
    title: "Taiwan Blockchain Academia",
    role: "產品設計師（約聘）",
    date: "2022.11 - 2023.02",
    image: "https://framerusercontent.com/images/CA1UxcHBL02pPYicWXOrbAAjruA.jpg",
    points: [
      "透過使用者訪談與研究，釐清非技術使用者進入 Web3 服務時的理解斷點與操作阻礙。",
      "與產品經理及國泰金控技術團隊協作，對齊產品規格、開發方向與合規情境下的使用者體驗。",
      "製作 wireframe 與互動 prototype，支援可用性測試與多輪設計迭代。",
      "協助工程團隊將區塊鏈技術整合至使用流程，同時維持服務的易用性與可理解性。",
    ] satisfies ExperiencePoint[],
  },
  {
    year: "2021",
    title: "LCFC 合肥聯寶電子科技",
    role: "助理專案管理師",
    date: "2021.05 - 2021.12",
    image: "https://framerusercontent.com/images/2aFK7DdC44h75205XrUXIGN0s.jpeg",
    points: [
      [
        { text: "協調工程、供應商與跨部門時程，" },
        { text: "平均提前 1.5 週", highlight: true },
        { text: "完成預訂交付。" },
      ],
      "在 2 個 milestone 中因應物料短缺風險，重新協調料件與測試排程，成功將原可能延誤的時程拉回期限內。",
      "撰寫產品規格並與工程師對齊可行性測試，在品質標準、供應限制與交付壓力間維持平衡。",
    ] satisfies ExperiencePoint[],
  },
];

export const skillCategories = [
  {
    title: "產品設計",
    toneClass: "is-product-design",
    iconId: "layout",
    skills: ["UI flow", "設計系統", "線框圖 / 原型設計", "響應式網頁設計", "基礎前端知識"],
  },
  {
    title: "使用者研究",
    toneClass: "is-user-research",
    iconId: "users",
    skills: ["使用者訪談", "利害關係人訪談", "競品分析", "親和圖", "使用者旅程圖", "易用性測試"],
  },
  {
    title: "AI 工具",
    toneClass: "is-ai-tools",
    iconId: "cpu",
    skills: ["Claude Code", "Codex", "Figma Make", "Canva AI", "NoteBookLM"],
  },
  {
    title: "協作與管理",
    toneClass: "is-collaboration",
    iconId: "briefcase",
    skills: ["Jira / Trello", "Scrum 敏捷開發", "跨部門溝通", "專案時程控管"],
  },
];

export const tools = [
  ["Figma", "https://framerusercontent.com/images/NFQE0lJpudFMnMlrxUlqwsTZobI.png"],
  ["Canva", "https://framerusercontent.com/images/xViGpNQGhsx0NAPy32ilYcniF4.png"],
  ["Framer", "https://framerusercontent.com/images/iGMc0V6aPbUXiqLig37GL6mpDYw.png"],
  ["ProtoPie", "https://framerusercontent.com/images/qU7g8XziPvJiqL5NgCjlmuGcY.png"],
  ["Photoshop", "https://framerusercontent.com/images/G2wWkpP4Un4CQNemoiK0ou60O7o.png"],
  ["Illustrator", "https://framerusercontent.com/images/M0cU5uSFBQOhsa5CV9hdrPIMPY.png"],
  ["Adobe XD", "https://framerusercontent.com/images/7u5X456ibsvVQsGgqzKdFJ2ukIs.png"],
  ["After Effects", "https://framerusercontent.com/images/5ozjkYgaLwp6eZsoVcGOW30U1z4.png"],
] as const;

export const designValues = [
  {
    iconId: "layers",
    title: "跨領域的眼界，比單一專業更能發現問題",
    desc: "機械工程的訓練讓我習慣從結構與系統出發思考，設計學習則讓我開始關注人的感受與行為。兩種視角並存，讓我更容易在別人習以為常的地方，看見值得改善的設計機會。",
  },
  {
    iconId: "search",
    title: "理解永遠優先於解法",
    desc: "我習慣在動筆之前，先花時間釐清問題真正的成因。跳過理解直接給答案，往往只是在解決表象；搞懂背後的動機與限制，設計才有機會對到真正需要改善的地方。",
  },
  {
    iconId: "zap",
    title: "好的設計讓複雜變成直覺",
    desc: "產品的邏輯可以很複雜，但使用者不應該感受到這份複雜。我把設計的成功定義為：讓人第一次使用就知道該怎麼做，不需要說明書，也不會走錯路。",
  },
];

export const educatorItems = [
  {
    badge: "40+",
    title: "OpenHCI 2024 暑期工作坊",
    href: "https://www.2024.openhci.com/",
    role: "設計組組長",
    desc: "籌備營期3個月，帶領設計組共3人負責營隊教學計劃與課程內容安排，並且於營期提供 40 位學員設計思考集訓",
    date: "2024.05-2024.08",
    image: "/educator/openhci.jpg",
  },
  {
    badge: "60+",
    title: "NCCU 112-2 人機介面設計課程",
    href: null,
    role: "課程助教",
    desc: "協助 60 位大學生Figma操作教學，負責期中 / 期末評分、批改作業與專案指導",
    date: "2024.02-2024.06",
    image: "/educator/人機介面設計課程發表.jpg",
  },
  {
    badge: "20+",
    title: "NCCU 114-1 人機互動設計課程",
    href: null,
    role: "課程助教",
    desc: "指導學碩同學共20組期末專案，提供 TA office hour 諮詢與每週作業回饋",
    date: "2025.09-2026.01",
    image: "/educator/nccu-ta.png",
  },
  {
    badge: "16+",
    title: "Evolution 設計鬆",
    href: null,
    role: "共同籌備負責人",
    desc: "主辦 2 天 1 夜設計黑客鬆，協助指導 16 位學員專案討論，協同業界設計師共同審核專案成果",
    date: "2024.06",
    image: "/educator/hackathon.jpg",
  },
];

export const experienceYears = ["2024", "2023", "2022", "2021"];

export const firstExperienceIndexByYear = experiences.reduce<Record<string, number>>(
  (result, item, index) => {
    if (result[item.year] === undefined) {
      result[item.year] = index;
    }

    return result;
  },
  {},
);
