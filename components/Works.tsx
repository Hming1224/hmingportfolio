"use client";

import Image from "next/image";
import {
  Tabs,
  TabsHighlight,
  TabsHighlightItem,
  TabsList,
  TabsPanel,
  TabsPanels,
  TabsTab,
} from "./animate-ui/primitives/base/tabs";

type Project = {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  logoUrl: string;
  tags: string[];
  tone: string;
  category: string;
  cta: string;
  hoverCta?: string;
  href?: string;
  disabled?: boolean;
};

const projects: Project[] = [
  {
    id: "project-advantech-wiseiems",
    title: "生成式AI能源管理系統",
    date: "2024.06 - 2024.08",
    description:
      "生成式AI能源管理系統是研華科技研發與設計給工廠人員、廠長用於監督公司內部各樓層用電、碳排情形的一套數據平台。專案目標是將原有系統導入AI chatbot提升能源管理的效率。",
    imageUrl: "/projects/advantech-wiseiems2.png",
    logoUrl: "/projects/advantech-logo.png",
    tags: ["UIUX 設計", "團隊專案", "使用者研究", "GenAI 應用"],
    tone: "advantech",
    category: "enterprise",
    cta: "資料準備中",
    hoverCta: "了解更多",
    href: "/advantech",
  },
  {
    id: "project-crypto-arsenal",
    title: "虛擬貨幣量化交易平台",
    date: "2023.06 - 2023.08",
    description:
      "這是一個自動化之量化交易平台，用戶可以選擇有潛力的投資標的進行買賣，也可以訂閱創作者上架的交易機器人之策略。專案的目標是查看個人持有的投資品項與加倉過程之流程設計與開發。",
    imageUrl: "/projects/CryptoArsenal_Cover2.jpg",
    logoUrl: "/projects/crypto_arsenal_logo.png",
    tags: ["UIUX設計", "使用者研究"],
    tone: "navy",
    category: "enterprise",
    cta: "資料準備中",
    disabled: true,
  },
  {
    id: "project-thesis",
    title: "生成式AI草圖協作系統",
    date: "2025.06 - 2025.08",
    description:
      "這是一個提供設計師進行早期設計構思可使用的GenAI平台，具有四種不同回饋模式，可供設計師進行不同程度設計發想。研究結果顯示，不同回饋模式對於創意成果具有不同影響。",
    imageUrl: "/projects/數位內容碩士畢業論文cover.png",
    logoUrl: "/projects/生成式AI草圖協作系統_logo.png",
    tags: ["GenAI應用", "碩士論文", "人與AI合作"],
    tone: "thesis",
    category: "school",
    cta: "了解專案",
    href: "#",
  },
  {
    id: "project-icecream-maniac",
    title: "冰淇淋狂熱",
    date: "2025.05 - 2025.06",
    description:
      "這款網頁遊戲是位辛苦的研究生製作，在學業繁重與論文壓力交織之下，玩家需要盡可能滿足角色需求，吃下越多冰淇淋越好，若不小心吃到苦瓜會被懲罰的！",
    imageUrl: "/projects/icecream-maniac-cover.png",
    logoUrl: "/projects/icecream-maniac-logo.png",
    tags: ["遊戲設計", "個人專案", "VibeCoding"],
    tone: "icecream",
    category: "school",
    cta: "了解專案",
    href: "#",
  },
  {
    id: "project-laushu",
    title: "Laushu 勞務報酬系統",
    date: "2024.02 - 2024.04",
    description:
      "勞務報酬系統旨在解決企業外包工作給工作者時，需要進行勞報單簽收、帳單稅務清繳等事宜，透過協助企業快速制定勞報單、整理稅務資料來提升工作效率。",
    imageUrl: "/projects/laushu_cover.jpg",
    logoUrl: "/projects/laushu_logo.png",
    tags: ["UIUX設計", "使用者研究", "團隊專案"],
    tone: "laushu",
    category: "school",
    cta: "了解專案",
    href: "#",
  },
  {
    id: "project4",
    title: "NCCUSpace 政大場地管理系統",
    date: "2023.10 - 2023.12",
    description:
      "NCCUSpace是一款專注於提升政大學生預約校園空間的資訊服務平台。專案致力於減低預約流程複雜度與客製化預約空間。",
    imageUrl:
      "https://framerusercontent.com/images/QPe9idFph9AwvwFOSCV4JJDLJZ0.png",
    logoUrl:
      "https://framerusercontent.com/images/jocDTIVjs0ouwwKqNVnrI02aYGQ.png",
    tags: ["UIUX 設計", "網頁設計", "團隊專案", "課堂專案"],
    tone: "brown",
    category: "school",
    cta: "資料準備中",
    disabled: true,
  },
  {
    id: "project3",
    title: "TBA 數位證書資訊平台",
    date: "2022.12 - 2023.02",
    description:
      "本專案與國泰數位發展中心技術團隊合作，開發一款以Web3為基礎的數位證書服務平台。這次專案共歷時2個月，我主要負責使用者體驗設計、Web 介面設計、用戶研究，以及用戶測試。",
    imageUrl:
      "https://framerusercontent.com/images/CA1UxcHBL02pPYicWXOrbAAjruA.jpg",
    logoUrl:
      "https://framerusercontent.com/images/P57DkJCf8P5Yrz7l53G2waxdHIM.jpeg",
    tags: ["UIUX 設計", "網頁設計", "End-to-end 設計", "網站開發中"],
    tone: "green",
    category: "enterprise",
    cta: "資料準備中",
    disabled: true,
  },
  {
    id: "project2",
    title: "SIDD 學生日用 App",
    date: "2022.05 - 2022.07",
    description:
      "SIDD全名為Student ID Daily是一款專為在學生打造的優惠資訊平台，這款app主要提供學生日常生活的優惠資訊以及電子支付服務，目的是希望學生族群可以利用學生身份獲取優惠並同時滿足日常消費。",
    imageUrl:
      "https://framerusercontent.com/images/atAQZ5VIKGpNezpwapXvzyP6P0k.jpg",
    logoUrl:
      "https://framerusercontent.com/images/7WaAn4JhL9Pt42V8nCM30Wy6lnQ.png",
    tags: ["UIUX 設計", "iOS", "團隊專案", "Side Project"],
    tone: "peach",
    category: "school",
    cta: "了解專案",
    href: "#",
  },
  {
    id: "project1",
    title: "MYM 電影訂票 App",
    date: "2022.02 - 2022.04",
    description:
      "MYM app全名為Memo Your Movie，是一款為用戶打造高效率訂票流程的電影訂票app。整個專案的目標專注提升用戶訂票的使用者體驗，以及目前多數電影訂票系統上的缺點改進。",
    imageUrl:
      "https://framerusercontent.com/images/8Iaui73ExLg638pnKjFxBtKJuI4.jpg",
    logoUrl:
      "https://framerusercontent.com/images/SShjyBDiP4x3KC27pXvmazLujeI.jpg",
    tags: ["UIUX 設計", "iOS", "End-to-End Design", "Side Project"],
    tone: "navy",
    category: "school",
    cta: "了解專案",
    href: "#",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`project-card tone-${project.tone}`} id={project.id}>
      <Image
        className="project-image"
        src={project.imageUrl}
        alt={project.title}
        fill
        sizes="(max-width: 809px) calc(100vw - 48px), (max-width: 1279px) calc(100vw - 96px), 1200px"
      />
      <div className="project-scrim" />

      <div className="project-info">
        <div className="project-logo-wrap">
          <Image src={project.logoUrl} alt="" fill sizes="168px" />
        </div>
        <div className="project-title">
          <h3>{project.title}</h3>
          <p>{project.date}</p>
        </div>
        <p className="project-description">{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <a
          className={`project-button ${project.disabled ? "is-disabled" : ""}`}
          href={project.disabled ? undefined : project.href}
          target={project.href && !project.disabled ? "_blank" : undefined}
          rel={project.href && !project.disabled ? "noopener noreferrer" : undefined}
          aria-disabled={project.disabled}
        >
          {project.hoverCta ? (
            <>
              <span className="btn-text">{project.cta}</span>
              <span className="btn-hover-text">{project.hoverCta}</span>
            </>
          ) : (
            project.cta
          )}
        </a>
      </div>
    </article>
  );
}

