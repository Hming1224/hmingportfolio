---
name: DemoCo（示範）
description: 品牌切換機制的示範 profile——虛構公司 DemoCo，青綠色 + DM Sans。投真實公司時照這份格式建 company-<公司>.md。
---

# DemoCo（虛構示範公司）

| Token      | 值                                    | 來源                     |
| ---------- | ------------------------------------- | ------------------------ |
| accent     | `#0d7a68`                             | （示範值）對白底對比 5.4:1 ✅ |
| accentSoft | `#e0f2ee`                             | accent 調淡              |
| bg / text  | `#ffffff` / `#1f2723`                 | 白底＋帶綠的深墨         |
| fonts      | `"DM Sans"` + PingFang TC fallback（`https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap`） | （示範值） |
| logo       | `assets/logos/demo.svg`               | （示範用自製 wordmark；真實公司必須用官方 press kit 檔，禁止截圖） |

調性備註：務實、圓潤、綠色科技感。

套用結果見 `slides/intro-demo/`——與 `intro-master` 的 diff 只有 BRAND TOKENS 區塊、logo import 與 meta，頁面 JSX 為零改動。
