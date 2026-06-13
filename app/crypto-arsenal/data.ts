/* Crypto Arsenal 案例頁內容資料。
   內容以 Figma 完稿（Portfolio-Site node 2574-249）為準；
   圖檔對應 public/projects/crypto-arsenal/（Step 5 由 Figma MCP 匯出）。 */

const IMG = "/projects/crypto-arsenal";

export const heroTasks = ["二手研究", "線框稿", "原型設計", "設計交付影片"];

export const flowSteps = [
  "二手研究 / 用戶反饋",
  "UI flow 提案",
  "線框稿設計",
  "與 PO 討論可行性",
  "原型設計",
  "內部團隊 review",
  "設計交付影片",
  "Jira 排 tickets",
];

export interface PainCard {
  quote: string;
  name: string;
  role: string;
  tone: "orange" | "blue";
}

export const painCards: PainCard[] = [
  {
    quote:
      "「策略賺了多少我看得到，但它現在開的是多倉還是空倉、正在賺還是賠，介面上完全看不出來。」",
    name: "策略開發者 A",
    role: "啟動 / 跟單策略的一般交易者",
    tone: "orange",
  },
  {
    quote:
      "「想確認倉位只能登入交易所，同時跑好幾支策略時，我根本分不清哪一筆是哪支策略開的。」",
    name: "策略開發者 B",
    role: "同時運行多支策略",
    tone: "orange",
  },
  {
    quote:
      "「策略本身有設定止盈止損，但市場變化太快，我想先手動停利或止損，不一定想等策略條件被觸發才離場。」",
    name: "策略開發者 C",
    role: "彈性停利停損",
    tone: "orange",
  },
  {
    quote:
      "「已經獲利到我滿意的程度了，我想自己先落袋，而不是乾等策略設定的條件才平倉。」",
    name: "交易者 A",
    role: "想保留人工介入的使用者",
    tone: "blue",
  },
  {
    quote:
      "「我只是想提前平掉一筆倉位，跑去交易所操作，結果整支策略被系統判定異常停掉、還救不回來。」",
    name: "交易者 B",
    role: "遇過策略被強制中止",
    tone: "blue",
  },
  {
    quote:
      "「我想知道目前倉位距離止盈 / 止損還有多遠，但 CA 只看到整體績效，看不出這筆倉位接下來可能在哪裡被平掉。」",
    name: "交易者 C",
    role: "出場風險掌握",
    tone: "blue",
  },
];

export interface DecisionPath {
  head: string;
  title: string;
  steps: string[];
  outcome: string;
}

export const decisionBad: DecisionPath = {
  head: "目前在交易所手動平倉",
  title: "CA 看不懂你的意圖",
  steps: [
    "使用者跳出 CA、到交易所手動操作",
    "機器人發現管理的倉位突然消失",
    "內部狀態與交易所不一致、視為異常",
  ],
  outcome: "→ 強制停掉整支策略，且無法恢復",
};

export const decisionGood: DecisionPath = {
  head: "未來在 CA 內手動平倉",
  title: "系統理解為合法操作",
  steps: [
    "使用者在 CA 內按下平倉",
    "CA 告知機器人這是主動、合法的指令",
    "機器人同步狀態、不進入錯誤保護",
  ],
  outcome: "→ 只結束當前倉位、策略繼續運行",
};

export interface ExchangeShot {
  name: string;
  logo: string;
  img: string;
  alt: string;
  /** 原始圖檔尺寸，餵給 next/image 保持比例 */
  width: number;
  height: number;
}

export const positionShots: ExchangeShot[] = [
  {
    name: "Binance",
    logo: `${IMG}/research/logo-binance.webp`,
    img: `${IMG}/research/positions-binance.webp`,
    alt: "Binance 合約倉位列表介面，含 Symbol、Size、Entry Price、Mark Price、Margin、PNL 等欄位",
    width: 1600,
    height: 239,
  },
  {
    name: "Bybit",
    logo: `${IMG}/research/logo-bybit.webp`,
    img: `${IMG}/research/positions-bybit.webp`,
    alt: "Bybit 合約倉位列表介面，含倉位數量、入場價、標記價、強平價與未實現損益欄位",
    width: 1600,
    height: 351,
  },
  {
    name: "OKX",
    logo: `${IMG}/research/logo-okx.webp`,
    img: `${IMG}/research/positions-okx.webp`,
    alt: "OKX 合約倉位列表介面，含倉位資訊欄位與 Close 平倉入口",
    width: 1073,
    height: 190,
  },
];

