import { CaseFeatureRow, CaseMedia } from "../../../components/case-study";
import FeatureConnectors from "../../../components/case-study/FeatureConnectors";
import FeatureImageLightbox from "../../advantech/components/FeatureImageLightbox";
import { LaushuHead } from "../components/LaushuPrimitives";
import { getLaushuTranslator } from "../i18n-server";

const IMG = "/projects/laushu";
const CONN1 = "/projects/advantech/solution/connector-1.svg";
const CONN2 = "/projects/advantech/solution/connector-2.svg";
const PROTO = `${IMG}/proto`;

const protoImageSizes: Record<string, { width: number; height: number }> = {
  [`${PROTO}/create-1-list.png`]: { width: 1440, height: 1024 },
  [`${PROTO}/create-2-form.png`]: { width: 1440, height: 1741 },
  [`${PROTO}/create-3-saved.png`]: { width: 1440, height: 1850 },
  [`${PROTO}/create-4-added.png`]: { width: 1440, height: 1024 },
  [`${PROTO}/bill-1-list.png`]: { width: 1440, height: 1024 },
  [`${PROTO}/bill-2-form.png`]: { width: 1162, height: 2048 },
  [`${PROTO}/bill-3-preview.png`]: { width: 1115, height: 2048 },
  [`${PROTO}/bill-4-alert.png`]: { width: 1440, height: 1024 },
  [`${PROTO}/bill-5-sent.png`]: { width: 1440, height: 1024 },
  [`${PROTO}/bill-6-list.png`]: { width: 1440, height: 1024 },
  [`${PROTO}/merge-1-search.png`]: { width: 1440, height: 1024 },
  [`${PROTO}/merge-2-select.png`]: { width: 1440, height: 1024 },
  [`${PROTO}/merge-3-alert.png`]: { width: 1440, height: 1024 },
  [`${PROTO}/merge-4-detail.png`]: { width: 1440, height: 2028 },
  [`${PROTO}/merge-5-expand.png`]: { width: 1440, height: 1024 },
};

const prototypeFlows = [
  {
    tag: "Flow 1",
    title: "建立外包人員資料庫",
    sub: "把外包人員的基本與付款資料建檔成資料庫，日後建立勞報單可直接帶入，免去重複輸入。",
    steps: [
      { note: "進入「外包人員名單」，可瀏覽已建檔的外包人員，點「新建人員」開始建立。", image: `${PROTO}/create-1-list.png`, alt: "Laushu 建立外包人員 名單頁" },
      { note: "填寫基本資料（姓名、電子郵件、身分證字號、戶籍地址…）與付款資料（支付方式、銀行帳號），並上傳身分證、存摺封面。", image: `${PROTO}/create-2-form.png`, alt: "Laushu 建立外包人員 新建表單" },
      { note: "資料填寫完成、證件上傳後，點「儲存並離開」完成建檔。", image: `${PROTO}/create-3-saved.png`, alt: "Laushu 建立外包人員 完成填寫" },
      { note: "回到名單，新建的「王明明」已加入資料庫，日後建立勞報單可直接選用。", image: `${PROTO}/create-4-added.png`, alt: "Laushu 建立外包人員 名單新增成員" },
    ],
  },
  {
    tag: "Flow 2",
    title: "建立勞務報酬單",
    sub: "協助公司建立勞報單，系統自動計算稅額，再寄出確認信給外包人員線上簽收。",
    steps: [
      { note: "進入「勞務報酬單」頁面，點「建立勞報單」開始。", image: `${PROTO}/bill-1-list.png`, alt: "Laushu 建立勞報單 清單頁" },
      { note: "選擇填寫人（自行填寫 / 外包人員填寫），填寫基本資料、勞務內容與金額；系統自動帶出所得稅與二代健保。", image: `${PROTO}/bill-2-form.png`, alt: "Laushu 建立勞報單 表單填寫" },
      { note: "帶入存摺封面與完整金額明細，確認「實付給所得人」金額後準備寄出。", image: `${PROTO}/bill-3-preview.png`, alt: "Laushu 建立勞報單 金額明細與預覽" },
      { note: "點「填寫完畢，寄出確認信」跳出視窗，可用預設訊息或自訂信件主旨與內文，並預覽文件。", image: `${PROTO}/bill-4-alert.png`, alt: "Laushu 建立勞報單 編輯確認信視窗" },
      { note: "系統將勞報單寄到所得人 email 簽收，並提醒對方在期限前完成簽收。", image: `${PROTO}/bill-5-sent.png`, alt: "Laushu 建立勞報單 確認信已寄出" },
      { note: "回到勞報單清單，剛建立的單據已加入，可追蹤後續簽收狀態。", image: `${PROTO}/bill-6-list.png`, alt: "Laushu 建立勞報單 清單更新" },
    ],
  },
  {
    tag: "Flow 3",
    title: "合併多張勞務報酬單",
    sub: "測試驗證後的合併流程：合併多筆勞報資料、清楚呈現細項，減少回簽次數與稅務整理時間。",
    steps: [
      { note: "進入「勞務報酬單」頁面，輸入外包人員姓名後按下搜尋。", image: `${PROTO}/merge-1-search.png`, alt: "Laushu 合併流程 搜尋外包人員勞報單" },
      { note: "勾選要合併的多筆勞報單，右上方即時顯示已勾選筆數與「確認合併」。", image: `${PROTO}/merge-2-select.png`, alt: "Laushu 合併流程 勾選欲合併的勞報單" },
      { note: "若勾選的勞務內容不相同，系統會跳出 alert 提醒，不可合併。", image: `${PROTO}/merge-3-alert.png`, alt: "Laushu 合併流程 內容不同時的 alert 提醒" },
      { note: "合併第一張：外國人稅率不同時系統提醒、勞健保代扣需填 ％ 數、付款日期提醒；因為一起匯款，只需要一個支付方式。", image: `${PROTO}/merge-4-detail.png`, alt: "Laushu 合併流程 合併單據細節編輯" },
      { note: "點選合併項目可展開，檢視被合併的每一張單張。", image: `${PROTO}/merge-5-expand.png`, alt: "Laushu 合併流程 展開檢視合併單張" },
    ],
  },
];

