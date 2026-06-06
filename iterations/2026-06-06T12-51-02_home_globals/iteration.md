# Iteration: home — globals

| 項目 | 值 |
|------|----|
| 時間 | 2026/6/6 下午12:51:07 |
| 頁面 | http://localhost:3000/ |
| 元件 | `globals` |
| 檔案 | `app/globals.css` |
| 截圖範圍 | 頁面頂部（找不到元件，已退回整頁） |

## Before
![Before](before.png)

## After
![After](after.png)

## 設計說明

- **Before 的問題**：動畫起始的 opacity 設為 0.5，使得圖卡在進場時並非從隱藏到完全顯示，而是從半透明狀態開始。搭配旋轉與位移的 3D 變換，這會造成視覺上的層疊關係不清楚，且與迴紋針一起堆疊時容易產生重影感，削弱整體的動畫穿透力。

- **After 的改動**：將初始 opacity 改為 0，使圖卡與迴紋針從完全透明開始，經由設定好的 3D 旋轉與位移動畫逐漸顯現。這樣的調整讓進場動作擁有清晰的視覺層次，使得整個元件複合體（圖卡＋迴紋針）的動畫意圖更直白有力，也強化了使用者對這組固定物件進場的感知強度。

<details>
<summary>Code diff</summary>

**Before:**
```
@keyframes growthPhotoOrangeIn {
  from {
    opacity: 0.5;
    filter: saturate(0.85);
    transform: perspective(1200px) translate(-20px, -20px) rotate(9deg) rotateX(20deg);
  }
```

**After:**
```
@keyframes growthPhotoOrangeIn {
  from {
    opacity: 0;
    filter: saturate(0.85);
    transform: perspective(1200px) translate(-20px, -20px) rotate(9deg) rotateX(20deg);
  }
```

</details>