export const closeFlowShots: ExchangeShot[] = [
  {
    name: "Binance",
    logo: `${IMG}/research/logo-binance.webp`,
    img: `${IMG}/research/close-binance.webp`,
    alt: "Binance 合約平倉流程：輸入金額和數量後，點擊 Limit 按鈕確認限價平倉，或點擊 Market 按鈕確認市價平倉",
    width: 1395,
    height: 644,
  },
  {
    name: "Bybit",
    logo: `${IMG}/research/logo-bybit.webp`,
    img: `${IMG}/research/close-bybit.webp`,
    alt: "Bybit 合約平倉流程：點擊 Limit 按鈕設定限價平倉（可設定金額與數量），或點擊 Market 按鈕市價平倉（可設定數量）",
    width: 1402,
    height: 767,
  },
  {
    name: "OKX",
    logo: `${IMG}/research/logo-okx.webp`,
    img: `${IMG}/research/close-okx.webp`,
    alt: "OKX 合約平倉流程：限價平倉可設定金額與數量，市價平倉可設定數量",
    width: 1403,
    height: 833,
  },
];

export const tpslFlowShots: ExchangeShot[] = [
  {
    name: "Binance",
    logo: `${IMG}/research/logo-binance.webp`,
    img: `${IMG}/research/tpsl-binance.webp`,
    alt: "Binance 合約止盈止損流程：點擊 TP/SL for position 下方編輯按鈕，可設定止盈與止損觸發價格（最新 / 標記），數量是全倉無法設定",
    width: 1404,
    height: 401,
  },
  {
    name: "Bybit",
    logo: `${IMG}/research/logo-bybit.webp`,
    img: `${IMG}/research/tpsl-bybit.webp`,
    alt: "Bybit 合約止盈止損流程：點擊 TP/SL 下方 +Add 按鈕，可設定止盈與止損觸發價格（最新 / 標記）與數量",
    width: 1404,
    height: 401,
  },
  {
    name: "OKX",
    logo: `${IMG}/research/logo-okx.webp`,
    img: `${IMG}/research/tpsl-okx.webp`,
    alt: "OKX 合約止盈止損流程：點擊 Position TP/SL 下方 add 按鈕，可設定止盈與止損觸發價格（最新 / 標記）與數量",
    width: 1404,
    height: 401,
  },
];

export interface WireframeBoard {
  kicker: string;
  title: string;
  /** 完稿的三個提案 tab；目前僅方案一有畫布圖檔，其餘標記 pending（待 Figma 元件變體匯出） */
  tabs: { label: string; active?: boolean }[];
  img: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  reasonTitle: string;
  reasonBody: string;
}

