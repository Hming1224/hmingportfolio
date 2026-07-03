# 聯絡頁面 (Contact Me) 全面重構計劃書

> 建立時間：2026-06-07 21:46
> 類型：新功能
> 狀態：✅ 已完成（2026-06-30 歸檔）— Contact 頁已上線，雙欄版面 + floating label + Formspree 表單與 loading / success / error 狀態皆已實作運作於正式站；後續資料化由 `2026-06-09-data-structure-refactoring` 接手。

---

## 你要做的事（一句話版）

重構聯絡頁面為精緻的雙欄分割版面，左側展示社群連結卡片與 Email 複製，右側表單串接 Formspree 實體收信，並加入浮動標籤、Loading 及成功打勾等全套動效。

## 背景和動機

現有的聯絡頁面版面單一且表單無實際發送功能（亦無任何 Loading 或送出成功狀態提示）。為了提升作品集的專業度與互動體驗，我們需要一個美觀且可真實運作的 Contact 頁面，並與 About Me 的高質感動效設計語彙相契合。

---

## 視覺與版面方向

* **視覺版型**：極簡雙欄分割佈局 (Minimalist Split Layout)。左側展示大字招呼語與一鍵複製 E-mail，以及 LinkedIn 和 GitHub 卡片；右側為聯絡表單卡片。
* **視覺主色**：使用設計系統自有的紫色 (`var(--purple)` 與 `var(--purple-soft)`)。
* **微動效**：
  1. 卡片載入時左右交錯（Staggered）淡入滑入。
  2. 輸入框使用浮動標籤（Floating Label）動畫，聚焦或有值時標籤縮小浮起並亮起紫色。
  3. 送出按鈕在 loading 時顯示紫色 Spinner 載入動畫，成功時顯示打勾成功圖示。

---

## 具體步驟

### Step 1：重構雙欄佈局 DOM 結構
* **做什麼**：
  * 修改 [components/Contact.tsx](file:///Users/hmingdesigner/Documents/Hming-AI-agent/400_Projects/hmingportfolio/components/Contact.tsx)，將其架構重構為雙欄：
    * **左欄**：放標題「對我的經歷感興趣嗎？」、一鍵複製信箱按鈕、以及 LinkedIn 與 GitHub 連結卡片。
    * **右欄**：放精緻的聯絡表單卡片，包含姓名、信箱、訊息內容及送出按鈕。
* **產出**：全新雙欄分割結構的 Contact 元件。
* **注意**：為 HTML 各個欄位與按鈕設定唯一的 `id`，以便後續測試與 RWD 審查。

### Step 2：實作 CSS 響應式排版與字卡 Hover
* **做什麼**：
  * 在 [app/globals.css](file:///Users/hmingdesigner/Documents/Hming-AI-agent/400_Projects/hmingportfolio/app/globals.css) 中編寫 `.contact-page-section` 雙欄佈局：
    * 桌機與平板（`>= 809px`）為左右並排；手機版（`< 809px`）自動轉換為單欄上下堆疊。
    * 左側社交卡片與右側表單卡片加上 Hover 微幅浮起並加深陰影的物理質感動效。
* **產出**：美觀的雙欄響應式網頁介面。
* **注意**：確認手機版寬度下的內距與邊距安全無溢出。

### Step 3：表單狀態管理與 Formspree 信件轉寄串接
* **做什麼**：
  * 修改 [components/Contact.tsx](file:///Users/hmingdesigner/Documents/Hming-AI-agent/400_Projects/hmingportfolio/components/Contact.tsx)，在檔案最上方加入 `"use client"`。
  * 引入 React 的 `useState` 管理表單輸入，並定義 `status` 狀態：`'idle' | 'loading' | 'success' | 'error'`。
  * 表單 `onSubmit` 時，使用 `fetch()` 將表單資料以 POST 送出至 Formspree 的 URL Endpoint（目前可先用環境變數或預留字串配置）。
* **產出**：可真正送出信件並進行狀態切換的 React 表單元件。

### Step 4：設計輸入框浮動標籤（Floating Label）
* **做什麼**：
  * 在 CSS 中利用 CSS 選擇器（如 `:focus` 與 `:not(:placeholder-shown)`）或 React focus state，讓輸入框在聚焦或有文字時，Placeholder (或 Label) 自動向上平移、縮小，並將文字顏色轉為紫色。
* **產出**：輸入框聚焦時順暢的標籤浮起與亮色動畫。

### Step 5：製作按鈕 Loading 與成功/失敗狀態回饋
* **做什麼**：
  * 送出表單時，按鈕顯示載入旋轉圈 (Spinner) 並處於 `disabled` 狀態。
  * 送出成功後，按鈕轉為綠色/紫色並展示打勾圖示，隨後重設表單。若失敗則提示錯誤。
* **產出**：直覺清晰的表單提交動態狀態回饋。

### Step 6：全頁交錯進場與 RWD 品質檢查
* **做什麼**：
  * 使用 `AnimatedContent` 包覆左欄與右欄，設定 staggered delay 進行流暢進場。
  * 遵循 `rwd-audit` 清單，於各斷點（1440px、1024px、768px、390px）做跑版與可用寬度測試，確認無文字溢出。
* **產出**：兼具最高設計品質與良好響應式體驗的聯絡頁面。

---

## 預計成果

做完以後你會得到：
1. 一個具備現代高級設計感的雙欄聯絡頁面。
2. 表單點擊時 Placeholder 會流暢浮起的精緻微動效。
3. 訪客填寫表單後，您可以實時在個人信箱收到 Formspree 轉寄的聯絡信件。
4. 表單送出時包含 Loading 載入與成功打勾的動態狀態。

## 不包含在這次的範圍

* 開發自建的伺服器端（Backend）郵件寄送與資料庫 API。

## 可能遇到的風險

* **Formspree 限制**：Formspree 免費版每個月限收 50 封信。
  * *解決方案*：對個人作品集而言 50 封額度通常足夠，後續若有大流量需求可更換至 EmailJS 或自建 API。
* **信件格式不正確**：若欄位沒有設定 `name`，Formspree 可能無法接收。
  * *解決方案*：嚴格確保 `<input>` 都有 `name="name"`、`name="email"` 與 `name="message"`。
