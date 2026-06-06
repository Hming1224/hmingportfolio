"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

    const axis = direction === "horizontal" ? "x" : "y";
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;

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
  ]);

  return (
    <div ref={ref} className={className} style={{ visibility: "hidden" }}>
      {children}
    </div>
  );
}