export const wireframeBoards: WireframeBoard[] = [
  {
    kicker: "操作流程 1",
    title: "CA 內手動平倉",
    tabs: [
      { label: "方案一：Metrix Chart", active: true },
      { label: "方案二：Dropdown List" },
      { label: "最終方案：Sidebar" },
    ],
    img: `${IMG}/wireframe/wf-close-metric.webp`,
    alt: "CA 內手動平倉 wireframe 方案一：在策略詳情頁的趨勢圖旁，以欄位列表呈現倉位資訊的版面配置",
    width: 1248,
    height: 1082,
    caption: "開單之後，會在 Position Tab 底下呈現最新的倉位資訊",
    reasonTitle: "未採納原因",
    reasonBody:
      "左邊的趨勢圖需要往左縮小，以資訊層級而言，趨勢圖當中會標記何時進場和出場，若圖表過小很難點擊這些資訊。另外，右邊空間無法塞入 8–10 欄交易所的所有資訊，必定會有部分資訊被犧牲。",
  },
  {
    kicker: "操作流程 2",
    title: "CA 內手動止盈止損",
    tabs: [
      { label: "方案一：Checkbox", active: true },
      { label: "方案二：Dropdown List" },
      { label: "最終方案：Sidebar" },
    ],
    img: `${IMG}/wireframe/wf-tpsl-checkbox.webp`,
    alt: "CA 內手動止盈止損 wireframe 方案一：在策略詳情頁以 Checkbox 形式設定止盈止損的版面配置",
    width: 1248,
    height: 1082,
    caption: "開單之後，會在 Position Tab 底下呈現最新的倉位資訊",
    reasonTitle: "未採納原因",
    reasonBody:
      "左邊的趨勢圖需要往左縮小，以資訊層級而言，趨勢圖當中會標記何時進場和出場，若圖表過小很難點擊這些資訊。另外，右邊空間無法塞入 8–10 欄交易所的所有資訊，必定會有部分資訊被犧牲。",
  },
];

export interface IterationBoard {
  badge: string;
  title: string;
  label: string;
  paragraphs: string[];
  beforeImg: string;
  beforeAlt: string;
  afterImg: string;
  afterAlt: string;
  width: number;
  height: number;
}

export const iterationBoards: IterationBoard[] = [
  {
    badge: "操作流程 1",
    title: "平倉數量互動方式",
    label: "貼合用戶實際需求修正",
    paragraphs: [
      "原本的平倉數量採用輸入框搭配下拉選單的方式，使用者需要點擊欄位後，再從 10%、20%、50%、100% 等固定比例中選擇。這種設計雖然能快速選取常用比例，但這些比例若非用戶的選擇，則需要手動輸入。另外，選項展開後也會覆蓋下方內容，讓彈窗視覺變得較擁擠。",
      "調整後將平倉數量元件改為「輸入框 + 比例滑桿」的形式。使用者可以直接透過滑桿調整平倉比例，並即時看到目前比例數值，例如 0%。相較於下拉選單，滑桿更適合表達「從 0% 到 100%」這種連續比例的操作，也讓平倉數量的調整方式更直覺。",
    ],
    beforeImg: `${IMG}/iteration/iter-qty-before.webp`,
    beforeAlt: "迭代前：平倉數量使用下拉選單，展開後覆蓋彈窗下方內容",
    afterImg: `${IMG}/iteration/iter-qty-after.webp`,
    afterAlt: "迭代後：平倉數量改為輸入框加比例滑桿，並即時顯示預估損益說明",
    width: 646,
    height: 419,
  },
  {
    badge: "操作流程 2",
    title: "系統資訊顯示機制",
    label: "符合多數用戶的使用體驗",
    paragraphs: [
      "原本的 TP / SL 功能說明直接放在彈窗最下方，將完整的規則與限制一次性呈現在介面中。這樣雖然能讓使用者立即看到所有資訊，但也讓主要操作區被大量文字擠壓，視覺負擔較重。對已熟悉功能的使用者來說，這些長篇描述並不是每次操作都需要閱讀，反而會降低操作效率，讓介面顯得擁擠、不夠俐落。",
      "調整後將完整的功能說明收斂到標題旁的 info 元件中，只有在使用者 hover 或需要進一步理解時才會讀取到詳細資訊。這讓介面預設狀態更乾淨，主操作區能更聚焦在 Take Profit、Stop Loss 的價格設定與確認操作上，減少不必要的文字干擾。這樣的調整同時滿足了新手與專家的使用情境：對專家來說，他們通常已經理解 TP / SL 的運作規則，乾淨簡潔的介面能讓他們更快速完成設定，也更適合長期高頻使用；對新手來說，必要的專業資訊並沒有被移除，而是被放在可自主查看的 info 元件中，當他們需要了解觸發邏輯、適用範圍或限制條件時，可以主動滑到 info 查看完整說明。",
    ],
    beforeImg: `${IMG}/iteration/iter-info-before.webp`,
    beforeAlt: "迭代前：TP/SL 彈窗將完整功能說明直接放在最下方，操作區被大量文字擠壓",
    afterImg: `${IMG}/iteration/iter-info-after.webp`,
    afterAlt: "迭代後：功能說明收斂到標題旁的 info 元件，hover 才顯示完整說明",
    width: 646,
    height: 419,
  },
  {
    badge: "操作流程 2",
    title: "止盈止損操作按鈕",
    label: "預期操作與介面對齊",
    paragraphs: [
      "原本在 TP/SL 欄位中，即使該倉位已經設定過止盈止損，仍然顯示 Add 按鈕。這容易讓使用者誤解目前還可以「新增」另一組 TP/SL 委託，彷彿能持續替同一個倉位加掛多筆止盈止損設定。然而，在 CA 的操作邏輯中，TP/SL 是針對整個倉位一次性下單。當倉位已經送出 TP/SL 委託後，後續能做的行為並不是再次新增，而是調整原本已存在的止盈止損設定。因此，使用 Add 會讓介面語意與實際系統邏輯產生落差，增加使用者判斷成本。",
      "調整後，當倉位已經存在 TP/SL 設定時，按鈕文字改為 Modify。這讓使用者能更直覺地理解：目前不是要新增一筆新的止盈止損委託，而是要修改原本針對整個倉位設定的 TP/SL。這樣的調整讓操作語意更符合系統邏輯，也降低了使用者對後續操作的誤解。使用者看到 Modify 時，會自然反射出「我現在是在調整既有的整倉止盈止損設定」，而不是以為可以再次加掛新的 TP/SL 單。",
    ],
    beforeImg: `${IMG}/iteration/iter-tpsl-before.webp`,
    beforeAlt: "迭代前：倉位已設定止盈止損仍顯示 Add 按鈕",
    afterImg: `${IMG}/iteration/iter-tpsl-after.webp`,
    afterAlt: "迭代後：倉位已存在 TP/SL 設定時按鈕文字改為 Modify",
    width: 646,
    height: 261,
  },
];

