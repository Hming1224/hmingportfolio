"use client";

import { useState, type ReactNode } from "react";
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "@/components/ui/Accordion";
import type { DesignSystemDoc, DesignSystemDocKind, DesignSystemLocale } from "@/lib/design-system-docs";
import DesignSystemDocsPage from "./DesignSystemDocsPage";
import styles from "./DesignSystemExplorer.module.css";

type DesignSystemSection = {
  label: string;
  labelZh?: string;
  items: Array<{ kind: DesignSystemDocKind; slug: string }>;
};

function localized(locale: DesignSystemLocale, english: string, chinese?: string) {
  return locale === "zh-TW" && chinese ? chinese : english;
}

export default function DesignSystemExplorer({
  locale,
  sections,
  docs,
  toc,
  topContent,
  bottomContent,
}: {
  locale: DesignSystemLocale;
  sections: DesignSystemSection[];
  docs: DesignSystemDoc[];
  toc: { title: string; items: Array<{ href: string; label: string }> };
  topContent?: ReactNode;
  bottomContent?: ReactNode;
}) {
  const firstDoc = sections
    .flatMap((section) => section.items)
    .map((item) => docs.find((doc) => doc.slug === item.slug && doc.kind === item.kind))
    .find(Boolean);
  const [activeSlug, setActiveSlug] = useState<string>(firstDoc?.slug ?? docs[0]?.slug ?? "");
  const activeDoc = docs.find((doc) => doc.slug === activeSlug);
  const ctaItem = toc.items.find((item) => item.href === "#cta") ?? toc.items[toc.items.length - 1];
  const gettingStartedItem = toc.items[0];

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <nav aria-label={toc.title} className={styles.nav}>
          {gettingStartedItem ? (
            <a className={styles.rootLink} href={gettingStartedItem.href}>
              {gettingStartedItem.label}
            </a>
          ) : null}
          <Accordion className={styles.rootAccordion} defaultValue="component-explorer" type="single">
            <AccordionItem value="component-explorer">
              <AccordionHeader>{localized(locale, "Component Explorer", "元件總覽")}</AccordionHeader>
              <AccordionPanel>
                <Accordion className={styles.categoryAccordion} defaultValue={sections[0]?.label} type="single">
                  {sections.map((section) => (
                    <AccordionItem key={section.label} value={section.label}>
                      <AccordionHeader>{localized(locale, section.label, section.labelZh)}</AccordionHeader>
                      <AccordionPanel>
                        <div className={styles.componentList}>
                          {section.items.map((item) => {
                            const doc = docs.find((candidate) => candidate.slug === item.slug && candidate.kind === item.kind);
                            if (!doc) return null;
                            const isActive = activeSlug === doc.slug;
                            return (
                              <a
                                aria-current={isActive ? "page" : undefined}
                                className={`${styles.componentLink}${isActive ? ` ${styles.active}` : ""}`}
                                href="#components"
                                key={`${doc.kind}-${doc.slug}`}
                                onClick={() => setActiveSlug(doc.slug)}
                              >
                                {localized(locale, doc.title, doc.titleZh)}
                              </a>
                            );
                          })}
                        </div>
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          {ctaItem ? (
            <a className={styles.rootLink} href={ctaItem.href}>
              {ctaItem.label}
            </a>
          ) : null}
        </nav>
      </aside>

      <div className={styles.content}>
        {topContent}
        <div className={styles.activeDoc} id="components">
          {activeDoc ? <DesignSystemDocsPage doc={activeDoc} locale={locale} /> : null}
        </div>
        {bottomContent}
      </div>
    </div>
  );
}
