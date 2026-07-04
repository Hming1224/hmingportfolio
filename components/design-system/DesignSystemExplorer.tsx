"use client";

import { useEffect, useState, type ReactNode } from "react";
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

function sectionId(section: DesignSystemSection) {
  return section.label.toLowerCase().replaceAll(" ", "-");
}

function sectionForAnchor(sections: DesignSystemSection[], anchor: string) {
  return sections.find((section) => anchor === `#${sectionId(section)}`);
}

function docSectionForAnchor(
  sections: DesignSystemSection[],
  docs: DesignSystemDoc[],
  anchor: string,
) {
  const slug = anchor.replace(/^#/, "");
  if (!slug) return null;

  for (const section of sections) {
    const doc = section.items
      .map((item) => docs.find((candidate) => candidate.slug === item.slug && candidate.kind === item.kind))
      .find((candidate) => candidate?.slug === slug);

    if (doc) return { section, doc };
  }

  return null;
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
  const initialActiveSlugs = Object.fromEntries(
    sections.map((section) => [
      section.label,
      section.items
        .map((item) => docs.find((doc) => doc.slug === item.slug && doc.kind === item.kind))
        .find(Boolean)?.slug ?? "",
    ]),
  );
  const [activeSlugs, setActiveSlugs] = useState<Record<string, string>>(initialActiveSlugs);
  const [activeAnchor, setActiveAnchor] = useState("#getting-started");
  const [openSection, setOpenSection] = useState<string>(sections[0]?.label ?? "");
  const ctaItem = toc.items.find((item) => item.href === "#cta") ?? toc.items[toc.items.length - 1];
  const gettingStartedItem = toc.items[0];

  useEffect(() => {
    const updateActiveAnchor = () => {
      const hash = window.location.hash || "#getting-started";
      const matchingSection = sectionForAnchor(sections, hash);
      const matchingDoc = docSectionForAnchor(sections, docs, hash);

      if (matchingDoc) {
        const href = `#${sectionId(matchingDoc.section)}`;
        setActiveAnchor(href);
        setOpenSection(matchingDoc.section.label);
        setActiveSlugs((current) => ({ ...current, [matchingDoc.section.label]: matchingDoc.doc.slug }));
        window.requestAnimationFrame(() => {
          document.getElementById(sectionId(matchingDoc.section))?.scrollIntoView({ block: "start" });
        });
        return;
      }

      setActiveAnchor(hash);
      if (matchingSection) setOpenSection(matchingSection.label);
    };

    updateActiveAnchor();
    window.addEventListener("hashchange", updateActiveAnchor);

    return () => {
      window.removeEventListener("hashchange", updateActiveAnchor);
    };
  }, [docs, sections]);

  useEffect(() => {
    const sectionAnchors = [
      "#getting-started",
      ...sections.map((section) => `#${sectionId(section)}`),
      "#cta",
    ];
    let frameId = 0;

    const updateActiveAnchorFromScroll = () => {
      const scrollOffset = window.scrollY + 180;
      const currentAnchor = sectionAnchors.reduce((current, anchor) => {
        const target = document.getElementById(anchor.slice(1));
        if (!target) return current;

        const sectionTop = target.getBoundingClientRect().top + window.scrollY;
        return sectionTop <= scrollOffset ? anchor : current;
      }, sectionAnchors[0]);
      const matchingSection = sectionForAnchor(sections, currentAnchor);

      setActiveAnchor(currentAnchor);
      if (matchingSection) setOpenSection(matchingSection.label);
    };

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        updateActiveAnchorFromScroll();
      });
    };

    updateActiveAnchorFromScroll();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [sections]);

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <nav aria-label={toc.title} className={styles.nav}>
          {gettingStartedItem ? (
            <a
              aria-current={activeAnchor === gettingStartedItem.href ? "page" : undefined}
              className={`${styles.rootLink}${activeAnchor === gettingStartedItem.href ? ` ${styles.active}` : ""}`}
              href={gettingStartedItem.href}
              onClick={() => setActiveAnchor(gettingStartedItem.href)}
            >
              {gettingStartedItem.label}
            </a>
          ) : null}

          <Accordion
            className={styles.categoryAccordion}
            onValueChange={(value) => {
              const nextValue = Array.isArray(value) ? value[0] : value;
              if (!nextValue) return;

              const nextSection = sections.find((section) => section.label === nextValue);
              if (!nextSection) return;

              const href = `#${sectionId(nextSection)}`;
              setOpenSection(nextValue);
              setActiveAnchor(href);
              window.history.replaceState(null, "", href);
              document.getElementById(sectionId(nextSection))?.scrollIntoView({ block: "start" });
            }}
            type="single"
            value={openSection}
          >
            {sections.map((section) => {
              const id = sectionId(section);
              const href = `#${id}`;
              const isSectionActive = activeAnchor === href;

              return (
                <AccordionItem className={styles.navAccordionItem} key={section.label} value={section.label}>
                  <AccordionHeader className={isSectionActive ? styles.activeAccordionHeader : undefined}>
                    {localized(locale, section.label, section.labelZh)}
                  </AccordionHeader>
                  <AccordionPanel>
                    <div className={styles.componentList}>
                      {section.items.map((item) => {
                        const doc = docs.find((candidate) => candidate.slug === item.slug && candidate.kind === item.kind);
                        if (!doc) return null;
                        const isActive = activeAnchor === href && activeSlugs[section.label] === doc.slug;

                        return (
                          <a
                            aria-current={isActive ? "page" : undefined}
                            className={`${styles.componentLink}${isActive ? ` ${styles.active}` : ""}`}
                            href={href}
                            key={`${doc.kind}-${doc.slug}`}
                            onClick={() => {
                              setOpenSection(section.label);
                              setActiveAnchor(href);
                              setActiveSlugs((current) => ({ ...current, [section.label]: doc.slug }));
                            }}
                          >
                            {localized(locale, doc.title, doc.titleZh)}
                          </a>
                        );
                      })}
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>

          {ctaItem ? (
            <a
              aria-current={activeAnchor === ctaItem.href ? "page" : undefined}
              className={`${styles.rootLink}${activeAnchor === ctaItem.href ? ` ${styles.active}` : ""}`}
              href={ctaItem.href}
              onClick={() => setActiveAnchor(ctaItem.href)}
            >
              {ctaItem.label}
            </a>
          ) : null}
        </nav>
      </aside>

      <div className={styles.content}>
        {topContent}
        {sections.map((section) => {
          const id = sectionId(section);
          const activeSlug = activeSlugs[section.label];
          const activeDoc = docs.find((doc) => doc.slug === activeSlug);

          return (
            <section className={styles.categorySection} id={id} key={section.label}>
              <div className={styles.activeDoc}>
                {activeDoc ? <DesignSystemDocsPage doc={activeDoc} locale={locale} /> : null}
              </div>
            </section>
          );
        })}
        {bottomContent}
      </div>
    </div>
  );
}
