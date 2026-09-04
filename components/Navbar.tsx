'use client';

import { useLocale, useTranslations } from 'next-intl';
import { type MouseEvent, useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useRouter } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { getLastCaseAttribution, sendAnalyticsEvent } from '@/lib/analytics';
import { runAiImpactTransition } from './ai-impact/AiImpactViewTransition';
import AnimatedLogo from './AnimatedLogo';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar({
  variant = 'default',
  onBack,
}: {
  variant?: 'default' | 'aiImpact';
  onBack?: () => void;
}) {
  const t = useTranslations('nav');
  const aiT = useTranslations('aiImpact');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const openRef = useRef(false);
  const lastScrollY = useRef(0);
  const accumulatedDelta = useRef(0);
  const navHidden = useRef(false);
  const stopTimer = useRef<number | null>(null);

  function navigateFromAiImpact(
    event: MouseEvent<HTMLAnchorElement>,
    href: '/#projects' | '/about-me' | '/design-system' | '/contact',
    readySelector: string,
    scrollTarget?: string,
  ) {
    setOpen(false);
    if (
      variant !== 'aiImpact' ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    void runAiImpactTransition({
      anchor: event.currentTarget,
      direction: 'leave',
      navigate: () => router.push(href === '/#projects' ? '/' : href),
      readySelector,
      scrollTarget,
    });
  }

  function setNavHidden(nextHidden: boolean) {
    if (navHidden.current === nextHidden) {
      return;
    }

    navHidden.current = nextHidden;
    navRef.current?.classList.toggle('is-hidden', nextHidden);
    document.documentElement.dataset.navHidden = nextHidden ? 'true' : 'false';
  }

  useEffect(() => {
    openRef.current = open;
    if (open) {
      setNavHidden(false);
    }
  }, [open]);

  useEffect(() => {
    document.documentElement.dataset.navHidden = 'false';
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (stopTimer.current) {
        window.clearTimeout(stopTimer.current);
      }

      if (currentScrollY <= 8 || openRef.current) {
        accumulatedDelta.current = 0;
        setNavHidden(false);
      } else if (delta !== 0) {
        const sameDirection =
          Math.sign(delta) === Math.sign(accumulatedDelta.current) || accumulatedDelta.current === 0;

        accumulatedDelta.current = sameDirection ? accumulatedDelta.current + delta : delta;

        if (accumulatedDelta.current > 10) {
          setNavHidden(true);
        } else if (accumulatedDelta.current < -6) {
          setNavHidden(false);
        }
      }

      stopTimer.current = window.setTimeout(() => {
        accumulatedDelta.current = 0;
        setNavHidden(false);
      }, 260);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (stopTimer.current) {
        window.clearTimeout(stopTimer.current);
      }
      delete document.documentElement.dataset.navHidden;
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`site-nav${variant === 'aiImpact' ? ' site-nav--ai-impact' : ''} ${open ? 'is-open' : ''}`}
      aria-label={t('ariaLabel')}
    >
      <div className="nav-top">
        {variant === 'aiImpact' ? (
          <button
            className="ai-impact-back"
            type="button"
            onClick={(event) => {
              if (onBack) {
                onBack();
                return;
              }
              void runAiImpactTransition({
                anchor: event.currentTarget,
                direction: 'leave',
                navigate: () => router.push('/'),
                readySelector: '.hero:not(.ai-impact-hero)',
              });
            }}
          >
            <span aria-hidden="true">←</span>
            {aiT('back')}
          </button>
        ) : (
          <Link href="/" prefetch={false} className="brand" aria-label="Brian Huang home">
            <AnimatedLogo />
          </Link>
        )}
        <button
          className="menu-button"
          type="button"
          aria-label={open ? t('closeMenu') : t('openMenu')}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className="nav-links">
        <Link
          href="/#projects"
          prefetch={false}
          onClick={(event) => navigateFromAiImpact(event, '/#projects', '#projects', '#projects')}
        >
          {t('projects')}
        </Link>
        <Link
          href="/about-me"
          onClick={(event) => navigateFromAiImpact(event, '/about-me', '.about-page')}
        >
          {t('about')}
        </Link>
        <Link
          href="/design-system"
          onClick={(event) => navigateFromAiImpact(event, '/design-system', '#ds-title')}
        >
          {t('designSystem')}
        </Link>
        <Link
          href="/contact"
          onClick={(event) => navigateFromAiImpact(event, '/contact', '#contact')}
        >
          {t('contact')}
        </Link>
        <a
          href={t('resumeHref')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            sendAnalyticsEvent("resume_click", {
              href: t('resumeHref'),
              locale,
              ...getLastCaseAttribution(),
            });
            setOpen(false);
          }}
        >
          {t('resume')}
        </a>
        <LanguageSwitcher variant={variant} />
      </div>
      <div className="nav-line" />
    </nav>
  );
}
