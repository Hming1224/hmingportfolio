# AI Design System Audit Task Template

> **Status:** historical audit template.
> Do not execute this file directly as a current implementation task. Interpret this template against current production code and current docs contracts before use.
> Current source of truth: `docs/design-system/03-components.md`, `docs/design-system/06-governance.md`, and production code.

這份模板用於要求 AI 先掃描 Design System 違規點，只產出報告，不直接修改 code。

## Prompt

```txt
請新增或執行一個 design system audit，掃描 app/、components/、styles/ 中的 CSS / TSX / CSS module，列出可能違反 design system 的 hardcoded values 與結構問題。

只產出 report，不要自動修改 code。

請檢查：
- hex color / rgba color
- font-size: px
- margin / padding / gap 的 px
- border-radius px
- box-shadow hardcoded
- transition duration hardcoded
- z-index hardcoded
- .theme-* 中是否出現 layout / spacing / typography / radius / shadow geometry / breakpoint 規則；這是 target-state audit signal，不代表 production 中既有 transitional route-specific / colocated variables 必須立即重構
- 元件是否直接使用 primitive token，例如 --hm-purple-600、--hm-peach-600
- 是否新增 ca-* / laushu-* / advantech-* class 來重做既有 cs-* pattern

請輸出：
reports/design-system-audit.md

每筆包含：
- file path
- selector / component
- nearby snippet 或 line
- issue type
- 建議替換 token 或 shared pattern
- risk level：low / medium / high
- 是否可以自動修：yes / no
```

## Report 格式

```md
# Design System Audit Report

## Summary

| Type | Count | Risk |
|---|---:|---|
| Hardcoded color |  |  |
| Hardcoded spacing |  |  |
| Primitive token usage |  |  |
| Theme geometry violation |  |  |
| Duplicate case-study pattern |  |  |

## Findings

### 1. [Issue title]

- File: `path/to/file.css`
- Selector / Component: `.example`
- Issue type: `hardcoded-color`
- Risk: `low`
- Current:

```css
color: #5d62d8;
```

- Suggested:

```css
color: var(--hm-color-action-primary-bg);
```

- Auto-fix: yes
- DS reference: `02-tokens.md`, `03-components.md`
```
