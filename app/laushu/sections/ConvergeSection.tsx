import { CaseGrid, CaseMedia, ZoomableImage } from "../../../components/case-study";
import { ArticleBlock, InfoCard, LaushuHead } from "../components/LaushuPrimitives";
import { getLaushuTranslator } from "../i18n-server";

const IMG = "/projects/laushu";

const keyFlows = [
  { title: "Flow 1：建立外包人員資料庫", body: "便於掌管人員個人資料，日後有需求可立即找人。", image: `${IMG}/people/insight-database.png` },
  { title: "Flow 2：建立勞務報酬單", body: "發送系統連結給外包人員填寫資料 / 回簽。", image: `${IMG}/people/insight-fill.png` },
  { title: "Flow 3：合併多張勞務報酬單", body: "減少回簽次數與調整稅額。", image: `${IMG}/people/insight-merge.png` },
];

export default async function ConvergeSection() {
  const { t } = await getLaushuTranslator();

  return (
    <section id="cs-sec-converge" className="cs-section laushu-process-section laushu-converge-section">
      <LaushuHead eyebrow={t("收斂與洞察")} title={t("找出最適合分析的使用者流程")} />
      <ArticleBlock title={t("彙整流程 & 重塑 TA")} number="01">
        <p>{t("挖掘使用者在建立、發放、回簽、建檔勞報單流程中的痛點，並首先聚焦會自己經手勞報單的公司端。")}</p>
      </ArticleBlock>
      <CaseMedia
        className="cs-showcase-media cs-showcase-media--caption-center"
        caption={t("以前兩位受訪者為主，盤點建立 → 發放 → 回簽 → 建檔的完整歷程與痛點")}
        variant="full"
      >
        <ZoomableImage
          src={`${IMG}/labor-form-flow-1.png`}
          alt={t("Laushu 勞報單使用者歷程 journey map")}
          width={1472}
          height={645}
          labels={{ close: t("關閉放大圖片"), separator: t("："), zoom: t("點擊放大") }}
        />
      </CaseMedia>
      <ArticleBlock title={t("重要用例")} number="02">
        <p>{t("收斂訪談洞見後，使用者最在意、也覺得紙本勞報單最麻煩的三件事：如何有效管理人員、如何改善簽收確認、如何減少回簽次數。據此彙整三個重要用例，進行後續介面流程設計。")}</p>
      </ArticleBlock>
      <CaseGrid variant="three" className="cs-topic-grid cs-topic-grid--usecase">
        {keyFlows.map((item) => (
          <InfoCard title={t(item.title)} image={item.image} key={item.title}>{t(item.body)}</InfoCard>
        ))}
      </CaseGrid>
    </section>
  );
}
