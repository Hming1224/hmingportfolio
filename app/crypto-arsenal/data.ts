/* Crypto Arsenal 案例頁內容資料。
   內容以 Figma 完稿（Portfolio-Site node 2574-249）為準；
   圖檔對應 public/projects/crypto-arsenal/（Step 5 由 Figma MCP 匯出）。 */

const IMG = "/projects/crypto-arsenal";

export const heroTasks = ["二手研究", "線框稿", "原型設計", "設計交付影片"];

export const flowSteps = [
  "二手研究 / 使用者回饋",
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
    width: 1536,
    height: 262,
  },
  {
    name: "Bybit",
    logo: `${IMG}/research/logo-bybit.webp`,
    img: `${IMG}/research/positions-bybit.webp`,
    alt: "Bybit 合約倉位列表介面，含倉位數量、入場價、標記價、強平價與未實現損益欄位",
    width: 1600,
    height: 239,
  },
  {
    name: "OKX",
    logo: `${IMG}/research/logo-okx.webp`,
    img: `${IMG}/research/positions-okx.webp`,
    alt: "OKX 合約倉位列表介面，含倉位資訊欄位與 Close 平倉入口",
    width: 1600,
    height: 351,
  },
];

/* ── 操作流程對比矩陣（列＝交易所、欄＝步驟）──
   每格是一張逐步驟截圖（research/steps/，由 Figma 完稿各步驟節點匯出）。
   設計用意：直欄對齊，眼睛往下掃一欄即可比較三家同一步驟怎麼做。 */
export const STEP_W = 1200;
export const STEP_H = 788;

interface MatrixCell {
  img: string;
  alt: string;
  /* 同一步驟若需要兩張畫面（如 Binance 平倉前多一個「輸入金額/數量」畫面），
     用 extraImg 在同一格內上下堆疊，並可用 note 補一句說明。 */
  extraImg?: string;
  extraAlt?: string;
  note?: string;
}

interface MatrixRow {
  name: string;
  logo: string;
  cells: MatrixCell[];
}

export interface FlowMatrix {
  kicker: string;
  title: string;
  stepLabels: string[];
  rows: MatrixRow[];
  synthesis: string;
}

const STEP = `${IMG}/research/steps`;
const LOGO = (n: string) => `${IMG}/research/logo-${n}.webp`;

export const closeMatrix: FlowMatrix = {
  kicker: "操作流程 1",
  title: "合約平倉",
  stepLabels: ["① 倉位 / 下單畫面", "②a 限價平倉（Limit）", "②b 市價平倉（Market）"],
  rows: [
    {
      name: "Binance",
      logo: LOGO("binance"),
      cells: [
        {
          img: `${STEP}/close-binance-1-start.webp`,
          alt: "Binance 合約交易畫面，於倉位列表找到要平倉的合約倉位",
          extraImg: `${STEP}/close-binance-1b-amount.webp`,
          extraAlt: "Binance 平倉前需先輸入平倉金額與數量的畫面",
          note: "Binance 多一步：需先輸入金額 / 數量",
        },
        { img: `${STEP}/close-binance-2-limit.webp`, alt: "Binance 限價平倉確認彈窗，可設定平倉價格與數量後送出" },
        { img: `${STEP}/close-binance-3-market.webp`, alt: "Binance 市價平倉確認彈窗，以當前市價立即平倉" },
      ],
    },
    {
      name: "Bybit",
      logo: LOGO("bybit"),
      cells: [
        { img: `${STEP}/close-bybit-1-start.webp`, alt: "Bybit 合約交易畫面，於倉位列表找到要平倉的合約倉位" },
        { img: `${STEP}/close-bybit-2-limit.webp`, alt: "Bybit 限價平倉彈窗，可設定平倉金額與數量" },
        { img: `${STEP}/close-bybit-3-market.webp`, alt: "Bybit 市價平倉彈窗，可設定平倉數量" },
      ],
    },
    {
      name: "OKX",
      logo: LOGO("okx"),
      cells: [
        { img: `${STEP}/close-okx-1-start.webp`, alt: "OKX 合約交易畫面，於倉位列表找到要平倉的合約倉位" },
        { img: `${STEP}/close-okx-2-limit.webp`, alt: "OKX 限價平倉彈窗，可設定平倉金額與數量" },
        { img: `${STEP}/close-okx-3-market.png`, alt: "OKX 市價平倉彈窗，可設定平倉數量" },
      ],
    },
  ],
  synthesis:
    "三家平倉流程大致一致：在倉位列表找到倉位 →（限價或市價二擇一）→ 確認送出；差別僅在 Binance 需多一個輸入金額 / 數量的畫面。CA 沿用相同的核心結構。",
};

