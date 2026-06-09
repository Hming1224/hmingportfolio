import Image from "next/image";
import { Fragment } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import YearRail from "../../components/YearRail";
import AvatarProfile from "../../components/AvatarProfile";
import AnimatedContent from "./AnimatedContent";
import GenieReveal from "./GenieReveal";
import EducatorMasonry from "./EducatorMasonry";
import {
  designValues,
  educatorItems,
  experiences,
  experienceYears,
  firstExperienceIndexByYear,
  skillCategories,
  tools,
  type ExperiencePoint,
} from "../../data/about";

function renderExperiencePoint(point: ExperiencePoint) {
  if (typeof point === "string") {
    return point;
  }

  return point.map((segment, index) =>
    segment.highlight ? (
      <strong className="resume-highlight" key={index}>
        {segment.text}
      </strong>
    ) : (
      <Fragment key={index}>{segment.text}</Fragment>
    ),
  );
}

function ValueIcon({ id }: { id: string }) {
  if (id === "layers") {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 22 8.5 12 15 2 8.5" />
        <polyline points="2 15.5 12 22 22 15.5" />
        <polyline points="2 12 12 18.5 22 12" />
      </svg>
    );
  }
  if (id === "search") {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    );
  }
  if (id === "zap") {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    );
  }
  return null;
}

function SkillIcon({ id }: { id: string }) {
  if (id === "layout") {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    );
  }
  if (id === "users") {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }
  if (id === "cpu") {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="15" x2="23" y2="15" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="15" x2="4" y2="15" />
      </svg>
    );
  }
  if (id === "briefcase") {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    );
  }
  return null;
}

function SectionHeading({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <div className="section-heading about-heading" id={id}>
      <span />
      <h2>{children}</h2>
      <span />
    </div>
  );
}

