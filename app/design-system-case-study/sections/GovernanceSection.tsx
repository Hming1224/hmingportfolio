import { CaseSection } from "../../../components/case-study";
import { getDsTranslator } from "../i18n-server";

const maintenanceStages = [
  {
    title: "定義",
    body: "先寫清楚修改範圍、不可修改項目與驗收標準，再確認 token、shared 與 local 的放置邊界。",
    owner: "human",
    ownerLabel: "由我負責",
  },
  {
    title: "執行",
    body: "AI 先唯讀盤點使用位置、重複模式與影響範圍，再依確認規格小批次實作，每批只動一個明確範圍。",
    owner: "ai",
    ownerLabel: "AI 執行",
  },
  {
    title: "驗收",
    body: "先跑 lint、type check、build、token 與 targeted route 檢查，再由我確認雙語、跨 route、跨 viewport、互動與設計意圖。",
    owner: "human",
    ownerLabel: "我＋AI",
    checks: [
      { title: "規格一致性", owner: "ai" },
      { title: "技術正確性", owner: "ai" },
      { title: "視覺與互動品質", owner: "human" },
      { title: "設計意圖", owner: "human" },
    ],
    footnote: "通過 build 只代表程式能建起來，不代表版面、互動與案例差異符合設計意圖——所以自動檢查之後一定接人工驗收。",
  },
  {
    title: "收斂與留痕",
    body: "結果不符就撤回或縮小修改，不持續疊加修補；通過後更新文件、決策紀錄與版本，讓下一次修改可追溯。",
    owner: "human",
    ownerLabel: "由我負責",
  },
] as const;

const decisionLog = [
  {
    decision: "專案標籤圓角固定為 4px，由所有案例頁共用。",
    validation: "確認所有案例頁的專案標籤使用一致圓角。",
  },
  {
    decision: "一個畫面原則上只放一顆 primary CTA；這是使用原則，若有不同做法需要說明原因。",
    validation: "逐頁檢查 primary CTA 數量與例外說明。",
  },
  {
    decision: "Dark mode：先準備設計變數，使用情境足夠明確後再開放切換。",
    validation: "確認設計變數已備妥，並保留明確的啟用條件。",
  },
];

export default async function GovernanceSection() {
  const { t } = await getDsTranslator();
  return (
    <CaseSection
      id="cs-sec-governance"
      kicker={t("治理與驗證")}
      title={t("導入或維護時，每次都照同一套流程做、驗、記")}
      surface
    >
      <p className="cs-section-lead">
        {t("前面談的是每次怎麼決定；這一段談的是，不管決定什麼，都用同一套流程去做、驗、記。")}
      </p>

      <div className="ds-case-governance-loop">
        <div className="ds-case-governance-legend">
          <span><i className="ds-case-owner-dot ds-case-owner-dot--human" />{t("由我負責")}</span>
          <span><i className="ds-case-owner-dot ds-case-owner-dot--ai" />{t("AI 執行")}</span>
        </div>
        <ol>
          {maintenanceStages.map((stage, index) => (
            <li className={`ds-case-governance-loop__stage ds-case-governance-loop__stage--${stage.owner}`} key={stage.title}>
              <div className="ds-case-governance-loop__meta">
                <span className="ds-case-governance-loop__number">0{index + 1}</span>
                <span className="ds-case-governance-loop__owner">
                  {stage.title === "驗收" ? (
                    <>
                      <i className="ds-case-owner-dot ds-case-owner-dot--human" />
                      <i className="ds-case-owner-dot ds-case-owner-dot--ai" />
                    </>
                  ) : (
                    <i className={`ds-case-owner-dot ds-case-owner-dot--${stage.owner}`} />
                  )}
                  {t(stage.ownerLabel)}
                </span>
              </div>
              <h3>{t(stage.title)}</h3>
              <p>{t(stage.body)}</p>
              {"checks" in stage ? (
                <ul className="ds-case-governance-check">
                  {stage.checks.map((check) => (
                    <li className={`ds-case-governance-check__item ds-case-governance-check__item--${check.owner}`} key={check.title}>
                      {t(check.title)}
                    </li>
                  ))}
                </ul>
              ) : null}
              {"footnote" in stage ? <small>{t(stage.footnote)}</small> : null}
            </li>
          ))}
        </ol>
      </div>

      <p className="ds-case-governance-gate">{t("未經人工驗收，不 push、merge 或 deploy。")}</p>

      <div className="ds-case-decision-log">
        <h3 className="cs-subsection-title">{t("把每次的取捨寫下來，維護才不用靠記憶")}</h3>
        <p className="cs-section-note">
          {t("這些紀錄保留了每條規則的形成過程；下次遇到類似狀況，先翻紀錄，不用從頭再想一次。")}
        </p>
        <ol>
          {decisionLog.map((entry) => (
            <li key={entry.decision}>
              <div>
                <strong>{t(entry.decision)}</strong>
                <span className="ds-case-decision-log__status">{t("已確認")}</span>
              </div>
              <p><b>{t("驗證方式")}</b>{t(entry.validation)}</p>
            </li>
          ))}
        </ol>
      </div>
    </CaseSection>
  );
}
