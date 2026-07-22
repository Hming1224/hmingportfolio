'use client';
import { ListTree } from 'lucide-react';
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

interface CaseTOCViewProps {
  sections: TocSection[];
  activeId: string;
  visible?: boolean;
  ariaLabel: string;
  localScrollOnly?: boolean;
  onSectionClick?: (event: MouseEvent<HTMLAnchorElement>, id: string) => void;
}

type TocScrollLock = {
  id: string;
  fallbackId: number;
  cleanup: () => void;
};

type CaseTocScrollOptions = {
  behavior: ScrollBehavior;
  container?: HTMLElement;
  top?: number;
};

export function scrollCaseTocTarget(
  target: HTMLElement,
  { behavior, container, top }: CaseTocScrollOptions,
) {
  if (container && top !== undefined) {
    container.scrollTo({ top, behavior });
    return;
  }

  target.scrollIntoView({ behavior, block: 'start' });
}

const CaseTOCView = forwardRef<HTMLElement, CaseTOCViewProps>(function CaseTOCView(
  { sections, activeId, visible = false, ariaLabel, localScrollOnly = false, onSectionClick },
  ref,
) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (visible) return;
    const frameId = window.requestAnimationFrame(() => setMobileOpen(false));
    return () => window.cancelAnimationFrame(frameId);
  }, [visible]);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const toggle = event.currentTarget.closest('.cs-toc')?.previousElementSibling;
    const isMobileCard = mobileOpen
      && toggle instanceof HTMLElement
      && window.getComputedStyle(toggle).display !== 'none';
    if (!isMobileCard) {
      onSectionClick?.(event, id);
      return;
    }

    event.preventDefault();
    setMobileOpen(false);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.setTimeout(() => onSectionClick?.(event, id), prefersReducedMotion ? 0 : 480);
  };

  return (
    <>
      <button
        aria-expanded={mobileOpen}
        aria-label={ariaLabel}
        className={`cs-toc-mobile-toggle${visible ? ' is-visible' : ''}`}
        onClick={() => setMobileOpen((open) => !open)}
        type="button"
      >
        <ListTree aria-hidden="true" size={18} strokeWidth={2} />
        <span>{ariaLabel}</span>
      </button>
      <nav
        ref={ref}
        className={`cs-toc${visible ? ' is-visible' : ''}${mobileOpen ? ' cs-toc--mobile-open' : ''}`}
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
                data-scroll-scope={localScrollOnly ? 'nearest' : undefined}
                onClick={(event) => handleSectionClick(event, id)}
                aria-current={activeId === id ? 'true' : undefined}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
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
      const mobileOffset = Number.parseFloat(window.getComputedStyle(firstSection).scrollMarginTop);
      const navbarOffset = window.matchMedia('(max-width: 900px)').matches && Number.isFinite(mobileOffset)
        ? mobileOffset
        : 96;
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
    scrollCaseTocTarget(target, {
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <CaseTOCView
      ref={navRef}
      sections={sections}
      activeId={resolvedActiveId}
      visible={resolvedVisible}
      ariaLabel={locale === 'en' ? 'Table of contents' : '頁內目錄'}
      localScrollOnly={Boolean(onNavigate)}
      onSectionClick={handleClick}
    />
  );
}
