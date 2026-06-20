"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Subtle "swipe to scroll" hint for horizontally-scrolling sections (flow
 * charts, timelines, comparison matrices). Shared across case studies. Place it
 * right above the scrolling section/component — it finds the scroll container
 * in the following sibling (itself or a descendant) and shows itself only when
 * that container actually overflows, so it never appears on desktop.
 */
export default function FlowScrollHint({ label }: { label: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const host = ref.current?.nextElementSibling as HTMLElement | null;
    if (!host) return;

    // A genuine horizontal scroll container: overflow-x auto/scroll AND its
    // content actually overflows. (Plain content overflow on a non-scroll
    // element doesn't count — that would give false positives on desktop.)
    const isScroller = (el: HTMLElement) => {
      const ox = getComputedStyle(el).overflowX;
      return (ox === "auto" || ox === "scroll") && el.scrollWidth > el.clientWidth + 1;
    };
    const check = () =>
      setScrollable(
        isScroller(host) ||
          Array.from(host.querySelectorAll<HTMLElement>("*")).some(isScroller),
      );
    check();

    const ro = new ResizeObserver(check);
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  return (
    <p
      ref={ref}
      className="cs-flow-hint"
      data-visible={scrollable}
      aria-hidden="true"
    >
      <span className="cs-flow-hint-icon">↔</span>
      {label}
    </p>
  );
}
