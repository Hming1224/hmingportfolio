import Image from "next/image";
import {
  CaseCard,
  CaseGrid,
  CaseMedia,
  CaseSection,
} from "../../../components/case-study";
import TermNotes from "../components/TermNotes";
import { ASSET } from "../data";
import { getDsTranslator } from "../i18n-server";

const evolutionSteps = [
  {
    title: "各自實作",
    body: "不同案例頁各自實作類似的 Before / After 版型，視覺相近但 code 完全獨立。這時如果直接抽共用，只會把還沒穩定的差異綁在一起。",
  },
  {
    title: "先 audit，再抽出敘事外框",
    body: "盤點後確認，真正重複的是版面配置與 RWD 行為，不是內容本身。所以我抽出 slot-based 的敘事外框，讓各頁保留自己的文案、圖片和說明節奏。",
  },
  {
    title: "再拆出視覺外殼",
    body: "第二步才把「有標籤的面板」拆成更底層的視覺外殼，並保留既有樣式掛鉤，讓已上線頁面可以在不改變畫面的情況下遷移。",
  },
];

const brakeCases = [
  {
    verdict: "KEEP LOCAL",
    title: "各案例頁的反思卡片",
    temptation: "三個案例頁都有反思卡片，結構相似，看起來是現成的共用候選。",
    judgment: "有些反思卡片的背景、標號和排列方式其實是那一頁的敘事識別；硬統一會讓不同案例的語氣被磨平。",
    decision: "共用層停在底層的卡片外殼、Grid 和 tokens，版型各自保留。",
  },
  {
    verdict: "KEEP LOCAL",
    title: "Advantech 的多重對比版面",
    temptation: "已經有共用的 Before / After 外框了，把這兩塊也塞進去，就「全站統一」了。",
    judgment: "既有共用外框的契約是「一個外框、一組對比」；這類版面是多組對比同框，語意不同。硬塞進去，元件會為了遷就例外長出太多開關。",
    decision: "刻意保留在頁面本地；等真的出現第二個多重對比場景，再設計新的契約。",
  },
  {
    verdict: "DEFERRED",
    title: "通用 Tag、表格外框、影片燈箱",
    temptation: "「以後一定用得到」，先做起來放著。",
    judgment: "都還沒有足夠穩定的使用場景。需求出現之前抽的元件多半是在猜，而猜錯的抽象比重複的 code 更難維護。",
    decision: "先把預期行為寫進文件，暫緩建立元件；等 rule of three 條件成立後再重新評估。",
  },
];

const semanticRows = [
  ["Button", "在當下情境執行操作（command action）", "送出表單、複製 email、打開 lightbox"],
  ["Link", "帶使用者前往目的地（navigation action）", "去案例頁、回首頁、開外部 prototype"],
  ["LinkButton", "語意是 Link、視覺長得像 Button", "View case study、Next project"],
  ["CTA", "不是元件，是這一顆在畫面上的「角色」（usage role）", "Hero 主按鈕、卡片的 Learn More"],
];