export const tpslMatrix: FlowMatrix = {
  kicker: "操作流程 2",
  title: "合約止盈止損",
  stepLabels: ["① 倉位 / 下單畫面", "② 設定止盈止損"],
  rows: [
    {
      name: "Binance",
      logo: LOGO("binance"),
      cells: [
        { img: `${STEP}/tpsl-binance-1-start.webp`, alt: "Binance 合約交易畫面，於倉位列表找到要設定止盈止損的倉位" },
        { img: `${STEP}/tpsl-binance-2-setup.webp`, alt: "Binance TP/SL 設定彈窗，可設定止盈與止損觸發價格（最新 / 標記），數量為全倉" },
      ],
    },
    {
      name: "Bybit",
      logo: LOGO("bybit"),
      cells: [
        { img: `${STEP}/tpsl-bybit-1-start.webp`, alt: "Bybit 合約交易畫面，於倉位列表找到要設定止盈止損的倉位" },
        { img: `${STEP}/tpsl-bybit-2-setup.webp`, alt: "Bybit TP/SL 設定彈窗，可設定止盈與止損觸發價格（最新 / 標記）與數量" },
      ],
    },
    {
      name: "OKX",
      logo: LOGO("okx"),
      cells: [
        { img: `${STEP}/tpsl-okx-1-start.webp`, alt: "OKX 合約交易畫面，於倉位列表找到要設定止盈止損的倉位" },
        { img: `${STEP}/tpsl-okx-2-setup.webp`, alt: "OKX TP/SL 設定彈窗，可設定止盈與止損觸發價格（最新 / 標記）與數量" },
      ],
    },
  ],
  synthesis:
    "三家止盈止損同樣是兩步：開啟倉位 → 設定止盈 / 止損的觸發價與數量。CA 沿用相同結構。",
};

export interface WireframeBoard {
  kicker: string;
  title: string;
  defaultProposalIndex?: number;
  proposals: WireframeProposal[];
}

interface WireframeProposal {
  label: string;
  adopted?: boolean;
  slides: WireframeSlide[];
  reasonTitle: string;
  reasonBody: string;
  referenceImages?: WireframeReferenceImage[];
}

interface WireframeSlide {
  img: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
}

interface WireframeReferenceImage {
  img: string;
  alt: string;
  width: number;
  height: number;
}

const WIRE = `${IMG}/wireframe/figma`;
const WF_W = 1248;
const WF_H = 1082;
const WATCHLIST_REFERENCES: WireframeReferenceImage[] = [
  {
    img: `${WIRE}/close-final-reference-watchlist-add.png`,
    alt: "CA Watchlist 頁面點擊 add 按鈕後開啟 Sidebar 的操作流程參考",
    width: 1030,
    height: 535,
  },
  {
    img: `${WIRE}/close-final-reference-watchlist-sidebar.png`,
    alt: "CA Watchlist 頁面右側 Sidebar 選擇策略機器人並加入清單的操作流程參考",
    width: 1030,
    height: 535,
  },
];

