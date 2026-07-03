"use client";

import { useEffect, useState, type ReactNode } from "react";
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
  const ctaItem = toc.items.find((item) => item.href === "#cta") ?? toc.items[toc.items.length - 1];
  const gettingStartedItem = toc.items[0];

  useEffect(() => {
    const updateActiveAnchor = () => {
      setActiveAnchor(window.location.hash || "#getting-started");
    };

    updateActiveAnchor();
    window.addEventListener("hashchange", updateActiveAnchor);

    return () => {
      window.removeEventListener("hashchange", updateActiveAnchor);
    };
  }, []);

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

          {sections.map((section) => {
            const href = `#${sectionId(section)}`;
            const isActive = activeAnchor === href;

            return (
              <a
                aria-current={isActive ? "page" : undefined}
                className={`${styles.rootLink}${isActive ? ` ${styles.active}` : ""}`}
                href={href}
                key={section.label}
                onClick={() => setActiveAnchor(href)}
              >
                {localized(locale, section.label, section.labelZh)}
              </a>
            );
          })}

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
              <header className={styles.categoryHeader}>
                <p className={styles.eyebrow}>{localized(locale, "Documentation section", "文件分類")}</p>
                <h2 className={styles.categoryTitle}>{localized(locale, section.label, section.labelZh)}</h2>
              </header>
              <div className={styles.sectionSwitcher} aria-label={localized(locale, `${section.label} entries`, `${localized(locale, section.label, section.labelZh)}條目`)}>
                {section.items.map((item) => {
                  const doc = docs.find((candidate) => candidate.slug === item.slug && candidate.kind === item.kind);
                  if (!doc) return null;
                  const isActive = activeSlug === doc.slug;

                  return (
                    <button
                      aria-pressed={isActive}
                      className={`${styles.switcherButton}${isActive ? ` ${styles.active}` : ""}`}
                      key={`${doc.kind}-${doc.slug}`}
                      onClick={() => {
                        setActiveAnchor(`#${id}`);
                        setActiveSlugs((current) => ({ ...current, [section.label]: doc.slug }));
                        window.history.replaceState(null, "", `#${id}`);
                      }}
                      type="button"
                    >
                      {localized(locale, doc.title, doc.titleZh)}
                    </button>
                  );
                })}
              </div>
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
