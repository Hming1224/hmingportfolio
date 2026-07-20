---
name: 一般 / 組內報告
description: 中性乾淨的淺底簡報主題，低調好讀；週會、學習分享、一般報告的萬用底。
---

# 一般 / 組內報告

給同事看的日常簡報：週會、學習分享、一般進度報告。乾淨、直接、低調，不過度設計，把資訊講清楚最重要。

## Palette

| Role    | Value     | Notes                    |
| ------- | --------- | ------------------------ |
| bg      | `#ffffff` | 純白底，投影 / 螢幕都清楚 |
| text    | `#1f2328` | 主文字                   |
| accent  | `#2563eb` | 沉穩藍：標題底線、頁碼、重點 |
| muted   | `#6b7280` | 次要文字、圖說           |
| surface | `#f6f7f9` | 卡片 / 區塊底            |
| line    | `#e5e7eb` | 分隔線                   |

## Typography

- Display font：`"PingFang TC", "Noto Sans TC", -apple-system, "Inter", system-ui, sans-serif` — 標題 weight 700–800。
- Body font：同上 — 內文 weight 400。
- 系統 CJK 字，免載 webfont。採 slide-authoring 預設字級（heading 64–72、body 36，組內報告偏資訊密一點可到 standard 密度）。

## Layout

- Content padding：左右 120px、上下 100px。
- 對齊：左對齊、單欄為主；條列用 ≤5 點。中英文與數字間加半形空格。

## Fixed components

paste-ready，整段複製進使用此主題的投影片。

### Title

```tsx
const Title = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.2, margin: 0, color: '#1f2328', borderLeft: '8px solid #2563eb', paddingLeft: 28 }}>
    {children}
  </h2>
);
```

### Eyebrow

```tsx
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: '0.12em', color: '#2563eb', marginBottom: 20 }}>
    {children}
  </div>
);
```

### Footer

頁碼一律用 `useSlidePageNumber()`，不要寫死。

```tsx
import { useSlidePageNumber } from '@open-slide/core';

const Footer = ({ label = '' }: { label?: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div style={{ position: 'absolute', left: 120, right: 120, bottom: 56, display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#6b7280' }}>
      <span>{label}</span>
      <span style={{ color: '#2563eb' }}>{current} / {total}</span>
    </div>
  );
};
```

## Motion

- 哲學：static 為主（組內報告求快求清楚），需要時頂多用一個淡入。
```css
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
```

## Aesthetic

中性、乾淨、好讀。白底 + 一個沉穩藍，標題用左側色條帶出層次。不要裝飾、不要漸層、不要花俏轉場——這是工作報告，重點是同事三秒看懂。一頁一個重點，條列簡短。

## Example usage

```tsx
const Cover: Page = () => (
  <div style={{ width: '100%', height: '100%', background: '#ffffff', color: '#1f2328', padding: '100px 120px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Eyebrow>WEEKLY · W24</Eyebrow>
    <h1 style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.15, margin: 0 }}>本週進度與下週規劃</h1>
    <p style={{ fontSize: 36, color: '#6b7280', marginTop: 28 }}>產品設計組</p>
    <Footer label="本週進度" />
  </div>
);
```
