# Hming Portfolio — Design System

> 這份文件是我的設計語言。記錄的不只是「目前長什麼樣」，更是「為什麼這樣選」。
> 任何人（AI 或真人）要幫我維護或新增內容，讀完這份文件才能動手。

---

## 1. 設計靈魂

### 我在面對誰

這個作品集的主要訪客是 **IoT、Web3、金融科技產業的設計主管或招募人員**。這些產業的產品不花俏，但內行人一眼就能看出設計有沒有深度。我的網站要能通過他們的眼光。

### 我希望給人的第一印象

**「這個人很仔細，有品味，而且做過真東西。」**

不是要讓人說「哇好酷」，而是讓人說「哇，做得很扎實」。成熟的設計師不靠視覺特效說話，靠的是每個細節都有理由。

### 品牌個性的三個關鍵字

| 關鍵字 | 意思 |
|---|---|
| **有滯度** | 不是看過就忘的視覺，有一定的重量感和層次，讓人願意停下來看 |
| **不冰冷** | 有溫潤感，不是冷硬的科技風；像跟一個有經驗的人對話，專業但不距離 |
| **克制有個性** | 像正裝點綴小配件——Hero 區域的角色徽章就是這個精神的代表，低調但讓人發現時會會心一笑 |

### 動畫哲學

**主頁 + 自我介紹：有動畫。**
入場動畫讓首次造訪的人感受到網站有生命感，是第一印象的一部分。

**專案介紹頁：克制，幾乎沒有動畫。**
面試官在看我的作品時，他的注意力應該在案子上，不在特效上。多餘的動畫反而會讓人覺得設計師在用花俏掩蓋實力。

### 專案視覺的核心規則

> **顏色可以換，框架不變。**

每個專案有自己的主色調，標籤、按鈕、強調色跟著走——但卡片格式、資訊架構、排版結構保持一致。
這樣做有兩個好處：每個案子有個性，同時整體作品集看起來有系統感；而且加新案子時不用每次重新設計版面，才不會做得又慢又痛苦。

---

## 2. 色彩系統

所有 token 定義在 `app/globals.css` 的 `:root`，改顏色永遠改 token，不要直接寫 hex 在元件裡。

### 2.1 基礎色票

| Token | Hex | 用途 |
|---|---|---|
| `--paper` | `#ffffff` | 頁面底色、卡片底色 |
| `--ink` | `#343434` | 主要文字。不用純黑，這個深灰讓字更柔一點 |
| `--muted` | `#8e8e9c` | 次要文字、placeholder、輔助說明 |
| `--line` | `rgba(0,0,0,0.08)` | 分隔線，透明度做的，不死硬 |
| `--surface` | `#f2f2f7` | 輸入框底色、tab 背景、標籤底色、卡片 placeholder 背景 |
| `--disabled` | `#dedee4` | 停用狀態，用這個告訴訪客「這個案子還沒公開」 |

### 2.2 品牌主色：Purple

| Token | Hex | 用途 |
|---|---|---|
| `--purple` | `#5d62d8` | CTA 按鈕底色、active 狀態、年份 rail 當前項目 |
| `--purple-soft` | `#dbdcff` | 表單 focus ring、highlight 背景色 |
| `--purple-hover` | `#4f54c9` | 按鈕 hover 狀態（比 purple 深一階） |

這個紫色是我自己選的，不改。飽和度夠但不俗氣，在以白色為底的頁面上很顯眼，又不像橘紅色那麼刺激。
它的地位：**所有「我希望你點這裡」的地方**。

### 2.3 其他 Accent 色票

| Token | 深色 | 淺色 soft | 角色 |
|---|---|---|---|
| Blue | `#416484` | `#dce5ed` | 次要強調，比 purple 更沉穩 |
| Brown | `#705650` | `#e8e2e0` | 個人特質區塊（traits panel），帶一點溫度 |
| Green | `#477a6b` | `#d6ebe3` | 備用，特定標籤用 |
| Peach | `#a83b1e` | `#fce8e2` | 特定專案的主色調 |