export interface FinalFlow {
  kicker: string;
  title: string;
  img: string;
  alt: string;
  width: number;
  height: number;
}

/* 完稿三張皆為交付影片佔位截圖；正式影片（限價平倉 / 市價平倉 / 止盈止損）待後續嵌入。 */
export const finalFlows: FinalFlow[] = [
  {
    kicker: "操作流程 1",
    title: "CA 內手動限價平倉",
    img: `${IMG}/final/final-ui.webp`,
    alt: "CA 內手動限價平倉的最終介面：Trading Details 彈窗中的倉位列表與平倉入口",
    width: 2000,
    height: 1231,
  },
  {
    kicker: "操作流程 1",
    title: "CA 內手動市價平倉",
    img: `${IMG}/final/final-ui.webp`,
    alt: "CA 內手動市價平倉的最終介面：Trading Details 彈窗中的倉位列表與平倉入口",
    width: 2000,
    height: 1231,
  },
  {
    kicker: "操作流程 2",
    title: "CA 內手動止盈止損",
    img: `${IMG}/final/final-ui.webp`,
    alt: "CA 內手動止盈止損的最終介面：Trading Details 彈窗中的 TP/SL 設定入口",
    width: 2000,
    height: 1231,
  },
];

export interface ReflectCard {
  num: string;
  title: string;
  body: string;
}

export const reflectCards: ReflectCard[] = [
  {
    num: "01",
    title: "在 cadence 下持續出貨",
    body: "以 1–2 週為節奏把模糊的產品需求收斂成可交付的 flow 與畫面，跟上創辦人的產品藍圖。",
  },
  {
    num: "02",
    title: "在技術 / 風控限制下做取捨",
    body: "手動平倉的設計必須理解機器人風控邏輯，學會把「為什麼這樣設計」講清楚、跟工程與創辦人對齊。",
  },
  {
    num: "03",
    title: "誠實看待研究的深度",
    body: "以二手研究與競品為基礎不等於沒有依據；重點是把參考來源與決策邏輯說明白，而非包裝成沒做過的事。",
  },
];
