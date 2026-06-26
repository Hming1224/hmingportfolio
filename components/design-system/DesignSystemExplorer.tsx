"use client";

import { useState } from "react";
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "@/components/ui/Accordion";
import type { DesignSystemDoc, DesignSystemLocale } from "@/lib/design-system-docs";
import DesignSystemDocsPage from "./DesignSystemDocsPage";

export default function DesignSystemExplorer({
  locale,
  sections,
  docs,
}: {
  locale: DesignSystemLocale;
  sections: Array<{ label: string; labelZh?: string; items: Array<{ kind: string; slug: string }> }>;
  docs: DesignSystemDoc[];
}) {
  const [activeSlug, setActiveSlug] = useState<string>(docs[0]?.slug ?? "");

  const activeDoc = docs.find((d) => d.slug === activeSlug);

  return (
    <div className="ds-docs-layout" style={{ marginTop: "var(--hm-space-2xl)", alignItems: "flex-start" }}>
      <aside className="ds-docs-sidebar" style={{ position: "sticky", top: "80px", maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}>
        <Accordion type="single" defaultValue={sections[0]?.label}>
          {sections.map((section) => (
            <AccordionItem key={section.label} value={section.label}>
              <AccordionHeader>
                {locale === "zh-TW" && section.labelZh ? section.labelZh : section.label}
              </AccordionHeader>
              <AccordionPanel>
                <nav className="ds-docs-nav-group" style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "8px 0" }}>
                  {section.items.map((item) => {
                    const doc = docs.find((d) => d.slug === item.slug && d.kind === item.kind);
                    if (!doc) return null;
                    const isActive = activeSlug === doc.slug;
                    return (
                      <button
                        key={doc.slug}
                        type="button"
                        onClick={() => setActiveSlug(doc.slug)}
                        className={`ds-docs-nav-link ${isActive ? "is-active" : ""}`}
                        style={{
                          textAlign: "left",
                          background: "none",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "var(--hm-fs-sm)",
                          color: isActive ? "var(--hm-purple)" : "var(--hm-ink)",
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        {locale === "zh-TW" && doc.titleZh ? doc.titleZh : doc.title}
                      </button>
                    );
                  })}
                </nav>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </aside>

      <div style={{ flex: 1, minWidth: 0 }}>
        {activeDoc ? <DesignSystemDocsPage doc={activeDoc} locale={locale} /> : null}
      </div>
    </div>
  );
}