export default async function EvolutionCasesSection() {
  const { t } = await getDsTranslator();

  return (
    <CaseSection
      id="cs-sec-evolution"
      title={t("三個演化案例：從共用到保留單頁彈性")}
    >
      <div className="ds-case-evolution-story-cards">
        <article
          aria-labelledby="ds-case-evolution-a-title"
          className="ds-case-evolution-story-card"
        >
          <header className="ds-case-evolution-story-card__header">
            <span>{t("EVOLUTION A")}</span>
            <h3 id="ds-case-evolution-a-title">{t("Before / After 版型的三段抽象")}</h3>
          </header>
          <p className="cs-section-lead">{t("同一個版型寫了三次之後，才動手抽象——而且分三步走，不是一次到位。")}</p>
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
            caption={t("Before / After pattern 從三頁各自實作，演化成 slot-based narrative frame。")}
          >
            <Image
              src={`${ASSET}/solution/before-after-evolution.webp`}
              alt={t("Before and after diagram showing three local implementations evolving into shared narrative frame and panel shell.")}
              width={1600}
              height={900}
              sizes="(max-width: 768px) calc(100vw - 48px), calc(100vw - 96px)"
            />
          </CaseMedia>
          <TermNotes
            title={t("名詞註釋")}
            ariaLabel={t("專有名詞註釋")}
            items={[
              { term: t("Slot-based narrative frame"), description: t("這裡指固定版面結構、開放內容替換的敘事外框，讓不同案例能共用排列方式但保留自己的內容。") },
              { term: t("Local implementation"), description: t("Local implementation 是先在單一頁面完成實作，等模式穩定後再評估是否抽到共用層。") },
            ]}
          />
        </article>

        <article
          aria-labelledby="ds-case-evolution-b-title"
          className="ds-case-evolution-story-card"
        >
          <header className="ds-case-evolution-story-card__header">
            <span>{t("EVOLUTION B")}</span>
            <h3 id="ds-case-evolution-b-title">{t("知道何時「不要」抽象")}</h3>
          </header>
          <p className="cs-section-lead">{t("我後來的理解是：系統不一定要什麼都共用，但每個「刻意不共用」的地方，最好都講得出理由。")}</p>
          <p className="cs-section-lead">{t("有了共用元件之後，最大的誘惑是把所有長得像的東西都塞進去。為了避免過早抽象，每次想共用之前，我都會先把「誘惑、判斷、決定」寫下來：")}</p>
          <CaseGrid variant="three" className="ds-case-card-grid">
            {brakeCases.map((item) => (
              <CaseCard className="ds-case-brake-card" key={item.title}>
                <span className={`ds-case-verdict${item.verdict === "DEFERRED" ? " ds-case-verdict--deferred" : ""}`}>
                  {t(item.verdict)}
                </span>
                <h3>{t(item.title)}</h3>
                <p><strong>{t("誘惑")}</strong>{t(item.temptation)}</p>
                <p><strong>{t("判斷")}</strong>{t(item.judgment)}</p>
                <p><strong>{t("決定")}</strong>{t(item.decision)}</p>
              </CaseCard>
            ))}
          </CaseGrid>
          <CaseCard className="ds-case-narrative-card">
            <p>
              {t("印象最深的一次：我曾一口氣盤點 8 個「看起來可以抽」的 pattern，")}
              <b>{t("結論是一個都不抽")}</b>
              {t("。那次盤點沒有產出任何新元件，留下的是 8 條寫進治理文件的「為什麼不抽」。對我來說，把不做的理由寫清楚，跟多做幾個元件一樣重要。")}
            </p>
          </CaseCard>
          <blockquote className="ds-case-quote">
            {t("抽象是有成本的。每多一個共用元件，就多一份契約要維護，也會讓更多頁面受到它的影響。")}
          </blockquote>
          <TermNotes
            title={t("名詞註釋")}
            ariaLabel={t("專有名詞註釋")}
            items={[
              { term: t("Local component"), description: t("Local component 是只服務單一頁面或單一敘事情境的元件，不一定要抽成全站共用。") },
              { term: t("Component abstraction"), description: t("Component abstraction 是把重複的結構整理成共用元件，但它同時會增加使用規則和維護成本。") },
            ]}
          />
        </article>

        <article
          aria-labelledby="ds-case-evolution-c-title"
          className="ds-case-evolution-story-card"
        >
          <header className="ds-case-evolution-story-card__header">
            <span>{t("EVOLUTION C")}</span>
            <h3 id="ds-case-evolution-c-title">{t("語意分不清時，先分開寫規格，不急著拆 code")}</h3>
          </header>
          <p className="cs-section-lead">{t("不是每個問題都要用「改 code」來解決。")}</p>
          <p className="cs-section-lead">{t("整理全站按鈕時，我卡在一個看起來很小的問題：")}</p>
          <p className="ds-case-question-callout">{t("「View case study」長得像按鈕，那它是 Button 嗎？")}</p>
          <p className="cs-section-lead">{t("全站有十幾個這種「像按鈕的東西」，不先分類清楚，之後 token 化和抽元件都會踩空。查證 W3C 與 Material Design 的相關定義後，我把它們拆成四個概念：")}</p>
          <div className="ds-case-table-frame">
            <table className="ds-case-table">
              <thead>
                <tr><th>{t("概念")}</th><th>{t("是什麼")}</th><th>{t("例子")}</th></tr>
              </thead>
              <tbody>
                {semanticRows.map(([term, meaning, examples]) => (
                  <tr key={term}>
                    <th scope="row">{t(term)}</th>
                    <td>{t(meaning)}</td>
                    <td>{t(examples)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CaseCard className="ds-case-narrative-card">
            <p>{t("為什麼要分這麼細？因為使用者對 link 和 button 的預期不同：link 可以右鍵開新分頁、複製網址；button 會執行當下的操作。Screen reader 也會把它們讀成不同角色。語意用錯，使用輔助科技的人就可能誤判點擊後會發生什麼。")}</p>
            <p>{t("最後我決定")}<b>{t("「文件拆、code 不拆」")}</b>{t("：在規格文件裡分別寫清楚 Button 和 LinkButton 的 contract；code 則維持同一個 Button 元件，有 href 時就 render 成連結。現階段若拆成兩個元件，得大批調整 import，也會增加 regression 風險。既然先把使用規則寫清楚就能解決，就不急著動 code。")}</p>
            <p>{t("這個案例最後落在決策框架第三列「用途易混淆 → Component Contract」。除了抽元件，把使用契約寫清楚，也能解決重複出現的問題。")}</p>
          </CaseCard>
          <TermNotes
            title={t("名詞註釋")}
            ariaLabel={t("專有名詞註釋")}
            items={[
              { term: t("LinkButton"), description: t("LinkButton 是語意上帶使用者前往另一個位置、視覺上看起來像按鈕的連結。") },
              { term: t("Screen reader"), description: t("Screen reader 是協助視障使用者讀取畫面內容的輔助科技，會依照 HTML 語意讀出不同角色。") },
              { term: t("Component contract"), description: t("Component contract 指的是元件的使用規則，例如它適合承載什麼內容、有哪些狀態、什麼情境下不該使用。") },
            ]}
          />
        </article>
      </div>
    </CaseSection>
  );
}
