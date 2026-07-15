import { CaseCard, CaseGrid, CaseSection } from "../../../components/case-study";
import { getDsTranslator } from "../i18n-server";

const maintenanceSteps = [
  { title: "定義任務", body: "先寫清楚修改範圍、不可修改項目與驗收標準。", owner: "human" },
  { title: "唯讀盤點", body: "AI 先搜尋使用位置、重複模式與可能影響，不直接修改。", owner: "ai" },
  { title: "確認邊界", body: "我確認問題、方向，以及 token、shared 與 local 的放置位置。", owner: "human" },
  { title: "小批次實作", body: "AI 依照已確認規格調整程式，每批只處理一個明確範圍。", owner: "ai" },
  { title: "程式與 route 檢查", body: "依任務執行 lint、type check、build、token、連結與 targeted route 驗證。", owner: "ai" },
  { title: "人工驗收", body: "我檢查雙語、跨 route、跨 viewport、互動與原本設計意圖。", owner: "human" },
  { title: "不符就撤回", body: "若結果偏離設計意圖，就撤回或縮小修改，不持續疊加修補。", owner: "human" },
  { title: "同步紀錄", body: "通過後更新文件、決策紀錄與版本，讓下一次修改可追溯。", owner: "human" },
];

const qualityLayers = [
  {
    title: "規格一致性",
    body: "確認修改範圍、元件 API、Design Token、shared／local 邊界、i18n、accessibility 與 reduced motion。",
    owner: "依已確認規格逐項核對",
    signal: "ai",
  },
  {
    title: "技術正確性",
    body: "依任務執行 lint、type check、build、token check 與 targeted route 驗證，並檢查 console error 與 horizontal overflow。",
    owner: "可重複執行的程式檢查",
    signal: "ai",
  },
  {
    title: "視覺與互動品質",
    body: "檢查 1440、1024、768、390 的雙語版面、圖片比例、表格、tab、hover、focus 與鍵盤操作。",
    owner: "跨 route 與 viewport 人工檢查",
    signal: "human",
  },
  {
    title: "設計意圖",
    body: "判斷是否真正解決問題、保留案例差異，並避免為了共用而增加不必要的複雜度。",
    owner: "由我做出最終是否接受的決定",
    signal: "human",
  },
];

const decisionLog = [
  {
    problem: "相似的 Before／After 版型是否應共用？",
    basis: "外框、內容順序與 RWD 行為穩定重複，但各頁內容不同。",
    decision: "共用固定外框與 slot，案例內容保持獨立。",
    validation: "跨案例 route 與四個 viewport 比對。",
  },
  {
    problem: "反思卡是否應整理成單一 shared component？",
    basis: "背景、標號與排列方式承擔不同敘事用途。",
    decision: "共用 CaseCard 與 Design Token，敘事版型留在 route-local。",
    validation: "確認單頁樣式不影響其他案例。",
  },
  {
    problem: "尚未出現真實需求的元件是否先建立？",
    basis: "缺少穩定內容模型與第二個使用情境。",
    decision: "暫緩建立，等需求再次出現後重新評估。",
    validation: "文件只列實際程式正在使用的項目。",
  },
];

export default async function GovernanceSection() {
  const { t } = await getDsTranslator();
  return (
    <CaseSection
      id="cs-sec-governance"
      kicker={t("治理與驗證")}
      title={t("自動檢查守住正確性，人工驗收守住設計意圖")}
      surface
    >
      <div className="ds-case-governance-flow" aria-labelledby="ds-case-governance-flow-title">
        <div className="ds-case-workflow__header">
          <h3 className="cs-subsection-title" id="ds-case-governance-flow-title">
            {t("可持續執行的品質流程")}
          </h3>
          <p className="cs-section-note">
            {t("穩定品質來自明確輸入、有限範圍、自動檢查、人工驗收與可回溯紀錄。")}
          </p>
        </div>
        <div className="ds-case-governance-legend">
          <span><i className="ds-case-owner-dot ds-case-owner-dot--human" />{t("由我負責")}</span>
          <span><i className="ds-case-owner-dot ds-case-owner-dot--ai" />{t("AI 執行")}</span>
        </div>
        <ol>
          {maintenanceSteps.map((step, index) => (
            <li className={`ds-case-governance-step ds-case-governance-step--${step.owner}`} key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h4>{t(step.title)}</h4><p>{t(step.body)}</p></div>
            </li>
          ))}
        </ol>
        <p className="ds-case-governance-gate">{t("未經人工驗收，不 push、merge 或 deploy。")}</p>
      </div>

      <div className="ds-case-subsection-header">
        <h3 className="cs-subsection-title">
          {t("AI 產出品質的四層檢查")}
        </h3>
        <p className="cs-section-note">
          {t("前兩層確認是否符合規格並能正常運作；後兩層確認實際體驗與設計意圖。")}
        </p>
      </div>
      <CaseGrid variant="two" className="ds-case-card-grid ds-case-quality-grid">
        {qualityLayers.map((layer, index) => (
          <CaseCard className={`ds-case-quality-card ds-case-quality-card--${layer.signal}`} key={layer.title}>
            <span className="ds-case-quality-card__number">0{index + 1}</span>
            <h3>{t(layer.title)}</h3>
            <p>{t(layer.body)}</p>
            <footer><i className={`ds-case-owner-dot ds-case-owner-dot--${layer.signal}`} />{t(layer.owner)}</footer>
          </CaseCard>
        ))}
      </CaseGrid>

      <p className="ds-case-editorial-statement">
        {t("通過 build 代表程式可以建立，不代表版面、互動與案例差異符合設計意圖。")}
      </p>

      <div className="ds-case-decision-log">
        <h3 className="cs-subsection-title">{t("代表性決策紀錄")}</h3>
        <p className="cs-section-note">
          {t("每筆紀錄保留問題、判斷依據、決定與驗證方式，讓後續修改能追溯當時的取捨。")}
        </p>
        <ol>
          {decisionLog.map((entry) => (
            <li key={entry.problem}>
              <strong className="ds-case-decision-log__problem">{t(entry.problem)}</strong>
              <span className="ds-case-decision-log__basis"><b>{t("判斷依據")}</b>{t(entry.basis)}</span>
              <span className="ds-case-decision-log__decision"><b>{t("決定")}</b>{t(entry.decision)}</span>
              <span className="ds-case-decision-log__validation"><b>{t("驗證方式")}</b>{t(entry.validation)}</span>
            </li>
          ))}
        </ol>
      </div>
    </CaseSection>
  );
}
