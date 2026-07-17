import type { ReactNode } from "react";
import {
  BeforeAfterNarrativeFrame,
  CaseFlowFrame,
  CaseMedia,
  ZoomableImage,
} from "../../../components/case-study";
import {
  TaskFlowOneDiagram,
  TaskFlowThreeDiagram,
  TaskFlowTwoDiagram,
} from "../components/TaskFlowDiagrams";
import { ArticleBlock, LaushuHead } from "../components/LaushuPrimitives";
import { getLaushuTranslator } from "../i18n-server";

const IMG = "/projects/laushu";
const ITER = `${IMG}/iterate`;

const iterationBoards = [
  {
    tag: "操作流程 1",
    title: "外包人員名單資訊排序",
    label: "調整欄位優先級，提升人員辨識效率",
    paras: [
      "原本的欄位排序以一般資料欄位為主，將電子郵件與身分證字號放在前段，但在實際查找外包人員時，使用者更需要先確認姓名、戶籍地址與匯款資料，才能快速判斷是否正確對象。",
      "調整後將欄位順序改為「姓名 → 戶籍地址 → 存摺 → 身分證字號 → 電子郵件」，把變動性低、辨識度高，且與付款流程直接相關的資訊提前，降低橫向掃描成本，提升查找與核對效率。",
    ],
    before: { src: `${ITER}/ui-sort-before.png`, width: 1440, height: 1024 },
    after: { src: `${ITER}/ui-sort-after.png`, width: 1440, height: 1024 },
    alt: "Laushu 設計迭代 外包人員名單欄位排序",
  },
  {
    tag: "操作流程 2",
    title: "勞務內容與金額填寫區",
    label: "增加稅額與日期提示，提升金額核對準確性",
    paras: [
      "原本在建立勞務報酬單時，稅額資訊雖然有顯示在金額區塊中，但缺少明確的稅率百分比與文字說明。使用者對於常填寫的類別稅額較熟悉，但遇到不常填的申報類別時，容易忘記適用的扣款規則，導致需要另外查詢或人工確認。",
      "調整後在申報類別旁補上「瞭解更多」說明入口，讓使用者可以查看各類別的扣稅說明；並在付款日期下方加入提醒文字，提示付款日期須晚於勞務期間，避免填寫不合理的付款時間。金額區塊也直接標示代扣所得稅與二代健保的扣款百分比，讓填寫方與核對方都能快速確認計算依據，同時提醒需留意外國人的稅率可能不同，降低金額與稅額核對錯誤的風險。",
    ],
    before: { src: `${ITER}/ui-amount-before.png`, width: 1440, height: 821 },
    after: { src: `${ITER}/ui-amount-after.png`, width: 1440, height: 821 },
    alt: "Laushu 設計迭代 勞務內容與金額填寫區",
  },
  {
    tag: "操作流程 2",
    title: "填寫人選擇元件",
    label: "修正填寫人用詞，明確區分資料建立情境",
    paras: [
      "原本在建立勞務報酬單時，「填寫人」區塊使用「請所得人填寫」與「自行填寫」作為選項文字，但「所得人」這個用詞對使用者來說較不直覺，容易不確定是指外包人員、公司內部人員，還是報酬單建立者本人。下方的「新進人員／既有勞務人員」也容易讓人誤解為是否已建立人員資料，而不是在區分外包人員的狀態。",
      "調整後將選項文字修正為「外包人員填寫」與「自行填寫」，直接點出資料由誰填寫，讓使用者能更快理解兩種填寫方式的差異。同時將下方選項改為「首次外包人員／既有外包人員」，明確區分是第一次建立資料的外包人員，還是已存在於名單中的外包人員，降低用詞造成的判斷成本。",
    ],
    before: { src: `${ITER}/ui-filler-before.png`, width: 1440, height: 430 },
    after: { src: `${ITER}/ui-filler-after.png`, width: 1440, height: 430 },
    alt: "Laushu 設計迭代 填寫人選擇元件",
  },
  {
    tag: "操作流程 2",
    title: "列表資料呈現區",
    label: "優化資料呈現，快速查看已建立勞報單",
    paras: [
      "原本的勞務報酬單列表雖然已顯示建立日期、姓名、勞務內容、金額與簽收進度，但資料呈現較接近一般清單，缺少能幫助使用者快速判斷時間區間與資料批次的視覺提示。當勞報單數量增加時，使用者需要逐筆掃描日期，才能分辨哪些資料屬於同一年、同一批或需要優先處理的期間，查找效率較低。",
      "調整後強化「建立日期」欄位的辨識度，並以不同年份作為視覺區分，讓使用者能更快掌握勞務報酬單建立時間與資料區間。列表下方也新增分頁設計，避免大量資料一次展開造成閱讀負擔，讓使用者可以分批查看已建立的勞報單。",
    ],
    before: { src: `${ITER}/ui-list-before.png`, width: 1440, height: 1024 },
    after: { src: `${ITER}/ui-list-after.png`, width: 1440, height: 1024 },
    alt: "Laushu 設計迭代 列表資料呈現區",
  },
  {
    tag: "操作流程 2",
    title: "寄出確認視窗",
    label: "增加預覽狀態，降低寄出前的不確定感",
    paras: [
      "原本在建立勞務報酬單時，使用者填完資料後會直接進入寄出通知信的編輯視窗，雖然可以修改信件標題與內容，但無法在寄出前完整預覽勞報單實際內容。對使用者來說，這會產生「資料是否正確填寫」、「寄出去後對方會看到什麼」的不確定感，尤其勞務報酬單涉及姓名、地址、金額、稅額與付款日期等重要資訊，若沒有最後確認步驟，寄出前容易感到緊張。",
      "調整後在寄出前新增「預覽文件」狀態，讓使用者可以先從信件編輯進入勞報單預覽畫面，完整檢查基本資料、勞務內容、勞務金額與相關填寫資訊是否正確。確認無誤後，再按下確認按鈕完成寄出。",
    ],
    before: { src: `${ITER}/ui-send-before.png`, width: 1440, height: 1023 },
    after: { src: `${ITER}/ui-send-after.png`, width: 2957, height: 1023 },
    alt: "Laushu 設計迭代 寄出確認視窗",
  },
  {
    tag: "操作流程 3",
    title: "合併清單顯示",
    label: "優化合併勞報單功能，清楚顯示合併清單",
    paras: [
      "原本在合併多張勞報單時，使用者點選要合併的項目後，列表中只以一般文字或單列資料呈現合併結果，較難清楚辨識哪些勞報單已被納入同一張合併單。尤其當同一位外包人員有多筆不同日期或不同勞務內容的資料時，使用者需要重新比對清單，才能確認目前合併的是哪幾筆資料，增加核對成本。",
      "調整後將已合併的勞報單以群組方式呈現，並透過底色區塊清楚標示合併範圍，讓使用者可以一眼看出哪些資料被收合在同一張合併單中。同時在備註欄補上合併單號與合併狀態，讓合併後的資料來源與關聯性更明確。",
    ],
    before: { src: `${ITER}/ui-merge-before.png`, width: 1412, height: 1004 },
    after: { src: `${ITER}/ui-merge-after.png`, width: 1440, height: 1024 },
    alt: "Laushu 設計迭代 合併清單顯示",
  },
];

