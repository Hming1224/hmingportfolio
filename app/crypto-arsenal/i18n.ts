import type { Locale } from "../../i18n/routing";

/* Crypto Arsenal 案例頁 zh-TW → en 對照。
   找不到對應 key 時回傳原文（與 advantech 同策略），方便分批補英文。 */
const en = {
  // ── TOC ──
  "專案背景": "Overview",
  "工作模式": "My Role",
  "問題定義": "Problem",
  "介面現況": "Current State",
  "關鍵決策": "Key Decision",
  "競品參考": "Benchmark",
  "Wireframe": "Wireframe",
  "設計迭代": "Iteration",
  "最終介面": "Final UI",
  "設計成效": "Design Impact",
  "學習反思": "Reflections",
  "返回首頁": "Back to Home",
  "下一個專案": "Next Project",
  "：": ": ",

  // ── Hero ──
  "策略倉位資訊顯示、手動平倉與止盈止損":
    "Strategy Position Display, Manual Close, and Take-Profit / Stop-Loss",
  "時間進程": "Timeline",
  "我的角色": "My Role",
  "UIUX設計師": "UI/UX Designer",
  "產品設計師 · UI/UX": "Product Designer · UI/UX",
  "產品設計師": "Product Designer",
  "產品": "Product",
  "量化交易平台": "Quantitative Trading Platform",
  "團隊成員": "Team Members",
  "1位產品負責人": "1 Product Owner",
  "1位UIUX設計師": "1 UI/UX Designer",
  "2位全端工程師": "2 Full-stack Engineers",
  "使用軟體": "Software Used",
  "負責項目": "Responsibilities",
  "二手研究": "Secondary Research",
  "線框稿": "Wireframing",
  "原型設計": "Prototyping",
  "設計交付影片": "Design Handoff Videos",
  "Crypto Arsenal 量化交易平台介面主視覺": "Crypto Arsenal quantitative trading platform interface",

  // ── Background ──
  "Crypto Arsenal 是做什麼？": "What Is Crypto Arsenal?",
  "就像傳統金融市場，加密市場裡的交易者透過":
    "Just like traditional financial markets, traders in crypto markets use an ",
  "把法幣（如 USD）換成加密貨幣；交易所就像中間人，幫交易者完成買賣、並連到背後的":
    " to convert fiat currency (such as USD) into cryptocurrency. The exchange acts as a middleman, completing trades and connecting to the underlying ",
  "。": ".",
  "但加密交易的門檻在於：通常得":
    "But crypto trading has a high barrier: it usually requires ",
  "手動盯盤、手動下單": "manually watching the market and placing orders",
  "，還要對市場有一定了解。於是「交易策略」出現了——策略是一段程式或演算法，幫交易者監控市場、更有效率地交易。":
    ", along with a solid understanding of the market. That's where \"trading strategies\" come in — programs or algorithms that monitor the market and trade more efficiently.",
  "而 ": "",
  " 就是一個直接串接交易所、提供交易者自動化策略來交易的平台。它同時服務兩種角色，形成一個策略供需的生態系。":
    " is a platform that connects directly to exchanges and provides traders with automated strategies. It serves two roles at once, forming a supply-and-demand ecosystem around strategies.",
  "這個模式為交易者、開發者與平台本身同時創造價值。不過策略並非 ":
    "This model creates value for traders, developers, and the platform alike. However, strategies are not ",
  "100% 全自動": "100% fully automated",
  "，往往仍需要交易者依市場狀況自己微調——這正是後來「倉位顯示與手動平倉」這個功能要解決的起點。":
    ", so traders often still need to fine-tune them based on market conditions. That's exactly the starting point this \"position display and manual close\" feature set out to solve.",
  "就像傳統金融市場，加密市場裡的交易者透過交易所把法幣（如 USD）換成加密貨幣；交易所就像中間人，幫交易者完成買賣、並連到背後的區塊鏈。":
    "Just like traditional financial markets, traders in crypto markets convert fiat (e.g. USD) into cryptocurrency through exchanges. The exchange acts as the middleman that completes trades and connects to the underlying blockchain.",
  "但加密交易的門檻在於：通常得手動盯盤、手動下單，還要對市場有一定了解。於是「交易策略」出現了——策略是一段程式或演算法，幫交易者監控市場、更有效率地交易。":
    "But crypto trading has a high barrier: it usually requires manually watching the market, placing orders by hand, and a solid understanding of the market. That's where \"trading strategies\" come in — a strategy is a program or algorithm that monitors the market and trades more efficiently on the trader's behalf.",
  "而 Crypto Arsenal 就是一個直接串接交易所、提供交易者自動化策略來交易的平台。它同時服務兩種角色，形成一個策略供需的生態系。":
    "Crypto Arsenal is a platform that connects directly to exchanges and provides traders with automated strategies. It serves two roles at once, forming a supply-and-demand ecosystem around strategies.",
  "這個模式為交易者、開發者與平台本身同時創造價值。不過策略並非 100% 全自動，往往仍需要交易者依市場狀況自己微調——這正是後來「倉位顯示與手動平倉」這個功能要解決的起點。":
    "This model creates value for traders, developers, and the platform alike. But strategies are not 100% fully automated — traders often still need to fine-tune based on market conditions. That's exactly the starting point this \"position display and manual close\" feature set out to solve.",
  // diagram 1 labels
  "用法幣買進加密貨幣": "Buy crypto with fiat",
  "加密貨幣互換": "Crypto swap",
  "挑選 & 監控": "Select & monitor",
  "下單執行": "Place & execute orders",
  "交易者": "Trader",
  "交易所": "Exchange",
  "區塊鏈": "Blockchain",
  "交易策略": "Trading Strategy",
  "交易與策略流程圖：交易者透過交易所把法幣換成加密貨幣，並透過交易策略經由 Crypto Arsenal 在交易所自動交易":
    "Trading and strategy flow: a trader converts fiat to crypto via an exchange, and trades automatically through a strategy via Crypto Arsenal on the exchange",
  "交易者把法幣換成加密貨幣，並透過交易策略在交易所自動交易；Crypto Arsenal 位於「策略」與「交易所」之間負責執行下單。":
    "Traders convert fiat to crypto and trade automatically on exchanges via strategies; Crypto Arsenal sits between \"strategy\" and \"exchange\" to execute orders.",
  // diagram 2 labels
  "使用交易機器人": "Use trading bots",
  "建立交易機器人": "Build trading bots",
  "機器人帶來的收益": "Returns from bots",
  "機器人收益 ＋ 跟單者分潤": "Bot returns + follower revenue share",
  "開發者": "Developer",
  "生態系圖：開發者建立交易機器人、交易者使用交易機器人，收益在雙方與平台之間流動":
    "Ecosystem diagram: developers build trading bots, traders use them, and returns flow between both sides and the platform",
  "開發者建立交易機器人上架、交易者選用機器人；收益在雙方與平台之間流動。":
    "Developers build and list trading bots; traders pick bots to use; returns flow between both sides and the platform.",

  // ── Role ──
  "角色與工作流": "Role & Workflow",
  "在 CA 的工作模式": "How I Worked at CA",
  "在 CA，每 1–2 週會持續一個 sprint，小功能設計時程約 2–4 周，大功能設計時程約需 1–3 個月。除了與 PO 持續討論產品功能上線時程及每週用戶反饋，多數 feature 以二手桌面研究與競品設計為基礎，我身為設計師的設計流程如下：":
    "At CA, work ran in 1–2 week sprints — small features took about 2–4 weeks to design, larger ones 1–3 months. Beyond ongoing discussions with the PO on release timing and weekly user feedback, most features were grounded in secondary desk research and competitive design. My design process as a designer was as follows:",
  "單一 feature 的設計流程": "Design process for a single feature",
  "二手研究 / 用戶反饋": "Secondary research / feedback",
  "UI flow 提案": "UI flow proposal",
  "線框稿設計": "Wireframing",
  "與 PO 討論可行性": "Feasibility review with PO",
  "內部團隊 review": "Internal team review",
  "Jira 排 tickets": "Jira ticketing",

  // ── Problem ──
  "用戶痛點：整體策略賺賠看得到，倉位狀態卻看不見":
    "User Pain: Overall P&L Is Visible, but Position State Isn't",
  "CA 介面只呈現策略的整體績效（獲利、ROI、未實現 ROI、資產分布），卻沒直接顯示這支策略目前實際持有哪些倉位。使用者因此卡在幾個反覆出現的情境裡。":
    "The CA interface only shows a strategy's overall performance (profit, ROI, unrealized ROI, asset allocation), but doesn't directly show which positions the strategy currently holds. As a result, users get stuck in a few recurring situations.",
  "使用者在CA 平台上使用策略機器人交易時，雖然可以看到策略整體賺了多少，卻無法清楚理解「現在到底開了什麼倉位」。當同時啟動多支策略、或同一支策略可能開多也可能開空時，使用者無法直接判斷目前是多倉還是空倉、倉位數量、入場價、標記價、浮動盈虧、保證金，以及該倉位距離止盈 / 止損還有多遠。":
    "When users trade with strategy bots on CA, they can see the strategy's overall profit, but they cannot clearly understand \"what position is open right now.\" When multiple strategies are running at the same time, or when a single strategy may open either long or short positions, users cannot directly tell whether the current position is long or short, its size, entry price, mark price, floating P&L, margin, or how far it is from take-profit / stop-loss.",
  "「策略賺了多少我看得到，但它現在開的是多倉還是空倉、正在賺還是賠，介面上完全看不出來。」":
    "\"I can see how much the strategy has made, but whether it's currently long or short, in profit or in loss — the interface shows none of it.\"",
  "策略開發者 A": "Strategy User A",
  "啟動 / 跟單策略的一般交易者": "Trader running / following strategies",
  "「想確認倉位只能登入交易所，同時跑好幾支策略時，我根本分不清哪一筆是哪支策略開的。」":
    "\"To check positions I have to log in to the exchange, and when I'm running several strategies at once I can't tell which position belongs to which strategy.\"",
  "策略開發者 B": "Strategy User B",
  "同時運行多支策略": "Running multiple strategies at once",
  "「策略本身有設定止盈止損，但市場變化太快，我想先手動停利或止損，不一定想等策略條件被觸發才離場。」":
    "\"The strategy has take-profit / stop-loss set, but the market moves too fast — I'd like to take profit or cut losses manually rather than wait for the strategy's conditions to trigger.\"",
  "策略開發者 C": "Strategy User C",
  "彈性停利停損": "Flexible take-profit / stop-loss",
  "「已經獲利到我滿意的程度了，我想自己先落袋，而不是乾等策略設定的條件才平倉。」":
    "\"I'm already at a profit I'm happy with — I want to lock it in myself instead of waiting for the strategy's set conditions to close.\"",
  "交易者 A": "Active Trader A",
  "想保留人工介入的使用者": "Wants to keep manual control",
  "「我只是想提前平掉一筆倉位，跑去交易所操作，結果整支策略被系統判定異常停掉、還救不回來。」":
    "\"I just wanted to close one position early, so I did it on the exchange — and the whole strategy got flagged as abnormal, shut down, and couldn't be recovered.\"",
  "交易者 B": "Active Trader B",
  "遇過策略被強制中止": "Has had a strategy force-stopped",
  "「我想知道目前倉位距離止盈 / 止損還有多遠，但 CA 只看到整體績效，看不出這筆倉位接下來可能在哪裡被平掉。」":
    "\"I want to know how far the current position is from take-profit / stop-loss, but CA only shows overall performance — I can't see where this position might be closed next.\"",
  "交易者 C": "Active Trader C",
  "出場風險掌握": "Wants to gauge exit risk",

  // ── Current ──
  "策略在 CA、倉位卻要去交易所看": "Strategies Live in CA, but Positions Live on the Exchange",
  "目前 CA 的 Portfolio 頁面可查看所有運行中的策略機器人，並在右上角呈現策略整體績效，例如獲利、ROI、未實現 ROI 與資產分布。然而，介面尚未直接顯示單一策略目前實際持有的倉位資訊，例如多 / 空方向、數量、入場價、標記價、浮動盈虧與保證金。使用者若想確認單一倉位狀態，仍需登入交易所查看，導致 CA 作為策略管理平台，無法讓使用者在站內完整掌握個別策略的實際收益與風險狀態。":
    "CA's Portfolio page lets users view all running strategy bots and shows overall performance in the top right — profit, ROI, unrealized ROI, and asset allocation. However, the interface doesn't directly show a single strategy's actual positions: long / short direction, size, entry price, mark price, floating P&L, and margin. To check a single position, users still have to log in to the exchange — so CA, as a strategy-management platform, can't let users fully grasp each strategy's real returns and risk on-site.",
  "目前 CA 的 Portfolio 頁面可查看所有運行中的策略機器人，並在右上角呈現策略整體績效，例如獲利、ROI、未實現 ROI 與資產分布。然而，介面尚未直接顯示單一策略目前實際持有的倉位資訊，例如多 / 空方向、數量、入場價、標記價、浮動盈虧與保證金。使用者若想確認單一倉位狀態，仍需登入交易所查閱，導致 CA 作為策略管理平台，無法讓使用者在站內完整掌握個別策略的實際收益與風險狀態。":
    "CA's Portfolio page lets users view all running strategy bots and shows overall performance in the top right — profit, ROI, unrealized ROI, and asset allocation. However, the interface doesn't directly show a single strategy's actual positions: long / short direction, size, entry price, mark price, floating P&L, and margin. To check a single position, users still have to review it on the exchange — so CA, as a strategy-management platform, can't let users fully grasp each strategy's real returns and risk on-site.",
  "Crypto Arsenal 策略詳情頁現況：上方策略列表與績效指標，下方訂單與倉位清單仍分散於交易所端":
    "Crypto Arsenal strategy detail page today: the strategy list and performance metrics sit on top, while order and position lists remain scattered on the exchange side",
  "現況：策略績效指標清楚，但「這支策略目前持有哪些倉位」仍要跳到交易所端查看":
    "Today: strategy performance is clear, but \"which positions this strategy currently holds\" still requires jumping to the exchange",

  // ── Decision ──
  "問題延伸的後果": "Consequence of the Problem",
  "兩種平倉路徑，結果天差地遠": "Two Closing Paths, Wildly Different Outcomes",
  "問題不只是「看不到倉位」，而是使用者為了控制單筆風險去交易所平倉，反而可能讓整支策略報廢——機器人偵測到自己管理的倉位突然消失、狀態錯亂，為風險控管只能停掉策略且無法恢復。":
    "The problem isn't just \"can't see the position.\" When a user closes on the exchange to control single-trade risk, it can wreck the entire strategy — the bot detects that a position it manages has suddenly vanished, its state breaks, and for risk control it can only stop the strategy with no way to recover.",
  "目前在交易所手動平倉": "Closing manually on the exchange (today)",
  "CA 看不懂你的意圖": "CA Can't Read Your Intent",
  "使用者跳出 CA、到交易所手動操作": "User leaves CA and acts on the exchange",
  "機器人發現管理的倉位突然消失": "The bot finds a managed position has vanished",
  "內部狀態與交易所不一致、視為異常": "Internal state diverges from the exchange — flagged abnormal",
  "→ 強制停掉整支策略，且無法恢復": "→ The whole strategy is force-stopped, unrecoverable",
  "未來在 CA 內手動平倉": "Closing manually inside CA (future)",
  "系統理解為合法操作": "The System Reads It as a Valid Action",
  "使用者在 CA 內按下平倉": "User taps close inside CA",
  "CA 告知機器人這是主動、合法的指令": "CA tells the bot this is an intentional, valid command",
  "機器人同步狀態、不進入錯誤保護": "The bot syncs state and doesn't enter error protection",
  "→ 只結束當前倉位、策略繼續運行": "→ Only the current position closes; the strategy keeps running",
  "所以方向很明確：把平倉收進 CA 內。手動平倉只結束當下這一筆倉位、策略進入空倉，未來再符合開倉條件時機器人仍會自動開倉，讓用戶可以同時享有自動化交易的紀律以及自主控管收益的權利。":
    "So the direction is clear: bring closing inside CA. A manual close only ends the current position and moves the strategy to flat; when entry conditions are met again, the bot still opens automatically — giving users both the discipline of automated trading and the freedom to manage their own returns.",

  // ── Research ──
  "交易所介面參考": "Exchange UI Benchmark",
  "盤點交易所通用的倉位資訊、平倉、止盈止損流程":
    "Mapping Common Exchange Patterns for Positions, Closing, and TP/SL",
  "為了順利讓使用者無縫熟悉流程，我以 Binance / Bybit / OKX 的實際介面進行競品流程參考，拆解三家共通的倉位資訊欄位、平倉和止盈止損流程，另外同時考量交易所能夠回傳的資料，收斂出專屬於 CA 的操作流程。":
    "To let users pick up the flow seamlessly, I benchmarked the real interfaces of Binance / Bybit / OKX, breaking down the position fields, closing flows, and TP/SL flows the three share. Considering also what data the exchanges can return, I converged on an operation flow tailored to CA.",
  "交易詳細資訊確認": "Trade Detail Confirmation",
  "從三家交易所介面收斂出交易合約中倉位最通用、可從交易所撈取之數據，並且也是使用者最關心的欄位。":
    "Converged from the three exchanges' interfaces: the most common, exchange-retrievable, and user-relevant fields for a futures position.",
  "交易資訊 Tab": "Trade Info Tabs",
  "Position、Open Orders、Order History、Position History": "Position, Open Orders, Order History, Position History",
  "倉位資訊": "Position Fields",
  // 操作流程
  "操作流程 1": "Flow 1",
  "操作流程 2": "Flow 2",
  "合約平倉": "Futures Close",
  "合約止盈止損": "Futures TP/SL",
  // 對比矩陣：步驟欄標題 + 結論 + lightbox
  "① 倉位 / 下單畫面": "① Position / trade screen",
  "②a 限價平倉（Limit）": "②a Limit close",
  "②b 市價平倉\n（Market）": "②b Market\nclose",
  "② 設定止盈止損": "② Set TP / SL",
  "Binance 多一步：需先輸入金額 / 數量": "Binance adds a step: enter amount / quantity first",
  "Binance 平倉前需先輸入平倉金額與數量的畫面":
    "Binance screen for entering the close amount and quantity before confirming",
  "三家平倉流程大致一致：在倉位列表找到倉位 →（限價或市價二擇一）→ 確認送出；差別僅在 Binance 需多一個輸入金額 / 數量的畫面。CA 沿用相同的核心結構。":
    "The three close flows are largely the same: find the position → choose Limit or Market → confirm. The only difference is Binance adds an extra amount / quantity screen. CA follows the same core structure.",
  "三家止盈止損同樣是兩步：開啟倉位 → 設定止盈 / 止損的觸發價與數量。CA 沿用相同結構。":
    "TP/SL is two steps everywhere: open the position → set the take-profit / stop-loss trigger price and quantity. CA follows the same structure.",
  "放大檢視": "Enlarge",
  "關閉放大圖片": "Close enlarged image",
  "放大播放影片": "Enlarge and play video",
  "關閉放大影片": "Close enlarged video",
  "從上面流程可以觀察到無論是 Binance、OKX、Bybit 的介面或是操作流程基本雷同，僅介面元件有差異，因此 CA 的兩項操作流程也將依照上述形式進行，確保使用者可以快速銜接。":
    "Across Binance, OKX, and Bybit the interfaces and flows are essentially the same — only the UI components differ. CA's two flows therefore follow the same form so users can transition quickly.",
  "Binance 合約倉位列表介面，含 Symbol、Size、Entry Price、Mark Price、Margin、PNL 等欄位":
    "Binance futures position list with Symbol, Size, Entry Price, Mark Price, Margin, PNL fields",
  "Bybit 合約倉位列表介面，含倉位數量、入場價、標記價、強平價與未實現損益欄位":
    "Bybit futures position list with size, entry price, mark price, liquidation price, and unrealized P&L",
  "OKX 合約倉位列表介面，含倉位資訊欄位與 Close 平倉入口":
    "OKX futures position list with position fields and a Close entry point",
  "Binance 合約平倉流程：輸入金額和數量後，點擊 Limit 按鈕確認限價平倉，或點擊 Market 按鈕確認市價平倉":
    "Binance close flow: enter amount and quantity, then tap Limit for a limit close or Market for a market close",
  "Bybit 合約平倉流程：點擊 Limit 按鈕設定限價平倉（可設定金額與數量），或點擊 Market 按鈕市價平倉（可設定數量）":
    "Bybit close flow: tap Limit for a limit close (set amount and quantity) or Market for a market close (set quantity)",
  "OKX 合約平倉流程：限價平倉可設定金額與數量，市價平倉可設定數量":
    "OKX close flow: limit close sets amount and quantity, market close sets quantity",
  "Binance 合約止盈止損流程：點擊 TP/SL for position 下方編輯按鈕，可設定止盈與止損觸發價格（最新 / 標記），數量是全倉無法設定":
    "Binance TP/SL flow: tap the edit button under TP/SL for position to set take-profit and stop-loss trigger prices (last / mark); quantity is whole-position and can't be set",
  "Bybit 合約止盈止損流程：點擊 TP/SL 下方 +Add 按鈕，可設定止盈與止損觸發價格（最新 / 標記）與數量":
    "Bybit TP/SL flow: tap +Add under TP/SL to set take-profit and stop-loss trigger prices (last / mark) and quantity",
  "OKX 合約止盈止損流程：點擊 Position TP/SL 下方 add 按鈕，可設定止盈與止損觸發價格（最新 / 標記）與數量":
    "OKX TP/SL flow: tap add under Position TP/SL to set take-profit and stop-loss trigger prices (last / mark) and quantity",

  // ── Wireframe ──
  "打造與交易所同樣順暢且便利的操作體驗": "Building a Flow as Smooth as the Exchanges'",
  "雖然目前已參考交易所操作建立初步概念，但 CA 產品的交易流程與交易所仍存在差異。交易所偏向全手動操作，而 CA 目前以策略機器人全自動開單為主；交易者後續可依自身判斷，手動決定平倉時機與平倉數量。因此，在 CA 中導入手動平倉、止盈與止損功能時，需透過多種設計提案，進一步確認最終的介面樣式與操作流程。": "Although an initial concept has been developed by referencing exchange-based operations, the trading flow of the CA product still differs from that of exchanges. Exchanges are primarily based on fully manual operations, while CA currently relies on strategy bots to open positions automatically. Traders can then decide, based on their own judgment, when and how much of a position to close manually. Therefore, when introducing manual position closing, take-profit, and stop-loss features into CA, multiple design proposals are needed to further confirm the final interface style and operational flow.",
  "CA 內手動平倉": "Manual Close inside CA",
  "CA 內手動止盈止損": "Manual TP/SL inside CA",
  "方案一：Metrix Chart": "Option 1: Metrix Chart",
  "方案一：Checkbox": "Option 1: Checkbox",
  "方案二：Dropdown List": "Option 2: Dropdown List",
  "最終方案：Sidebar": "Final: Sidebar",
  "採納理由": "Why It Was Chosen",
  "上一張 wireframe": "Previous wireframe",
  "下一張 wireframe": "Next wireframe",
  "Wireframe 步驟": "Wireframe steps",
  "Wireframe 目前頁數": "Current wireframe page",
  "切換到步驟": "Switch to step",
  "未採納原因": "Why It Wasn't Chosen",
  "右上角新增Exchange Record的Tab，點擊後可以看到倉位資訊，選擇對應的倉位，點擊close按鈕。":
    "Add an Exchange Record tab in the top right. Click it to view position details, select the corresponding position, and click the close button.",
  "彈出Pop-up視窗，預設以限價平倉，輸入金額與數量，最後再點confirm按鈕。":
    "A pop-up window appears, defaulting to limit close. Enter the price and quantity, then click the confirm button.",
  "也可以在最上方的點選市價平倉，輸入數量後，最後再點confirm按鈕。":
    "Alternatively, click market close at the top, enter the quantity, and click the confirm button.",
  "在原本的策略機器人bar右方加入交易資訊欄，顯示該策略目前倉位數量，以及交易筆數，點擊該按鈕。":
    "Add a trade info section to the right of the original strategy bot bar showing the current position size and number of trades, and click the button.",
  "顯示下拉選單，可看到倉位資訊，選擇對應的倉位，點擊close按鈕。":
    "Show a dropdown menu where position details can be viewed. Select the corresponding position and click the close button.",
  "將原本action欄位，另外新增view details按鈕，點擊該按鈕。":
    "Add a view details button to the original action column, and click the button.",
  "彈出Pop-up視窗，可看到倉位資訊，選擇對應的倉位，點擊close按鈕。":
    "A pop-up window appears showing position details. Select the corresponding position and click the close button.",
  "從右邊sidebar彈出視窗，預設以限價平倉，輸入金額與數量，最後再點confirm按鈕。":
    "A sidebar slides out from the right, defaulting to limit close. Enter the price and quantity, then click the confirm button.",
  "彈出Pop-up視窗，可看到倉位資訊，TP/SL的checkbox在該倉位的正下方。":
    "A pop-up window appears showing position details, with the TP/SL checkbox directly below the position.",
  "勾選TP/SL的checkbox，在右邊輸入止盈止損價格，最後點選add按鈕。":
    "Check the TP/SL checkbox, enter the take-profit and stop-loss prices on the right, and click the add button.",
  "完成TP/SL下單後，可看到下單價格，需要修改可以再點擊add按鈕。":
    "After completing the TP/SL order, the order prices are visible. To modify them, click the add button again.",
  "彈出Pop-up視窗，可看到倉位資訊，最右邊有TP/SL欄位，點擊add按鈕。":
    "A pop-up window appears showing position details. There is a TP/SL column on the far right; click the add button.",
  "點擊add按鈕，在下方跳出dropdown視窗，輸入止盈止損價格，最後點選confirm按鈕。":
    "Click the add button to expand a dropdown below. Enter the take-profit and stop-loss prices, then click the confirm button.",
  "從右邊sidebar彈出視窗，TP和SL可分別輸入金額，最後再點confirm按鈕。":
    "A sidebar slides out from the right. Enter values for TP and SL separately, then click the confirm button.",
  "CA Watchlist 頁面既有 Sidebar 操作流程參考":
    "Reference from CA's existing Watchlist sidebar flow",
  "CA 內手動平倉 wireframe 方案一：在策略詳情頁的趨勢圖旁，以欄位列表呈現倉位資訊的版面配置":
    "Manual close wireframe, option 1: position fields laid out beside the trend chart on the strategy detail page",
  "CA 內手動平倉方案一 step 1：在策略詳情頁的趨勢圖旁呈現倉位資訊":
    "Manual close option 1, step 1: show position details beside the trend chart on the strategy detail page",
  "CA 內手動平倉方案一 step 2：使用者在 Metrix Chart 旁查看平倉資訊":
    "Manual close option 1, step 2: users review close-position details beside the Metrix Chart",
  "CA 內手動平倉方案一 step 3：使用者完成平倉設定":
    "Manual close option 1, step 3: users complete the close-position settings",
  "CA 內手動平倉方案二 step 1：以 Dropdown List 顯示倉位資訊":
    "Manual close option 2, step 1: show position details in a dropdown list",
  "CA 內手動平倉方案二 step 2：展開 Dropdown List 查看倉位":
    "Manual close option 2, step 2: expand the dropdown list to review positions",
  "CA 內手動平倉方案二 step 3：在 Dropdown List 中選擇平倉操作":
    "Manual close option 2, step 3: choose the close action inside the dropdown list",
  "CA 內手動平倉方案二 step 4：完成平倉設定":
    "Manual close option 2, step 4: complete close-position settings",
  "CA 內手動平倉最終方案 step 1：從策略詳情頁進入 Sidebar 流程":
    "Manual close final option, step 1: enter the sidebar flow from the strategy detail page",
  "CA 內手動平倉最終方案 step 2：Sidebar 展開可操作倉位":
    "Manual close final option, step 2: the sidebar opens with actionable positions",
  "CA 內手動平倉最終方案 step 3：選擇平倉項目":
    "Manual close final option, step 3: select the position to close",
  "CA 內手動平倉最終方案 step 4：確認平倉參數":
    "Manual close final option, step 4: confirm close parameters",
  "CA 內手動平倉最終方案 step 5：完成手動平倉流程":
    "Manual close final option, step 5: complete the manual close flow",
  "CA 內手動止盈止損 wireframe 方案一：在策略詳情頁以 Checkbox 形式設定止盈止損的版面配置":
    "Manual TP/SL wireframe, option 1: setting take-profit / stop-loss via checkboxes on the strategy detail page",
  "CA 內手動止盈止損方案一 step 1：以 Checkbox 形式設定 TP/SL":
    "Manual TP/SL option 1, step 1: set TP/SL through checkboxes",
  "CA 內手動止盈止損方案一 step 2：勾選 Checkbox 進入 TP/SL 設定":
    "Manual TP/SL option 1, step 2: select the checkbox to enter TP/SL setup",
  "CA 內手動止盈止損方案一 step 3：設定止盈與止損條件":
    "Manual TP/SL option 1, step 3: set take-profit and stop-loss conditions",
  "CA 內手動止盈止損方案一 step 4：完成 TP/SL 設定":
    "Manual TP/SL option 1, step 4: complete TP/SL setup",
  "CA 內手動止盈止損方案二 step 1：以 Dropdown List 顯示 TP/SL 入口":
    "Manual TP/SL option 2, step 1: show the TP/SL entry in a dropdown list",
  "CA 內手動止盈止損方案二 step 2：展開 Dropdown List":
    "Manual TP/SL option 2, step 2: expand the dropdown list",
  "CA 內手動止盈止損方案二 step 3：設定止盈止損條件":
    "Manual TP/SL option 2, step 3: set TP/SL conditions",
  "CA 內手動止盈止損方案二 step 4：確認 TP/SL 設定":
    "Manual TP/SL option 2, step 4: confirm TP/SL setup",
  "CA 內手動止盈止損最終方案 step 1：從策略詳情頁進入 Sidebar":
    "Manual TP/SL final option, step 1: enter the sidebar from the strategy detail page",
  "CA 內手動止盈止損最終方案 step 2：Sidebar 展開 TP/SL 設定":
    "Manual TP/SL final option, step 2: the sidebar opens TP/SL setup",
  "CA 內手動止盈止損最終方案 step 3：確認止盈止損參數":
    "Manual TP/SL final option, step 3: confirm TP/SL parameters",
  "CA 內手動止盈止損最終方案 step 4：完成 TP/SL 設定":
    "Manual TP/SL final option, step 4: complete TP/SL setup",
  "左邊的趨勢圖需要往左縮小，以資訊層級而言，趨勢圖當中會標記何時進場和出場，若圖表過小很難點擊這些資訊。另外，右邊空間無法塞入 8–10 欄交易所的所有資訊，必定會有部分資訊被犧牲。":
    "The trend chart on the left has to shrink, but in terms of hierarchy the chart marks entry and exit points — too small and those become hard to tap. And the right side can't fit all 8–10 columns of exchange data, so some information is inevitably sacrificed.",
  "用 Dropdown 顯示倉位資訊於該運行的策略機器人 bar 下方會導致無法完整呈現其他策略機器人，交易所也有限制至多一次呈現 20 筆訂單 / 倉位的限制。":
    "Showing position details in a dropdown under the running strategy bot bar would prevent other strategy bots from being fully visible. Exchanges also limit how many orders / positions can be shown at once, often around 20.",
  "參考 CA 中 Watchlist 頁面的選擇策略機器人流程，點擊 add 按鈕後，右邊的 sidebar 展開，用戶可以點選有興趣機器人並加入到右邊清單中。將用戶原本就已經熟悉 UI 流程整合到新的倉位資訊設計流程中，提升用戶操作的流暢度。":
    "The final direction references CA's Watchlist flow for selecting strategy bots: after tapping add, the right sidebar opens and users can select bots to add to the list. Reusing a UI flow users already know makes the new position-information flow smoother.",
  "CA Watchlist 頁面點擊 add 按鈕後開啟 Sidebar 的操作流程參考":
    "CA Watchlist reference: tapping add opens the sidebar flow",
  "CA Watchlist 頁面右側 Sidebar 選擇策略機器人並加入清單的操作流程參考":
    "CA Watchlist reference: selecting strategy bots in the right sidebar and adding them to the list",
  "雖然這個版本是參考幣安平台的現行設計，固然是個不錯且用戶習慣的設計，然而 CA 目前沒有該元件，需要重新手刻較費時。":
    "Although this version references Binance's current pattern and is familiar to users, CA does not currently have this component, so building it from scratch would take more time.",
  "目前的 Dropdown List 在平台中僅用於設定策略機器人的 API 或是交易幣別設定，若是用於新增全新的委託或是平倉，這樣設計會與原本 Dropdown List 使用邏輯有衝突。":
    "In the current platform, dropdown lists are mainly used for configuring a strategy bot's API or trading pairs. Using one to create a new order or close a position would conflict with the existing dropdown logic.",

  // ── Iteration ──
  "設計元件迭代": "Component Iteration",
  "透過內部團隊人員與工程師測試，將部分元件進行迭代修正，更加提升用戶使用體驗。":
    "Through testing with the internal team and engineers, I iterated on several components to further improve the user experience.",
  "操作流程\n1 & 2": "Flow\n1 & 2",
  "策略機器人Bar UI顯示資訊": "Strategy Bot Bar UI Information",
  "優化策略列表資訊層級與操作按鈕一致性": "Optimizing Information Hierarchy and Button Consistency in Strategy List",
  "原本列表欄位同時顯示 Performance 與 Time Period，導致資訊集中在表格中，欄位偏多、橫向空間被壓縮；右側 Action 區只有主要的 Stop 按鈕，Duplicate 功能不明顯或不在同一層級呈現。":
    "Originally, the list columns displayed both Performance and Time Period at the same time, crowding information in the table and compressing horizontal space. The Action column on the right only had the main Stop button, leaving the Duplicate function hidden or not presented at the same level.",
  "調整後，新版將 Performance 與 Time Period 從下方列表中移除，改放到上方 Accumulated EC 圖表區域。這樣使用者在查看績效曲線時，可以直接對照策略 ID 與時間區間，不需要再到表格欄位中交叉比對，資訊層級更清楚，也讓下方列表更精簡。":
    "In the revised version, Performance and Time Period are removed from the bottom list and moved to the Accumulated EC chart area. This allows users to directly compare strategy IDs and time ranges when viewing performance curves, eliminating the need to cross-check table columns, clarifying the information hierarchy, and streamlining the list below.",
  "迭代前：策略列表欄位同時顯示 Performance 與 Time Period，Action 區僅有 Stop 按鈕":
    "Before: The strategy list displayed both Performance and Time Period, and the Action column only had a Stop button.",
  "迭代後：移除非必要欄位至 Accumulated EC，Action 區新增 Duplicate 與 View Details 按鈕":
    "After: Non-essential columns are moved to Accumulated EC, and Duplicate and View Details buttons are added to the Action column.",
  "平倉數量互動方式": "Close-Quantity Interaction",
  "貼合用戶實際需求修正": "Fixed to match real user needs",
  "原本的平倉數量採用輸入框搭配下拉選單的方式，使用者需要點擊欄位後，再從 10%、20%、50%、100% 等固定比例中選擇。這種設計雖然能快速選取常用比例，但這些比例若非用戶的選擇，則需要手動輸入。另外，選項展開後也會覆蓋下方內容，讓彈窗視覺變得較擁擠。":
    "The original close-quantity used an input field with a dropdown: users tapped the field, then picked from fixed ratios like 10%, 20%, 50%, 100%. It made common ratios quick to select, but anything off-list had to be typed manually. The expanded dropdown also covered the content below, making the dialog feel cramped.",
  "調整後將平倉數量元件改為「輸入框 + 比例滑桿」的形式。使用者可以直接透過滑桿調整平倉比例，並即時看到目前比例數值，例如 0%。相較於下拉選單，滑桿更適合表達「從 0% 到 100%」這種連續比例的操作，也讓平倉數量的調整方式更直覺。":
    "The revised component became an input field plus a ratio slider. Users adjust the close ratio directly via the slider and see the current value live, e.g. 0%. Compared with a dropdown, a slider better expresses a continuous \"0% to 100%\" range and makes adjusting the close quantity more intuitive.",
  "迭代前：平倉數量使用下拉選單，展開後覆蓋彈窗下方內容": "Before: close quantity used a dropdown that covered the content below when expanded",
  "迭代後：平倉數量改為輸入框加比例滑桿，並即時顯示預估損益說明": "After: close quantity became an input plus ratio slider with live estimated P&L",
  "系統資訊顯示機制": "System-Info Display",
  "符合多數用戶的使用體驗": "Fits how most users work",
  "原本的 TP / SL 功能說明直接放在彈窗最下方，將完整的規則與限制一次性呈現在介面中。這樣雖然能讓使用者立即看到所有資訊，但也讓主要操作區被大量文字擠壓，視覺負擔較重。對已熟悉功能的使用者來說，這些長篇描述並不是每次操作都需要閱讀，反而會降低操作效率，讓介面顯得擁擠、不夠俐落。":
    "The original TP/SL explanation sat at the very bottom of the dialog, presenting all rules and limits at once. It let users see everything immediately, but it crowded the main controls with text and felt heavy. For users already familiar with the feature, these long descriptions don't need reading every time — they actually slowed things down and made the interface feel cluttered.",
  "調整後將完整的功能說明收斂到標題旁的 info 元件中，只有在使用者 hover 或需要進一步理解時才會讀取到詳細資訊。這讓介面預設狀態更乾淨，主操作區能更聚焦在 Take Profit、Stop Loss 的價格設定與確認操作上，減少不必要的文字干擾。這樣的調整同時滿足了新手與專家的使用情境：對專家來說，他們通常已經理解 TP / SL 的運作規則，乾淨簡潔的介面能讓他們更快速完成設定，也更適合長期高頻使用；對新手來說，必要的專業資訊並沒有被移除，而是被放在可自主查看的 info 元件中，當他們需要了解觸發邏輯、適用範圍或限制條件時，可以主動滑到 info 查看完整說明。":
    "The revision collapsed the full explanation into an info element beside the title, surfacing details only on hover or when the user wants more. This keeps the default state cleaner and lets the main area focus on setting and confirming Take Profit / Stop Loss prices, with less text noise. It serves both novices and experts: experts already know how TP/SL works and a clean interface lets them set up faster for high-frequency use; for novices, the necessary detail isn't removed but tucked into a self-serve info element they can open when they need to understand triggers, scope, or limits.",
  "迭代前：TP/SL 彈窗將完整功能說明直接放在最下方，操作區被大量文字擠壓": "Before: the TP/SL dialog placed the full explanation at the bottom, crowding the controls",
  "迭代後：功能說明收斂到標題旁的 info 元件，hover 才顯示完整說明": "After: the explanation collapsed into an info element by the title, shown on hover",
  "止盈止損操作按鈕": "TP/SL Action Button",
  "預期操作與介面對齊": "Aligning intent with the interface",
  "原本在 TP/SL 欄位中，即使該倉位已經設定過止盈止損，仍然顯示 Add 按鈕。這容易讓使用者誤解目前還可以「新增」另一組 TP/SL 委託，彷彿能持續替同一個倉位加掛多筆止盈止損設定。然而，在 CA 的操作邏輯中，TP/SL 是針對整個倉位一次性下單。當倉位已經送出 TP/SL 委託後，後續能做的行為並不是再次新增，而是調整原本已存在的止盈止損設定。因此，使用 Add 會讓介面語意與實際系統邏輯產生落差，增加使用者判斷成本。":
    "Originally the TP/SL field showed an Add button even after a position already had TP/SL set. That made users think they could \"add\" another TP/SL order, as if stacking multiple settings on one position. But in CA's logic, TP/SL is a one-time order for the whole position. Once submitted, the next action isn't adding again — it's adjusting the existing setting. So Add created a gap between the interface's meaning and the actual system logic, raising the user's cognitive cost.",
  "調整後，當倉位已經存在 TP/SL 設定時，按鈕文字改為 Modify。這讓使用者能更直覺地理解：目前不是要新增一筆新的止盈止損委託，而是要修改原本針對整個倉位設定的 TP/SL。這樣的調整讓操作語意更符合系統邏輯，也降低了使用者對後續操作的誤解。使用者看到 Modify 時，會自然反射出「我現在是在調整既有的整倉止盈止損設定」，而不是以為可以再次加掛新的 TP/SL 單。":
    "After the change, when a position already has TP/SL, the button reads Modify. Users grasp it intuitively: this isn't adding a new TP/SL order but editing the existing whole-position setting. The wording now matches the system logic and reduces misreading of what comes next. Seeing Modify, users naturally register \"I'm adjusting the existing whole-position TP/SL,\" not stacking a new order.",
  "迭代前：倉位已設定止盈止損仍顯示 Add 按鈕": "Before: a position with TP/SL already set still showed an Add button",
  "迭代後：倉位已存在 TP/SL 設定時按鈕文字改為 Modify": "After: the button reads Modify when a position already has TP/SL set",

  // ── Final ──
  "最終介面：手動平倉和下止盈止損單":
    "Final UI: Manual Close and TP/SL Orders",
  "承接競品流程的拆解與多次提案的權衡，收斂出最適合 CA 的方案，把手動平倉和止盈止損分為三個流程依序介紹。":
    "Building on the competitor-flow breakdown and several rounds of proposal weighing, the best-fit approach for CA was distilled, presenting manual close and take-profit/stop-loss in three sequential flows.",
  "CA 內手動限價平倉": "Manual Limit Close inside CA",
  "CA 內手動市價平倉": "Manual Market Close inside CA",
  "CA 內手動限價平倉的最終介面：Trading Details 彈窗中的倉位列表與平倉入口":
    "Final UI for manual limit close inside CA: the position list and close entry in the Trading Details dialog",
  "CA 內手動市價平倉的最終介面：Trading Details 彈窗中的倉位列表與平倉入口":
    "Final UI for manual market close inside CA: the position list and close entry in the Trading Details dialog",
  "CA 內手動止盈止損的最終介面：Trading Details 彈窗中的 TP/SL 設定入口":
    "Final UI for manual TP/SL inside CA: the TP/SL entry in the Trading Details dialog",

  // ── Design Impact ──
  "設計成效：用內部測試與流程指標驗證":
    "Design Impact: Validated with Internal Testing and Flow-Level Metrics",
  "實習階段沒有資源做正式的大規模用戶測試，所以我用兩種方式檢驗這套平倉與止盈止損流程好不好上手：一是找 5 位內部成員做任務式可用性測試，二是直接看流程本身的指標——例如完成一次操作要幾步、需不需要跳出平台。":
    "There were no resources for formal large-scale user testing during the internship, so I checked how easy the close and TP/SL flows were to learn in two ways: a task-based usability test with five internal members, and metrics I could read straight off the flow itself — such as how many steps a task takes and whether users have to leave the platform.",
  "3 步": "3 steps",
  "內部測試者完成核心任務": "Internal testers completing core tasks",
  "5 名熟悉合約交易的內部成員，在無提示下皆完成手動平倉與止盈止損設定。":
    "All five internal members familiar with futures trading completed manual close and TP/SL setup without any prompting.",
  "與交易所一致的操作步數": "Step count matched to the exchanges",
  "平倉流程對齊 Binance / OKX / Bybit 的既有步數，既有交易者幾乎零學習成本即可接續。":
    "The close flow matches the existing step count on Binance / OKX / Bybit, so existing traders can pick it up with almost zero learning cost.",
  "平均操作時間": "Avg. time on task",
  "三個流程從「跳去交易所操作」改成「在 CA 內直接完成」，平均省下約 58% 的操作時間。":
    "Moving all three flows from “hop over to the exchange” to “done inside CA” cuts the average time on task by about 58%.",
  "操作時間對比：原本得跳去交易所來回，新版在 CA 內直接完成":
    "Time on task: previously a round trip to the exchange, now done directly inside CA",
  "操作流程": "Flow",
  "原本（CA → 交易所）": "Before (CA → exchange)",
  "新版（CA 內）": "After (inside CA)",
  "縮短": "Reduced",
  "手動限價平倉": "Manual limit close",
  "手動市價平倉": "Manual market close",
  "手動止盈止損": "Manual TP/SL",
  "秒": "s",
  "跟我平常用交易所的操作幾乎一樣，不用重新學。":
    "It works almost exactly like the exchanges I already use — nothing new to learn.",
  "平倉和止盈止損直接在策略頁就能設，不用再切回交易所，整個順很多。":
    "I can set close and TP/SL right on the strategy page without switching back to the exchange — so much smoother.",
  "一眼就看得到每個倉位離止盈止損還有多遠，這在以前的 CA 看不到。":
    "I can see at a glance how far each position is from its TP/SL — you couldn't see that in the old CA.",
  "限價跟市價分得很清楚，跟著畫面走第一次就順利完成。":
    "Limit and market are clearly separated; I followed the screens and got it right on the first try.",
  "內部測試者": "Internal tester",
  "合約交易使用者": "Futures trader",
  "量化策略使用者": "Quant-strategy user",
  "產品團隊成員": "Product team",
  "前端工程師": "Frontend engineer",
  "驗證方式：以 5 名內部成員進行任務式可用性測試（請受測者在無提示下完成指定的平倉 / 止盈止損任務）。上述數字為內部測試與設計流程觀察，非線上後台營運數據。":
    "Method: a task-based usability test with five internal members (each asked to complete the close / TP-SL tasks unaided). These figures come from internal testing and design-flow observations, not live production analytics.",

  // ── Reflect ──
  "在快節奏與限制下做設計": "Designing in Fast-Moving Product Constraints",
  "這份實習讓我學會在快節奏產品開發中做設計判斷：當沒有額外資源安排正式用戶測試時，透過內部團隊與工程師快速驗證流程，再把交易所既有操作習慣、CA 原本的設計系統與技術限制一起納入取捨。":
    "This internship taught me how to make design decisions in a fast-moving product environment: when there were no extra resources for formal user testing, I validated flows quickly with the internal team and engineers, then balanced exchange interaction patterns with CA's existing design system and technical constraints.",
  "在快節奏中快速收斂方案": "Converging Quickly in a Fast-Moving Product Cycle",
  "以 1–2 週為節奏，把模糊的產品需求拆成可討論的 flow、wireframe 與原型畫面，讓團隊能更快對齊方向並推進交付。":
    "On a 1-2 week rhythm, I broke fuzzy product needs into discussable flows, wireframes, and prototypes so the team could align faster and keep delivery moving.",
  "用內部測試補足驗證節奏": "Using Internal Testing to Keep Validation Moving",
  "在沒有額外資源安排正式用戶測試的情況下，透過內部團隊、工程師與熟悉產品流程的成員快速測試操作邏輯，及早發現資訊層級、流程理解與實作限制問題。":
    "Without extra resources for formal user testing, I used internal team members, engineers, and people familiar with the product flow to quickly test interaction logic and catch issues in information hierarchy, flow comprehension, and implementation constraints early.",
  "把參考設計轉化成適合 CA 的流程": "Translating References into a CA-Native Flow",
  "參考交易所既有模式時，重點不是照搬介面，而是理解使用者已熟悉的操作習慣，再結合 CA 原本的設計系統、風控邏輯與平台元件，轉化成更一致且可落地的方案。":
    "When referencing exchange patterns, the goal was not to copy the interface, but to understand familiar user behaviors and translate them through CA's existing design system, risk-control logic, and platform components into a more consistent and feasible solution.",
} as const;

type CryptoArsenalKey = keyof typeof en;

export function translateCryptoArsenal(locale: Locale, text: string) {
  return locale === "en" ? en[text as CryptoArsenalKey] ?? text : text;
}
