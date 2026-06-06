# Iteration: about-me — growth-polaroid-blue

| 項目 | 值 |
|------|----|
| 時間 | 2026/6/6 下午12:50:02 |
| 頁面 | http://localhost:3000/about-me |
| 元件 | `growth-polaroid-blue` |
| 檔案 | `app/globals.css` |
| 截圖範圍 | 元件範圍 |

## Before
![Before](before.png)

## After
![After](after.png)

## 設計說明

- **Before 的問題**：動畫寫在元素本身，導致頁面加載時元素立即開始動畫，造成兩個問題：(1) 外層 frame 的溢出隱藏設定會截斷動畫過程中超出邊界的內容，使圖卡＋迴紋針無法完整呈現；(2) 無法精準控制動畫時機，導致底部字卡與圖卡的複合動畫無法協調執行。

- **After 的改動**：將動畫觸發改為「進場時才啟動」的模式——元素初始設為 `opacity: 0` 隱藏，只在父層追加 `is-visible` 狀態時才執行動畫。這樣做的好處是：(1) 動畫開始前元素就已定位，避免溢出截斷，圖卡與迴紋針可完整顯示；(2) 透過父層的 `is-visible` 狀態，能同時控制圖卡和底部字卡的進場時序，兩層動畫可協調執行；(3) 圖卡與迴紋針作為整體單位（共用同一個動畫觸發器），確保它們置中且同步進場。

<details>
<summary>Code diff</summary>

**Before:**
```
.growth-polaroid-blue {
  top: -25px;
  right: -65px;
  transform: rotate(-9deg);
  transform-origin: center;
  animation: growthPhotoBlueIn 900ms cubic-bezier(0.22, 1, 0.36, 1) 180ms both;
}

.growth-polaroid-orange {
  top: -7px;
  left: -72px;
  transform: rotate(9deg);
  transform-origin: center;
  animation: growthPhotoOrangeIn 900ms cubic-bezier(0.22, 1, 0.36, 1) 220ms both;
}
```

**After:**
```
.growth-polaroid-blue {
  top: -25px;
  right: -65px;
  transform: rotate(-9deg);
  transform-origin: center;
  opacity: 0;
}

.growth-polaroid-orange {
  top: -7px;
  left: -72px;
  transform: rotate(9deg);
  transform-origin: center;
  opacity: 0;
}

.growth-story-blue.is-visible .growth-polaroid-blue {
  animation: growthPhotoBlueIn 900ms cubic-bezier(0.22, 1, 0.36, 1) 180ms both;
}

.growth-story-orange.is-visible .growth-polaroid-orange {
  animation: growthPhotoOrangeIn 900ms cubic-bezier(0.22, 1, 0.36, 1) 220ms both;
}
```

</details>