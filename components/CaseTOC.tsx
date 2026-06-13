'use client';
import { useLocale } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import type { Locale } from '../i18n/routing';

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

  // 只在第一個內容 section 真的進入視窗後淡入；避免 hero 還在首屏時 TOC 提早出現。
  useEffect(() => {
    const region = navRef.current?.closest('.cs-toc-layout');
    const firstSection = document.getElementById(sections[0]?.id ?? '');
    if (!region || !firstSection) return;

    const firstObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
        else setVisible(window.scrollY > firstSection.offsetTop);
      },
      { rootMargin: '-12% 0px -12% 0px', threshold: 0 }
    );
    const regionObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setVisible(false);
      },
      { rootMargin: '0px 0px -128px 0px', threshold: 0 }
    );

    firstObserver.observe(firstSection);
    regionObserver.observe(region);
    return () => {
      firstObserver.disconnect();
      regionObserver.disconnect();
    };
  }, [sections]);

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
      aria-label={locale === 'en' ? 'Table of contents' : '頁內目錄'}
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
