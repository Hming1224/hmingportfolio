"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useState } from "react";
import { getAboutData } from "@/data/about";
import { getContactData } from "@/data/contact";
import { getProjects } from "@/data/projects";
import type { DesignSystemLocale } from "@/lib/design-system-docs";
import Button from "../ui/Button";
import { Alert } from "../ui/Alert";
import { Checkbox } from "../ui/Checkbox";
import { EmptyState } from "../ui/EmptyState";
import { Modal } from "../ui/Modal";
import { Radio } from "../ui/Radio";
import { Select } from "../ui/Select";
import { Skeleton } from "../ui/Skeleton";
import { Toast } from "../ui/Toast";
import ZoomableImage from "../case-study/ZoomableImage";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from "../ui/Accordion";
import styles from "./DesignSystemExplorer.module.css";

const options = [
  { label: "Product design", value: "product" },
  { label: "UX research", value: "research" },
  { label: "Design system", value: "system" },
];

function getCopy(locale: DesignSystemLocale) {
  const zh = locale === "zh-TW";

  return {
    contractOnly: zh ? "Contract-only：作品集目前沒有正式使用" : "Contract-only: no current live usage in portfolio",
    referenceStyle: zh ? "Reference-style example" : "Reference-style example",
    liveUsage: zh ? "真實使用位置" : "Live usage",
    source: zh ? "來源" : "Source",
    navbarBehavior: zh
      ? ["locale-aware links", "desktop / mobile 共用 nav items", "LanguageSwitcher 放在 Navbar 內", "scroll hide / restore"]
      : ["locale-aware links", "shared desktop / mobile nav items", "LanguageSwitcher lives inside Navbar", "scroll hide / restore"],
    contactToastSuccess: zh ? "送出成功！" : "Message Sent!",
    contactToastError: zh ? "傳送失敗，請重試" : "Something went wrong. Please try again.",
  };
}

