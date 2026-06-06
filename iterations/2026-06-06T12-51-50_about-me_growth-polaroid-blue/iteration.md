# Iteration: about-me — growth-polaroid-blue

| 項目 | 值 |
|------|----|
| 時間 | 2026/6/6 下午12:51:56 |
| 頁面 | http://localhost:3000/about-me |
| 元件 | `growth-polaroid-blue` |
| 檔案 | `app/globals.css` |
| 截圖範圍 | 元件範圍 |

## Before
![Before](before.png)

## After
![After](after.png)

## 設計說明

- **Before 的問題**：迴紋針和圖卡是分離的獨立元素，各自用絕對定位（top/left）控制位置，導致迴紙針容易浮動偏離圖卡，無法形成一個視覺整體；同時外框層級壓住內容的問題，也使得整個組件的呈現效果不完整。

- **After 的改動**：移除了迴紋針的獨立定位規則，改由HTML結構嵌入讓迴紙針成為圖卡的子元素，使其跟圖卡作為一個統一的固定物件。這樣迴紙針會自動隨著圖卡的位置同步，不再有位置偏差的問題，增強了卡片的整體性。同步移除外框層級遮蔽的問題後，整個Polaroid元件現在能完整顯示。

<details>
<summary>Code diff</summary>

**Before:**
```
  .growth-polaroid-blue {
    top: -32px;
    right: -30px;
  }

  .growth-polaroid-blue .growth-paperclip {
    top: -57px;
    left: 111px;
  }

  .growth-polaroid-orange {
    top: auto;
    bottom: -42px;
    left: -39px;
    width: 209px;
  }

  .growth-polaroid-orange > img:not(.growth-paperclip) {
    height: 252px !important;
  }

  .growth-polaroid-orange .growth-paperclip {
    top: 11px;
    left: 56px;
  }

  .tool-grid {
```

**After:**
```
  .growth-polaroid-blue {
    top: -32px;
    right: -30px;
  }

  .growth-polaroid-orange {
    top: auto;
    bottom: -42px;
    left: -39px;
    width: 209px;
  }

  .growth-polaroid-orange > img:not(.growth-paperclip) {
    height: 252px !important;
  }

  .tool-grid {
```

</details>