### 2.4 頁面特定色（不可跨區塊使用）

這些顏色只在特定區塊出現，不能當作通用 accent 使用。

| Token | Hex | 限定用途 |
|---|---|---|
| `--about-accent` | `#ffd467` | About 深色 window 內的標題文字。深色背景專用，不在其他地方使用 |
| — | `#d4e2f1` | About 成長故事「藍色卡片」背景。只用於這一張卡 |
| — | `#fff3e0` | About 成長故事「橘色卡片」背景。只用於這一張卡 |

### 2.4 每個專案的 Tone 色

每個專案卡片有自己的 `tone-xxx` class，定義標籤背景色、標籤文字色、CTA 按鈕色。
**加新專案時，在 `globals.css` 新增一個 `.tone-新專案名` 的段落，不要改到其他 tone。**

| Class | 標籤文字色 | 標籤底色 | 按鈕色 | 狀態 |
|---|---|---|---|---|
| `tone-brown` | `#705650` | `#e8e2e0` | `#dedee4` | 未上線 |
| `tone-green` | `#477a6b` | `#d6ebe3` | `#dedee4` | 未上線 |
| `tone-peach` | `#a83b1e` | `#fce8e2` | `#a83b1e` | 上線 |
| `tone-navy` | `#416484` | `#dce5ed` | `#416484` | 上線 |
| `tone-advantech` | `#004b85` | `#d9f1ff` | `#00548a` | 上線 |
| `tone-icecream` | `#aa2d53` | `#ffe2ea` | `#eb80a0` | 上線 |
| `tone-laushu` | `#3b3475` | `#f5eeff` | `#4f59c5` | 上線 |
| `tone-thesis` | `#2d462a` | `#e6ffe3` | `#6faa68` | 上線 |

---

## 3. 字體規則

### 3.1 字型選擇

```css
/* 主要字型（body、heading 全站適用） */
font-family: var(--font-space-grotesk), sans-serif;

/* 年份數字（About 頁時間軸） */
font-family: var(--font-roboto-condensed), var(--font-space-grotesk), sans-serif;
```

**Space Grotesk（主要字型）：** 幾何感但有個性，字母造型比一般 sans-serif 更特別，筆畫末端的小細節讓它在乾淨的排版裡仍然有辨識度。適合我目標的 IoT / Web3 / 金融科技產業——夠專業，但不像 IBM Plex Sans 那麼「公司感」。

**Roboto Condensed（年份 / 特定英文元素）：** 壓縮字寬，適合大字號的數字和年份顯示。About 頁時間軸的年份導覽用這個，視覺節奏感強。

**中文 fallback：** Space Grotesk 不支援中文字，中文內容自動 fallback 到各作業系統的預設 `sans-serif`（macOS 是 PingFang，Windows 是 Microsoft JhengHei，Android 是 Noto Sans CJK）。不指定特定字型名稱，讓系統自己選最適合的。

兩個字型都透過 `next/font/google` 載入（定義在 `app/layout.tsx`），CSS variable 分別是 `--font-space-grotesk` 和 `--font-roboto-condensed`。

### 3.2 字型比例

| 層級 | 桌機字號 | 手機字號 | 字重 | 用途 |
|---|---|---|---|---|
| H1 主標題 | `40px` | `32px` | `600` | Hero 主標題，全站只出現一次 |
| Headline | `32px` | `24px` | `600` | Section 標題、Hero 強調句 |
| H3 | `24px` | `20px` | `600` | 卡片標題、段落標題 |
| 專案名稱 | `20px` | `16px` | `500` | 專案卡片內的名稱、職稱 |
| Body Large | `20px` | `16px` | `400` | Hero intro，主要說明文字 |
| Body | `16px` | `14px` | `400–500` | 段落正文、表單 |
| Label | `14–16px` | `14px` | `500` | 導覽連結、標籤、輔助說明 |
| Caption | `12px` | `12px` | `500` | Footer 版權文字 |

