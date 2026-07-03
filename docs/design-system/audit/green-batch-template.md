# Green Batch Template

> 用途：給 AI agent / Codex / Claude / Gemini 執行 Design System 重構時使用。
> 目標：每次只做一個可驗證、可回滾的小批次，避免一次大改造成視覺 regression。
> 適用專案：Hming Portfolio Design System remediation。
> 狀態：這是一份 visual-preserving implementation batch template，必須搭配 current production code 與目前的 docs contracts 解讀。不要用此 template 強迫 route CSS refactor。

---

## 0. Core Rule

每個 green batch 必須符合：

- 範圍小
- 可驗證
- 可回滾
- 不跨責任邊界
- 不改 main
- 不把未確認的特殊版型硬共用化

> **核心原則：核心規則 token 化，重複元件 component 化，單次敘事區塊保留彈性。**

---

## 1. Required Reading

執行任何 batch 前，先閱讀：

```txt
docs/design-system/08-ai-implementation-rules.md
docs/design-system/02-tokens.md
docs/design-system/09-integrated-workflow.md
docs/plans/00-integrated-execution-order.md
```

若本批是 Case Study remediation，另外閱讀：

```txt
docs/plans/2026-06-27_case-study-design-system-consolidation-plan_v2.md
```

若本批是 `/design-system` page alignment，另外閱讀：

```txt
docs/plans/2026-06-27_design-system-page-code-alignment-plan_v2.md
```

---

## 2. Batch Header

每個 batch 開始前，先填寫：

```md
## Batch ID
A1 / A2 / B1 / ...

## Batch Name
例如：Advantech Overview only

## Branch
例如：codex/design-system-remediation

## Goal
本批要解決什麼問題？

## Non-goals
本批明確不處理什麼？

## Allowed Files
- path/to/file-a
- path/to/file-b

## Forbidden Files / Areas
- 不可碰的檔案或資料夾
- 不可處理的 selector family
- 不可新增 / 修改的 token
```

---

## 3. Batch Size Rules

每個 batch 必須盡量控制在：

```txt
net changed lines: 150–250
hard limit: 300 lines
selector family: 1–3 組為佳，最多 8–12 組
route / section: 只處理一個 section，或一個 primitive family
```

若預估超過 300 lines，必須先停止並拆成：

```txt
A1 / A2 / A3
```

不可直接執行中大型重構。

---

## 4. Scope Checklist

執行前請回答：

```md
### Scope Check

- [ ] 本批只處理一個 route / section / primitive family
- [ ] 本批不跨 Case Study branch 與 DS Page branch 邊界
- [ ] 本批不包含 unrelated cleanup
- [ ] 本批不修改 main
- [ ] 本批不使用 `git add .`
- [ ] 本批不修改未被允許的檔案
- [ ] 本批不刪除 tmp，除非任務明確要求
```

---

## 5. Selector / Component Mapping

實作前先建立 mapping，不可直接搜尋取代。

```md
| Old selector / code | Current purpose | New DS primitive / token | Action | Reason |
|---|---|---|---|---|
| `.old-class` | 現在用途 | `.cs-card` / `--cs-*` / exception | keep / replace / remove | 原因 |
```

Action 定義：

```txt
keep：保留，因為仍有合理用途
replace：替換成共用 primitive / token
remove：已無使用或已被共用層取代
exception：保留為 route-local exception，不共用化
```

---

## 6. Token Decision Rule

新增或修改 token 前，必須依最低可行層級判斷：

```txt
foundation token（--hm-* / --fs-* / --text-*）
  -> case semantic token（--cs-*）
    -> project theme token（.theme-<slug>）
      -> route-local token（--laushu-* / --ca-* / --advantech-*）
        -> one-off value
```

判斷問題：

```md
- [ ] 這個值是否跨整站重複？
- [ ] 這個值是否跨多個 case study 重複？
- [ ] 這個值是否只屬於單一案例？
- [ ] 這個值是否只服務單一敘事 / 視覺化區塊？
- [ ] 是否真的需要 token？還是 one-off value + comment 即可？
```

禁止：

```txt
- 不為單一頁面新增 --hm-* token
- 不把一次性裝飾位置 token 化
- 不讓 component 直接吃 primitive color token
- target state 偏好不在 .theme-* 裡寫 layout / spacing / typography / radius / shadow geometry；但 production 中既有 local / colocated component variables 可保留，直到 visual-preserving migration 被明確批准
```

---

## 7. Special Visual Decision Gate

以下類型不得直接共用化，必須先回報：

```txt
connector
timeline
radial layout
flow chart
matrix
survey visualization
donut / bar chart
SVG path
foreignObject
lightbox
video mask
before-after complex comparison
Hming 明確喜歡的特殊版型
```

若遇到上述情境，請提供三個選項：

```md
1. 套既有 shared pattern
2. 新增 shared primitive
3. 保留 project-specific exception
```

並說明推薦哪一個。

---

## 8. Implementation Rules

實作時遵守：

