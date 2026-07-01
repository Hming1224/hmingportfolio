# 03 — Components

這份文件保存可重複使用 UI 元件的樣式規範、狀態、尺寸與使用邊界。

## 7. 元件樣式

> 原子元件（按鈕 / 輸入框 / tag / 專案卡）另有對齊 Google `design.md` 的**機器可讀 `components:` 定義**，見文件最前面的 TOKENS 區塊；狀態（hover / active / disabled）在那邊各自一條 entry。下面的散文版補充「為什麼」與複合行為。

### 7.1 按鈕（`components/ui/Button.tsx`）

**形狀**：Pill `border-radius: 200px`（見 6.1）。

#### Contract: Button

`Button` 表示 command / action control：submit、save、copy、confirm、destructive action 等。

- 沒有 `href` 時，`components/ui/Button.tsx` renders native `<button>`。
- 適用於在當前頁面中觸發操作，而不是導向另一個 destination。
- `loading` / `disabled` command state 只適用於 real Button。
- `danger` 只用於 destructive / high-risk command action。

#### Contract: LinkButton

`LinkButton` 是 usage contract，不是獨立 component；目前仍使用 `components/ui/Button.tsx` with `href`。

- 有 `href` 時，語意上是 navigation，不是 command。
- 適用於 internal route、hash anchor、external URL、`mailto:`、`tel:`。
- 不建議使用 `loading` state；如果 navigation 需要 pending feedback，應由 route / navigation pattern 處理。
- External LinkButton 在目的地不明顯時可加入 external affordance，但目前不強制。

#### CTA usage role

CTA 是 usage role，不是 component。CTA 可以是 Button，也可以是 LinkButton，取決於語意。

- Conversion navigation（例如「查看作品」、「了解更多」）是 LinkButton。
- Form submit（例如「送出」）是 Button。
- Primary CTA 使用 shared purple treatment，不跟 project tone。
- Prefer one primary CTA per section or decision moment.
- Disabled CTA placeholder 必須不可點，使用 disabled Button behavior。
- 在重複 anatomy / behavior 尚未穩定前，不新增 CTA component。

#### Loading / disabled / danger

- `loading` 只建議用於 real Button actions。
- `disabled` 表示 non-interactive。
- `disabled` 不應該用來 styling 仍可導航的 anchor。
- `danger` 只用於 destructive / high-risk command action。
- `danger` 不用於一般 navigation、普通強調、或 project tone。
- Disabled project placeholders 不應該看起來可點擊。

#### Exclusions

以下不屬於本 Button / LinkButton primitive contract；可以在未來做 token audit，但不要合併成 Button variant：

- ProjectCard CTA layout and hover overlay
- `ZoomableImage`、media、video、lightbox controls
- mobile menu button
- language switcher trigger and menu items
- `CaseProposalTabs` tabs、carousel nav、dots
- Project tabs
- `CaseTOC` links

#### 尺寸階層（sm / md / lg）
| 階層 | 桌機 ≥1024 | 平板 769–1023 | 手機 ≤768 | 左右 padding | 字級 | 用在哪 | 對應 class |
|---|---|---|---|---|---|---|---|
| **sm** | `38px` | `38px` | `38px` | `24px` | `14px`（`--fs-sm`）| 緊湊 / 常駐入口 | `<Button size="sm">` |
| **md（預設）** | `52px` | `48px` | `44px` | 桌機 `28px`、平板/手機 `24px` | 桌機/平板 `--fs-body`、手機 `--fs-sm` | 絕大多數 CTA：Hero、案例頁 | `<Button>` |
| **lg（全寬）** | `52px`，`width:100%` | `48px`，`width:100%` | `44px`，`width:100%` | 桌機 `14px 0`、平板/手機 `12px 0` | 桌機/平板 `--fs-body`、手機 `--fs-sm` | 卡片 CTA、聯絡送出 | `<Button size="lg">` |

