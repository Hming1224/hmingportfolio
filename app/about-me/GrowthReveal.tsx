"use client";

import { useEffect } from "react";

/**
 * 讓「啟蒙與成長」的字卡 + 圖卡在捲進畫面時才播放進場動畫。
 * 觀察每個 .growth-story，進入視窗就加上 .is-visible 觸發 CSS 動畫。
 * 渲染 null，只負責掛 IntersectionObserver。
 */
export default function GrowthReveal() {
  useEffect(() => {
    const stories = Array.from(
      document.querySelectorAll<HTMLElement>(".growth-story"),
    );
    if (stories.length === 0) return;

    // 不支援 IntersectionObserver 時直接顯示，避免內容卡在隱藏狀態
    if (typeof IntersectionObserver === "undefined") {
      stories.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
    );

    stories.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
