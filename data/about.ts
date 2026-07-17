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
      "與 PM 及團隊將 AI 切入點從「能回答什麼」重新定位為「何時主動出現」，解決平台數據完整、卻無從判斷該先處理什麼的痛點。",
      [
        { text: "以競品分析、使用者訪談與內部工作坊推翻團隊原本「全能 Chatbot」的假設，於 " },
        { text: "2.5 個月內完成 3 次設計提案", highlight: true },
        { text: "，並依時程通過上級主管/ CEO 審查。" },
      ],
      [
        { text: "最終提案中有 " },
        { text: "2 項主要模組功能獲採納", highlight: true },
        { text: "，順利進入工程開發排程，並與專案 PM 共同排定後續產品路線與功能模組優先順序。" },
      ],
    ] satisfies ExperiencePoint[],
  },
  {
    year: "2023",
    title: "Crypto-Arsenal",
    role: "UIUX & PM 實習生",
    date: "2023.03 - 2023.10",
    image: "/experience/crypto-arsenal.webp",
    points: [
      [
        { text: "整合三項核心交易流程，消除使用者需跳離平台手動介入、進而弄壞既有策略的風險，" },
        { text: "平均操作時間縮短 58%", highlight: true },
        { text: "。" },
      ],
      "維護並重整 Design System，統一 3 大不同功能元件與對應頁面，並應用於 20+ 個產品設計流程，提升視覺與互動一致性。",
      "進行使用者訪談與競品分析，完成 6+ 個產品功能，修正既有產品 12+ 項 UX 問題，與 20+ 個 RWD 頁面設計。",
      [
        { text: "在 Scrum 中擔任助理 PO，主動導入 Scrum board 與 prototype video 優化設計 handoff，讓工程更快理解設計意圖，" },
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
    image: "/experience/taiwan-blockchain-academia.webp",
    points: [
      "主導 DID 數位證書平台的使用者研究與 wireframe。因發現受訪者皆無真實數位證書的使用經驗，將訪綱從產品功能操作改為探索式研究，改問決策顧慮與執行困難。",
      [
        { text: "完成發證方、申請方、驗證方" },
        { text: "三方共 9 場角色訪談", highlight: true },
        { text: "，並據此修正團隊假設：證書驗證其實是加值而非剛需，因而將產品定位收斂至省時價值。" },
      ],
      "與產品經理及國泰金控技術團隊協作，對齊產品規格、開發方向與合規情境下的使用者體驗。",
      "交付 wireframe 與 Figma 互動 prototype，支援可用性測試與多輪設計迭代，並完成全平台走查。",
    ] satisfies ExperiencePoint[],
  },
  {
    year: "2021",
    title: "LCFC 合肥聯寶電子科技",
    role: "助理專案管理師",
    date: "2021.05 - 2021.12",
    image: "/experience/lcfc.webp",
    points: [
      [
        { text: "協調工程、供應商與跨部門時程，" },
        { text: "平均提前 1.5 週", highlight: true },
        { text: "完成預訂交付。" },
      ],
      "在 2 個 milestone 中因應物料短缺風險，重新協調料件與測試排程，成功將原可能延誤的時程拉回期限內。",
    ] satisfies ExperiencePoint[],
  },
];

const zhSkillCategories = [
  {
    title: "產品設計",
    toneClass: "is-product-design",
    iconId: "layout",
    skills: ["Figma", "UI flow", "設計系統", "線框圖 / 原型設計", "響應式網頁設計", "基礎前端知識"],
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

const tools = [
  ["Figma", "/tools/figma-logo.png"],
  ["Canva", "/tools/canva-logo.png"],
  ["Framer", "/tools/framer-logo.png"],
  ["lottielab", "/tools/lottielab-logo.png"],
  ["Photoshop", "/tools/photoshop-logo.png"],
  ["Illustrator", "/tools/illustrator-logo.png"],
  ["Adobe XD", "/tools/adobe-xd-logo.png"],
  ["After Effects", "/tools/after-effects-logo.png"],
] as const;

const zhDesignValues = [
  {
    iconId: "layers",
    title: "跨領域的眼界，讓我看見別人習慣忽略的地方",
    desc: "機械工程的訓練讓我習慣從結構與系統出發思考，設計學習則讓我開始關注人的感受與行為。兩種視角並存，讓我更容易在別人習以為常的地方，看見值得改善的設計機會。",
  },
  {
    iconId: "search",
    title: "理解永遠優先於解法",
    desc: "我習慣在動筆之前，先花時間釐清問題真正的成因。跳過理解直接給答案，通常只會解決到看得見的那一層；搞懂背後的動機與限制，設計才有機會對到真正需要改善的地方。",
  },
  {
    iconId: "zap",
    title: "好的設計讓複雜變成直覺",
    desc: "產品的邏輯可以很複雜，但使用者不應該感受到這份複雜。對我來說，設計成功就是讓人第一次使用就知道該怎麼做，不需要說明書，也不會走錯路。",
  },
];

const zhEducatorItems = [
  {
    badge: "40+",
    title: "OpenHCI 2024 暑期工作坊",
    href: "https://www.2024.openhci.com/",
    role: "設計組組長",
    desc: "籌備營期 3 個月，帶領設計組共 3 人負責營隊教學計劃與課程內容安排，營期帶 40 位學員做設計思考集訓",
    date: "2024.05-2024.08",
    image: "/educator/openhci.jpg",
  },
  {
    badge: "60+",
    title: "NCCU 112-2 人機介面設計課程",
    href: null,
    role: "課程助教",
    desc: "協助 60 位大學生 Figma 操作教學，負責期中 / 期末評分、批改作業與專案指導",
    date: "2024.02-2024.06",
    image: "/educator/人機介面設計課程發表.jpg",
  },
  {
    badge: "20+",
    title: "NCCU 114-1 人機互動設計課程",
    href: null,
    role: "課程助教",
    desc: "指導學碩同學共 20 組期末專案，提供 TA office hour 諮詢與每週作業回饋",
    date: "2025.09-2026.01",
    image: "/educator/nccu-ta.jpg",
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
      "Worked with the PM and team to reframe the AI entry point from \"what it can answer\" to \"when it should surface,\" addressing a platform where the data was complete but the priorities were not.",
      [
        { text: "Overturned the team's \"ask-anything chatbot\" assumption through competitive analysis, user interviews, and internal workshops; delivered " },
        { text: "three design proposals within 2.5 months", highlight: true },
        { text: ", passing reviews with senior leadership and the CEO on schedule." },
      ],
      [
        { text: "The final proposal had " },
        { text: "two core feature modules approved", highlight: true },
        { text: " into the engineering roadmap, and I partnered with the PM to prioritize the product roadmap and feature modules." },
      ],
    ] satisfies ExperiencePoint[],
  },
  {
    year: "2023",
    title: "Crypto-Arsenal",
    role: "UI/UX & PM Intern",
    date: "2023.03 - 2023.10",
    image: "/experience/crypto-arsenal.webp",
    points: [
      [
        { text: "Integrated three core trading flows into the platform, removing the risk of users breaking their own running strategies to intervene manually, " },
        { text: "cutting average task time by 58%", highlight: true },
        { text: "." },
      ],
      "Maintained and reorganized the design system, unifying three major feature areas and applying it across 20+ product design flows.",
      "Conducted user interviews and competitive analysis, delivered 6+ product features, improved 12+ UX issues, and designed 20+ responsive pages.",
      [
        { text: "Served as an assistant Product Owner in Scrum, introducing a Scrum board and prototype videos to improve design handoff and help engineers grasp design intent faster, " },
        { text: "increasing Sprint output to 1.5x its previous level", highlight: true },
        { text: "." },
      ],
    ] satisfies ExperiencePoint[],
  },
  {
    year: "2022",
    title: "Taiwan Blockchain Academia",
    role: "Product Designer (Contract)",
    date: "2022.11 - 2023.02",
    image: "/experience/taiwan-blockchain-academia.webp",
    points: [
      "Led user research and wireframing for a DID digital credential platform. When participants turned out to have no real experience with digital credentials, I shifted the interview guide from feature-level questions to exploratory research, probing decision concerns and execution barriers instead.",
      [
        { text: "Ran " },
        { text: "9 role-based interviews", highlight: true },
        { text: " across issuers, applicants, and verifiers, which corrected the team's assumption: verification was a value-add rather than a must-have, narrowing the product positioning toward time savings." },
      ],
      "Collaborated with product managers and Cathay Financial Holdings' technology team to align product requirements, development direction, and UX within compliance constraints.",
      "Delivered wireframes and Figma interactive prototypes to support usability testing and multiple rounds of design iteration, completing a full-platform walkthrough.",
    ] satisfies ExperiencePoint[],
  },
  {
    year: "2021",
    title: "LCFC",
    role: "Assistant Project Manager",
    date: "2021.05 - 2021.12",
    image: "/experience/lcfc.webp",
    points: [
      [
        { text: "Coordinated engineering, suppliers, and cross-functional schedules to deliver " },
        { text: "an average of 1.5 weeks ahead of plan", highlight: true },
        { text: "." },
      ],
      "Responded to material shortage risks across two milestones, rescheduling components and testing to bring potentially delayed deliveries back on track.",
    ] satisfies ExperiencePoint[],
  },
];

const enSkillCategories = [
  {
    title: "Product Design",
    toneClass: "is-product-design",
    iconId: "layout",
    skills: ["Figma", "UI Flows", "Design Systems", "Wireframing / Prototyping", "Responsive Web Design", "Frontend Fundamentals"],
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
    image: "/educator/nccu-ta.jpg",
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
    heroTitle: "以多元視角打造有說服力的產品體驗",
    intro: [
      "我是黃宣銘，一名結合 UI/UX 設計、產品思維與工程背景的 Product Designer。",
      "我從機械工程走進產品設計，先在電子代工業（OEM/ODM）做專案管理，再進到新創與 B2B 團隊做 UIUX。這段路讓我站在工程與使用者中間：把使用者的需求翻譯成工程聽得懂的規格，也把技術限制翻譯回設計決策。對我來說，設計就是與 PO/PM 及各方利害關係人一起釐清問題、收斂方向，把複雜的需求與限制，轉化成使用者用得順、也真的能落地的體驗。",
      "過去我參與過 B2B AI 能源管理平台、量化交易產品與 Web3 服務設計，累積使用者研究與訪談、競品分析、介面與互動設計、Design System、prototype 與跨部門協作經驗。我也把 AI 工具實際導入設計、前端 prototype 與產品規格整理流程，用來建立問題框架、設計 MVP，並驗證商業目標與使用者體驗，朝 Product Builder 的方向前進。",
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
        image: "/education/nccu-logo.png",
      },
      {
        school: "國立成功大學 機械工程學系",
        date: "2017.09 - 2021.02",
        description: "主修熱力學與機械設計，並以設計思維和使用者中心設計作為第二專業。",
        image: "/education/ncku-logo.png",
      },
    ],
  },
  en: {
    heroTitle: "Designing Compelling Product Experiences from Multiple Perspectives",
    intro: [
      "I'm Brian Huang, a product designer combining UI/UX design, product thinking, and an engineering background.",
      "I moved into product design from mechanical engineering — first as a project manager in electronics OEM/ODM manufacturing, then into UI/UX at startups and B2B teams. That path taught me to sit between engineering and users: translating user needs into specs engineers can act on, and translating technical constraints back into design decisions. To me, design is not simply about making screens look better; it is about working with POs/PMs and stakeholders to clarify the problem and converge on a direction, turning complex needs and constraints into experiences that are clear, intuitive, and feasible.",
      "I have contributed to a B2B AI energy management platform, a quantitative trading product, and a Web3 service, building experience across user research and interviews, competitive analysis, interface and interaction design, design systems, prototyping, and cross-functional collaboration. I also bring AI tools into design, front-end prototyping, and product spec work to frame problems, design MVPs, and validate business goals against user experience, as I grow toward becoming a Product Builder.",
    ],
    headings: {
      values: "Design Values",
      experience: "Experience",
      educator: "Design Community",
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
        image: "/education/nccu-logo.png",
      },
      {
        school: "National Cheng Kung University, B.S. in Mechanical Engineering",
        date: "2017.09 - 2021.02",
        description: "Studied thermodynamics and mechanical design, with design thinking and human-centered design as a secondary focus.",
        image: "/education/ncku-logo.png",
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
