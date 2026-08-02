import Image from "next/image";
import { CaseSection } from "../../../components/case-study";
import { roleCards } from "../data";
import { localizeAdvantechTree, translateAdvantechData } from "../i18n";
import { getAdvantechTranslator } from "../i18n-server";

export default async function RoleSection() {
  const { locale, t } = await getAdvantechTranslator();
  const cards = translateAdvantechData(locale, roleCards);
  return localizeAdvantechTree(locale,
    <CaseSection
      id="cs-sec-role"
      kicker={locale === "en" ? t("我的角色標籤") : t("我的角色")}
      title={t("從範疇定義、研究到原型，推進 AI 聊天機器人工作流程。")}
    >
      <div className="cs-role-radial cs-stack-box">
        <svg
          className="cs-role-connectors"
          viewBox="0 0 1440 620"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line x1="450" y1="161" x2="720" y2="286" />
          <line x1="720" y1="286" x2="990" y2="161" />
          <line x1="450" y1="410" x2="720" y2="286" />
          <line x1="720" y1="286" x2="990" y2="410" />
        </svg>
        <div className="cs-role-center cs-object-box">
          <Image
            src="/projects/advantech/research/role-center.jpg"
            alt={t("專案工作證與工作現場照片")}
            fill
            sizes="240px"
            style={{ objectFit: "cover" }}
          />
        </div>
        {cards.map((item, index) => (
          <div key={item.num} className={`cs-role-card cs-role-card-${index + 1} cs-stack-box`}>
            <span className="cs-role-num cs-inline-pill">{item.num}</span>
            <h3 className="cs-role-title cs-copy-title">{item.title}</h3>
            <p className="cs-role-desc cs-copy-body">{item.desc}</p>
          </div>
        ))}
      </div>
    </CaseSection>
  );
}
