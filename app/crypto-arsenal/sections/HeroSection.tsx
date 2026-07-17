import { CaseHero, type CaseInfoItem } from "../../../components/case-study";
import { heroTasks } from "../data";
import { getCryptoArsenalTranslator } from "../i18n-server";

export default async function HeroSection() {
  const { t } = await getCryptoArsenalTranslator();
  const infoItems: CaseInfoItem[] = [
    {
      label: t("時間進程"),
      value: (
        <span className="cs-info-value--timeline">
          <span>2023.06</span>
          <span className="cs-info-timeline-sep" aria-hidden="true">–</span>
          <span>2023.08</span>
        </span>
      ),
    },
    {
      label: t("團隊成員"),
      value: (
        <>
          {t("1位產品負責人")}
          <br />
          {t("1位UIUX設計師")}
          <br />
          {t("2位全端工程師")}
        </>
      ),
    },
    { label: t("我的角色"), value: t("UIUX設計師") },
    {
      label: t("負責項目"),
      value: heroTasks.map((item, index) => (
        <span key={item}>
          {t(item)}
          {index < heroTasks.length - 1 && <br />}
        </span>
      )),
    },
    {
      label: t("使用軟體"),
      value: ["Figma", "FigJam", "Jira"].map((item, index) => (
        <span key={item}>
          {item}
          {index < 2 && <br />}
        </span>
      )),
    },
  ];

  return (
    <CaseHero
      cover={{
        src: "/projects/crypto-arsenal/cover/hero-cover.webp",
        alt: t("Crypto Arsenal 量化交易平台介面主視覺"),
      }}
      meta={<span className="cs-tags">WEB・FinTech・Crypto・UX Design・UI Design</span>}
      title={t("重掌交易主控權：量化交易平台的手動平倉與止盈止損流程設計")}
      infoItems={infoItems}
      infoGridClassName="cs-info-row--divided"
    />
  );
}