export const wireframeBoards: WireframeBoard[] = [
  {
    kicker: "操作流程 1",
    title: "CA 內手動平倉",
    defaultProposalIndex: 0,
    proposals: [
      {
        label: "方案一：Matrix Chart",
        slides: [
          {
            img: `${WIRE}/close-option-1-step-1.png`,
            alt: "CA 內手動平倉方案一 step 1：在策略詳情頁的趨勢圖旁呈現倉位資訊",
            width: WF_W,
            height: WF_H,
            caption: "右上角新增 Exchange Record 的 Tab，點擊後可以看到倉位資訊，選擇對應的倉位，點擊 close 按鈕。",
          },
          {
            img: `${WIRE}/close-option-1-step-2.png`,
            alt: "CA 內手動平倉方案一 step 2：使用者在 Matrix Chart 旁查看平倉資訊",
            width: WF_W,
            height: WF_H,
            caption: "彈出 Pop-up 視窗，預設以限價平倉，輸入金額與數量，最後再點 confirm 按鈕。",
          },
          {
            img: `${WIRE}/close-option-1-step-3.png`,
            alt: "CA 內手動平倉方案一 step 3：使用者完成平倉設定",
            width: WF_W,
            height: WF_H,
            caption: "也可以在最上方的點選市價平倉，輸入數量後，最後再點 confirm 按鈕。",
          },
        ],
        reasonTitle: "未採納原因",
        reasonBody:
          "左邊的趨勢圖需要往左縮小，以資訊層級而言，趨勢圖當中會標記何時進場和出場，若圖表過小很難點擊這些資訊。另外，右邊空間無法塞入 8–10 欄交易所的所有資訊，必定會有部分資訊被犧牲。",
      },
      {
        label: "方案二：Dropdown List",
        slides: [
          {
            img: `${WIRE}/close-option-2-step-1.png`,
            alt: "CA 內手動平倉方案二 step 1：以 Dropdown List 顯示倉位資訊",
            width: WF_W,
            height: 1084,
            caption: "在原本的策略機器人 bar 右方加入交易資訊欄，顯示該策略目前倉位數量，以及交易筆數，點擊該按鈕。",
          },
          {
            img: `${WIRE}/close-option-2-step-2.png`,
            alt: "CA 內手動平倉方案二 step 2：展開 Dropdown List 查看倉位",
            width: WF_W,
            height: 1084,
            caption: "顯示下拉選單，可看到倉位資訊，選擇對應的倉位，點擊 close 按鈕。",
          },
          {
            img: `${WIRE}/close-option-2-step-3.png`,
            alt: "CA 內手動平倉方案二 step 3：在 Dropdown List 中選擇平倉操作",
            width: WF_W,
            height: WF_H,
            caption: "彈出 Pop-up 視窗，預設以限價平倉，輸入金額與數量，最後再點 confirm 按鈕。",
          },
          {
            img: `${WIRE}/close-option-2-step-4.png`,
            alt: "CA 內手動平倉方案二 step 4：完成平倉設定",
            width: WF_W,
            height: WF_H,
            caption: "也可以在最上方的點選市價平倉，輸入數量後，最後再點 confirm 按鈕。",
          },
        ],
        reasonTitle: "未採納原因",
        reasonBody:
          "用 Dropdown 把倉位資訊顯示在該策略機器人 bar 下方，會擋到其他策略機器人的完整呈現；加上交易所本身也限制一次最多顯示 20 筆訂單 / 倉位。",
      },
      {
        label: "最終方案：Sidebar",
        adopted: true,
        slides: [
          {
            img: `${WIRE}/close-final-step-1.png`,
            alt: "CA 內手動平倉最終方案 step 1：從策略詳情頁進入 Sidebar 流程",
            width: WF_W,
            height: WF_H,
            caption: "將原本 action 欄位，另外新增 view details 按鈕，點擊該按鈕。",
          },
          {
            img: `${WIRE}/close-final-step-2.png`,
            alt: "CA 內手動平倉最終方案 step 2：Sidebar 展開可操作倉位",
            width: WF_W,
            height: WF_H,
            caption: "彈出 Pop-up 視窗，可看到倉位資訊，選擇對應的倉位，點擊 close 按鈕。",
          },
          {
            img: `${WIRE}/close-final-step-3.png`,
            alt: "CA 內手動平倉最終方案 step 3：選擇平倉項目",
            width: WF_W,
            height: WF_H,
            caption: "從右邊 sidebar 彈出視窗，預設以限價平倉，輸入金額與數量，最後再點 confirm 按鈕。",
          },
          {
            img: `${WIRE}/close-final-step-4.png`,
            alt: "CA 內手動平倉最終方案 step 4：確認平倉參數",
            width: WF_W,
            height: WF_H,
            caption: "也可以在最上方的點選市價平倉，輸入數量後，最後再點 confirm 按鈕。",
          },
        ],
        reasonTitle: "採納理由",
        reasonBody:
          "參考 CA 中 Watchlist 頁面的選擇策略機器人流程，點擊 add 按鈕後，右邊的 sidebar 展開，使用者可以點選有興趣機器人並加入到右邊清單中。平倉沿用這套大家已經熟悉的操作，讓使用者不用為了平倉重新適應一套新流程。",
        referenceImages: WATCHLIST_REFERENCES,
      },
    ],
  },
  {
    kicker: "操作流程 2",
    title: "CA 內手動止盈止損",
    defaultProposalIndex: 0,
    proposals: [
      {
        label: "方案一：Checkbox",
        slides: [
          {
            img: `${WIRE}/tpsl-option-1-step-1.png`,
            alt: "CA 內手動止盈止損方案一 step 1：以 Checkbox 形式設定 TP/SL",
            width: WF_W,
            height: WF_H,
            caption: "將原本 action 欄位，另外新增 view details 按鈕，點擊該按鈕。",
          },
          {
            img: `${WIRE}/tpsl-option-1-step-2.png`,
            alt: "CA 內手動止盈止損方案一 step 2：勾選 Checkbox 進入 TP/SL 設定",
            width: WF_W,
            height: WF_H,
            caption: "彈出 Pop-up 視窗，可看到倉位資訊，TP/SL 的 checkbox 在該倉位的正下方。",
          },
          {
            img: `${WIRE}/tpsl-option-1-step-3.png`,
            alt: "CA 內手動止盈止損方案一 step 3：設定止盈與止損條件",
            width: WF_W,
            height: WF_H,
            caption: "勾選 TP/SL 的 checkbox，在右邊輸入止盈止損價格，最後點選 add 按鈕。",
          },
          {
            img: `${WIRE}/tpsl-option-1-step-4.png`,
            alt: "CA 內手動止盈止損方案一 step 4：完成 TP/SL 設定",
            width: WF_W,
            height: WF_H,
            caption: "完成 TP/SL 下單後，可看到下單價格，需要修改可以再點擊 add 按鈕。",
          },
        ],
        reasonTitle: "未採納原因",
        reasonBody:
          "這個版本參考幣安現行設計，是使用者習慣、也還不錯的做法，但 CA 目前沒有這個元件，要重新手刻比較費時。",
      },
      {
        label: "方案二：Dropdown List",
        slides: [
          {
            img: `${WIRE}/tpsl-option-2-step-1.png`,
            alt: "CA 內手動止盈止損方案二 step 1：以 Dropdown List 顯示 TP/SL 入口",
            width: WF_W,
            height: WF_H,
            caption: "將原本 action 欄位，另外新增 view details 按鈕，點擊該按鈕。",
          },
          {
            img: `${WIRE}/tpsl-option-2-step-2.png`,
            alt: "CA 內手動止盈止損方案二 step 2：展開 Dropdown List",
            width: WF_W,
            height: WF_H,
            caption: "彈出 Pop-up 視窗，可看到倉位資訊，最右邊有 TP/SL 欄位，點擊 add 按鈕。",
          },
          {
            img: `${WIRE}/tpsl-option-2-step-3.png`,
            alt: "CA 內手動止盈止損方案二 step 3：設定止盈止損條件",
            width: WF_W,
            height: WF_H,
            caption: "點擊 add 按鈕，在下方跳出 dropdown 視窗，輸入止盈止損價格，最後點選 confirm 按鈕。",
          },
          {
            img: `${WIRE}/tpsl-option-2-step-4.png`,
            alt: "CA 內手動止盈止損方案二 step 4：確認 TP/SL 設定",
            width: WF_W,
            height: WF_H,
            caption: "完成 TP/SL 下單後，可看到下單價格，需要修改可以再點擊 add 按鈕。",
          },
        ],
        reasonTitle: "未採納原因",
        reasonBody:
          "目前的 Dropdown List 在平台中僅用於設定策略機器人的 API 或是交易幣別設定，若是用於新增全新的委託或是平倉，這樣設計會與原本 Dropdown List 使用邏輯有衝突。",
      },
      {
        label: "最終方案：Sidebar",
        adopted: true,
        slides: [
          {
            img: `${WIRE}/tpsl-final-step-1.png`,
            alt: "CA 內手動止盈止損最終方案 step 1：從策略詳情頁進入 Sidebar",
            width: WF_W,
            height: WF_H,
            caption: "將原本 action 欄位，另外新增 view details 按鈕，點擊該按鈕。",
          },
          {
            img: `${WIRE}/tpsl-final-step-2.png`,
            alt: "CA 內手動止盈止損最終方案 step 2：Sidebar 展開 TP/SL 設定",
            width: WF_W,
            height: WF_H,
            caption: "彈出 Pop-up 視窗，可看到倉位資訊，最右邊有 TP/SL 欄位，點擊 add 按鈕。",
          },
          {
            img: `${WIRE}/tpsl-final-step-3.png`,
            alt: "CA 內手動止盈止損最終方案 step 3：確認止盈止損參數",
            width: WF_W,
            height: WF_H,
            caption: "從右邊 sidebar 彈出視窗，TP 和 SL 可分別輸入金額，最後再點 confirm 按鈕。",
          },
          {
            img: `${WIRE}/tpsl-final-step-4.png`,
            alt: "CA 內手動止盈止損最終方案 step 4：完成 TP/SL 設定",
            width: WF_W,
            height: WF_H,
            caption: "完成 TP/SL 下單後，可看到下單價格，需要修改可以再點擊 add 按鈕。",
          },
        ],
        reasonTitle: "採納理由",
        reasonBody:
          "參考 CA 中 Watchlist 頁面的選擇策略機器人流程，點擊 add 按鈕後，右邊的 sidebar 展開，使用者可以點選有興趣機器人並加入到右邊清單中。設定止盈止損時沿用同一套熟悉的操作，讓使用者少一層上手門檻。",
        referenceImages: WATCHLIST_REFERENCES,
      },
    ],
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
    badge: "操作流程\n1 & 2",
    title: "策略機器人Bar UI顯示資訊",
    label: "優化策略列表資訊層級與操作按鈕一致性",
    paragraphs: [
      "原本列表欄位同時顯示 Performance 與 Time Period，導致資訊集中在表格中，欄位偏多、橫向空間被壓縮；右側 Action 區只有主要的 Stop 按鈕，Duplicate 功能不明顯或不在同一層級呈現。",
      "調整後，新版將 Performance 與 Time Period 從下方列表中移除，改放到上方 Accumulated EC 圖表區域。這樣使用者在查看績效曲線時，可以直接對照策略 ID 與時間區間，不需要再到表格欄位中交叉比對，資訊層級更清楚，也讓下方列表更精簡。",
    ],
    beforeImg: `${IMG}/iteration/figma/iter-bar-before-content.png`,
    beforeAlt: "迭代前：策略列表欄位同時顯示 Performance 與 Time Period，Action 區僅有 Stop 按鈕",
    afterImg: `${IMG}/iteration/figma/iter-bar-after-content.png`,
    afterAlt: "迭代後：移除非必要欄位至 Accumulated EC，Action 區新增 Duplicate 與 View Details 按鈕",
    width: 600,
    height: 318,
  },
  {
    badge: "操作流程 1",
    title: "平倉數量互動方式",
    label: "貼合使用者實際需求修正",
    paragraphs: [
      "原本的平倉數量採用輸入框搭配下拉選單的方式，使用者需要點擊欄位後，再從 10%、20%、50%、100% 等固定比例中選擇。這種設計雖然能快速選取常用比例，但這些比例若非使用者的選擇，則需要手動輸入。另外，選項展開後也會覆蓋下方內容，讓彈窗視覺變得較擁擠。",
      "調整後將平倉數量元件改為「輸入框 + 比例滑桿」的形式。使用者可以直接透過滑桿調整平倉比例，並即時看到目前比例數值，例如 0%。相較於下拉選單，滑桿更適合表達「從 0% 到 100%」這種連續比例的操作，也讓平倉數量的調整方式更直覺。",
    ],
    beforeImg: `${IMG}/iteration/figma/iter-qty-before-content.png`,
    beforeAlt: "迭代前：平倉數量使用下拉選單，展開後覆蓋彈窗下方內容",
    afterImg: `${IMG}/iteration/figma/iter-qty-after-content.png`,
    afterAlt: "迭代後：平倉數量改為輸入框加比例滑桿，並即時顯示預估損益說明",
    width: 646,
    height: 419,
  },
  {
    badge: "操作流程 2",
    title: "系統資訊顯示機制",
    label: "符合多數使用者的使用體驗",
    paragraphs: [
      "原本的 TP / SL 功能說明直接放在彈窗最下方，將完整的規則與限制一次性呈現在介面中。這樣雖然能讓使用者立即看到所有資訊，但也讓主要操作區被大量文字擠壓，視覺負擔較重。對已熟悉功能的使用者來說，這些長篇描述並不是每次操作都需要閱讀，反而會降低操作效率，讓介面顯得擁擠、不夠俐落。",
      "調整後將完整的功能說明收斂到標題旁的 info 元件中，只有在使用者 hover 或需要進一步理解時才會讀取到詳細資訊。這讓介面預設狀態更乾淨，主操作區能更聚焦在 Take Profit、Stop Loss 的價格設定與確認操作上，減少不必要的文字干擾。這樣的調整同時滿足了新手與專家的使用情境：對專家來說，他們通常已經理解 TP / SL 的運作規則，乾淨簡潔的介面能讓他們更快速完成設定，也更適合長期高頻使用；對新手來說，必要的專業資訊仍完整保留，只是收進可自主查看的 info 元件中，當他們需要了解觸發邏輯、適用範圍或限制條件時，可以主動滑到 info 查看完整說明。",
    ],
    beforeImg: `${IMG}/iteration/figma/iter-info-before-content.png`,
    beforeAlt: "迭代前：TP/SL 彈窗將完整功能說明直接放在最下方，操作區被大量文字擠壓",
    afterImg: `${IMG}/iteration/figma/iter-info-after-content.png`,
    afterAlt: "迭代後：功能說明收斂到標題旁的 info 元件，hover 才顯示完整說明",
    width: 646,
    height: 419,
  },
  {
    badge: "操作流程 2",
    title: "止盈止損操作按鈕",
    label: "預期操作與介面對齊",
    paragraphs: [
      "原本在 TP/SL 欄位中，即使該倉位已經設定過止盈止損，仍然顯示 Add 按鈕。這容易讓使用者誤解目前還可以「新增」另一組 TP/SL 委託，彷彿能持續替同一個倉位加掛多筆止盈止損設定。然而，在 CA 的操作邏輯中，TP/SL 是針對整個倉位一次性下單，委託送出後，後續能做的只有調整這筆既有設定。因此，使用 Add 會讓介面語意與實際系統邏輯產生落差，增加使用者判斷成本。",
      "調整後，當倉位已經存在 TP/SL 設定時，按鈕文字改為 Modify。使用者看到 Modify，就會知道自己是在調整整個倉位既有的止盈止損設定，不會再誤以為能加掛一筆新的 TP/SL 單。這樣操作語意更貼近系統實際邏輯，也少了對後續操作的誤解。",
    ],
    beforeImg: `${IMG}/iteration/figma/iter-tpsl-before-content.png`,
    beforeAlt: "迭代前：倉位已設定止盈止損仍顯示 Add 按鈕",
    afterImg: `${IMG}/iteration/figma/iter-tpsl-after-content.png`,
    afterAlt: "迭代後：倉位已存在 TP/SL 設定時按鈕文字改為 Modify",
    width: 646,
    height: 261,
  },
];

