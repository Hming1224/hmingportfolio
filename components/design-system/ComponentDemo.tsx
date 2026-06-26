"use client";

import Image from "next/image";
import { useState } from "react";
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

const options = [
  { label: "Product design", value: "product" },
  { label: "UX research", value: "research" },
  { label: "Design system", value: "system" },
];

export default function ComponentDemo({
  type,
  locale,
}: {
  type?: string;
  locale: DesignSystemLocale;
}) {
  const zh = locale === "zh-TW";
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [activeProposal, setActiveProposal] = useState(1);

  if (!type) {
    return <p style={{ color: "var(--text-secondary)", fontStyle: "italic", textAlign: "center" }}>This pattern is documented from its live portfolio usage.</p>;
  }

  if (type === "button") {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--hm-space-sm)", justifyContent: "center" }}>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button loading loadingLabel="Loading">Loading</Button>
        <Button disabled>Disabled</Button>
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
      <div style={{ position: "relative", display: "inline-block", fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "14px" }} aria-label={zh ? "語言選單範例" : "Language menu example"}>
        <button type="button" aria-expanded="true">
          {zh ? "繁體中文" : "English"} <span aria-hidden="true">⌄</span>
        </button>
        <div role="menu">
          <button type="button" role="menuitemradio" aria-checked={locale === "en"}>
            English {locale === "en" ? "✓" : ""}
          </button>
          <button type="button" role="menuitemradio" aria-checked={locale === "zh-TW"}>
            繁體中文 {locale === "zh-TW" ? "✓" : ""}
          </button>
        </div>
      </div>
    );
  }

  if (type === "navbar") {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "16px 24px", border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-pill)", background: "var(--hm-surface)" }}>
        <strong aria-label="Hming Design">H</strong>
        <nav aria-label={zh ? "主要導覽範例" : "Primary navigation example"}>
          <a href="#preview">{zh ? "作品" : "Projects"}</a>
          <a href="#preview">{zh ? "關於我" : "About"}</a>
          <a href="#preview">{zh ? "聯絡我" : "Contact"}</a>
        </nav>
        <button type="button" aria-label={zh ? "開啟選單" : "Open menu"}>☰</button>
      </div>
    );
  }

  if (type === "footer") {
    return (
      <footer style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "24px", borderTop: "1px solid var(--hm-line)", color: "var(--text-secondary)", fontSize: "14px" }}>
        <p>© Brian Huang 2026</p>
        <div>
          <a href="https://www.linkedin.com" aria-label="LinkedIn">in</a>
          <a href="https://github.com" aria-label="GitHub">GH</a>
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
    return (
      <label style={{ position: "relative", display: "block", width: "100%", maxWidth: "320px" }}>
        {type === "textarea" ? <textarea placeholder=" " rows={4} /> : <input type="text" placeholder=" " />}
        <span>{type === "textarea" ? "Project context" : "Email address"}</span>
      </label>
    );
  }

  if (type === "select") {
    return (
      <div style={{ width: "100%", maxWidth: "320px" }}>
        <Select
          name="design-discipline"
          options={options}
          value={selectValue}
          onChange={setSelectValue}
          placeholder="Choose a discipline"
        />
      </div>
    );
  }

  if (type === "checkbox") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Checkbox defaultChecked>Selected option</Checkbox>
        <Checkbox>Available option</Checkbox>
        <Checkbox disabled>Disabled option</Checkbox>
      </div>
    );
  }

  if (type === "radio") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Radio name="demo-radio" defaultChecked>Product designer</Radio>
        <Radio name="demo-radio">Product manager</Radio>
        <Radio name="demo-radio" disabled>Unavailable</Radio>
      </div>
    );
  }

  if (type === "tabs") {
    return (
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--hm-line)" }} role="tablist" aria-label="Case study views">
        {["Overview", "Research", "Solution"].map((tab) => (
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            className={activeTab === tab ? "is-active" : undefined}
            key={tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
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
      <nav style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }} aria-label={zh ? "年份範例" : "Year navigation example"}>
        {["2026", "2025", "2024", "2023"].map((year) => (
          <a className={year === "2025" ? "is-active" : undefined} href="#preview" key={year}>{year}</a>
        ))}
      </nav>
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
      <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px", border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", background: "var(--hm-surface)" }}>
        <span aria-hidden="true">@</span>
        <div><small>Email</small><strong>hmingdesigner@gmail.com</strong></div>
        <Button size="sm" variant="secondary">{zh ? "複製" : "Copy"}</Button>
      </div>
    );
  }

  if (type === "project-card") {
    return (
      <article style={{ width: "100%", maxWidth: "360px", display: "grid", gap: "16px", padding: "16px", border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", background: "var(--hm-paper)", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: "var(--hm-radius-md)", overflow: "hidden", background: "var(--hm-surface)" }}>
          <Image src="/projects/advantech/cover/cover.webp" alt="" fill sizes="560px" loading="eager" />
        </div>
        <div>
          <p>Product Design · 2024</p>
          <h3>{zh ? "智慧能源維運系統" : "Smart energy operations system"}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "12px" }}><span>UX Research</span><span>UI Design</span></div>
        </div>
      </article>
    );
  }

  if (type === "section-heading") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "16px", width: "100%" }}>
        <span /><h3>{zh ? "精選作品" : "Selected Projects"}</h3><span />
      </div>
    );
  }

  if (type === "tags") {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "12px" }}>
        <span>Product design</span>
        <span>UX research</span>
        <span>AI collaboration</span>
      </div>
    );
  }

  if (type === "social-link") {
    return (
      <div style={{ display: "flex", gap: "16px" }}>
        <a href="https://www.linkedin.com" aria-label="LinkedIn">in</a>
        <a href="https://github.com" aria-label="GitHub">GH</a>
      </div>
    );
  }

  if (type === "skill-card") {
    return (
      <article style={{ padding: "24px", border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", background: "var(--hm-surface)" }}>
        <p>01 / Product</p>
        <h3>{zh ? "產品設計" : "Product Design"}</h3>
        <ul><li>UX Research</li><li>Interaction Design</li><li>Prototyping</li></ul>
      </article>
    );
  }

  if (type === "experience-card") {
    return (
      <article style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "24px", padding: "24px", borderTop: "1px solid var(--hm-line)" }}>
        <time>2024 — 2025</time>
        <div>
          <h3>{zh ? "產品設計師" : "Product Designer"}</h3>
          <p>{zh ? "負責研究、流程設計與介面規格，協作 PM 與工程團隊完成產品迭代。" : "Owned research, flows, and UI specifications across product iterations."}</p>
        </div>
      </article>
    );
  }

  if (type === "hero-badge") {
    return <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "var(--hm-radius-pill)", background: "var(--hm-purple-soft)", color: "var(--hm-purple)", fontSize: "14px", fontWeight: 500 }}><span aria-hidden="true">✦</span>{zh ? "產品設計師・與 AI 協作" : "Product Designer · Building with AI"}</div>;
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
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "480px" }}>
        <Alert tone="success">Design tokens are synchronized.</Alert>
        <Alert tone="warning">Review responsive behavior before release.</Alert>
        <Alert tone="error">Required field is missing.</Alert>
        <Alert tone="info">Documentation uses production components.</Alert>
      </div>
    );
  }

  if (type === "toast") {
    return (
      <>
        <Button onClick={() => setToastVisible(true)}>Show toast</Button>
        {toastVisible ? (
          <Toast message="Changes saved." tone="success" onClose={() => setToastVisible(false)} />
        ) : null}
      </>
    );
  }

  if (type === "modal") {
    return (
      <>
        <Button onClick={() => setModalOpen(true)}>Open modal</Button>
        <Modal open={modalOpen} title="Review design-system change" onClose={() => setModalOpen(false)}>
          <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>Focus stays inside this dialog. Press Escape or use Close.</p>
          <div style={{ display: "flex", gap: "12px" }}>
            <Button onClick={() => setModalOpen(false)}>Confirm</Button>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Close</Button>
          </div>
        </Modal>
      </>
    );
  }

  if (type === "skeleton") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "480px" }} aria-label="Loading preview">
        <Skeleton style={{ width: "42%", height: 18 }} />
        <Skeleton style={{ width: "100%", height: 72 }} />
        <Skeleton style={{ width: "76%", height: 18 }} />
      </div>
    );
  }

  if (type === "empty") {
    return (
      <EmptyState
        title="No matching component"
        description="Clear filters or browse another category."
        action={<Button size="sm">Clear filters</Button>}
      />
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
          labels={{ close: "Close", separator: ": ", zoom: "Zoom image" }}
        />
      </div>
    );
  }

  return <p style={{ color: "var(--text-secondary)", fontStyle: "italic", textAlign: "center" }}>Live behavior is visible in the linked production source.</p>;
}
