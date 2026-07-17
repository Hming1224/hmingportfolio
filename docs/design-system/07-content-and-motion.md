# 07 — Content, Motion & Theme

這份文件整理動畫哲學、motion token、theme/status，以及資料視覺化規則。

## 動畫哲學

**主頁 + 自我介紹：有動畫。** 入場動畫讓首次造訪的人感受到網站有生命感。
**專案介紹頁：克制，幾乎沒有動畫。** 面試官看作品時，注意力該在案子上，不在特效上。

---

## 15. Motion System

| Token | 值 | 用途 |
|---|---:|---|
| `--hm-duration-fast` | `180ms` | hover、focus、顏色 |
| `--hm-duration-base` | `260ms` | navbar、toast、一般狀態 |
| `--hm-duration-slow` | `420ms` | card image / panel |
| `--hm-duration-enter` | `600ms` | skeleton / 入場 |
| `--hm-duration-reveal` | `950ms` | 首頁專案卡 reveal |

所有動畫需支援 `prefers-reduced-motion: reduce`。案例頁避免新增主動動畫。

### 15.1 SplitText 的長標題限制（改文案前先讀）

`components/animate-ui/primitives/texts/SplitText.tsx` 是逐字入場動畫元件，目前用於 **Hero、Works、Design System、About Me（含 hero 標題與 section 標題）**。

**限制**：`splitType="chars"` 時，GSAP SplitText 外掛會在執行時注入 `<span style="white-space: nowrap">` 包住所有字元。元件自身雖設了 `whiteSpace: 'normal'` 與 `wordWrap: 'break-word'`，但會被那個 inline style 蓋掉。加上元件同時設了 `overflow: hidden`，**超出容器的文字會直接被裁掉，不會換行**。

- 錯誤做法：直接把標題文案改長 → 桌機與手機都可能被裁，且**畫面上看起來只是「標題變短了」，不會報錯**。原標題若剛好夠短，這個限制不會暴露。
- 正確做法：改用 `splitType="words, chars"`，GSAP 會產生可換行的結構（中文無空格也能正確斷行，2026-07-17 實測）。
- 驗證方式：改完在 375 / 768 / 1440px 各量一次 `el.scrollWidth - el.clientWidth`，應為 `0`；`isClipped` 為 `true` 就是被裁了。

**實測數據**（2026-07-17，About Me hero，標題 16 字）：`splitType="chars"` 於 375px 溢出 89px、標題被壓成單行；改 `"words, chars"` 後溢出 0、正常兩行。

改單一頁面時只改該處呼叫的 `splitType` prop，**不要改共用元件**——四個頁面都在用它，動元件會波及全部。

---

## 16. Theme、Status 與資料視覺化

- Dark theme token 保留，但目前站點預設停用，不主動在 `<html>` 掛 `.dark` 或 `data-theme="dark"`。`ThemeToggle` 可保留作未來功能，不影響現況。
- Dark semantic 至少覆蓋 paper、surface、ink、muted、line 與文字階梯；案例頁品牌色可維持局部 scope。
- 圖表依序使用 `--hm-chart-1` 到 `--hm-chart-6`。不可只靠顏色表達狀態；線圖搭配 dash / marker，區域圖搭配 pattern 或直接標籤。
