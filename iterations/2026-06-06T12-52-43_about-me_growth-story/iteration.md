# Iteration: about-me — growth-story

| 項目 | 值 |
|------|----|
| 時間 | 2026/6/6 下午12:52:49 |
| 頁面 | http://localhost:3000/about-me |
| 元件 | `growth-story` |
| 檔案 | `app/globals.css` |
| 截圖範圍 | 元件範圍 |

## Before
![Before](before.png)

## After
![After](after.png)

## 設計說明

- **Before 的問題**：外層 growth-story 框架使用 `overflow: hidden`，在 X 軸和 Y 軸方向都會裁切溢出內容，導致底部字卡和圖卡（含迴紋針）在垂直方向超出框架邊界時被蓋住，無法完整展示這些元件。

- **After 的改動**：改為 `overflow-x: clip; overflow-y: visible`，僅在水平方向進行裁切，在垂直方向允許內容自由溢出顯示。這樣字卡、圖卡及迴紋針元件都能清晰完整地呈現，為後續動畫參數的實裝和視覺層次的調整預留了空間，確保設計意圖得以正確落實。

<details>
<summary>Code diff</summary>

**Before:**
```
  .growth-story {
    min-height: auto;
    overflow: hidden;
  }

  .growth-story-orange {
    padding-bottom: 16px;
  }
```

**After:**
```
  .growth-story {
    min-height: auto;
    overflow-x: clip;
    overflow-y: visible;
  }

  .growth-story-orange {
    padding-bottom: 16px;
  }
```

</details>