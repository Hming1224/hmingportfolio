import Image from "next/image";
import { CaseGrid, CaseMedia } from "../../../components/case-study";
import { InfoCard, LaushuHead } from "../components/LaushuPrimitives";
import { getLaushuTranslator } from "../i18n-server";

const IMG = "/projects/laushu";

const problemCards = [
  { title: "僅作為佐證用", body: "公司外包時，每次都須請外包人員簽署紙本勞報單，但此紙本最後僅作為交易佐證。" },
  { title: "流程繁瑣", body: "流程包含許多細節，像是所得類別、二代健保的計算等，很多創業者不知情下違反規定。" },
  { title: "過程耗時", body: "會計師需人工核對且逐筆建檔；外包人員即使不須進公司，還是必須專程跑一趟公司或郵局。" },
];

export default async function ProblemSection() {
  const { t } = await getLaushuTranslator();

  return (
    <section id="cs-sec-problem" className="cs-section laushu-problem-section">
      <LaushuHead eyebrow={t("問題定義")} title={t("過去建立紙本勞報單費時費力，但最後紙本單據僅作為佐證用。")} />
      <div className="cs-explainer-layout">
        <div className="cs-explainer-copy">
          <span className="cs-explainer-pill">{t("科普小知識")}</span>
          <h4 className="cs-explainer-title">{t("勞報單是什麼？")}</h4>
          <p>
            {t("勞務報酬單，簡稱「勞報單」，為公司支付「酬勞」給「個人」時使用的證明單據，可作為公司支出的證明，並列入領到酬勞者的綜合所得稅中。")}
          </p>
        </div>
        <CaseMedia className="cs-document-preview" caption={t("勞報單範例")} variant="full">
          <Image
            src={`${IMG}/labor-form-example.png`}
            alt={t("勞務報酬單範例")}
            width={982}
            height={808}
            sizes="(max-width: 1023px) calc(100vw - 88px), 456px"
          />
        </CaseMedia>
      </div>
      <h3 className="cs-subsection-title cs-subsection-title--wide cs-subsection-title--top-gap cs-subsection-title--accent">{t("現階段勞報單的問題")}</h3>
      <CaseGrid variant="three" className="cs-topic-grid cs-topic-grid--problem">
        {problemCards.map((card, index) => (
          <InfoCard title={t(card.title)} number={`0${index + 1}`} key={card.title}>{t(card.body)}</InfoCard>
        ))}
      </CaseGrid>
    </section>
  );
}
