import Image from "next/image";
import { CaseSection } from "../../../components/case-study";
import { roleCards } from "../data";

export default function RoleSection() {
  return (
    <CaseSection id="cs-sec-role" title="我在這個專案做了什麼...">
      <div className="cs-role-radial">
        <svg
          className="cs-role-connectors"
          viewBox="0 0 1440 620"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line x1="450" y1="161" x2="611" y2="235" />
          <line x1="829" y1="235" x2="990" y2="161" />
          <line x1="450" y1="410" x2="611" y2="336" />
          <line x1="829" y1="336" x2="990" y2="410" />
        </svg>
        <div className="cs-role-center">
          <Image
            src="/projects/advantech-figma/role-center.png"
            alt="專案工作證與工作現場照片"
            fill
            sizes="240px"
            style={{ objectFit: "cover" }}
            unoptimized
          />
        </div>
        {roleCards.map((item, index) => (
          <div key={item.num} className={`cs-role-card cs-role-card-${index + 1}`}>
            <span className="cs-role-num">{item.num}</span>
            <h3 className="cs-role-title">{item.title}</h3>
            <p className="cs-role-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </CaseSection>
  );
}
