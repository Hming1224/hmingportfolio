import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import YearRail from "../../components/YearRail";
import AvatarProfile from "../../components/AvatarProfile";
import GrowthReveal from "./GrowthReveal";

const experiences = [
  {
    year: "2024",
    title: "Advantech 研華科技",
    role: "UIUX Design Intern",
    date: "2024.07 - 2024.12",
    image: "/projects/advantech-wiseiems2.png",
    points: [
      "研究工業監控系統的 UX 痛點，設計儀表板與警報管理介面",
      "建立設計規格與元件庫，與工程師協作落地實現",
      "進行易用性測試，根據用戶回饋持續迭代設計方案",
      "從 0 到 1 建構人機互動設計框架，涵蓋多種設備狀態情境",
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
      "網頁介面設計與 RWD 響應式版面建構",
      "設計系統維護與元件規格開發",
      "建立 UIUX 團隊設計開發 SOP，提升協作效率",
      "運用 Scrum 與 Dashboard 追蹤產品進度，協助 PM 管控開發節奏",
    ],
  },
  {
    year: "2022",
    title: "Taiwan Blockchain Academia",
    role: "Product Designer（合約）",
    date: "2022.07 - 2023.01",
    image:
      "https://framerusercontent.com/images/CA1UxcHBL02pPYicWXOrbAAjruA.jpg",
    points: [
      "進行使用者訪談與需求調研，釐清核心問題",
      "與 PM 和技術開發團隊協調產品規格與製作方向",
      "產出 wireframe 與 prototype 進行易用性測試",
      "協作工程師將區塊鏈憑證技術整合至使用者體驗流程",
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
      "與開發團隊緊密配合，管控多條產品線的專案進度",
      "與供應商洽談供貨時程，解決供應鏈瓶頸問題",
      "協助撰寫產品規格書，確保開發方向清晰一致",
      "協助工程師安排可行性測試時程，推進量產節點",
    ],
  },
];

