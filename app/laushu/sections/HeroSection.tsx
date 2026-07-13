import { CaseHero, type CaseInfoItem } from "../../../components/case-study";
import { getLaushuTranslator } from "../i18n-server";

const IMG = "/projects/laushu";

const roleItems = [
  { label: "時間", value: ["2024.3 - 2024.6"] },
  { label: "團隊成員", value: ["3x 研究員", "1x 設計師"] },
  { label: "角色", value: ["UX/UI", "設計師"] },
  { label: "負責項目", value: ["線框稿", "互動原型", "協同參與訪談、", "易用性測試"] },
  { label: "工具", value: ["FigJam", "Figma"] },
];

export default async function HeroSection() {
  const { t } = await getLaushuTranslator();
  const infoItems: CaseInfoItem[] = roleItems.map((item) => ({
    label: t(item.label),
    value: item.value.map((line, index) => (
      <span key={line}>
        {t(line)}
        {index < item.value.length - 1 ? <br /> : null}
      </span>
    )),
  }));

  return (
    <CaseHero
      cover={{
        src: `${IMG}/hero-cover.png`,
        alt: t("Laushu 勞贖設計優化專案主視覺"),
        objectPosition: "center",
        sizes: "100vw",
      }}
      coverClassName="laushu-hero-cover"
      infoClassName="laushu-hero-info"
      infoGridClassName="cs-info-row--divided"
      meta={<span className="cs-tags">{t("WEB・SaaS・UX Research・UI Design")}</span>}
      title={t("從紙本化繁為簡：勞務報酬系統的數位流程優化")}
      infoItems={infoItems}
    />
  );
}
