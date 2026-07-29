import { CaseOverview, getCaseOverviewLabel, OutcomeWalkthrough } from "../../../components/case-study";
import { getAdvantechTranslator } from "../i18n-server";

const overviewItems = [
  {
    label: "問題",
    title: "系統收齊數據，卻沒有幫使用者與企業做出判斷。",
    details: [
      {
        label: "企業端：管理跨系統、跨廠區風險的人",
        text: "EcoWatch、HVAC 與不同工廠各自累積資料，企業缺少統一入口比較設備與能源風險；即使資料完整，管理者仍很難快速決定該先處理哪個問題。",
        icon: "business",
        variant: "default",
      },
      {
        label: "廠務人員：天天用系統的人",
        text: "單一機台多出 20% 的能耗，淹沒在上百顆電表的總覽裡；新進人員每天要花 3 小時以上摸熟系統，異常判讀仍依賴資深師傅的經驗，而經驗很難交接。",
        icon: "user",
        variant: "default",
      },
      {
        label: "系統整合商 SI：幫客戶導入的人",
        text: "SI 拿這套系統替客戶做能源顧問，但系統只給 raw data、不給建議——「能省多少、該先關哪一台」答不出來；不熟需量規則的客戶，一年超約罰款高達 300 萬元。",
        icon: "business",
        variant: "default",
      },
    ],
    media: {
      src: "/projects/advantech/research/ecowatch-demand-analysis-figma.png",
      alt: "既有 EcoWatch 需量分析介面",
      caption: "既有 EcoWatch 需量分析：資料完整，但判讀仍靠使用者經驗。",
      fit: "contain",
    },
  },
  {
    label: "設計目標",
    title: "讓 AI 主動出現在需要判斷的地方，而不是等人來問。",
    details: [
      {
        label: "訪談推翻的假設",
        text: "原以為要做「什麼都能問」的聊天機器人，兩場訪談卻指向反面：資深廠務不需要等人來問的 AI，SI 更提醒回應超過 3 秒使用者就失去耐心。AI 應該在異常發生時主動帶入時間、地點與設備脈絡，讓人不必先知道該問什麼。",
        icon: "hypothesis",
        variant: "default",
      },
      {
        label: "How might we",
        text: "我們如何運用主動帶入脈絡的 AI，協助廠務團隊及早看懂能源與設備風險、判斷處理優先順序，並找到可執行的下一步？",
        icon: "question",
        variant: "highlight",
      },
    ],
    media: {
      src: "/projects/advantech/research/interview-synthesis-photo.webp",
      alt: "專案團隊訪談廠務與系統整合相關人員",
      caption: "從內部廠務與外部 SI 的工作流程，重新定位 AI 應該出現的時機。",
      fit: "cover",
    },
  },
  {
    label: "影響",
    title: "將模糊的 AI 構想，收斂成可評估、可延續的產品方向",
    details: [
      {
        label: "產品方向",
        text: "從泛用 Chatbot，收斂為兩個明確情境",
        note: "聚焦需量超約與設備能效異常，並讓 AI 分析直接進入既有圖表、通知與工作流程，而不是要求使用者先主動提問。",
        icon: "hypothesis",
        variant: "highlight",
      },
      {
        label: "團隊共識",
        text: "從抽象構想，變成團隊可共同評估的原型",
        note: "原型具體呈現 AI 的介入時機、資訊層級與風險處理方式，讓產品、設計、工程與商業角色能直接討論技術可行性與實作範圍。",
        icon: "validation",
        variant: "highlight",
      },
      {
        label: "驗證邊界",
        text: "方向獲得認可，但實際成效仍待驗證",
        note: "經過 3 次 POC 提案，CEO、iEMS 產品負責人與 UI Team Lead 認為方向可行，並肯定 AI 應融入既有異常處理流程；節能、異常發現、維修效率與採用情況，仍需透過真實場域的 Pilot 補足證據。",
        icon: "question",
        variant: "highlight",
      },
    ],
  },
] as const;

