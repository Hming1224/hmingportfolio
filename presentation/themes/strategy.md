---
name: 策略 / 提案
description: 沉穩有重量的近黑底簡報主題，配電光藍強調與大重點數字；適合對客戶 / 利害關係人做策略、提案、競品分析。
---

# 策略 / 提案

給客戶 / 利害關係人看的策略提案簡報。論述導向：用重點數字、比較頁、章節分隔撐起說服力。調性沉穩有重量，像 Ours AI 策略簡報那種。

## Palette

| Role    | Value     | Notes                          |
| ------- | --------- | ------------------------------ |
| bg      | `#0d0f14` | 近黑底，沉穩                   |
| text    | `#f5f6f8` | 主文字                         |
| accent  | `#6d8cff` | 電光藍：關鍵字、重點數字、眉標 |
| muted   | `#8b909e` | 次要文字、圖說                 |
| surface | `#161a22` | 卡片 / 區塊底                  |
| line    | `rgba(255,255,255,0.10)` | 分隔線          |

## Typography

- Display font：`"PingFang TC", "Noto Sans TC", -apple-system, "Inter", system-ui, sans-serif` — 標題 weight 800–900。
- Body font：同上 — 內文 weight 400–500。
- 系統 CJK 字，免載 webfont。重點數字（big number）可拉到 200–240px。其餘採 slide-authoring 預設。

## Layout

- Content padding：左右 140px、上下 120px。
- 對齊：左對齊主述、比較頁用兩欄。
- 章節分隔頁用近黑底 + 一個大章節編號 + 標題。中英文與數字間加半形空格。

## Fixed components

paste-ready，整段複製進使用此主題的投影片。

### Title

```tsx
const Title = ({ children }: { children: React.ReactNode }) => (
  <h1 style={{ fontSize: 100, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0, color: '#f5f6f8' }}>
    {children}
  </h1>
);
```

### Eyebrow

```tsx
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '0.16em', color: '#6d8cff', marginBottom: 28 }}>
    {children}
  </div>
);
```

### BigNumber（重點數字，策略簡報常用）

```tsx
const BigNumber = ({ value, label }: { value: string; label: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <span style={{ fontSize: 220, fontWeight: 900, lineHeight: 1, color: '#6d8cff', letterSpacing: '-0.03em' }}>{value}</span>
    <span style={{ fontSize: 34, color: '#8b909e' }}>{label}</span>
  </div>
);
```

### Footer

頁碼一律用 `useSlidePageNumber()`，不要寫死。

```tsx
import { useSlidePageNumber } from '@open-slide/core';

const Footer = ({ label = '策略提案' }: { label?: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div style={{ position: 'absolute', left: 140, right: 140, bottom: 60, display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#8b909e' }}>
      <span>{label}</span>
      <span>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </div>
  );
};
```

## Motion

- 哲學：subtle — 章節切換可用安靜的上浮 / 淡入，重點數字可單獨淡入強調。
```css
@keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
```

## Aesthetic

沉穩、有重量、論述清楚。近黑底讓電光藍與大數字跳出來。不要花俏漸層、不要超過一個強調色、不要每頁不同轉場。重點：一頁一個論點，用數字與比較把話講硬。提案結尾頁可放下一步 / CTA 與 Email `hmingdesigner@gmail.com`。

## Example usage

```tsx
const Cover: Page = () => (
  <div style={{ width: '100%', height: '100%', background: '#0d0f14', color: '#f5f6f8', padding: '120px 140px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Eyebrow>STRATEGY · 2026</Eyebrow>
    <Title>用 AI 把客服回應時間砍到三分之一</Title>
    <p style={{ fontSize: 38, color: '#8b909e', maxWidth: 1200, marginTop: 32, lineHeight: 1.5 }}>
      一份從現況痛點到落地路徑的提案
    </p>
    <Footer />
  </div>
);

const Impact: Page = () => (
  <div style={{ width: '100%', height: '100%', background: '#0d0f14', color: '#f5f6f8', padding: '120px 140px', display: 'flex', alignItems: 'center', gap: 120 }}>
    <BigNumber value="68%" label="回應時間下降" />
    <BigNumber value="3.4x" label="每人處理量提升" />
    <Footer />
  </div>
);
```
