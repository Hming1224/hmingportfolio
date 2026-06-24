const messages = {
  nav: {
    ariaLabel: "主要導覽",
    openMenu: "開啟選單",
    closeMenu: "關閉選單",
    projects: "精選案例",
    about: "關於我",
    designSystem: "設計系統",
    contact: "聯絡資訊",
    resume: "下載履歷",
    resumeHref: "/黃宣銘_中文履歷.pdf",
  },
  language: {
    select: "選擇語言",
    menu: "語言選單",
    current: "繁體中文",
    loading: "切換語言中",
  },
  hero: {
    badge: "2+ 業界專案經驗，目前正在尋找新的機會！",
    greeting: "哈囉！我是黃宣銘 Brian Huang",
    taglines: "以同理心研究需求|以好奇心探索設計|以清晰思維打造產品",
    journey: "我的歷程",
    works: "查看作品",
  },
  works: {
    heading: "精選案例",
    enterprise: "企業應用",
    school: "學校產出",
    comingSoon: "即將上線",
    learnMore: "了解更多",
  },
  contact: {
    email: "電子信箱",
    phone: "手機號碼",
    copyEmail: "複製信箱",
    copyPhone: "複製手機號碼",
    copy: "複製",
    copied: "已複製！",
    formTitle: "填寫聯絡表單",
    formSubtitle: "收到回覆後，將會儘速聯絡！😸",
    name: "你的姓名",
    company: "服務單位",
    message: "訊息內容",
    submit: "送出訊息",
    sending: "傳送中...",
    success: "送出成功！",
    required: "此欄位為必填",
    invalidEmail: "請輸入有效的 Email",
    error: "傳送失敗，請重試",
  },
  footer: {
    socialLinks: "社群連結",
  },
  designSystem: {
    hero: {
      eyebrow: "Portfolio System Behind the Scenes",
      title: "把作品集做成一套真的能延伸的設計系統",
      description:
        "這頁不是單純展示漂亮畫面，而是把這個作品集背後的設計語言、元件規則與升級策略公開攤開。從 token 到 component，再到成熟度藍圖，我想呈現的是一個設計師如何把品味工程化。",
      primaryAction: "看設計原則",
      secondaryAction: "看成熟度藍圖",
      statsAriaLabel: "設計系統概覽數據",
      stats: [
        { value: "4", label: "目前核心路由" },
        { value: "25+", label: "已整理的共用元件" },
        { value: "740+", label: "掃描過的 CSS class" },
        { value: "60+", label: "可追溯的設計 token" },
      ],
    },
    toc: {
      ariaLabel: "設計系統頁段落導覽",
      title: "快速導覽",
      items: [
        { href: "#principles", label: "設計靈魂與 7 原則" },
        { href: "#foundation", label: "Foundation 與 token" },
        { href: "#components", label: "元件展示與互動" },
        { href: "#roadmap", label: "成熟度藍圖" },
        { href: "#cta", label: "延伸閱讀" },
      ],
    },
    principles: {
      heading: "設計靈魂與 7 條原則",
      soulTitle: "我想讓人感覺：這個人很仔細，有品味，而且做過真東西。",
      soulBody:
        "這套系統服務的對象，是會看細節的設計主管與招募者。所以我追求的不是炫，而是穩、準、耐看。它要有滯度，不冰冷，也要克制地露出個性。",
      items: [
        {
          title: "先建立氣質，再談裝飾",
          body: "每個畫面的第一優先是整體氣質要站得住。先把比例、留白、層級做對，視覺細節才有意義。",
        },
        {
          title: "顏色可以換，框架不能散",
          body: "不同專案可以有自己的 tone，但資訊架構、排版節奏與 CTA 規則要一致，這樣整個作品集才像同一個人做的。",
        },
        {
          title: "主角永遠要清楚",
          body: "一個畫面只保留最重要的重點，像首頁每屏主要 CTA 只留一顆紫色按鈕，避免訊號互搶。",
        },
        {
          title: "互動不是加特效，是補語意",
          body: "hover、focus、loading、disabled 都是在補充狀態，不是為了炫技。所以每個互動都要幫助理解。",
        },
        {
          title: "資訊密度高，也要讓人呼吸",
          body: "我喜歡把複雜內容講清楚，但密度高不代表要擠。卡片、段落、斷點都要幫讀者喘口氣。",
        },
        {
          title: "設計要能被工程接住",
          body: "我不想只停留在 Figma 漂亮稿，所以 token、z-index、breakpoint、狀態色都要能真的落進 code。",
        },
        {
          title: "每個可到達狀態都值得被設計",
          body: "空狀態、驗證成功、錯誤訊息、modal 關閉、toast 消失，這些邊角狀態累積起來，才是成熟感的來源。",
        },
      ],
    },
    foundation: {
      heading: "Foundation：從 token 到節奏",
      cards: [
        {
          title: "色彩不是只選好看，是先定層級",
          body: "品牌紫色負責 CTA 與 active 訊號，狀態色負責系統回饋，中性灰階負責閱讀秩序。這樣元件一長出來就有共同語言。",
        },
        {
          title: "字級與留白一起決定閱讀感",
          body: "這個站的字級 token 和 breakpoint 綁在一起，不追求花俏 scale，而是確保每個區塊在不同尺寸都還是穩的。",
        },
        {
          title: "圓角、陰影、動效，負責手感",
          body: "12 / 16 的卡片圓角、200 的按鈕膠囊、以及 base / reveal 兩套節奏，讓畫面既克制又不死板。",
        },
      ],
    },
    playground: {
      tokenToggle: "展開完整 token",
      tokenHide: "收起完整 token",
      loadingLabel: "載入中",
      selectPlaceholder: "請選擇角色",
      selectValueLabel: "角色範例",
      checkboxLabel: "保留 CTA 語意一致性",
      radioAlpha: "首頁敘事優先",
      radioBeta: "案例細節優先",
      alertInfo: "Info 狀態用來補充背景與操作提示。",
      alertSuccess: "Success 狀態用來確認使用者已完成一個可被信任的動作。",
      alertWarning: "Warning 狀態提醒使用者再確認一次，不急著製造恐慌。",
      alertError: "Error 狀態必須明確告訴使用者哪裡出錯，以及下一步怎麼補救。",
      openModal: "打開 Modal",
      launchToast: "觸發 Toast",
      modalTitle: "設計決策示範",
      modalBody: "Modal 適合承接需要中斷背景流程、要求使用者明確決策的情境。",
      modalClose: "關閉",
      toastMessage: "Toast：元件狀態與動效已成功串起來。",
      emptyTitle: "目前沒有資料",
      emptyDescription: "當專案還沒上線、內容尚未建立，系統也要給出有禮貌的空狀態。",
      emptyAction: "查看案例",
      buttonsTitle: "按鈕系統",
      buttonsBody: "Primary CTA、次要動作與 danger flow，都要在同一套規則下保持清楚。",
      buttonsPrimary: "主要操作",
      buttonsSecondary: "次要操作",
      buttonsDanger: "危險操作",
      selectionTitle: "選擇元件",
      selectionBody: "表單狀態被 token 化之後，驗證、選項與決策流程才會一致。",
      feedbackTitle: "系統回饋",
      feedbackBody: "success、warning、error、info 各自有清楚語氣，不再每頁各講各的。",
      loadingTitle: "等待與空狀態",
      loadingBody: "就算內容還沒來，介面也不該像壞掉，而是要像有準備好的產品。",
    },
    components: {
      heading: "元件展示與互動模式",
      items: [
        {
          title: "按鈕與表單：先把狀態講清楚",
          body: "Button 補上 loading 與 danger 後，配合 Select / Checkbox / Radio，整個輸入流程的語意就完整了。這對作品集的聯絡表單、未來任何設定頁都很重要。",
        },
        {
          title: "Toast / Alert / Modal：把系統回饋做成可重用模組",
          body: "不是每個頁面都臨時手刻一段提示，而是把回饋模式抽成元件。這讓整體體驗更一致，也讓未來擴充更快。",
        },
        {
          title: "Skeleton / Empty State：等待也要有被設計的感覺",
          body: "我很在意『沒有資料』和『資料還沒到』這兩種時刻。成熟感往往不是來自 Hero，而是這些邊角狀態有沒有被照顧。",
        },
      ],
    },
    roadmap: {
      heading: "成熟度藍圖",
      methodTitle: "我的方法不是憑感覺補洞，而是主動對標成熟系統",
      methodBody:
        "我有拿 Ant Design 與 Material 3 當參考基準，去看自己的作品集系統在哪些地方還不夠完整。重點不是複製它們，而是用成熟產品的思路，回頭驗證自己的設計是否經得起擴充。",
      problemLabel: "問題：",
      decisionLabel: "決策：",
      outcomeLabel: "成果：",
      phases: [
        {
          kicker: "Phase 01",
          title: "已落地",
          items: [
            {
              title: "Token 命名、狀態色與層級收斂",
              problem: "原本不同區塊各自有顏色與 z-index 寫法，系統性不足。",
              decision: "統一成 --hm-* 前綴，補上 success / warning / error / info 與 z-index 階梯。",
              outcome: "之後新元件可以直接接上共同語言，不必再猜哪個顏色或層級才對。",
            },
            {
              title: "表單與操作元件擴充",
              problem: "原本按鈕與輸入元件不足以支撐更完整的操作流程。",
              decision: "補上 Button loading / danger，以及 Select、Checkbox、Radio。",
              outcome: "聯絡流程與未來擴充頁面，都有更完整的互動骨架。",
            },
            {
              title: "回饋與等待狀態模組化",
              problem: "Toast、Alert、Modal、Skeleton、Empty State 若每次重寫，會很快失控。",
              decision: "把它們做成基礎 UI 元件，讓狀態與語氣可以重複使用。",
              outcome: "整體體驗更一致，未來也比較好被 AI 或工程師接手。",
            },
          ],
        },
        {
          kicker: "Phase 02",
          title: "進行中 / 驗收中",
          items: [
            {
              title: "Motion token 真正注入舊區塊",
              problem: "有了動效 token，不代表所有舊 code 都已經吃到。",
              decision: "把 duration / easing 持續往既有互動和動畫整理。",
              outcome: "讓動效從『局部漂亮』變成『全站節奏一致』。",
            },
            {
              title: "圖表色與資料視覺規範落地",
              problem: "案例若加入更多資料視覺化，還需要更穩定的色彩規則。",
              decision: "先補 chart token，接著再驗證它們在實際案例的可讀性。",
              outcome: "之後做流程圖、成效圖表時，不用每次重想配色。",
            },
            {
              title: "Dark mode token 保留、公開切換暫緩",
              problem: "深色主題已經有基礎 token，但對外 toggle 時機還沒成熟。",
              decision: "先保留 .dark 結構，撤下公開 ThemeToggle。",
              outcome: "系統結構先準備好，但不讓未完成的體驗提早曝光。",
            },
          ],
        },
        {
          kicker: "Phase 03",
          title: "Roadmap",
          items: [
            {
              title: "完整雙主題上線",
              problem: "目前 dark token 還沒配合全站細節逐頁驗收。",
              decision: "等每個核心頁面都驗證完成，再開放正式切換。",
              outcome: "未來可提供更完整的主題體驗，而不是半成品。",
            },
            {
              title: "A11y audit 到 WCAG AA",
              problem: "現在有可操作基礎，但還沒做完整無障礙審視。",
              decision: "把鍵盤操作、對比、語意標記與焦點可見性納入下一輪驗收。",
              outcome: "系統成熟度不只看視覺，也看是否真的可用。",
            },
            {
              title: "更多資料視覺與內容模板",
              problem: "案例頁一多，資料型內容會需要更一致的模版。",
              decision: "在現有 token 之上，延伸圖表、比較表與流程視覺規範。",
              outcome: "讓未來新增案例時，資訊密度再高也能維持秩序。",
            },
          ],
        },
      ],
    },
    cta: {
      eyebrow: "Next Step",
      title: "如果你想看這套系統最後怎麼落到真實專案上",
      body: "可以直接回到案例頁看我怎麼把這套方法用在 IoT、企業 SaaS 與教學型產品敘事裡。也歡迎直接找我聊聊，怎麼把設計思維接到產品與工程。",
      primaryAction: "回到精選案例",
      secondaryAction: "聯絡我",
    },
  },
};

export default messages;
