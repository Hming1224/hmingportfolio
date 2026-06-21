import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import type { Locale } from "../../i18n/routing";

/* NCCUSpace 案例頁 zh-TW → en 對照。
   找不到對應 key 時回傳原文（與 laushu / advantech 同策略），方便分批補英文。 */
const en = {
  // ── TOC / nav ──
  "專案總覽": "Overview",
  "問題定義": "Problem",
  "了解預約行為": "Understand Behavior",
  "資訊架構設計": "Information Architecture",
  "介面流程": "Interface Flow",
  "品牌形象": "Brand",
  "最終 UI 成果": "Final UI",
  "期末海報 Poster": "Final Poster",
  "學習反思": "Reflections",
  "返回首頁": "Back to Home",
  "下一個專案": "Next Project",
  "：": ": ",

  // ── Section titles ──
  "專案總覽 Overview": "Overview",
  "問題定義 Problem": "Problem",
  "了解預約行為 Understand": "Understand Behavior",
  "資訊架構設計 Information Architecture": "Information Architecture",
  "介面流程 Interface Flow": "Interface Flow",
  "任務 & 易用性測試 Usability Test": "Usability Test",
  "品牌形象 Brand": "Brand",
  "最終 UI 成果 Final UI": "Final UI",
  "學習反思 Reflections": "Reflections",

  // ── Hero ──
  "NCCUSpace 政大場地管理系統｜討論室預約流程再設計":
    "NCCUSpace｜Redesigning NCCU's Discussion-Room Booking Flow",
  "NCCUSpace 政大場地管理系統再設計主視覺": "NCCUSpace venue management redesign hero",
  "檢視政大圖書館場地管理系統的討論室預約流程，透過訪談、用例分析與易用性測試，重新設計資訊架構、介面流程與品牌形象，讓學生更快預約到想要的空間。":
    "Reviewing the discussion-room booking flow of NCCU library's venue management system — through interviews, use-case analysis and usability testing — to redesign the information architecture, interface flows and brand so students can book the space they want faster.",
  "類型": "Type",
  "角色": "Role",
  "方法": "Methods",
  "工具": "Tools",
  "時間": "Timeline",
  "介面重新設計": "Interface Redesign",
  "團體專案": "Team Project",
  "UX 設計師": "UX Designer",
  "使用者研究員": "UX Researcher",
  "訪談、問卷": "Interviews & Surveys",
  "用例分析": "Use-case Analysis",
  "卡片分類法": "Card Sorting",
  "任務 & 易用性測試": "Task & Usability Testing",

  // ── Overview ──
  "把「預約不到想要的討論室」這件事，從研究一路重做到可上線的流程。":
    "Taking \"can't book the room I want\" from research all the way to a launch-ready flow.",
  "專案不只是把舊介面換皮，而是先拆解學生實際的預約行為與痛點，再重新設計資訊架構、介面流程與品牌，讓預約變得一目瞭然。":
    "The project wasn't a reskin — it first unpacked students' real booking behavior and pain points, then redesigned the information architecture, interface flows and brand to make booking effortless to read.",
  "目標": "Goal",
  "需求": "Needs",
  "原型": "Prototype",
  "在使用政大圖書館場地管理系統預約場地時，常常不能順利預約到想要的空間，因此希望改善預約流程，幫助學生都能順利預約到想要的空間。討論室是同學最常使用的空間，因此選擇以討論室預約流程，優先進行網站再設計。":
    "When booking through NCCU library's venue system, students often can't get the space they want, so we set out to improve the flow. Discussion rooms are the most used space, so we redesigned the site starting with the discussion-room booking flow.",
  "了解目前討論室預約系統行為、拆解行為中未被滿足的需求、重新設計資訊架構與預約流程，並重新打造系統品牌形象。":
    "Understand current booking behavior, surface unmet needs, redesign the information architecture and booking flow, and rebuild the system's brand identity.",
  "以預約討論室為第一優化流程，從首頁篩選、查看可預約時段、登記到確認預約，串起一條可測試、可上線的核心流程。":
    "Starting with discussion-room booking, we connected a testable, launch-ready core flow — from home-page filtering and checking open slots to registration and confirmation.",

  // ── Problem ──
  "透過自身操作經驗與問卷收集，發現政大學生對現有預約流程的不滿意。":
    "Through our own usage and a survey, we found NCCU students were dissatisfied with the current booking flow.",
  "學生預約討論室主要用於小組報告討論與個人自習，且多數使用網頁版操作，目的就是想預約到可用的空間；但實際操作時卻有不少卡關。":
    "Students book discussion rooms mainly for group reports and self-study, mostly on the web version, simply to grab an available space — yet the actual process has plenty of friction.",
  "切換查詢可預約討論室時很不方便，需要跳回起始頁": "Switching searches for available rooms is clunky — you have to jump back to the start page",
  "想知道哪些時間、空間有空討論室，需要一個一個查": "To see which times and spaces are open, you have to check them one by one",
  "網站中很難直接找到相關的場地空間資訊": "It's hard to find relevant venue and space info directly on the site",
  "預約網站的風格設計與其他圖書館網頁大相徑庭": "The booking site's design feels totally different from the other library pages",

  // ── Understand ──
  "訪談": "Interview",
  "深入了解預約需求": "Digging into booking needs",
  "訪談三位曾使用政大場地管理系統預約討論室的學生，了解預約經驗與行為動機，並把訪談重點整理成便利貼貼在 FigJam，依預約前、中、後分群，最上層淺灰色為彙整後的行為洞見。":
    "We interviewed three students who had booked discussion rooms through NCCU's system to learn their experience and motivations, captured key points as sticky notes in FigJam, and grouped them by before / during / after booking — the light-gray top row being the synthesized behavioral insights.",
  "使用者真正會接觸到介面的時機集中在「預約中」。":
    "Users actually touch the interface mostly \"during booking.\"",
  "需求排序": "Prioritization",
  "拆解行為背後的需求並排序": "Unpacking and ranking the needs behind the behavior",
  "根據「預約中」的行為洞見，以動詞名詞分析行為背後的需求與期待，並進行優先排序，由左至右為重要程度高到低。":
    "From the \"during booking\" insights, we analyzed the needs and expectations behind each behavior and ranked them by priority — left to right, high to low importance.",
  "用卡片分類法整合成介面": "Card sorting the use cases into interfaces",
  "先將目前系統的預約行為進行用例拆解，了解完成一項預約任務的各項子行為；再以卡片分類法把用例任務分群，最後整合成介面。":
    "We broke the current booking behavior into use cases to understand the sub-actions of a booking task, then used card sorting to group those tasks and finally consolidate them into interfaces.",

  // affinity board
  "預約前": "Before",
  "預約中": "During",
  "預約後": "After",
  "需要個人且可討論的空間": "Wants a private, talk-friendly space",
  "有自主學習掌握資訊的能力": "Self-directed at finding the info they need",
  "需要可以私人討論、講話的空間": "Needs a space to discuss and talk privately",
  "第一次使用時會先研究怎麼使用": "Studies how to use it on the first try",
  "會優先使用自己的私人空間": "Prefers their own private space first",
  "預約前會先查詢流程和認識空間": "Looks up the flow and spaces before booking",
  "因為人數不足及無空間可以預約": "Can't book due to too few people or no space",
  "曾參加圖書館導覽認識空間資源": "Joined a library tour to learn the spaces",
  "下午時段想找個空間可以討論和讀書": "Wants an afternoon space to discuss and study",
  "多數使用網頁版進行預約": "Mostly books on the web version",
  "實際預約流程與預想不同": "The real flow differs from expectations",
  "希望能預約到想要的時段": "Hopes to book the time slot they want",
  "借用時需要了解空間配置": "Needs to know the room layout when booking",
  "一開始使用會想先選討論室": "Wants to pick the room first",
  "時段是預約的第一考量": "The time slot is the first consideration",
  "會根據過往經驗選擇使用的討論室": "Chooses rooms based on past experience",
  "不知道有其他行動版可用": "Unaware there's a mobile version",
  "樓層選擇不符合自己的使用流程": "Floor selection doesn't fit their flow",
  "想要一次比對可使用的討論室空間": "Wants to compare available rooms at once",
  "希望能預約到完整的時段": "Hopes to book a full, continuous slot",
  "預約時會想知道樓層與空間資訊": "Wants floor and space info while booking",
  "初次使用會需要報到指引": "First-timers need check-in guidance",
  "整體體驗流程順暢": "The overall experience feels smooth",
  "實際到現場會需要預約報到指引": "Needs on-site check-in guidance",
  "系統能讓使用者知道已成功預約": "The system confirms a successful booking",
  "相較過往經驗，覺得政大的流程更順暢": "Feels NCCU's flow is smoother than before",

  // priority table
  "一定要": "Must-have",
  "有更好": "Nice-to-have",
  "可有可無": "Optional",
  "高重要度": "High importance",
  "中重要度": "Mid importance",
  "低重要度": "Low importance",
  "顯示討論室位置介紹": "Show room location & intro",
  "掌握可預約的時間和空間": "Grasp bookable times and spaces",
  "顯示空間的預約規則、流程": "Show booking rules and flow",
  "系統提供視覺化資訊": "System offers visualized info",
  "系統提供快速檢索功能（時間、空間）": "Fast search by time & space",
  "增加預約彈性": "Add booking flexibility",
  "比較預約空間資訊": "Compare bookable space info",
  "預約提醒機制": "Booking reminders",
  "預約機制可採用公平機制": "A fair allocation mechanism",
  "系統可提供視覺化地理位置": "Visualized geographic location",
  "系統提供詳細流程步驟供參考": "Detailed step-by-step reference",

  // card sort legend
  "用例任務": "Use-case task",
  "拆解後的子行為": "Broken-down sub-actions",
  "行為分群": "Behavior grouping",
  "相近行為歸成一組": "Similar behaviors grouped",
  "介面": "Interface",
  "整合成預約流程頁": "Consolidated into booking pages",

  // ── IA ──
  "使用者最在乎能掌握可預約的空間、時間與資訊":
    "What users care about most: a clear grasp of bookable space, time and info",
  "結合「使用者預約行為用例分析」與「完成預約任務的用例分析」結果，把重要用例對應到三個預約流程頁面，並標注重要（藍）與次要（紫）用例。":
    "Combining the behavior and task use-case analyses, we mapped key use cases onto three booking-flow pages, marking primary (blue) and secondary (purple) use cases.",
  "依重要用例設計三頁式預約流程": "A three-page booking flow built from key use cases",
  "讓使用者依序選擇想要的時間、空間、共同使用者，最後獲得成功預約的訊息。":
    "Users pick their time, space and co-users in order, and finally get a successful-booking message.",
  "左右滑動查看分層選單": "Swipe to view the nested list",
  "左右滑動查看完整架構": "Swipe to view the full architecture",
  // nested list board
  "網頁介面": "Web page",
  "介面功能": "Page function",
  "重要用例": "Key use cases",
  "次要用例": "Secondary use cases",
  "預約流程頁-1": "Booking page 1",
  "預約流程頁-2": "Booking page 2",
  "預約流程頁-3": "Booking page 3",
  "篩選符合需求的討論室": "Filter rooms that fit the need",
  "輸入學號登記空間": "Enter student ID to register",
  "確認預約資訊": "Confirm booking info",
  "使用者能夠瀏覽各個討論室的空間與配置": "Users can browse each room's space and layout",
  "使用者可以挑選討論室可使用的時段": "Users can pick the room's available slots",
  "使用者能看到明確的預約規則與流程介紹": "Users can see clear booking rules and flow",
  "使用者可以選擇符合需求的人數、時段、空間": "Users can choose the size, slot and space they need",
  "使用者能夠看到一目瞭然的時間與空間資訊": "Users can see time and space info at a glance",
  "（次要）使用者能獲得候補順序": "(Secondary) Users can get a waitlist position",
  "（次要）使用者能依照過往預約記錄快速預約討論室空間": "(Secondary) Users can rebook quickly from past records",
  "使用者能夠確認預約資訊並修改登記學號": "Users can confirm booking info and edit the registered ID",
  "（次要）使用者可以收取想預約的空間已釋出的信件或簡訊提醒": "(Secondary) Users can get an email/SMS when a wanted space frees up",
  // IA flow nodes
  "輸入帳號": "Enter account", "密碼登入": "& password",
  "看預約規則": "View booking", "和流程": "rules & flow",
  "選擇場館": "Pick venue",
  "個人紀錄": "My records",
  "選擇討論室": "Pick room",
  "篩選人數": "Filter size",
  "選擇可預約": "Pick available", "的時間": "time",
  "選擇日期": "Pick date",
  "選擇時段": "Pick slot",
  "選擇至少 30 分鐘": "Pick at least 30 min",
  "獲得可預約的": "Get recommended", "討論室推薦": "rooms",
  "輸入共同使": "Enter co-user", "用者的學號": "student ID",
  "修改共同使": "Edit co-user", // shares 用者的學號 line above
  "收信": "Get email",
  "進入個人紀錄": "Open my records", "確認資訊": "to confirm",

  // ── Flow ──
  "優先設計最重要的三個預約用例": "Designing the three most important booking use cases first",
  "挑出最重要的三個用例進行介面流程設計，並以介面（黃色矩形）、行為（藍色圓形）、系統（紫色菱形）區分流程節點。":
    "We picked the three most important use cases for interface-flow design, distinguishing nodes by interface (yellow rectangle), behavior (blue circle) and system (purple diamond).",
  "行為（藍色圓形）": "Behavior (blue circle)",
  "介面（黃色矩形）": "Interface (yellow rectangle)",
  "系統（紫色菱形）": "System (purple diamond)",
  "用例一": "Use case 1",
  "用例二": "Use case 2",
  "用例三": "Use case 3",
  "使用者能夠一目瞭然看到可預約時間與空間": "Users can see bookable times and spaces at a glance",
  "首頁讓使用者快速篩選圖書館分館、空間與預約人數，再進入查看各空間可預約時段的頁面。":
    "The home page lets users quickly filter branch, space and party size, then view each space's open slots.",
  "篩選時間、空間找到符合需求的空間後進行預約": "Filter time and space, then book the one that fits",
  "接續用例一，選好想要的時間空間，檢查是否登入後，確認預約資訊。":
    "Following use case 1, pick the time and space, check login, then confirm the booking.",
  "使用者能夠確認預約資訊並修改": "Users can confirm and edit their booking",
  "接續用例二，使用者可確認曾經預約的資訊並取消紀錄（此次不測試修改學號流程）。":
    "Following use case 2, users can review past bookings and cancel a record (the edit-ID flow wasn't tested this round).",
  "左右滑動查看流程": "Swipe to view the flow",
  // flow node lines — case 1
  "打開場地": "Open venue", "管理系統": "mgmt system",
  "場地管理系統": "Venue system",
  "選擇分館": "Pick branch", "空間分類": "Space type", "預約人數": "Party size",
  "系統提供符合": "System offers", "人數的討論室": "rooms by size",
  "查看各空間": "View each space's", "可預約時段": "open slots",
  "點日期": "Tap date", "日期 D+7": "Date D+7",
  "是否有想要": "Want any of", "的預約時段": "these slots?",
  "點按想": "Tap the wanted", "預約時段": "slot",
  "系統跳出預約": "System shows", "資訊提示框": "booking dialog",
  "確認預約": "Confirm booking",
  "是": "Yes", "否": "No",
  // case 2
  "預約空間": "Book a space",
  "是否登入": "Logged in?",
  "登入": "Log in",
  "登入頁": "Login page",
  "登記頁面": "Register page",
  "確認": "Confirm", "預約資訊": "booking info",
  "輸入共同": "Enter co-user's", "使用者學號": "student ID",
  "預約成功頁面": "Success page",
  "預約成功": "Booked",
  // case 3
  "查看借用紀錄": "View records",
  "借用紀錄": "Booking record",
  "信箱收信": "Get email",
  "修改": "Edit", "是否修改": "Edit?", "是否取消": "Cancel?",
  "修改學號": "Edit ID",
  "借用紀錄頁面": "Records page", "（更新後）": "(updated)",
  "取消": "Cancel",
  "確認取消": "Confirm cancel",
  "成功修改": "Edited",
  "成功取消": "Cancelled",

  // ── Test ──
  "低保真原型任務測試": "Low-fi prototype task testing",
  "邀請 2 位受試者進行 low-fi prototype 測試，針對三個用例設計測試腳本，以放聲思考法觀察並記錄使用者執行任務時看到的資訊、感受與遇到的困難。":
    "We invited two participants for low-fi prototype testing, wrote scripts for the three use cases, and used think-aloud to observe and record what users saw, felt and struggled with.",
  "迭代": "Iteration",
  "任務測試結果與迭代": "Task-test results and iteration",
  "使用者在任務二「查看討論室頁面」遇到最多困難——介面元件與資訊架構和使用者心理模型不太相符，因此主要針對「查看討論室頁面」做出以下調整：":
    "Users struggled most in task 2, \"view rooms\" — the components and IA didn't match their mental model — so we focused our changes there:",
  "空間種類下放到 Tab Bar，與時段表做出區隔": "Move space types into a tab bar, separate from the slot table",
  "把空間種類並排讓使用者隨意選擇，想進一步了解可點選查看空間種類差異。":
    "Lay space types side by side for free choice, with a tap to learn the differences.",
  "日期選項改由篩選列選擇": "Move date selection into the filter bar",
  "把原先的空間種類換成使用者進站前已知的「預約日期」，上方篩選列放已知資訊，下方空間種類與時段交給使用者當下彈性選擇。":
    "Swap the space type for the date users already know before arriving — known info in the top filter bar, with space types and slots chosen flexibly below.",
  "篩選結果重點呈現，刪除使用教學選項": "Surface filter results, drop the tutorial option",
  "篩選結果出現在查詢按鈕右側，讓使用者一眼看到有幾筆結果；新手教學改到首次登入時呈現，並提供略過選項。":
    "Results appear right of the search button so users instantly see the count; onboarding moves to first login with a skip option.",
  "空間時段比較表優化": "Refine the space–slot comparison table",
  "第一版把日期與討論室放在同一層級造成架構不清，調整資訊呈現方式，並依結果多寡彈性調整畫面寬度，避免欄位留白。":
    "The first version put date and room on the same level, blurring the structure; we adjusted the layout and flexed the width by result count to avoid empty columns.",
  "SUS": "SUS",
  "易用性量表結果": "Usability scale results",
  "SUS Score：（67.5 + 87.5）／ 2 = 79.8（Good）。測試結果顯示，整體介面重新設計對使用者而言是容易理解與學習的。":
    "SUS Score: (67.5 + 87.5) / 2 = 79.8 (Good). Results show the redesigned interface is easy for users to understand and learn.",
  // SUS table
  "SUS 易用性問題": "SUS usability statement",
  "我願意時常使用這個網站": "I'd like to use this site frequently",
  "我覺得這個網站過於複雜": "I found this site overly complex",
  "我認為這個網站很容易使用": "I thought this site was easy to use",
  "我需要專業人員協助才能使用這個網站": "I'd need expert help to use this site",
  "我覺得這個網站的功能整合得很好": "The site's functions are well integrated",
  "我覺得這個網站有很多不一致的地方": "There's a lot of inconsistency on this site",
  "我相信大部分人很快就能學會使用這個網站": "Most people would learn this site quickly",
  "我覺得這個網站使用起來很麻煩": "I found this site cumbersome to use",
  "我覺得我在網站操作上完全沒問題": "I felt fully confident operating the site",
  "在使用網站前，我必須學習很多先備知識才能使用": "I had to learn a lot before I could use the site",

  // ── Brand ──
  "以 NCCUSpace 重塑品牌形象": "Rebuilding the brand as NCCUSpace",
  "把原有的政大場地管理系統，以 NCCUSpace 結合「政大」與「空間運用」命名，強調用簡單的預約步驟，提供輕鬆方便的空間預約體驗，讓學生更專注於工作與學習。未來也可整合政大各處室的空間預約與管理。":
    "We renamed NCCU's venue system as NCCUSpace — blending \"NCCU\" with \"space use\" — to emphasize a simple, effortless booking experience that lets students focus on work and study. In future it could unify booking and management across NCCU's departments.",
  "Logo": "Logo",
  "顏色": "Color",
  "字體": "Typeface",
  "特色": "Feature",
  "以書冊堆疊成建築形象，展現圖書館所提供的討論空間。": "Stacked books form a building, evoking the library's discussion spaces.",
  "結合政大自然風景與圖書館網站既有色系，選用大地色系，給學生舒適、有親和力的感覺。": "Earth tones drawn from NCCU's scenery and the library site's palette feel warm and approachable.",
  "選用無襯線的源樣黑體，呈現簡約俐落的風格。": "Sans-serif GenYoGothic for a clean, crisp style.",
  "以視覺化表格呈現篩選時段、討論室的結果，方便使用者直接選擇、查看想預約的結果。": "A visualized table shows filtered slots and rooms so users can pick and review at a glance.",
  "左右滑動查看品牌關鍵字": "Swipe to view brand keywords",
  // brand mindmap
  "政大自然景色": "NCCU's nature",
  "圖書館學術": "Library & academia",
  "便利預約": "Easy booking",
  "現代": "Modern",
  "簡約": "Minimal",
  "俐落": "Crisp",
  "篩選機制": "Filtering",
  "簡化步驟": "Fewer steps",
  "視覺化表格": "Visual table",

  // ── Final UI ──
  "根據測試結果迭代完成 Hi-fi 原型，以下呈現三個核心用例的最終操作介面。":
    "Iterated into a hi-fi prototype from the test results — below are the final interfaces for the three core use cases.",
  "一目瞭然看到可預約時間與空間": "See bookable times and spaces at a glance",
  "篩選時空、找到符合需求空間後預約": "Filter time and space, then book the right one",
  "確認預約資訊並修改或取消": "Confirm, edit or cancel a booking",
  "NCCUSpace 用例一最終介面": "NCCUSpace use case 1 final interface",
  "NCCUSpace 用例二最終介面": "NCCUSpace use case 2 final interface",
  "NCCUSpace 用例三最終介面": "NCCUSpace use case 3 final interface",

  // ── Poster ──
  "NCCUSpace 期末海報": "NCCUSpace final poster",

  // ── Reflection ──
  "Redesign 需要從使用者的行為思考，而非只修改介面": "A redesign should start from user behavior, not just the interface",
  "原先的介面雖然也能讓使用者成功預約討論室，但透過訪談我們發現，使用者都得先摸索一番才能習慣現有操作。因此我們把預約過程做了詳細的拆解與分析，對應訪談中的洞見重新設計新版介面，幫助使用者更快預約到想要的空間與時段。":
    "The old interface could get users to a successful booking, but interviews showed they all had to fumble through before getting used to it. So we broke the booking process down in detail, mapped it to the interview insights, and redesigned the interface to help users book the space and slot they want faster.",

  // ── zoom labels ──
  "關閉放大圖片": "Close zoomed image",
  "點擊放大": "Click to zoom",
} as const;

