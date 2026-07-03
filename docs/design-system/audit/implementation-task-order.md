# Design System Implementation Task Order

> **Status:** historical audit / target-state planning artifact.
> This document is not the current source of truth for implementation. Current component contracts live in `docs/design-system/03-components.md`; current governance boundaries live in `docs/design-system/06-governance.md`; production code remains the source of truth.
> Treat stale branch names, task order, and remediation wording as historical context unless a current task explicitly revalidates them.

請依照以下順序交付 AI 執行，避免一次大改造成視覺破壞。

## Phase 1 — Audit Only

目標：掃描，不改 code。

輸出：

```txt
reports/design-system-audit.md
```

允許修改：

```txt
scripts/*
reports/*
```

禁止修改：

```txt
app/*
components/*
styles/*
```

---

## Phase 2 — Low-risk Token Fix

目標：只修低風險 token 問題。

允許：

```txt
hardcoded color → semantic token
hardcoded radius → radius token
hardcoded transition duration → motion token
hardcoded z-index → z-index token
```

禁止：

```txt
layout
grid
position
width / height
margin / padding / gap
case study structure
```

---

## Phase 3 — Shared Components

目標：讓共用元件符合 DS。

範圍：

```txt
components/ui/*
components/case-study/*
styles/case-study.css
shared component CSS
```

重點：

```txt
Button
Project Card
Tag
Input
Navbar
CaseCard
CaseGrid
CaseMedia
CaseProposalTabs
CaseBeforeAfter
CaseFlowFrame
```

---

## Phase 4 — Case Study Pages, One by One

目標：逐頁移除 route-specific layout / spacing / component duplication。

順序建議：

```txt
1. Laushu
2. Crypto Arsenal
3. Advantech
```

限制：

```txt
每次只處理一個案例頁
.theme-xxx 以只保留 semantic color / surface / text token mappings 作為 target state；production 中既有 transitional route-specific / colocated variables 不應觸發立即重構
visualization geometry 可以保留 local values
```

---

## Phase 5 — Visual QA / Regression Check

每次 Phase 完成後至少檢查：

```txt
首頁
About
Contact
Advantech
Crypto Arsenal
Laushu
mobile ≤768px
tablet 769–1023px
desktop ≥1024px
```

檢查項目：

```txt
CTA 是否仍清楚
卡片 hover 是否正常
Case Study section spacing 是否一致
圖片 lightbox 是否置中
mobile 是否沒有 hover-only 互動
focus-visible 是否存在
reduced-motion 是否生效
```
