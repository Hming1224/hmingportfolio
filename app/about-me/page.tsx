import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import YearRail from "../../components/YearRail";
import AvatarProfile from "../../components/AvatarProfile";
import AnimatedContent from "./AnimatedContent";
import EducatorMasonry from "./EducatorMasonry";

const experiences = [
  {
    year: "2024",
    title: "Advantech 研華科技",
    role: "UIUX Design Intern",
    date: "2024.06 - 2024.08",
    image: "/projects/advantech-wiseiems2.png",
    points: [
      "2.5 個月內完成 3 次設計提案，皆依時程通過利害關係人審核",
      "進行使用者訪談與痛點分析，讓 AI 功能決策能對齊真實操作需求",
      "設計並提案 Edge AI 平台的 AI Chatbot 整合方案，影響後續產品路線規劃",
      "運用內部資源製作產品介紹影片，支援業務與 go-to-market 溝通",
      "最終提案促成 2 個主要模組功能通過審核並排入工程開發",
    ],
  },
  {
    year: "2023",
    title: "Crypto-Arsenal",
    role: "UIUX & PM Intern",
    date: "2023.03 - 2023.10",
    image:
      "https://framerusercontent.com/images/dIryK4ZcMPoWUc9rlwSZzl9F88Y.jpeg",
    points: [
      "設計 RWD 網頁介面，降低交易儀表板對非技術使用者的理解門檻",
      "維護並擴充 UI Design System，確保快速成長的功能仍維持視覺一致性",
      "建立 UI/UX 團隊 SOP，標準化設計到交付流程並減少設計債",
      "導入 Scrum 儀式與共享 Dashboard，提升跨職能工程開發協作效率",
    ],
  },
  {
    year: "2022",
    title: "Taiwan Blockchain Academia",
    role: "Product Designer（合約）",
    date: "2022.11 - 2023.02",
    image:
      "https://framerusercontent.com/images/CA1UxcHBL02pPYicWXOrbAAjruA.jpg",
    points: [
      "進行使用者訪談與研究，釐清非技術使用者進入 Web3 情境時的摩擦點",
      "與 PM 和國泰金控技術團隊協調產品規格，平衡合規需求與 UX 方向",
      "產出 wireframe 與互動 prototype，透過多輪回饋進行易用性測試與迭代",
      "協作工程師將關鍵區塊鏈技術整合進使用流程，同時維持介面可理解性",
    ],
  },
  {
    year: "2021",
    title: "LCFC（聯宝電腦）",
    role: "Associate Project Manager",
    date: "2021.05 - 2021.12",
    image:
      "https://framerusercontent.com/images/2aFK7DdC44h75205XrUXIGN0s.jpeg",
    points: [
      "與跨職能開發團隊協調專案里程碑，在供應受限下確保交付時程",
      "與供應商協商供貨排程，降低零組件短缺對生產進度的影響",
      "撰寫產品規格書，協助工程需求與採購現況保持一致",
      "與工程師調整可行性測試時程，在品質標準與交期之間取得平衡",
    ],
  },
];

const skillCategories = [
  {
    title: "產品設計",
    color: "#5d62d8", // Purple
    bgColor: "rgba(93, 98, 216, 0.04)",
    borderColor: "rgba(93, 98, 216, 0.12)",
    iconId: "layout",
    skills: ["UI flow", "設計系統", "線框圖 / 原型設計", "響應式網頁設計", "基礎前端知識"]
  },
  {
    title: "使用者研究",
    color: "#4a90e2", // Blue
    bgColor: "rgba(74, 144, 226, 0.04)",
    borderColor: "rgba(74, 144, 226, 0.12)",
    iconId: "users",
    skills: ["使用者訪談", "利害關係人訪談", "競品分析", "親和圖", "使用者旅程圖", "易用性測試"]
  },
  {
    title: "AI 工具",
    color: "#e8856b", // Orange
    bgColor: "rgba(232, 133, 107, 0.04)",
    borderColor: "rgba(232, 133, 107, 0.12)",
    iconId: "cpu",
    skills: ["Claude Code", "Codex", "Figma Make", "Canva AI", "NoteBookLM"]
  },
  {
    title: "協作與管理",
    color: "#1fa37e", // Green
    bgColor: "rgba(31, 163, 126, 0.04)",
    borderColor: "rgba(31, 163, 126, 0.12)",
    iconId: "briefcase",
    skills: ["Jira / Trello", "Scrum 敏捷開發", "跨部門溝通", "專案時程控管"]
  }
];

