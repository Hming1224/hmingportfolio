'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
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
    <nav ref={navRef} className={`site-nav ${open ? 'is-open' : ''}`} aria-label="主要導覽">
      <div className="nav-top">
        <Link href="/" className="brand" aria-label="Brian Huang home">
          <Image
            src="/brand-logo.svg"
            alt="Brian Huang"
            width={67}
            height={24}
            priority
            sizes="67px"
          />
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? '關閉選單' : '開啟選單'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className="nav-links">
        <Link href="/#projects" onClick={() => setOpen(false)}>
          設計案例
        </Link>
        <Link href="/about-me" onClick={() => setOpen(false)}>
          關於我
        </Link>
        <Link href="/contact" onClick={() => setOpen(false)}>
          聯絡資訊
        </Link>
        <a
          href="/Brian_Huang_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
        >
          下載履歷
        </a>
      </div>
      <div className="nav-line" />
    </nav>
  );
}