### 3.3 行高

| 用途 | 行高 | 說明 |
|---|---|---|
| 大標題（h1、headline） | `1.4` | 基礎樣式。桌機 media query 會進一步收到 1.2–1.28 |
| 卡片標題（h3） | `1.4` | |
| Hero intro / body large | `1.4–1.45` | |
| 說明文字、內文 | `1.4` | |
| 按鈕、標籤、導覽 | `1` | 單行，不設行高 |

---

## 4. 元件樣式

### 4.1 按鈕

形狀：Pill（`border-radius: 200px`），高度 `min-height: 48px`

| 類型 | 底色 | 文字色 | 邊框 |
|---|---|---|---|
| Primary | `#5d62d8` | `#ffffff` | — |
| Secondary | `transparent` | `--ink` | `2px solid --ink`（手機 `3px`）|
| Disabled | `#dedee4` | `#ffffff` | — |

Hover：`translateY(-2px)` 微浮起，`180ms ease`。Hover 底色換 `var(--purple-hover)`。

**導覽列 resume 按鈕例外：** `min-height: 38px`（比標準小 10px）。原因是導覽列高度只有 80px，38px 讓按鈕在 nav 內比例正確，不顯得過大。這是唯一的例外，其他按鈕一律 48px。

---

### 4.2 專案卡（最重要的元件）

```
border-radius: 10px（桌機）/ 12px（手機）
aspect-ratio: 16/9，min-height: 500px（桌機）
背景預設：#f2f2f7
```

**桌機 Hover — 三層聯動，同時觸發：**
1. 圖片放大 `scale(1.03)`，`420ms ease`
2. 黑色蒙層出現，`opacity: 0.18`，`260ms ease`
3. Info panel 從右側滑入，`translate(0, -50%)`，`360ms ease`

Info panel 寬 `348px`，包含：品牌 logo → 專案名稱 → 副標 → 描述 → 標籤 → CTA 按鈕，這個順序不要亂。

**手機版：** Info panel 靜態顯示在圖片下方，logo / 描述 / 標籤全部隱藏，只留 CTA 按鈕。手機訪客目標是點進去看，不是在卡片上讀文字。

---

### 4.3 導覽列

```
height: 80px
background: rgba(255,255,255,0.94) + backdrop-filter: blur(16px)
position: fixed，z-index: 20
```

向下滾動加 `.is-hidden` → 消失（`opacity: 0` + `translateY(-100%)`），停止滾動恢復。
讓訪客閱讀內容時有完整的視窗高度，不被固定導覽列佔去空間。

---

### 4.4 輸入框（聯絡表單）

```
background: #f2f2f7
border-radius: 8px
padding: 15px
font-size: 16px，font-weight: 500
```

Focus：`box-shadow: inset 0 0 0 2px --purple-soft`，用 soft 版的紫色，不用主色本身，避免太搶眼。

---

### 4.5 標籤（Tags）

| 類型 | 圓角 | 內距 | 用途 |
|---|---|---|---|
| 專案標籤 | `4px` | `4px 8px` | 卡片裡的技能標籤，顏色跟 tone class 走 |
| 技能標籤 | `8px` | `12px 24px` | About 頁技能列表，底色 `#f2f2f7` |

---

## 5. 排版原則

### 5.1 頁面橫向邊距

```css
padding-inline: clamp(48px, 8vw, 120px);  /* 桌機 */
padding-inline: 24px;                       /* 手機 ≤809px */
```

### 5.2 Breakpoints

| 名稱 | 條件 | 主要變化 |
|---|---|---|
| Desktop | `≥1024px` | 多欄並排，完整 hover 效果 |
| Tablet | `810–1023px` | 縮小欄寬和圖片 |
| Mobile | `≤809px` | 全部單欄，漢堡選單，卡片 hover 改靜態 |

### 5.3 間距系統（以 8px 為基準）