type IterationImage = { src: string; width: number; height: number };

function getIterationPanelClass(image: IterationImage) {
  return `cs-before-after-narrative-panel--laushu-w-${image.width}`;
}

function TaskFlowChart({
  tag,
  title,
  scrollHintLabel,
  children,
}: {
  tag: string;
  title: string;
  scrollHintLabel: string;
  children: ReactNode;
}) {
  return (
    <CaseFlowFrame
      scrollHintLabel={scrollHintLabel}
      variant="split"
      header={
        <>
        <span className="cs-flow-frame-badge">{tag}</span>
        <span className="cs-flow-frame-title">{title}</span>
        </>
      }
    >
      {children}
    </CaseFlowFrame>
  );
}

function IterationComparisonMedia({
  image,
  alt,
  labels,
}: {
  image: IterationImage;
  alt: string;
  labels: { close: string; separator: string; zoom: string };
}) {
  return (
    <ZoomableImage
      src={image.src}
      alt={alt}
      width={image.width}
      height={image.height}
      className="cs-iteration-panel-image"
      labels={labels}
    />
  );
}

export default async function IterateSection() {
  const { t } = await getLaushuTranslator();
  const scrollHintLabel = t("← 左右滑動查看更多");
  const zoomLabels = { close: t("關閉放大圖片"), separator: "：", zoom: "點擊放大" };

  return (
    <section id="cs-sec-iterate" className="cs-section laushu-process-section laushu-iterate-section">
      <LaushuHead eyebrow={t("測試與迭代")} title={t("從任務測試中，修正既有的流程與介面問題")} />
      <ArticleBlock title={t("任務測試與易用性量表")} number="01">
        <p>{t("邀請上次接受訪談的 2 位受訪者再次進行介面評估：")}</p>
        <ul>
          <li>{t("節目企劃：長期需要外包主持人")}</li>
          <li>{t("攝影工作室老闆：長期需要外包攝影師合作拍攝")}</li>
        </ul>
        <p>{t("針對三個重要用例繪製流程圖，透過 Figma 原型讓受訪者以放聲思考法完成任務測試，並填寫 SUS 易用性量表：")}</p>
      </ArticleBlock>
      <div className="cs-flow-frame-list">
        <TaskFlowChart tag={t("操作流程 1")} title={t("建立外包人員資料庫，便於掌管人員個人資料")} scrollHintLabel={scrollHintLabel}>
          <TaskFlowOneDiagram t={t} />
        </TaskFlowChart>
        <TaskFlowChart tag={t("操作流程 2")} title={t("建立勞務報酬單，發送系統連結給外包人員填寫資料 / 回簽")} scrollHintLabel={scrollHintLabel}>
          <TaskFlowTwoDiagram t={t} />
        </TaskFlowChart>
        <TaskFlowChart tag={t("操作流程 3")} title={t("合併多張勞務報酬單，減少回簽次數與調整稅額")} scrollHintLabel={scrollHintLabel}>
          <TaskFlowThreeDiagram t={t} />
        </TaskFlowChart>
      </div>
      <ArticleBlock title={t("設計介面、元件迭代")} number="02">
        <p>{t("這次介面與元件迭代聚焦在降低判斷成本、提升核對效率。透過調整資訊排序、用詞、提示文字與列表呈現，讓使用者能更快找到正確資料、理解欄位意義，並在寄出或合併前完成確認，降低錯填、漏填與誤合併的風險。")}</p>
      </ArticleBlock>
      <div className="cs-iteration-list">
        {iterationBoards.map((board) => (
          <BeforeAfterNarrativeFrame
            key={board.title}
            className="cs-iteration-board"
            badge={t(board.tag)}
            title={t(board.title)}
            points={[{ label: t(board.label), content: <>{board.paras.map((p, i) => <p key={i}>{t(p)}</p>)}</> }]}
            beforeLabel={t("Before")}
            afterLabel={t("After")}
            beforeClassName={getIterationPanelClass(board.before)}
            afterClassName={getIterationPanelClass(board.after)}
            before={<IterationComparisonMedia image={board.before} alt={t(`${board.alt} Before`)} labels={zoomLabels} />}
            after={<IterationComparisonMedia image={board.after} alt={t(`${board.alt} After`)} labels={zoomLabels} />}
          />
        ))}
      </div>
      <ArticleBlock title={t("測試結果")} number="03">
        <p>{t("SUS ：82.5 (excellent) 介面容易了解與使用。")}</p>
        <p>{t("根據任務測試與 SUS 分數收斂迭代方向，作為最終 Hi-fi 原型的設計依據。")}</p>
      </ArticleBlock>
      <CaseMedia className="cs-showcase-media" variant="full">
        <ZoomableImage
          src={`${IMG}/test-result.png`}
          alt={t("Laushu 任務測試與 SUS 結果")}
          width={2752}
          height={1968}
          labels={{ close: t("關閉放大圖片"), separator: t("："), zoom: t("點擊放大") }}
        />
      </CaseMedia>
    </section>
  );
}
