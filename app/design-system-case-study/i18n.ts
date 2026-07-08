import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import type { Locale } from "../../i18n/routing";

const en = {
  "時間": "Timeline",
  "角色": "Role",
  "負責項目": "Responsibilities",
  "產出": "Outputs",
  "研究整理": "Research synthesis",
  "系統規劃": "System planning",
  "元件盤點": "Component audit",
  "AI 協作流程設計": "AI collaboration workflow design",
  "前端實作驗證": "Frontend implementation validation",
  "Markdown 規格文件": "Markdown specification docs",
  "共用 case-study components": "Shared case-study components",
  "為什麼要建 Design System": "Why Build a Design System",
  "起點": "Starting Point",
  "三次轉折": "Three Turning Points",
  "決策框架": "Decision Framework",
  "演化實例 A": "Evolution A",
  "演化實例 B": "Evolution B",
  "演化實例 C": "Evolution C",
  "Governance 與 AI 協作": "Governance and AI Collaboration",
  "把自己的作品集當產品做：一套邊用邊長出來的 Design System": "Treating My Portfolio as a Product: A Design System That Grew Through Iteration",
  "我在製作作品集網站期間，把網站本身當成產品管理，建立 design system、元件規則與 AI-assisted workflow。": "While building my portfolio site, I treated the site itself as a product and built a design system, component rules, and an AI-assisted workflow.",
  "這是我在製作作品集網站期間，自發啟動的 side project。我把網站本身當成產品管理，逐步建立 design tokens、元件契約和 AI-assisted workflow。這一頁記錄的不是一次規劃到位的成果，而是我在重複樣式、元件邊界和 AI 協作風險逐漸出現後，怎麼把問題整理成可維護、可驗證、可回溯的工作流程。": "This was a self-initiated side project that started while I was building my portfolio site. I treated the site itself as a product and gradually built design tokens, component contracts, and an AI-assisted workflow. This page does not present a perfectly planned result; it documents how repeated styling, unclear component boundaries, and AI-collaboration risks turned into a maintainable, verifiable, and traceable workflow.",
  "返回首頁": "Back to Home",
  "下一個專案": "Next Project",
  "：": ": ",
  "下一個專案：勞務報酬系統數位流程優化": "Next Project: Contractor Payment System UX Optimization",

  "為什麼要幫自己的作品集建 Design System？": "Why Build a Design System for My Own Portfolio?",
  "網站不是沒有設計，只是設計散落在每一頁，沒有集中管理的地方。": "The site was not undesigned; its design decisions were scattered across pages without a shared place to manage them.",
  "作品集網站是用「先把畫面做出來」的方式快速成形的——這個起點沒有錯，它讓內容先能展示。但隨著頁面越改越多，三個問題越來越明顯：": "The portfolio first took shape by getting screens working quickly. That was not wrong: it helped the content become visible. But as more pages changed, three problems became harder to ignore:",
  "頁面迭代太頻繁": "Pages Iterated Too Often",
  "同一種「前後對比」版型，在不同案例頁各自實作；顏色、間距也散落在各頁 CSS 裡。當網站越來越大，任何微調都可能變成重複修改。": "The same before/after pattern was implemented separately across case-study pages, while colors and spacing lived in page-level CSS. As the site grew, every small adjustment risked becoming repeated work.",
  "AI 協作需要明確邊界": "AI Collaboration Needed Clear Boundaries",
  "我會使用 AI 協助盤點、實作與檢查，但如果沒有共同規範，每次修改都可能採用不同寫法。AI 要能穩定協作，前提是規則、權限和驗證方式都被寫清楚。": "I used AI to help audit, implement, and check work. Without shared rules, each change could follow a different pattern. For AI collaboration to stay stable, rules, permissions, and validation methods needed to be explicit.",
  "把理解落到真實作品裡": "Putting the Understanding Into a Real Product",
  "與其停留在「知道 design system」的理解，我更想用自己的作品集實際做一次：從規則建立、元件盤點到長期維護，把整個過程走一遍、也記錄下來。": "Instead of only knowing what a design system is, I wanted to build one inside my own portfolio: defining rules, auditing components, and documenting the maintenance workflow.",
  "把「規則」從人的腦中搬出來，變成 code 和文件都讀得到的單一來源（single source of truth）。": "Move rules out of memory and into a single source of truth that both code and documentation can read.",
  "名詞註釋": "Terms",
  "專有名詞註釋": "Term notes",
  "這裡指一套管理介面規則的方法，包含設計變數、元件使用方式、內容版型和維護流程。": "Here, it means a way to manage interface rules, including design variables, component usage, content patterns, and maintenance workflow.",
  "指團隊判斷時只依賴同一個可信來源，避免文件、設計稿和實作各說各話。": "A trusted reference used for decisions, so documentation, design files, and implementation do not tell different stories.",

  "起點：參考成熟系統，用 Figma Make 做第一版": "Starting Point: Referencing Mature Systems and Prototyping with Figma Make",
  "不從零發明，先看成熟系統如何整理規則、元件與文件。": "Rather than inventing from scratch, I first studied how mature systems organize rules, components, and documentation.",
  "我拿 ": "I used ",
  " 和 ": " and ",
  " 當基準，逐項對照自己的網站做 ": " as references and ran a ",
  "：顏色有沒有分層？間距、圓角、字級有沒有規則？元件狀態（hover / focus / disabled）齊不齊？盤點下來列出了十幾個缺口。": ": Are colors layered? Are spacing, radius, and typography governed by rules? Are component states such as hover, focus, and disabled consistent? The audit surfaced more than ten gaps.",
  "接著用 ": "Then I used ",
  " 把第一版系統規劃做成互動雛形——包含系統介紹、缺口清單和升級計畫三個頁面。這一步幫我把腦中模糊的「想要一套系統」變成看得見、可以討論的東西。": " to turn the first system plan into an interactive prototype with three pages: system overview, gap list, and upgrade plan. This made the vague idea of wanting a system visible and discussable.",
  "但這裡也埋下了第一個伏筆：": "But this also revealed the first issue: ",
  "規劃是規劃，code 是 code。雛形畫得再完整，不等於網站真的照它運作。": "a plan is a plan, and code is code. A complete prototype does not mean the live site actually follows it.",
  "Figma Make 第一版互動雛形：先把 design system 的方向變成可以討論的介面。": "The first Figma Make prototype turned the design-system direction into an interface that could be discussed.",
  "Gap analysis 是把現況和目標標準放在一起比對，找出缺口和優先改善項目。": "Gap analysis compares the current state against a target standard to identify gaps and priorities.",
  "Figma Make 是用來快速產生互動雛形的工具，這裡用來把系統規劃先做成可討論的介面。": "Figma Make is a tool for quickly generating interactive prototypes. Here, it helped turn the system plan into something concrete enough to discuss.",

  "三次轉折：這個專案學到最多的三段": "Three Turning Points: Where the Project Taught Me the Most",
  "這套系統很難說是一次「建」好的，比較像是一路修出來的——每次轉折，都讓我放掉一個原本以為理所當然的假設。": "This system was not built in one clean pass. It was shaped through fixes. Each turning point forced me to let go of an assumption I had taken for granted.",
  "轉折一：設計文件和實際 code 脫節": "Turning Point 1: Design Docs Drifted Away From Real Code",
  "第一版規劃整理成了設計文件，但實際網站裡仍有許多寫死的顏色、間距和每頁各自的 CSS 解法。文件描述的是理想狀態，卻沒有同步反映 production code 的真實狀況。": "The first plan became design documentation, but the real site still contained hard-coded colors, spacing, and page-specific CSS. The documentation described an ideal state, not the actual production code.",
  "後來我把 production code 視為 source of truth：先盤點實際狀態，再更新文件和規則。": "I later treated production code as the source of truth: audit the real state first, then update documentation and rules.",
  "轉折二：沒有先 audit 的大範圍修改，造成視覺回歸": "Turning Point 2: Large Changes Without an Audit Caused Visual Regression",
  "早期我曾讓 AI 依照完整計劃一次處理多個案例頁，結果把原本屬於單頁敘事的版型過早推進共用層，造成邊框疊加、間距跑掉和手機版水平溢出。": "Early on, I asked AI to apply a broad plan across several case-study pages at once. Some page-specific narrative layouts were moved into shared layers too early, causing stacked borders, broken spacing, and mobile horizontal overflow.",
  "這次學到的是：不管誰來執行，動手前都要先釐清影響範圍和層級。": "The lesson was simple: whoever executes the change, the impact area and ownership layer must be clear before implementation.",
  "轉折三：把風險整理成可重複的流程": "Turning Point 3: Turning Risk Into a Repeatable Workflow",
  "後來我把 AI 協作拆成診斷、實作、驗證和回歸檢查的分段流程。AI 仍然可以協助執行，但每一步都有明確邊界、驗證條件和可回溯的 checkpoint。": "I later split AI collaboration into audit, implementation, validation, and regression checks. AI can still help execute, but every step has boundaries, validation criteria, and a traceable checkpoint.",
  "audit → implementation → validation → smoke → commit → push。": "audit → implementation → validation → smoke → commit → push.",
  "我設計這套 AI-assisted workflow，是為了讓 AI 協作可以被管理、驗證與回溯。": "I designed this AI-assisted workflow so AI collaboration could be managed, validated, and traced. ",
  "先診斷，再小範圍改動；每一步都驗證，最後才建立可回溯的 checkpoint。": "Diagnose first, make small scoped changes, validate every step, and only then create a traceable checkpoint.",
  "先盤點現況與風險，確認這次要改的是樣式、元件、內容，還是頁面結構。": "Audit the current state and risks first, then confirm whether the change belongs to styling, components, content, or page structure.",
  "一次只修改一個明確範圍，避免把太多問題混在同一批改動裡。": "Change one clear scope at a time so layout, tokens, component APIs, and copy do not get mixed into one batch.",
  "用 lint、token 檢查與 build 確認基礎品質。": "Run lint, token checks, and build to verify baseline quality.",
  "在主要頁面與斷點快速檢查畫面、互動與 console，確認沒有明顯回歸。": "Quickly check key pages and breakpoints for visual, interaction, and console regressions.",
  "驗證通過後才建立 checkpoint，讓每次改動都可以被追蹤。": "Create a checkpoint only after validation passes, so every change can be traced.",
  "先推到 feature branch，經過 preview 與人工確認後再合併到 main。": "Push to a feature branch first, then merge to main only after preview and manual review.",
  "Regression 指修改後意外破壞原本正常的畫面或互動。": "Regression means a change accidentally breaks a previously working layout or interaction.",
  "Smoke testing 是快速檢查主要頁面、斷點與互動是否仍正常，用來及早發現明顯問題。": "Smoke testing is a quick check of key pages, breakpoints, and interactions to catch obvious issues early.",
  "Rollback 是在改動出問題時，能回到上一個穩定版本。": "Rollback means returning to the previous stable version when a change causes problems.",
  "這裡指最終判斷以實際上線程式碼為準，而不是只看文件或設計稿。": "Here, it means final decisions are based on the live implementation, not only docs or design files.",

  "決策框架：什麼該抽象、什麼不該": "Decision Framework: What to Abstract and What to Leave Local",
  "轉折二踩過的坑，後來被我整理成一條判斷路徑：不是所有長得像的東西都該共用。": "The second turning point became a decision path: not everything that looks similar should become shared.",
  "看到的訊號": "Signal",
  "對應做法": "Response",
  "通用說法": "Shared term",
  "顏色、間距、字級等值反覆出現": "Color, spacing, type, or other values repeat",
  "先收斂成 design token，讓不同頁面共用同一組基礎規則，而不是急著抽 component。": "Consolidate them into design tokens first so pages share the same base rules before extracting components.",
  "外框和排列方式重複，但內容每次不同": "Frames and layout repeat, but content changes each time",
  "只抽出穩定的外框，把內容區塊留給各頁替換，讓一致性和敘事彈性同時存在。": "Extract the stable frame and leave content slots open so consistency and narrative flexibility can coexist.",
  "兩個元件長得像，但用途容易混淆": "Two elements look similar, but their purposes are easy to confuse",
  "先寫清楚各自適合承載什麼內容、有哪些狀態、什麼情境下不該使用。": "Define what each element is for, what states it supports, and when it should not be used.",
  "同樣結構和行為穩定重複出現": "The same structure and behavior repeat reliably",
  "等使用場景足夠明確，再抽成共用元件，避免太早把例外綁進核心 API。": "Extract a shared component only after the use case is clear enough, so exceptions do not get baked into the core API too early.",
  "只服務某一頁的特定敘事": "It only serves one page's specific narrative",
  "刻意留在頁面本地，讓它貼近內容，不為了表面統一而增加共用層負擔。": "Keep it local so it stays close to the content, instead of adding shared-layer weight for superficial consistency.",
  "重複的是「值」就 token 化；重複的是「殼」就留 slot；重複的是「整件事」才做成共用元件；只出現一次的，讓它留在原地。": "If the value repeats, tokenize it. If the frame repeats, keep slots open. If the whole behavior repeats, make it a shared component. If it appears once, leave it where it is.",
  "Design tokens 是把顏色、字級、間距等設計決策集中管理的變數，讓不同頁面能維持一致。": "Design tokens centralize design decisions such as color, type, and spacing so pages can stay consistent.",
  "Component contract 指的是元件的使用規則，例如它適合承載什麼內容、有哪些狀態、什麼情境下不該使用。": "A component contract defines how a component should be used: what content it supports, what states it has, and when it should not be used.",
  "Slot-based composition 是讓元件保留固定結構，但開放部分內容區塊被替換，兼顧一致性與彈性。": "Slot-based composition keeps a stable structure while allowing parts of the content to be replaced, balancing consistency and flexibility.",
  "Rule of three 是一個實務判斷原則：同樣結構真的重複出現多次後，再考慮抽象成共用元件。": "Rule of three is a practical heuristic: consider abstraction only after the same structure truly repeats multiple times.",

  "演化實例 A：Before / After 版型的三段抽象": "Evolution A: Abstracting the Before / After Pattern in Three Steps",
  "同一個版型寫了三次之後，才動手抽象——而且分三步走，不是一次到位。": "I only abstracted the pattern after it appeared across three pages, and I did it in steps rather than all at once.",
  "各自實作": "Local Implementations",
  "不同案例頁各自實作類似的 Before / After 版型，視覺相近但 code 完全獨立。這時如果直接抽共用，只會把還沒穩定的差異綁在一起。": "Different case-study pages implemented similar before/after layouts independently. They looked alike, but their code was separate. Extracting too early would have tied together unstable differences.",
  "先 audit，再抽出敘事外框": "Audit First, Then Extract the Narrative Frame",
  "盤點後確認，真正重複的是版面配置與 RWD 行為，不是內容本身。所以我抽出 slot-based 的敘事外框，讓各頁保留自己的文案、圖片和說明節奏。": "The audit showed that layout and responsive behavior repeated, not the content itself. I extracted a slot-based narrative frame so each page could keep its own copy, images, and pacing.",
  "再拆出視覺外殼": "Then Extract the Visual Shell",
  "第二步才把「有標籤的面板」拆成更底層的視覺外殼，並保留既有樣式掛鉤，讓已上線頁面可以在不改變畫面的情況下遷移。": "Only after that did I extract the labeled panel into a lower-level visual shell, preserving existing style hooks so live pages could migrate without visual changes.",
  "Before / After pattern 從三頁各自實作，演化成 slot-based narrative frame。": "The before/after pattern evolved from three local implementations into a slot-based narrative frame.",
  "這裡指固定版面結構、開放內容替換的敘事外框，讓不同案例能共用排列方式但保留自己的內容。": "Here, it means a narrative frame with a stable layout and replaceable content slots, allowing different case studies to share structure while keeping their own content.",
  "Local implementation 是先在單一頁面完成實作，等模式穩定後再評估是否抽到共用層。": "Local implementation means finishing the pattern in one page first, then evaluating whether it should move into the shared layer after the pattern stabilizes.",

  "演化實例 B：知道何時「不要」抽象": "Evolution B: Knowing When Not to Abstract",
  "我後來的理解是：系統不一定要什麼都共用，但每個「刻意不共用」的地方，最好都講得出理由。": "My later understanding was that a system does not need to share everything. But every intentional local decision should have a reason.",
  "有了共用元件之後，最大的誘惑是把所有長得像的東西都塞進去。為了避免過早抽象，每次想共用之前，我都會先把「誘惑、判斷、決定」寫下來：": "Once shared components exist, the biggest temptation is to put every similar-looking thing into them. To avoid premature abstraction, I wrote down the temptation, judgment, and decision before sharing anything.",
  "各案例頁的反思卡片": "Reflection Cards Across Case Studies",
  "三個案例頁都有反思卡片，結構相似，看起來是現成的共用候選。": "Three case-study pages had reflection cards with similar structures, so they looked like obvious candidates for sharing.",
  "有些反思卡片的背景、標號和排列方式其實是那一頁的敘事識別；硬統一會讓不同案例的語氣被磨平。": "Some reflection-card backgrounds, numbers, and layouts were part of each page's narrative identity. Forcing them into one component would flatten the tone of each case.",
  "共用層停在底層的卡片外殼、Grid 和 tokens，版型各自保留。": "The shared layer stops at base card shells, grids, and tokens; page-specific layouts stay local.",
  "Advantech 的多重對比版面": "Advantech's Multi-Comparison Layout",
  "已經有共用的 Before / After 外框了，把這兩塊也塞進去，就「全站統一」了。": "A shared before/after frame already existed, so it was tempting to put these layouts into it for site-wide consistency.",
  "既有共用外框的契約是「一個外框、一組對比」；這類版面是多組對比同框，語意不同。硬塞進去，元件會為了遷就例外長出太多開關。": "The existing shared frame's contract was one frame, one comparison. These layouts put multiple comparisons in one frame, so the semantics were different. Forcing them in would add too many exception switches.",
  "刻意保留在頁面本地；等真的出現第二個多重對比場景，再設計新的契約。": "Keep it local for now; design a new contract only when a second multi-comparison scenario appears.",
  "通用 Tag、表格外框、影片燈箱": "Generic Tags, Table Frames, and Video Lightboxes",
  "「以後一定用得到」，先做起來放著。": "Build them now because they will probably be useful later.",
  "都還沒有足夠穩定的使用場景。需求出現之前抽的元件多半是在猜，而猜錯的抽象比重複的 code 更難維護。": "None of them had stable enough use cases yet. Components extracted before real demand are mostly guesses, and a wrong abstraction is harder to maintain than repeated code.",
  "行為先寫進文件、元件緩建；等 rule of three 條件成立再重啟評估。": "Document the behavior first and defer the component. Revisit it when the rule-of-three condition is met.",
  "誘惑": "Temptation",
  "判斷": "Judgment",
  "決定": "Decision",
  "印象最深的一次：我曾一口氣盤點 8 個「看起來可以抽」的 pattern，": "The clearest moment was when I audited eight patterns that looked extractable, ",
  "結論是一個都不抽": "and the decision was to extract none of them",
  "。那次盤點沒有產出任何新元件，留下的是 8 條寫進治理文件的「為什麼不抽」。對我來說，把不做的理由寫清楚，跟多做幾個元件一樣重要。": ". That audit produced no new components. Instead, it produced eight documented reasons not to abstract. Writing down why not to build something became as important as building more components.",
  "抽象是有成本的。每多一個共用元件，就多一份契約要維護、多一群頁面被綁在一起。": "Abstraction has a cost. Every new shared component adds a contract to maintain and ties more pages together.",
  "Local component 是只服務單一頁面或單一敘事情境的元件，不一定要抽成全站共用。": "A local component serves a single page or narrative context and does not always need to become site-wide shared code.",
  "Component abstraction 是把重複的結構整理成共用元件，但它同時會增加使用規則和維護成本。": "Component abstraction turns repeated structure into shared components, but it also adds usage rules and maintenance cost.",

  "演化實例 C：語意分不清時，先拆文件、不拆 code": "Evolution C: When Semantics Are Unclear, Split the Docs Before the Code",
  "不是每個問題都要用「改 code」來解決。": "Not every problem needs to be solved by changing code.",
  "整理全站按鈕時，我卡在一個看起來很小的問題：": "While organizing buttons across the site, I got stuck on a small but important question:",
  "「View case study」長得像按鈕，那它是 Button 嗎？": "\"View case study\" looks like a button. Is it actually a Button?",
  "全站有十幾個這種「像按鈕的東西」，不先分類清楚，之後 token 化和抽元件都會踩空。查證 W3C 與 Material Design 的相關定義後，我把它們拆成四個概念：": "There were more than ten of these button-like elements across the site. Without classifying them first, tokenization and component extraction would be shaky. After checking W3C and Material Design definitions, I separated them into four concepts:",
  "概念": "Concept",
  "是什麼": "Meaning",
  "例子": "Examples",
  "在當下情境執行操作（command action）": "Executes an action in the current context",
  "送出表單、複製 email、打開 lightbox": "Submit a form, copy an email, open a lightbox",
  "帶使用者前往目的地（navigation action）": "Takes users to a destination",
  "去案例頁、回首頁、開外部 prototype": "Open a case study, go home, open an external prototype",
  "語意是 Link、視覺長得像 Button": "Semantically a Link, visually styled like a Button",
  "不是元件，是這一顆在畫面上的「角色」（usage role）": "Not a component; a usage role in a specific layout",
  "Hero 主按鈕、卡片的 Learn More": "Hero primary action, Learn More in a card",
  "為什麼要分這麼細？因為使用者對兩者的預期不同：link 可以右鍵開新分頁、複製網址；button 是觸發一個當下的操作。Screen reader 也會把兩者報讀成不同角色——語意用錯，輔助科技的使用者會對點擊結果有錯誤期待。": "Why separate them this carefully? Users expect different behaviors. A link can open in a new tab or have its URL copied; a button triggers an immediate action. Screen readers also announce them as different roles. If the semantics are wrong, assistive-technology users may expect the wrong result.",
  "最後的決策是": "The final decision was ",
  "「文件拆、code 不拆」": "split the documentation, not the code",
  "：在規格文件裡把 Button 和 LinkButton 的 contract 分開寫清楚；code 維持同一個 Button 元件（有 href 就 render 成連結）。因為現階段把 code 拆成兩個元件，只會製造一波 import 搬移和 regression 風險——語意的問題，用文件就能解決，就不要動 code。": ": define the Button and LinkButton contracts separately in the docs, while keeping one Button implementation that renders as a link when href is provided. Splitting the code now would only create import churn and regression risk. If the semantic issue can be solved in documentation, the code does not need to move.",
  "這正是決策框架第三列「用途易混淆 → Component Contract」的實際案例：抽象不是只有「抽元件」一種形式，把契約寫清楚，本身就是一種系統化。": "This is the decision-framework row \"confusing purpose → component contract\" in practice. Abstraction is not only about extracting components; writing the contract clearly is also system work.",
  "LinkButton 是語意上帶使用者前往另一個位置、視覺上看起來像按鈕的連結。": "A LinkButton is a link that takes users somewhere else while visually looking like a button.",
  "Screen reader 是協助視障使用者讀取畫面內容的輔助科技，會依照 HTML 語意報讀不同角色。": "A screen reader is assistive technology that reads screen content and announces different roles based on HTML semantics.",

  "Governance 與 AI 協作：讓流程可管理、可驗證": "Governance and AI Collaboration: Making the Workflow Manageable and Verifiable",
  "規範如果只存在人腦裡，就很難被穩定執行。": "Rules are hard to execute consistently if they only live in someone's head.",
  "這套系統和一般做法比較不一樣的地方，是我把 AI 也當成需要被管理的協作者。相關規則最後整理成兩層文件，加上一份決策紀錄：": "What made this system different was that I treated AI as a collaborator that also needed governance. The rules were organized into two layers of documentation plus a decision log:",
  "文件層——把規則寫成可執行的邊界": "Documentation Layer: Turning Rules Into Executable Boundaries",
  "10 份規格文件整理了 tokens、components、patterns、accessibility 與 governance。元件的職責邊界用 component contract 寫清楚：適合承載什麼內容、哪些行為不保證、遇到不明確情境時必須停下來確認。": "Ten specification documents organize tokens, components, patterns, accessibility, and governance. Component responsibilities are written as contracts: what content they support, what behavior is not guaranteed, and when ambiguous cases should stop for confirmation.",
  "流程層——每張工單都有權限邊界": "Workflow Layer: Every Task Has Permission Boundaries",
  "AI-assisted implementation 一律走分段權限，每張任務都寫清楚「這一段只能做什麼、禁止做什麼」：audit 只看不改；implementation 不負責 commit；commit 只提交指定檔案；驗證通過後才 push。這樣可以避免修改範圍在過程中失控。": "AI-assisted implementation follows staged permissions. Each task states what it can and cannot do: audit reads without changing; implementation does not commit; commits include only specified files; push happens only after validation passes. This keeps scope from drifting during execution.",
  "決策紀錄——做過的取捨，寫下來就不用重複討論": "Decision Log: Write Down Tradeoffs So They Do Not Need to Be Re-Litigated",
  "所有標準化決策逐項整理後寫進治理文件，變成查得到的紀錄。摘幾條實際的：": "Standardization decisions are written into governance docs as searchable records. A few examples:",
  "專案標籤圓角固定 4px——不再每頁各自發揮。": "Project tag radius is fixed at 4px instead of being redefined page by page.",
  "一個畫面原則上只放一顆 primary CTA——是 guideline 不是硬規則，但偏離要有理由。": "A screen should generally have only one primary CTA. It is a guideline, not a hard rule, but deviations need a reason.",
  "Dark mode：token 先備好、公開切換先不開——場景不足前，不增加維護面。": "Dark mode: prepare the tokens first, but do not expose the toggle until the use case is strong enough.",
  "StatusBadge 這類「還沒有真實使用場景」的元件，一律緩建。": "Components such as StatusBadge are deferred until a real use case exists.",
  "未上線的案子用 disabled 底色呈現，不做假連結騙點擊。": "Unpublished projects use a disabled visual state instead of fake clickable links.",
  "文件目錄只列 production 真的在用的元件——文件站上線後，把 30 個項目全數稽核過一輪，確認每一項都對得上實際頁面。": "The documentation catalog only lists components actually used in production. After the docs page launched, all 30 entries were audited against real pages.",
  "文件站本身也吃同一套規則：讀者看的內容和維護用的規則分開寫，文件也走一樣的 audit → 修正 → 驗收流程。": "The documentation site follows the same rules: reader-facing content and maintenance rules are separated, and docs changes go through audit → fix → validation.",
  "把規則寫下來之後，每一次協作都不用重新解釋一遍脈絡——這是這些文件帶給我最實際的好處。": "Once rules were written down, each collaboration no longer needed the whole context explained from scratch. That was the most practical benefit of the documentation.",
  "這裡指由我設定目標、邊界和驗證條件，再讓 AI 協助盤點或執行部分任務的工作流程。": "Here, it means a workflow where I set the goal, boundaries, and validation conditions before AI assists with auditing or implementation.",
  "Feature branch 是先把改動放在獨立分支驗證，避免直接影響正式站的版本。": "A feature branch keeps changes isolated for validation before they affect the production site.",
  "Preview 是合併到正式版本前的預覽環境，用來做最後的畫面和流程確認。": "Preview is a staging environment for final visual and flow checks before merging into production.",

  "產出與防護網": "Outputs and Guardrails",
  "系統建好只是開始，更重要的是它能不能防止之後慢慢走樣。先看幾個數字：": "Building the system was only the start. The more important question was whether it could prevent the site from drifting again. A few numbers first:",
  "以 styles/tokens.css 為 source of truth，目前掃到 268 個唯一 CSS custom properties，集中管理顏色、字級、間距、圓角、陰影與 motion。": "Using styles/tokens.css as the source of truth, I counted 268 unique CSS custom properties managing color, type, spacing, radius, shadow, and motion.",
  "共用 case-study 元件": "Shared case-study components",
  "CaseStudyShell、Section、Card、Grid、Media、Before / After 等 19 個共用元件，支撐 4 個案例頁的主要敘事結構。": "Nineteen shared components, including CaseStudyShell, Section, Card, Grid, Media, and Before / After, support the main narrative structure across four case-study pages.",
  "核心規格文件": "Core specification docs",
  "docs/design-system/00–09 收斂成 10 份核心文件，涵蓋 foundations、tokens、components、patterns、governance 與 workflow。": "docs/design-system/00–09 were consolidated into 10 core docs covering foundations, tokens, components, patterns, governance, and workflow.",
  "核心圓角 token": "Core radius tokens",
  "目前 production token 層以 sm / md / lg / pill / button 作為主要圓角尺度，讓新元件優先吃同一組規則。": "The production token layer uses sm / md / lg / pill / button as the main radius scale so new components inherit the same rules first.",
  "duration、easing、transition 相關 token 集中在 tokens.css；route-specific 動畫可以保留，但共用節奏先回到同一層管理。": "Duration, easing, and transition tokens are centralized in tokens.css. Route-specific motion can stay local, but shared rhythm is governed from one layer.",
  "check-design-tokens、check-links 與 architecture audit 負責檢查 token、素材連結和樣式 ownership，讓規則不是只靠人工記得。": "check-design-tokens, check-links, and architecture audit check tokens, asset links, and style ownership so rules do not rely only on memory.",
  "再看防護網——規則被打破時，讓工具先發現，不用只靠人工檢查：": "Then the guardrails: when rules break, tools should catch them before manual review has to.",
  "檢查是否又出現寫死的顏色值，避免設計規則在日常修改中慢慢流失。": "Checks whether hard-coded colors reappear so design rules do not erode through everyday edits.",
  "確認頁面引用的圖片和媒體都真的存在，避免作品集上線後出現失效素材。": "Verifies that referenced images and media exist so the portfolio does not ship broken assets.",
  "檢查案例頁樣式是否維持在自己的範圍內，避免單頁調整影響到其他作品。": "Checks whether case-study styles stay within their intended scope so one page does not accidentally affect another.",
  "Validation script 是自動檢查規則是否被破壞的小工具，例如檢查 token 使用、素材連結或架構邊界。": "A validation script is a small automated check for broken rules, such as token usage, asset links, or architecture boundaries.",
  "Architecture audit 是檢查檔案和樣式是否仍符合約定，避免單頁修改慢慢影響到全站。": "Architecture audit checks whether files and styles still follow the agreed ownership boundaries, preventing page-level changes from leaking into the whole site.",

  "學到什麼": "What I Learned",
  "回頭看，這個專案讓我收穫最多的，是那三次轉折的過程，而不只是最後的系統。": "Looking back, the most valuable part of this project was not only the final system, but the three turning points that shaped it.",
  "先診斷，再動手，比一次規劃到位更重要": "Diagnosing Before Building Matters More Than Planning Everything Upfront",
  "第一版雛形和完整計劃書都無法保證執行安全。真正讓專案穩定下來的，是把「診斷」和「動手」拆開：先 audit，再 implementation。順序比計劃書的厚度更重要。": "Neither a first prototype nor a complete plan guarantees safe execution. What stabilized the project was separating diagnosis from implementation: audit first, then implement. The order mattered more than the size of the plan.",
  "AI 協作的重點是邊界和驗證": "AI Collaboration Is About Boundaries and Validation",
  "這次經驗沒有讓我少用 AI，而是讓我更清楚地把 AI 放在可管理的流程裡。AI 可以協助盤點和執行，但任務邊界、驗證條件和 rollback 節點必須由我先設計好。": "This experience did not make me use AI less. It made me place AI inside a more manageable workflow. AI can help audit and execute, but task boundaries, validation criteria, and rollback points must be designed first.",
  "語彙要能被共同理解": "Vocabulary Needs to Be Shared",
  "我一開始自己發明了幾個詞（例如把外框元件叫 shell），後來逐一查證，改成設計與工程更常使用的說法。自創詞只有自己懂；改用大家共同的語彙，才能和工程師順利討論。": "At first I invented a few terms myself, such as calling a frame component a shell. I later checked and replaced them with terms designers and engineers use more commonly. Private vocabulary only helps me; shared vocabulary supports collaboration.",
  "把「搞懂」寫下來，才算真的懂": "Writing It Down Is How I Know I Understand It",
  "每釐清一個概念——token 和 alias 差在哪、Button 和 LinkButton 為什麼要分——我都整理成規格或筆記。寫不出來，通常代表自己還沒有真的想清楚。": "Every time I clarified a concept, such as the difference between token and alias or why Button and LinkButton need separate contracts, I turned it into a spec or note. If I could not write it down, I usually had not really understood it yet.",
  "查看實作後的 Design System 文件": "View the Implemented Design System Documentation",
  "這套規則最後整理成可瀏覽的文件頁，包含 tokens、components、patterns 與 governance。": "These rules were later organized into browsable documentation covering tokens, components, patterns, and governance.",
  "前往 Design System": "Go to Design System",
} as const;

type DsKey = keyof typeof en;

export function translateDs(locale: Locale, text: string) {
  return locale === "en" ? en[text as DsKey] ?? text : text;
}

export function translateDsData<T>(locale: Locale, value: T): T {
  if (typeof value === "string") return translateDs(locale, value) as T;
  if (Array.isArray(value)) {
    const translateItem = (item: unknown) => translateDsData(locale, item);
    return (value.some(isValidElement)
      ? Children.map(value, translateItem)
      : value.map(translateItem)) as T;
  }
  if (isValidElement(value)) return localizeDsTree(locale, value) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, translateDsData(locale, item)]),
    ) as T;
  }
  return value;
}

export function localizeDsTree(locale: Locale, node: ReactNode): ReactNode {
  if (typeof node === "string") return translateDs(locale, node);
  if (Array.isArray(node)) {
    return Children.map(node, (item) => localizeDsTree(locale, item));
  }
  if (!isValidElement(node)) return node;

  const element = node as ReactElement<Record<string, unknown>>;
  const { children, ...restProps } = element.props;
  const props = translateDsData(locale, restProps);
  const localizedChildren = Children.map(children as ReactNode, (child) =>
    localizeDsTree(locale, child),
  );
  return cloneElement(element, props, localizedChildren);
}