| 值 | 用途 |
|---|---|
| `10–12px` | 標籤間距、badge 間距、細節間距 |
| `16px` | 標題子元素間距、project info 內部欄位間距 |
| `24px` | 卡片欄間距、表單欄位間距、行動版卡片間距 |
| `32px` | Section heading 與周邊的 gap |
| `40px` | Experience 卡片列表 gap（5×8）|
| `48px` | 大型 Section 內距、卡片 padding（桌機）、Section heading 上下 padding |
| `64px` | About window body 的欄距 |
| `80px` | Hero 圖片與文字的橫向 gap（行動版） |

**Section 頂部 padding 特例（不走 48px 系統）：**

| Section | 桌機頂部 padding | 手機頂部 padding | 原因 |
|---|---|---|---|
| Hero | `112px` | `140–180px` | 需要完全蓋過固定導覽列（80px）並留足夠視覺呼吸空間 |
| About | `48px`（含 80px 導覽高度補償）| `48px` | 標準 section |
| Contact | — | — | 無頂部 padding，由 Hero image 佔滿 |

**導覽列補償：** 因為導覽列固定在頂部（高 80px），所有 Section 的頂部 padding 都需要至少多 80px 避免內容被蓋住。Hero 刻意加更多是為了視覺戲劇感。

### 5.4 最大寬度

- Hero copy：`max-width: 820px`
- Intro 段落：`max-width: 780–860px`
- Contact card：`min(540px, 100%)`

---

## 6. 深度與陰影

陰影只用 `rgba(0,0,0,x)`，不用有色陰影。整體保持乾淨，不是要讓人注意到陰影本身。

| 層級 | CSS 值 | 用途 |
|---|---|---|
| 輕 | `0 10px 20px rgba(0,0,0,0.12)` | Experience / Traits / Skills / Education 卡片 |
| 中 | `0 10px 40px rgba(0,0,0,0.12)` | 故事卡片、About window |
| 重 | `0 40px 80px rgba(0,0,0,0.25)` | Contact card（整頁的焦點元素） |
| 多層（柔和） | `0 0.6px 0.6px rgba(0,0,0,0.12), 0 2.3px 2.3px rgba(0,0,0,0.12), 0 10px 10px rgba(0,0,0,0.12)` | 專案 Info panel，多層讓邊緣更自然 |
| 偏移（像實體照片） | `-5px 10px 20px rgba(0,0,0,0.12)` | About 頁的 Polaroid 照片 |

---

## 7. Do's and Don'ts

### ✅ 要這樣做

- **顏色換，框架不換**：新增專案時只建新的 `tone-xxx` class，卡片排版結構不動
- **改顏色用 token**：一律 `var(--purple)`，不要直接寫 hex（tone class 裡的 hex 是例外）
- **陰影分層**：重要元素用重陰影，次要用輕陰影，同一頁不要全部同一個值
- **留白要夠**：文字不要貼著容器，最少 `24px` 內距
- **每個互動狀態都要有**：hover、active、focus、disabled 都要到位，哪怕只是微小位移
- **動畫有它的邊界**：首頁和 About 可以有入場動畫，到專案頁就收手

### ❌ 不要這樣做

- **不要在專案頁加主動動畫效果**：面試官要看的是設計，不是特效
- **不要每個新專案都重新設計版型**：顏色換就好，卡片格式保持一致，不然做案子會很痛苦
- **不要用純黑**：文字最深用 `--ink (#343434)`，不用 `#000000`
- **不要讓 accent color 大面積出現**：`--purple` 只用於 CTA 和 active，不當區塊底色
- **不要在手機版保留 hover-only 的互動**：hover 效果要改成靜態或點擊觸發
- **不要讓未上線的案子看起來可以點**：一定要用 `--disabled` 底色，讓訪客知道這個案子還沒開放
- **不要用超過 H1 的字號（40px 以上）**：除非在很特殊的情況，不然視覺層級會亂