export interface FinalFlow {
  kicker: string;
  title: string;
  video: string;
  mask?: string;
  alt: string;
}

export const finalFlows: FinalFlow[] = [
  {
    kicker: "操作流程 1",
    title: "CA 內手動限價平倉",
    video: `${IMG}/final/close-position-limit.mp4`,
    mask: `${IMG}/final/tpsl-mask-alpha.png`,
    alt: "CA 內手動限價平倉的最終介面：Trading Details 彈窗中的倉位列表與平倉入口",
  },
  {
    kicker: "操作流程 1",
    title: "CA 內手動市價平倉",
    video: `${IMG}/final/close-position-market.mp4`,
    mask: `${IMG}/final/tpsl-mask-alpha.png`,
    alt: "CA 內手動市價平倉的最終介面：Trading Details 彈窗中的倉位列表與平倉入口",
  },
  {
    kicker: "操作流程 2",
    title: "CA 內手動止盈止損",
    video: `${IMG}/final/tp-sl-subtitled.mp4`,
    mask: `${IMG}/final/tpsl-mask-alpha.png`,
    alt: "CA 內手動止盈止損的最終介面：Trading Details 彈窗中的 TP/SL 設定入口",
  },
];

/* ── 設計成效（內部任務式可用性測試 + 流程層級指標）──
   數字皆為內部測試與設計流程觀察，非線上後台營運數據；method note 已於頁面標明。 */
