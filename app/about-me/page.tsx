import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import YearRail from '../../components/YearRail';
import AvatarProfile from '../../components/AvatarProfile';

const portrait = 'https://framerusercontent.com/images/0jl4zXFFlLw62xerQd3MmTif4ss.jpg';

const experiences = [
  {
    year: '2023',
    title: 'NCCUSpace 政大場地管理系統',
    role: 'UX研究 兼 UI介面設計師',
    date: '2023.10 - 2023.12',
    image: 'https://framerusercontent.com/images/0cgoJIR4q6KnKA4jVklkfJh0Zv0.jpg',
    points: ['重新設計政大場地管理系統', '改善預約流程步驟', '制定新的介面設計', '強化使用流程與體驗'],
  },
  {
    year: '2023',
    title: 'Crypto Arsenal',
    role: 'UI / UX 實習生 兼 專案助理',
    date: '2023.03 - 2023.10',
    image: 'https://framerusercontent.com/images/dIryK4ZcMPoWUc9rlwSZzl9F88Y.jpeg',
    points: ['網頁介面設計與RWD', '設計系統維護與開發', '建立UIUX團隊開發SOP', '運用Scrum與Dashboard提升工程開發效率'],
  },
  {
    year: '2022',
    title: 'TBA 數位證書資訊平台',
    role: '產品設計師',
    date: '2022.10 - 2022.12',
    image: 'https://framerusercontent.com/images/CA1UxcHBL02pPYicWXOrbAAjruA.jpg',
    points: ['使用者訪談與調研', '與產品經理和國泰技術開發團隊協調產品規格與製作方向', '產出 wireframe 與 prototype 進行測試', '與工程師協作將關鍵技術整合至使用者體驗流程'],
  },
  {
    year: '2022',
    title: 'SIDD 學生日用 App / MYM 電影訂票 App',
    role: 'UI/UX 設計師',
    date: '2022.05 - 2022.07 / 2022.02 - 2022.04',
    image: 'https://framerusercontent.com/images/RHIcKlPROhV7hl6ntfV1jzb154.jpg',
    points: ['開始獨立製作完整專案', '透過線上課程強化完整產品開發概念', '注重用戶為中心的設計原則', '實施研究 > 設計 > 測試的迭代設計'],
  },
  {
    year: '2021',
    title: '香港商聯寶電腦有限公司',
    role: '助理專案管理師',
    date: '2021.05 - 2021.12',
    image: 'https://framerusercontent.com/images/2aFK7DdC44h75205XrUXIGN0s.jpeg',
    points: ['與開發團隊緊密配合，管控專案進度', '與供應商洽談供貨時程問題', '協助專案撰寫規格書', '與工程師調整產品的可行性測試時程安排'],
  },
  {
    year: '2021',
    title: '普濟燈會儀典設計',
    role: '設計研究員 兼 UI設計',
    date: '2021.02 - 2021.04',
    image: 'https://framerusercontent.com/images/EkkkWrEDlb1rXLds4qYhJdkpFI.jpg',
    points: ['設計藝術綜合實作課程期末報告', '實際進行場域訪查與訪談利害關係人', '製作網頁 mockup prototype', '提案主持人'],
  },
  {
    year: '2020',
    title: '平面設計 ＆ 動態設計',
    role: '設計學院學生',
    date: '2020.07 - 2020.12',
    image: 'https://framerusercontent.com/images/xufu1BrSW7Rv1aWirzsqlzQJUcU.png',
    points: ['於專業設計學院學習 Adobe PS / AI / AE', '開始透過 Pinterest、Behance 等網站練習美感', '透過實際製作海報和設計稿來發揮藝術創意'],
  },
  {
    year: '2018',
    title: '成大學生餐廳美食評鑑',
    role: '設計研究員 兼 提案發表人',
    date: '2018.10 - 2018.12',
    image: 'https://framerusercontent.com/images/yiyQaGyMFDFZmaNZB7bspNDsW4.jpg',
    points: ['於成大第一堂設計專案課程', '首次參與團體設計專案', '初步了解設計工具 Persona / UJM / KJ', '嘗試發表提案簡報'],
  },
];

const skills = [
  '雙鑽石設計模型',
  '設計思考',
  '使用者研究',
  '啟發式評估',
  '資訊架構',
  '質化分析',
  '競品分析',
  '人物誌',
  '心智圖',
  '親合圖',
  '頭腦風暴',
  '介面設計',
  '設計系統',
];

const tools = [
  ['Figma', 'https://framerusercontent.com/images/NFQE0lJpudFMnMlrxUlqwsTZobI.png'],
  ['Canva', 'https://framerusercontent.com/images/xViGpNQGhsx0NAPy32ilYcniF4.png'],
  ['Framer', 'https://framerusercontent.com/images/iGMc0V6aPbUXiqLig37GL6mpDYw.png'],
  ['ProtoPie', 'https://framerusercontent.com/images/qU7g8XziPvJiqL5NgCjlmuGcY.png'],
  ['Photoshop', 'https://framerusercontent.com/images/G2wWkpP4Un4CQNemoiK0ou60O7o.png'],
  ['Illustrator', 'https://framerusercontent.com/images/M0cU5uSFBQOhsa5CV9hdrPIMPY.png'],
  ['Adobe XD', 'https://framerusercontent.com/images/7u5X456ibsvVQsGgqzKdFJ2ukIs.png'],
  ['After Effects', 'https://framerusercontent.com/images/5ozjkYgaLwp6eZsoVcGOW30U1z4.png'],
];

const experienceYears = ['2023', '2022', '2021', '2020', '2018'];

const firstExperienceIndexByYear = experiences.reduce<Record<string, number>>((result, item, index) => {
  if (result[item.year] === undefined) {
    result[item.year] = index;
  }

  return result;
}, {});

