# Changelog

## 2026-09-03 — AI Impact route-local reveal

- 首頁新增按住 800ms 的 `Reveal AI mindset` 入口，蓄力進度同步控制黑色填滿與黃色文字。
- 新增 `/ai-impact` 中英文頁面，使用 route-local 深灰與三段黃色，並沿用首頁 Hero 裝飾定位與動畫契約。
- 進入與返回採用按鈕中心的 circular View Transition；不支援 API 與 reduced-motion 情境保留直接導頁 fallback。
- AI Workflow 改為 7 階段：桌機與手機都以垂直 scroll 切換固定水平落點，每次讓下一張完整滑入並貼齊左側，不停在半張；reduced-motion 使用完整的垂直卡片 fallback。
- AI Workflow 的 Skill 改為獨立標籤，hover 或鍵盤 focus 時顯示內容與用途 tooltip。
- 使用者研究階段依實際順序標示工具分工：Claude 規劃專案計劃書、ChatGPT 設計訪綱與問卷、NotebookLM 整理逐字稿與洞察。
- 點點圖層亮光改為從 Hero 中心向外擴散的單圈波紋；波紋經過後恢復暗點並完全消失，避免整面點亮，reduced-motion 不顯示動態亮層。
- 波紋移除循環頭尾的停頓與 `ease-out` 減速；使用鋪滿 Hero 的圓形 radial mask、線性半徑與首尾 opacity transition，避免縮放矩形 mask 形成上下水平裁切。
- 新增四斷點、取消、鍵盤、返回首頁與 overflow 的 targeted smoke。

## 2026-07-17 — SplitText 長標題限制

- `07-content-and-motion.md` 新增 15.1：SplitText 在 `splitType="chars"` 下，GSAP 會注入 `white-space: nowrap`，配合元件的 `overflow: hidden` 導致長標題被裁切而非換行；解法是改用 `splitType="words, chars"`。
- 起因：About Me hero 標題改長後於三個斷點全部破版（375px 溢出 89px）。此限制既有，原標題夠短所以未暴露。
- 影響範圍：Hero、Works、Design System、About Me 四處共用 `SplitText`，改長標題前都應先讀 15.1。

## 2026-06-27 — Split design-system.md

- 將原始單一 `design-system.md` 拆成 `docs/design-system/` 文件組。
- 穩定規格拆成 overview、foundations、tokens、components、case-study-patterns、accessibility、governance、content/motion/theme。
- 將 2026-06-25 掃描缺口移至 `audit/design-audit-2026-06-25.md`。
- 將 token v2 遷移狀態移至 `audit/token-migration-status.md`。
- 將本機 `file:///Users/...` 路徑改為 repo-relative path，方便 GitHub、AI agent 與其他協作者閱讀。

## 後續建議

- 新增 token sync script，避免 `styles/tokens.css` 與 Markdown YAML mirror 不一致。
- 為核心元件補上固定文件格式：Purpose、Anatomy、Variants、States、Accessibility、Responsive behavior、Examples。
- 為 accessibility 補上實測結果，例如 contrast matrix 與 keyboard test checklist。


## 2026-06-27 — AI 落地規則更新

- 新增 `08-ai-implementation-rules.md`，明確規範 AI / Agent 修改 code 時的分層、禁止事項與回報格式。
- 新增 `audit/ai-audit-task-template.md`，提供「只 audit、不改 code」的標準 prompt 與 report 格式。
- 新增 `audit/implementation-task-order.md`，將 DS 落地拆成五個 phase：audit、低風險 token 修正、shared components、case study pages、visual QA。
- 更新 `design-system.md` 導覽，加入 AI 落地工作流與 Token Source of Truth。
- 更新 `02-tokens.md`，將 `styles/tokens.css` 明確定義為 runtime token source of truth，Markdown YAML 僅作為 documentation mirror。
- 更新 `06-governance.md`，加入 AI / Agent governance 段落。


## 2026-06-27 — Integrated AI-ready execution package

- Added `09-integrated-workflow.md`.
- Added `contracts/case-study-components.md` as the formal handoff from Case Study remediation to DS page alignment.
- Updated `08-ai-implementation-rules.md` with branch scope, token rules, batch validation, and contract requirements.
- Updated governance and token docs with source-of-truth and cross-branch integration rules.
- Added integrated execution plan and v2 implementation plans under `plans/`.
