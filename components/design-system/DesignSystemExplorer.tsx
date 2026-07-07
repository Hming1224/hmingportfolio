"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
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
    catalog: "colors",
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

type ActiveWorkspace =
  | { type: "getting-started" }
  | { type: "doc"; sectionLabel: string; slug: string }
  | { type: "see-more" };

export default function DesignSystemExplorer({
  locale,
  sections,
  docs,
  toc,
  gettingStartedContent,
  seeMoreContent,
}: {
  locale: DesignSystemLocale;
  sections: DesignSystemSection[];
  docs: DesignSystemDoc[];
  toc: { title: string; items: Array<{ href: string; label: string }> };
  gettingStartedContent?: ReactNode;
  seeMoreContent?: ReactNode;
}) {
  const [activeWorkspace, setActiveWorkspace] = useState<ActiveWorkspace>({ type: "getting-started" });
  const [openSection, setOpenSection] = useState<string>("");
  const gettingStartedItem = toc.items[0];
  const nextStepItem = toc.items.find((item) => item.href === "#see-more") ?? toc.items[toc.items.length - 1];
  const measureRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const [navWidth, setNavWidth] = useState<number | null>(null);
  const [workspaceScrollRequest, setWorkspaceScrollRequest] = useState(0);

  const activeCatalogDoc = activeWorkspace.type === "doc"
    ? docs.find((doc) => doc.slug === activeWorkspace.slug)
    : undefined;

  const scrollToWorkspace = useCallback(() => {
    setWorkspaceScrollRequest((request) => request + 1);
  }, []);

  useLayoutEffect(() => {
    if (!workspaceScrollRequest) return;

    let frame = 0;

    const textRect = (element: Element | null) => {
      if (!element) return null;
      const range = document.createRange();
      range.selectNodeContents(element);
      const rect = range.getBoundingClientRect();
      range.detach();
      return rect;
    };

    frame = window.requestAnimationFrame(() => {
      const workspace = document.getElementById("design-system-workspace");
      if (!workspace) return;

      if (window.matchMedia("(max-width: 900px)").matches) {
        workspace.scrollIntoView({ block: "start" });
        return;
      }

      const shellElement = shellRef.current;
      const sidebar = shellElement?.querySelector(`.${styles.sidebar}`);
      const anchorText = textRect(document.querySelector("[data-ds-toc-root='getting-started']"));
      const workspaceText = textRect(workspace.querySelector("p,h1,h2,h3"));
      if (!shellElement || !sidebar || !anchorText || !workspaceText) {
        workspace.scrollIntoView({ block: "start" });
        return;
      }

      const sidebarRect = sidebar.getBoundingClientRect();
      const stickyTop = Number.parseFloat(window.getComputedStyle(sidebar).top) || sidebarRect.top;
      const anchorInset = anchorText.top - sidebarRect.top;
      const targetTop = stickyTop + anchorInset;
      const stickyScrollTop = shellElement.offsetTop - stickyTop + 2;
      window.scrollTo({
        top: Math.max(window.scrollY + workspaceText.top - targetTop, stickyScrollTop),
      });
    });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [workspaceScrollRequest]);

  const activateCatalogDoc = useCallback(
    (
      section: DesignSystemSection,
      doc: DesignSystemDoc,
      options: { updateHash?: boolean; scroll?: boolean } = {},
    ) => {
      const { updateHash = true, scroll = true } = options;
      setOpenSection(section.label);
      setActiveWorkspace({ type: "doc", sectionLabel: section.label, slug: doc.slug });

      if (updateHash) {
        window.history.pushState(null, "", `#${doc.slug}`);
      }

      if (scroll) {
        scrollToWorkspace();
      }
    },
    [scrollToWorkspace],
  );

  const activateGettingStarted = useCallback((options: { updateHash?: boolean; scroll?: boolean } = {}) => {
    const { updateHash = true, scroll = true } = options;
    setOpenSection("");
    setActiveWorkspace({ type: "getting-started" });

    if (updateHash) {
      window.history.pushState(null, "", "#getting-started");
    }

    if (scroll) {
      scrollToWorkspace();
    }
  }, [scrollToWorkspace]);

  const activateSeeMore = useCallback((options: { updateHash?: boolean; scroll?: boolean } = {}) => {
    const { updateHash = true, scroll = true } = options;
    setActiveWorkspace({ type: "see-more" });
    setOpenSection("");

    if (updateHash) {
      window.history.pushState(null, "", "#see-more");
    }

    if (scroll) {
      scrollToWorkspace();
    }
  }, [scrollToWorkspace]);

  useLayoutEffect(() => {
    const container = measureRef.current;
    if (!container) return;

    const widths = Array.from(container.children).map(
      (el) => (el as HTMLElement).getBoundingClientRect().width,
    );
    const max = Math.max(0, ...widths);
    setNavWidth(max > 0 ? Math.ceil(max) : null);
  }, [locale, sections, docs, gettingStartedItem, nextStepItem]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || typeof window === "undefined") return;

    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setProgress = (progress: number) => {
      const clampedProgress = Math.min(1, Math.max(0, progress));
      const segmentProgress = (start: number, end: number) => {
        if (clampedProgress <= start) return 0;
        if (clampedProgress >= end) return 1;
        return (clampedProgress - start) / (end - start);
      };
      const heroExitProgress = segmentProgress(0.42, 0.74);
      const shellEnterProgress = segmentProgress(0.84, 1);
      const heroOpacity = Math.max(0.001, 1 - heroExitProgress);
      const shellOpacity = Math.max(0.001, shellEnterProgress);

      root.style.setProperty("--ds-hero-opacity", heroOpacity.toFixed(3));
      root.style.setProperty("--ds-shell-opacity", shellOpacity.toFixed(3));
      root.style.setProperty("--ds-hero-y", `${Math.round(-72 * heroExitProgress)}px`);
      root.style.setProperty("--ds-shell-y", `${Math.round(72 * (1 - shellEnterProgress))}px`);
      root.style.setProperty("--ds-hero-scale", (1 - 0.02 * heroExitProgress).toFixed(3));
      root.style.setProperty("--ds-shell-scale", (0.98 + 0.02 * shellEnterProgress).toFixed(3));
    };

    const clearProgress = () => {
      root.style.removeProperty("--ds-hero-opacity");
      root.style.removeProperty("--ds-shell-opacity");
      root.style.removeProperty("--ds-hero-y");
      root.style.removeProperty("--ds-shell-y");
      root.style.removeProperty("--ds-hero-scale");
      root.style.removeProperty("--ds-shell-scale");
    };

    if (reducedMotion) {
      root.dataset.dsWorkspaceVisible = "true";
      setProgress(1);
      return () => {
        delete root.dataset.dsWorkspaceVisible;
        clearProgress();
      };
    }

    let frame = 0;

    const updateProgress = () => {
      frame = 0;

      const shellTop = shell.offsetTop;
      const start = Math.max(0, shellTop - window.innerHeight - 120);
      const end = Math.max(start + 1, shellTop - 120);
      const progress = (window.scrollY - start) / (end - start);

      const snappedProgress = progress > 0.98 ? 1 : progress < 0.02 ? 0 : progress;
      setProgress(snappedProgress);

      if (snappedProgress > 0.02) {
        root.dataset.dsWorkspaceVisible = "true";
      } else {
        delete root.dataset.dsWorkspaceVisible;
      }
    };

    const requestProgressUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
      delete root.dataset.dsWorkspaceVisible;
      clearProgress();
    };
  }, []);

  useEffect(() => {
    const updateActiveAnchor = () => {
      const hash = window.location.hash || "#getting-started";
      const slug = hash.replace(/^#/, "");
      const matchingSection = sectionForAnchor(sections, hash);
      const matchingDoc = docSectionForAnchor(sections, docs, hash);

      if (slug === "getting-started" || !slug) {
        activateGettingStarted({ updateHash: false, scroll: Boolean(window.location.hash) });
        return;
      }

      if (slug === "see-more" || slug === "where-to-go-next" || slug === "next-step" || slug === "cta") {
        activateSeeMore({ updateHash: false });
        return;
      }

      if (matchingDoc) {
        activateCatalogDoc(matchingDoc.section, matchingDoc.doc, { updateHash: false });
        return;
      }

      if (matchingSection) {
        const doc = firstDocInSection(matchingSection, docs);
        if (doc) activateCatalogDoc(matchingSection, doc, { updateHash: false });
        return;
      }

      activateGettingStarted({ updateHash: false, scroll: false });
    };

    updateActiveAnchor();
    window.addEventListener("hashchange", updateActiveAnchor);
    window.addEventListener("popstate", updateActiveAnchor);

    return () => {
      window.removeEventListener("hashchange", updateActiveAnchor);
      window.removeEventListener("popstate", updateActiveAnchor);
    };
  }, [activateCatalogDoc, activateGettingStarted, activateSeeMore, docs, sections]);

  return (
    <div className={styles.shell} ref={shellRef}>
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
          {nextStepItem ? <span className={styles.rootLink}>{nextStepItem.label}</span> : null}
        </div>

        <nav
          aria-label={toc.title}
          className={styles.nav}
          style={navWidth ? { width: navWidth } : undefined}
        >
          {gettingStartedItem ? (
            <a
              aria-current={activeWorkspace.type === "getting-started" ? "page" : undefined}
              className={`${styles.rootLink}${activeWorkspace.type === "getting-started" ? ` ${styles.active}` : ""}`}
              data-ds-toc-root="getting-started"
              href={gettingStartedItem.href}
              onClick={(event) => {
                event.preventDefault();
                activateGettingStarted();
              }}
            >
              {gettingStartedItem.label}
            </a>
          ) : null}

          <Accordion
            className={styles.categoryAccordion}
            onValueChange={(value) => {
              const nextValue = Array.isArray(value) ? value[0] : value;
              setOpenSection(nextValue ?? "");
            }}
            type="single"
            value={openSection}
          >
            {sections.map((section) => {
              const isSectionActive = activeWorkspace.type === "doc" && activeWorkspace.sectionLabel === section.label;

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
                        const isActive = activeWorkspace.type === "doc" && activeWorkspace.sectionLabel === section.label && activeWorkspace.slug === doc.slug;

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

          {nextStepItem ? (
            <a
              aria-current={activeWorkspace.type === "see-more" ? "page" : undefined}
              className={`${styles.rootLink}${activeWorkspace.type === "see-more" ? ` ${styles.active}` : ""}`}
              href={nextStepItem.href}
              onClick={(event) => {
                event.preventDefault();
                activateSeeMore();
              }}
            >
              {nextStepItem.label}
            </a>
          ) : null}
        </nav>
      </aside>

      <div className={styles.content}>
        <section className={styles.categorySection} id="design-system-workspace">
          <div className={styles.activeDoc}>
            {activeWorkspace.type === "getting-started" ? gettingStartedContent : null}
            {activeWorkspace.type === "doc" && activeCatalogDoc ? <DesignSystemDocsPage doc={activeCatalogDoc} locale={locale} /> : null}
            {activeWorkspace.type === "see-more" ? seeMoreContent : null}
          </div>
        </section>
      </div>
    </div>
  );
}
