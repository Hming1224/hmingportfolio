import { CaseOverview } from "../../../components/case-study";
import ImpactBlueprint from "../components/ImpactBlueprint";
import OutcomeWalkthrough from "../components/OutcomeWalkthrough";
import { getAdvantechTranslator } from "../i18n-server";

const overviewItems = [
  {
    label: "問題",
    title: "系統收齊數據，卻沒有幫人做出判斷。",
    details: [
      {
        label: "使用者立場",
        text: "上百顆電表讓單一機台多出的 20% 能耗淹沒在總覽裡；新進廠務每天還要花 3 小時以上摸熟系統，判斷高度依賴個人經驗。",
        icon: "user",
        variant: "default",
      },
      {
        label: "企業立場",
        text: "訪談中的客戶一年被超約罰款 300 萬元。數據雖然完整，企業仍缺少能跨系統、跨廠區快速辨識風險的統一方式。",
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
    title: "讓 AI 主動出現在廠務需要判斷的地方。",
    details: [
      {
        label: "設計假設",
        text: "若 AI 能在異常發生時主動帶入時間、地點與設備脈絡，廠務就不必先知道該問什麼，也能更快做出判斷。",
        icon: "hypothesis",
        variant: "default",
      },
      {
        label: "How might we",
        text: "我們如何在不改變既有巡檢習慣的前提下，讓 AI 主動把判斷依據送到需要它的人面前？",
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
    title: "AI 從單一功能，成為跨系統、跨廠區的整合藍圖。",
    details: [
      {
        label: "iEMS 產品負責人",
        text: "「你們沒有只停在 AI chatbot 本身，而是有把它放回整個能源管理系統裡思考。從短期導入、日常查詢，一路規劃到長期的數據追蹤和報表，這個 blueprint 是清楚的。未來 AI 不應該只存在電腦或手機裡，也要思考怎麼整合到機台面板或現場設備上。」",
        icon: "quote",
        variant: "quote",
      },
      {
        label: "驗證提醒",
        text: "「目前還沒有真的找使用者測試，所以現在整理出的問題清單，能不能涵蓋廠務人員每天真正會問的事情，這部分還需要再驗證。」",
        icon: "validation",
        variant: "default",
      },
    ],
    visual: "impact-blueprint",
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
      title={t("數據散落在系統與廠區之間：讓 AI 成為廠務做判斷的統一入口。")}
      lead={t("研華 iEMS 已收齊水、電、氣與設備資料，但 EcoWatch、HVAC 與不同廠區仍各自運作，使用者必須靠經驗拼湊風險。我從廠務決策流程出發，將 AI 從被動問答改成能跨系統取數、主動帶入脈絡，並延伸到長期報表與機台面板的整合藍圖。")}
      items={overviewItems.map((item) => ({
        label: t(item.label),
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
        visual: "visual" in item ? (
          <ImpactBlueprint
            ariaLabel={t("EcoWatch 與 HVAC 資料透過 AI 與 RAG，流向跨廠區監測、長期報表與機台面板。")}
            labels={{
              source: t("既有資料來源"),
              ecowatch: "EcoWatch",
              hvac: "HVAC",
              hub: "AI + RAG",
              crossSite: t("跨廠區監測"),
              reports: t("長期追蹤與報表"),
              machinePanel: t("機台面板"),
            }}
          />
        ) : undefined,
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
