import { ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  CaseCard,
  FlowScrollHint,
  CaseGrid,
  CaseMedia,
  CaseSection,
} from "../../../components/case-study";
import SemanticTableExample from "../components/SemanticTableExample";
import { ASSET } from "../data";
import { getDsTranslator } from "../i18n-server";

const evolutionSteps = [
  {
    title: "各自實作",
    body: "不同案例頁用了相似的 Before / After 版型，畫面接近，程式碼卻彼此獨立。當時內容與細節還在調整，直接共用會把尚未穩定的差異綁在一起。",
  },
  {
    title: "先盤點，再抽出敘事外框",
    body: "盤點後，我確認穩定重複的是版面配置與 RWD 行為，內容仍由各頁自行安排。因此我抽出 slot-based 的敘事外框，保留各頁原本的文案、圖片與說明節奏。",
  },
  {
    title: "再拆出視覺外殼",
    body: "敘事外框穩定後，我才把「有標籤的面板」往下拆成視覺外殼，同時保留既有樣式掛鉤，讓已上線頁面可以在畫面不變的情況下遷移。",
  },
];

const brakeCases = [
  {
    verdict: "KEEP LOCAL",
    title: "各案例頁的反思卡片",
    shot: {
      src: "brake-reflection-cards.webp",
      alt: "三個案例頁的反思卡片截圖：結構相同，但配色與排版各自不同。",
      width: 1199,
      height: 958,
    },
    context: "三個案例頁都有反思卡片，結構相似，看起來是現成的共用候選。",
    judgment: "有些反思卡片的背景、標號和排列方式其實是那一頁的敘事識別；硬統一會讓不同案例的語氣被磨平。",
    decision: "共用層停在底層的卡片外殼、Grid 和 tokens，版型各自保留。",
  },
  {
    verdict: "KEEP LOCAL",
    title: "Advantech 的多重對比版面",
    shot: {
      src: "brake-advantech-multi.webp",
      alt: "Advantech 案例頁的多重對比版面截圖：同一個外框裡放了多組修正說明與 Before / After 對比。",
      width: 1400,
      height: 1234,
    },
    context: "已經有共用的 Before / After 外框，很容易想把 Advantech 的多組對比也塞進去，追求「全站統一」。",
    judgment: "既有外框的契約是「一個外框、一組對比」；Advantech 則是在同一個外框裡放多組對比，用途不同。硬塞進去，元件會為了遷就例外長出太多開關。",
    decision: "刻意保留在頁面本地；等真的出現第二個多重對比場景，再設計新的契約。",
  },
  {
    verdict: "DEFERRED",
    title: "通用 Tag、表格外框、影片燈箱",
    shot: {
      src: "brake-deferred-patterns.webp",
      alt: "站上零散出現的影片展示、資料表格與標籤截圖，都是被暫緩抽成共用元件的候選。",
      width: 1200,
      height: 1173,
    },
    context: "「以後一定用得到」，所以先做起來放著。",
    judgment: "這些項目還沒有穩定的使用場景。需求出現前就抽元件，只能靠猜；抽錯共用邊界，會比暫時重複的程式碼更難維護。",
    decision: "先把預期行為寫進文件，暫緩建立元件；等 Rule of Three 的條件成立，再重新評估。",
  },
];

const semanticRows = [
  ["Button", "在當下情境執行操作（command action）", "送出表單、複製 email、打開 lightbox", "button", "複製 email"],
  ["Link", "帶使用者前往目的地（navigation action）", "去案例頁、回首頁、開外部 prototype", "link", "查看判斷框架"],
  ["LinkButton", "語意是 Link、視覺長得像 Button", "View case study、Next project", "linkButton", "查看最終成果"],
  ["CTA", "不是元件，是這一顆在畫面上的「角色」（usage role）", "Hero 主按鈕、卡片的 Learn More", "cta", "前往 Design System"],
] as const;

