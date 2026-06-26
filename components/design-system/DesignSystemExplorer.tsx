"use client";

import { useState } from "react";
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "@/components/ui/Accordion";
import type { DesignSystemDoc, DesignSystemLocale } from "@/lib/design-system-docs";
import DesignSystemDocsPage from "./DesignSystemDocsPage";

export default function DesignSystemExplorer({
  locale,
  sections,
  docs,
  toc,
  topContent,
  bottomContent,
}: {
  locale: DesignSystemLocale;
  sections: Array<{ label: string; labelZh?: string; items: Array<{ kind: string; slug: string }> }>;
  docs: DesignSystemDoc[];
  toc: { title: string; items: Array<{ href: string; label: string }> };
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
}) {
  const [activeSlug, setActiveSlug] = useState<string>(docs[0]?.slug ?? "");

  const activeDoc = docs.find((d) => d.slug === activeSlug);

  return (
    <div style={{ width: "min(var(--hm-container), calc(100% - 96px))", margin: "0 auto", display: "grid", gridTemplateColumns: "260px minmax(0, 1fr)", gap: "var(--hm-space-xl)", marginTop: "var(--hm-space-2xl)", alignItems: "flex-start" }}>
      <aside style={{ position: "sticky", top: "80px", maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}>
        
        <nav style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          
          {/* Top-level page links acting as nav roots */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <a 
              href={toc.items[0].href} 
              className="hm-accordion-trigger" 
              style={{ textDecoration: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              {toc.items[0].label}
            </a>
            <a 
              href={toc.items[1].href} 
              className="hm-accordion-trigger" 
              style={{ textDecoration: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              {toc.items[1].label}
            </a>
          </div>

          <Accordion type="single" defaultValue={sections[0]?.label}>
          {sections.map((section) => (
            <AccordionItem key={section.label} value={section.label}>
              <AccordionHeader>
                {locale === "zh-TW" && section.labelZh ? section.labelZh : section.label}
              </AccordionHeader>
              <AccordionPanel>
                <nav style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "8px 0" }}>
                  {section.items.map((item) => {
                    const doc = docs.find((d) => d.slug === item.slug && d.kind === item.kind);
                    if (!doc) return null;
                    const isActive = activeSlug === doc.slug;
                    return (
                      <a
                        key={doc.slug}
                        href="#components"
                        onClick={() => setActiveSlug(doc.slug)}
                        className={`ds-docs-nav-link ${isActive ? "is-active" : ""}`}
                        style={{
                          display: "block",
                          textAlign: "left",
                          textDecoration: "none",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          fontSize: "var(--hm-fs-sm)",
                          color: isActive ? "var(--hm-purple)" : "var(--hm-ink)",
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        {locale === "zh-TW" && doc.titleZh ? doc.titleZh : doc.title}
                      </a>
                    );
                  })}
                </nav>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>

          <div style={{ display: "flex", flexDirection: "column", marginTop: "var(--hm-space-xs)" }}>
            <a 
              href={toc.items[3].href} 
              className="hm-accordion-trigger" 
              style={{ textDecoration: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              {toc.items[3].label}
            </a>
          </div>
        </nav>
      </aside>

      <div style={{ flex: 1, minWidth: 0, display: "grid", gap: "var(--hm-space-xl)" }}>
        {topContent}
        <div id="components" style={{ scrollMarginTop: "100px", marginTop: "var(--hm-space-2xl)", paddingTop: "var(--hm-space-2xl)", borderTop: "1px solid var(--hm-line)" }}>
          {activeDoc ? <DesignSystemDocsPage doc={activeDoc} locale={locale} /> : null}
        </div>
        {bottomContent}
      </div>
    </div>
  );
}
