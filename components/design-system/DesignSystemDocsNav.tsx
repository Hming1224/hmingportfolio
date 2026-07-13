"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import type { DesignSystemDocKind, DesignSystemLocale } from "@/lib/design-system-docs";
import {
  designSystemDocs,
  getDesignSystemHref,
} from "@/lib/design-system-docs";
import { designSystemSections } from "@/lib/design-system-data";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from "@/components/ui/Accordion";

function localized(locale: DesignSystemLocale, english: string, chinese: string) {
  return locale === "en" ? english : chinese;
}

function sectionValue(section: { label: string }) {
  return section.label.toLowerCase().replace(/\s+/g, "-");
}

function DocsAccordionNav({
  currentKind,
  currentSlug,
  locale,
}: {
  currentKind: DesignSystemDocKind;
  currentSlug: string;
  locale: DesignSystemLocale;
}) {
  const currentSection = useMemo(() => {
    const section = designSystemSections.find((candidate) =>
      candidate.items.some((item) => item.kind === currentKind && item.slug === currentSlug),
    );
    return section ? sectionValue(section) : sectionValue(designSystemSections[0]);
  }, [currentKind, currentSlug]);

  return (
    <Accordion style={{ width: "100%" }} defaultValue={currentSection} type="multiple">
      {designSystemSections.map((section) => (
        <AccordionItem key={section.label} value={sectionValue(section)}>
          <AccordionHeader>{localized(locale, section.label, section.labelZh)}</AccordionHeader>
          <AccordionPanel>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", margin: "4px 0", borderLeft: "1px solid var(--hm-line-strong)", marginLeft: "12px", paddingLeft: "12px" }}>
              {section.items.map((item) => {
                const target = designSystemDocs.find(
                  (candidate) => candidate.kind === item.kind && candidate.slug === item.slug,
                );
                if (!target) return null;
                const active = target.kind === currentKind && target.slug === currentSlug;
                return (
                  <Link
                    aria-current={active ? "page" : undefined}
                    className={active ? "is-active" : undefined}
                    href={getDesignSystemHref(target.kind, target.slug)}
                    key={`${target.kind}-${target.slug}`}
                  >
                    {localized(locale, target.title, target.titleZh)}
                  </Link>
                );
              })}
            </div>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function DesignSystemDocsMobileNav({
  currentKind,
  currentSlug,
  locale,
}: {
  currentKind: DesignSystemDocKind;
  currentSlug: string;
  locale: DesignSystemLocale;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginBottom: "var(--hm-space-md)" }}>
      <button aria-expanded={open} onClick={() => setOpen((current) => !current)} type="button">
        {localized(locale, "Browse docs", "瀏覽文件")}
      </button>
      {open ? (
        <nav aria-label={localized(locale, "Design system documentation", "設計系統文件")}>
          <DocsAccordionNav currentKind={currentKind} currentSlug={currentSlug} locale={locale} />
        </nav>
      ) : null}
    </div>
  );
}

export function DesignSystemDocsSidebar({
  currentKind,
  currentSlug,
  locale,
}: {
  currentKind: DesignSystemDocKind;
  currentSlug: string;
  locale: DesignSystemLocale;
}) {
  return (
    <nav aria-label={localized(locale, "Design system documentation", "設計系統文件")}>
      <DocsAccordionNav currentKind={currentKind} currentSlug={currentSlug} locale={locale} />
    </nav>
  );
}