const skills = [
  "Figma",
  "UX Research",
  "Product Design",
  "User Research",
  "Wireframing",
  "Prototyping",
  "Design System",
  "Human-AI Interaction",
  "Vibe Coding",
  "Scrum",
  "Mechanical Engineering",
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
    badge: "40",
    title: "OpenHCI 2024 暑期工作坊",
    href: "https://www.2024.openhci.com/",
    role: "設計組組長",
    desc: "籌備營期3個月，帶領設計組共3人負責營隊教學計劃與課程內容安排，並且於營期提供 40 位學員設計思考集訓",
    date: "2024.05-2024.08",
    image: "/educator/openhci.jpg",
  },
  {
    badge: "60+",
    title: "NCCU 人機介面設計課程",
    href: null,
    role: "課程助教",
    desc: "協助 60 位大學生Figma操作教學，負責期中 / 期末評分、批改作業與專案指導",
    date: "2024.02-2024.06",
    image: "/educator/人機介面設計課程發表.jpg",
  },
  {
    badge: "TA",
    title: "NCCU 人機互動設計課程",
    href: null,
    role: "課程助教",
    desc: "指導學碩同學的期末專案，提供 TA office hour 諮詢與每週作業回饋",
    date: "2025.09-2026.01",
    image: "/educator/nccu-ta.jpg",
  },
  {
    badge: "16",
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
              <h1 id="about-title">
                設計是一種方法、一種態度、一種不滿足於現狀的精神
              </h1>
              <p>
                我是黃宣銘，畢業於政大數位內容碩士。大三那年暑假，一場重病讓我開刀住院、休學半年。在那段沉靜的時間裡，我重新審視自己——才意識到從小展露的美感天分與對設計的熱愛，其實從未離開過我。
              </p>
              <p>
                病癒後，我帶著機械工程的系統思維，一頭栽進 UIUX
                設計與產品領域。跨領域不是妥協，而是讓我能同時問出「為什麼這樣設計？」和「這個能做到嗎？」的底氣。
              </p>
              <blockquote>
                我認為設計是為了解決生活中人所面臨的真實困難，透過產品、服務與體驗的重新塑造，讓複雜的事物變得直覺易用。
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 啟蒙與成長 */}
      <SectionHeading id="growth">啟蒙與成長</SectionHeading>
      <GrowthReveal />
      <section className="growth-grid" aria-label="設計啟蒙與成長故事">
        <article className="growth-story growth-story-blue">
          <div className="growth-cluster growth-cluster-blue">
            <div
              className="growth-sticker growth-sticker-blue"
              aria-hidden="true"
            >
              <svg viewBox="0 0 31 54" preserveAspectRatio="none">
                <path
                  d="M7.26038 0L12.8296 3.19256L19.0796 1.72707L24.6488 4.91963L30.8988 3.45415L23.6384 53.14L18.0692 49.9474L11.8193 51.4129L6.24998 48.2203L0.0000588116 49.6858L7.26038 0Z"
                  fill="#7298BB"
                  fillOpacity="0.45"
                />
              </svg>
            </div>
            <div className="growth-card growth-card-blue">
              <div className="growth-copy">
                <div className="growth-label growth-label-blue">
                  <svg
                    className="growth-mark"
                    viewBox="0 0 105 22"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 0H97L95 11L93 22H0L2 11L4 0Z"
                      fill="#7298BB"
                      fillOpacity="0.75"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 0H4L2 11L0 22H8L10 11L12 0ZM97 0L95 11L93 22H101L103 11L105 0H97Z"
                      fill="#7298BB"
                    />
                  </svg>
                  <span>設計啟蒙</span>
                </div>
                <p>
                  在一次工廠實習課程的因緣際會，當時我負責去銑床機肖鋁金屬，目標是在一定公差內才符合工具生產規範。面對複雜的銑床工具和眼花撩亂的按鈕，我當下覺得非常不好操作。儘管聽了助教的教學後有了基本認識，我依然對於上面的介面感到困惑不已。心中不禁思考著，機器為了完成精密加工很精細的作業而被設計得過度複雜，在沒有任何的指示和安全提醒對操作者來說相當不友善。讀了設計心理學這本書之後，才領悟到
                  Don Norman 所說的，
                  <strong className="growth-highlight-blue">
                    過去工程師設計機器是為了功能實現去設計，而非以人為本
                  </strong>
                  ，這次的發現讓我對人與機器之間的互動有更多的好奇，也促成我開始學習人機互動、設計思考的契機。
                </p>
              </div>

              <div className="growth-photo-stage growth-photo-stage-blue">
                <figure className="growth-polaroid growth-polaroid-blue">
                  <Image
                    className="growth-paperclip"
                    src="https://framerusercontent.com/images/BTuWzbq6DG73wivqCDD7P9iXlIo.png"
                    alt=""
                    width={28}
                    height={28}
                    sizes="28px"
                  />
                  <Image
                    src="https://framerusercontent.com/images/uVvLrs7LN3t6tqJWxP6w07KNtqg.png"
                    alt="功能導向的傳統銑床機"
                    fill
                    sizes="(max-width: 809px) 188px, 224px"
                  />
                  <figcaption>
                    功能導向的
                    <br />
                    傳統銑床機
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </article>

        <article className="growth-story growth-story-orange">
          <div className="growth-cluster growth-cluster-orange">
            <div
              className="growth-sticker growth-sticker-orange"
              aria-hidden="true"
            >
              <svg viewBox="0 0 31 54" preserveAspectRatio="none">
                <path
                  d="M7.26038 0L12.8296 3.19256L19.0796 1.72707L24.6488 4.91963L30.8988 3.45415L23.6384 53.14L18.0692 49.9474L11.8193 51.4129L6.24998 48.2203L0.0000588116 49.6858L7.26038 0Z"
                  fill="#FFB38A"
                  fillOpacity="0.7"
                />
              </svg>
            </div>
            <div className="growth-card growth-card-orange">
              <div className="growth-photo-stage growth-photo-stage-orange">
                <figure className="growth-polaroid growth-polaroid-orange">
                  <Image
                    className="growth-paperclip"
                    src="https://framerusercontent.com/images/BTuWzbq6DG73wivqCDD7P9iXlIo.png"
                    alt=""
                    width={28}
                    height={28}
                    sizes="28px"
                  />
                  <Image
                    src="https://framerusercontent.com/images/XkYwdML3maep2fwdxEzBFLL5H8.png"
                    alt="成大設計藝術綜合實作課程發表"
                    fill
                    sizes="(max-width: 809px) 186px, 224px"
                  />
                  <figcaption>
                    成大設計藝術綜
                    <br />
                    合實作課程發表
                  </figcaption>
                </figure>
              </div>

              <div className="growth-copy">
                <div className="growth-label growth-label-orange">
                  <svg
                    className="growth-mark"
                    viewBox="0 0 105 22"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 0H97L95 11L93 22H0L2 11L4 0Z"
                      fill="#6B71FF"
                      fillOpacity="0.6"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 0H4L2 11L0 22H8L10 11L12 0ZM97 0L95 11L93 22H101L103 11L105 0H97Z"
                      fill="#6B71FF"
                      fillOpacity="0.75"
                    />
                  </svg>
                  <span>設計成長</span>
                </div>
                <p>
                  大學期間，雖然努力學習基礎工程理論和力學應用，但心中始終卻住著一個設計夢，對於體驗設計和產品設計有更多的熱忱與抱負。大二下開始至規劃設計學院，學習基礎設計概論，於大三修習設計思考課程，大四透過設計綜合實作、美學實踐等課程將設計理論實際應用在專案中。
                  <strong className="growth-highlight-orange">
                    這一系列的修課計畫，一步一步的打下我在使用者經驗與體驗設計領域的紮實基本功。
                  </strong>
                </p>
                <p>
                  從 2020 年 7
                  月開始，我也透過週末的時間，額外的花費心力學習設計軟體，包含
                  Adobe Creative Suite (Photoshop / Illustrator / After Effects
                  / XD / InDesign)、設計建模軟體：Rhinoceros
                  3D、Solidworks，和介面設計軟體：Figma、ProtoPie、Framer。通過有規畫與自律的學習來養成這些技能，藉此準備好踏入設計領域所需的能力。
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* 3. Design Values */}
      <SectionHeading id="values">設計信念</SectionHeading>
      <section className="design-values-section">
        {designValues.map((value, i) => (
          <div className="design-value-card" key={i}>
            <div className="design-value-icon">
              <ValueIcon id={value.iconId} />
            </div>
            <h3>{value.title}</h3>
            <p>{value.desc}</p>
          </div>
        ))}
      </section>

      {/* 4. 工作經歷 */}
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

      {/* 5. 對設計教育的貢獻 */}
      <SectionHeading id="educator">對設計教育的貢獻</SectionHeading>
      <section className="educator-section">
        {educatorItems.map((item) => (
          <div className="educator-card" key={item.title} tabIndex={0}>
            <div className="educator-card-photo">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
            <div className="educator-card-body">
              <h3>{item.title}</h3>
              <p className="educator-role">{item.role}</p>
              <div className="educator-reveal">
                <div className="educator-reveal-inner">
                  <p>{item.desc}</p>
                  <p className="educator-date">{item.date}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 6. 個性特質 */}
      <SectionHeading id="traits">人格特質</SectionHeading>
      <section className="traits-panel">
        <div className="traits-photo">
          <Image
            src="https://framerusercontent.com/images/lPNLR0tL3A5W7CVHifVKJxgj10s.jpg"
            alt="Brian Huang portrait"
            fill
            sizes="(max-width: 768px) 342px, 289px"
          />
        </div>
        <div className="traits-list">
          <article>
            <h3>理解需求，雙邊溝通</h3>
            <p>
              與不同立場的合作夥伴，我會先傾聽對方的想法，嘗試理解角度後，做出對專案最恰當的選擇。
            </p>
          </article>
          <article>
            <h3>富同理心，換位思考</h3>
            <p>
              透過研究和用戶談話，我能注意目標群眾的痛點與心聲，在兼顧商業目標的同時注入更人性化的方案。
            </p>
          </article>
          <article>
            <h3>目標明確，堅持到底</h3>
            <p>
              進行專案前，我會制定目標與計畫，將每個設計環節進行把關，堅持將專案品質做到最好。
            </p>
          </article>
        </div>
      </section>

      {/* 7. 專業技能 */}
      <SectionHeading id="skills">專業技能</SectionHeading>
      <section className="skills-panel">
        <h3>設計能力與方法</h3>
        <div className="skill-tags">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
        <h3>擅長軟體</h3>
        <div className="tool-grid">
          {tools.map(([name, icon]) => (
            <div className="tool-item" key={name}>
              <Image src={icon} alt="" width={80} height={80} sizes="80px" />
              <p>{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. 教育背景 */}
      <SectionHeading id="education">教育背景</SectionHeading>
      <section className="education-list">
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
      </section>

      <Footer />
    </main>
  );
}