function SectionHeading({ children, id }: { children: React.ReactNode; id?: string }) {
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

      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-window">
          <div className="window-bar">
            <span />
            <span />
            <span />
          </div>
          <div className="about-window-body">
            <div className="avatar-profile-wrap" aria-label="Brian Huang portrait">
              <div className="avatar-profile-stage">
                <AvatarProfile
                  imageSrc="/avatar/avatar-gray.png"
                  hoverImageSrc="/avatar/avatar-yellow.png"
                  imageAlt="Brian Huang"
                />
              </div>
            </div>

            <div className="about-intro-copy">
              <h1 id="about-title">設計是一種方法、一種態度、一種不滿足於現狀的精神</h1>
              <p>
                我是黃宣銘，目前就讀政大數位內容碩士。大三那年暑假，我不幸生重病，開刀住院半年。就此，我重新審視人生學習歷程這條路上，才意識到設計一直和我息息相關。
              </p>
              <p>
                在生大病前，從國小就展露美感、藝術天分，喜歡接觸視覺設計與繪畫；直至大病痊癒後，我重拾自己本有的人格特質，發現對美感的堅持與對設計的熱誠，其實從未改變。
              </p>
              <blockquote>
                我認為的設計是為了解決生活上的問題與人所面臨的困難，透過產品、服務和新的使用模式，提升用戶體驗。
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <SectionHeading id="growth">啟蒙與成長</SectionHeading>
      <section className="growth-grid">
        <article className="story-card blue-card">
          <div className="story-copy">
            <h3>設計啟蒙</h3>
            <p>
              在一次工廠實習課程，我負責銑床加工鋁金屬。面對複雜工具和眼花撩亂的按鈕，我意識到功能導向的機器若缺少清楚指示，對操作者其實並不友善。讀了設計心理學後，我開始對人與機器之間的互動產生更多好奇。
            </p>
          </div>
          <figure className="polaroid tilt-left">
            <Image src="https://framerusercontent.com/images/uVvLrs7LN3t6tqJWxP6w07KNtqg.png" alt="功能導向的傳統銑床機" fill sizes="220px" />
            <figcaption>功能導向的傳統銑床機</figcaption>
          </figure>
        </article>

        <article className="story-card orange-card">
          <figure className="polaroid tilt-right">
            <Image src="https://framerusercontent.com/images/XkYwdML3maep2fwdxEzBFLL5H8.png" alt="成大設計藝術綜合實作課程發表" fill sizes="220px" />
            <figcaption>成大設計藝術綜合實作課程發表</figcaption>
          </figure>
          <div className="story-copy">
            <h3>設計成長</h3>
            <p>
              大學期間我從基礎設計概論、設計思考、設計綜合實作到美學實踐，逐步打下使用者經驗與體驗設計的基本功。也利用週末自學 Adobe、Rhinoceros 3D、Solidworks、Figma、ProtoPie 與 Framer。
            </p>
          </div>
        </article>
      </section>

      <SectionHeading id="traits">人格特質</SectionHeading>
      <section className="traits-panel">
        <div className="traits-photo">
          <Image src="https://framerusercontent.com/images/lPNLR0tL3A5W7CVHifVKJxgj10s.jpg" alt="Brian Huang portrait" fill sizes="(max-width: 768px) 342px, 289px" />
        </div>
        <div className="traits-list">
          <article>
            <h3>理解需求，雙邊溝通</h3>
            <p>與不同立場的合作夥伴，我會先傾聽對方的想法，嘗試理解角度後，做出對專案最恰當的選擇。</p>
          </article>
          <article>
            <h3>富同理心，換位思考</h3>
            <p>透過研究和用戶談話，我能注意目標群眾的痛點與心聲，在兼顧商業目標的同時注入更人性化的方案。</p>
          </article>
          <article>
            <h3>目標明確，堅持到底</h3>
            <p>進行專案前，我會制定目標與計畫，將每個設計環節進行把關，堅持將專案品質做到最好。</p>
          </article>
        </div>
      </section>

      <SectionHeading id="experience">專案 / 工作經歷</SectionHeading>
      <section className="experience-layout">
        <YearRail years={experienceYears} />
        <div className="experience-list">
          {experiences.map((item, index) => (
            <article
              className="experience-card"
              data-year={item.year}
              id={firstExperienceIndexByYear[item.year] === index ? `year-${item.year}` : undefined}
              key={`${item.title}-${index}`}
            >
              <div className="experience-image">
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) calc(100vw - 48px), 269px" />
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

      <SectionHeading id="skills">專業技能</SectionHeading>
      <section className="skills-panel">
        <h3>常用工具</h3>
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

      <SectionHeading id="education">教育背景</SectionHeading>
      <section className="education-list">
        <article className="education-card">
          <Image src="https://framerusercontent.com/images/Ac7sKcF2w4TpZnOI28BGtm3h8.png" alt="" width={140} height={140} />
          <div>
            <h3>國立政治大學 數位內容碩士學位學程</h3>
            <p className="experience-date">2023.09 - 至今</p>
            <p>主修使用者體驗研究、行為科學、人機互動。</p>
          </div>
        </article>
        <article className="education-card">
          <Image src="https://framerusercontent.com/images/o53UPGa6UhydVFF9ZPVPLPqKJ20.png" alt="" width={140} height={140} />
          <div>
            <h3>國立成功大學 機械工程學系</h3>
            <p className="experience-date">2017.09 - 2021.01</p>
            <p>主修熱力學與機械設計，並以設計思維和使用者中心設計作為第二專業。</p>
          </div>
        </article>
      </section>

      <Footer />
    </main>
  );
}
