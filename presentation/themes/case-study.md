---
name: 作品集 Case Study
description: 編輯風、留白多、米白底配單一暖色強調的作品集簡報主題；適合面試 / 業主提案時呈現作品脈絡與成效。
---

# 作品集 Case Study

給 HR / 業主 / 面試官看的作品集簡報。重點是「問題 → 決策 → 成效」的脈絡，不是堆設計術語。大量留白、單一暖色強調、適合放作品截圖。

## Palette

| Role   | Value     | Notes                          |
| ------ | --------- | ------------------------------ |
| bg     | `#faf8f3` | 米白底，溫潤不刺眼              |
| text   | `#1a1714` | 近黑主文字                     |
| accent | `#d4541e` | 暖橙：眉標、關鍵字、頁碼強調   |
| muted  | `#8a8377` | 次要文字、圖說、分隔線         |
| line   | `#e3ded4` | 細分隔線                       |

## Typography

- Display font：`"PingFang TC", "Noto Sans TC", -apple-system, "Inter", system-ui, sans-serif` — 標題 weight 800。
- Body font：同上 — 內文 weight 400–500。
- 系統 CJK 字，免載 webfont。Type-scale 採 slide-authoring 預設（hero 140–180、heading 64–80、body 36–40、caption 24）。

## Layout

- Content padding：左右 160px、上下 120px（留白是這個主題的靈魂）。
- 對齊：左對齊、單欄；編輯感。作品截圖可滿版或大圖佔右半。
- 中英文與數字間加半形空格。

## Fixed components

paste-ready，整段複製進使用此主題的投影片。

### Title

```tsx
const Title = ({ children }: { children: React.ReactNode }) => (
  <h1 style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.01em', margin: 0, color: '#1a1714' }}>
    {children}
  </h1>
);
```

### Eyebrow

```tsx
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '0.18em', color: '#d4541e', marginBottom: 24 }}>
    {children}
  </div>
);
```

### Footer

頁碼一律用 `useSlidePageNumber()`，不要寫死。

```tsx
import { useSlidePageNumber } from '@open-slide/core';

const Footer = ({ label = 'Case Study' }: { label?: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div style={{ position: 'absolute', left: 160, right: 160, bottom: 64, display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#8a8377', borderTop: '1px solid #e3ded4', paddingTop: 20 }}>
      <span>{label}</span>
      <span style={{ color: '#d4541e' }}>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </div>
  );
};
```

## Motion

- 哲學：subtle — 只用淡入 / 上浮，安靜不搶戲。
```css
@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
```

## Aesthetic

編輯雜誌感：大量留白、左對齊、一個暖色強調撐起重點。不要圓角過重、不要漸層、不要裝飾性 emoji。作品截圖用 `<ImagePlaceholder>` 佔位讓 Hming 自己上傳。結尾頁放作品集網址 `https://hmingportfolio.vercel.app/` 與 Email `hmingdesigner@gmail.com`。

## Example usage

```tsx
const Cover: Page = () => (
  <div style={{ width: '100%', height: '100%', background: '#faf8f3', color: '#1a1714', padding: '120px 160px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Eyebrow>CASE STUDY · 2026</Eyebrow>
    <Title>重新設計結帳流程，把放棄率砍半</Title>
    <p style={{ fontSize: 38, color: '#8a8377', maxWidth: 1200, marginTop: 32, lineHeight: 1.5 }}>
      一個從使用者訪談出發、四週迭代的產品設計專案
    </p>
    <Footer />
  </div>
);
```
