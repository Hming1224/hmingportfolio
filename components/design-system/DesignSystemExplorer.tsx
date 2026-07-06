"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
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

function firstDocInSection(section: DesignSystemSection, docs: DesignSystemDoc[]) {
  return section.items
    .map((item) => docs.find((doc) => doc.slug === item.slug && doc.kind === item.kind))
    .find(Boolean);
}

function docSectionForAnchor(
  sections: DesignSystemSection[],
  docs: DesignSystemDoc[],
  anchor: string,
) {
  const slugAliases: Record<string, string> = {
    "border-radius": "radius",
    "component-boundaries": "local-exceptions",
    "token-reference": "tokens",
    reference: "tokens",
    "future-candidates": "future-backlog",
    backlog: "future-backlog",
    "scroll-progress": "local-exceptions",
    "case-next-nav": "local-exceptions",
    "case-info-card": "local-exceptions",
    "year-rail": "local-exceptions",
    "project-tag": "local-exceptions",
    "social-link": "local-exceptions",
    "contact-method": "local-exceptions",
    "experience-card": "local-exceptions",
    "section-heading": "local-exceptions",
    "hero-badge": "local-exceptions",
    "skill-category-card": "local-exceptions",
    "accordion": "local-exceptions",
    "iconography": "icons",
  };
  const requestedSlug = anchor.replace(/^#/, "");
  const slug = slugAliases[requestedSlug] ?? requestedSlug;
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
  const initialCatalogSection = sections[0];
  const initialCatalogDoc = initialCatalogSection ? firstDocInSection(initialCatalogSection, docs) : undefined;
  const [activeCatalogItem, setActiveCatalogItem] = useState({
    sectionLabel: initialCatalogSection?.label ?? "",
    slug: initialCatalogDoc?.slug ?? "",
  });
  const [activeAnchor, setActiveAnchor] = useState("#getting-started");
  const [openSection, setOpenSection] = useState<string>(sections[0]?.label ?? "");
  const gettingStartedItem = toc.items[0];
  const measureRef = useRef<HTMLDivElement>(null);
  const [navWidth, setNavWidth] = useState<number | null>(null);

  const activeCatalogDoc = docs.find((doc) => doc.slug === activeCatalogItem.slug);

  const activateCatalogDoc = (
    section: DesignSystemSection,
    doc: DesignSystemDoc,
    options: { updateHash?: boolean; scroll?: boolean } = {},
  ) => {
    const { updateHash = true, scroll = true } = options;
    setOpenSection(section.label);
    setActiveAnchor("#catalog");
    setActiveCatalogItem({ sectionLabel: section.label, slug: doc.slug });

    if (updateHash) {
      window.history.pushState(null, "", `#${doc.slug}`);
    }

    if (scroll) {
      window.requestAnimationFrame(() => {
        document.getElementById("catalog")?.scrollIntoView({ block: "start" });
      });
    }
  };

  useLayoutEffect(() => {
    const container = measureRef.current;
    if (!container) return;

    const widths = Array.from(container.children).map(
      (el) => (el as HTMLElement).getBoundingClientRect().width,
    );
    const max = Math.max(0, ...widths);
    setNavWidth(max > 0 ? Math.ceil(max) : null);
  }, [locale, sections, docs, gettingStartedItem]);

  useEffect(() => {
    const updateActiveAnchor = () => {
      const hash = window.location.hash || "#getting-started";
      const matchingSection = sectionForAnchor(sections, hash);
      const matchingDoc = docSectionForAnchor(sections, docs, hash);

      if (matchingDoc) {
        activateCatalogDoc(matchingDoc.section, matchingDoc.doc, { updateHash: false });
        return;
      }

      if (hash === "#where-to-go-next" || hash === "#next-step" || hash === "#cta") {
        setActiveAnchor("#where-to-go-next");
        window.requestAnimationFrame(() => {
          document.getElementById("where-to-go-next")?.scrollIntoView({ block: "start" });
        });
        return;
      }

      if (hash === "#getting-started") {
        setActiveAnchor(hash);
        window.requestAnimationFrame(() => {
          document.getElementById("getting-started")?.scrollIntoView({ block: "start" });
        });
        return;
      }

      if (matchingSection) {
        const doc = firstDocInSection(matchingSection, docs);
        if (doc) activateCatalogDoc(matchingSection, doc, { updateHash: false });
        return;
      }

      setActiveAnchor(hash);
    };

    updateActiveAnchor();
    window.addEventListener("hashchange", updateActiveAnchor);
    window.addEventListener("popstate", updateActiveAnchor);

    return () => {
      window.removeEventListener("hashchange", updateActiveAnchor);
      window.removeEventListener("popstate", updateActiveAnchor);
    };
  }, [docs, sections]);

  useEffect(() => {
    const sectionAnchors = [
      "#getting-started",
      "#catalog",
      "#where-to-go-next",
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
        <div aria-hidden="true" className={styles.navMeasure} ref={measureRef}>
          {gettingStartedItem ? <span className={styles.rootLink}>{gettingStartedItem.label}</span> : null}
          {sections.map((section) => (
            <span className={styles.measureAccordionHeader} key={`measure-header-${section.label}`}>
              <span>{localized(locale, section.label, section.labelZh)}</span>
              <span className={styles.measureIcon} />
            </span>
          ))}
          {sections.flatMap((section) =>
            section.items.map((item) => {
              const doc = docs.find((candidate) => candidate.slug === item.slug && candidate.kind === item.kind);
              if (!doc) return null;
              return (
                <div className={styles.componentList} key={`measure-${doc.kind}-${doc.slug}`}>
                  <span className={styles.componentLink}>{localized(locale, doc.title, doc.titleZh)}</span>
                </div>
              );
            }),
          )}
        </div>

        <nav
          aria-label={toc.title}
          className={styles.nav}
          style={navWidth ? { width: navWidth } : undefined}
        >
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
              if (!nextValue) {
                setOpenSection("");
                return;
              }

              const nextSection = sections.find((section) => section.label === nextValue);
              if (!nextSection) return;

              setOpenSection(nextValue);
            }}
            type="single"
            value={openSection}
          >
            {sections.map((section) => {
              const isSectionActive = activeAnchor === "#catalog" && activeCatalogItem.sectionLabel === section.label;

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
                        const isActive = activeAnchor === "#catalog" && activeCatalogItem.sectionLabel === section.label && activeCatalogItem.slug === doc.slug;

                        return (
                          <a
                            aria-current={isActive ? "page" : undefined}
                            className={`${styles.componentLink}${isActive ? ` ${styles.active}` : ""}`}
                            href={`#${doc.slug}`}
                            key={`${doc.kind}-${doc.slug}`}
                            onClick={(event) => {
                              event.preventDefault();
                              activateCatalogDoc(section, doc);
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
        </nav>
      </aside>

      <div className={styles.content}>
        {topContent}
        <section className={styles.categorySection} id="catalog">
          <div className={styles.activeDoc}>
            {activeCatalogDoc ? <DesignSystemDocsPage doc={activeCatalogDoc} locale={locale} /> : null}
          </div>
        </section>
        {bottomContent}
      </div>
    </div>
  );
}
