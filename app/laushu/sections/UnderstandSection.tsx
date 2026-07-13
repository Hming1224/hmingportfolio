import {
  CaseCard,
  CaseGrid,
  CaseMedia,
  FlowScrollHint,
  ZoomableImage,
} from "../../../components/case-study";
import {
  StakeholderFlow,
  SurveyFlow,
  SurveyInsight,
  SurveyStats,
} from "../components/LaushuDiagrams";
import { ArticleBlock, InfoCard, LaushuHead } from "../components/LaushuPrimitives";
import { getLaushuTranslator } from "../i18n-server";

const IMG = "/projects/laushu";

const stakeholderCards = [
  { title: "會計師", body: "勞贖主要使用者，透過勞贖寄出勞報單，協助公司供外包工作者確認、彙整勞報資料（會計事務所 / 會計師 / 記帳士）。" },
  { title: "公司使用者", body: "會計事務所的主要服務對象，會計事務所協助公司向旗下外包工作者開立勞報單。" },
  { title: "外包工作者", body: "勞贖的終端使用者，確認勞報單是否成立，並向公司領取工資。" },
  { title: "勞贖管理員", body: "管理會計師帳號。" },
];

const researchTable = {
  head: ["研究流程", "了解現況", "研究分析", "質化分析", "原型 & 測試"],
  rows: [
    {
      label: "研究方法",
      cells: [
        ["脈絡訪查"],
        ["先詢問會計師勞報單流程，接續設計問卷 & 訪談"],
        ["使用者歷程分析", "用例分析", "需求優先級"],
        ["SUS 量表", "任務測試", "易用性測試"],
      ],
    },
    {
      label: "欲收集資料",
      cells: [
        ["報帳操作步驟", "使用軟體", "資料輸入習慣 / 順序"],
        ["使用者動機、行為、目標"],
        ["使用者潛在的需求", "用例重要程度"],
        ["使用者回饋", "系統易用性分數"],
      ],
    },
  ],
};

const surveyProfile = [
  { label: "一般公司會計", value: 71.1 },
  { label: "會計師", value: 10.5 },
  { label: "記帳士", value: 7.9 },
  { label: "其他", value: 10.5 },
];

const surveyExperience = [
  { label: "未滿 1 年", value: 10.5 },
  { label: "1–未滿 3 年", value: 42.1 },
  { label: "3–未滿 5 年", value: 18.4 },
  { label: "5 年以上", value: 28.9 },
];

const surveyVolume = [
  { label: "10 份以下", value: 23.7 },
  { label: "11–50 份", value: 36.8 },
  { label: "51–200 份", value: 26.3 },
  { label: "201 份以上", value: 13.2 },
];

const surveyStepQuotes = [
  "照著填就好",
  "電子化後變得很輕鬆",
  "存檔超簡單",
  "公司已有固定 SOP",
];

const surveyPainQuotes = [
  "整體而言有點麻煩",
  "等待回簽、追蹤進度比較麻煩",
  "大量收回勞報單時，處理就會很麻煩",
  "蠻花時間，也覺得很無趣",
];

const interviewGuide = [
  {
    title: "所屬公司工作流程",
    items: [
      { head: "處理勞報起訖過程", body: "建立、發送勞報單到收回領據和最後結果過程。" },
      { head: "工作時間花費、人力需求", body: "執行勞報流程的痛點。" },
    ],
  },
  {
    title: "執行線上勞報系統",
    items: [
      { head: "已知的勞報線上系統", body: "使用線上和實體紙本的經驗差異。" },
      { head: "簽核常見問題、執行線上簽核窒礙點", body: "線上與紙本系統的差異、優點和缺點。" },
    ],
  },
  {
    title: "流程改善的想法",
    items: [
      { head: "法規報稅規定", body: "既有勞報流程執行的必要性。" },
      { head: "內部執行現況", body: "公司內部調整流程的想法、改善預算成本及更動規模評估。" },
    ],
  },
];

const personas = [
  {
    name: "P1 攝影工作室老闆",
    tags: "#許多外包工作 #有長期配合的人員",
    desc: "老闆會自己整理每個外包人員專屬的資料夾，存放勞報單與過去的資料，就像自己建置了一套資料庫。",
    image: `${IMG}/interviewee-p1.png`,
    alt: "Laushu 訪談者一 攝影工作室老闆訪談整理",
    width: 1178,
    height: 1004,
  },
  {
    name: "P2 節目企劃",
    tags: "#有長期配合的人員 #臨時工讀生",
    desc: "對他來說最麻煩的是工讀生很容易忘記帶勞報單；要簽收還得備齊身分證、存摺等證件，常常缺東缺西。",
    image: `${IMG}/interviewee-p2.png`,
    alt: "Laushu 訪談者二 節目企劃訪談整理",
    width: 1178,
    height: 965,
  },
  {
    name: "P3 會計師",
    tags: "#有許多配合的公司 #一年收一次勞報單",
    desc: "因為一年只收一次，很容易發生檔案遺失或忘記存檔的狀況；對他來說，怎麼減少會計師與公司之間的隔閡才是重點。",
    image: `${IMG}/interviewee-p3.png`,
    alt: "Laushu 訪談者三 會計師訪談整理",
    width: 1031,
    height: 881,
  },
];

