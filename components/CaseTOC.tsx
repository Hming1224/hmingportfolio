'use client';
import { useLocale } from 'next-intl';
import { forwardRef, useEffect, useRef, useState, type MouseEvent } from 'react';
import type { Locale } from '../i18n/routing';

export interface TocSection {
  id: string;
  title: string;
}

interface CaseTOCProps {
  sections: TocSection[];
  activeSectionId?: string;
  visible?: boolean;
  onNavigate?: (id: string) => void;
}

export interface CaseTOCViewProps {
  sections: TocSection[];
  activeId: string;
  visible?: boolean;
  ariaLabel: string;
  onSectionClick?: (event: MouseEvent<HTMLAnchorElement>, id: string) => void;
}

type TocScrollLock = {
  id: string;
  fallbackId: number;
  cleanup: () => void;
};

export const CaseTOCView = forwardRef<HTMLElement, CaseTOCViewProps>(function CaseTOCView(
  { sections, activeId, visible = false, ariaLabel, onSectionClick },
  ref,
) {
  return (
    <nav
      ref={ref}
      className={`cs-toc${visible ? ' is-visible' : ''}`}
      aria-label={ariaLabel}
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
              onClick={(event) => onSectionClick?.(event, id)}
              aria-current={activeId === id ? 'true' : undefined}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default function CaseTOC({
  sections,
  activeSectionId,
  visible: visibleOverride,
  onNavigate,
}: CaseTOCProps) {
  const locale = useLocale() as Locale;
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');
  const [visible, setVisible] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const scrollLockRef = useRef<TocScrollLock | null>(null);
  const resolvedActiveId = activeSectionId ?? activeId;
  const resolvedVisible = visibleOverride ?? visible;

  const clearScrollLock = () => {
    const lock = scrollLockRef.current;
    if (!lock) return;
    window.clearTimeout(lock.fallbackId);
    lock.cleanup();
    scrollLockRef.current = null;
  };

  // 第一個內容 section 到達 navbar 下緣後才淡入；避免 hero / section 預覽露出時 TOC 太早出現。
  useEffect(() => {
    if (visibleOverride !== undefined) return;

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
  }, [sections, visibleOverride]);

  useEffect(() => {
    if (activeSectionId !== undefined) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollLockRef.current) return;
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
  }, [sections, activeSectionId]);

  useEffect(() => clearScrollLock, []);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (onNavigate) {
      clearScrollLock();
      setActiveId(id);
      onNavigate(id);
      return;
    }

    const target = document.getElementById(id);
    if (!target) return;

    clearScrollLock();
    setActiveId(id);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const releaseLock = () => {
      const lock = scrollLockRef.current;
      if (!lock || lock.id !== id) return;
      clearScrollLock();
      setActiveId(id);
    };
    const handleScrollEnd = () => releaseLock();
    const distance = Math.abs(target.getBoundingClientRect().top);
    const fallbackMs = prefersReducedMotion ? 250 : Math.min(4200, Math.max(1400, distance * 0.9));
    const fallbackId = window.setTimeout(releaseLock, fallbackMs);

    scrollLockRef.current = {
      id,
      fallbackId,
      cleanup: () => window.removeEventListener('scrollend', handleScrollEnd),
    };

    window.addEventListener('scrollend', handleScrollEnd, { once: true });
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <CaseTOCView
      ref={navRef}
      sections={sections}
      activeId={resolvedActiveId}
      visible={resolvedVisible}
      ariaLabel={locale === 'en' ? 'Table of contents' : '頁內目錄'}
      onSectionClick={handleClick}
    />
  );
}
