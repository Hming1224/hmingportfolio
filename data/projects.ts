import type { Locale } from "../i18n/routing";

export type ProjectCategory = "enterprise" | "school";
export type ProjectStatus = "published" | "coming-soon";

export interface ProjectSummary {
  slug: string;
  cardId?: string;
  title: string;
  date: string;
  description: string;
  cover: string;
  logo: string;
  tags: string[];
  tone: string;
  category: ProjectCategory;
  status: ProjectStatus;
  href?: string;
  nextProjectSlug?: string;
  seoDescription?: string;
}

const zhProjects: ProjectSummary[] = [
  {
    slug: "advantech",
    cardId: "project-advantech-wiseiems",
    title: "生成式AI能源管理系統",
    date: "2024.06 - 2024.08",
    description:
      "生成式AI能源管理系統是研華科技研發與設計給工廠人員、廠長用於監督公司內部各樓層用電、碳排情形的一套數據平台。專案目標是將原有系統導入AI chatbot提升能源管理的效率。",
    cover: "/projects/advantech/cover/cover.webp",
    logo: "/projects/advantech/cover/logo.webp",
    tags: ["UIUX 設計", "團隊專案", "使用者研究", "GenAI 應用"],
    tone: "advantech",
    category: "enterprise",
    status: "published",
    href: "/advantech",
    nextProjectSlug: "crypto-arsenal",
    seoDescription:
      "以生成式 AI 聊天機器人驅動智慧能源與空調維運系統介面設計。研華科技 WISE-iEMS 專案案例研究。",
  },
  {
    slug: "crypto-arsenal",
    title: "虛擬貨幣量化交易平台",
    date: "2023.06 - 2023.08",
    description:
      "這是一個自動化之量化交易平台，用戶可以選擇有潛力的投資標的進行買賣，也可以訂閱創作者上架的交易機器人之策略。專案的目標是查看個人持有的投資品項與加倉過程之流程設計與開發。",
    cover: "/projects/crypto-arsenal/cover/cover.webp",
    logo: "/projects/crypto-arsenal/cover/logo.webp",
    tags: ["UIUX設計", "使用者研究"],
    tone: "navy",
    category: "enterprise",
    status: "coming-soon",
  },
  {
    slug: "thesis",
    title: "生成式AI草圖協作系統",
    date: "2025.06 - 2025.08",
    description:
      "這是一個提供設計師進行早期設計構思可使用的GenAI平台，具有四種不同回饋模式，可供設計師進行不同程度設計發想。研究結果顯示，不同回饋模式對於創意成果具有不同影響。",
    cover: "/projects/thesis/cover/cover.webp",
    logo: "/projects/thesis/cover/logo.webp",
    tags: ["GenAI應用", "碩士論文", "人與AI合作"],
    tone: "thesis",
    category: "school",
    status: "coming-soon",
  },
  {
    slug: "icecream-maniac",
    title: "冰淇淋狂熱",
    date: "2025.05 - 2025.06",
    description:
      "這款網頁遊戲是位辛苦的研究生製作，在學業繁重與論文壓力交織之下，玩家需要盡可能滿足角色需求，吃下越多冰淇淋越好，若不小心吃到苦瓜會被懲罰的！",
    cover: "/projects/icecream-maniac/cover/cover.webp",
    logo: "/projects/icecream-maniac/cover/logo.webp",
    tags: ["遊戲設計", "個人專案", "VibeCoding"],
    tone: "icecream",
    category: "school",
    status: "coming-soon",
  },
  {
    slug: "laushu",
    title: "Laushu 勞務報酬系統",
    date: "2024.02 - 2024.04",
    description:
      "勞務報酬系統旨在解決企業外包工作給工作者時，需要進行勞報單簽收、帳單稅務清繳等事宜，透過協助企業快速制定勞報單、整理稅務資料來提升工作效率。",
    cover: "/projects/laushu/cover/cover.webp",
    logo: "/projects/laushu/cover/logo.webp",
    tags: ["UIUX設計", "使用者研究", "團隊專案"],
    tone: "laushu",
    category: "school",
    status: "coming-soon",
  },
  {
    slug: "nccuspace",
    cardId: "project4",
    title: "NCCUSpace 政大場地管理系統",
    date: "2023.10 - 2023.12",
    description:
      "NCCUSpace是一款專注於提升政大學生預約校園空間的資訊服務平台。專案致力於減低預約流程複雜度與客製化預約空間。",
    cover: "https://framerusercontent.com/images/QPe9idFph9AwvwFOSCV4JJDLJZ0.png",
    logo: "https://framerusercontent.com/images/jocDTIVjs0ouwwKqNVnrI02aYGQ.png",
    tags: ["UIUX 設計", "網頁設計", "團隊專案", "課堂專案"],
    tone: "brown",
    category: "school",
    status: "coming-soon",
  },
  {
    slug: "tba",
    cardId: "project3",
    title: "TBA 數位證書資訊平台",
    date: "2022.12 - 2023.02",
    description:
      "本專案與國泰數位發展中心技術團隊合作，開發一款以Web3為基礎的數位證書服務平台。這次專案共歷時2個月，我主要負責使用者體驗設計、Web 介面設計、用戶研究，以及用戶測試。",
    cover: "https://framerusercontent.com/images/CA1UxcHBL02pPYicWXOrbAAjruA.jpg",
    logo: "https://framerusercontent.com/images/P57DkJCf8P5Yrz7l53G2waxdHIM.jpeg",
    tags: ["UIUX 設計", "網頁設計", "End-to-end 設計", "網站開發中"],
    tone: "green",
    category: "enterprise",
    status: "coming-soon",
  },
  {
    slug: "sidd",
    cardId: "project2",
    title: "SIDD 學生日用 App",
    date: "2022.05 - 2022.07",
    description:
      "SIDD全名為Student ID Daily是一款專為在學生打造的優惠資訊平台，這款app主要提供學生日常生活的優惠資訊以及電子支付服務，目的是希望學生族群可以利用學生身份獲取優惠並同時滿足日常消費。",
    cover: "https://framerusercontent.com/images/atAQZ5VIKGpNezpwapXvzyP6P0k.jpg",
    logo: "https://framerusercontent.com/images/7WaAn4JhL9Pt42V8nCM30Wy6lnQ.png",
    tags: ["UIUX 設計", "iOS", "團隊專案", "Side Project"],
    tone: "peach",
    category: "school",
    status: "coming-soon",
  },
  {
    slug: "mym",
    cardId: "project1",
    title: "MYM 電影訂票 App",
    date: "2022.02 - 2022.04",
    description:
      "MYM app全名為Memo Your Movie，是一款為用戶打造高效率訂票流程的電影訂票app。整個專案的目標專注提升用戶訂票的使用者體驗，以及目前多數電影訂票系統上的缺點改進。",
    cover: "https://framerusercontent.com/images/8Iaui73ExLg638pnKjFxBtKJuI4.jpg",
    logo: "https://framerusercontent.com/images/SShjyBDiP4x3KC27pXvmazLujeI.jpg",
    tags: ["UIUX 設計", "iOS", "End-to-End Design", "Side Project"],
    tone: "navy",
    category: "school",
    status: "coming-soon",
  },
];