export default function Works() {
  const enterpriseProjects = projects.filter(
    (project) => project.category === "enterprise",
  );
  const schoolProjects = projects.filter(
    (project) => project.category === "school",
  );

  return (
    <section id="projects" className="projects-section">
      <div className="section-heading">
        <span />
        <h2>設計案例</h2>
        <span />
      </div>

      <Tabs defaultValue="enterprise" className="project-tabs">
        <TabsHighlight className="project-tabs-highlight">
          <TabsList className="project-tabs-list">
            <TabsHighlightItem value="enterprise" className="project-tabs-item">
              <TabsTab value="enterprise" className="project-tabs-tab">
                企業應用
              </TabsTab>
            </TabsHighlightItem>
            <TabsHighlightItem value="school" className="project-tabs-item">
              <TabsTab value="school" className="project-tabs-tab">
                學校產出
              </TabsTab>
            </TabsHighlightItem>
          </TabsList>
        </TabsHighlight>

        <TabsPanels mode="wait">
          <TabsPanel value="enterprise">
            <div className="projects-list">
              {enterpriseProjects.map((project) => (
                <ProjectCard project={project} key={project.id} />
              ))}
            </div>
          </TabsPanel>
          <TabsPanel value="school">
            <div className="projects-list">
              {schoolProjects.map((project) => (
                <ProjectCard project={project} key={project.id} />
              ))}
            </div>
          </TabsPanel>
        </TabsPanels>
      </Tabs>
    </section>
  );
}
