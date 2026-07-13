'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroEntranceController() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>('.hero');
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const getDecos = () =>
      Array.from(section.querySelectorAll<HTMLElement>('.hero-decoration'));

    const getRollInContent = () =>
      Array.from(section.querySelectorAll<HTMLElement>('[data-hero-roll-in]'));

    const freezeRollInContent = () => {
      const content = getRollInContent();

      gsap.killTweensOf(content);

      if (prefersReducedMotion) {
        gsap.set(content, { opacity: 1, scale: 1, visibility: 'visible', y: 0 });
        return;
      }

      gsap.set(content, {
        opacity: 0,
        scale: 0.96,
        transformOrigin: 'center center',
        visibility: 'visible',
        y: 120,
      });
    };

    const replayRollInContent = () => {
      const content = getRollInContent();

      if (prefersReducedMotion) {
        gsap.set(content, { opacity: 1, scale: 1, visibility: 'visible', y: 0 });
        return;
      }

      gsap.killTweensOf(content);
      gsap.set(content, { opacity: 0, scale: 0.96, visibility: 'visible', y: 120 });
      gsap.to(content, {
        delay: 0,
        duration: 0.95,
        ease: 'power3.out',
        opacity: 1,
        overwrite: true,
        scale: 1,
        stagger: 0.12,
        y: 0,
      });
    };

    const freeze = () => {
      getDecos().forEach(el => {
        el.style.animation = 'none';
        el.style.opacity = '0';
      });
      freezeRollInContent();
    };

    const replay = () => {
      // Force synchronous reflow while "none" state is committed,
      // then remove inline overrides so CSS animations restart from scratch.
      void section.offsetHeight;
      getDecos().forEach(el => {
        el.style.animation = '';
        el.style.opacity = '';
      });
      replayRollInContent();
    };

    freezeRollInContent();

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 85%',
      end: 'bottom top',
      onEnter: replay,
      onEnterBack: replay,
      onLeave: freeze,
      onLeaveBack: freeze,
    });

    return () => {
      st.kill();
      gsap.killTweensOf(getRollInContent());
    };
  }, []);

  return null;
}
