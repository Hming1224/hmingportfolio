'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

type SplitTextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
type SplitType = 'chars' | 'words' | 'lines' | 'words, chars';
type SplitTarget = HTMLElement & {
  _rbsplitInstance?: InstanceType<typeof GSAPSplitText> | null;
};

export interface SplitTextProps {
  id?: string;
  tag?: SplitTextTag;
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: SplitType;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  resetOnLeave?: boolean;
  textAlign?: CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({
  id,
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  resetOnLeave = true,
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete,
}: SplitTextProps) {
  const ref = useRef<SplitTarget | null>(null);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(
    () => typeof document !== 'undefined' && document.fonts.status === 'loaded',
  );
  const [pageTransitionReady, setPageTransitionReady] = useState(
    () =>
      typeof document === 'undefined' ||
      !document.documentElement.dataset.aiImpactTransition ||
      Boolean(document.documentElement.dataset.aiImpactContentReady),
  );

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      return;
    }

    document.fonts.ready.then(() => {
      setFontsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (pageTransitionReady) return;

    const handleTransitionEnd = () => setPageTransitionReady(true);
    window.addEventListener('ai-impact-transition-content-ready', handleTransitionEnd, { once: true });
    return () => window.removeEventListener('ai-impact-transition-content-ready', handleTransitionEnd);
  }, [pageTransitionReady]);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded || !pageTransitionReady) {
        return;
      }

      const el = ref.current;

      if (el._rbsplitInstance) {
        el._rbsplitInstance.revert();
        el._rbsplitInstance = null;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? Number.parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === 'lines',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        onSplit: (self) => {
          const targets =
            splitType.includes('chars') && self.chars.length
              ? self.chars
              : splitType.includes('words') && self.words.length
                ? self.words
                : splitType.includes('lines') && self.lines.length
                  ? self.lines
                  : self.chars.length
                    ? self.chars
                    : self.words.length
                      ? self.words
                      : self.lines;

          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            gsap.set(targets, { ...to });
            return;
          }

          gsap.set(targets, { ...from });

          const tween = gsap.to(targets, {
            ...to,
            duration,
            ease,
            stagger: delay / 1000,
            paused: true,
            onComplete: () => {
              onCompleteRef.current?.();
            },
            willChange: 'transform, opacity',
            force3D: true,
          });

          ScrollTrigger.create({
            trigger: el,
            start,
            fastScrollEnd: true,
            anticipatePin: 0.4,
            onEnter: () => {
              tween.restart();
            },
            onEnterBack: () => {
              tween.restart();
            },
            onLeave: () => {
              if (!resetOnLeave) return;
              tween.pause(0);
              gsap.set(targets, { ...from });
            },
            onLeaveBack: () => {
              if (!resetOnLeave) return;
              tween.pause(0);
              gsap.set(targets, { ...from });
            },
          });

          return tween;
        },
      });

      el._rbsplitInstance = splitInstance;

      return () => {
        ScrollTrigger.getAll().forEach((scrollTrigger) => {
          if (scrollTrigger.trigger === el) {
            scrollTrigger.kill();
          }
        });

        splitInstance.revert();
        el._rbsplitInstance = null;
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        resetOnLeave,
        fontsLoaded,
        pageTransitionReady,
      ],
      scope: ref,
    },
  );

  const Tag = tag;

  return (
    <Tag
      id={id}
      ref={(node) => {
        ref.current = node as SplitTarget | null;
      }}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        overflow: 'hidden',
        display: 'inline-block',
        visibility: pageTransitionReady ? undefined : 'hidden',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        willChange: 'transform, opacity',
      }}
    >
      {text}
    </Tag>
  );
}
