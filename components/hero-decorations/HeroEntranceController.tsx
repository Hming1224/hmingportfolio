'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroEntranceController() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>('.hero');
    if (!section) return;

    const getDecos = () =>
      Array.from(section.querySelectorAll<HTMLElement>('.hero-decoration'));

    const freeze = () => {
      getDecos().forEach(el => {
        el.style.animation = 'none';
        el.style.opacity = '0';
      });
    };

    const replay = () => {
      // Force synchronous reflow while "none" state is committed,
      // then remove inline overrides so CSS animations restart from scratch.
      void section.offsetHeight;
      getDecos().forEach(el => {
        el.style.animation = '';
        el.style.opacity = '';
      });
    };

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 85%',
      end: 'bottom top',
      onEnter: replay,
      onEnterBack: replay,
      onLeave: freeze,
      onLeaveBack: freeze,
    });

    return () => st.kill();
  }, []);

  return null;
}
