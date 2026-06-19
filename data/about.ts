import type { Locale } from "../i18n/routing";

export type ExperiencePoint =
  | string
  | { text: string; highlight?: boolean }[];

const zhExperiences = [
  {
    year: "2024",
    title: "Advantech 研華科技",
    role: "UIUX 設計實習生",
    date: "2024.06 - 2024.08",
    image: "/projects/advantech/cover/cover.webp",
    points: [
      [
        { text: "參與 AI 能源管理平台產品設計，於 " },
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

const zhSkillCategories = [
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
  ["lottielab", "/tools/lottielab-logo.png"],
  ["Photoshop", "https://framerusercontent.com/images/G2wWkpP4Un4CQNemoiK0ou60O7o.png"],
  ["Illustrator", "https://framerusercontent.com/images/M0cU5uSFBQOhsa5CV9hdrPIMPY.png"],
  ["Adobe XD", "https://framerusercontent.com/images/7u5X456ibsvVQsGgqzKdFJ2ukIs.png"],
  ["After Effects", "https://framerusercontent.com/images/5ozjkYgaLwp6eZsoVcGOW30U1z4.png"],
] as const;

const zhDesignValues = [
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

const zhEducatorItems = [
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

const enExperiences = [
  {
    year: "2024",
    title: "Advantech",
    role: "UI/UX Design Intern",
    date: "2024.06 - 2024.08",
    image: "/projects/advantech/cover/cover.webp",
    points: [
      [
        { text: "Contributed to an AI energy management platform and delivered " },
        { text: "three design proposals within 2.5 months", highlight: true },
        { text: ", passing reviews with senior leadership and the CEO on schedule." },
      ],
      "Conducted user interviews and pain-point analysis, translating enterprise AI requirements into testable product directions.",
      "Designed and proposed an AI chatbot integration, working with the project PM to evaluate the product roadmap and prioritize feature modules.",
      [
        { text: "The final proposal had " },
        { text: "two core feature modules approved", highlight: true },
        { text: " and moved into the engineering roadmap." },
      ],
    ] satisfies ExperiencePoint[],
  },
  {
    year: "2023",
    title: "Crypto-Arsenal",
    role: "UI/UX & PM Intern",
    date: "2023.03 - 2023.10",
    image: "https://framerusercontent.com/images/dIryK4ZcMPoWUc9rlwSZzl9F88Y.jpeg",
    points: [
      "Maintained and reorganized the design system, unifying three major feature areas and applying it across 20+ product design flows.",
      "Conducted user interviews and competitive analysis, delivered 6+ product features, improved 12+ UX issues, and designed 20+ responsive pages.",
      [
        { text: "Served as an assistant Product Owner in Scrum, improving design workflows and file management to " },
        { text: "increase Sprint output to 1.5x its previous level", highlight: true },
        { text: "." },
      ],
    ] satisfies ExperiencePoint[],
  },
  {
    year: "2022",
    title: "Taiwan Blockchain Academia",
    role: "Product Designer (Contract)",
    date: "2022.11 - 2023.02",
    image: "https://framerusercontent.com/images/CA1UxcHBL02pPYicWXOrbAAjruA.jpg",
    points: [
      "Used interviews and research to uncover comprehension gaps and usability barriers for non-technical users entering Web3 services.",
      "Collaborated with product managers and Cathay Financial Holdings' technology team to align product requirements, development direction, and UX within compliance constraints.",
      "Created wireframes and interactive prototypes to support usability testing and multiple rounds of design iteration.",
      "Helped engineers integrate blockchain technology into the user journey while keeping the service approachable and understandable.",
    ] satisfies ExperiencePoint[],
  },
  {
    year: "2021",
    title: "LCFC",
    role: "Assistant Project Manager",
    date: "2021.05 - 2021.12",
    image: "https://framerusercontent.com/images/2aFK7DdC44h75205XrUXIGN0s.jpeg",
    points: [
      [
        { text: "Coordinated engineering, suppliers, and cross-functional schedules to deliver " },
        { text: "an average of 1.5 weeks ahead of plan", highlight: true },
        { text: "." },
      ],
      "Responded to material shortage risks across two milestones, rescheduling components and testing to bring potentially delayed deliveries back on track.",
      "Wrote product specifications and aligned feasibility testing with engineers, balancing quality standards, supply constraints, and delivery pressure.",
    ] satisfies ExperiencePoint[],
  },
];

const enSkillCategories = [
  {
    title: "Product Design",
    toneClass: "is-product-design",
    iconId: "layout",
    skills: ["UI Flows", "Design Systems", "Wireframing / Prototyping", "Responsive Web Design", "Frontend Fundamentals"],
  },
  {
    title: "User Research",
    toneClass: "is-user-research",
    iconId: "users",
    skills: ["User Interviews", "Stakeholder Interviews", "Competitive Analysis", "Affinity Mapping", "User Journey Mapping", "Usability Testing"],
  },
  {
    title: "AI Tools",
    toneClass: "is-ai-tools",
    iconId: "cpu",
    skills: ["Claude Code", "Codex", "Figma Make", "Canva AI", "NotebookLM"],
  },
  {
    title: "Collaboration & Delivery",
    toneClass: "is-collaboration",
    iconId: "briefcase",
    skills: ["Jira / Trello", "Scrum", "Cross-functional Communication", "Project Scheduling"],
  },
];

const enDesignValues = [
  {
    iconId: "layers",
    title: "Cross-disciplinary perspectives reveal overlooked opportunities",
    desc: "Mechanical engineering trained me to think in systems and structures, while design taught me to focus on people's feelings and behavior. Together, these perspectives help me spot opportunities for improvement in places others may take for granted.",
  },
  {
    iconId: "search",
    title: "Understanding comes before solutions",
    desc: "Before designing, I take time to uncover the real cause of a problem. Jumping straight to an answer often treats only the surface; understanding motivations and constraints creates solutions that address what truly needs to change.",
  },
  {
    iconId: "zap",
    title: "Good design makes complexity feel intuitive",
    desc: "Products can be complex behind the scenes, but users should not have to feel that complexity. I consider a design successful when people understand what to do on their first try, without a manual or unnecessary detours.",
  },
];

const enEducatorItems = [
  {
    badge: "40+",
    title: "OpenHCI 2024 Summer Workshop",
    href: "https://www.2024.openhci.com/",
    role: "Design Team Lead",
    desc: "Led a three-person design team through three months of preparation, developing the curriculum and delivering an intensive design thinking workshop for 40 participants.",
    date: "2024.05-2024.08",
    image: "/educator/openhci.jpg",
  },
  {
    badge: "60+",
    title: "NCCU Human-Computer Interface Design",
    href: null,
    role: "Teaching Assistant",
    desc: "Taught Figma to 60 undergraduate students and supported grading, assignment reviews, and project mentoring throughout the course.",
    date: "2024.02-2024.06",
    image: "/educator/人機介面設計課程發表.jpg",
  },
  {
    badge: "20+",
    title: "NCCU Human-Computer Interaction Design",
    href: null,
    role: "Teaching Assistant",
    desc: "Mentored 20 undergraduate and graduate project teams through weekly feedback and TA office hours.",
    date: "2025.09-2026.01",
    image: "/educator/nccu-ta.png",
  },
  {
    badge: "16+",
    title: "Evolution Design Hackathon",
    href: null,
    role: "Co-organizer",
    desc: "Co-organized a two-day design hackathon, mentored 16 participants, and reviewed final projects with industry designers.",
    date: "2024.06",
    image: "/educator/hackathon.jpg",
  },
];

const copyByLocale = {
  "zh-TW": {
    heroTitle: "從重新認識自己，到設計產品體驗",
    intro: [
      "我是黃宣銘，一名結合 UI/UX 設計、商業願景與工程背景的 Junior Product Designer。",
      "大學時期的一場重病，讓我重新理解自己對美感與設計的熱情；而機械工程訓練出的系統思維，則成為我進入產品設計後的重要基礎。對我來說，設計不是單純美化畫面，而是將複雜的問題、需求與限制，轉化為清楚、直覺且可落地的使用者體驗。",
      "過去我參與過 B2B AI 能源管理平台、量化交易產品與 Web3 服務設計，累積使用者研究、介面設計、prototype 與跨部門協作經驗。現在的我，正持續探索 AI 工具如何幫助設計師更有效率地釐清問題、建立 MVP，並推進產品驗證，朝 Product Builder 的方向前進。",
    ],
    headings: {
      values: "設計信念",
      experience: "工作經歷",
      educator: "設計推廣",
      skills: "專業技能",
      tools: "擅長軟體",
      education: "教育背景",
    },
    education: [
      {
        school: "國立政治大學 數位內容碩士學位學程",
        date: "2023.09 - 2026.05",
        badge: "GPA 4.07",
        description: "主修使用者體驗研究、人機互動、設計思考與人工智慧。",
        image: "https://framerusercontent.com/images/Ac7sKcF2w4TpZnOI28BGtm3h8.png",
      },
      {
        school: "國立成功大學 機械工程學系",
        date: "2017.09 - 2021.02",
        description: "主修熱力學與機械設計，並以設計思維和使用者中心設計作為第二專業。",
        image: "https://framerusercontent.com/images/o53UPGa6UhydVFF9ZPVPLPqKJ20.png",
      },
    ],
  },
  en: {
    heroTitle: "From Self-Rediscovery to Product Experience Design",
    intro: [
      "I'm Brian Huang, a junior product designer combining UI/UX design, business perspective, and an engineering background.",
      "A serious illness during university led me to rediscover my passion for aesthetics and design. The systems thinking I developed through mechanical engineering later became a strong foundation for product design. To me, design is not simply about making screens look better; it is about turning complex problems, needs, and constraints into experiences that are clear, intuitive, and feasible.",
      "I have contributed to a B2B AI energy management platform, a quantitative trading product, and a Web3 service, building experience across user research, interface design, prototyping, and cross-functional collaboration. Today, I continue exploring how AI tools can help designers clarify problems, build MVPs, and accelerate product validation as I grow toward becoming a Product Builder.",
    ],
    headings: {
      values: "Design Values",
      experience: "Experience",
      educator: "Design Education",
      skills: "Skills",
      tools: "Tools",
      education: "Education",
    },
    education: [
      {
        school: "National Chengchi University, M.S. in Digital Content & Technologies",
        date: "2023.09 - 2026.05",
        badge: "GPA 4.07",
        description: "Focused on UX research, human-computer interaction, design thinking, and artificial intelligence.",
        image: "https://framerusercontent.com/images/Ac7sKcF2w4TpZnOI28BGtm3h8.png",
      },
      {
        school: "National Cheng Kung University, B.S. in Mechanical Engineering",
        date: "2017.09 - 2021.02",
        description: "Studied thermodynamics and mechanical design, with design thinking and human-centered design as a secondary focus.",
        image: "https://framerusercontent.com/images/o53UPGa6UhydVFF9ZPVPLPqKJ20.png",
      },
    ],
  },
} satisfies Record<Locale, {
  heroTitle: string;
  intro: string[];
  headings: Record<"values" | "experience" | "educator" | "skills" | "tools" | "education", string>;
  education: Array<{ school: string; date: string; badge?: string; description: string; image: string }>;
}>;

export function getAboutData(locale: Locale) {
  const experiences = locale === "en" ? enExperiences : zhExperiences;

  return {
    ...copyByLocale[locale],
    experiences,
    experienceYears: ["2024", "2023", "2022", "2021"],
    firstExperienceIndexByYear: experiences.reduce<Record<string, number>>(
      (result, item, index) => {
        if (result[item.year] === undefined) {
          result[item.year] = index;
        }
        return result;
      },
      {},
    ),
    skillCategories: locale === "en" ? enSkillCategories : zhSkillCategories,
    designValues: locale === "en" ? enDesignValues : zhDesignValues,
    educatorItems: locale === "en" ? enEducatorItems : zhEducatorItems,
    tools,
  };
}
