import { CaseCard, CaseGrid, CaseOverview, getCaseOverviewLabel, OutcomeWalkthrough } from "../../../components/case-study";
import { getLaushuTranslator } from "../i18n-server";

const overviewItems = [
  {
    kind: "problem",
    label: "問題",
    title: "紙本勞報單牽動三方來回，最後卻只是一張佐證用的單據。",
    details: [
      {
        label: "公司：每次外包都要開單的人",
        text: "每次外包都須請外包人員簽署紙本勞報單，流程還牽涉所得類別、二代健保的計算，很多創業者不知情就違反規定；追回簽、追進度全靠人工。",
        icon: "business",
        variant: "default",
      },
      {
        label: "會計師：協助公司彙整勞報資料的人",
        text: "需要人工核對且逐筆建檔；一年才收一次勞報單，容易發生檔案遺失或忘記存檔，會計師與公司之間的資訊隔閡是他最有感的痛點。",
        icon: "user",
        variant: "default",
      },
      {
        label: "外包工作者：簽收領錢的人",
        text: "即使工作不須進公司，還是得備齊身分證、存摺等證件，專程跑一趟公司或郵局簽紙本；證件缺東缺西，就得再跑一次。",
        icon: "user",
        variant: "default",
      },
    ],
    media: {
      src: "/projects/laushu/labor-form-example.png",
      alt: "勞務報酬單範例",
      caption: "紙本勞報單範例：欄位多、計算細，簽完最後只作為交易佐證。",
      fit: "contain",
    },
  },
  {
    kind: "goal",
    label: "設計目標",
    title: "在產品上線前，把三方協作的紙本流程轉譯成清楚、可完成的數位任務。",
    details: [
      {
        label: "研究路線的轉折",
        text: "問卷回收 39 份、以會計人員為主，但實際只約到 1 位會計師受訪；我們把訪談對象調整為會自己經手勞報單的公司負責人，並收斂出他們最麻煩的三件事：管理外包人員、確認簽收、減少回簽次數。",
        icon: "hypothesis",
        variant: "default",
      },
      {
        label: "How might we",
        text: "我們如何讓公司、會計師與外包工作者在同一套系統完成建檔、計算、寄送與回簽，減少來回確認的時間與行政成本？",
        icon: "question",
        variant: "highlight",
      },
    ],
    media: {
      src: "/projects/laushu/labor-form-flow-1.png",
      alt: "Laushu 勞報單使用者歷程 journey map",
      caption: "以受訪者經驗盤點建立 → 發放 → 回簽 → 建檔的完整歷程，找出最卡的環節。",
      fit: "contain",
    },
  },
  {
    kind: "impact",
    label: "影響",
    title: "SUS 易用性分數達 82.5，任務測試推動六處設計迭代。",
    details: [
      {
        label: "測試方式",
        text: "邀請 2 位受訪過的使用者（節目企劃、攝影工作室老闆）以放聲思考法完成三條核心流程的任務測試，並填寫 SUS 易用性量表，據此收斂迭代方向。",
        icon: "business",
        variant: "default",
      },
      {
        label: "迭代重點",
        text: "六處調整都在降低判斷成本：欄位排序、稅額與日期提示、把「所得人」換成看得懂的用詞、列表分頁、寄出前預覽、合併清單分組，讓使用者更快找到資料、寄出前敢按確認。",
        icon: "hypothesis",
        variant: "default",
      },
    ],
    visual: "impact-metrics",
  },
] as const;

