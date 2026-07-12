import { CaseOverview } from "../../../components/case-study";
import OutcomeWalkthrough from "../components/OutcomeWalkthrough";
import { getAdvantechTranslator } from "../i18n-server";

const overviewItems = [
  {
    label: "問題",
    text: "上百顆電表的廠區裡，單一機台能耗多了 20% 在總覽中看不出來；新進廠務每天要花 3 小時以上摸熟系統；訪談中的客戶實例甚至一年被超約罰款 300 萬元。數據很完整，判斷卻還是靠個人經驗。",
    stat: { value: "300 萬", label: "一年超約罰款", note: "SI 訪談的客戶實例" },
  },
  {
    label: "設計目標",
    text: "兩場深度訪談推翻了「等人來問」的 chatbot 假設。設計改從圖表分析、系統與 Email 通知、對話問答三個入口切入，讓 AI 在異常發生或使用者回查時，都能把數據轉成下一步建議。",
    stat: { value: "3 個", label: "AI 工作流入口", note: "圖表 × 通知 × 對話" },
  },
  {
    label: "解決方案",
    text: "配合每 15 分鐘更新的需量預測，UI 同時呈現即時值、未來 4 小時的超約點與前 15% 高耗電設備；再從圖表或通知帶入時間與地點，直接串起原因分析、風險分級與行動建議。模式識別也沿用同一條判讀路徑。",
    stat: { value: "15 分鐘", label: "需量預測更新", note: "一次展開未來 4 小時" },
  },
  {
    label: "影響",
    text: "最終提案後，主管肯定我們沒有只做 AI Chatbot，而是把 EcoWatch、HVAC、不同工廠與海外研發中心的資料，規劃成統一入口，並從短期查詢延伸到長期追蹤與報表。這份藍圖也把 RAG 跨庫取數與機台面板納入後續方向；四條功能則已收斂成可開發規格，超約風險進入後端實作。由於尚未進行使用者測試，預設問題能否涵蓋廠務日常仍待驗證。",
    stat: { value: "跨系統", label: "跨廠區 AI 入口", note: "主管回饋，依會後記憶整理" },
  },
] as const;

const walkthroughFlows = [
  {
    id: "demand-analysis",
    label: "需量分析 × AI 建議",
    steps: [
      { src: "/projects/advantech/solution/final-f11-01.webp", alt: "需量管理頁面，游標停在超約預警按鈕上", caption: "使用者在需量管理頁點「超約預警」，前台自動帶入時間與地點脈絡，不用打任何字。" },
      { src: "/projects/advantech/solution/final-f11-02.webp", alt: "AI Chatbot 彈出並自動代入需量預測提問", caption: "AI Chatbot 彈出並自動代入問題，第一次提問就精準對到使用者正在看的畫面。" },
      { src: "/projects/advantech/solution/final-f11-03.webp", alt: "AI 回覆需量分析與折線圖表", caption: "AI 讀取資料庫回覆需量分析與趨勢圖表，並附上問題模組讓使用者往下追問。" },
      { src: "/projects/advantech/solution/final-f11-04.webp", alt: "AI 回覆避免超約的結構化建議", caption: "一鍵追問「如何避免超約」，AI 回覆結構化的行動建議，而不是一段難以消化的長文。" },
      { src: "/projects/advantech/solution/final-f11-05.webp", alt: "AI 以圖表列出高耗能設備排名", caption: "再追問高耗能設備排名，AI 用圖表列出最該優先處理的設備，從數據直接推進到行動。" },
    ],
  },
  {
    id: "overage-alert",
    label: "超約預警通知",
    steps: [
      { src: "/projects/advantech/solution/final-f12-01.webp", alt: "系統通知中心顯示超約預警", caption: "需量預測超標時，系統主動推送通知，讓 AI 找上使用者，而不是等人來查。" },
      { src: "/projects/advantech/solution/final-f12-02.webp", alt: "通知內的三級告警與發生時間", caption: "通知帶三級告警：依預測超約的剩餘時間分級（1 小時內列嚴重），先看懂風險急迫度再決定怎麼處理。" },
      { src: "/projects/advantech/solution/final-f12-03.webp", alt: "AI 分析視窗顯示超約原因", caption: "點開 AI 分析，直接看到這次超約風險的原因判讀與時間點。" },
      { src: "/projects/advantech/solution/final-f12-04.webp", alt: "高耗電設備清單", caption: "附上高耗電設備清單，馬上知道該先關哪一台，把決策資訊直接送進告警。" },
    ],
  },
  {
    id: "equipment-anomaly",
    label: "設備異常分析",
    steps: [
      { src: "/projects/advantech/solution/final-f2-01.webp", alt: "設備能耗異常的系統通知", caption: "設備能耗出現異常時，系統同樣主動通知，將告警模式複用在設備維護情境。" },
      { src: "/projects/advantech/solution/final-f2-02.webp", alt: "設備報警等級與異常標記", caption: "三級告警標出異常設備與嚴重程度，維護人員一眼掌握現場狀態。" },
      { src: "/projects/advantech/solution/final-f2-03.webp", alt: "AI 異常分析摘要", caption: "AI 彙整進出水溫度與事件資料，先給問題摘要、指出可能的問題來源。" },
      { src: "/projects/advantech/solution/final-f2-04.webp", alt: "事件分析的溫度變化圖表", caption: "展開事件分析：過去一個月的進出水溫度變化圖，直接標出異常發生的時間點。" },
      { src: "/projects/advantech/solution/final-f2-05.webp", alt: "AI 故障排除建議", caption: "AI 對照維修手冊與故障代碼，給出現場可直接執行的異常排除步驟。" },
    ],
  },
] as const;

export default async function OverviewSection() {
  const { t } = await getAdvantechTranslator();
  return (
    <CaseOverview
      className="cs-overview"
      kicker={t("專案總覽")}
      title={t("數據收齊了，決策卻還卡在人的經驗：讓 AI 主動把判斷依據送到廠務面前。")}
      lead={t("研華 iEMS 能源管理系統把水、電、氣的數據收得很完整，但訪談發現使用者拿到的只是 raw data，沒有下一步建議。我把「自由問答的聊天視窗」翻轉成「前台一鍵觸發、異常主動告警」的 GenAI 工作流程，讓現場人員直接收到看得懂的決策建議。")}
      items={overviewItems.map((item) => ({
        label: t(item.label),
        text: t(item.text),
        stat: {
          value: t(item.stat.value),
          label: t(item.stat.label),
          note: t(item.stat.note),
        },
      }))}
      itemsLabel={t("專案快速總覽")}
      showcase={
        <OutcomeWalkthrough
          kicker={t("成果走查")}
          title={t("從需量分析、超約預警到設備異常，AI 讓每個風險都有下一步。")}
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
