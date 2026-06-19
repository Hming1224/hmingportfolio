'use client';

import { useEffect } from 'react';

/**
 * ≤768px：把底部四裝飾的 frame（.hero-bottom-group）垂直置中於
 * 「我的歷程按鈕底 ↔ hero 下緣」的空隙。
 *
 * 為什麼要用 JS 而不是純 CSS calc：按鈕的位置不只受視窗高度影響，
 * 也受寬度影響（窄螢幕標題會多折行 → copy 變高 → 按鈕下移），
 * 純 heroH 公式抓不準。改用實際量測按鈕 rect 來置中，並在 resize 時重算，
 * 才能在所有寬高組合下「一直保持在空隙中間」。
 *
 * 空隙比 frame 還小時（裝不下）→ 隱藏，避免頂到按鈕。
 * >768px：清掉 inline 樣式，交還給 CSS（frame 在桌機是 display:contents）。
 */
export default function HeroBottomGroupCenter() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.hero');
    const group = document.querySelector<HTMLElement>('.hero-bottom-group');
    const btn = document.querySelector<HTMLElement>('.hero-actions .ds-button-secondary');
    if (!hero || !group || !btn) return;

    const update = () => {
      // 桌機/平板：交還給 CSS（display:contents），清掉 inline 覆寫。
      if (window.innerWidth > 768) {
        group.style.top = '';
        group.style.visibility = '';
        return;
      }

      const heroRect = hero.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      const groupH = group.offsetHeight || 162;
      const gap = heroRect.bottom - btnRect.bottom;

      // 空隙不足以容納整個 frame → 隱藏（避免頂到按鈕）。
      if (gap < groupH) {
        group.style.visibility = 'hidden';
        return;
      }

      group.style.visibility = '';
      // 空隙中點（viewport 座標）→ 換算成相對 hero padding-box 的 top。
      const midpoint = (btnRect.bottom + heroRect.bottom) / 2;
      const topRel = midpoint - groupH / 2 - heroRect.top;
      group.style.top = `${topRel}px`;
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(hero);
    ro.observe(document.body);
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    // 字體載入後 copy 高度可能改變，重新量一次。
    document.fonts?.ready?.then(update).catch(() => {});

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  return null;
}
