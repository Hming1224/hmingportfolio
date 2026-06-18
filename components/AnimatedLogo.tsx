'use client';

import lottie, { type AnimationItem } from 'lottie-web';
import { useEffect, useRef } from 'react';
import animationData from './brandLogoAnim.json';

// The logo reveal animation lives on a 1200x556 artboard; the actual "BH" glyphs
// sit inset ~6px. The outer wrapper keeps the original 67x24 footprint so the
// navbar layout doesn't shift, while the inner canvas is scaled up and nudged so
// the glyphs line up exactly where the static logo used to be.
export default function AnimatedLogo() {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const animRef = useRef<AnimationItem | null>(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const anim = lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: animationData as object,
    });
    animRef.current = anim;

    const showFinal = () => anim.goToAndStop(Math.max(anim.totalFrames - 1, 0), true);
    anim.addEventListener('DOMLoaded', showFinal);

    return () => {
      anim.removeEventListener('DOMLoaded', showFinal);
      anim.destroy();
      animRef.current = null;
    };
  }, []);

  const showFinal = () => {
    const anim = animRef.current;
    anim?.goToAndStop(Math.max(anim.totalFrames - 1, 0), true);
  };

  const playOnce = () => {
    if (reducedRef.current) {
      return;
    }
    animRef.current?.goToAndPlay(0, true);
  };

  const playLoop = () => {
    if (reducedRef.current) {
      return;
    }
    const anim = animRef.current;
    if (!anim) {
      return;
    }
    anim.loop = true;
    anim.goToAndPlay(0, true);
  };

  const stopLoop = () => {
    const anim = animRef.current;
    if (!anim) {
      return;
    }
    anim.loop = false;
    showFinal();
  };

  return (
    <span
      className="brand-logo-anim"
      onPointerEnter={playLoop}
      onPointerLeave={stopLoop}
      onPointerDown={playOnce}
      onFocus={playLoop}
      onBlur={stopLoop}
      onClick={playOnce}
      aria-hidden="true"
    >
      <span ref={containerRef} className="brand-logo-anim__canvas" />
    </span>
  );
}