export interface ImpactStat {
  value: string;
  label: string;
  body: string;
}

export const impactStats: ImpactStat[] = [
  {
    value: "任務洞見",
    label: "驗證熟悉操作能否轉移",
    body: "5 名熟悉合約交易的內部成員以既有交易經驗操作；回饋聚焦在流程熟悉度、控制感與是否需要切回交易所。",
  },
  {
    value: "相同步數",
    label: "維持交易所熟悉節奏",
    body: "平倉流程對齊 Binance / OKX / Bybit 的既有三步節奏；目標是沿用交易者熟悉的操作，不硬去砍步驟數。",
  },
  {
    value: "−58%",
    label: "平均操作時間",
    body: "三個流程從「跳去交易所操作」改成「在 CA 內直接完成」，平均省下約 58% 的操作時間。",
  },
];

/* before / after 操作時間對比（原本要跳交易所來回 vs 新版在 CA 內完成）。
   before / after 為秒數（純數字，單位另外翻譯），cut 為縮短百分比。 */
export interface ImpactTime {
  flow: string;
  before: string;
  after: string;
  cut: string;
}

export const impactTimes: ImpactTime[] = [
  { flow: "手動限價平倉", before: "65", after: "28", cut: "−57%" },
  { flow: "手動市價平倉", before: "48", after: "19", cut: "−60%" },
  { flow: "手動止盈止損", before: "82", after: "35", cut: "−57%" },
];