type Translate = (text: string) => string;

function ProtoStep({
  step,
  index,
  isLast,
  t,
}: {
  step: { note: string; image: string; alt: string };
  index: number;
  isLast: boolean;
  t: Translate;
}) {
  const flip = index % 2 === 1;
  const imageSize = protoImageSizes[step.image] ?? { width: 1440, height: 1024 };

  return (
    <>
      <CaseFeatureRow
        flipped={flip}
        note={<p>{t(step.note)}</p>}
        media={
          <CaseMedia variant="full">
            <FeatureImageLightbox src={step.image} alt={t(step.alt)} width={imageSize.width} height={imageSize.height} />
          </CaseMedia>
        }
      />
      {!isLast ? (
        <div className="cs-sol-fconn" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element -- connector SVG is resized at runtime by FeatureConnectors JS */}
          <img src={index % 2 === 0 ? CONN1 : CONN2} alt="" suppressHydrationWarning />
        </div>
      ) : null}
    </>
  );
}

export default async function PrototypeSection() {
  const { t } = await getLaushuTranslator();

  return (
    <section id="cs-sec-prototype" className="cs-section laushu-process-section laushu-prototype-section">
      <LaushuHead eyebrow={t("原型設計")} title={t("最終 UI flow 展示")} />
      <p className="cs-section-lead cs-section-lead--wide cs-section-lead--top-gap">
        {t("根據測試結果迭代完成 Hi-fi 原型，聚焦三條核心流程：建立外包人員、建立勞報單、合併勞報單。")}
      </p>
      <CaseMedia className="cs-showcase-media cs-showcase-media--framed" variant="full">
        <FeatureImageLightbox src={`${IMG}/figma-design.png`} alt={t("Laushu Hi-fi 原型設計總覽")} width={1472} height={793} />
      </CaseMedia>
      <FeatureConnectors />
      <div className="cs-sol-block cs-sol-block--prototype">
        {prototypeFlows.map((flow, gi) => (
          <div className="cs-sol-fgroup cs-sol-fgroup--prototype" key={flow.tag}>
            {gi > 0 ? <div className="cs-sol-fhr" /> : null}
            <div className="cs-sol-fc">
              <div className="cs-sol-fchead">
                <p className="cs-sol-ftitle">{t(`${flow.tag}｜${flow.title}`)}</p>
              </div>
              <div className="cs-sol-fcbody">
                <p className="cs-sol-fsub">{t(flow.sub)}</p>
              </div>
            </div>
            {flow.steps.map((step, i) => (
              <ProtoStep key={step.image} step={step} index={i} isLast={i === flow.steps.length - 1} t={t} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
