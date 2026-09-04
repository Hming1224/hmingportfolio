'use client';

import Image from 'next/image';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';

export type OutcomeItem = {
  type: string;
  title: string;
  body: string;
  stages: string[];
  skills: string[];
  proof: string;
  image: string;
  imageAlt: string;
};

type OutcomeDepthCarouselProps = {
  items: OutcomeItem[];
  labels: {
    carousel: string;
    previous: string;
    next: string;
    stages: string;
    skills: string;
  };
};

type DragState = {
  x: number;
  startPos: number;
  lastX: number;
  lastT: number;
  velocity: number;
  moved: boolean;
  pointerId: number;
};

const CARD_WIDTH = 576;
const CARD_HEIGHT = 440;
const DEPTH = 240;
const STACK_GAP = 22;
const TILT = 5;
const PERSPECTIVE = 1800;
const VISIBLE_CARDS = 3;
const FALLOFF = 0.2;
const BLUR = 6;
const DURATION = 0.7;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function OutcomeDepthCarousel({ items, labels }: OutcomeDepthCarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const tintRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const positionRef = useRef(0);
  const focusRef = useRef(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const scaleRef = useRef(1);
  const dragRef = useRef<DragState | null>(null);
  const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotionRef = useRef(false);
  const [active, setActive] = useState(0);

  const layout = useCallback((position: number) => {
    const count = items.length;
    if (!count) return;

    for (let index = 0; index < count; index += 1) {
      const card = cardRefs.current[index];
      if (!card) continue;

      let distance = index - position;
      if (count > 1) {
        distance = ((distance % count) + count) % count;
        if (distance > count / 2) distance -= count;
      }

      const back = Math.max(0, distance);
      const absoluteDistance = Math.abs(distance);
      const shown = absoluteDistance <= VISIBLE_CARDS + 0.5;
      const translateZ = -DEPTH * distance;
      const rotateY = TILT * clamp(distance, 0, 1);
      const perspectiveScale = PERSPECTIVE / (PERSPECTIVE + DEPTH * Math.max(0, distance));
      const rotatedHalfWidth = (CARD_WIDTH / 2) * Math.cos((rotateY * Math.PI) / 180);
      const translateX = distance > 0
        ? (CARD_WIDTH / 2 + STACK_GAP * distance) / perspectiveScale - rotatedHalfWidth
        : STACK_GAP * distance;
      let opacity = distance < 0 ? Math.max(0, 1 + distance) : 1;
      if (!shown) opacity = 0;

      const brightness = Math.max(0.15, 1 - back * FALLOFF);
      const blur = Math.min(BLUR, (back / Math.max(1, VISIBLE_CARDS)) * BLUR);

      card.style.transform = `translate(-50%, -50%) scale(${scaleRef.current}) translateX(${translateX.toFixed(2)}px) translateZ(${translateZ.toFixed(2)}px) rotateY(${rotateY.toFixed(3)}deg)`;
      card.style.opacity = opacity.toFixed(3);
      card.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blur.toFixed(2)}px)`;
      card.style.zIndex = String(Math.round(2000 - distance * 20));
      card.style.pointerEvents = shown && opacity > 0.05 ? 'auto' : 'none';

      const tint = tintRefs.current[index];
      if (tint) tint.style.opacity = clamp(back * FALLOFF * 1.25, 0, 0.86).toFixed(3);
    }
  }, [items.length]);

  const tweenTo = useCallback((target: number, animate = true) => {
    tweenRef.current?.kill();
    const proxy = { position: positionRef.current };
    tweenRef.current = gsap.to(proxy, {
      position: target,
      duration: animate && !reducedMotionRef.current ? DURATION : 0,
      ease: 'power3.out',
      onUpdate: () => {
        positionRef.current = proxy.position;
        layout(proxy.position);
      },
      onComplete: () => {
        if (items.length > 0) {
          positionRef.current = ((positionRef.current % items.length) + items.length) % items.length;
        }
        layout(positionRef.current);
      },
    });
  }, [items.length, layout]);

  const setFocus = useCallback((rawIndex: number, animate = true) => {
    const count = items.length;
    if (!count) return;
    const index = ((rawIndex % count) + count) % count;
    let delta = index - positionRef.current;
    if (count > 1) {
      delta = ((delta % count) + count) % count;
      if (delta > count / 2) delta -= count;
    }
    tweenTo(positionRef.current + delta, animate);
    if (index !== focusRef.current) {
      focusRef.current = index;
      setActive(index);
    }
  }, [items.length, tweenTo]);

  const navigateBy = useCallback((step: number) => {
    setFocus(focusRef.current + step, true);
  }, [setFocus]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new ResizeObserver(([entry]) => {
      const neededWidth = CARD_WIDTH + STACK_GAP * VISIBLE_CARDS + 80;
      const minimumScale = entry.contentRect.width < 600 ? 0.58 : 0.4;
      scaleRef.current = clamp(entry.contentRect.width / neededWidth, minimumScale, 1);
      layout(positionRef.current);
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, [layout]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const onWheel = (event: WheelEvent) => {
      if (items.length < 2) return;
      event.preventDefault();
      tweenRef.current?.kill();
      const raw = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      const delta = event.deltaMode === 1 ? raw * 24 : raw;
      positionRef.current += clamp(delta / (CARD_WIDTH * 0.9), -0.6, 0.6);
      layout(positionRef.current);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = setTimeout(() => setFocus(Math.round(positionRef.current), true), 130);
    };
    root.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      root.removeEventListener('wheel', onWheel);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    };
  }, [items.length, layout, setFocus]);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    layout(positionRef.current);
    return () => {
      tweenRef.current?.kill();
    };
  }, [layout]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (items.length < 2) return;
    tweenRef.current?.kill();
    dragRef.current = {
      x: event.clientX,
      startPos: positionRef.current,
      lastX: event.clientX,
      lastT: performance.now(),
      velocity: 0,
      moved: false,
      pointerId: event.pointerId,
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const stepWidth = Math.max(CARD_WIDTH * 0.55 * scaleRef.current, 40);
    const deltaX = event.clientX - drag.x;
    if (!drag.moved && Math.abs(deltaX) > 4) {
      drag.moved = true;
      rootRef.current?.setPointerCapture(drag.pointerId);
    }
    if (!drag.moved) return;
    const now = performance.now();
    drag.velocity = (event.clientX - drag.lastX) / Math.max(now - drag.lastT, 1);
    drag.lastX = event.clientX;
    drag.lastT = now;
    positionRef.current = drag.startPos - deltaX / stepWidth;
    layout(positionRef.current);
  };

  const handlePointerEnd = () => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    if (!drag.moved) return;
    const stepWidth = Math.max(CARD_WIDTH * 0.55 * scaleRef.current, 40);
    const projected = positionRef.current - (drag.velocity * 180) / stepWidth;
    setFocus(Math.round(projected), true);
  };

  return (
    <div
      ref={rootRef}
      className="ai-impact-outcomes"
      style={{ '--outcome-perspective': `${PERSPECTIVE}px` } as CSSProperties}
      role="group"
      aria-roledescription="carousel"
      aria-label={labels.carousel}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          navigateBy(-1);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          navigateBy(1);
        }
      }}
    >
      <div className="ai-impact-outcomes__stage">
        {items.map((item, index) => (
          <article
            className={`ai-impact-outcomes__card${active === index ? ' is-active' : ''}`}
            key={item.title}
            ref={(element) => { cardRefs.current[index] = element; }}
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${items.length}`}
            aria-hidden={active !== index}
            tabIndex={active === index ? 0 : -1}
            style={{ width: CARD_WIDTH, height: CARD_HEIGHT, borderRadius: 18 }}
            onClick={() => {
              if (!dragRef.current?.moved) setFocus(index, true);
            }}
          >
            <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 768px) 85vw, 576px" priority={index === 0} draggable={false} />
            <span
              className="ai-impact-outcomes__tint"
              ref={(element) => { tintRefs.current[index] = element; }}
              aria-hidden="true"
            />
            <div className="ai-impact-outcomes__shade" aria-hidden="true" />
            <div className="ai-impact-outcomes__content">
              <p className="ai-impact-outcomes__type">{item.type}</p>
              <h3>{item.title}</h3>
              <div className="ai-impact-outcomes__details">
                <div className="ai-impact-outcomes__badge-row">
                  <span>{labels.stages}</span>
                  <div>{item.stages.map((stage) => <b key={stage}>{stage}</b>)}</div>
                </div>
                <div className="ai-impact-outcomes__badge-row">
                  <span>{labels.skills}</span>
                  <div>{item.skills.map((skill) => <b key={skill}>{skill}</b>)}</div>
                </div>
              </div>
            </div>
            <span className="sr-only">{item.body} {item.proof}</span>
          </article>
        ))}
      </div>

      <button className="ai-impact-outcomes__arrow ai-impact-outcomes__arrow--prev" type="button" onClick={() => navigateBy(-1)} aria-label={labels.previous}>
        <ChevronLeft aria-hidden="true" size={20} />
      </button>
      <button className="ai-impact-outcomes__arrow ai-impact-outcomes__arrow--next" type="button" onClick={() => navigateBy(1)} aria-label={labels.next}>
        <ChevronRight aria-hidden="true" size={20} />
      </button>

      <div className="ai-impact-outcomes__dots" role="tablist" aria-label={labels.carousel}>
        {items.map((item, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-label={item.title}
            className={active === index ? 'is-active' : ''}
            key={item.title}
            onClick={() => setFocus(index, true)}
          />
        ))}
      </div>
    </div>
  );
}
