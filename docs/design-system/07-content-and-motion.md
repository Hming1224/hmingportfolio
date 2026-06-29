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

---

## 16. Theme、Status 與資料視覺化

- Dark theme token 保留，但目前站點預設停用，不主動在 `<html>` 掛 `.dark` 或 `data-theme="dark"`。`ThemeToggle` 可保留作未來功能，不影響現況。
- Dark semantic 至少覆蓋 paper、surface、ink、muted、line 與文字階梯；案例頁品牌色可維持局部 scope。
- 圖表依序使用 `--hm-chart-1` 到 `--hm-chart-6`。不可只靠顏色表達狀態；線圖搭配 dash / marker，區域圖搭配 pattern 或直接標籤。
