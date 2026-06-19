import Image from "next/image";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Fragment } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import YearRail from "../../components/YearRail";
import AvatarProfile from "../../components/AvatarProfile";
import AnimatedContent from "./AnimatedContent";
import GenieReveal from "./GenieReveal";
import EducatorMasonry from "./EducatorMasonry";
import SplitText from "../../components/animate-ui/primitives/texts/SplitText";
import { getAboutData, type ExperiencePoint } from "../../data/about";
import type { Locale } from "../../i18n/routing";
import { createLocalizedMetadata } from "../../lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;

  return createLocalizedMetadata(locale, "/about-me", {
    en: {
      title: "About Me",
      description:
        "Learn about Brian Huang's product design experience, design values, education, skills, and journey toward becoming a Product Builder.",
    },
    "zh-TW": {
      title: "關於我",
      description:
        "認識黃宣銘 Brian Huang 的產品設計經歷、設計價值觀、學習背景、技能，以及成為 Product Builder 的歷程。",
    },
  });
}

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
  text,
  id,
}: {
  text: string;
  id?: string;
}) {
  return (
    <div className="section-heading about-heading" id={id}>
      <span />
      <SplitText
        tag="h2"
        text={text}
        delay={42}
        duration={0.72}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 34 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-80px"
        textAlign="inherit"
      />
      <span />
    </div>
  );
}

export default async function AboutMePage() {
  const locale = (await getLocale()) as Locale;
  const {
    designValues,
    education,
    educatorItems,
    experiences,
    experienceYears,
    firstExperienceIndexByYear,
    headings,
    heroTitle,
    intro,
    skillCategories,
    tools,
  } = getAboutData(locale);

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
                    imageSrc="/avatar/avatar-gray-680.png"
                    hoverImageSrc="/avatar/avatar-yellow-680.png"
                    imageAlt="Brian Huang"
                  />
                </div>
              </div>

              <div className="about-intro-copy">
                <SplitText
                  id="about-title"
                  tag="h1"
                  text={heroTitle}
                  className="about-title"
                  delay={42}
                  duration={0.72}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 34 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-80px"
                  textAlign="inherit"
                />
                {intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </div>
        </GenieReveal>
      </section>

      {/* 2. Design Values */}
      <SectionHeading id="values" text={headings.values} />
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
      <SectionHeading id="experience" text={headings.experience} />
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

      {/* 4. 設計社群 */}
      <SectionHeading id="educator" text={headings.educator} />
      <EducatorMasonry items={educatorItems} />

      {/* 5. 專業技能 */}
      <SectionHeading id="skills" text={headings.skills} />
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

        <h3>{headings.tools}</h3>
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
      <SectionHeading id="education" text={headings.education} />
      <section className="education-list">
        {education.map((item, index) => (
          <AnimatedContent
            delay={index * 0.12}
            distance={120}
            duration={0.95}
            scale={0.96}
            ease="power3.out"
            threshold={0.05}
            key={item.school}
          >
            <article className="education-card">
              <Image src={item.image} alt="" width={140} height={140} />
              <div>
                <h3>{item.school}</h3>
                <p className="experience-date" style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <span>{item.date}</span>
                  {item.badge && (
                    <span className="hero-badge-shimmer-wrap" style={{ padding: "1px" }}>
                      <span className="hero-badge" style={{ padding: "4px 10px", fontSize: "12px" }}>
                        <span>{item.badge}</span>
                      </span>
                    </span>
                  )}
                </p>
                <p>{item.description}</p>
              </div>
            </article>
          </AnimatedContent>
        ))}
      </section>

      <Footer />
    </main>
  );
}
