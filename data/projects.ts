import type { Locale } from "../i18n/routing";

type ProjectCategory = "enterprise" | "school";
type ProjectStatus = "published" | "coming-soon";

export interface ProjectSummary {
  slug: string;
  cardId?: string;
  title: string;
  navigationTitle?: string;
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
    title: "賦能廠務人員與系統整合商：以生成式 AI 優化 EcoWatch 與 HVAC 維運使用流程",
    navigationTitle: "生成式 AI 能源與 HVAC 維運設計",
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
    title: "重掌交易主控權：量化交易平台的手動平倉與止盈止損流程設計",
    navigationTitle: "手動平倉與止盈止損流程設計",
    date: "2023.06 - 2023.08",
    description:
      "這是一個自動化之量化交易平台，使用者可以選擇有潛力的投資標的進行買賣，也可以訂閱創作者上架的交易機器人之策略。專案的目標是滿足已啟動交易的策略機器人下可以順利手動平倉或添加止盈止損訂單之流程設計與開發。",
    cover: "/projects/crypto-arsenal/cover/cover.webp",
    logo: "/projects/crypto-arsenal/cover/logo.webp",
    tags: ["UI/UX 設計", "二手研究", "FinTech"],
    tone: "navy",
    category: "enterprise",
    status: "published",
    href: "/crypto-arsenal",
    nextProjectSlug: "tba",
    seoDescription:
      "量化交易平台 Crypto Arsenal 的策略倉位顯示、手動平倉與止盈止損功能設計案例研究。",
  },
  {
    slug: "design-system-case-study",
    title: "把自己的作品集當產品做：一套邊用邊長出來的 Design System",
    navigationTitle: "作品集 Design System 建置與治理",
    date: "2026.06 – 現在（持續迭代中）",
    description:
      "在製作作品集網站的過程中，我逐步集中管理設計規則、整理共用版型，並建立修改後的檢查流程。這個自發專案記錄了我如何在設計一致性、單頁敘事彈性與維護風險之間做取捨。",
    cover: "/projects/design-system-case-study/cover/cover.webp",
    logo: "/projects/design-system-case-study/cover/logo-bh-static.webp",
    tags: ["Design System", "自發專案", "共用元件", "設計治理"],
    tone: "design-system",
    category: "school",
    status: "published",
    href: "/design-system-case-study",
    nextProjectSlug: "laushu",
    seoDescription:
      "把作品集當成產品維護：集中管理設計規則、整理共用元件並保留單頁彈性的 Design System 案例研究。",
  },
  {
    slug: "laushu",
    title: "從紙本化繁為簡：勞務報酬系統的數位流程優化",
    navigationTitle: "勞務報酬系統數位流程優化",
    date: "2024.02 - 2024.04",
    description:
      "勞務報酬系統旨在解決企業外包工作給工作者時，需要進行勞報單簽收、帳單稅務清繳等事宜，透過協助企業快速制定勞報單、整理稅務資料來提升工作效率。",
    cover: "/projects/laushu/cover/cover.webp",
    logo: "/projects/laushu/cover/logo.webp",
    tags: ["UIUX設計", "使用者研究", "團隊專案"],
    tone: "laushu",
    category: "school",
    status: "published",
    href: "/laushu",
    nextProjectSlug: "nccuspace",
  },
  {
    slug: "nccuspace",
    cardId: "project4",
    title: "從繁瑣搜尋到一目了然：政大圖書館討論室預約系統體驗重構",
    navigationTitle: "政大圖書館討論室預約系統重構",
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
    title: "從發證、持有到驗證：基於國泰 DID Wallet 的 Web3 數位憑證平台",
    navigationTitle: "Web3 數位憑證平台",
    date: "2022.12 - 2023.02",
    description:
      "本專案與國泰數位發展中心技術團隊合作，開發一款以 Web3 為基礎的數位證書服務平台。這次專案共歷時 2 個月，我主要負責使用者體驗設計、Web 介面設計、使用者研究，以及使用者測試。",
    cover: "https://framerusercontent.com/images/CA1UxcHBL02pPYicWXOrbAAjruA.jpg",
    logo: "https://framerusercontent.com/images/P57DkJCf8P5Yrz7l53G2waxdHIM.jpeg",
    tags: ["UIUX 設計", "網頁設計", "End-to-end 設計", "網站開發中"],
    tone: "green",
    category: "enterprise",
    status: "coming-soon",
  },
];