const enProjects: ProjectSummary[] = [
  {
    slug: "advantech",
    cardId: "project-advantech-wiseiems",
    title: "GenAI-Powered Energy Management System",
    date: "2024.06 - 2024.08",
    description:
      "A data platform designed with Advantech for factory teams and managers to monitor energy use and carbon emissions across facilities. The project introduced an AI chatbot to make energy management faster and more actionable.",
    cover: "/projects/advantech/cover/cover.webp",
    logo: "/projects/advantech/cover/logo.webp",
    tags: ["UI/UX Design", "Team Project", "User Research", "GenAI"],
    tone: "advantech",
    category: "enterprise",
    status: "published",
    href: "/advantech",
    nextProjectSlug: "crypto-arsenal",
    seoDescription:
      "A case study on designing a GenAI chatbot for Advantech WISE-iEMS, supporting smarter energy and HVAC operations.",
  },
  {
    slug: "crypto-arsenal",
    title: "Quantitative Crypto Trading Platform",
    date: "2023.06 - 2023.08",
    description:
      "An automated quantitative trading platform where users can trade promising assets and subscribe to strategies published by bot creators. I designed and developed flows for reviewing personal holdings and scaling into positions.",
    cover: "/projects/crypto-arsenal/cover/cover.webp",
    logo: "/projects/crypto-arsenal/cover/logo.webp",
    tags: ["UI/UX Design", "User Research"],
    tone: "navy",
    category: "enterprise",
    status: "coming-soon",
  },
  {
    slug: "thesis",
    title: "GenAI Sketch Ideation System",
    date: "2025.06 - 2025.08",
    description:
      "A GenAI platform that supports designers during early-stage ideation through four distinct feedback modes. The research examines how different forms of AI feedback influence creative outcomes.",
    cover: "/projects/thesis/cover/cover.webp",
    logo: "/projects/thesis/cover/logo.webp",
    tags: ["GenAI", "Master's Thesis", "Human-AI Collaboration"],
    tone: "thesis",
    category: "school",
    status: "coming-soon",
  },
  {
    slug: "icecream-maniac",
    title: "Ice Cream Maniac",
    date: "2025.05 - 2025.06",
    description:
      "A playful web game made by a graduate student under the combined pressure of coursework and a thesis. Players satisfy the character's cravings by collecting as much ice cream as possible while avoiding bitter melon.",
    cover: "/projects/icecream-maniac/cover/cover.webp",
    logo: "/projects/icecream-maniac/cover/logo.webp",
    tags: ["Game Design", "Personal Project", "Vibe Coding"],
    tone: "icecream",
    category: "school",
    status: "coming-soon",
  },
  {
    slug: "laushu",
    title: "Laushu Contractor Payment System",
    date: "2024.02 - 2024.04",
    description:
      "A contractor payment system that helps companies prepare payment forms, collect signatures, and organize tax records when working with external professionals, reducing administrative effort and improving efficiency.",
    cover: "/projects/laushu/cover/cover.webp",
    logo: "/projects/laushu/cover/logo.webp",
    tags: ["UI/UX Design", "User Research", "Team Project"],
    tone: "laushu",
    category: "school",
    status: "coming-soon",
  },
  {
    slug: "nccuspace",
    cardId: "project4",
    title: "NCCUSpace Campus Booking System",
    date: "2023.10 - 2023.12",
    description:
      "An information service that helps NCCU students book campus spaces more easily. The project focused on simplifying a complex reservation flow and helping students find spaces that match their needs.",
    cover: "https://framerusercontent.com/images/QPe9idFph9AwvwFOSCV4JJDLJZ0.png",
    logo: "https://framerusercontent.com/images/jocDTIVjs0ouwwKqNVnrI02aYGQ.png",
    tags: ["UI/UX Design", "Web Design", "Team Project", "Course Project"],
    tone: "brown",
    category: "school",
    status: "coming-soon",
  },
  {
    slug: "tba",
    cardId: "project3",
    title: "TBA Digital Credential Platform",
    date: "2022.12 - 2023.02",
    description:
      "A Web3-based digital credential service developed with Cathay Financial Holdings' digital technology team. During the two-month project, I led UX design, web interface design, user research, and usability testing.",
    cover: "https://framerusercontent.com/images/CA1UxcHBL02pPYicWXOrbAAjruA.jpg",
    logo: "https://framerusercontent.com/images/P57DkJCf8P5Yrz7l53G2waxdHIM.jpeg",
    tags: ["UI/UX Design", "Web Design", "End-to-End Design", "In Development"],
    tone: "green",
    category: "enterprise",
    status: "coming-soon",
  },
  {
    slug: "sidd",
    cardId: "project2",
    title: "SIDD Student Lifestyle App",
    date: "2022.05 - 2022.07",
    description:
      "SIDD, short for Student ID Daily, is a student-focused platform for everyday discounts and digital payments. It helps students make better use of student benefits while managing daily purchases.",
    cover: "https://framerusercontent.com/images/atAQZ5VIKGpNezpwapXvzyP6P0k.jpg",
    logo: "https://framerusercontent.com/images/7WaAn4JhL9Pt42V8nCM30Wy6lnQ.png",
    tags: ["UI/UX Design", "iOS", "Team Project", "Side Project"],
    tone: "peach",
    category: "school",
    status: "coming-soon",
  },
  {
    slug: "mym",
    cardId: "project1",
    title: "MYM Movie Ticketing App",
    date: "2022.02 - 2022.04",
    description:
      "MYM, short for Memo Your Movie, is a movie ticketing app designed around a faster, clearer booking flow. The project focused on improving the user experience and addressing common pain points in existing ticketing systems.",
    cover: "https://framerusercontent.com/images/8Iaui73ExLg638pnKjFxBtKJuI4.jpg",
    logo: "https://framerusercontent.com/images/SShjyBDiP4x3KC27pXvmazLujeI.jpg",
    tags: ["UI/UX Design", "iOS", "End-to-End Design", "Side Project"],
    tone: "navy",
    category: "school",
    status: "coming-soon",
  },
];

const projectsByLocale = {
  en: enProjects,
  zh: zhProjects,
} satisfies Record<Locale, ProjectSummary[]>;

// Keep the existing Chinese default for case-study pages until their Phase 5 migration.
export const projects = zhProjects;

export function getProjects(locale: Locale): ProjectSummary[] {
  return projectsByLocale[locale];
}

export function getProjectBySlug(slug: string, locale: Locale = "zh"): ProjectSummary {
  const project = getProjects(locale).find((item) => item.slug === slug);

  if (!project) {
    throw new Error(`Unknown project slug: ${slug}`);
  }

  return project;
}

export function getNextProject(slug: string, locale: Locale = "zh"): ProjectSummary {
  const project = getProjectBySlug(slug, locale);

  if (!project.nextProjectSlug) {
    throw new Error(`Project "${slug}" does not define nextProjectSlug`);
  }

  return getProjectBySlug(project.nextProjectSlug, locale);
}
