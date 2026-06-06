# Iteration: about-me — growth-story-blue

| 項目 | 值 |
|------|----|
| 時間 | 2026/6/6 下午12:49:30 |
| 頁面 | http://localhost:3000/about-me |
| 元件 | `growth-story-blue` |
| 檔案 | `app/globals.css` |
| 截圖範圍 | 元件範圍 |

## Before
![Before](before.png)

## After
![After](after.png)

## 設計說明

- **Before 的問題**：元件進場動畫在頁面載入時立即觸發，無法配合使用者捲動視窗的互動時機，造成使用者進頁面時動畫已結束或尚未播放，動畫與視覺體驗之間的時機錯亂。

- **After 的改動**：將動畫改為條件觸發機制——預設元件隱藏（opacity: 0），由 JavaScript 偵測元件進入視窗時動態加上 `.is-visible` class，才播放對應的進場動畫。這樣使用者在捲到該區域時能看到完整、精確的進場效果，建立更強的視覺層次感與互動感受。

<details>
<summary>Code diff</summary>

**Before:**
```
.growth-story-blue {
  animation: growthBlueIn 820ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.growth-story-orange {
  animation: growthOrangeIn 820ms cubic-bezier(0.22, 1, 0.36, 1) 120ms both;
}
```

**After:**
```
/* 進場動畫：預設隱藏，捲到畫面內（.is-visible）才播放 */
.growth-story-blue,
.growth-story-orange {
  opacity: 0;
}

.growth-story-blue.is-visible {
  animation: growthBlueIn 820ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.growth-story-orange.is-visible {
  animation: growthOrangeIn 820ms cubic-bezier(0.22, 1, 0.36, 1) 120ms both;
}
```

</details>