function ResearchTable({ t }: { t: (text: string) => string }) {
  return (
    <>
      <FlowScrollHint label={t("← 左右滑動查看更多")} />
      <CaseMedia className="cs-data-table-frame cs-data-table-frame--wide" variant="scroll">
        <table className="cs-data-table cs-data-table--matrix">
          <thead>
            <tr>
              {researchTable.head.map((h, i) => (
                <th key={h} className={i === 0 ? "cs-data-table-corner" : undefined}>{t(h)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {researchTable.rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{t(row.label)}</th>
                {row.cells.map((cell, ci) => (
                  <td key={ci}>
                    <ul>
                      {cell.map((c) => (<li key={c}>{t(c)}</li>))}
                    </ul>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </CaseMedia>
    </>
  );
}

export default async function UnderstandSection() {
  const { t } = await getLaushuTranslator();

  return (
    <section id="cs-sec-understand" className="cs-section laushu-process-section laushu-understand-section">
      <LaushuHead eyebrow={t("研究設計")} title={t("了解使用者情境")} />
      <ArticleBlock title={t("彙整使用勞報單流程")} number="01">
        <p>{t("訪談勞贖負責人並自行收集資料，了解外包與勞報單簽署流程，釐清會計師、公司、外包工作者三者關係。此平台至少包含四種核心利害關係人：")}</p>
      </ArticleBlock>
      <CaseGrid variant="four" className="cs-topic-grid cs-topic-grid--stakeholder">
        {stakeholderCards.map((card, index) => (
          <InfoCard title={t(card.title)} number={`0${index + 1}`} key={card.title}>{t(card.body)}</InfoCard>
        ))}
      </CaseGrid>
      <StakeholderFlow t={t} />

      <ArticleBlock title={t("制定研究策略")} number="02">
        <p>{t("為後續設計研究制定執行策略，從了解現況、研究分析、質化分析到原型與測試。")}</p>
      </ArticleBlock>
      <ResearchTable t={t} />

      <ArticleBlock title={t("篩選受訪者")} number="03">
        <p>{t("設計問卷篩選受訪者，了解目前勞報單填寫過程中，哪些環節感到繁雜（會計師：建立 → 發送 → 回收 → 彙整），並回收問卷驗證樣本輪廓。")}</p>
      </ArticleBlock>
      <SurveyFlow t={t} note={<p>{t("了解目前勞報單填寫過程中，哪些過程感到繁雜。")}<br />{t("會計師：建立 → 發送 → 回收 → 彙整。")}</p>} />
      <SurveyStats
        profile={surveyProfile}
        experience={surveyExperience}
        volume={surveyVolume}
        t={t}
      />
      <SurveyInsight
        stepQuotes={surveyStepQuotes}
        painQuotes={surveyPainQuotes}
        t={t}
      />

      <ArticleBlock title={t("訪談大綱")} number="04">
        <p>{t("本次共回收 39 份有效問卷。雖然問卷回收對象以會計師／會計人員為主，但實際聯繫訪談者的過程未如預期順利，最終僅成功訪談 1 位會計師。因此，後續利害關係人訪談調整為以公司負責人／負責單位為主要對象，並圍繞以下三個面向進行深入訪談：")}</p>
      </ArticleBlock>
      <div className="cs-guide-list-grid">
        {interviewGuide.map((group) => (
          <CaseCard className="cs-guide-list-card" key={group.title}>
            <h4>{t(group.title)}</h4>
            <ul>
              {group.items.map((item) => (
                <li key={item.head}>
                  <span className="cs-guide-list-marker" aria-hidden="true">
                    <span className="cs-guide-list-dot" />
                    <span className="cs-guide-list-line" />
                  </span>
                  <div className="cs-guide-list-item">
                    <strong>{t(item.head)}</strong>
                    <span>{t(item.body)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CaseCard>
        ))}
      </div>

      <ArticleBlock title={t("受訪者輪廓")} number="05">
        <p>{t("下面整理三位受訪者的訪談摘要，從資料管理、會計配合到勞報單流程，盤點他們各自的經手方式與最有感的痛點。")}</p>
      </ArticleBlock>
      <div className="cs-persona-list">
        {personas.map((p) => (
          <CaseCard className="cs-persona-card" key={p.name}>
            <div className="cs-persona-copy">
              <strong>{t(p.name)}</strong>
              <span className="cs-persona-tags">{t(p.tags)}</span>
              <p>{t(p.desc)}</p>
            </div>
            <ZoomableImage
              src={p.image}
              alt={t(p.alt)}
              width={p.width}
              height={p.height}
              labels={{ close: t("關閉放大圖片"), separator: t("："), zoom: t("點擊放大") }}
            />
          </CaseCard>
        ))}
      </div>
    </section>
  );
}
