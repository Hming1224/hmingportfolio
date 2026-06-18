'use client';

import { sendGAEvent } from '@next/third-parties/google';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/navigation';
import AnimatedLogo from './AnimatedLogo';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const openRef = useRef(false);
  const lastScrollY = useRef(0);
  const accumulatedDelta = useRef(0);
  const navHidden = useRef(false);
  const stopTimer = useRef<number | null>(null);

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
    <nav ref={navRef} className={`site-nav ${open ? 'is-open' : ''}`} aria-label={t('ariaLabel')}>
      <div className="nav-top">
        <Link href="/" prefetch={false} className="brand" aria-label="Brian Huang home">
          <AnimatedLogo />
        </Link>
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
        <Link href="/#projects" prefetch={false} onClick={() => setOpen(false)}>
          {t('projects')}
        </Link>
        <Link href="/about-me" onClick={() => setOpen(false)}>
          {t('about')}
        </Link>
        <Link href="/contact" onClick={() => setOpen(false)}>
          {t('contact')}
        </Link>
        <a
          href={t('resumeHref')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            sendGAEvent("event", "resume_click", { href: t('resumeHref') });
            setOpen(false);
          }}
        >
          {t('resume')}
        </a>
        <LanguageSwitcher />
      </div>
      <div className="nav-line" />
    </nav>
  );
}