function ReferenceCard({
  title,
  description,
  items,
  locale,
}: {
  title: string;
  description: string;
  items: string[];
  locale: DesignSystemLocale;
}) {
  const copy = getCopy(locale);

  return (
    <article className={styles.demoReferenceCard}>
      <p className={styles.demoBadge}>{copy.referenceStyle}</p>
      <h3>{title}</h3>
      <p>{description}</p>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function ContractOnlyCard({
  children,
  locale,
}: {
  children: ReactNode;
  locale: DesignSystemLocale;
}) {
  const copy = getCopy(locale);

  return (
    <div className={styles.contractOnlyDemo}>
      <p className={styles.demoBadge}>{copy.contractOnly}</p>
      {children}
    </div>
  );
}

export default function ComponentDemo({
  type,
  locale,
}: {
  type?: string;
  locale: DesignSystemLocale;
}) {
  const zh = locale === "zh-TW";
  const copy = getCopy(locale);
  const projects = getProjects(locale);
  const featuredProject = projects.find((project) => project.slug === "advantech") ?? projects[0];
  const comingSoonProject = projects.find((project) => project.status === "coming-soon");
  const contactData = getContactData(locale);
  const aboutData = getAboutData(locale);
  const firstSkill = aboutData.skillCategories[0];
  const firstExperience = aboutData.experiences[0];
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("enterprise");
  const [activeProposal, setActiveProposal] = useState(1);

  if (!type) {
    return <p className={styles.demoFallback}>{zh ? "此 pattern 以正式作品集使用情境為準。" : "This pattern is documented from its live portfolio usage."}</p>;
  }

  if (type === "button") {
    return (
      <div className={styles.liveButtonDemo}>
        <Button href="/#projects">{zh ? "查看作品" : "View My Work"}</Button>
        <Button href="/about-me" variant="secondary">{zh ? "我的歷程" : "My Journey"}</Button>
        <Button href={featuredProject.href ?? "/"} size="lg">
          {zh ? "了解更多" : "Learn More"}
        </Button>
        <Button size="lg" disabled>
          {zh ? "即將上線" : "Coming Soon"}
        </Button>
        <Button loading loadingLabel={zh ? "傳送中..." : "Sending..."}>
          {zh ? "送出訊息" : "Send Message"}
        </Button>
      </div>
    );
  }

  if (type === "copy") {
    return (
      <Button
        variant="secondary"
        onClick={async () => {
          await navigator.clipboard.writeText("--hm-purple: #5d62d8;");
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? "Copied" : "Copy token"}
      </Button>
    );
  }

  if (type === "language-switcher") {
    return (
      <ReferenceCard
        locale={locale}
        title={zh ? "LanguageSwitcher 只在全站 Navbar 內使用" : "LanguageSwitcher lives inside the global Navbar"}
        description={zh ? "文件站不嵌入第二個可操作語系選單，避免和目前頁面的 locale routing 互相干擾。" : "The docs do not embed a second interactive locale menu because the real component is coupled to current route preservation."}
        items={[
          zh ? "使用位置：global site header" : "Usage location: global site header",
          zh ? "行為：切換語系時保留目前 route 與 hash" : "Behavior: preserves the current route and hash when switching locale",
          zh ? "狀態：closed / open / selected / loading" : "States: closed / open / selected / loading",
        ]}
      />
    );
  }

  if (type === "navbar") {
    return (
      <ReferenceCard
        locale={locale}
        title={zh ? "真實 Navbar 是全站唯一導覽外殼" : "The real Navbar is the single global navigation shell"}
        description={zh ? "這裡改用 anatomy / behavior reference，不在 docs example 裡嵌入第二個全站 navbar。" : "This example uses anatomy and behavior notes instead of embedding a second global navbar inside the docs page."}
        items={[
          zh ? "主要連結：Projects、About、Design System、Contact、Resume" : "Primary links: Projects, About, Design System, Contact, Resume",
          ...copy.navbarBehavior,
        ]}
      />
    );
  }

  if (type === "footer") {
    return (
      <footer className={styles.liveFooterDemo}>
        <p>© Brian Huang 2026 Copyright. All Rights Reserved.</p>
        <div className={styles.liveSocialLinks} aria-label={zh ? "社群連結" : "Social links"}>
          {[
            ["LinkedIn", "https://www.linkedin.com/in/brian-huang-a36759128", "/social/linkedin-gray-v2.png"],
            ["GitHub", "https://github.com/Hming1224", "/social/github-gray-v2.png"],
          ].map(([label, href, src]) => (
            <a href={href} key={label} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Image src={src} alt="" width={32} height={32} />
            </a>
          ))}
        </div>
      </footer>
    );
  }

  if (type === "scroll-progress") {
    return (
      <div style={{ width: "100%", maxWidth: "300px" }}>
        <div><span /></div>
        <p>{zh ? "目前閱讀進度 64%" : "Current reading progress: 64%"}</p>
      </div>
    );
  }

  if (type === "input" || type === "textarea") {
    const id = type === "textarea" ? "message" : "email";
    const label = type === "textarea"
      ? zh ? "訊息內容" : "Your message"
      : zh ? "電子信箱" : "Email";

    return (
      <div className={styles.contactFieldDemo}>
        <p className={styles.demoUsageLine}>{zh ? "Contact page / contact form" : "Contact page / contact form"}</p>
        <label className={styles.liveFloatingField} htmlFor={`demo-${id}`}>
          {type === "textarea" ? (
            <textarea id={`demo-${id}`} name={id} placeholder=" " rows={4} defaultValue={zh ? "想聊聊作品集、產品設計或 AI 協作。" : "I would like to talk about portfolio work, product design, or AI collaboration."} />
          ) : (
            <input id={`demo-${id}`} name={id} type="email" placeholder=" " defaultValue={contactData.email} />
          )}
          <span>{label}</span>
        </label>
      </div>
    );
  }

  if (type === "select") {
    return (
      <ContractOnlyCard locale={locale}>
        <div style={{ width: "100%", maxWidth: "320px" }}>
          <Select
            name="design-discipline"
            options={options}
            value={selectValue}
            onChange={setSelectValue}
            placeholder={zh ? "選擇設計分類" : "Choose a discipline"}
          />
        </div>
      </ContractOnlyCard>
    );
  }

  if (type === "checkbox") {
    return (
      <ContractOnlyCard locale={locale}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Checkbox defaultChecked>{zh ? "已選選項" : "Selected option"}</Checkbox>
          <Checkbox>{zh ? "可選選項" : "Available option"}</Checkbox>
          <Checkbox disabled>{zh ? "停用選項" : "Disabled option"}</Checkbox>
        </div>
      </ContractOnlyCard>
    );
  }

  if (type === "radio") {
    return (
      <ContractOnlyCard locale={locale}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Radio name="demo-radio" defaultChecked>{zh ? "產品設計師" : "Product designer"}</Radio>
          <Radio name="demo-radio">{zh ? "產品經理" : "Product manager"}</Radio>
          <Radio name="demo-radio" disabled>{zh ? "不可用" : "Unavailable"}</Radio>
        </div>
      </ContractOnlyCard>
    );
  }

  if (type === "tabs") {
    const tabs = [
      { value: "enterprise", label: zh ? "企業應用" : "Industry Projects" },
      { value: "school", label: zh ? "學校產出" : "Academic & Side Projects" },
    ];
    const activeProjects = projects.filter((project) => project.category === activeTab);

    return (
      <div className={styles.worksTabsDemo}>
        <div className={styles.demoUsageLine}>Homepage / Selected Work</div>
        <div className={styles.liveTabsList} role="tablist" aria-label={zh ? "精選案例分類" : "Selected Work categories"}>
          {tabs.map((tab) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === tab.value}
              className={activeTab === tab.value ? styles.isSelectedDemoTab : undefined}
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className={styles.liveTabsPanel} role="tabpanel">
          {activeProjects.slice(0, 2).map((project) => (
            <article className={styles.tabProjectSummary} key={project.slug}>
              <strong>{project.navigationTitle ?? project.title}</strong>
              <span>{project.status === "coming-soon" ? (zh ? "即將上線" : "Coming Soon") : project.date}</span>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (type === "case-toc") {
    return (
      <nav style={{ display: "flex", flexDirection: "column", gap: "16px", borderLeft: "2px solid var(--hm-line-strong)", paddingLeft: "16px" }} aria-label={zh ? "案例目錄範例" : "Case table of contents example"}>
        {(zh ? ["專案背景", "研究洞察", "設計方案", "成果反思"] : ["Context", "Insights", "Solution", "Outcome"]).map((item, index) => (
          <a className={index === 1 ? "is-active" : undefined} href="#preview" key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>{item}
          </a>
        ))}
      </nav>
    );
  }

  if (type === "year-rail") {
    return (
      <div className={styles.yearRailDemo}>
        <nav className={styles.liveYearRail} aria-label={zh ? "About 經歷年份" : "About experience years"}>
          {aboutData.experienceYears.map((year) => (
            <a className={year === firstExperience.year ? styles.isActiveYear : undefined} href="#preview" key={year}>{year}</a>
          ))}
        </nav>
        <article className={styles.liveExperienceSummary}>
          <time>{firstExperience.year}</time>
          <h3>{firstExperience.title}</h3>
          <p>{firstExperience.role}</p>
          <span>{firstExperience.date}</span>
        </article>
      </div>
    );
  }

  if (type === "case-next-nav") {
    return (
      <div style={{ display: "flex", gap: "16px", justifyContent: "space-between", width: "100%" }}>
        <Button variant="secondary">← {zh ? "返回首頁" : "Back home"}</Button>
        <Button>{zh ? "下一個專案" : "Next project"} →</Button>
      </div>
    );
  }

  if (type === "accordion") {
    const items = zh
      ? [["foundations", "基礎規範", "色彩、字級、間距與 motion token。"], ["components", "元件", "以 production code 為準的元件狀態與使用方式。"]]
      : [["foundations", "Foundations", "Color, type, spacing, and motion tokens."], ["components", "Components", "States and usage documented from production code."]];

    return (
      <Accordion style={{ width: "100%", maxWidth: "480px" }} defaultValue="foundations" type="single">
        {items.map(([value, title, body]) => (
          <AccordionItem key={value} value={value}>
            <AccordionHeader>{title}</AccordionHeader>
            <AccordionPanel>
              <p>{body}</p>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  if (type === "contact-method") {
    return (
      <div className={styles.contactMethodsDemo}>
        <article>
          <small>{zh ? "電子信箱" : "Email"}</small>
          <strong>{contactData.email}</strong>
          <Button size="sm" variant="secondary">{zh ? "複製" : "Copy"}</Button>
        </article>
        <article>
          <small>{zh ? "電話" : "Phone"}</small>
          <strong>{contactData.phone}</strong>
          <Button size="sm" variant="secondary">{zh ? "複製" : "Copy"}</Button>
        </article>
      </div>
    );
  }

  if (type === "project-card") {
    return (
      <div className={styles.projectCardDemoWrap}>
        <p className={styles.demoUsageLine}>Homepage / Selected Work</p>
        <article className={`project-card tone-${featuredProject.tone} card-visible ${styles.projectCardDemo}`}>
          <div className="project-media">
            <Image
              className="project-image"
              src={featuredProject.cover}
              alt={featuredProject.title}
              fill
              sizes="(max-width: 768px) calc(100vw - 48px), 720px"
            />
            <div className="project-scrim" />
          </div>
          <div className="project-info">
            <div className="project-meta">
              <div className="project-logo-wrap">
                <Image src={featuredProject.logo} alt="" fill sizes="168px" />
              </div>
              <div className="project-title">
                <h3>{featuredProject.title}</h3>
                <p>{featuredProject.date}</p>
              </div>
              <p className="project-description">{featuredProject.description}</p>
              <div className="project-tags">
                {featuredProject.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <Button href={featuredProject.href ?? "/"} size="lg">
              {zh ? "了解更多" : "Learn More"}
            </Button>
          </div>
        </article>
        {comingSoonProject ? (
          <p className={styles.demoUsageLine}>
            {zh ? `Coming Soon 狀態使用不可點擊 CTA：${comingSoonProject.navigationTitle ?? comingSoonProject.title}` : `Coming Soon state uses a disabled CTA: ${comingSoonProject.navigationTitle ?? comingSoonProject.title}`}
          </p>
        ) : null}
      </div>
    );
  }

  if (type === "section-heading") {
    return (
      <div className={styles.liveSectionHeadingDemo}>
        <span /><h3>{zh ? "精選案例" : "Selected Work"}</h3><span />
      </div>
    );
  }

  if (type === "tags") {
    return (
      <div className={styles.liveTagDemo}>
        {featuredProject.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    );
  }

  if (type === "social-link") {
    return (
      <div className={styles.liveSocialLinks}>
        <a href={contactData.socials.linkedin.href} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
          <Image src="/social/linkedin-gray-v2.png" alt="" width={40} height={40} />
        </a>
        <a href={contactData.socials.github.href} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
          <Image src="/social/github-gray-v2.png" alt="" width={40} height={40} />
        </a>
      </div>
    );
  }

  if (type === "skill-card") {
    return (
      <article className={styles.liveSkillCardDemo}>
        <p>{zh ? "About / 專業技能" : "About / Skills"}</p>
        <h3>{firstSkill.title}</h3>
        <ul>
          {firstSkill.skills.slice(0, 5).map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </article>
    );
  }

  if (type === "experience-card") {
    return (
      <article className={styles.liveExperienceCardDemo}>
        <div className={styles.experienceImageDemo}>
          <Image src={firstExperience.image} alt="" fill sizes="240px" />
        </div>
        <div>
          <p>{firstExperience.year}</p>
          <h3>{firstExperience.title}</h3>
          <strong>{firstExperience.role}</strong>
          <span>{firstExperience.date}</span>
        </div>
      </article>
    );
  }

  if (type === "hero-badge") {
    return <div className={styles.liveHeroBadgeDemo}>{zh ? "可接案 / 產品設計與 AI 協作" : "Available / Product design and AI collaboration"}</div>;
  }

  if (type === "case-hero") {
    return (
      <article style={{ width: "100%", maxWidth: "640px", display: "grid", gap: "24px", textAlign: "center" }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "21/9", borderRadius: "var(--hm-radius-lg)", overflow: "hidden", background: "var(--hm-surface)" }}>
          <Image src="/projects/crypto-arsenal/cover/hero-cover.webp" alt="" fill sizes="720px" loading="eager" />
        </div>
        <div>
          <p>WEB · FinTech · UX/UI</p>
          <h3>{zh ? "策略倉位資訊與風險控制介面" : "Position insights and risk controls"}</h3>
        </div>
      </article>
    );
  }

  if (type === "case-section") {
    return (
      <section style={{ width: "100%", maxWidth: "560px", display: "grid", gap: "24px" }}>
        <div><span /><h3>{zh ? "研究洞察" : "Research Insights"}/</h3><span /></div>
        <p>{zh ? "用一致的標題、內容寬度與留白建立案例頁閱讀節奏。" : "Consistent headings, content width, and spacing create a stable case-study rhythm."}</p>
      </section>
    );
  }

  if (type === "proposal-tabs") {
    const proposals = zh ? ["方案 A", "方案 B・採用", "方案 C"] : ["Option A", "Option B · Adopted", "Option C"];
    return (
      <div style={{ width: "100%", maxWidth: "560px", border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--hm-line)" }} role="tablist">
          {proposals.map((tab, index) => (
            <button
              aria-selected={activeProposal === index}
              className={activeProposal === index ? "is-active" : undefined}
              key={tab}
              onClick={() => setActiveProposal(index)}
              role="tab"
              type="button"
            >{tab}</button>
          ))}
        </div>
        <div style={{ padding: "24px", background: "var(--hm-surface)" }}>
          <strong>{proposals[activeProposal]}</strong>
          <p>{zh ? "清楚說明提案差異、驗證結果與最終採用理由。" : "Explain the proposal difference, validation result, and adoption rationale."}</p>
        </div>
      </div>
    );
  }

  if (type === "case-info-card") {
    const items = zh
      ? [["時間", "2024.06 — 2024.08"], ["角色", "UI/UX 設計師"], ["團隊", "5 人跨職能團隊"]]
      : [["Timeline", "Jun — Aug 2024"], ["Role", "UI/UX Designer"], ["Team", "5-person cross-functional team"]];
    return <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", padding: "24px", border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)" }}>{items.map(([label, value]) => <article key={label}><small>{label}</small><strong>{value}</strong></article>)}</div>;
  }

  if (type === "alert") {
    return (
      <ContractOnlyCard locale={locale}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "480px" }}>
          <Alert tone="success">{zh ? "Design tokens 已同步。" : "Design tokens are synchronized."}</Alert>
          <Alert tone="warning">{zh ? "發布前請檢查 RWD。" : "Review responsive behavior before release."}</Alert>
        </div>
      </ContractOnlyCard>
    );
  }

  if (type === "toast") {
    return (
      <>
        <Button onClick={() => setToastVisible(true)}>{zh ? "顯示 Contact toast" : "Show contact toast"}</Button>
        {toastVisible ? (
          <Toast message={copy.contactToastSuccess} tone="success" onClose={() => setToastVisible(false)} />
        ) : null}
      </>
    );
  }

  if (type === "modal") {
    return (
      <ContractOnlyCard locale={locale}>
        <Button onClick={() => setModalOpen(true)}>{zh ? "開啟 modal contract" : "Open modal contract"}</Button>
        <Modal open={modalOpen} title={zh ? "檢查 design-system 變更" : "Review design-system change"} onClose={() => setModalOpen(false)}>
          <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>{zh ? "這是 contract-only preview；目前作品集沒有 live modal flow。" : "This is a contract-only preview; the portfolio has no live modal flow today."}</p>
          <div style={{ display: "flex", gap: "12px" }}>
            <Button onClick={() => setModalOpen(false)}>{zh ? "確認" : "Confirm"}</Button>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>{zh ? "關閉" : "Close"}</Button>
          </div>
        </Modal>
      </ContractOnlyCard>
    );
  }

  if (type === "skeleton") {
    return (
      <ContractOnlyCard locale={locale}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "480px" }} aria-label={zh ? "載入預覽" : "Loading preview"}>
          <Skeleton style={{ width: "42%", height: 18 }} />
          <Skeleton style={{ width: "100%", height: 72 }} />
          <Skeleton style={{ width: "76%", height: 18 }} />
        </div>
      </ContractOnlyCard>
    );
  }

  if (type === "empty") {
    return (
      <ContractOnlyCard locale={locale}>
        <EmptyState
          title={zh ? "沒有符合的元件" : "No matching component"}
          description={zh ? "清除篩選或改看其他分類。" : "Clear filters or browse another category."}
          action={<Button size="sm">{zh ? "清除篩選" : "Clear filters"}</Button>}
        />
      </ContractOnlyCard>
    );
  }

  if (type === "zoom") {
    return (
      <div style={{ width: "100%", maxWidth: "480px", border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", overflow: "hidden" }}>
        <ZoomableImage
          alt="Design system project cover"
          src="/projects/advantech/cover/cover.webp"
          width={1280}
          height={720}
          labels={{ close: zh ? "關閉" : "Close", separator: ": ", zoom: zh ? "放大圖片" : "Zoom image" }}
        />
      </div>
    );
  }

  return <p className={styles.demoFallback}>{zh ? "正式行為請參考連結的 production source。" : "Live behavior is visible in the linked production source."}</p>;
}
