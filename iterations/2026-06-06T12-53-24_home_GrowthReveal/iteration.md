# Iteration: home — GrowthReveal

| 項目 | 值 |
|------|----|
| 時間 | 2026/6/6 下午12:53:29 |
| 頁面 | http://localhost:3000/ |
| 元件 | `GrowthReveal` |
| 檔案 | `app/about-me/GrowthReveal.tsx` |
| 截圖範圍 | 頁面頂部（找不到元件，已退回整頁） |

## Before
![Before](before.png)

## After
![After](after.png)

## 設計說明

- **Before 的問題**：字卡和圖卡（包含圖釘）在頁面載入時就直接顯示，缺少進場動畫效果；最外圈 frame 的遮蓋問題導致內容無法完整展示；圖釘與圖卡沒有作為一個固定單位組合。

- **After 的改動**：新增 IntersectionObserver 機制來偵測元素何時進入視窗（threshold 25%、底部預留 10% 緩衝），當進入時自動加入 `.is-visible` 類別以觸發預設的 CSS 進場動畫。這樣讓字卡和圖卡在用戶捲動到該區域時才依序播放動畫，增強視覺層次感與敘事節奏；同時通過 CSS 側的修正將圖釘與圖卡置中整合為一個視覺整體，並解決了外層 frame 的 overflow 遮蓋問題，使完整的成長故事卡片得以清晰呈現。

<details>
<summary>Code diff</summary>

**Before:**
```
（新增）
```

**After:**
```
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

```

</details>