const walkthroughFlows = [
  {
    id: "database",
    label: "建立外包人員資料庫",
    progressLabel: "流程01",
    steps: [{
      src: "/projects/laushu/demo/EXKqZMroni8.mp4",
      poster: "/projects/laushu/demo/demo-01-poster.jpg",
      alt: "Laushu 建立外包人員資料庫操作示範影片",
      caption: "快速新增、查找與管理外包人員資料，降低後續建立勞報單時的重複輸入。",
      media: "video" as const,
    }],
  },
  {
    id: "create-form",
    label: "建立勞務報酬單",
    progressLabel: "流程02",
    steps: [{
      src: "/projects/laushu/demo/EzwEWYr2QgQ.mp4",
      poster: "/projects/laushu/demo/demo-02-poster.jpg",
      alt: "Laushu 建立勞務報酬單操作示範影片",
      caption: "協助公司建立勞務報酬單，發送系統連結給外包人員填寫資料並完成回簽。",
      media: "video" as const,
    }],
  },
  {
    id: "merge",
    label: "合併多張勞報單",
    progressLabel: "流程03",
    steps: [{
      src: "/projects/laushu/demo/WpLXr671epg.mp4",
      poster: "/projects/laushu/demo/demo-03-poster.jpg",
      alt: "Laushu 合併多張勞報單操作示範影片",
      caption: "合併多筆勞報資料並清楚呈現細項，減少回簽次數與稅務整理時間。",
      media: "video" as const,
    }],
  },
] as const;

export default async function OverviewSection() {
  const { t, locale } = await getLaushuTranslator();

  return (
    <CaseOverview
      className="cs-overview"
      kicker={t("專案總覽")}
      title={t("讓建檔、計算、寄送與回簽，從紙本往返變成一條數位流程。")}
      lead={t("勞贖（Laushu）想把紙本勞務報酬單搬上線，但真正要解的是會計師、公司與外包工作者三方的協作：建檔、稅額計算、寄送與回簽分散在不同人手上，重複輸入與來回確認吃掉大量時間。我與研究團隊從問卷與訪談出發，把最影響效率的三條流程做成可直接操作的原型，再用任務測試與 SUS 量表驗證，完成六處介面迭代。")}
      items={overviewItems.map((item) => ({
        kind: item.kind,
        label: getCaseOverviewLabel(locale, item.label),
        title: t(item.title),
        details: item.details.map((detail) => ({
          label: t(detail.label),
          text: t(detail.text),
          icon: detail.icon,
          variant: detail.variant,
        })),
        media: "media" in item ? {
          src: item.media.src,
          alt: t(item.media.alt),
          caption: t(item.media.caption),
          fit: item.media.fit,
        } : undefined,
        visual: "visual" in item && item.visual === "impact-metrics" ? (
          <CaseGrid variant="stack" className="laushu-overview-impact-metrics">
            <CaseCard variant="metric">
              <span className="cs-metric-value">82.5 / 100</span>
              <strong className="cs-metric-label">{t("SUS 易用性分數")}</strong>
              <p className="cs-metric-body">{t("2 位使用者完成三條核心流程任務測試後填寫 SUS 量表。")}</p>
            </CaseCard>
            <CaseCard variant="metric">
              <span className="cs-metric-value">6</span>
              <strong className="cs-metric-label">{t("介面與流程迭代")}</strong>
              <p className="cs-metric-body">{t("依任務測試與 SUS 結果，完成六處介面與流程調整。")}</p>
            </CaseCard>
            <p className="laushu-overview-impact-balance">
              {t("本案屬上線前驗證；大量單據情境仍需上線後以真實數據驗證。")}
            </p>
          </CaseGrid>
        ) : undefined,
      }))}
      itemsLabel={t("專案快速總覽")}
      showcase={
        <OutcomeWalkthrough
          key="showcase"
          kicker={t("成果走查")}
          title={t("建檔、開單到合併，三條核心流程都在同一套系統完成。")}
          frameAspectRatio="1280 / 720"
          ui={{ controls: false, dots: false }}
          flows={walkthroughFlows.map((flow) => ({
            id: flow.id,
            label: t(flow.label),
            progressLabel: t(flow.progressLabel),
            steps: flow.steps.map((step) => ({
              src: step.src,
              poster: step.poster,
              alt: t(step.alt),
              caption: t(step.caption),
              media: step.media,
            })),
          }))}
          labels={{
            flows: t("成果走查流程切換"),
            stage: t("成果走查影片"),
            step: t("流程"),
            prev: t("← 上一步"),
            next: t("下一步 →"),
            goToStep: t("跳到步驟"),
          }}
        />
      }
    />
  );
}