const tools = [
  [
    "Figma",
    "https://framerusercontent.com/images/NFQE0lJpudFMnMlrxUlqwsTZobI.png",
  ],
  [
    "Canva",
    "https://framerusercontent.com/images/xViGpNQGhsx0NAPy32ilYcniF4.png",
  ],
  [
    "Framer",
    "https://framerusercontent.com/images/iGMc0V6aPbUXiqLig37GL6mpDYw.png",
  ],
  [
    "ProtoPie",
    "https://framerusercontent.com/images/qU7g8XziPvJiqL5NgCjlmuGcY.png",
  ],
  [
    "Photoshop",
    "https://framerusercontent.com/images/G2wWkpP4Un4CQNemoiK0ou60O7o.png",
  ],
  [
    "Illustrator",
    "https://framerusercontent.com/images/M0cU5uSFBQOhsa5CV9hdrPIMPY.png",
  ],
  [
    "Adobe XD",
    "https://framerusercontent.com/images/7u5X456ibsvVQsGgqzKdFJ2ukIs.png",
  ],
  [
    "After Effects",
    "https://framerusercontent.com/images/5ozjkYgaLwp6eZsoVcGOW30U1z4.png",
  ],
];

const designValues = [
  {
    iconId: "layers",
    title: "跨領域的眼界，比單一專業更能發現問題",
    desc: "機械工程的訓練讓我習慣從結構與系統出發思考，設計學習則讓我開始關注人的感受與行為。兩種視角並存，讓我更容易在別人習以為常的地方，看見值得改善的設計機會。",
  },
  {
    iconId: "search",
    title: "理解永遠優先於解法",
    desc: "我習慣在動筆之前，先花時間釐清問題真正的成因。跳過理解直接給答案，往往只是在解決表象；搞懂背後的動機與限制，設計才有機會對到真正需要改善的地方。",
  },
  {
    iconId: "zap",
    title: "好的設計讓複雜變成直覺",
    desc: "產品的邏輯可以很複雜，但使用者不應該感受到這份複雜。我把設計的成功定義為：讓人第一次使用就知道該怎麼做，不需要說明書，也不會走錯路。",
  },
];

const educatorItems = [
  {
    badge: "40+",
    title: "OpenHCI 2024 暑期工作坊",
    href: "https://www.2024.openhci.com/",
    role: "設計組組長",
    desc: "籌備營期3個月，帶領設計組共3人負責營隊教學計劃與課程內容安排，並且於營期提供 40 位學員設計思考集訓",
    date: "2024.05-2024.08",
    image: "/educator/openhci.jpg",
  },
  {
    badge: "60+",
    title: "NCCU 112-2 人機介面設計課程",
    href: null,
    role: "課程助教",
    desc: "協助 60 位大學生Figma操作教學，負責期中 / 期末評分、批改作業與專案指導",
    date: "2024.02-2024.06",
    image: "/educator/人機介面設計課程發表.jpg",
  },
  {
    badge: "20+",
    title: "NCCU 114-1 人機互動設計課程",
    href: null,
    role: "課程助教",
    desc: "指導學碩同學共20組期末專案，提供 TA office hour 諮詢與每週作業回饋",
    date: "2025.09-2026.01",
    image: "/educator/nccu-ta.jpg",
  },
  {
    badge: "16+",
    title: "Evolution 設計鬆",
    href: null,
    role: "共同籌備負責人",
    desc: "主辦 2 天 1 夜設計黑客鬆，協助指導 16 位學員專案討論，協同業界設計師共同審核專案成果",
    date: "2024.06",
    image: "/educator/hackathon.jpg",
  },
];

const experienceYears = ["2024", "2023", "2022", "2021"];

const firstExperienceIndexByYear = experiences.reduce<Record<string, number>>(
  (result, item, index) => {
    if (result[item.year] === undefined) {
      result[item.year] = index;
    }

    return result;
  },
  {},
);

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
        <AnimatedContent
          animationType="genie"
          threshold={0.05}
          delay={0.1}
          distance={120}
          duration={0.95}
          scale={0.96}
          ease="power3.out"
          className="about-window-animated-wrap"
        >
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
                  過去我參與過 B2B Edge AI 平台、量化交易產品與 Web3
                  服務設計，累積使用者研究、介面設計、prototype
                  與跨部門協作經驗。現在的我，正持續探索 AI
                  工具如何幫助設計師更有效率地釐清問題、建立
                  MVP，並推進產品驗證，朝 Product Builder 的方向前進。
                </p>
              </div>
            </div>
          </div>
        </AnimatedContent>
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
                  sizes="(max-width: 768px) calc(100vw - 48px), 269px"
                />
              </div>
              <div className="experience-copy">
                <p className="experience-year">{item.year}</p>
                <h3>{item.title}</h3>
                <p className="experience-role">{item.role}</p>
                <p className="experience-date">{item.date}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
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
                className="skill-category-card"
                style={
                  {
                    "--accent-color": category.color,
                    "--bg-color-tint": category.bgColor,
                    "--border-color-tint": category.borderColor,
                  } as React.CSSProperties
                }
              >
                <div className="skill-card-header">
                  <div
                    className="skill-card-icon"
                    style={{ color: category.color }}
                  >
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
              <p className="experience-date">2023.09 - 2026.04 GPA4.07</p>
              <p>主修使用者體驗研究、行為科學、人機互動。</p>
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