```txt
- 先改最小可行範圍
- 不做全域搜尋取代
- 不跨 batch 偷改其他 selector
- 不為了刪 CSS 行數犧牲視覺
- 不修改文案、圖片順序、研究結論
- 不改已確認的互動行為
- 不將 local exception 假裝成 reusable component
```

如果發現本批範圍比預期大：

```txt
停止
回報
拆批
等待 Hming 確認
```

---

## 9. Required Validation

每個 batch 完成後必跑：

```bash
git diff --check
npm run lint
npm run check:tokens
npm run build
```

若本批有動到 case-study CSS / tokens / route layout，還要跑：

```bash
npm run audit:architecture
```

Browser smoke test：

```txt
touched route at 1440 / 1024 / 768 / 390
horizontal overflow = 0
console errors = 0
```

Case Study remediation 必測：

```txt
/en/<case-slug> at 1440 / 1024 / 768 / 390
/zh-TW/<case-slug> at 390
TOC active state
ZoomableImage / media frame if touched
Proposal Tabs if touched
Flow horizontal scroll if touched
Video / lightbox if touched
language route
```

DS Page alignment 必測：

```txt
/design-system at 1440 / 1024 / 768 / 390
mobile nav / accordion
hash / active state switching
horizontal overflow = 0
console errors = 0
```

---

## 10. Visual Baseline Rule

若本批影響正式頁面視覺，必須用 live baseline 對照：

```txt
https://hmingdesign.com/en
```

Case Study route：

```txt
/en/advantech
/en/crypto-arsenal
/en/laushu
/zh-TW/<case-slug>
```

回報差異時分類：

```txt
intentional
content-version
regression
```

只有 `intentional` 或 `content-version` 可以進 commit。

---

## 11. Rollback Strategy

每個 batch 必須提供 rollback 方式：

```md
### Rollback Strategy

如果本批跑版：
1. 使用 `git restore <specific files>` 還原本批修改檔案。
2. 若已 commit，使用 `git revert <commit-hash>`。
3. 不使用 `git reset --hard`，除非 Hming 明確同意。
4. 不用 `git clean -fd` 刪未追蹤檔，除非任務明確要求。
```

---

## 12. Commit Rules

commit 前必須檢查：

```bash
git status --short
```

只 stage 本批檔案：

```bash
git add <specific-file-a> <specific-file-b>
```

禁止：

```txt
git add .
```

commit message 格式：

```txt
refactor(case-study): align <case/section> with DS primitives
docs(design-system): document <component/contract>
chore(ds): add <audit/script/template>
```

每個 green batch 通過後，可以 commit + push 到 feature branch。

禁止：

```txt
- push main
- 合併 main
- 夾帶其他 agent / Hming 的改動
- 夾帶 tmp 截圖、暫存報告，除非任務明確要求
```

---

## 13. Case Study DS Contract

若本批穩定化任何 reusable case-study component / primitive，必須更新：

```txt
docs/design-system/contracts/case-study-components.md
```

Contract 格式：

```md
## <Component / Primitive Name>

**Source**
- `components/case-study/<Component>.tsx`
- `styles/case-study.css`

**Purpose**
這個元件 / primitive 解決什麼重複問題？

**Variants / Props**
- `variant="..."`
- `tone="..."`
- `size="..."`

**Shared tokens / classes**
- `--cs-*`
- `.cs-*`

**Allowed usage**
- 什麼情境可以使用？

**Do not use**
- 什麼情境不可使用？

**Known exceptions**
- 哪些 route-local exception 保留？為什麼？

**Verified routes**
- `/en/...`
- `/zh-TW/...`

**Breakpoints verified**
- 1440
- 1024
- 768
- 390

**Validation**
- horizontal overflow = 0
- console errors = 0
- interactions tested

**Batch / Commit**
- Batch ID:
- Commit hash:
```

若本批只是 cleanup，沒有新 reusable primitive，請回報：

```txt
No contract update needed because this batch only removes route-private duplication and does not change public component API.
```

---

## 14. Final Report Template

每個 batch 完成後回報：

```md
## Batch Result

### Batch
A1 — Advantech Overview only

### Files changed
- ...

### Diff stat
- ...

### What changed
- ...

### Mapping
| Old selector | New primitive / token / exception | Action |
|---|---|---|

### Validation
- [ ] git diff --check
- [ ] npm run lint
- [ ] npm run check:tokens
- [ ] npm run build
- [ ] npm run audit:architecture
- [ ] Browser smoke

### Visual result
- baseline comparison:
- intentional differences:
- regressions:

### Contract update
- updated / not needed
- reason:

### Commit recommendation
- commit now / do not commit yet
- suggested commit message:
```

---

## 15. Minimal Prompt Pattern

後續可以用這段短 prompt 觸發 batch：

```txt
依照 docs/design-system/08-ai-implementation-rules.md 和 docs/design-system/audit/green-batch-template.md。

執行 <Batch ID>：<Batch Name>。

Allowed files:
- <file-a>
- <file-b>

Forbidden:
- <forbidden selector / file / folder>

完成後跑標準驗證並回報。
不要 commit、不要 push，等我確認。
```
