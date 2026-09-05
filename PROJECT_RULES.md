# hmingportfolio — 專案契約

> 這是本專案的專屬契約。共通規則在母 repo `000_Agent/CORE_RULES.md`，**這份只寫「這個專案跟別的專案不一樣的地方」**。
> 動手前的固定讀取順序：① 母 repo `CORE_RULES.md` → ② 這份 → ③ `Memory.md` → ④ `CONTEXT.md`（用到專有名詞時）。

Next.js App Router 的個人作品集網站，中英雙語（next-intl），線上位置 hmingdesign.com。

## 動 UI／樣式之前

**先讀 `docs/design-system.md`。** 這個專案的設計規格集中在那裡——**沒有 `design.md`，不要去找**。

其餘按需讀取：

| 要做什麼 | 讀哪份 |
| :--- | :--- |
| 新增一個案例頁 | `docs/add-case-study-checklist.md`（目標：不用改 Advantech 的 page 或 CSS） |
| 確認路由與 regression 範圍 | `docs/architecture-baseline.md` |
| 決定要跑哪一層驗證 | `docs/testing.md` |
| 公開 repo 的安全稽核 | `docs/public-repo-readiness.md` |
| 專有名詞怎麼稱呼 | `CONTEXT.md` |
| 過去的決策與踩坑 | `Memory.md` |

## 驗證：跑最小夠用的那一層

| 情境 | 指令 |
| :--- | :--- |
| 改完任何 code | `npm run verify:quick` |
| 動到 build 相關 | `npm run verify:build` |
| 動到 design system | `npm run verify:ds` |
| 大範圍改動 / 收尾 | `npm run verify:full` |

**UI 改動不能只截一張整頁圖就宣稱完成。** 在 **1440 / 1024 / 768 / 390** 各斷點量測目標元件的 DOM metrics（centerY、寬度、overflowX、console errors）當前後對照證據——對齊與溢出這種問題，整頁截圖看不出來。

## 分支與 push

- **既有維護、小修、內容更新、文件** → 可以直接推 `main`
- **全新功能、全新專案、影響範圍大的改動** → 開分支（`codex/...` 或對應工具前綴）再推
- **分不清是新功能還是維護** → 先用一句話問 Hming，不要自行猜

## localhost

跨 session 常駐服務：label `com.hming.hmingportfolio-dev-3000`，port `3000`。**啟動指令有 cwd 陷阱**（直接從 `launchd` 預設 cwd 起會讓 `next-intl` 找不到 `i18n/request.ts`），完整啟動方式與三項 read-back 見 `Memory.md` 的「本地開發伺服器」。

除非 Hming 明確說「關掉 localhost」，否則保留服務。

## 這個專案的禁止事項

理由與完整脈絡見 `Memory.md`，這裡只列底線：

- **`presentation/` 不進版控**（`.gitignore`）。在那底下改東西 `git status` 永遠顯示乾淨，**這是刻意設計不是 bug**。不要移除 ignore 規則或重新 `git add` 整個資料夾——那會反轉先前的決定，必須先問 Hming。
- **這是公開 repo。** 清理時只清 API key／密鑰／憑證，**不要動聯絡資訊與履歷下載連結**——那是 Hming 有意識的產品決策。
- **不要一次改大量共用元件。** 縮小 batch、以線上站當視覺 baseline、每個安全 batch 驗證（含 RWD）後立刻 commit + push。特殊幾何視覺（connector、timeline、flow、matrix、before-after）先討論再抽象。
- **不要過度 token 化。** 核心規則才 token 化、重複元件才 component 化、單次敘事區塊保留彈性；跨案例真正重用之後才往上升級。