- md 以 52 / 48 / 44 依斷點收斂；sm 38px 為緊湊情境（目前無按鈕在用）；lg 不是更高，是「撐滿容器寬」的變體。
- 字重統一 `600`，由共用 `Button` 管理。

> **跨斷點規格（2026-06-20 共用元件化）★**：`Button` 的 md / lg 採 **桌機 52px / 平板 48px / 手機 44px**。桌機與平板字級用 `--fs-body`，手機字級用 `--fs-sm`，全程使用既有 type token。
> - 歷史踩坑：手機曾把字級跳到 `20px`、高度漂移成 `52 / 56 / 43px`（primary 52、secondary 56、project-button 43），各斷點不一致。2026-06-08 後改為刻意的 52 / 48 / 44 分階，而不是漂移。
> - 高度用 `min-height`（`box-sizing: border-box`，含 padding 不爆高）；尺寸與字級由 `Button` 的 `.ds-button-*` 集中管理。
> - Hero 按鈕在平板保留 `min-width: 136px`、`padding: 12px 28px`（控制 Hero 視覺比例）。
> - 手機（≤768）md / lg 轉 `width: 100%` 全寬、高度 44px。多按鈕並排堆疊時（如 Hero、案例頁底部），**Primary 應優先顯示在上方**，Secondary 排在下方。

#### 語意三層（顏色變體，與尺寸正交組合）
| 變體 | 底色 | 文字色 | 描邊 | 語意 | class | 實際用在哪 |
|---|---|---|---|---|---|---|
| Primary（紫）| `--purple` | `#fff` | — | 轉換型 CTA（最希望點）| `variant="primary"`（預設）| Hero「查看作品」、專案卡 CTA、聯絡送出 |
| Secondary | 白 → hover `--purple-light` | `--muted` → hover `--purple` | 灰邊 `inset 0 0 0 2px var(--line-strong)`，hover 轉 `--purple` | 次要（outline 風）| `variant="secondary"` | Hero「我的歷程」、案例頁「返回首頁」 |
| Disabled | `--disabled` | `#fff` | — | 無連結 / 不可操作 | `disabled` | 未上線專案與未上線 next-project CTA |

> **Secondary 樣式**：outline 風——白底、灰字（`--muted`），描邊用 `box-shadow: inset 0 0 0 2px var(--line-strong)`（非 `border`，不撐大外尺寸），hover 時邊框與文字轉紫，底色變為極淺紫 `--purple-light`（2026-06-10 更新一致化設計）。**邊框刻意比文字（`--muted`）淡一階**：原本沿用 copy-btn 的 `2px var(--muted)`（邊＝字同色）覺得太重，改用新 token `--line-strong`（比 `--line` 明顯、比 `--muted` 淡）。
> **紫色語意**：紫色＝「希望訪客轉換」的 CTA（看作品、聯絡送出、看專案）。同屏盡量一顆紫色主按鈕。

#### Hover（全站統一，不位移只變色，`180ms ease`）
| 變體 | Hover |
|---|---|
| Primary（紫）| 底色加深 → `--purple-hover` |
| Primary（黑）| 底色變淺 → `--ink-hover` `#555`（黑已最深，只能往淺）|
| Secondary | 邊框、文字轉紫 → `--purple`，底色變淺紫 → `--purple-light`（對齊語系與複製按鈕）|

#### 用法
- 全站只有 CTA 用紫色，一屏盡量一顆紫色主按鈕。
- **導覽列履歷已改成純文字連結**（不再是紫色按鈕），與其他 tab 同款，見 7.3。
- **用詞**：動詞/名詞短語、簡短。避免同詞指不同目的地（Hero 用「我的歷程」進關於我頁；專案卡 hover 用「了解更多」進案例頁）。

### 7.2 專案卡（`.project-card`，最重要元件）
```
border-radius: 12px
aspect-ratio: 16/9，min-height: 500px（桌機）
背景預設：var(--surface) #f9f9f9
```
**桌機 Hover — 三層聯動同時觸發：**
1. 圖片 `scale(1.03)`，`420ms ease`（`.project-image`）
2. 黑色蒙層 `opacity: 0.18`，`260ms ease`（`.project-scrim`）
3. Info panel 從右滑入 `translate(0,-50%)`，`360ms ease`（`.project-info`，寬 `348px`）