export default async function EvolutionCasesSection() {
  const { t } = await getDsTranslator();

  return (
    <CaseSection
      id="cs-sec-evolution"
      title={t("三個案例，三種不同的共用決定")}
    >
      <p className="cs-section-lead">
        {t("把前面的判斷路徑放回實作後，三個案例走到不同結果：一個抽成共用、一個刻意留在單頁，另一個先把用途分清楚，暫時不動程式碼。")}
      </p>
      <div className="ds-case-evolution-story-cards">
        <article
          aria-labelledby="ds-case-evolution-a-title"
          className="ds-case-evolution-story-card"
        >
          <header className="ds-case-evolution-story-card__header">
            <span>{t("EVOLUTION A")}</span>
            <h3 id="ds-case-evolution-a-title">{t("Before / After 版型的三步共用化")}</h3>
          </header>
          <p className="cs-section-lead">{t("同一種 Before / After 版型在三個案例頁各自實作後，我才開始整理共用結構。整個過程分成三步，沒有一次改完。")}</p>
          <CaseGrid variant="three" className="ds-case-card-grid ds-case-stage-grid">
            {evolutionSteps.map((step, index) => (
              <CaseCard className="ds-case-stage-card" key={step.title}>
                <span className="ds-case-stage-chip" aria-hidden="true">
                  {t("STEP ")}{String(index + 1).padStart(2, "0")}
                </span>
                <h3>{t(step.title)}</h3>
                <p>{t(step.body)}</p>
              </CaseCard>
            ))}
          </CaseGrid>
          <CaseMedia
            className="ds-case-media"
            caption={t("三個案例頁各自實作的 Before / After 版型，最後收斂成共用的 slot-based narrative frame。")}
          >
            <div
              className="ds-case-evolution-diagram"
              role="img"
              aria-label={t("三個案例頁各自實作的 Before / After 版型，最後收斂成共用的 slot-based narrative frame。")}
            >
              <div className="ds-case-evolution-diagram__panel">
                <span className="ds-case-evolution-diagram__label">Before</span>
                {["Advantech", "Laushu", "Crypto Arsenal"].map((pageName) => (
                  <div className="ds-case-evolution-diagram__row" key={pageName}>
                    <span className="ds-case-evolution-diagram__chip ds-case-evolution-diagram__chip--page">{pageName}</span>
                    <span className="ds-case-evolution-diagram__chip">local CSS / DOM</span>
                  </div>
                ))}
              </div>
              <ArrowRight className="ds-case-evolution-diagram__arrow" size={28} strokeWidth={1.8} aria-hidden="true" />
              <div className="ds-case-evolution-diagram__panel">
                <span className="ds-case-evolution-diagram__label">After</span>
                <div className="ds-case-evolution-diagram__stack">
                  <span className="ds-case-evolution-diagram__node">BeforeAfterNarrativeFrame</span>
                  <span className="ds-case-evolution-diagram__link" aria-hidden="true" />
                  <span className="ds-case-evolution-diagram__node">BeforeAfterPanel</span>
                  <span className="ds-case-evolution-diagram__note">{t("相容層讓已上線頁面的畫面維持不變")}</span>
                </div>
              </div>
            </div>
          </CaseMedia>
        </article>

        <article
          aria-labelledby="ds-case-evolution-b-title"
          className="ds-case-evolution-story-card"
        >
          <header className="ds-case-evolution-story-card__header">
            <span>{t("EVOLUTION B")}</span>
            <h3 id="ds-case-evolution-b-title">{t("知道何時不要急著共用")}</h3>
          </header>
          <p className="cs-section-lead">{t("案例 A 抽出共用外框後，下一個問題是：哪些東西應該刻意留在單頁？有了共用元件，很容易想把所有長得像的東西都塞進去。為了避免太早共用，我會先寫下「情境、判斷、決定」，確認每個不共用的地方都有理由。")}</p>
          <CaseGrid variant="three" className="ds-case-card-grid">
            {brakeCases.map((item) => (
              <CaseCard className="ds-case-brake-card" key={item.title}>
                <span className={`ds-case-verdict${item.verdict === "DEFERRED" ? " ds-case-verdict--deferred" : ""}`}>
                  {t(item.verdict)}
                </span>
                <h3>{t(item.title)}</h3>
                <span className="ds-case-brake-card__shot">
                  <Image
                    src={`${ASSET}/evolution/${item.shot.src}`}
                    alt={t(item.shot.alt)}
                    width={item.shot.width}
                    height={item.shot.height}
                    sizes="(max-width: 768px) calc(100vw - 48px), 360px"
                  />
                </span>
                <p><strong>{t("情境")}</strong>{t(item.context)}</p>
                <p><strong>{t("判斷")}</strong>{t(item.judgment)}</p>
                <p><strong>{t("決定")}</strong>{t(item.decision)}</p>
              </CaseCard>
            ))}
          </CaseGrid>
          <CaseCard className="ds-case-narrative-card">
            <p>
              {t("把這套記錄方式用在全站盤點時，最讓我印象深刻的一次，是一口氣檢查 8 個「看起來可以抽」的 pattern，")}
              <b>{t("結論是一個都不抽")}</b>
              {t("。那次盤點沒有產出任何新元件，留下的是 8 條寫進治理文件的「為什麼不抽」。對我來說，把不做的理由寫清楚，跟多做幾個元件一樣重要。")}
            </p>
          </CaseCard>
          <blockquote className="ds-case-quote">
            {t("那次盤點讓我更確定：每多一個共用元件，就多一份契約要維護，也會讓更多頁面一起承擔變動。")}
          </blockquote>
        </article>

        <article
          aria-labelledby="ds-case-evolution-c-title"
          className="ds-case-evolution-story-card"
        >
          <header className="ds-case-evolution-story-card__header">
            <span>{t("EVOLUTION C")}</span>
            <h3 id="ds-case-evolution-c-title">{t("語意分不清時，先寫規格，暫時不拆程式碼")}</h3>
          </header>
          <p className="cs-section-lead">{t("前一個案例決定不共用；這個案例則先不動程式碼，而是把用途分清楚。整理全站按鈕時，我卡在一個看起來很小的問題：")}</p>
          <p className="ds-case-question-callout">{t("「View case study」長得像按鈕，那它是 Button 嗎？")}</p>
          <p className="cs-section-lead">{t("全站有十幾個這種「像按鈕的東西」。如果沒有先分清楚用途，後續的 token 規則與共用元件就容易混用。查證 W3C 與 Material Design 的相關定義後，我把它們分成四個概念：")}</p>
          <FlowScrollHint label={t("左右滑動查看更多")} />
          <div
            aria-label={t("按鈕語意比較表")}
            className="ds-case-table-frame"
            role="region"
            tabIndex={0}
          >
            <table className="ds-case-table">
              <colgroup>
                <col className="ds-case-table__concept-column" />
                <col className="ds-case-table__definition-column" />
                <col className="ds-case-table__example-copy-column" />
                <col className="ds-case-table__ui-column" />
              </colgroup>
              <thead>
                <tr><th scope="col">{t("概念")}</th><th scope="col">{t("是什麼")}</th><th scope="col">{t("例子")}</th><th scope="col">{t("UI 元件範例")}</th></tr>
              </thead>
              <tbody>
                {semanticRows.map(([term, meaning, examples, exampleKind, exampleLabel]) => (
                  <tr key={term}>
                    <th scope="row">{t(term)}</th>
                    <td>{t(meaning)}</td>
                    <td>{t(examples)}</td>
                    <td className="ds-case-table__example">
                      <SemanticTableExample
                        copiedLabel={t("已複製")}
                        kind={exampleKind}
                        label={t(exampleLabel)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CaseCard className="ds-case-narrative-card">
            <p>{t("這四個概念會直接影響互動預期：link 可以右鍵開新分頁、複製網址；button 會執行當下的操作。Screen reader 也會把它們讀成不同角色。語意用錯，使用輔助科技的人就可能誤判點擊後會發生什麼。")}</p>
            <p>{t("最後我決定")}<b>{t("「文件拆、程式碼不拆」")}</b>{t("。規格文件分別寫清楚 Button 和 LinkButton 的 contract；實作仍維持同一個 Button 元件，有 href 時就 render 成連結。現在拆成兩個元件，得大批調整 import，也會增加 regression 風險。先把使用規則寫清楚，就足以解決眼前的問題。")}</p>
            <p>{t("這正是判斷框架裡的「用途易混淆 → Component Contract」：不必立刻抽元件，先把使用契約寫清楚，就能處理反覆出現的語意混淆。")}</p>
          </CaseCard>
        </article>
      </div>
    </CaseSection>
  );
}
