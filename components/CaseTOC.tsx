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

  // 第一個內容 section 到達 navbar 下緣後才淡入；避免 hero / section 預覽露出時 TOC 太早出現。
  useEffect(() => {
    const region = navRef.current?.closest('.cs-toc-layout');
    const firstSection = document.getElementById(sections[0]?.id ?? '');
    if (!region || !firstSection) return;

    const updateVisibility = () => {
      const firstTop = firstSection.getBoundingClientRect().top;
      const regionBottom = region.getBoundingClientRect().bottom;
      const navbarOffset = 96;
      setVisible(firstTop <= navbarOffset && regionBottom >= 128);
    };

    updateVisibility();
    const rafId = window.requestAnimationFrame(updateVisibility);
    const timeoutId = window.setTimeout(updateVisibility, 250);
    const lateTimeoutId = window.setTimeout(updateVisibility, 800);
    const settledTimeoutId = window.setTimeout(updateVisibility, 1600);
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    window.addEventListener('hashchange', updateVisibility);
    window.addEventListener('load', updateVisibility);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      window.clearTimeout(lateTimeoutId);
      window.clearTimeout(settledTimeoutId);
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
      window.removeEventListener('hashchange', updateVisibility);
      window.removeEventListener('load', updateVisibility);
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
