'use client';

import Image from 'next/image';
import {
  Tabs,
  TabsHighlight,
  TabsHighlightItem,
  TabsList,
  TabsPanel,
  TabsPanels,
  TabsTab,
} from './animate-ui/primitives/base/tabs';

const projects = [
  {
    id: 'project-advantech-wiseiems',
    title: '生成式AI能源管理系統',
    date: '2024.06 - 2024.08',
    description:
      '生成式AI能源管理系統是研華科技研發與設計給工廠人員、廠長用於監督公司內部各樓層用電、碳排情形的一套數據平台。專案目標是將原有系統導入AI chatbot提升能源管理的效率。',
    imageUrl: '/projects/advantech-wiseiems.png',
    logoUrl: '/projects/advantech-logo.png',
    tags: ['UIUX 設計', '團隊專案', '使用者研究', 'GenAI 應用'],
    tone: 'advantech',
    category: 'enterprise',
    cta: '資料準備中',
    disabled: true,
  },
  {
    id: 'project4',
    title: 'NCCUSpace 政大場地管理系統',
    date: '2023.10 - 2023.12',
    description:
      'NCCUSpace是一款專注於提升政大學生預約校園空間的資訊服務平台。專案致力於減低預約流程複雜度與客製化預約空間。',
    imageUrl: 'https://framerusercontent.com/images/QPe9idFph9AwvwFOSCV4JJDLJZ0.png',
    logoUrl: 'https://framerusercontent.com/images/jocDTIVjs0ouwwKqNVnrI02aYGQ.png',
    tags: ['UIUX 設計', '網頁設計', '團隊專案', '課堂專案'],
    tone: 'brown',
    category: 'school',
    cta: '資料準備中',
    disabled: true,
  },
  {
    id: 'project3',
    title: 'TBA 數位證書資訊平台',
    date: '2022.12 - 2023.02',
    description:
      '本專案與國泰數位發展中心技術團隊合作，開發一款以Web3為基礎的數位證書服務平台。這次專案共歷時2個月，我主要負責使用者體驗設計、Web 介面設計、用戶研究，以及用戶測試。',
    imageUrl: 'https://framerusercontent.com/images/CA1UxcHBL02pPYicWXOrbAAjruA.jpg',
    logoUrl: 'https://framerusercontent.com/images/P57DkJCf8P5Yrz7l53G2waxdHIM.jpeg',
    tags: ['UIUX 設計', '網頁設計', 'End-to-end 設計', '網站開發中'],
    tone: 'green',
    category: 'enterprise',
    cta: '資料準備中',
    disabled: true,
  },
  {
    id: 'project2',
    title: 'SIDD 學生日用 App',
    date: '2022.05 - 2022.07',
    description:
      'SIDD全名為Student ID Daily是一款專為在學生打造的優惠資訊平台，這款app主要提供學生日常生活的優惠資訊以及電子支付服務，目的是希望學生族群可以利用學生身份獲取優惠並同時滿足日常消費。',
    imageUrl: 'https://framerusercontent.com/images/atAQZ5VIKGpNezpwapXvzyP6P0k.jpg',
    logoUrl: 'https://framerusercontent.com/images/7WaAn4JhL9Pt42V8nCM30Wy6lnQ.png',
    tags: ['UIUX 設計', 'iOS', '團隊專案', 'Side Project'],
    tone: 'peach',
    category: 'school',
    cta: '了解專案',
    href: '#',
  },
  {
    id: 'project1',
    title: 'MYM 電影訂票 App',
    date: '2022.02 - 2022.04',
    description:
      'MYM app全名為Memo Your Movie，是一款為用戶打造高效率訂票流程的電影訂票app。整個專案的目標專注提升用戶訂票的使用者體驗，以及目前多數電影訂票系統上的缺點改進。',
    imageUrl: 'https://framerusercontent.com/images/8Iaui73ExLg638pnKjFxBtKJuI4.jpg',
    logoUrl: 'https://framerusercontent.com/images/SShjyBDiP4x3KC27pXvmazLujeI.jpg',
    tags: ['UIUX 設計', 'iOS', 'End-to-End Design', 'Side Project'],
    tone: 'navy',
    category: 'school',
    cta: '了解專案',
    href: '#',
  },
];

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
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
          className={`project-button ${project.disabled ? 'is-disabled' : ''}`}
          href={project.disabled ? undefined : project.href}
          aria-disabled={project.disabled}
        >
          {project.cta}
        </a>
      </div>
    </article>
  );
}

export default function Works() {
  const enterpriseProjects = projects.filter((project) => project.category === 'enterprise');
  const schoolProjects = projects.filter((project) => project.category === 'school');

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
