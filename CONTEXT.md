# hmingportfolio

Hming 的個人作品集網站（Next.js App Router、中英雙語）。這份檔案是這個專案的**詞彙表**：同一個概念只准一種說法。

> **這不只是給 AI 記的，是給 AI 拿來核對 Hming 的。** 發現他的口頭說法跟這裡的定義衝突，要當場指出來、請他決定，不要默默照做。
> 格式與維護規則見母 repo `000_Agent/guides/shared-language.md`。談定新術語就當場補進來，不要累積到最後。

## 命名通則

**元件用英文原名，概念用中文。**

- **程式碼裡實際存在的東西**（`CaseStudyShell`、`CaseMetricGrid`、`FlowScrollHint`、`StickyNote`）一律用英文原名。那是 code 的事實、改不動，硬翻成中文只會造成「code 叫 A、文件叫 B」對不上。
- **描述性的概念**（案例頁、裝飾元件、階段）用中文。

## 語言

**案例頁**：
作品集裡完整呈現一個專案的頁面，含背景、研究、設計決策與結果。
_不要用_：case study 頁、專案頁、作品頁、個案研究
_例外_：指程式碼時仍用英文原名（`components/case-study/`、`CaseStudyShell`）——那是檔案路徑，不是概念。

**裝飾元件**：
Hero 區那些不承載主要內容、圍繞主視覺配置的漂浮小元件，程式碼在 `components/hero-decorations/`。
_不要用_：floating widget、sticker、掛件、浮動元件、裝飾物
_底下的個別元件保留英文原名_：`StickyNote`、`CursorTag`、`WireframeFrame`、`AiWidgetFrame`、`AnnotationPin`、`ToggleDecoration`、`WalPencilDecoration`

**階段**：
AI Impact Workflow 裡 7 個彼此交接、可依任務選用的工作段落。程式碼裡是 `stage`。
_不要用_：案例、專案、模組、成果
_為什麼_：這 7 個不是 7 個各自完成的成果案例。叫「案例」會讓面試官誤讀成 7 件獨立作品。

**Hero**：
單獨講「Hero」預設指**首頁**的 Hero（`components/Hero.tsx`）。案例頁的那一塊一律說 `CaseHero`，不可只說「Hero」。
_為什麼_：兩者版面規則不同——案例頁的滿版 cover 維持 0–1920px、不套 240px 內距，只有 Hero Info 內部才對齊內容欄寬。搞混會把滿版圖縮進去。

**內容資產**：
各案例 route 底下的流程圖、connector、產品截圖與專案資料。它們是**內容**，不是另一套 UI system，不需要被抽象成共用元件。
_不要用_：案例元件、視覺元件

**route-local**：
只屬於單一路由、刻意不抽進共用元件的東西，跟「共用（shared）」相對。
_不要用_：頁面專屬、局部、local-only
