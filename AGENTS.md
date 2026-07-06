# hmingportfolio Agent Instructions

This is a child web project inside the shared Hming AI-agent workspace.

Before working in this project, read the parent shared context:

- `../AGENTS.md` — 共用協作 / 對話 / 執行原則（已涵蓋原 working-style、hming-preferences 的內容）
- `../000_Agent/memory/MEMORY.md` — 跨 session 偏好與踩坑

設計品質方面，套用 `frontend-craft` skill（前端設計原則 + 品質檢查清單），響應式問題搭配 `rwd-audit` skill。

Apply those shared rules to this project.

## Git / 部署規矩（網站已正式上線，main = 正式站）

`hmingdesign.com` 已正式發布，**push 到 main 會自動部署上線**。因此:

- 🆕 **涉及「新專案」的功能、頁面、區塊**（例如新增一個作品集案例頁、新案例的 section）→ **只能推到分支，絕不可自行推 main**。要合進 main / 上線，**必須 Hming 明確說「推 main」才可以**，AI 不得自行判斷「夠完整」就推。
- 🔧 **既有專案的修改維護、整個作品集網站本身的修改維護**（既有案例頁微調、文案、樣式、RWD、bug 修復、設定）→ 可以直接推 main。
- 走分支時善用 Vercel 自動產生的 **Preview 預覽網址**先驗證，確認 build 沒報錯、沒弄壞既有頁面、新功能真的會動，再等 Hming 指示合併。
- 出問題時記得 Vercel 有 Instant Rollback 可一鍵退回前一個正常版本。

## 測試 / CI 驗證（必讀）

- 驗證指令、hooks、CI/CD 流程與 **CI / Smoke Failure Handling Policy（硬性守則）** 都在 `docs/testing.md`。
- 動任何測試、或遇到 CI / smoke 紅燈之前，先讀該檔的 policy：CI 是偵測器不是修理工、同一 failing test 最多修 1 輪、debug 只跑 targeted test、測試任務不得改 production UI、不准 skip 或放寬 assertion。

## Project-specific defaults:

- Treat this as a portfolio-quality frontend project.
- Preserve the existing code style and folder structure.
- Prefer focused edits over broad rewrites.
- Verify UI changes visually when a local dev server can run.
- Summarize changed files and verification results at the end of each task.
- 對話回覆格式：每次回覆必須包含且主動整理以下三個標題區塊：
  - **✅ 剛完成** (總結完成工作)
  - **👉 建議下一步** (列出下一步建議)
  - **⚠️ 可能遺漏** (提醒潛在或可能被遺漏的細節)

## Design System Documentation IA Rules

- Do not repeat the same heading, label, description, or classification at adjacent hierarchy levels.
- Parent headings define context; child cards should add new information.
- Group-level classification does not need to be repeated as a chip on every card in that group.
- Tags and chips must distinguish variants, states, statuses, or mixed classifications. Do not use chips as decoration.
- Foundation pages should not duplicate their page title and description inside the content card.
- Examples and visual samples are for visual/state demonstration only; explanatory content belongs in guidance sections or reference tables.
- The documented subject must be production-backed.
- Supporting context may use wireframes or simplified placeholders when it helps explain the subject without distracting from it.
- Supporting context must not be presented as the documented component.
- Do not use realistic production-heavy visuals for supporting context if they compete with the documented subject.