const enProjects: ProjectSummary[] = [
  {
    slug: "advantech",
    cardId: "project-advantech-wiseiems",
    title: "Empowering Facility Operators and System Integrators: Streamlining EcoWatch and HVAC Operations via Generative AI",
    navigationTitle: "GenAI EcoWatch and HVAC Operations",
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
    title: "Giving Traders Back Control: Manual Close & Take-Profit / Stop-Loss Flow Design for a Quant Trading Platform",
    navigationTitle: "Manual Close & Take-Profit / Stop-Loss Flow Design",
    date: "2023.06 - 2023.08",
    description:
      "An automated quantitative trading platform where users can trade promising assets and subscribe to strategies published by bot creators. I designed and developed flows for reviewing personal holdings and scaling into positions.",
    cover: "/projects/crypto-arsenal/cover/cover.webp",
    logo: "/projects/crypto-arsenal/cover/logo.webp",
    tags: ["UI/UX Design", "Secondary Research", "FinTech"],
    tone: "navy",
    category: "enterprise",
    status: "published",
    href: "/crypto-arsenal",
    nextProjectSlug: "tba",
    seoDescription:
      "A case study on position visibility, manual closing, and take-profit / stop-loss flows for the Crypto Arsenal quantitative trading platform.",
  },
  {
    slug: "design-system-case-study",
    title: "Treating My Portfolio as a Product: A Design System Built Through Iteration",
    navigationTitle: "Portfolio Design System & Governance",
    date: "Jun 2026 – Present (ongoing)",
    description:
      "While building this portfolio site, I centralized design rules, organized shared patterns, and added checks for later changes. This self-initiated project documents how I balanced consistency, page-specific storytelling, and maintenance risk.",
    cover: "/projects/design-system-case-study/cover/cover.webp",
    logo: "/projects/design-system-case-study/cover/logo-bh-static.webp",
    tags: ["Design System", "Self-initiated", "Shared Components", "Design Governance"],
    tone: "design-system",
    category: "school",
    status: "published",
    href: "/design-system-case-study",
    nextProjectSlug: "laushu",
    seoDescription:
      "A case study on maintaining a portfolio as a product by centralizing design rules, organizing shared components, and preserving page-specific flexibility.",
  },
  {
    slug: "laushu",
    title: "From Paper to a Smooth Digital Flow:UX Optimization for a Contractor Payment System",
    navigationTitle: "Contractor Payment System UX Optimization",
    date: "2024.02 - 2024.04",
    description:
      "A contractor payment system that helps companies prepare payment forms, collect signatures, and organize tax records when working with external professionals, reducing administrative effort and improving efficiency.",
    cover: "/projects/laushu/cover/cover.webp",
    logo: "/projects/laushu/cover/logo.webp",
    tags: ["UI/UX Design", "User Research", "Team Project"],
    tone: "laushu",
    category: "school",
    status: "published",
    href: "/laushu",
    nextProjectSlug: "nccuspace",
  },
  {
    slug: "nccuspace",
    cardId: "project4",
    title: "From Endless Searching to One-Glance Booking ：Redesigning Study Room Booking for NCCU Library",
    navigationTitle: "NCCU Study Room Booking Redesign",
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
    title: "From Issuing to Holding to Verifying: A Web3 Digital Credential Platform Built on Cathay's DID Wallet",
    navigationTitle: "Web3 Digital Credential Platform",
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
];

const projectsByLocale = {
  en: enProjects,
  "zh-TW": zhProjects,
} satisfies Record<Locale, ProjectSummary[]>;

// Keep the existing Chinese default for case-study pages until their Phase 5 migration.
export const projects = zhProjects;

export function getProjects(locale: Locale): ProjectSummary[] {
  return projectsByLocale[locale];
}

export function getProjectBySlug(slug: string, locale: Locale = "zh-TW"): ProjectSummary {
  const project = getProjects(locale).find((item) => item.slug === slug);

  if (!project) {
    throw new Error(`Unknown project slug: ${slug}`);
  }

  return project;
}

export function getNextProject(slug: string, locale: Locale = "zh-TW"): ProjectSummary {
  const project = getProjectBySlug(slug, locale);

  if (!project.nextProjectSlug) {
    throw new Error(`Project "${slug}" does not define nextProjectSlug`);
  }

  return getProjectBySlug(project.nextProjectSlug, locale);
}
