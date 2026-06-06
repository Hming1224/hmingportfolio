# Iteration: about-me — growth-paperclip

| 項目 | 值 |
|------|----|
| 時間 | 2026/6/6 下午12:50:30 |
| 頁面 | http://localhost:3000/about-me |
| 元件 | `growth-paperclip` |
| 檔案 | `app/globals.css` |
| 截圖範圍 | 元件範圍 |

## Before
![Before](before.png)

## After
![After](after.png)

## 設計說明

- **Before 的問題**：迴紋針位置透過各卡片的具體座標定位（藍色 `left: 125px`、橘色 `left: 40px`），導致定位邏輯分散且無法統一，難以視為卡片的整體組件，且當卡片寬度或佈局調整時，每個變體都需要逐一微調座標。

- **After 的改動**：改用 `left: 50%` 加 `transform: translateX(-50%)` 的標準水平居中方式，讓迴紋針自動相對於卡片寬度居中，統一 `top: -14px` 的上方距離，使迴紙針成為卡片的一個固定整體元件。這樣無論是藍色或橘色卡片都能自動套用相同的視覺邏輯，提高可維護性，同時解決位置精度問題，讓迴紙針與卡片的視覺層級關係更清晰。

<details>
<summary>Code diff</summary>

**Before:**
```
.growth-paperclip {
  position: absolute;
  z-index: 4;
  width: 28px;
  height: 28px;
  object-fit: cover;
  pointer-events: none;
}

.growth-polaroid-blue .growth-paperclip {
  top: -54px;
  left: 125px;
}

.growth-polaroid-orange .growth-paperclip {
  top: -36px;
  left: 40px;
}
```

**After:**
```
.growth-paperclip {
  position: absolute;
  z-index: 4;
  top: -14px;
  left: 50%;
  width: 28px;
  height: 28px;
  transform: translateX(-50%);
  object-fit: cover;
  pointer-events: none;
}
```

</details>