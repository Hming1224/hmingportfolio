'use client';
import { useLocale } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import type { Locale } from '../i18n/routing';
import { translateAdvantech } from '../app/advantech/i18n';

export interface TocSection {
  id: string;
  title: string;
}

interface CaseTOCProps {
  sections: TocSection[];
}

export default function CaseTOC({ sections }: CaseTOCProps) {
  const locale = useLocale() as Locale;
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');
  const [visible, setVisible] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const ignoreNextRef = useRef(false);

  // 只在「內容區段」(.cs-toc-layout) 進入視窗時淡入；hero / footer 區淡出
  useEffect(() => {
    const region = navRef.current?.closest('.cs-toc-layout');
    if (!region) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '-12% 0px -12% 0px', threshold: 0 }
    );
    observer.observe(region);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (ignoreNextRef.current) return;
        // Pick the topmost intersecting entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-8% 0px -82% 0px', threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    setActiveId(id);
    ignoreNextRef.current = true;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Resume observer after scroll settles
    setTimeout(() => { ignoreNextRef.current = false; }, 1000);
  };

  return (
    <nav
      ref={navRef}
      className={`cs-toc${visible ? ' is-visible' : ''}`}
      aria-label={translateAdvantech(locale, "頁內目錄")}
    >
      <ul className="cs-toc-list">
        {sections.map(({ id, title }) => (
          <li
            key={id}
            className={`cs-toc-item${activeId === id ? ' cs-toc-item--active' : ''}`}
          >
            <a
              href={`#${id}`}
              className="cs-toc-link"
              onClick={(e) => handleClick(e, id)}
              aria-current={activeId === id ? 'true' : undefined}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