Info panel 內容順序：品牌 logo → 專案名稱 → 副標 → 描述 → 標籤 → CTA，不要亂。
**手機版**：Info panel 靜態在圖片下方，logo/描述/標籤隱藏，只留 CTA（lg 全寬）。

### 7.3 導覽列（`.site-nav` / `.nav-links`）
```
height: 80px
background: rgba(255,255,255,0.94) + backdrop-filter: blur(16px)
position: fixed，z-index 高
```
向下滾動加 `.is-hidden` → 消失，停止滾動恢復。手機用漢堡選單（`.menu-button`），展開高度由 `--mobile-nav-open-height: 336px` 控制。
**連結**：設計案例 / 關於我 / 聯絡資訊 / 下載履歷——四個都是同款純文字連結（`.nav-links a`）。下載履歷連到 PDF（`/黃宣銘_中文履歷.pdf`），**2026-06-08 從紫色按鈕改成純文字連結**，與其他 tab 一致。
> **導覽列補償**：因固定高 80px，所有 Section 頂部 padding 需多 80px 避免被蓋。

### 7.4 輸入框（聯絡表單，`.form-field input/textarea`）
> ⚠️ 2026-06-08 依實際 code 重寫。`components/Contact.tsx` 近期有改動，表單若再調要同步此段。

採 **floating label** 設計。
```css
background: var(--surface);
border: 1px solid var(--line);
border-radius: 12px;
padding: 22px 16px 8px;        /* 上方多留空間給浮動 label */
font-size: 16px; color: var(--ink);
/* textarea 額外：min-height 180px、垂直可拉伸 */
```
**Label 浮動**：focus / 有值 → `translateY(-12px) scale(0.75)`、轉 `--purple`、字重 600。
**Focus**：`background:#fff; border-color: --purple; box-shadow: 0 0 0 3px --purple-soft`（外環，非 inset）。

### 7.5 標籤（Tags）
| 類型 | 圓角 | 內距 | 用途 | 對應 |
|---|---|---|---|---|
| 專案標籤 | `4px` | `4px 8px` | 卡片技能標籤，色跟 tone 走 | `.project-tags span` |
| 技能標籤 | `8px` | `12px 24px` | About 技能列表，底色 `--surface` | About skills |

### 7.6 區域 token 元件範例（`.skill-category-card`）
About 頁技能卡是「元件自帶區域 token」的範本：
```css
.skill-category-card {
  --accent-color: var(--purple);     /* 預設紫，可被覆寫換色 */
  --bg-color-tint: rgba(0,0,0,0.04);
  --border-color-tint: rgba(0,0,0,0.12);
  border-radius: 16px; padding: 28px 24px;
}

.skill-category-card.is-user-research {
  --accent-color: #4a90e2;
  --bg-color-tint: rgba(74,144,226,0.04);
  --border-color-tint: rgba(74,144,226,0.12);
}
```
> 新做「同款但不同主色」的卡片時，在 CSS 新增 `.skill-category-card.is-*` variant 覆寫這 3 個區域 token；TSX 只掛 class，不把 hex / rgba 寫進資料陣列。

### 7.7 Case Study Patterns（`components/case-study/`）

