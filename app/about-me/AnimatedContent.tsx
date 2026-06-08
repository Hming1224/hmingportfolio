"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Generates a curved clip-path polygon simulating the macOS Genie effect.
 *
 * @param leftTop The X coordinate of the top-left vertex (0 to 100)
 * @param rightTop The X coordinate of the top-right vertex (0 to 100)
 * @param leftBottom The X coordinate of the bottom-left vertex (0 to 100)
 * @param rightBottom The X coordinate of the bottom-right vertex (0 to 100)
 * @param steps The number of subdivision steps for the curve
 */
function getGenieAuthorClipPath(t: number, steps = 20): string {
  const points: string[] = [];

  const ease = (val: number) => {
    return val < 0.5 ? 2 * val * val : 1 - Math.pow(-2 * val + 2, 2) / 2;
  };

  // fraction is the minimizing progress (from 1 to 0)
  const fraction = 1 - t;
  const slideProgress = Math.min(1, Math.max(0, fraction / 0.5));
  const translateProgress = Math.min(1, Math.max(0, (fraction - 0.4) / 0.6));

  const translation = translateProgress * 100;
  const topEdgeVerticalPosition = 100;
  const bottomEdgeVerticalPosition = translation;

  const leftBezierTopX = 50 * slideProgress;

  // 1. Right edge: from top (y = 0%) to bottom (y = 100%)
  for (let i = 0; i <= steps; i++) {
    const p = i / steps; // relative position along the window height (0 at top, 1 at bottom)
    const y_val = topEdgeVerticalPosition * p + bottomEdgeVerticalPosition * (1 - p);
    
    const progress_y = y_val / 100;
    const ease_y = ease(progress_y);
    const rightX = 100 - ease_y * leftBezierTopX;
    
    // Fast rounding to 1 decimal place to avoid heavy toFixed() formatting
    const rx = Math.round(rightX * 10) / 10;
    const y = Math.round(y_val * 10) / 10;
    points.push(`${rx}% ${y}%`);
  }

  // 2. Left edge: from bottom (y = 100%) back to top (y = 0%)
  for (let i = steps; i >= 0; i--) {
    const p = i / steps;
    const y_val = topEdgeVerticalPosition * p + bottomEdgeVerticalPosition * (1 - p);
    
    const progress_y = y_val / 100;
    const ease_y = ease(progress_y);
    const leftX = ease_y * leftBezierTopX;
    
    const lx = Math.round(leftX * 10) / 10;
    const y = Math.round(y_val * 10) / 10;
    points.push(`${lx}% ${y}%`);
  }

  return `polygon(${points.join(", ")})`;
}

type AnimatedContentProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "horizontal" | "vertical";
  distance?: number;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  reverse?: boolean;
  scale?: number;
  threshold?: number;
  animationType?: "default" | "genie";
};

export default function AnimatedContent({
  children,
  className = "",
  delay = 0,
  direction = "vertical",
  distance = 100,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  reverse = false,
  scale = 1,
  threshold = 0.1,
  animationType = "default",
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, visibility: "visible" });
      return;
    }

    const startPct = (1 - threshold) * 100;

    if (animationType === "genie") {
      const state = { progress: 0 };
      const targetEl = el.querySelector(".about-window") as HTMLElement | null;

      const updateClipPath = () => {
        const target = targetEl || el;
        target.style.clipPath = getGenieAuthorClipPath(
          state.progress,
          20 // 20 steps = 42 vertices, perfectly smooth
        );
      };

      if (targetEl) {
        // 陰影改掛在內層卡片上，動畫期間先設透明（且會被 clip-path 裁掉 → 零重繪成本），
        // 結束後再淡入補回。避免外層 drop-shadow 跟著變形輪廓逐幀重算造成卡頓。
        gsap.set(targetEl, {
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0)",
        });
      }

      gsap.set(el, {
        transformOrigin: "bottom center",
        y: distance, // Slide-up starting offset
        scale: scale, // Scale-up starting scale
        opacity: 0,
        visibility: "visible",
        force3D: true,
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
        transform: `translateZ(0)`,
        willChange: "transform, opacity",
      });
      updateClipPath();

      const timeline = gsap.timeline({
        paused: true,
        delay,
        onComplete: () => {
          gsap.set(el, {
            clearProps: "willChange,opacity,transform,backfaceVisibility,transformStyle",
          });
          const target = targetEl || el;
          gsap.set(target, {
            clearProps: "clipPath,boxShadow",
          });
        },
      });

      timeline
        .to(el, {
          opacity: 1,
          y: 0, // Translate to final position
          scale: 1, // Scale to final size
          duration: duration, // Respect duration prop
          ease: ease, // Respect easing curve prop
        }, 0)
        .to(state, {
          progress: 1,
          duration: duration, // Respect duration prop
          ease: ease, // Respect easing curve prop
          onUpdate: updateClipPath,
        }, 0);

      // 漏斗變形結束後（clip 已是完整矩形、輪廓不再變動）才淡入陰影，
      // 此時 box-shadow 只在固定形狀上算一次，成本低且不會「啪」一下彈出。
      if (targetEl) {
        timeline.to(
          targetEl,
          {
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.12)",
            duration: 0.35,
            ease: "power2.out",
          },
          duration,
        );
      }

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: `top ${startPct}%`,
        once: true,
        onEnter: () => timeline.play(),
      });

      return () => {
        trigger.kill();
        timeline.kill();
      };
    } else {
      const axis = direction === "horizontal" ? "x" : "y";
      const offset = reverse ? -distance : distance;

      gsap.set(el, {
        [axis]: offset,
        opacity: initialOpacity,
        scale,
        visibility: "visible",
      });

      const timeline = gsap.timeline({ paused: true, delay });

      timeline.to(el, {
        [axis]: 0,
        opacity: 1,
        scale: 1,
        duration,
        ease,
      });

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: `top ${startPct}%`,
        once: true,
        onEnter: () => timeline.play(),
      });

      return () => {
        trigger.kill();
        timeline.kill();
      };
    }
  }, [
    delay,
    direction,
    distance,
    duration,
    ease,
    initialOpacity,
    reverse,
    scale,
    threshold,
    animationType,
  ]);

  return (
    <div ref={ref} className={className} style={{ visibility: "hidden" }}>
      {children}
    </div>
  );
}
