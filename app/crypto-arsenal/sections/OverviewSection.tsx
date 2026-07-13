import { CaseCard, CaseGrid, CaseOverview, getCaseOverviewLabel, OutcomeWalkthrough } from "../../../components/case-study";
import { finalFlows, impactOverviewQuotes } from "../data";
import { getCryptoArsenalTranslator } from "../i18n-server";

const overviewItems = [
  {
    kind: "problem",
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
    kind: "goal",
    label: "設計目標",
    title: "把交易控制權還給使用者，讓損益能自主掌握，也維持對 CA 的信任與策略使用意願。",
    details: [
      {
        label: "商業命題",
        text: "缺少交易控制權不只造成單次操作不便：當使用者無法依市場變化主動停利或止損，損益就只能被動交給策略決定。長期累積的不確定感，可能降低對平台的信任、策略機器人的啟用意願與回訪頻率，進一步影響 CA 的交易量與收益。",
        icon: "hypothesis",
        variant: "default",
      },
      {
        label: "How might we",
        text: "我們如何讓 CA 用戶在使用自動交易策略的同時，仍能自主掌握交易與損益，並建立值得長期信任、持續使用的策略交易體驗？",
        icon: "question",
        variant: "highlight",
      },
    ],
    media: {
      src: "/projects/crypto-arsenal/research/steps/tpsl-binance-2-setup.webp",
      alt: "Binance TP/SL 設定彈窗，可設定止盈與止損觸發價格",
      caption: "研究 Binance、Bybit、OKX 的交易控制流程後，我將「沿用成熟操作模式」收斂為其中一個設計方向。",
      fit: "contain",
    },
  },
  {
    kind: "impact",
    label: "影響",
    title: "將三項核心交易流程整合進 CA，平均操作時間縮短 58%。",
    details: impactOverviewQuotes.map((item) => ({
      label: item.label,
      text: item.text,
      icon: "quote" as const,
      variant: "quote" as const,
    })),
    visual: "impact-metrics",
  },
] as const;

export default async function OverviewSection() {
  const { t, locale } = await getCryptoArsenalTranslator();
  const quote = (text: string) => locale === "zh-TW" ? `「${text}」` : `“${text}”`;

  return (
    <CaseOverview
      className="cs-overview"
      kicker={t("專案總覽")}
      title={t("把只能回交易所處理的風險控制，帶回量化策略平台內。")}
      lead={t("Crypto Arsenal（CA）是量化交易平台：策略機器人替使用者自動下單，但人想介入自己的倉位時，CA 裡沒有任何入口——跳回交易所手動操作，還可能讓整支策略被判定異常、強制停掉。我從使用者回饋與三家交易所的既有流程出發，把倉位資訊、限價與市價平倉、止盈止損整合進 CA，讓人工介入變成系統看得懂的合法操作。")}
      items={overviewItems.map((item) => ({
        kind: item.kind,
        label: getCaseOverviewLabel(locale, item.label),
        title: t(item.title),
        details: item.details.map((detail) => ({
          label: t(detail.label),
          text: detail.variant === "quote" ? quote(t(detail.text)) : t(detail.text),
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
          <CaseGrid variant="stack" className="ca-overview-impact-metrics">
            <CaseCard variant="metric">
              <span className="cs-metric-value">−58%</span>
              <strong className="cs-metric-label">{t("平均操作時間")}</strong>
              <p className="cs-metric-body">{t("三項任務平均由 65 秒降至約 27 秒。")}</p>
            </CaseCard>
            <CaseCard variant="metric">
              <span className="cs-metric-value">77.5 / 100</span>
              <strong className="cs-metric-label">{t("整體易用性評分")}</strong>
              <p className="cs-metric-body">{t("5 位內部受測者完成任務後填寫 SUS 問卷。")}</p>
            </CaseCard>
            <p className="ca-overview-impact-balance">
              {t("受測者能沿用既有交易經驗，但止盈止損的資訊判讀仍是下一輪優化重點。")}
            </p>
          </CaseGrid>
        ) : undefined,
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
