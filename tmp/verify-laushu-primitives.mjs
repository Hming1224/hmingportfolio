import { spawn } from "node:child_process";
import { readFile, rm } from "node:fs/promises";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const url = process.env.LAUSHU_VERIFY_URL ?? "http://localhost:3000/zh-TW/laushu";
const userDataDir = `/private/tmp/hming-laushu-primitives-cdp-${process.pid}-${Date.now()}`;
const viewports = [
  [1440, 1000],
  [390, 900],
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(targetUrl) {
  const res = await fetch(targetUrl);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${targetUrl}`);
  return res.json();
}

async function connect(wsUrl, onEvent) {
  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });

  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pending.has(data.id)) {
      const { resolve, reject } = pending.get(data.id);
      pending.delete(data.id);
      if (data.error) reject(new Error(JSON.stringify(data.error)));
      else resolve(data.result);
    }
    onEvent?.(data);
  });

  return {
    send(method, params = {}) {
      const messageId = ++id;
      ws.send(JSON.stringify({ id: messageId, method, params }));
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          pending.delete(messageId);
          reject(new Error(`CDP timeout: ${method}`));
        }, 15000);
        pending.set(messageId, {
          resolve: (value) => {
            clearTimeout(timeout);
            resolve(value);
          },
          reject: (error) => {
            clearTimeout(timeout);
            reject(error);
          },
        });
      });
    },
    close() {
      ws.close();
    },
  };
}

const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--no-first-run",
  "--no-default-browser-check",
  "--remote-debugging-port=0",
  `--user-data-dir=${userDataDir}`,
  "about:blank",
], { stdio: "ignore" });

try {
  let remoteDebuggingPort;
  let version;
  for (let i = 0; i < 50; i += 1) {
    try {
      if (!remoteDebuggingPort) {
        const activePort = await readFile(`${userDataDir}/DevToolsActivePort`, "utf8");
        remoteDebuggingPort = activePort.split(/\r?\n/)[0];
      }
      version = await fetchJson(`http://127.0.0.1:${remoteDebuggingPort}/json/version`);
      break;
    } catch {
      await wait(100);
    }
  }
  if (!version?.webSocketDebuggerUrl) throw new Error("Chrome CDP did not start");

  const browser = await connect(version.webSocketDebuggerUrl);
  const { targetId } = await browser.send("Target.createTarget", { url: "about:blank" });
  const targets = await fetchJson(`http://127.0.0.1:${remoteDebuggingPort}/json/list`);
  const target = targets.find((item) => item.id === targetId);
  const pageErrors = [];
  const page = await connect(target.webSocketDebuggerUrl, (event) => {
    if (event.method === "Runtime.exceptionThrown") pageErrors.push(event.params);
    if (event.method === "Log.entryAdded" && event.params?.entry?.level === "error") pageErrors.push(event.params.entry);
    if (event.method === "Runtime.consoleAPICalled" && ["error", "assert"].includes(event.params?.type)) pageErrors.push(event.params);
  });

  await page.send("Page.enable");
  await page.send("Runtime.enable");
  await page.send("Log.enable");

  const results = [];
  for (const [width, height] of viewports) {
    pageErrors.length = 0;
    await page.send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 768,
    });
    await page.send("Page.navigate", { url });
    await wait(2500);
    const { result } = await page.send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => {
        const doc = document.documentElement;
        const infoRowDivided = document.querySelector('.cs-info-row--divided');
        const tableFrame = document.querySelector('.cs-data-table-frame--wide');
        const matrixTable = document.querySelector('.cs-data-table--matrix');
        const matrixCorner = matrixTable?.querySelector('.cs-data-table-corner');
        const matrixCell = matrixTable?.querySelector('tbody td');
        const surveyFlow = document.querySelector('.cs-survey-flow');
        const surveyNode = surveyFlow?.querySelector('.cs-survey-node');
        const surveyPanelStats = document.querySelector('.cs-survey-panel--stats');
        const surveyPanelInsight = document.querySelector('.cs-survey-panel--insight');
        const surveyStatGrid = document.querySelector('.cs-survey-stat-grid');
        const surveyChartGrid = document.querySelector('.cs-survey-chart-grid');
        const surveyDonutSegment = document.querySelector('.cs-survey-donut-segment');
        const surveyBarGroups = document.querySelector('.cs-survey-bar-groups');
        const surveyBarFill = document.querySelector('.cs-survey-bar-fill');
        const surveyInsightGrid = document.querySelector('.cs-survey-insight-grid');
        const surveyInsightLabel = document.querySelector('.cs-survey-insight-label');
        const topicCard = document.querySelector('.cs-topic-card');
        const overviewGrid = document.querySelector('.cs-topic-grid--overview');
        const problemGrid = document.querySelector('.cs-topic-grid--problem');
        const stakeholderGrid = document.querySelector('.cs-topic-grid--stakeholder');
        const usecaseGrid = document.querySelector('.cs-topic-grid--usecase');
        const usecaseCard = usecaseGrid?.querySelector('.cs-topic-card');
        const topicKicker = document.querySelector('.cs-topic-card-kicker');
        const topicArt = document.querySelector('.cs-topic-card-art');
        const article = document.querySelector('.cs-article');
        const articleHeading = article?.querySelector('h3');
        const articleNum = article?.querySelector('.cs-article-num');
        const richCopy = article?.querySelector('.cs-rich-copy');
        const guideGrid = document.querySelector('.cs-guide-list-grid');
        const guideCard = document.querySelector('.cs-guide-list-card');
        const guideTitle = guideCard?.querySelector('h4');
        const guideListItem = guideCard?.querySelector('.cs-guide-list-item');
        const guideMarker = guideCard?.querySelector('.cs-guide-list-marker');
        const guideDot = guideCard?.querySelector('.cs-guide-list-dot');
        const guideLine = guideCard?.querySelector('.cs-guide-list-line');
        const personaList = document.querySelector('.cs-persona-list');
        const personaCard = document.querySelector('.cs-persona-card');
        const personaCopy = personaCard?.querySelector('.cs-persona-copy');
        const personaTags = personaCard?.querySelector('.cs-persona-tags');
        const personaMedia = personaCard?.querySelector('.cs-zoomable-image');
        const videoList = document.querySelector('.cs-video-showcase-list');
        const videoCard = document.querySelector('.cs-video-showcase-card');
        const videoMedia = videoCard?.querySelector('.cs-video-showcase-media');
        const videoMeta = videoCard?.querySelector('.cs-video-showcase-meta');
        const video = videoCard?.querySelector('.cs-video-showcase-video');
        const videoCopy = videoCard?.querySelector('.cs-video-showcase-copy');
        const reflectionGrid = document.querySelector('.cs-reflection-grid');
        const reflectionCard = document.querySelector('.cs-reflection-card');
        const reflectionNum = reflectionCard?.querySelector('.cs-reflection-card-num');
        const reflectionTitle = reflectionCard?.querySelector('.cs-reflection-card-title');
        const iterationList = document.querySelector('.cs-iteration-list');
        const iterationBoard = document.querySelector('.cs-iteration-board');
        const iterationHead = iterationBoard?.querySelector('.cs-iteration-head');
        const iterationBadge = iterationBoard?.querySelector('.cs-iteration-badge');
        const iterationTitle = iterationBoard?.querySelector('.cs-iteration-title');
        const iterationBody = iterationBoard?.querySelector('.cs-iteration-body');
        const iterationLabel = iterationBoard?.querySelector('.cs-iteration-label');
        const iterationCopy = iterationBoard?.querySelector('.cs-iteration-copy');
        const iterationCompare = iterationBoard?.querySelector('.cs-iteration-compare');
        const iterationPanel = iterationBoard?.querySelector('.cs-iteration-panel');
        const iterationCaption = iterationPanel?.querySelector('figcaption');
        const iterationPanelMedia = iterationPanel?.querySelector('.cs-iteration-panel-media');
        const iterationPanelImage = iterationPanel?.querySelector('.cs-iteration-panel-image');
        const iterationArrow = iterationBoard?.querySelector('.cs-iteration-arrow');
        const documentPreview = document.querySelector('.cs-document-preview');
        const documentPreviewFrame = documentPreview?.querySelector('.cs-media-frame');
        const documentPreviewCaption = documentPreview?.querySelector('.cs-media-caption');
        const showcaseMedia = document.querySelector('.cs-showcase-media');
        const showcaseFrame = showcaseMedia?.querySelector('.cs-media-frame');
        const showcaseCaptionCenter = document.querySelector('.cs-showcase-media--caption-center');
        const showcaseCaption = showcaseCaptionCenter?.querySelector('.cs-media-caption');
        const showcaseFramed = document.querySelector('.cs-showcase-media--framed');
        const showcaseFramedFrame = showcaseFramed?.querySelector('.cs-media-frame');
        const explainerLayout = document.querySelector('.cs-explainer-layout');
        const explainerCopy = explainerLayout?.querySelector('.cs-explainer-copy');
        const explainerPill = explainerLayout?.querySelector('.cs-explainer-pill');
        const explainerTitle = explainerLayout?.querySelector('.cs-explainer-title');
        const explainerBody = explainerLayout?.querySelector('p');
        const headerWide = document.querySelector('.cs-section-header--case-wide');
        const headerWideKicker = headerWide?.querySelector('.cs-section-kicker');
        const headerWideTitle = headerWide?.querySelector('.cs-section-title');
        const sectionLeadWide = document.querySelector('.cs-section-lead--wide');
        const sectionLeadBottom = document.querySelector('.cs-section-lead--bottom-gap');
        const prototypeLead = document.querySelector('.laushu-prototype-section > .cs-section-lead');
        const subsectionTitleWide = document.querySelector('.cs-subsection-title--wide');
        const diagramFrame = document.querySelector('.cs-diagram-frame--flow');
        const diagramGraphic = document.querySelector('.cs-diagram-graphic--flow');
        const diagramNodeLabel = document.querySelector('.cs-diagram-label--node');
        const diagramEdgeLabel = document.querySelector('.cs-diagram-label--edge');
        const taskFlowOne = document.querySelector('.cs-task-flow-graphic--one');
        const taskFlowTwo = document.querySelector('.cs-task-flow-graphic--two');
        const taskFlowThree = document.querySelector('.cs-task-flow-graphic--three');
        const taskFlowConnector = document.querySelector('.cs-task-flow-connector');
        const taskFlowNodeCopy = document.querySelector('.cs-task-flow-node-copy');
        const taskFlowEdgeLabel = document.querySelector('.cs-task-flow-edge-label');
        const flowFrameList = document.querySelector('.cs-flow-frame-list');
        const flowFrameBadge = document.querySelector('.cs-flow-frame-badge');
        const flowFrameTitle = document.querySelector('.cs-flow-frame-title');
        const prototypeBlock = document.querySelector('.cs-sol-block--prototype');
        const prototypeGroup = document.querySelector('.cs-sol-fgroup--prototype');
        const prototypeCard = document.querySelector('.cs-sol-fc');
        const prototypeCardHead = document.querySelector('.cs-sol-fchead');
        const prototypeCardBody = document.querySelector('.cs-sol-fcbody');
        const prototypeTitle = document.querySelector('.cs-sol-ftitle');
        const prototypeSub = document.querySelector('.cs-sol-fsub');
        const prototypeRule = document.querySelector('.cs-sol-fhr');
        const prototypeConnector = document.querySelector('.cs-sol-fconn');
        const prototypeConnectorImg = prototypeConnector?.querySelector('img');
        const infoRowDividedStyle = infoRowDivided ? getComputedStyle(infoRowDivided) : null;
        const tableFrameStyle = tableFrame ? getComputedStyle(tableFrame) : null;
        const matrixTableStyle = matrixTable ? getComputedStyle(matrixTable) : null;
        const matrixHead = matrixTable?.querySelector('thead th:not(.cs-data-table-corner)');
        const matrixHeadStyle = matrixHead ? getComputedStyle(matrixHead) : null;
        const matrixCornerStyle = matrixCorner ? getComputedStyle(matrixCorner) : null;
        const matrixCellStyle = matrixCell ? getComputedStyle(matrixCell) : null;
        const surveyFlowStyle = surveyFlow ? getComputedStyle(surveyFlow) : null;
        const surveyNodeStyle = surveyNode ? getComputedStyle(surveyNode) : null;
        const surveyPanelStatsStyle = surveyPanelStats ? getComputedStyle(surveyPanelStats) : null;
        const surveyPanelInsightStyle = surveyPanelInsight ? getComputedStyle(surveyPanelInsight) : null;
        const surveyStatGridStyle = surveyStatGrid ? getComputedStyle(surveyStatGrid) : null;
        const surveyChartGridStyle = surveyChartGrid ? getComputedStyle(surveyChartGrid) : null;
        const surveyDonutSegmentStyle = surveyDonutSegment ? getComputedStyle(surveyDonutSegment) : null;
        const surveyBarGroupsStyle = surveyBarGroups ? getComputedStyle(surveyBarGroups) : null;
        const surveyBarFillStyle = surveyBarFill ? getComputedStyle(surveyBarFill) : null;
        const surveyInsightGridStyle = surveyInsightGrid ? getComputedStyle(surveyInsightGrid) : null;
        const surveyInsightLabelStyle = surveyInsightLabel ? getComputedStyle(surveyInsightLabel) : null;
        const topicCardStyle = topicCard ? getComputedStyle(topicCard) : null;
        const usecaseGridStyle = usecaseGrid ? getComputedStyle(usecaseGrid) : null;
        const usecaseCardStyle = usecaseCard ? getComputedStyle(usecaseCard) : null;
        const topicKickerStyle = topicKicker ? getComputedStyle(topicKicker) : null;
        const topicArtStyle = topicArt ? getComputedStyle(topicArt) : null;
        const articleStyle = article ? getComputedStyle(article) : null;
        const articleHeadingStyle = articleHeading ? getComputedStyle(articleHeading) : null;
        const articleNumStyle = articleNum ? getComputedStyle(articleNum) : null;
        const richCopyStyle = richCopy ? getComputedStyle(richCopy) : null;
        const guideGridStyle = guideGrid ? getComputedStyle(guideGrid) : null;
        const guideCardStyle = guideCard ? getComputedStyle(guideCard) : null;
        const guideTitleStyle = guideTitle ? getComputedStyle(guideTitle) : null;
        const guideListItemStyle = guideListItem ? getComputedStyle(guideListItem) : null;
        const guideMarkerStyle = guideMarker ? getComputedStyle(guideMarker) : null;
        const guideDotStyle = guideDot ? getComputedStyle(guideDot) : null;
        const guideLineStyle = guideLine ? getComputedStyle(guideLine) : null;
        const personaListStyle = personaList ? getComputedStyle(personaList) : null;
        const personaCardStyle = personaCard ? getComputedStyle(personaCard) : null;
        const personaCopyStyle = personaCopy ? getComputedStyle(personaCopy) : null;
        const personaTagsStyle = personaTags ? getComputedStyle(personaTags) : null;
        const personaMediaStyle = personaMedia ? getComputedStyle(personaMedia) : null;
        const videoListStyle = videoList ? getComputedStyle(videoList) : null;
        const videoCardStyle = videoCard ? getComputedStyle(videoCard) : null;
        const videoMediaStyle = videoMedia ? getComputedStyle(videoMedia) : null;
        const videoMetaStyle = videoMeta ? getComputedStyle(videoMeta) : null;
        const videoStyle = video ? getComputedStyle(video) : null;
        const videoCopyStyle = videoCopy ? getComputedStyle(videoCopy) : null;
        const reflectionGridStyle = reflectionGrid ? getComputedStyle(reflectionGrid) : null;
        const reflectionCardStyle = reflectionCard ? getComputedStyle(reflectionCard) : null;
        const reflectionNumStyle = reflectionNum ? getComputedStyle(reflectionNum) : null;
        const reflectionTitleStyle = reflectionTitle ? getComputedStyle(reflectionTitle) : null;
        const iterationListStyle = iterationList ? getComputedStyle(iterationList) : null;
        const iterationBoardStyle = iterationBoard ? getComputedStyle(iterationBoard) : null;
        const iterationHeadStyle = iterationHead ? getComputedStyle(iterationHead) : null;
        const iterationBadgeStyle = iterationBadge ? getComputedStyle(iterationBadge) : null;
        const iterationTitleStyle = iterationTitle ? getComputedStyle(iterationTitle) : null;
        const iterationBodyStyle = iterationBody ? getComputedStyle(iterationBody) : null;
        const iterationLabelStyle = iterationLabel ? getComputedStyle(iterationLabel) : null;
        const iterationCopyStyle = iterationCopy ? getComputedStyle(iterationCopy) : null;
        const iterationCompareStyle = iterationCompare ? getComputedStyle(iterationCompare) : null;
        const iterationPanelStyle = iterationPanel ? getComputedStyle(iterationPanel) : null;
        const iterationCaptionStyle = iterationCaption ? getComputedStyle(iterationCaption) : null;
        const iterationPanelMediaStyle = iterationPanelMedia ? getComputedStyle(iterationPanelMedia) : null;
        const iterationPanelImageStyle = iterationPanelImage ? getComputedStyle(iterationPanelImage) : null;
        const iterationArrowStyle = iterationArrow ? getComputedStyle(iterationArrow) : null;
        const documentPreviewStyle = documentPreview ? getComputedStyle(documentPreview) : null;
        const documentPreviewFrameStyle = documentPreviewFrame ? getComputedStyle(documentPreviewFrame) : null;
        const documentPreviewCaptionStyle = documentPreviewCaption ? getComputedStyle(documentPreviewCaption) : null;
        const showcaseMediaStyle = showcaseMedia ? getComputedStyle(showcaseMedia) : null;
        const showcaseFrameStyle = showcaseFrame ? getComputedStyle(showcaseFrame) : null;
        const showcaseCaptionStyle = showcaseCaption ? getComputedStyle(showcaseCaption) : null;
        const showcaseFramedFrameStyle = showcaseFramedFrame ? getComputedStyle(showcaseFramedFrame) : null;
        const explainerLayoutStyle = explainerLayout ? getComputedStyle(explainerLayout) : null;
        const explainerCopyStyle = explainerCopy ? getComputedStyle(explainerCopy) : null;
        const explainerPillStyle = explainerPill ? getComputedStyle(explainerPill) : null;
        const explainerTitleStyle = explainerTitle ? getComputedStyle(explainerTitle) : null;
        const explainerBodyStyle = explainerBody ? getComputedStyle(explainerBody) : null;
        const headerWideStyle = headerWide ? getComputedStyle(headerWide) : null;
        const headerWideKickerStyle = headerWideKicker ? getComputedStyle(headerWideKicker) : null;
        const headerWideTitleStyle = headerWideTitle ? getComputedStyle(headerWideTitle) : null;
        const sectionLeadWideStyle = sectionLeadWide ? getComputedStyle(sectionLeadWide) : null;
        const sectionLeadBottomStyle = sectionLeadBottom ? getComputedStyle(sectionLeadBottom) : null;
        const prototypeLeadStyle = prototypeLead ? getComputedStyle(prototypeLead) : null;
        const subsectionTitleWideStyle = subsectionTitleWide ? getComputedStyle(subsectionTitleWide) : null;
        const diagramFrameStyle = diagramFrame ? getComputedStyle(diagramFrame) : null;
        const diagramGraphicStyle = diagramGraphic ? getComputedStyle(diagramGraphic) : null;
        const diagramNodeLabelStyle = diagramNodeLabel ? getComputedStyle(diagramNodeLabel) : null;
        const diagramEdgeLabelStyle = diagramEdgeLabel ? getComputedStyle(diagramEdgeLabel) : null;
        const taskFlowOneStyle = taskFlowOne ? getComputedStyle(taskFlowOne) : null;
        const taskFlowTwoStyle = taskFlowTwo ? getComputedStyle(taskFlowTwo) : null;
        const taskFlowThreeStyle = taskFlowThree ? getComputedStyle(taskFlowThree) : null;
        const taskFlowConnectorStyle = taskFlowConnector ? getComputedStyle(taskFlowConnector) : null;
        const taskFlowNodeCopyStyle = taskFlowNodeCopy ? getComputedStyle(taskFlowNodeCopy) : null;
        const taskFlowEdgeLabelStyle = taskFlowEdgeLabel ? getComputedStyle(taskFlowEdgeLabel) : null;
        const flowFrameListStyle = flowFrameList ? getComputedStyle(flowFrameList) : null;
        const flowFrameBadgeStyle = flowFrameBadge ? getComputedStyle(flowFrameBadge) : null;
        const flowFrameTitleStyle = flowFrameTitle ? getComputedStyle(flowFrameTitle) : null;
        const prototypeBlockStyle = prototypeBlock ? getComputedStyle(prototypeBlock) : null;
        const prototypeGroupStyle = prototypeGroup ? getComputedStyle(prototypeGroup) : null;
        const prototypeCardStyle = prototypeCard ? getComputedStyle(prototypeCard) : null;
        const prototypeCardHeadStyle = prototypeCardHead ? getComputedStyle(prototypeCardHead) : null;
        const prototypeCardBodyStyle = prototypeCardBody ? getComputedStyle(prototypeCardBody) : null;
        const prototypeTitleStyle = prototypeTitle ? getComputedStyle(prototypeTitle) : null;
        const prototypeSubStyle = prototypeSub ? getComputedStyle(prototypeSub) : null;
        const prototypeRuleStyle = prototypeRule ? getComputedStyle(prototypeRule) : null;
        const prototypeConnectorStyle = prototypeConnector ? getComputedStyle(prototypeConnector) : null;
        const prototypeConnectorImgStyle = prototypeConnectorImg ? getComputedStyle(prototypeConnectorImg) : null;
        const overflowNodes = [...document.querySelectorAll('body *')].filter((el) => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && (rect.right > window.innerWidth + 1 || rect.left < -1);
        }).map((el) => ({
          tag: el.tagName,
          className: String(el.className),
          left: Math.round(el.getBoundingClientRect().left),
          right: Math.round(el.getBoundingClientRect().right),
          width: Math.round(el.getBoundingClientRect().width)
        })).slice(0, 8);
        return {
          viewport: window.innerWidth + 'x' + window.innerHeight,
          overflowX: doc.scrollWidth - doc.clientWidth,
          overflowCount: overflowNodes.length,
          overflowNodes,
          oldCounts: {
            topicCard: document.querySelectorAll('.laushu-info-card, .laushu-info-card--illustrated, .laushu-info-card-art').length,
            article: document.querySelectorAll('.laushu-article, .laushu-kicker, .laushu-article-num, .laushu-copy').length,
            guide: document.querySelectorAll('.laushu-guide-grid, .laushu-guide-card, .laushu-guide-marker, .laushu-guide-dot, .laushu-guide-line, .laushu-guide-item').length,
            persona: document.querySelectorAll('.laushu-persona-list, .laushu-persona, .laushu-persona-copy, .laushu-persona-tags').length,
            videoShowcase: document.querySelectorAll('.laushu-demo-list, .laushu-demo-card, .laushu-demo-media-wrap, .laushu-demo-media, .laushu-demo-meta, .laushu-demo-video, .laushu-demo-copy').length,
            reflection: document.querySelectorAll('.laushu-learning-grid, .laushu-learning-card, .laushu-learning-num, .laushu-learning-title').length,
            iteration: document.querySelectorAll('.laushu-iter-list, .laushu-iter-board, .laushu-iter-head, .laushu-iter-badge, .laushu-iter-title, .laushu-iter-body, .laushu-iter-label, .laushu-iter-paras, .laushu-iter-compare, .laushu-iter-frame, .laushu-iter-media, .laushu-iter-card, .laushu-iter-arrow').length,
            mediaFrame: document.querySelectorAll('.laushu-form-card, .laushu-overview-hero, .laushu-journey, .laushu-test-result, .laushu-proto-overview').length,
            explainer: document.querySelectorAll('.laushu-problem-layout, .laushu-problem-copy, .laushu-problem-pill, .laushu-problem-define-title').length,
            textPrimitive: document.querySelectorAll('.laushu-overview-lead, .laushu-problem-cards-title, .laushu-proto-intro').length,
            topicGrid: document.querySelectorAll('.laushu-summary-grid, .laushu-overview-grid, .laushu-problem-grid, .laushu-stakeholder-grid, .laushu-usecase-grid').length,
            flowFrame: document.querySelectorAll('.laushu-fc-list, .laushu-fc-badge, .laushu-fc-title').length,
            prototype: document.querySelectorAll('.laushu-proto-block, .laushu-proto-group').length,
            sectionHeader: document.querySelectorAll('.laushu-head').length,
            heroInfo: document.querySelectorAll('.laushu-info-row').length,
            table: document.querySelectorAll('.laushu-table-wrap, .laushu-research-table, .laushu-th-corner').length,
            survey: document.querySelectorAll('.laushu-survey-flow, .laushu-survey-node, .laushu-survey-mid, .laushu-survey-arrow, .laushu-survey-note, .laushu-survey-stats, .laushu-survey-block-head, .laushu-survey-chart-grid, .laushu-survey-bars, .laushu-survey-bar-groups, .laushu-survey-summary, .laushu-stat-grid, .laushu-stat-card, .laushu-donut-card, .laushu-donut-layout, .laushu-donut, .laushu-donut-track, .laushu-donut-segment, .laushu-donut-center, .laushu-donut-legend, .laushu-donut-dot, .laushu-bar-list, .laushu-bar-row, .laushu-bar-label, .laushu-bar, .laushu-bar-fill, .laushu-insight, .laushu-insight-grid, .laushu-insight-col, .laushu-insight-col-pain, .laushu-insight-label, .laushu-insight-summary').length,
            flowGeometry: document.querySelectorAll('.laushu-diagram, .laushu-flow-svg, .laushu-flow-node-label, .laushu-flow-edge-label, .laushu-task-flow-svg, .laushu-task-flow-svg--one, .laushu-task-flow-svg--two, .laushu-task-flow-svg--three, .laushu-task-connector, .laushu-task-node-copy, .laushu-task-edge-label, .laushu-flow-group, .laushu-flow-visuals').length
          },
          counts: {
            infoRowDivided: document.querySelectorAll('.cs-info-row--divided').length,
            dataTableFrame: document.querySelectorAll('.cs-data-table-frame--wide').length,
            matrixTable: document.querySelectorAll('.cs-data-table--matrix').length,
            matrixCorner: document.querySelectorAll('.cs-data-table-corner').length,
            surveyFlow: document.querySelectorAll('.cs-survey-flow').length,
            surveyNode: document.querySelectorAll('.cs-survey-node').length,
            surveyFlowMid: document.querySelectorAll('.cs-survey-flow-mid').length,
            surveyArrow: document.querySelectorAll('.cs-survey-arrow').length,
            surveyNote: document.querySelectorAll('.cs-survey-note').length,
            surveyPanelStats: document.querySelectorAll('.cs-survey-panel--stats').length,
            surveyPanelInsight: document.querySelectorAll('.cs-survey-panel--insight').length,
            surveyBlockHead: document.querySelectorAll('.cs-survey-block-head').length,
            surveyStatGrid: document.querySelectorAll('.cs-survey-stat-grid').length,
            surveyStatCard: document.querySelectorAll('.cs-survey-stat-card').length,
            surveyChartGrid: document.querySelectorAll('.cs-survey-chart-grid').length,
            surveyDonutCard: document.querySelectorAll('.cs-survey-donut-card').length,
            surveyBars: document.querySelectorAll('.cs-survey-bars').length,
            surveyDonut: document.querySelectorAll('.cs-survey-donut').length,
            surveyDonutSegment: document.querySelectorAll('.cs-survey-donut-segment').length,
            surveyDonutLegend: document.querySelectorAll('.cs-survey-donut-legend').length,
            surveyBarGroups: document.querySelectorAll('.cs-survey-bar-groups').length,
            surveyBarFill: document.querySelectorAll('.cs-survey-bar-fill').length,
            surveyInsightCol: document.querySelectorAll('.cs-survey-insight-col').length,
            surveyInsightLabel: document.querySelectorAll('.cs-survey-insight-label').length,
            surveyInsightSummary: document.querySelectorAll('.cs-survey-insight-summary').length,
            topicCard: document.querySelectorAll('.cs-topic-card').length,
            topicGridOverview: document.querySelectorAll('.cs-topic-grid--overview').length,
            topicGridProblem: document.querySelectorAll('.cs-topic-grid--problem').length,
            topicGridStakeholder: document.querySelectorAll('.cs-topic-grid--stakeholder').length,
            topicGridUsecase: document.querySelectorAll('.cs-topic-grid--usecase').length,
            topicCardKicker: document.querySelectorAll('.cs-topic-card-kicker').length,
            topicCardIllustrated: document.querySelectorAll('.cs-topic-card--illustrated').length,
            topicCardArt: document.querySelectorAll('.cs-topic-card-art').length,
            article: document.querySelectorAll('.cs-article').length,
            articleNum: document.querySelectorAll('.cs-article-num').length,
            richCopy: document.querySelectorAll('.cs-rich-copy').length,
            guideGrid: document.querySelectorAll('.cs-guide-list-grid').length,
            guideCard: document.querySelectorAll('.cs-guide-list-card').length,
            guideListItem: document.querySelectorAll('.cs-guide-list-item').length,
            guideMarker: document.querySelectorAll('.cs-guide-list-marker').length,
            guideDot: document.querySelectorAll('.cs-guide-list-dot').length,
            guideLine: document.querySelectorAll('.cs-guide-list-line').length,
            personaList: document.querySelectorAll('.cs-persona-list').length,
            personaCard: document.querySelectorAll('.cs-persona-card').length,
            personaCopy: document.querySelectorAll('.cs-persona-copy').length,
            personaTags: document.querySelectorAll('.cs-persona-tags').length,
            videoShowcaseList: document.querySelectorAll('.cs-video-showcase-list').length,
            videoShowcaseCard: document.querySelectorAll('.cs-video-showcase-card').length,
            videoShowcaseMedia: document.querySelectorAll('.cs-video-showcase-media').length,
            videoShowcaseMeta: document.querySelectorAll('.cs-video-showcase-meta').length,
            videoShowcaseVideo: document.querySelectorAll('.cs-video-showcase-video').length,
            videoShowcaseCopy: document.querySelectorAll('.cs-video-showcase-copy').length,
            reflectionGrid: document.querySelectorAll('.cs-reflection-grid').length,
            reflectionCard: document.querySelectorAll('.cs-reflection-card').length,
            reflectionNum: document.querySelectorAll('.cs-reflection-card-num').length,
            reflectionTitle: document.querySelectorAll('.cs-reflection-card-title').length,
            iterationList: document.querySelectorAll('.cs-iteration-list').length,
            iterationBoard: document.querySelectorAll('.cs-iteration-board').length,
            iterationHead: document.querySelectorAll('.cs-iteration-head').length,
            iterationBadge: document.querySelectorAll('.cs-iteration-badge').length,
            iterationTitle: document.querySelectorAll('.cs-iteration-title').length,
            iterationBody: document.querySelectorAll('.cs-iteration-body').length,
            iterationLabel: document.querySelectorAll('.cs-iteration-label').length,
            iterationCopy: document.querySelectorAll('.cs-iteration-copy').length,
            iterationCompare: document.querySelectorAll('.cs-iteration-compare').length,
            iterationPanel: document.querySelectorAll('.cs-iteration-panel').length,
            iterationPanelMedia: document.querySelectorAll('.cs-iteration-panel-media').length,
            iterationPanelImage: document.querySelectorAll('.cs-iteration-panel-image').length,
            iterationArrow: document.querySelectorAll('.cs-iteration-arrow').length,
            documentPreview: document.querySelectorAll('.cs-document-preview').length,
            showcaseMedia: document.querySelectorAll('.cs-showcase-media').length,
            showcaseCaptionCenter: document.querySelectorAll('.cs-showcase-media--caption-center').length,
            showcaseFramed: document.querySelectorAll('.cs-showcase-media--framed').length,
            explainerLayout: document.querySelectorAll('.cs-explainer-layout').length,
            explainerCopy: document.querySelectorAll('.cs-explainer-copy').length,
            explainerPill: document.querySelectorAll('.cs-explainer-pill').length,
            explainerTitle: document.querySelectorAll('.cs-explainer-title').length,
            sectionHeaderWide: document.querySelectorAll('.cs-section-header--case-wide').length,
            sectionLeadWide: document.querySelectorAll('.cs-section-lead--wide').length,
            sectionLeadBottomGap: document.querySelectorAll('.cs-section-lead--bottom-gap').length,
            sectionLeadTopGap: document.querySelectorAll('.cs-section-lead--top-gap').length,
            subsectionTitleWide: document.querySelectorAll('.cs-subsection-title--wide').length,
            subsectionTitleAccent: document.querySelectorAll('.cs-subsection-title--accent').length,
            diagramFrameFlow: document.querySelectorAll('.cs-diagram-frame--flow').length,
            diagramGraphicFlow: document.querySelectorAll('.cs-diagram-graphic--flow').length,
            diagramNodeLabel: document.querySelectorAll('.cs-diagram-label--node').length,
            diagramEdgeLabel: document.querySelectorAll('.cs-diagram-label--edge').length,
            taskFlowGraphic: document.querySelectorAll('.cs-task-flow-graphic').length,
            taskFlowOne: document.querySelectorAll('.cs-task-flow-graphic--one').length,
            taskFlowTwo: document.querySelectorAll('.cs-task-flow-graphic--two').length,
            taskFlowThree: document.querySelectorAll('.cs-task-flow-graphic--three').length,
            taskFlowConnector: document.querySelectorAll('.cs-task-flow-connector').length,
            taskFlowNodeCopy: document.querySelectorAll('.cs-task-flow-node-copy').length,
            taskFlowEdgeLabel: document.querySelectorAll('.cs-task-flow-edge-label').length,
            flowFrameList: document.querySelectorAll('.cs-flow-frame-list').length,
            flowFrameBadge: document.querySelectorAll('.cs-flow-frame-badge').length,
            flowFrameTitle: document.querySelectorAll('.cs-flow-frame-title').length,
            prototypeBlock: document.querySelectorAll('.cs-sol-block--prototype').length,
            prototypeGroup: document.querySelectorAll('.cs-sol-fgroup--prototype').length,
            prototypeCard: document.querySelectorAll('.cs-sol-fc').length,
            prototypeCardHead: document.querySelectorAll('.cs-sol-fchead').length,
            prototypeCardBody: document.querySelectorAll('.cs-sol-fcbody').length,
            prototypeTitle: document.querySelectorAll('.cs-sol-ftitle').length,
            prototypeSub: document.querySelectorAll('.cs-sol-fsub').length,
            prototypeRule: document.querySelectorAll('.cs-sol-fhr').length,
            prototypeConnector: document.querySelectorAll('.cs-sol-fconn').length
          },
          heroInfo: infoRowDivided && {
            paddingTop: infoRowDividedStyle.paddingTop,
            borderTopWidth: infoRowDividedStyle.borderTopWidth,
            borderTopStyle: infoRowDividedStyle.borderTopStyle,
            borderTopColor: infoRowDividedStyle.borderTopColor
          },
          dataTable: tableFrame && matrixTable && matrixCorner && matrixCell && {
            frameMaxWidth: tableFrameStyle.maxWidth,
            frameOverflowX: tableFrameStyle.overflowX,
            tableMinWidth: matrixTableStyle.minWidth,
            tableBorderCollapse: matrixTableStyle.borderCollapse,
            headHeight: matrixHeadStyle.height,
            headBg: matrixHeadStyle.backgroundColor,
            cornerBg: matrixCornerStyle.backgroundColor,
            cornerColor: matrixCornerStyle.color,
            cellPadding: matrixCellStyle.padding,
            cellBorderTop: matrixCellStyle.borderTopWidth + " " + matrixCellStyle.borderTopStyle,
            cellColor: matrixCellStyle.color,
            cellLineHeight: matrixCellStyle.lineHeight
          },
          survey: surveyFlow && surveyNode && surveyPanelStats && surveyPanelInsight && surveyStatGrid && surveyChartGrid && surveyDonutSegment && surveyBarGroups && surveyBarFill && surveyInsightGrid && surveyInsightLabel && {
            flowDisplay: surveyFlowStyle.display,
            flowColumns: surveyFlowStyle.gridTemplateColumns,
            flowMaxWidth: surveyFlowStyle.maxWidth,
            nodeDisplay: surveyNodeStyle.display,
            nodeMinHeight: surveyNodeStyle.minHeight,
            nodeRadius: surveyNodeStyle.borderRadius,
            nodeBg: surveyNodeStyle.backgroundColor,
            statsPadding: surveyPanelStatsStyle.padding,
            statsRadius: surveyPanelStatsStyle.borderRadius,
            statsBg: surveyPanelStatsStyle.backgroundColor,
            statGridDisplay: surveyStatGridStyle.display,
            statGridColumns: surveyStatGridStyle.gridTemplateColumns,
            chartGridDisplay: surveyChartGridStyle.display,
            chartGridColumns: surveyChartGridStyle.gridTemplateColumns,
            donutStrokeWidth: surveyDonutSegmentStyle.strokeWidth,
            barGroupsDisplay: surveyBarGroupsStyle.display,
            barGroupsColumns: surveyBarGroupsStyle.gridTemplateColumns,
            barFillDisplay: surveyBarFillStyle.display,
            barFillBg: surveyBarFillStyle.backgroundColor,
            insightPadding: surveyPanelInsightStyle.padding,
            insightRadius: surveyPanelInsightStyle.borderRadius,
            insightBg: surveyPanelInsightStyle.backgroundImage,
            insightGridDisplay: surveyInsightGridStyle.display,
            insightGridColumns: surveyInsightGridStyle.gridTemplateColumns,
            insightLabelDisplay: surveyInsightLabelStyle.display,
            insightLabelRadius: surveyInsightLabelStyle.borderRadius
          },
          topicCard: topicCard && {
            padding: topicCardStyle.padding,
            minHeight: topicCardStyle.minHeight,
            radius: topicCardStyle.borderRadius,
            border: topicCardStyle.borderTopColor,
            shadow: topicCardStyle.boxShadow
          },
          usecaseGrid: usecaseGrid && usecaseCard && {
            display: usecaseGridStyle.display,
            maxWidth: usecaseGridStyle.maxWidth,
            marginTop: usecaseGridStyle.marginTop,
            cardMinHeight: usecaseCardStyle.minHeight,
            cardPadding: usecaseCardStyle.padding,
            cardBg: usecaseCardStyle.backgroundColor
          },
          topicKicker: topicKicker && {
            display: topicKickerStyle.display,
            bg: topicKickerStyle.backgroundColor,
            color: topicKickerStyle.color,
            fontWeight: topicKickerStyle.fontWeight
          },
          topicArt: topicArt && {
            display: topicArtStyle.display,
            width: topicArtStyle.width,
            height: topicArtStyle.height,
            radius: topicArtStyle.borderRadius
          },
          article: article && articleHeading && richCopy && {
            maxWidth: articleStyle.maxWidth,
            titleColor: articleHeadingStyle.color,
            titleWeight: articleHeadingStyle.fontWeight,
            numColor: articleNumStyle?.color,
            copyColor: richCopyStyle.color,
            copyLineHeight: richCopyStyle.lineHeight
          },
          guide: guideGrid && guideCard && guideTitle && guideListItem && guideMarker && guideDot && guideLine && {
            gridDisplay: guideGridStyle.display,
            gridColumns: guideGridStyle.gridTemplateColumns,
            cardPadding: guideCardStyle.padding,
            cardRadius: guideCardStyle.borderRadius,
            cardOverflow: guideCardStyle.overflow,
            cardShadow: guideCardStyle.boxShadow,
            titleBg: guideTitleStyle.backgroundImage,
            titleWeight: guideTitleStyle.fontWeight,
            titleWhiteSpace: guideTitleStyle.whiteSpace,
            itemDisplay: guideListItemStyle.display,
            markerDisplay: guideMarkerStyle.display,
            dotWidth: guideDotStyle.width,
            dotBg: guideDotStyle.backgroundColor,
            lineDisplay: guideLineStyle.display,
            lineWidth: guideLineStyle.width
          },
          persona: personaList && personaCard && personaCopy && personaTags && personaMedia && {
            listDisplay: personaListStyle.display,
            cardDisplay: personaCardStyle.display,
            cardColumns: personaCardStyle.gridTemplateColumns,
            cardPadding: personaCardStyle.padding,
            cardRadius: personaCardStyle.borderRadius,
            cardBg: personaCardStyle.backgroundColor,
            cardShadow: personaCardStyle.boxShadow,
            copyAlignSelf: personaCopyStyle.alignSelf,
            tagsDisplay: personaTagsStyle.display,
            tagsColor: personaTagsStyle.color,
            mediaOrder: personaMediaStyle.order,
            mediaRadius: personaMediaStyle.borderRadius
          },
          videoShowcase: videoList && videoCard && videoMedia && videoMeta && video && videoCopy && {
            listDisplay: videoListStyle.display,
            cardDisplay: videoCardStyle.display,
            cardColumns: videoCardStyle.gridTemplateColumns,
            cardRadius: videoCardStyle.borderRadius,
            cardOverflow: videoCardStyle.overflow,
            mediaPosition: videoMediaStyle.position,
            mediaAspectRatio: videoMediaStyle.aspectRatio,
            metaPosition: videoMetaStyle.position,
            metaDisplay: videoMetaStyle.display,
            videoDisplay: videoStyle.display,
            videoObjectFit: videoStyle.objectFit,
            copyDisplay: videoCopyStyle.display
          },
          reflection: reflectionGrid && reflectionCard && reflectionNum && reflectionTitle && {
            gridDisplay: reflectionGridStyle.display,
            gridGap: reflectionGridStyle.gap,
            gridMaxWidth: reflectionGridStyle.maxWidth,
            gridMarginTop: reflectionGridStyle.marginTop,
            gridAlignItems: reflectionGridStyle.alignItems,
            cardAlignItems: reflectionCardStyle.alignItems,
            cardRadius: reflectionCardStyle.borderRadius,
            numDisplay: reflectionNumStyle.display,
            numRadius: reflectionNumStyle.borderRadius,
            numWeight: reflectionNumStyle.fontWeight,
            titleWeight: reflectionTitleStyle.fontWeight,
            titleLineHeight: reflectionTitleStyle.lineHeight
          },
          iteration: iterationList && iterationBoard && iterationHead && iterationBadge && iterationTitle && iterationBody && iterationLabel && iterationCopy && iterationCompare && iterationPanel && iterationCaption && iterationPanelMedia && iterationPanelImage && iterationArrow && {
            listDisplay: iterationListStyle.display,
            boardDisplay: iterationBoardStyle.display,
            boardRadius: iterationBoardStyle.borderRadius,
            boardPadding: iterationBoardStyle.padding,
            headDisplay: iterationHeadStyle.display,
            badgeDisplay: iterationBadgeStyle.display,
            badgeRadius: iterationBadgeStyle.borderRadius,
            badgeWeight: iterationBadgeStyle.fontWeight,
            titleWeight: iterationTitleStyle.fontWeight,
            bodyDisplay: iterationBodyStyle.display,
            bodyColumns: iterationBodyStyle.gridTemplateColumns,
            labelWeight: iterationLabelStyle.fontWeight,
            copyDisplay: iterationCopyStyle.display,
            compareDisplay: iterationCompareStyle.display,
            compareDirection: iterationCompareStyle.flexDirection,
            panelPosition: iterationPanelStyle.position,
            panelRadius: iterationPanelStyle.borderRadius,
            panelOverflow: iterationPanelStyle.overflow,
            captionDisplay: iterationCaptionStyle.display,
            captionWeight: iterationCaptionStyle.fontWeight,
            mediaDisplay: iterationPanelMediaStyle.display,
            imageDisplay: iterationPanelImageStyle.display,
            arrowPosition: iterationArrowStyle.position,
            arrowTransform: iterationArrowStyle.transform
          },
          mediaFrame: documentPreview && documentPreviewFrame && documentPreviewCaption && showcaseMedia && showcaseFrame && showcaseCaption && showcaseFramedFrame && {
            documentDisplay: documentPreviewStyle.display,
            documentPadding: documentPreviewFrameStyle.padding,
            documentRadius: documentPreviewFrameStyle.borderRadius,
            documentBorder: documentPreviewFrameStyle.borderTopStyle,
            documentShadow: documentPreviewFrameStyle.boxShadow,
            documentCaptionAlign: documentPreviewCaptionStyle.textAlign,
            showcaseDisplay: showcaseMediaStyle.display,
            showcaseRadius: showcaseFrameStyle.borderRadius,
            showcaseOverflow: showcaseFrameStyle.overflow,
            captionAlign: showcaseCaptionStyle.textAlign,
            captionWeight: showcaseCaptionStyle.fontWeight,
            framedRadius: showcaseFramedFrameStyle.borderRadius,
            framedBorder: showcaseFramedFrameStyle.borderTopStyle,
            framedShadow: showcaseFramedFrameStyle.boxShadow
          },
          explainer: explainerLayout && explainerCopy && explainerPill && explainerTitle && explainerBody && {
            layoutDisplay: explainerLayoutStyle.display,
            layoutColumns: explainerLayoutStyle.gridTemplateColumns,
            layoutAlign: explainerLayoutStyle.alignItems,
            copyMinWidth: explainerCopyStyle.minWidth,
            pillDisplay: explainerPillStyle.display,
            pillRadius: explainerPillStyle.borderRadius,
            pillWeight: explainerPillStyle.fontWeight,
            titleWeight: explainerTitleStyle.fontWeight,
            titleColor: explainerTitleStyle.color,
            titleMarginBottom: explainerTitleStyle.marginBottom,
            bodyLineHeight: explainerBodyStyle.lineHeight
          },
          sectionHeader: headerWide && headerWideKicker && headerWideTitle && {
            maxWidth: headerWideStyle.maxWidth,
            kickerColor: headerWideKickerStyle.color,
            titleColor: headerWideTitleStyle.color,
            titleWeight: headerWideTitleStyle.fontWeight,
            titleMarginBottom: headerWideTitleStyle.marginBottom
          },
          textPrimitive: sectionLeadWide && sectionLeadBottom && prototypeLead && subsectionTitleWide && {
            leadMaxWidth: sectionLeadWideStyle.maxWidth,
            leadBottomMargin: sectionLeadBottomStyle.marginBottom,
            prototypeLineHeight: prototypeLeadStyle.lineHeight,
            subsectionMaxWidth: subsectionTitleWideStyle.maxWidth,
            subsectionWeight: subsectionTitleWideStyle.fontWeight,
            subsectionColor: subsectionTitleWideStyle.color
          },
          flowGeometry: diagramFrame && diagramGraphic && diagramNodeLabel && diagramEdgeLabel && taskFlowOne && taskFlowTwo && taskFlowThree && taskFlowConnector && taskFlowNodeCopy && taskFlowEdgeLabel && {
            diagramFrameDisplay: diagramFrameStyle.display,
            diagramFrameMaxWidth: diagramFrameStyle.maxWidth,
            diagramFrameOverflowX: diagramFrameStyle.overflowX,
            diagramGraphicDisplay: diagramGraphicStyle.display,
            diagramGraphicMinWidth: diagramGraphicStyle.minWidth,
            diagramNodeSize: diagramNodeLabelStyle.fontSize,
            diagramNodeWeight: diagramNodeLabelStyle.fontWeight,
            diagramEdgeSize: diagramEdgeLabelStyle.fontSize,
            diagramEdgeWeight: diagramEdgeLabelStyle.fontWeight,
            taskOneWidth: taskFlowOneStyle.width,
            taskOneMinWidth: taskFlowOneStyle.minWidth,
            taskTwoWidth: taskFlowTwoStyle.width,
            taskTwoMinWidth: taskFlowTwoStyle.minWidth,
            taskThreeWidth: taskFlowThreeStyle.width,
            taskThreeMinWidth: taskFlowThreeStyle.minWidth,
            taskConnectorStrokeWidth: taskFlowConnectorStyle.strokeWidth,
            taskNodeDisplay: taskFlowNodeCopyStyle.display,
            taskNodeFontSize: taskFlowNodeCopyStyle.fontSize,
            taskNodeFontWeight: taskFlowNodeCopyStyle.fontWeight,
            taskEdgeDisplay: taskFlowEdgeLabelStyle.display,
            taskEdgeFontSize: taskFlowEdgeLabelStyle.fontSize
          },
          flowFrame: flowFrameList && flowFrameBadge && flowFrameTitle && {
            listDisplay: flowFrameListStyle.display,
            listGap: flowFrameListStyle.rowGap,
            listMaxWidth: flowFrameListStyle.maxWidth,
            badgeBg: flowFrameBadgeStyle.backgroundColor,
            badgeColor: flowFrameBadgeStyle.color,
            badgeWeight: flowFrameBadgeStyle.fontWeight,
            titleColor: flowFrameTitleStyle.color,
            titleWeight: flowFrameTitleStyle.fontWeight
          },
          prototype: prototypeBlock && prototypeGroup && prototypeCard && prototypeCardHead && prototypeCardBody && prototypeTitle && prototypeSub && prototypeRule && prototypeConnector && prototypeConnectorImg && {
            blockDisplay: prototypeBlockStyle.display,
            blockGap: prototypeBlockStyle.rowGap,
            blockMaxWidth: prototypeBlockStyle.maxWidth,
            blockMarginTop: prototypeBlockStyle.marginTop,
            groupDisplay: prototypeGroupStyle.display,
            cardWidth: prototypeCardStyle.width,
            cardOverflow: prototypeCardStyle.overflow,
            cardRadius: prototypeCardStyle.borderRadius,
            cardBorder: prototypeCardStyle.borderTopStyle,
            cardHeadPadding: prototypeCardHeadStyle.padding,
            cardBodyPadding: prototypeCardBodyStyle.padding,
            titleWeight: prototypeTitleStyle.fontWeight,
            titleLineHeight: prototypeTitleStyle.lineHeight,
            subLineHeight: prototypeSubStyle.lineHeight,
            ruleHeight: prototypeRuleStyle.height,
            ruleMarginBottom: prototypeRuleStyle.marginBottom,
            connectorDisplay: prototypeConnectorStyle.display,
            connectorWidth: prototypeConnectorStyle.width,
            connectorMarginTop: prototypeConnectorStyle.marginTop,
            connectorMarginBottom: prototypeConnectorStyle.marginBottom,
            connectorImgDisplay: prototypeConnectorImgStyle.display
          }
        };
      })()`,
    });

    results.push({
      ...result.value,
      consoleErrors: pageErrors.length,
      firstError:
        pageErrors[0]?.exceptionDetails?.exception?.description ||
        pageErrors[0]?.exceptionDetails?.text ||
        pageErrors[0]?.args?.[0]?.value ||
        pageErrors[0]?.text ||
        null,
    });
  }

  const failed = results.some((result) => (
    result.overflowX !== 0 ||
    result.oldCounts.topicCard !== 0 ||
    result.oldCounts.article !== 0 ||
    result.oldCounts.guide !== 0 ||
    result.oldCounts.persona !== 0 ||
    result.oldCounts.videoShowcase !== 0 ||
    result.oldCounts.reflection !== 0 ||
    result.oldCounts.iteration !== 0 ||
    result.oldCounts.mediaFrame !== 0 ||
    result.oldCounts.explainer !== 0 ||
    result.oldCounts.textPrimitive !== 0 ||
    result.oldCounts.topicGrid !== 0 ||
    result.oldCounts.flowFrame !== 0 ||
    result.oldCounts.prototype !== 0 ||
    result.oldCounts.sectionHeader !== 0 ||
    result.oldCounts.heroInfo !== 0 ||
    result.oldCounts.table !== 0 ||
    result.oldCounts.survey !== 0 ||
    result.oldCounts.flowGeometry !== 0 ||
    result.counts.infoRowDivided !== 1 ||
    result.counts.dataTableFrame !== 1 ||
    result.counts.matrixTable !== 1 ||
    result.counts.matrixCorner !== 1 ||
    result.counts.surveyFlow !== 1 ||
    result.counts.surveyNode !== 2 ||
    result.counts.surveyFlowMid !== 1 ||
    result.counts.surveyArrow !== 1 ||
    result.counts.surveyNote !== 1 ||
    result.counts.surveyPanelStats !== 1 ||
    result.counts.surveyPanelInsight !== 1 ||
    result.counts.surveyBlockHead !== 2 ||
    result.counts.surveyStatGrid !== 1 ||
    result.counts.surveyStatCard !== 3 ||
    result.counts.surveyChartGrid !== 1 ||
    result.counts.surveyDonutCard !== 1 ||
    result.counts.surveyBars !== 2 ||
    result.counts.surveyDonut !== 1 ||
    result.counts.surveyDonutSegment !== 4 ||
    result.counts.surveyDonutLegend !== 1 ||
    result.counts.surveyBarGroups !== 1 ||
    result.counts.surveyBarFill !== 8 ||
    result.counts.surveyInsightCol !== 2 ||
    result.counts.surveyInsightLabel !== 2 ||
    result.counts.surveyInsightSummary !== 1 ||
    result.counts.topicCard !== 13 ||
    result.counts.topicGridOverview !== 1 ||
    result.counts.topicGridProblem !== 1 ||
    result.counts.topicGridStakeholder !== 1 ||
    result.counts.topicGridUsecase !== 1 ||
    result.counts.topicCardKicker !== 7 ||
    result.counts.topicCardIllustrated !== 3 ||
    result.counts.topicCardArt !== 3 ||
    result.counts.article !== 10 ||
    result.counts.articleNum !== 10 ||
    result.counts.richCopy !== 10 ||
    result.counts.guideGrid !== 1 ||
    result.counts.guideCard !== 3 ||
    result.counts.guideListItem !== 6 ||
    result.counts.guideMarker !== 6 ||
    result.counts.guideDot !== 6 ||
    result.counts.guideLine !== 6 ||
    result.counts.personaList !== 1 ||
    result.counts.personaCard !== 3 ||
    result.counts.personaCopy !== 3 ||
    result.counts.personaTags !== 3 ||
    result.counts.videoShowcaseList !== 1 ||
    result.counts.videoShowcaseCard !== 3 ||
    result.counts.videoShowcaseMedia !== 3 ||
    result.counts.videoShowcaseMeta !== 3 ||
    result.counts.videoShowcaseVideo !== 3 ||
    result.counts.videoShowcaseCopy !== 3 ||
    result.counts.reflectionGrid !== 1 ||
    result.counts.reflectionCard !== 3 ||
    result.counts.reflectionNum !== 3 ||
    result.counts.reflectionTitle !== 3 ||
    result.counts.iterationList !== 1 ||
    result.counts.iterationBoard !== 6 ||
    result.counts.iterationHead !== 6 ||
    result.counts.iterationBadge !== 6 ||
    result.counts.iterationTitle !== 6 ||
    result.counts.iterationBody !== 6 ||
    result.counts.iterationLabel !== 6 ||
    result.counts.iterationCopy !== 6 ||
    result.counts.iterationCompare !== 6 ||
    result.counts.iterationPanel !== 12 ||
    result.counts.iterationPanelMedia !== 12 ||
    result.counts.iterationPanelImage !== 12 ||
    result.counts.iterationArrow !== 6 ||
    result.counts.documentPreview !== 1 ||
    result.counts.showcaseMedia !== 4 ||
    result.counts.showcaseCaptionCenter !== 1 ||
    result.counts.showcaseFramed !== 1 ||
    result.counts.explainerLayout !== 1 ||
    result.counts.explainerCopy !== 1 ||
    result.counts.explainerPill !== 1 ||
    result.counts.explainerTitle !== 1 ||
    result.counts.sectionHeaderWide !== 8 ||
    result.counts.sectionLeadWide !== 2 ||
    result.counts.sectionLeadBottomGap !== 1 ||
    result.counts.sectionLeadTopGap !== 1 ||
    result.counts.subsectionTitleWide !== 1 ||
    result.counts.subsectionTitleAccent !== 1 ||
    result.counts.diagramFrameFlow !== 1 ||
    result.counts.diagramGraphicFlow !== 1 ||
    result.counts.diagramNodeLabel !== 3 ||
    result.counts.diagramEdgeLabel !== 5 ||
    result.counts.taskFlowGraphic !== 3 ||
    result.counts.taskFlowOne !== 1 ||
    result.counts.taskFlowTwo !== 1 ||
    result.counts.taskFlowThree !== 1 ||
    result.counts.taskFlowConnector !== 50 ||
    result.counts.taskFlowNodeCopy !== 42 ||
    result.counts.taskFlowEdgeLabel !== 9 ||
    result.counts.flowFrameList !== 1 ||
    result.counts.flowFrameBadge !== 3 ||
    result.counts.flowFrameTitle !== 3 ||
    result.counts.prototypeBlock !== 1 ||
    result.counts.prototypeGroup !== 3 ||
    result.counts.prototypeCard !== 3 ||
    result.counts.prototypeCardHead !== 3 ||
    result.counts.prototypeCardBody !== 3 ||
    result.counts.prototypeTitle !== 3 ||
    result.counts.prototypeSub !== 3 ||
    result.counts.prototypeRule !== 2 ||
    result.counts.prototypeConnector !== 12 ||
    result.heroInfo?.paddingTop !== "8px" ||
    result.heroInfo?.borderTopWidth !== "1px" ||
    result.heroInfo?.borderTopStyle !== "solid" ||
    result.dataTable?.frameMaxWidth !== "1920px" ||
    result.dataTable?.frameOverflowX !== "auto" ||
    result.dataTable?.tableMinWidth !== "952px" ||
    result.dataTable?.tableBorderCollapse !== "separate" ||
    !["51px", "53px"].includes(result.dataTable?.headHeight) ||
    result.dataTable?.cellPadding !== "15px 16px" ||
    result.dataTable?.cellBorderTop !== "1px solid" ||
    result.survey?.flowDisplay !== "grid" ||
    result.survey?.flowMaxWidth !== "1920px" ||
    result.survey?.nodeDisplay !== "flex" ||
    result.survey?.nodeMinHeight !== "137px" ||
    result.survey?.nodeRadius !== "20px" ||
    result.survey?.statsPadding !== (result.viewport.startsWith("390") ? "24px" : "32px") ||
    result.survey?.statsRadius !== "20px" ||
    result.survey?.statGridDisplay !== "grid" ||
    result.survey?.chartGridDisplay !== "grid" ||
    result.survey?.donutStrokeWidth !== "18px" ||
    result.survey?.barGroupsDisplay !== "grid" ||
    result.survey?.barFillDisplay !== "block" ||
    result.survey?.insightPadding !== (result.viewport.startsWith("390") ? "24px" : "32px") ||
    result.survey?.insightRadius !== "20px" ||
    result.survey?.insightGridDisplay !== "grid" ||
    !["inline-flex", "flex"].includes(result.survey?.insightLabelDisplay) ||
    result.survey?.insightLabelRadius !== "999px" ||
    result.topicCard?.radius !== "16px" ||
    result.usecaseGrid?.display !== "grid" ||
    result.usecaseGrid?.marginTop !== "40px" ||
    result.usecaseGrid?.cardMinHeight !== "284px" ||
    !["flex", "inline-flex"].includes(result.topicKicker?.display) ||
    result.topicKicker?.fontWeight !== "700" ||
    result.topicArt?.display !== "flex" ||
    result.article?.titleWeight !== "800" ||
    result.guide?.gridDisplay !== "grid" ||
    result.guide?.cardRadius !== "18px" ||
    result.guide?.cardOverflow !== "hidden" ||
    result.guide?.titleWeight !== "800" ||
    result.guide?.itemDisplay !== "flex" ||
    result.guide?.markerDisplay !== "flex" ||
    result.guide?.dotWidth !== "10px" ||
    result.guide?.lineWidth !== "1px" ||
    result.persona?.listDisplay !== "grid" ||
    result.persona?.cardDisplay !== "grid" ||
    result.persona?.cardRadius !== "16px" ||
    result.persona?.tagsDisplay !== "block" ||
    result.videoShowcase?.listDisplay !== "grid" ||
    result.videoShowcase?.cardDisplay !== "grid" ||
    result.videoShowcase?.cardRadius !== "16px" ||
    result.videoShowcase?.cardOverflow !== "hidden" ||
    result.videoShowcase?.mediaPosition !== "relative" ||
    result.videoShowcase?.metaPosition !== "absolute" ||
    result.videoShowcase?.metaDisplay !== "flex" ||
    result.videoShowcase?.videoDisplay !== "block" ||
    result.videoShowcase?.videoObjectFit !== "cover" ||
    result.videoShowcase?.copyDisplay !== "flex" ||
    result.reflection?.gridDisplay !== "grid" ||
    result.reflection?.gridGap !== "24px" ||
    result.reflection?.gridMaxWidth !== "1920px" ||
    result.reflection?.gridMarginTop !== "24px" ||
    result.reflection?.gridAlignItems !== "stretch" ||
    result.reflection?.cardAlignItems !== "flex-start" ||
    result.reflection?.cardRadius !== "16px" ||
    !["inline-flex", "flex"].includes(result.reflection?.numDisplay) ||
    result.reflection?.numWeight !== "800" ||
    result.reflection?.titleWeight !== "800" ||
    result.iteration?.listDisplay !== "flex" ||
    result.iteration?.boardDisplay !== "flex" ||
    result.iteration?.boardRadius !== "20px" ||
    result.iteration?.headDisplay !== "flex" ||
    result.iteration?.badgeRadius !== "999px" ||
    result.iteration?.badgeWeight !== "600" ||
    result.iteration?.titleWeight !== "800" ||
    result.iteration?.bodyDisplay !== "grid" ||
    result.iteration?.labelWeight !== "800" ||
    result.iteration?.copyDisplay !== "flex" ||
    result.iteration?.compareDisplay !== "flex" ||
    result.iteration?.panelPosition !== "relative" ||
    result.iteration?.panelRadius !== "16px" ||
    result.iteration?.panelOverflow !== "hidden" ||
    result.iteration?.captionDisplay !== "flex" ||
    result.iteration?.captionWeight !== "700" ||
    result.iteration?.mediaDisplay !== "flex" ||
    result.iteration?.imageDisplay !== "block" ||
    result.iteration?.arrowPosition !== "relative" ||
    result.mediaFrame?.documentPadding !== (result.viewport.startsWith("390") ? "20px" : "28px") ||
    result.mediaFrame?.documentRadius !== "18px" ||
    result.mediaFrame?.documentBorder !== "solid" ||
    result.mediaFrame?.documentCaptionAlign !== "center" ||
    result.mediaFrame?.showcaseRadius !== "20px" ||
    result.mediaFrame?.showcaseOverflow !== "hidden" ||
    result.mediaFrame?.captionAlign !== "center" ||
    result.mediaFrame?.captionWeight !== "700" ||
    result.mediaFrame?.framedRadius !== "16px" ||
    result.mediaFrame?.framedBorder !== "solid" ||
    result.explainer?.layoutDisplay !== "grid" ||
    result.explainer?.layoutAlign !== "start" ||
    result.explainer?.copyMinWidth !== "0px" ||
    !["inline-flex", "flex"].includes(result.explainer?.pillDisplay) ||
    result.explainer?.pillRadius !== "999px" ||
    result.explainer?.pillWeight !== "700" ||
    result.explainer?.titleWeight !== "800" ||
    result.explainer?.titleMarginBottom !== "40px" ||
    result.sectionHeader?.maxWidth !== "1920px" ||
    result.sectionHeader?.titleWeight !== "700" ||
    result.sectionHeader?.titleMarginBottom !== "24px" ||
    result.textPrimitive?.leadBottomMargin !== "40px" ||
    result.textPrimitive?.prototypeLineHeight !== "27.2px" ||
    result.textPrimitive?.subsectionWeight !== "800" ||
    result.flowGeometry?.diagramFrameDisplay !== "block" ||
    result.flowGeometry?.diagramFrameMaxWidth !== "1000px" ||
    result.flowGeometry?.diagramFrameOverflowX !== "auto" ||
    result.flowGeometry?.diagramGraphicDisplay !== "block" ||
    result.flowGeometry?.diagramGraphicMinWidth !== (result.viewport.startsWith("390") ? "0px" : "560px") ||
    result.flowGeometry?.diagramNodeSize !== "24px" ||
    result.flowGeometry?.diagramNodeWeight !== "800" ||
    result.flowGeometry?.diagramEdgeSize !== "20px" ||
    result.flowGeometry?.diagramEdgeWeight !== "600" ||
    result.flowGeometry?.taskOneWidth !== "1018px" ||
    result.flowGeometry?.taskOneMinWidth !== "1018px" ||
    result.flowGeometry?.taskTwoWidth !== "950px" ||
    result.flowGeometry?.taskTwoMinWidth !== "950px" ||
    result.flowGeometry?.taskThreeWidth !== "1900px" ||
    result.flowGeometry?.taskThreeMinWidth !== "1900px" ||
    result.flowGeometry?.taskConnectorStrokeWidth !== "2px" ||
    result.flowGeometry?.taskNodeDisplay !== "flex" ||
    result.flowGeometry?.taskNodeFontSize !== "23px" ||
    result.flowGeometry?.taskNodeFontWeight !== "500" ||
    result.flowGeometry?.taskEdgeDisplay !== "flex" ||
    result.flowGeometry?.taskEdgeFontSize !== "17px" ||
    result.flowFrame?.listDisplay !== "flex" ||
    result.flowFrame?.listGap !== "40px" ||
    result.flowFrame?.badgeWeight !== "700" ||
    result.flowFrame?.titleWeight !== "800" ||
    result.prototype?.blockDisplay !== "flex" ||
    result.prototype?.blockGap !== "28px" ||
    result.prototype?.blockMaxWidth !== "1920px" ||
    result.prototype?.blockMarginTop !== "40px" ||
    result.prototype?.groupDisplay !== "contents" ||
    result.prototype?.cardWidth !== (result.viewport.startsWith("390") ? "301.219px" : "958px") ||
    result.prototype?.cardOverflow !== "hidden" ||
    result.prototype?.cardRadius !== "18px" ||
    result.prototype?.cardBorder !== "solid" ||
    result.prototype?.cardHeadPadding !== "24px 28px" ||
    result.prototype?.cardBodyPadding !== "24px 28px 28px" ||
    result.prototype?.titleWeight !== "800" ||
    result.prototype?.subLineHeight !== "22.4px" ||
    result.prototype?.ruleHeight !== "1px" ||
    result.prototype?.ruleMarginBottom !== "40px" ||
    result.prototype?.connectorDisplay !== (result.viewport.startsWith("390") ? "none" : "block") ||
    (result.viewport.startsWith("390") ? false : result.prototype?.connectorMarginTop !== "-68px") ||
    (result.viewport.startsWith("390") ? false : result.prototype?.connectorMarginBottom !== "-28px") ||
    (result.viewport.startsWith("390") ? false : result.prototype?.connectorImgDisplay !== "block") ||
    result.consoleErrors !== 0
  ));

  console.log(JSON.stringify(results, null, 2));
  if (failed) process.exitCode = 1;

  page.close();
  browser.close();
} finally {
  chrome.kill("SIGTERM");
  await rm(userDataDir, { recursive: true, force: true }).catch(() => {});
}
