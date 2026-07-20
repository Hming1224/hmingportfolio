---
name: Hming Portfolio
description: 對齊 hmingdesign.com 正式站設計系統的簡報主題；個人品牌相關簡報（面試、作品集、自我介紹）一律用這套。
---

# Hming Portfolio

把 hmingportfolio 的 design system（`styles/tokens.css`）搬進簡報：白底、墨黑內文、品牌紫強調、Space Grotesk 標題字。給面試官 / HR 看的簡報要跟作品集網站是同一個人做的。

## Palette

| Role    | Value                | 對應 token          |
| ------- | -------------------- | ------------------- |
| bg      | `#ffffff`            | `--hm-paper`        |
| text    | `#343434`            | `--hm-ink`          |
| accent  | `#5d62d8`            | `--hm-purple-600`   |
| muted   | `#8e8e9c`            | `--hm-muted`        |
| line    | `rgba(0, 0, 0, 0.08)`| `--hm-line`         |
| surface | `#f9f9f9`            | `--hm-surface`（卡片底） |
| accent-soft | `#f0f1ff`        | `--hm-purple-50`（chip 底） |

## Typography

- Display / Body 同一組：`"Space Grotesk", "PingFang TC", "Noto Sans TC", -apple-system, system-ui, sans-serif`。
- Space Grotesk 只有 Latin，中文自動 fallback 到 PingFang TC——跟正式站行為一致。
- **字重上限 700**（Space Grotesk 沒有 800/900）；標題 700、強調 600、內文 400–500。
- Webfont 用 module top-level 注入（`osd-webfont-<slide-id>`），weights 只載 `400;500;600;700`：
  `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap`

## Layout

- Content padding：左右 160px、上下 120px。左對齊、單欄。
- 圓角：卡片 12px（`--hm-seed-radius-base`）；chip / 按鈕形元素用 pill（borderRadius 200，同站上 `.ds-button`）。
- 中英文與數字間加半形空格。

## Fixed components

paste-ready，整段複製進使用此主題的投影片（範例見 `slides/interview-master/index.tsx`）。

### Eyebrow

```tsx
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '0.18em', color: '#5d62d8', marginBottom: 24 }}>
    {children}
  </div>
);
```

### Keyword chip（pill）

```tsx
const Keyword = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 32, fontWeight: 600, padding: '16px 40px', background: '#f0f1ff', color: '#5d62d8', borderRadius: 200, width: 'fit-content' }}>
    {children}
  </div>
);
```

### Footer

頁碼一律用 `useSlidePageNumber()`，不要寫死。

```tsx
import { useSlidePageNumber } from '@open-slide/core';

const Footer = ({ label = '黃宣銘 · 簡報' }: { label?: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div style={{ position: 'absolute', left: 160, right: 160, bottom: 64, display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#8e8e9c', borderTop: '1px solid rgba(0, 0, 0, 0.08)', paddingTop: 20 }}>
      <span>{label}</span>
      <span style={{ color: '#5d62d8' }}>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </div>
  );
};
```

## Motion

- 哲學：安靜。要動就只用淡入 / 上浮（180ms ease，對齊 `--hm-seed-duration-fast`），預設不加轉場。

## Aesthetic

- 乾淨留白、左對齊、一個紫色撐起強調；不要漸層、不要裝飾性 emoji。
- 作品截圖用 `<ImagePlaceholder>` 佔位讓 Hming 自己上傳。
- 結尾頁放 `https://hmingdesign.com` 與 `hmingdesigner@gmail.com`。

## 公司品牌切換（投遞時用）

投某公司時**不改公版**，複製成公司專屬副本再套品牌。公版（`intro-master`、`case-master`、`case-advantech`、`case-crypto`）永遠保持本主題的自家風格。

### Company profile 格式

每投一間建一份 `themes/company-<公司>.md`（frontmatter 要有 name / description）：

```markdown
---
name: <公司名>
description: <公司名>面試用品牌皮
---
| Token      | 值                          | 來源                    |
| ---------- | --------------------------- | ----------------------- |
| accent     | #xxxxxx                     | 官網主色 / brand guide  |
| accentSoft | #xxxxxx（accent 的淺色）    | 同上或自行調淡          |
| bg / text  | 預設白底墨黑，深色品牌再議   |                         |
| fonts      | <Google Fonts 名稱> + CJK fallback | 官網 computed font |
| logo       | assets/logos/<公司>.svg     | 官方 press kit，禁止截圖 |
調性備註：<一兩句，例如：科技感、圓潤、務實>
```

### 套用 checklist（一次約 5 分鐘）

1. 查對方官網主色與字體、下載**官方 Logo 檔**（press kit / SVG；NEVER 用截圖），存 `assets/logos/<公司>.svg`。
2. 建 `themes/company-<公司>.md`（照上面格式）；檢查 accent 對白底對比 ≥ 3:1，不足改用品牌深色變體。
3. 複製公版：`cp -r slides/intro-master slides/intro-<公司>`（專案簡報同理：`case-advantech` → `case-advantech-<公司>`）。
4. 改副本 `index.tsx` **頂部 BRAND TOKENS 區塊**：`FONT_LINK_ID`（換成新 slide id）、`design` palette 與 fonts、`accentSoft`、`COMPANY`、`FONT_HREF`；以及最上方的 `logo` import 路徑。頁面 JSX 一律不動。
5. 改 `meta`：`title` 加公司名、`theme: 'company-<公司>'`。
6. 填【公司名】相關內容：封面日期、職缺名稱、「為什麼是我」三個理由。
7. dev server 逐頁截圖驗證（字體 fallback、對比、無爆版）。

### 機制限制（為什麼是複製而不是切換器）

open-slide Design panel 的 AST 寫入器要求 `design` const 是**字面值**（禁止 spread / import 共用設定），所以品牌層用「複製＋抄值」而不是 runtime 切換。副本同時是該次面試的存檔，可回顧。

### 示範

`slides/intro-demo/` ＋ `themes/company-demo.md` 是一組完整示範（虛構公司 DemoCo，青綠色 + DM Sans），照著抄即可。