export default function AboutMePage() {
  return (
    <main className="about-page">
      <Navbar />

      {/* 1. Hero — Quote + 個人故事 */}
      <section className="about-hero" aria-labelledby="about-title">
        <GenieReveal threshold={0.05} className="about-window-animated-wrap">
          <div className="about-window">
            <div className="window-bar">
              <span />
              <span />
              <span />
            </div>
            <div className="about-window-body">
              <div
                className="avatar-profile-wrap"
                aria-label="Brian Huang portrait"
              >
                <div className="avatar-profile-stage">
                  <AvatarProfile
                    imageSrc="/avatar/avatar-gray.png"
                    hoverImageSrc="/avatar/avatar-yellow.png"
                    imageAlt="Brian Huang"
                  />
                </div>
              </div>

              <div className="about-intro-copy">
                <h1 id="about-title">從重啟自我，到設計產品體驗</h1>
                <p>
                  我是黃宣銘，一名結合 UI/UX 設計、商業願景與工程背景的 Junior
                  Product Designer。
                </p>
                <p>
                  大學時期的一場重病，讓我重新理解自己對美感與設計的熱情；而機械工程訓練出的系統思維，則成為我進入產品設計後的重要基礎。對我來說，設計不是單純美化畫面，而是將複雜的問題、需求與限制，轉化為清楚、直覺且可落地的使用者體驗。
                </p>
                <p>
                  過去我參與過 B2B AI 能源管理平台、量化交易產品與 Web3
                  服務設計，累積使用者研究、介面設計、prototype
                  與跨部門協作經驗。現在的我，正持續探索 AI
                  工具如何幫助設計師更有效率地釐清問題、建立
                  MVP，並推進產品驗證，朝 Product Builder 的方向前進。
                </p>
              </div>
            </div>
          </div>
        </GenieReveal>
      </section>

      {/* 2. Design Values */}
      <SectionHeading id="values">設計信念</SectionHeading>
      <section className="design-values-section">
        {designValues.map((value, i) => (
          <AnimatedContent
            className="design-value-animated"
            delay={i * 0.12}
            distance={120}
            duration={0.95}
            ease="power3.out"
            initialOpacity={0}
            key={value.title}
            scale={0.96}
            threshold={0.05}
          >
            <div className="design-value-card" tabIndex={0}>
              <div className="design-value-icon">
                <ValueIcon id={value.iconId} />
              </div>
              <h3>{value.title}</h3>
              <p>{value.desc}</p>
            </div>
          </AnimatedContent>
        ))}
      </section>

      {/* 3. 工作經歷 */}
      <SectionHeading id="experience">工作經歷</SectionHeading>
      <section className="experience-layout">
        <YearRail years={experienceYears} />
        <div className="experience-list">
          {experiences.map((item, index) => (
            <article
              className="experience-card"
              data-year={item.year}
              id={
                firstExperienceIndexByYear[item.year] === index
                  ? `year-${item.year}`
                  : undefined
              }
              key={`${item.title}-${index}`}
            >
              <div className="experience-image">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) calc(100vw - 48px), 269px"
                />
              </div>
              <div className="experience-copy">
                <p className="experience-year">{item.year}</p>
                <h3>{item.title}</h3>
                <p className="experience-role">{item.role}</p>
                <p className="experience-date">{item.date}</p>
                <ul>
                  {item.points.map((point, pointIdx) => (
                    <li key={pointIdx}>{renderExperiencePoint(point)}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. 對設計教育的貢獻 */}
      <SectionHeading id="educator">設計推廣</SectionHeading>
      <EducatorMasonry items={educatorItems} />

      {/* 5. 專業技能 */}
      <SectionHeading id="skills">專業技能</SectionHeading>
      <section className="skills-panel">
        <div className="skills-grid">
          {skillCategories.map((category, idx) => (
            <AnimatedContent
              key={category.title}
              className="skill-animated-card"
              delay={idx * 0.12}
              distance={80}
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              scale={0.97}
              threshold={0.05}
            >
              <div
                className={`skill-category-card ${category.toneClass}`}
              >
                <div className="skill-card-header">
                  <div className="skill-card-icon">
                    <SkillIcon id={category.iconId} />
                  </div>
                  <h3>{category.title}</h3>
                </div>
                <div className="skill-card-divider" />
                <ul className="skill-item-list">
                  {category.skills.map((skill) => (
                    <li key={skill} className="skill-item">
                      <span className="skill-bullet" />
                      <span className="skill-text">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContent>
          ))}
        </div>

        <h3>擅長軟體</h3>
        <div className="tool-grid">
          {tools.map(([name, icon], idx) => (
            <AnimatedContent
              key={name}
              className="tool-item"
              delay={idx * 0.05}
              distance={40}
              duration={0.6}
              ease="power3.out"
              initialOpacity={0}
              scale={0.95}
              threshold={0.05}
            >
              <Image src={icon} alt="" width={80} height={80} sizes="80px" />
              <p>{name}</p>
            </AnimatedContent>
          ))}
        </div>
      </section>

      {/* 6. 教育背景 */}
      <SectionHeading id="education">教育背景</SectionHeading>
      <section className="education-list">
        <AnimatedContent
          delay={0}
          distance={120}
          duration={0.95}
          scale={0.96}
          ease="power3.out"
          threshold={0.05}
        >
          <article className="education-card">
            <Image
              src="https://framerusercontent.com/images/Ac7sKcF2w4TpZnOI28BGtm3h8.png"
              alt=""
              width={140}
              height={140}
            />
            <div>
              <h3>國立政治大學 數位內容碩士學位學程</h3>
              <p className="experience-date" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span>2023.09 - 2026.04</span>
                <span className="hero-badge-shimmer-wrap" style={{ padding: '1px' }}>
                  <span className="hero-badge" style={{ padding: '4px 10px', fontSize: '12px' }}>
                    <span>GPA 4.07</span>
                  </span>
                </span>
              </p>
              <p>主修使用者體驗研究、人機互動、設計思考與人工智慧。</p>
            </div>
          </article>
        </AnimatedContent>

        <AnimatedContent
          delay={0.12}
          distance={120}
          duration={0.95}
          scale={0.96}
          ease="power3.out"
          threshold={0.05}
        >
          <article className="education-card">
            <Image
              src="https://framerusercontent.com/images/o53UPGa6UhydVFF9ZPVPLPqKJ20.png"
              alt=""
              width={140}
              height={140}
            />
            <div>
              <h3>國立成功大學 機械工程學系</h3>
              <p className="experience-date">2017.09 - 2021.02</p>
              <p>
                主修熱力學與機械設計，並以設計思維和使用者中心設計作為第二專業。
              </p>
            </div>
          </article>
        </AnimatedContent>
      </section>

      <Footer />
    </main>
  );
}
