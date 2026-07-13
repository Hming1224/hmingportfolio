import { CaseOverview, OutcomeWalkthrough } from "../../../components/case-study";
import { finalFlows } from "../data";
import { getCryptoArsenalTranslator } from "../i18n-server";

const overviewItems = [
  {
    label: "問題",
    title: "策略會自動交易，但人要介入時，只能冒著弄壞策略的風險回交易所。",
    details: [
      {
        label: "策略開發者：同時跑多支策略的人",
        text: "策略賺了多少看得到，但現在開的是多倉還是空倉、正在賺還是賠，CA 介面上完全看不出來；想確認只能登入交易所，多支策略同時跑時，根本分不清哪一筆倉位是哪支策略開的。",
        icon: "user",
        variant: "default",
      },
      {
        label: "交易者：跟著策略下單、想保留主控權的人",
        text: "獲利到滿意想先落袋、或市場變化太快想提前止損，都只能乾等策略條件被觸發；有人跳回交易所手動平倉，整支策略被系統判定異常、強制停掉，還救不回來。",
        icon: "user",
        variant: "default",
      },
      {
        label: "平台：CA 的商業風險",
        text: "如果核心風險控制只能回交易所完成，CA 就無法承接完整交易流程；長期會削弱使用者留在平台操作的意願，也影響平台的交易抽成機會。",
        icon: "business",
        variant: "default",
      },
    ],
    media: {
      src: "/projects/crypto-arsenal/research/positions-binance.webp",
      alt: "Binance 合約倉位列表介面，含 Symbol、Size、Entry Price、Mark Price、Margin、PNL 等欄位",
      caption: "想確認倉位只能登入交易所：這些資訊在當時的 CA 裡完全看不到。",
      fit: "contain",
    },
  },
  {
    label: "設計目標",
    title: "讓人工介入變成系統看得懂的合法指令，而不是要修復的異常。",
    details: [
      {
        label: "關鍵洞察",
        text: "表面上像是加一顆平倉按鈕，實際要補的是人與自動策略之間缺少的控制流程：在 CA 內操作時，系統主動告知機器人「這是使用者的合法指令」，機器人同步狀態、不進入錯誤保護，策略繼續運行。",
        icon: "hypothesis",
        variant: "default",
      },
      {
        label: "How might we",
        text: "我們如何讓交易者在 CA 內就能平倉、設定止盈止損，同時讓策略機器人理解這是主動介入，而不是需要急停的異常？",
        icon: "question",
        variant: "highlight",
      },
    ],
    media: {
      src: "/projects/crypto-arsenal/research/steps/tpsl-binance-2-setup.webp",
      alt: "Binance TP/SL 設定彈窗，可設定止盈與止損觸發價格",
      caption: "從 Binance、Bybit、OKX 已建立的操作節奏出發：CA 不發明新流程，讓交易者不用重新學。",
      fit: "contain",
    },
  },
  {
    label: "影響",
    title: "三個核心流程留在 CA 內完成，平均操作時間縮短約 58%。",
    details: [
      {
        label: "內部測試者回饋",
        text: "「跟我平常用交易所的操作幾乎一樣，不用重新學。平倉和止盈止損直接在策略頁就能設，不用再切回交易所，整個順很多。」",
        icon: "quote",
        variant: "quote",
      },
      {
        label: "落地進度",
        text: "完成設計交付影片、與 PO 和工程確認可行性後，兩個操作流程以 Jira tickets 排入開發；設計以工程可直接實作的規格交接。",
        icon: "business",
        variant: "default",
      },
      {
        label: "驗證提醒",
        text: "「操作時間的數字來自 5 名內部成員的任務測試，不是線上營運數據；真實交易者在真金白銀的壓力下是否一樣順手，還需要上線後驗證。」",
        icon: "validation",
        variant: "default",
      },
    ],
    stat: {
      value: "−58%",
      label: "平均操作時間",
      note: "5 人內部任務測試 · 三流程平均",
    },
  },
] as const;

export default async function OverviewSection() {
  const { t } = await getCryptoArsenalTranslator();

  return (
    <CaseOverview
      className="cs-overview"
      kicker={t("專案總覽")}
      title={t("把只能回交易所處理的風險控制，帶回量化策略平台內。")}
      lead={t("Crypto Arsenal（CA）是量化交易平台：策略機器人替使用者自動下單，但人想介入自己的倉位時，CA 裡沒有任何入口——跳回交易所手動操作，還可能讓整支策略被判定異常、強制停掉。我從使用者回饋與三家交易所的既有流程出發，把倉位資訊、限價與市價平倉、止盈止損整合進 CA，讓人工介入變成系統看得懂的合法操作。")}
      items={overviewItems.map((item) => ({
        label: t(item.label),
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
        stat: "stat" in item ? {
          value: item.stat.value,
          label: t(item.stat.label),
          note: t(item.stat.note),
        } : undefined,
      }))}
      itemsLabel={t("專案快速總覽")}
      showcase={
        <OutcomeWalkthrough
          key="showcase"
          kicker={t("成果走查")}
          title={t("從限價、市價平倉到止盈止損，三個核心流程都能在 CA 內完成。")}
          frameAspectRatio="2336 / 1440"
          ui={{ controls: false, dots: false }}
          flows={finalFlows.map((flow) => ({
            id: flow.id,
            label: t(flow.overviewLabel),
            progressLabel: t(flow.overviewProgressLabel),
            steps: [{
              src: flow.video,
              alt: t(flow.alt),
              caption: t(flow.overviewCaption),
              media: "video" as const,
              mask: flow.mask,
            }],
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