type NccuKey = keyof typeof en;

export function translateNccu(locale: Locale, text: string) {
  return locale === "en" ? en[text as NccuKey] ?? text : text;
}

export function translateNccuData<T>(locale: Locale, value: T): T {
  if (typeof value === "string") return translateNccu(locale, value) as T;
  if (Array.isArray(value)) {
    const translateItem = (item: unknown) => translateNccuData(locale, item);
    return (value.some(isValidElement)
      ? Children.map(value, translateItem)
      : value.map(translateItem)) as T;
  }
  if (isValidElement(value)) return localizeNccuTree(locale, value) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, translateNccuData(locale, item)]),
    ) as T;
  }
  return value;
}

export function localizeNccuTree(locale: Locale, node: ReactNode): ReactNode {
  if (typeof node === "string") return translateNccu(locale, node);
  if (Array.isArray(node)) {
    return Children.map(node, (item) => localizeNccuTree(locale, item));
  }
  if (!isValidElement(node)) return node;

  const element = node as ReactElement<Record<string, unknown>>;
  const { children, ...restProps } = element.props;
  const props = translateNccuData(locale, restProps);
  const localizedChildren = Children.map(children as ReactNode, (child) =>
    localizeNccuTree(locale, child),
  );
  return cloneElement(element, props, localizedChildren);
}
