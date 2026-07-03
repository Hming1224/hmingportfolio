# Changelog

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
