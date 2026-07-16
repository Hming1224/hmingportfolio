import Image from "next/image";
import { AlertTriangle, Bot } from "lucide-react";
import { CaseSection } from "../../../components/case-study";
import TermNotes from "../components/TermNotes";
import { getDsTranslator } from "../i18n-server";

function GovernanceOwnerMark({ owner, label }: { owner: "human" | "ai"; label: string }) {
  return (
    <span
      className={`ds-case-governance-owner-mark ds-case-governance-owner-mark--${owner}`}
      aria-label={label}
      title={label}
    >
      {owner === "human" ? (
        <Image src="/avatar/avatar-yellow.png" alt="" width={28} height={28} loading="eager" unoptimized />
      ) : (
        <Bot size={18} strokeWidth={1.8} aria-hidden="true" />
      )}
    </span>
  );
}

const maintenanceStages = [
  {
    title: "定義",
    body: "先寫清楚修改範圍、不可修改項目與驗收標準，再確認 token、shared 與 local 的放置邊界。",
    owner: "human",
    ownerLabel: "由我負責",
  },
  {
    title: "執行",
    body: "AI 先盤點使用位置、重複模式和影響範圍，這一步不動程式；確認規格後再分批實作，每批只處理一個明確範圍。",
    owner: "ai",
    ownerLabel: "AI 執行",
  },
  {
    title: "驗收",
    body: "先跑 lint、type check、build、token 和指定頁面檢查；接著由我確認雙語內容、跨頁版面、不同螢幕寬度的呈現、互動與設計意圖。",
    owner: "human",
    ownerLabel: "我＋AI",
    checks: [
      { title: "規格一致性", owner: "ai" },
      { title: "技術正確性", owner: "ai" },
      { title: "視覺與互動品質", owner: "human" },
      { title: "設計意圖", owner: "human" },
    ],
    footnote: "build 通過，只能確認程式建得起來；版面、互動與案例差異是否符合設計意圖，還是要由我人工驗收。",
  },
  {
    title: "收斂與留痕",
    body: "結果不符就撤回或縮小修改，不持續疊加修補；通過後更新文件、決策紀錄與版本，讓下一次修改可追溯。",
    owner: "human",
    ownerLabel: "由我負責",
  },
] as const;

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
        {t("前面說的是怎麼做決定。決定之後，我會固定照這套流程執行、驗收並留下紀錄。")}
      </p>

      <div className="ds-case-governance-loop">
        <div className="ds-case-governance-legend">
          <span>
            <GovernanceOwnerMark owner="human" label={t("由我負責")} />
            {t("由我負責")}
          </span>
          <span>
            <GovernanceOwnerMark owner="ai" label={t("AI 執行")} />
            {t("AI 執行")}
          </span>
        </div>
        <ol>
          {maintenanceStages.map((stage, index) => (
            <li className={`ds-case-governance-loop__stage ds-case-governance-loop__stage--${stage.owner}`} key={stage.title}>
              <header className="ds-case-governance-loop__header">
                <span className="ds-case-governance-loop__number">0{index + 1}</span>
                <h3>{t(stage.title)}</h3>
                <span className="ds-case-governance-loop__owner">
                  {stage.title === "驗收" ? (
                    <>
                      <GovernanceOwnerMark owner="human" label={t("由我負責")} />
                      <GovernanceOwnerMark owner="ai" label={t("AI 執行")} />
                    </>
                  ) : (
                    <GovernanceOwnerMark owner={stage.owner} label={t(stage.ownerLabel)} />
                  )}
                </span>
              </header>
              <div className="ds-case-governance-loop__body">
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
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="ds-case-governance-gate">
        <AlertTriangle size={20} aria-hidden="true" />
        {t("未經人工驗收，不 push、merge 或 deploy。")}
      </p>

      <TermNotes
        title={t("名詞說明")}
        ariaLabel={t("這一段的名詞說明")}
        items={[
          { term: "token・shared・local", description: t("設計系統的三層放置邏輯：可重複引用的設計值放 token，跨頁共用的結構放 shared，只服務單一頁面的留在 local。") },
          { term: "lint / type check / build", description: t("三種自動檢查：lint 抓格式與寫法問題、type check 抓型別錯誤、build 確認整個網站能順利建置。") },
          { term: "push / merge / deploy", description: t("把改動送上遠端（push）、合併進正式分支（merge）、部署上線（deploy）；這三步一旦執行就會影響正式站。") },
        ]}
      />
    </CaseSection>
  );
}
