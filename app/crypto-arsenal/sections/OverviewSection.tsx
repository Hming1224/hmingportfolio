import { CaseMedia, CaseSection } from "../../../components/case-study";
import { finalFlows } from "../data";
import { getCryptoArsenalTranslator } from "../i18n-server";
import FinalVideo from "./FinalVideo";

const overviewItems = [
  { label: "問題", text: "跟隨量化策略的交易者無法在 CA 內主動平倉；若回交易所介入，可能讓策略狀態失效，也讓損益控制變得被動。" },
  { label: "設計目標", text: "讓交易者保留人工介入的主控權，同時維持策略系統可理解、可繼續運作的狀態。" },
  { label: "解決方案", text: "把倉位資訊、限價與市價平倉、止盈止損整合進 CA，延續交易者熟悉的操作模式。" },
  { label: "影響", text: "內部任務測試中，三個核心流程改為在 CA 內完成，平均操作時間比跳回交易所縮短約 58%。" },
  { label: "我的角色", text: "從回饋與競品流程定義問題，負責 user flow、wireframe、UI、內部測試與工程交付。" },
] as const;

export default async function OverviewSection() {
  const { t } = await getCryptoArsenalTranslator();
  const prototype = finalFlows[1]!;

  return (
    <CaseSection
      id="cs-sec-overview"
      className="cs-overview"
      kicker={t("專案總覽")}
      title={t("把只能回交易所處理的風險控制，帶回量化策略平台內。")}
    >
      <p className="cs-section-lead">
        {t("這個專案不是單純新增平倉按鈕，而是補上人與自動策略之間缺少的控制流程：讓交易者能在需要時介入，又不讓策略因外部操作失去狀態。")}
      </p>

      <div className="cs-overview-tldr" role="list" aria-label={t("專案快速總覽")}>
        {overviewItems.map((item) => (
          <article key={item.label} className="cs-overview-tldr-item" role="listitem">
            <p className="cs-overview-tldr-label cs-copy-title">{t(item.label)}</p>
            <p className="cs-overview-tldr-text cs-copy-body">{t(item.text)}</p>
          </article>
        ))}
      </div>

      <div className="cs-overview-prototype">
        <div className="cs-overview-prototype-copy">
          <p className="cs-overview-prototype-kicker cs-copy-title">{t("核心流程預覽")}</p>
          <h3 className="cs-overview-prototype-title">{t("直接操作看看：交易者如何在 CA 內完成市價平倉。")}</h3>
          <p className="cs-copy-body">{t("影片進入畫面時會自動播放；可用滑鼠、觸控或 Enter／Space 放大檢視，按 Escape 關閉。")}</p>
        </div>
        <CaseMedia>
          <FinalVideo
            src={prototype.video}
            label={t(prototype.alt)}
            mask={prototype.mask}
            labels={{ close: t("關閉放大影片"), separator: "：", zoom: t("放大播放影片") }}
          />
        </CaseMedia>
      </div>
    </CaseSection>
  );
}