- 一般卡片 / 網格 / 媒體：使用 `CaseCard`、`CaseGrid`、`CaseMedia`，結構 class 為 `cs-card-*`、`cs-grid-*`、`cs-media-*`。
- 段落 lead：使用 `cs-section-lead`；文字色透過 `--cs-section-lead-*` token 調整，不再新增 `ca-lead` / `ca-narrow`。
- 方案展示：使用 `CaseProposalTabs variant="solution" | "wireframe"`；DOM 與樣式只使用 `cs-proposal-*`，theme 差異透過 variant modifier 與 custom properties 控制，不再新增 `cs-sol-tab-*` 或 `ca-wf-*`。提案 banner 使用 `cs-proposal-banner-*`，route 只提供顏色 token。
- 前後比較：使用 `CaseBeforeAfter` 與 `cs-before-after-*`；桌機橫排、`≤768px` 直排，箭頭方向由共用 RWD 控制。
- 流程外框：使用 `CaseFlowFrame variant="default" | "plain" | "split"` 與 `cs-flow-frame-*`；default 為有框說明圖、plain 為無框矩陣容器、split 為 header / scroll panel 分離。route 只提供內容圖形、最小寬與必要 caption / header theme。
- 功能步驟：使用 `CaseFeatureRow`；原型展示用 `cs-feature-row--prototype`，媒體與說明框不得再掛 `cs-sol-fr` / `cs-sol-fimg` / `cs-sol-fnote`。

#### CaseMedia contract

`CaseMedia` owns only the shared media container anatomy:
- `<figure>`
- `.cs-media-frame`
- optional `.cs-media-caption`

`CaseMedia` does not own image crop, aspect ratio, `object-fit`, route-specific showcase layout, video-specific behavior, or diagram / flow / matrix geometry.

#### ZoomableImage contract

`ZoomableImage` owns shared image display, zoom trigger, and image lightbox behavior.

It owns:
- image display through `next/image`
- zoom trigger
- localized trigger / close labels
- lightbox overlay
- dialog semantics
- Escape close
- backdrop close
- body scroll lock

It does not own route-specific crop / ratio, showcase composition, video playback, video lightbox behavior, or flow / matrix / diagram layout.

#### Lightbox behavior

Lightbox controls are media controls, not Button / LinkButton / CTA.

Image lightbox and video lightbox should not be merged unless anatomy, behavior, and accessibility requirements are proven consistent. `ZoomableImage` is the shared image-lightbox contract. Crypto `FinalVideo` and other video media remain local components until a separate video media contract is approved.

#### Accessibility notes

Current `ZoomableImage` includes:
- trigger `aria-label`
- lightbox `role="dialog"`
- `aria-modal="true"`
- localized close label
- Escape close
- backdrop close

Known future improvement:
- If focus trap / return-focus behavior is not implemented in code, document it as a future accessibility improvement rather than claiming it exists.

#### Exclusions

Do not include these in the `ZoomableImage` / image lightbox contract:
- video playback
- video lightbox behavior
- native video controls
- route-specific showcase layout
- document preview layout
- prototype preview layout
- image crop / aspect ratio / object-fit
- flow / matrix / diagram geometry
- FlowScrollHint / overflow affordance
- Button / LinkButton / CTA primitive behavior

---

---

## 14. Icon System

- 唯一 icon library：`lucide-react`。
- Inline icon 預設 `16px`；standalone icon 預設 `20px`。
- 一般 `strokeWidth={1.5}`；需要更強視覺權重時用 `2`。
- 新元件禁止手寫 inline SVG。既有案例頁的專案專屬 SVG 圖表不在此限，因其屬內容資產，不是 UI icon。
- Icon-only button 必須有可讀的 `aria-label`。

---

## 17. Form 與 Feedback 元件

- `Button`：`primary | secondary | danger`，支援 `loading`；loading 必須設 `aria-busy`、停用重複提交並保留原按鈕寬度。
- Input：default / focus / error / success；錯誤訊息使用 `--hm-error` + `--fs-xs`，並用 `aria-describedby` 連到欄位。
- `Select`、`Checkbox`、`Radio`：必須包含 default / hover / focus / checked / disabled / error。
- `Alert` / `Toast`：使用 success / warning / error / info 四種 status token。
- `Modal`：ESC 關閉、backdrop 點擊關閉、focus trap、關閉後焦點回到觸發元素。
- `Skeleton` 遵守 reduced-motion；`EmptyState` 結構為 icon + title + description + optional CTA。
