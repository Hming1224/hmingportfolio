'use client';
import { useEffect } from 'react';

/**
 * Draws the AI-flow connector lines by measuring the real rendered position of
 * each card (tagged with data-flow="ai1|ai2|fn1|fn2|ui1|ui2|ui3"). Because the
 * lines follow the actual card geometry, they stay aligned no matter how the
 * cards reflow or change height across breakpoints.
 */
export default function FlowConnectors() {
  useEffect(() => {
    const wraps = Array.from(
      document.querySelectorAll<HTMLElement>('.cs-ds-flow-wrap')
    );
    if (wraps.length === 0) return;

    function drawWrap(wrap: HTMLElement) {
      const svg = wrap.querySelector<SVGSVGElement>('.cs-ds-svg-overlay');
      // Measure against the inner box (it spans the full, possibly-overflowing
      // content width), so the lines scroll together with the cards.
      const inner = wrap.querySelector<HTMLElement>('.cs-ds-flow-inner') ?? wrap;
      if (!svg) return;

      if (getComputedStyle(svg).display === 'none') {
        svg.innerHTML = '';
        return;
      }

      const wrapRect = inner.getBoundingClientRect();
      const W = inner.clientWidth;
      const H = inner.clientHeight;

      const pos = (key: string) => {
        const el = inner.querySelector<HTMLElement>(`[data-flow="${key}"]`);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const top = r.top - wrapRect.top;
        const bottom = r.bottom - wrapRect.top;
        return {
          left: r.left - wrapRect.left,
          right: r.right - wrapRect.left,
          top,
          bottom,
          cy: (top + bottom) / 2,
        };
      };

      const ai1 = pos('ai1'), ai2 = pos('ai2');
      const fn1 = pos('fn1'), fn2 = pos('fn2');
      const ui1 = pos('ui1'), ui2 = pos('ui2'), ui3 = pos('ui3');
      if (!ai1 || !ai2 || !fn1 || !fn2 || !ui1 || !ui2 || !ui3) {
        svg.innerHTML = '';
        return;
      }

      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

      // Card heights are kept equal per row in CSS, so a card's true centre is a
      // reliable anchor — connecting two cards at the average of their centres
      // yields a perfectly horizontal line (no wrinkle).
      const mid = (a: number, b: number) => (a + b) / 2;
      const hLine = (x1: number, y: number, x2: number) => `M ${x1} ${y} H ${x2}`;

      // Same gray as the "最終 3 種 feature 的介面細節" connectors; lines joining
      // two "由我負責" cards stay thicker to emphasise my part.
      const OWNED_W = 3;
      const BASE_W = 2;
      const segs: Array<{ d: string; w: number }> = [];

      // AI → Feature
      segs.push({ d: hLine(ai1.right, mid(ai1.cy, fn1.cy), fn1.left), w: OWNED_W }); // ai1 + fn1
      segs.push({ d: hLine(ai2.right, mid(ai2.cy, fn2.cy), fn2.left), w: BASE_W });  // ai2 + fn2

      // Feature row 1 fans out to all three UI cards (every card here is owned).
      // Trunk + spine share UI-1's centre Y so the segments meet cleanly; only
      // the spine is vertical.
      const mx = fn1.right + (ui1.left - fn1.right) / 2;
      segs.push({ d: hLine(fn1.right, ui1.cy, mx), w: OWNED_W });     // trunk out of Feature 1
      segs.push({ d: `M ${mx} ${ui1.cy} V ${ui3.cy}`, w: OWNED_W }); // vertical spine ui1 → ui3
      segs.push({ d: hLine(mx, ui1.cy, ui1.left), w: OWNED_W });     // → UI 1
      segs.push({ d: hLine(mx, ui2.cy, ui2.left), w: OWNED_W });     // → UI 2
      segs.push({ d: hLine(mx, ui3.cy, ui3.left), w: OWNED_W });     // → UI 3

      // Feature row 2 → UI card 3 (fn2 is not owned → base weight)
      segs.push({ d: hLine(fn2.right, mid(fn2.cy, ui3.cy), ui3.left), w: BASE_W });

      // Same style/colour as the "最終 3 種 feature 的介面細節" connectors
      svg.innerHTML = segs
        .map(
          ({ d, w }) =>
            `<path d="${d}" fill="none" stroke="#B3B3B3" stroke-width="${w}" stroke-linecap="square" stroke-linejoin="bevel" />`
        )
        .join('');
    }

    function drawAll() {
      wraps.forEach(drawWrap);
    }

    drawAll();

    const ro = new ResizeObserver(drawAll);
    wraps.forEach((w) => ro.observe(w));
    window.addEventListener('resize', drawAll);

    // Re-run once fonts have settled (text wrap can shift card heights)
    const t = window.setTimeout(drawAll, 300);
    const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts;
    if (fonts?.ready) fonts.ready.then(drawAll);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', drawAll);
      window.clearTimeout(t);
    };
  }, []);

  return null;
}
