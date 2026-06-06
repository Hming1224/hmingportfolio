# hmingportfolio Agent Instructions

This is a child web project inside the shared Hming AI-agent workspace.

Before working in this project, read the parent shared context:

- `../AGENTS.md` — 共用協作 / 對話 / 執行原則（已涵蓋原 working-style、hming-preferences 的內容）
- `../000_Agent/memory/MEMORY.md` — 跨 session 偏好與踩坑

設計品質方面，套用 `frontend-craft` skill（前端設計原則 + 品質檢查清單），響應式問題搭配 `rwd-audit` skill。

Apply those shared rules to this project.

Project-specific defaults:

- Treat this as a portfolio-quality frontend project.
- Preserve the existing code style and folder structure.
- Prefer focused edits over broad rewrites.
- Verify UI changes visually when a local dev server can run.
- Summarize changed files and verification results at the end of each task.
- 對話回覆格式：每次回覆必須包含且主動整理以下三個標題區塊：
  - **✅ 剛完成** (總結完成工作)
  - **👉 建議下一步** (列出下一步建議)
  - **⚠️ 可能遺漏** (提醒潛在或可能被遺漏的細節)

