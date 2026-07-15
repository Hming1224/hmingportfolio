import { CaseCard, CaseGrid, CaseSection } from "../../../components/case-study";
import TermNotes from "../components/TermNotes";
import { getDsTranslator } from "../i18n-server";

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

export default async function EvolutionBSection() {
  const { t } = await getDsTranslator();
  return (
    <CaseSection id="cs-sec-evolution-b" kicker={t("EVOLUTION B")} title={t("演化實例 B：知道何時「不要」抽象")} surface>
      <p className="cs-section-lead">{t("我後來的理解是：系統不一定要什麼都共用，但每個「刻意不共用」的地方，最好都講得出理由。")}</p>
      <p className="cs-section-lead">{t("有了共用元件之後，最大的誘惑是把所有長得像的東西都塞進去。為了避免過早抽象，每次想共用之前，我都會先把「誘惑、判斷、決定」寫下來：")}</p>
      <CaseGrid variant="three" className="ds-case-card-grid">
        {brakeCases.map((item) => (
          <CaseCard className="ds-case-brake-card" key={item.title}>
            <span className={`ds-case-verdict${item.verdict === "DEFERRED" ? " ds-case-verdict--deferred" : ""}`}>{t(item.verdict)}</span>
            <h3>{t(item.title)}</h3>
            <p><strong>{t("誘惑")}</strong>{t(item.temptation)}</p>
            <p><strong>{t("判斷")}</strong>{t(item.judgment)}</p>
            <p><strong>{t("決定")}</strong>{t(item.decision)}</p>
          </CaseCard>
        ))}
      </CaseGrid>
      <CaseCard className="ds-case-narrative-card">
        <p>
          {t("印象最深的一次：我曾一口氣盤點 8 個「看起來可以抽」的 pattern，")}<b>{t("結論是一個都不抽")}</b>{t("。那次盤點沒有產出任何新元件，留下的是 8 條寫進治理文件的「為什麼不抽」。對我來說，把不做的理由寫清楚，跟多做幾個元件一樣重要。")}
        </p>
      </CaseCard>
      <blockquote className="ds-case-quote">{t("抽象是有成本的。每多一個共用元件，就多一份契約要維護，也會讓更多頁面受到它的影響。")}</blockquote>
      <TermNotes
        title={t("名詞註釋")}
        ariaLabel={t("專有名詞註釋")}
        items={[
          { term: t("Local component"), description: t("Local component 是只服務單一頁面或單一敘事情境的元件，不一定要抽成全站共用。") },
          { term: t("Component abstraction"), description: t("Component abstraction 是把重複的結構整理成共用元件，但它同時會增加使用規則和維護成本。") },
        ]}
      />
    </CaseSection>
  );
}