const walkthroughFlows = [
  {
    id: "demand-analysis",
    label: "需量分析 × AI 建議",
    steps: [
      { src: "/projects/advantech/solution/final-f11-01.webp", alt: "需量管理頁面，游標停在超約預警按鈕上", caption: "提案讓使用者從需量管理頁點選「超約預警」，由介面自動帶入時間與地點脈絡，不必先輸入問題。" },
      { src: "/projects/advantech/solution/final-f11-02.webp", alt: "AI Chatbot 彈出並自動代入需量預測提問", caption: "Prototype 示範 Chatbot 如何自動帶入提問，讓第一個問題對應使用者正在查看的畫面。" },
      { src: "/projects/advantech/solution/final-f11-03.webp", alt: "AI 回覆需量分析與折線圖表", caption: "概念流程呈現 AI 未來可以如何回覆需量分析、趨勢圖表與後續追問入口；資料擷取與回答準確度仍待技術驗證。" },
      { src: "/projects/advantech/solution/final-f11-04.webp", alt: "AI 回覆避免超約的結構化建議", caption: "提案以結構化行動建議取代長篇回覆，示範使用者可能如何繼續探索避免超約的方法。" },
      { src: "/projects/advantech/solution/final-f11-05.webp", alt: "AI 以圖表列出高耗能設備排名", caption: "提案以圖表呈現高耗能設備排序，具體化從數據分析銜接到處理優先順序的可能流程。" },
    ],
  },
  {
    id: "overage-alert",
    label: "超約預警通知",
    steps: [
      { src: "/projects/advantech/solution/final-f12-01.webp", alt: "系統通知中心顯示超約預警", caption: "Prototype 示範需量預測超標時，系統可以如何主動推送通知，而不必等使用者自行查找。" },
      { src: "/projects/advantech/solution/final-f12-02.webp", alt: "通知內的三級告警與發生時間", caption: "提案依預測超約的剩餘時間呈現三級告警，協助團隊討論風險排序應如何顯示。" },
      { src: "/projects/advantech/solution/final-f12-03.webp", alt: "AI 分析視窗顯示超約原因", caption: "概念流程呈現使用者點開 AI 分析後，可以如何查看可能原因與預測時間點。" },
      { src: "/projects/advantech/solution/final-f12-04.webp", alt: "高耗電設備清單", caption: "提案把高耗電設備清單放進告警脈絡，示範系統可能如何支援處理優先順序的判斷。" },
    ],
  },
  {
    id: "equipment-anomaly",
    label: "設備異常分析",
    steps: [
      { src: "/projects/advantech/solution/final-f2-01.webp", alt: "設備能耗異常的系統通知", caption: "Prototype 將同一套主動告警概念延伸到設備維護情境，示範異常通知可能出現的位置。" },
      { src: "/projects/advantech/solution/final-f2-02.webp", alt: "設備報警等級與異常標記", caption: "提案用三級告警標示設備與嚴重程度，具體化現場狀態的資訊層級。" },
      { src: "/projects/advantech/solution/final-f2-03.webp", alt: "AI 異常分析摘要", caption: "概念流程呈現 AI 未來可以如何彙整進出水溫度與事件資料，並指出可能的問題來源。" },
      { src: "/projects/advantech/solution/final-f2-04.webp", alt: "事件分析的溫度變化圖表", caption: "提案以一個月的溫度變化圖標示異常時間點，示範事件分析所需的資料脈絡。" },
      { src: "/projects/advantech/solution/final-f2-05.webp", alt: "AI 故障排除建議", caption: "提案示範 AI 未來可以如何參照維修手冊與故障代碼提出排除步驟；準確度與可追溯性仍待驗證。" },
    ],
  },
] as const;

export default async function OverviewSection() {
  const { t, locale } = await getAdvantechTranslator();
  return (
    <CaseOverview
      className="cs-overview"
      kicker={t("專案總覽")}
      title={t("數據散落在系統與廠區之間：讓 AI 成為使用者做判斷的統一入口。")}
      lead={
        <span className="ca-poc-context">
          <strong>{t("以前期 POC 探索生成式 AI 能如何為 iEMS 創造價值")}</strong>
          <span>{t("本專案屬於研華 Early Design Campaign 的前期探索，目的是將新興技術與商業機會轉化為可具體討論的產品概念。")}</span>
          <span>{t("這一階段並不是交付可正式上線的功能，而是找出值得投入的使用情境、釐清需要整合的資料與系統能力，並提供產品、設計與工程團隊共同評估下一步的具體提案。")}</span>
        </span>
      }
      items={overviewItems.map((item) => ({
        label: getCaseOverviewLabel(locale, item.label),
        title: t(item.title),
        details: item.details.map((detail) => ({
          label: t(detail.label),
          text: t(detail.text),
          note: "note" in detail ? t(detail.note) : undefined,
          icon: detail.icon,
          variant: detail.variant,
        })),
        media: "media" in item ? {
          src: item.media.src,
          alt: t(item.media.alt),
          caption: t(item.media.caption),
          fit: item.media.fit,
        } : undefined,
      }))}
      itemsLabel={t("專案快速總覽")}
      showcase={
        <OutcomeWalkthrough
          key="showcase"
          kicker={t("成果走查")}
          title={t("提案將需量風險與設備異常串成更清楚的判斷流程")}
          description={t("POC 具體呈現使用者未來可以如何從發現問題、查看脈絡與 AI 輔助分析，一路銜接到可能的處理方向。")}
          flows={walkthroughFlows.map((flow) => ({
            id: flow.id,
            label: t(flow.label),
            steps: flow.steps.map((step) => ({
              src: step.src,
              alt: t(step.alt),
              caption: t(step.caption),
            })),
          }))}
          labels={{
            flows: t("成果走查流程切換"),
            stage: t("成果走查畫面，可用左右方向鍵切換步驟"),
            step: t("Step"),
            prev: t("← 上一步"),
            next: t("下一步 →"),
            goToStep: t("跳到步驟"),
          }}
        />
      }
    />
  );
}