export interface ImpactQuote {
  text: string;
  who: string;
  role: string;
}

export const impactQuotes: ImpactQuote[] = [
  {
    text: "跟我平常用交易所的操作幾乎一樣，不用重新學。",
    who: "內部測試者",
    role: "合約交易使用者",
  },
  {
    text: "平倉和止盈止損直接在策略頁就能設，不用再切回交易所，整個順很多。",
    who: "內部測試者",
    role: "量化策略使用者",
  },
  {
    text: "一眼就看得到每個倉位離止盈止損還有多遠，這在以前的 CA 看不到。",
    who: "內部測試者",
    role: "產品團隊成員",
  },
  {
    text: "限價跟市價分得很清楚，跟著畫面走第一次就順利完成。",
    who: "內部測試者",
    role: "前端工程師",
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
    title: "在快節奏中快速收斂方案",
    body: "以 1–2 週為節奏，把模糊的產品需求拆成可討論的 flow、wireframe 與原型畫面，讓團隊能更快對齊方向並推進交付。",
  },
  {
    num: "02",
    title: "用內部測試補足驗證節奏",
    body: "在沒有額外資源安排正式使用者測試的情況下，透過內部團隊、工程師與熟悉產品流程的成員快速測試操作邏輯，及早發現資訊層級、流程理解與實作限制問題。",
  },
  {
    num: "03",
    title: "把參考設計轉化成適合 CA 的流程",
    body: "參考交易所既有模式，不代表把整套介面照搬過來。我們的做法是讀懂使用者已經熟悉的操作習慣，再結合 CA 原本的設計系統、風控邏輯與平台元件，轉化成更一致、也更好落地的方案。",
  },
];
