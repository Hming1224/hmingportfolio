import { spawn } from "node:child_process";
import { readFile, rm } from "node:fs/promises";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const url = "http://localhost:3000/zh-TW/crypto-arsenal";
const userDataDir = `/private/tmp/hming-crypto-card-cdp-${process.pid}-${Date.now()}`;
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
        const firstPain = document.querySelector('#cs-sec-problem > .cs-grid .cs-card');
        const painQuoteText = firstPain?.querySelector('.cs-quote-text');
        const painQuoteMeta = firstPain?.querySelector('.cs-quote-meta');
        const painQuoteName = firstPain?.querySelector('.cs-quote-name');
        const painQuoteLine = firstPain?.querySelector('.cs-quote-line');
        const painQuoteRole = firstPain?.querySelector('.cs-quote-role');
        const painAvatar = firstPain?.querySelector('.cs-avatar');
        const painAvatarImg = firstPain?.querySelector('.cs-avatar-img');
        const firstReflect = document.querySelector('#cs-sec-reflect > .cs-grid .cs-card');
        const badDecision = document.querySelector('.ca-dcard-bad');
        const goodDecision = document.querySelector('.ca-dcard-good');
        const researchInfo = document.querySelector('#cs-sec-research .cs-grid--aside-main > .cs-card:first-child');
        const researchPanelHead = researchInfo?.querySelector('.cs-panel-head');
        const researchPanelBody = researchInfo?.querySelector('.cs-panel-body');
        const researchPanelText = researchPanelBody?.querySelector('p');
        const researchChip = researchInfo?.querySelector('.cs-info-chip');
        const researchChipLabel = researchChip?.querySelector('.cs-info-chip-label');
        const researchChipBody = researchChip?.querySelector('.cs-info-chip-body');
        const researchShot = document.querySelector('.cs-grid--research-shots > .cs-card');
        const researchBrandLabel = researchShot?.querySelector('.cs-brand-label');
        const researchBrandMark = researchShot?.querySelector('.cs-brand-mark');
        const researchBrandName = researchShot?.querySelector('.cs-brand-name');
        const researchMedia = researchShot?.querySelector('.cs-media-frame');
        const iterationBoard = document.querySelector('#cs-sec-iteration > .cs-card');
        const iterationHead = iterationBoard?.querySelector('.cs-card-heading-row');
        const iterationBadge = iterationBoard?.querySelector('.cs-pill-badge');
        const iterationTitle = iterationBoard?.querySelector('.cs-card-heading-title');
        const iterationDetailRow = iterationBoard?.querySelector('.cs-detail-row');
        const iterationDetailLabel = iterationBoard?.querySelector('.cs-detail-label');
        const iterationDetailBody = iterationBoard?.querySelector('.cs-detail-body');
        const iterationDetailParagraph = iterationDetailBody?.querySelector('p');
        const impactQuote = document.querySelector('#cs-sec-impact > .cs-grid--quote-list > .cs-card');
        const impactQuoteText = impactQuote?.querySelector('.cs-quote-text');
        const impactQuoteMeta = impactQuote?.querySelector('.cs-quote-meta');
        const impactQuoteName = impactQuote?.querySelector('.cs-quote-name');
        const impactQuoteLine = impactQuote?.querySelector('.cs-quote-line');
        const impactQuoteRole = impactQuote?.querySelector('.cs-quote-role');
        const roleNode = document.querySelector('.cs-step-flow-item > .cs-card');
        const roleArrow = document.querySelector('.cs-step-flow-arrow');
        const roleTitle = document.querySelector('.cs-step-flow-title');
        const finalMedia = document.querySelector('#cs-sec-final .cs-media');
        const finalBanner = document.querySelector('#cs-sec-final .cs-proposal-banner');
        const finalBannerKicker = finalBanner?.querySelector('.cs-proposal-banner-kicker');
        const finalBannerTitle = finalBanner?.querySelector('.cs-proposal-banner-title');
        const impactMetricGrid = document.querySelector('#cs-sec-impact .cs-metric-grid');
        const impactMetric = impactMetricGrid?.querySelector('.cs-card--metric');
        const impactMetricValue = impactMetric?.querySelector('.cs-metric-value');
        const impactMetricLabel = impactMetric?.querySelector('.cs-metric-label');
        const impactMetricBody = impactMetric?.querySelector('.cs-metric-body');
        const impactTable = document.querySelector('#cs-sec-impact .cs-data-table');
        const impactTableHeadCell = impactTable?.querySelector('thead th');
        const impactTableBodyHead = impactTable?.querySelector('tbody th');
        const impactTableBodyCell = impactTable?.querySelector('tbody td');
        const impactTableMuted = impactTable?.querySelector('.cs-data-table-value--muted');
        const impactTableStrong = impactTable?.querySelector('.cs-data-table-value--strong');
        const impactTablePositive = impactTable?.querySelector('.cs-data-table-value--positive');
        const impactCompareLabel = document.querySelector('#cs-sec-impact .cs-media-label');
        const impactMethod = document.querySelector('#cs-sec-impact .cs-section-note');
        const researchFlowBoard = document.querySelector('#cs-sec-research > .cs-card');
        const researchSubflowTitle = researchFlowBoard?.querySelector('.cs-subsection-title');
        const diagram = document.querySelector('.cs-diagram-graphic');
        const diagramLabel = document.querySelector('.cs-diagram-label');
        const diagramStrongLabel = document.querySelector('.cs-diagram-label-strong');
        const diagramCurrency = document.querySelector('.cs-diagram-currency');
        const videoButton = document.querySelector('.cs-video-lightbox-button');
        const videoThumb = document.querySelector('.cs-video-lightbox-thumb');
        const maskedVideo = document.querySelector('.cs-video-lightbox--masked');
        const matrix = document.querySelector('.cs-comparison-matrix');
        const matrixHead = matrix?.querySelector('.cs-comparison-matrix-head');
        const matrixStep = matrix?.querySelector('.cs-comparison-matrix-step');
        const matrixStepNum = matrix?.querySelector('.cs-comparison-matrix-step-num');
        const matrixRow = matrix?.querySelector('.cs-comparison-matrix-row');
        const matrixLabel = matrix?.querySelector('.cs-comparison-matrix-label');
        const matrixLabelName = matrix?.querySelector('.cs-comparison-matrix-label-name');
        const matrixCell = matrix?.querySelector('.cs-comparison-matrix-cell');
        const matrixNote = matrix?.querySelector('.cs-comparison-matrix-cell-note');
        const stepZoom = matrix?.querySelector('.cs-step-zoom');
        const insightCallout = document.querySelector('.cs-insight-callout');
        const insightCalloutIcon = insightCallout?.querySelector('.cs-insight-callout-icon');
        const painStyle = firstPain ? getComputedStyle(firstPain) : null;
        const reflectStyle = firstReflect ? getComputedStyle(firstReflect) : null;
        const badDecisionStyle = badDecision ? getComputedStyle(badDecision) : null;
        const badHeadStyle = badDecision ? getComputedStyle(badDecision.querySelector('.cs-status-head')) : null;
        const goodHeadStyle = goodDecision ? getComputedStyle(goodDecision.querySelector('.cs-status-head')) : null;
        const badBodyStyle = badDecision ? getComputedStyle(badDecision.querySelector('.cs-status-body')) : null;
        const badStepStyle = badDecision ? getComputedStyle(badDecision.querySelector('.cs-counter-list li'), '::before') : null;
        const goodStepStyle = goodDecision ? getComputedStyle(goodDecision.querySelector('.cs-counter-list li'), '::before') : null;
        const badOutcomeStyle = badDecision ? getComputedStyle(badDecision.querySelector('.cs-status-outcome')) : null;
        const goodOutcomeStyle = goodDecision ? getComputedStyle(goodDecision.querySelector('.cs-status-outcome')) : null;
        const researchInfoStyle = researchInfo ? getComputedStyle(researchInfo) : null;
        const researchPanelHeadStyle = researchPanelHead ? getComputedStyle(researchPanelHead) : null;
        const researchPanelBodyStyle = researchPanelBody ? getComputedStyle(researchPanelBody) : null;
        const researchPanelTextStyle = researchPanelText ? getComputedStyle(researchPanelText) : null;
        const researchChipStyle = researchChip ? getComputedStyle(researchChip) : null;
        const researchChipLabelStyle = researchChipLabel ? getComputedStyle(researchChipLabel) : null;
        const researchChipBodyStyle = researchChipBody ? getComputedStyle(researchChipBody) : null;
        const researchShotStyle = researchShot ? getComputedStyle(researchShot) : null;
        const researchBrandLabelStyle = researchBrandLabel ? getComputedStyle(researchBrandLabel) : null;
        const researchBrandMarkStyle = researchBrandMark ? getComputedStyle(researchBrandMark) : null;
        const researchBrandNameStyle = researchBrandName ? getComputedStyle(researchBrandName) : null;
        const researchMediaStyle = researchMedia ? getComputedStyle(researchMedia) : null;
        const iterationBoardStyle = iterationBoard ? getComputedStyle(iterationBoard) : null;
        const iterationHeadStyle = iterationHead ? getComputedStyle(iterationHead) : null;
        const iterationBadgeStyle = iterationBadge ? getComputedStyle(iterationBadge) : null;
        const iterationTitleStyle = iterationTitle ? getComputedStyle(iterationTitle) : null;
        const iterationDetailRowStyle = iterationDetailRow ? getComputedStyle(iterationDetailRow) : null;
        const iterationDetailLabelStyle = iterationDetailLabel ? getComputedStyle(iterationDetailLabel) : null;
        const iterationDetailParagraphStyle = iterationDetailParagraph ? getComputedStyle(iterationDetailParagraph) : null;
        const impactQuoteStyle = impactQuote ? getComputedStyle(impactQuote) : null;
        const impactQuoteTextStyle = impactQuoteText ? getComputedStyle(impactQuoteText) : null;
        const impactQuoteMetaStyle = impactQuoteMeta ? getComputedStyle(impactQuoteMeta) : null;
        const impactQuoteNameStyle = impactQuoteName ? getComputedStyle(impactQuoteName) : null;
        const impactQuoteLineStyle = impactQuoteLine ? getComputedStyle(impactQuoteLine) : null;
        const impactQuoteRoleStyle = impactQuoteRole ? getComputedStyle(impactQuoteRole) : null;
        const roleNodeStyle = roleNode ? getComputedStyle(roleNode) : null;
        const roleArrowStyle = roleArrow ? getComputedStyle(roleArrow) : null;
        const roleTitleStyle = roleTitle ? getComputedStyle(roleTitle) : null;
        const finalMediaStyle = finalMedia ? getComputedStyle(finalMedia) : null;
        const finalBannerStyle = finalBanner ? getComputedStyle(finalBanner) : null;
        const finalBannerKickerStyle = finalBannerKicker ? getComputedStyle(finalBannerKicker) : null;
        const finalBannerTitleStyle = finalBannerTitle ? getComputedStyle(finalBannerTitle) : null;
        const impactMetricGridStyle = impactMetricGrid ? getComputedStyle(impactMetricGrid) : null;
        const impactMetricStyle = impactMetric ? getComputedStyle(impactMetric) : null;
        const impactMetricValueStyle = impactMetricValue ? getComputedStyle(impactMetricValue) : null;
        const impactMetricLabelStyle = impactMetricLabel ? getComputedStyle(impactMetricLabel) : null;
        const impactMetricBodyStyle = impactMetricBody ? getComputedStyle(impactMetricBody) : null;
        const impactTableStyle = impactTable ? getComputedStyle(impactTable) : null;
        const impactTableHeadCellStyle = impactTableHeadCell ? getComputedStyle(impactTableHeadCell) : null;
        const impactTableBodyHeadStyle = impactTableBodyHead ? getComputedStyle(impactTableBodyHead) : null;
        const impactTableBodyCellStyle = impactTableBodyCell ? getComputedStyle(impactTableBodyCell) : null;
        const impactTableMutedStyle = impactTableMuted ? getComputedStyle(impactTableMuted) : null;
        const impactTableStrongStyle = impactTableStrong ? getComputedStyle(impactTableStrong) : null;
        const impactTablePositiveStyle = impactTablePositive ? getComputedStyle(impactTablePositive) : null;
        const impactCompareLabelStyle = impactCompareLabel ? getComputedStyle(impactCompareLabel) : null;
        const impactMethodStyle = impactMethod ? getComputedStyle(impactMethod) : null;
        const researchFlowBoardStyle = researchFlowBoard ? getComputedStyle(researchFlowBoard) : null;
        const researchSubflowTitleStyle = researchSubflowTitle ? getComputedStyle(researchSubflowTitle) : null;
        const diagramStyle = diagram ? getComputedStyle(diagram) : null;
        const diagramLabelStyle = diagramLabel ? getComputedStyle(diagramLabel) : null;
        const diagramStrongLabelStyle = diagramStrongLabel ? getComputedStyle(diagramStrongLabel) : null;
        const diagramCurrencyStyle = diagramCurrency ? getComputedStyle(diagramCurrency) : null;
        const videoButtonStyle = videoButton ? getComputedStyle(videoButton) : null;
        const videoThumbStyle = videoThumb ? getComputedStyle(videoThumb) : null;
        const maskedVideoStyle = maskedVideo ? getComputedStyle(maskedVideo) : null;
        const matrixStyle = matrix ? getComputedStyle(matrix) : null;
        const matrixHeadStyle = matrixHead ? getComputedStyle(matrixHead) : null;
        const matrixStepStyle = matrixStep ? getComputedStyle(matrixStep) : null;
        const matrixStepNumStyle = matrixStepNum ? getComputedStyle(matrixStepNum) : null;
        const matrixRowStyle = matrixRow ? getComputedStyle(matrixRow) : null;
        const matrixLabelStyle = matrixLabel ? getComputedStyle(matrixLabel) : null;
        const matrixLabelNameStyle = matrixLabelName ? getComputedStyle(matrixLabelName) : null;
        const matrixCellStyle = matrixCell ? getComputedStyle(matrixCell) : null;
        const matrixNoteStyle = matrixNote ? getComputedStyle(matrixNote) : null;
        const stepZoomStyle = stepZoom ? getComputedStyle(stepZoom) : null;
        const insightCalloutStyle = insightCallout ? getComputedStyle(insightCallout) : null;
        const insightCalloutIconStyle = insightCalloutIcon ? getComputedStyle(insightCalloutIcon) : null;
        const painQuoteTextStyle = painQuoteText ? getComputedStyle(painQuoteText) : null;
        const painQuoteMetaStyle = painQuoteMeta ? getComputedStyle(painQuoteMeta) : null;
        const painQuoteNameStyle = painQuoteName ? getComputedStyle(painQuoteName) : null;
        const painQuoteLineStyle = painQuoteLine ? getComputedStyle(painQuoteLine) : null;
        const painQuoteRoleStyle = painQuoteRole ? getComputedStyle(painQuoteRole) : null;
        const painAvatarStyle = painAvatar ? getComputedStyle(painAvatar) : null;
        const painAvatarImgStyle = painAvatarImg ? getComputedStyle(painAvatarImg) : null;
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
            pain: document.querySelectorAll('.ca-pain-card').length,
            reflect: document.querySelectorAll('.ca-reflect-card').length,
            decision: document.querySelectorAll('.ca-dcard, .ca-dcard-head, .ca-dcard-body, .ca-steps, .ca-dcard-out').length,
            researchInfo: document.querySelectorAll('.ca-research-info, .ca-research-info-head, .ca-research-info-body').length,
            exchange: document.querySelectorAll('.ca-exchange, .ca-exchange-media, .ca-exchange-img').length,
            iteration: document.querySelectorAll('.ca-iter-board').length,
            iterationText: document.querySelectorAll('.ca-iter-head, .ca-iter-badge, .ca-iter-title, .ca-iter-row, .ca-iter-label, .ca-iter-desc').length,
            impactQuote: document.querySelectorAll('.ca-impact-quote').length,
            roleNode: document.querySelectorAll('.ca-flow-node').length,
            finalMedia: document.querySelectorAll('.ca-final-shot').length,
            impactMetric: document.querySelectorAll('.ca-impact').length,
            impactMetricText: document.querySelectorAll('.ca-impact-value, .ca-impact-label, .ca-impact-body').length,
            impactTable: document.querySelectorAll('.ca-impact-times, .ca-impact-before, .ca-impact-after, .ca-impact-cut').length,
            problemGrid: document.querySelectorAll('.ca-pains').length,
            reflectGrid: document.querySelectorAll('.ca-reflect').length,
            decisionGrid: document.querySelectorAll('.ca-decision').length,
            spacing: document.querySelectorAll('.ca-overview-gap, .ca-decision-close, .ca-research-note').length,
            researchFlowBoard: document.querySelectorAll('.ca-research-flow-board, .ca-subflow-head').length,
            researchSubflowTitle: document.querySelectorAll('.ca-subflow-title').length,
            diagram: document.querySelectorAll('.ca-diagram-graphic, .ca-flow-label, .ca-flow-label-strong, .ca-flow-currency').length,
            video: document.querySelectorAll('.ca-final-video-button, .ca-final-video, .ca-final-video--masked, .ca-final-video-lightbox, .ca-final-video-lightbox-frame, .ca-final-video-lightbox-media').length,
            matrix: document.querySelectorAll('.ca-matrix, .ca-matrix-head, .ca-matrix-corner, .ca-matrix-step, .ca-matrix-step-num, .ca-matrix-step-text, .ca-matrix-row, .ca-matrix-ex, .ca-matrix-ex-logo, .ca-matrix-ex-name, .ca-matrix-cell, .ca-matrix-cell-stack, .ca-matrix-cell-note, .ca-step-zoom, .ca-matrix-synth, .ca-matrix-synth-icon').length,
            researchLayout: document.querySelectorAll('.ca-research-row, .ca-research-shots').length,
            researchChip: document.querySelectorAll('.ca-chip, .ca-chip-label, .ca-chip-body').length,
            researchBrandLabel: document.querySelectorAll('.ca-exchange-label, .ca-exchange-logo, .ca-exchange-name').length,
            impactQuoteGrid: document.querySelectorAll('.ca-impact-quotes').length,
            impactQuoteText: document.querySelectorAll('.ca-impact-quote-text, .ca-impact-quote-who, .ca-impact-quote-name, .ca-impact-quote-line, .ca-impact-quote-role').length,
            finalBanner: document.querySelectorAll('.ca-final-banner, .ca-final-banner-kicker, .ca-final-banner-title').length,
            impactTextHelpers: document.querySelectorAll('.ca-impact-compare-cap, .ca-impact-method').length,
            roleFlow: document.querySelectorAll('.ca-flow, .ca-flow-item, .ca-flow-arrow, .ca-flow-num, .ca-flow-title').length,
            reflectNum: document.querySelectorAll('.ca-reflect-num').length,
            painQuoteText: document.querySelectorAll('.ca-pain-quote, .ca-pain-who, .ca-avatar, .ca-avatar-img, .ca-pain-name, .ca-pain-line, .ca-pain-role').length
          },
          cardCounts: {
            pain: document.querySelectorAll('#cs-sec-problem > .cs-grid .cs-card').length,
            painQuoteText: document.querySelectorAll('#cs-sec-problem .cs-quote-text').length,
            painQuoteMeta: document.querySelectorAll('#cs-sec-problem .cs-quote-meta').length,
            painQuoteName: document.querySelectorAll('#cs-sec-problem .cs-quote-name').length,
            painQuoteLine: document.querySelectorAll('#cs-sec-problem .cs-quote-line').length,
            painQuoteRole: document.querySelectorAll('#cs-sec-problem .cs-quote-role').length,
            painAvatar: document.querySelectorAll('#cs-sec-problem .cs-avatar').length,
            painAvatarImg: document.querySelectorAll('#cs-sec-problem .cs-avatar-img').length,
            reflect: document.querySelectorAll('#cs-sec-reflect > .cs-grid .cs-card').length,
            decision: document.querySelectorAll('#cs-sec-decision > .cs-grid .cs-card').length,
            decisionHead: document.querySelectorAll('#cs-sec-decision .cs-status-head').length,
            decisionBody: document.querySelectorAll('#cs-sec-decision .cs-status-body').length,
            decisionSteps: document.querySelectorAll('#cs-sec-decision .cs-counter-list').length,
            decisionStepItems: document.querySelectorAll('#cs-sec-decision .cs-counter-list li').length,
            decisionOutcome: document.querySelectorAll('#cs-sec-decision .cs-status-outcome').length,
            researchInfo: document.querySelectorAll('#cs-sec-research .cs-grid--aside-main > .cs-card:first-child').length,
            researchPanelHead: document.querySelectorAll('#cs-sec-research .cs-panel-head').length,
            researchPanelBody: document.querySelectorAll('#cs-sec-research .cs-panel-body').length,
            researchChip: document.querySelectorAll('#cs-sec-research .cs-info-chip').length,
            researchChipLabel: document.querySelectorAll('#cs-sec-research .cs-info-chip-label').length,
            researchChipBody: document.querySelectorAll('#cs-sec-research .cs-info-chip-body').length,
            researchBrandLabel: document.querySelectorAll('.cs-grid--research-shots .cs-brand-label').length,
            researchBrandMark: document.querySelectorAll('.cs-grid--research-shots .cs-brand-mark').length,
            researchBrandName: document.querySelectorAll('.cs-grid--research-shots .cs-brand-name').length,
            exchange: document.querySelectorAll('.cs-grid--research-shots > .cs-card').length,
            iteration: document.querySelectorAll('#cs-sec-iteration > .cs-card').length,
            iterationHead: document.querySelectorAll('#cs-sec-iteration .cs-card-heading-row').length,
            iterationBadge: document.querySelectorAll('#cs-sec-iteration .cs-pill-badge').length,
            iterationTitle: document.querySelectorAll('#cs-sec-iteration .cs-card-heading-title').length,
            iterationDetailRow: document.querySelectorAll('#cs-sec-iteration .cs-detail-row').length,
            iterationDetailLabel: document.querySelectorAll('#cs-sec-iteration .cs-detail-label').length,
            iterationDetailBody: document.querySelectorAll('#cs-sec-iteration .cs-detail-body').length,
            impactQuote: document.querySelectorAll('#cs-sec-impact > .cs-grid--quote-list > .cs-card').length,
            impactQuoteText: document.querySelectorAll('#cs-sec-impact .cs-quote-text').length,
            impactQuoteMeta: document.querySelectorAll('#cs-sec-impact .cs-quote-meta').length,
            impactQuoteName: document.querySelectorAll('#cs-sec-impact .cs-quote-name').length,
            impactQuoteLine: document.querySelectorAll('#cs-sec-impact .cs-quote-line').length,
            impactQuoteRole: document.querySelectorAll('#cs-sec-impact .cs-quote-role').length,
            reflectKicker: document.querySelectorAll('#cs-sec-reflect .cs-card-kicker').length,
            roleNode: document.querySelectorAll('.cs-step-flow-item > .cs-card').length,
            roleArrow: document.querySelectorAll('.cs-step-flow-arrow').length,
            finalMedia: document.querySelectorAll('#cs-sec-final .cs-media').length,
            finalBanner: document.querySelectorAll('#cs-sec-final .cs-proposal-banner').length,
            impactMetric: document.querySelectorAll('#cs-sec-impact .cs-metric-grid .cs-card--metric').length,
            impactMetricValue: document.querySelectorAll('#cs-sec-impact .cs-metric-value').length,
            impactMetricLabel: document.querySelectorAll('#cs-sec-impact .cs-metric-label').length,
            impactMetricBody: document.querySelectorAll('#cs-sec-impact .cs-metric-body').length,
            impactTable: document.querySelectorAll('#cs-sec-impact .cs-data-table').length,
            impactTableHeadCells: document.querySelectorAll('#cs-sec-impact .cs-data-table thead th').length,
            impactTableRows: document.querySelectorAll('#cs-sec-impact .cs-data-table tbody tr').length,
            impactTableMuted: document.querySelectorAll('#cs-sec-impact .cs-data-table-value--muted').length,
            impactTableStrong: document.querySelectorAll('#cs-sec-impact .cs-data-table-value--strong').length,
            impactTablePositive: document.querySelectorAll('#cs-sec-impact .cs-data-table-value--positive').length,
            impactCompareLabel: document.querySelectorAll('#cs-sec-impact .cs-media-label').length,
            impactMethod: document.querySelectorAll('#cs-sec-impact .cs-section-note').length,
            researchFlowBoard: document.querySelectorAll('#cs-sec-research > .cs-card').length,
            researchSubflowTitle: document.querySelectorAll('#cs-sec-research .cs-subsection-title').length,
            diagram: document.querySelectorAll('.cs-diagram-graphic').length,
            diagramLabel: document.querySelectorAll('.cs-diagram-label').length,
            diagramStrongLabel: document.querySelectorAll('.cs-diagram-label-strong').length,
            diagramCurrency: document.querySelectorAll('.cs-diagram-currency').length,
            videoButton: document.querySelectorAll('.cs-video-lightbox-button').length,
            videoThumb: document.querySelectorAll('.cs-video-lightbox-thumb').length,
            maskedVideo: document.querySelectorAll('.cs-video-lightbox--masked').length,
            matrix: document.querySelectorAll('.cs-comparison-matrix').length,
            matrixHead: document.querySelectorAll('.cs-comparison-matrix-head').length,
            matrixCorner: document.querySelectorAll('.cs-comparison-matrix-corner').length,
            matrixStep: document.querySelectorAll('.cs-comparison-matrix-step').length,
            matrixStepNum: document.querySelectorAll('.cs-comparison-matrix-step-num').length,
            matrixStepText: document.querySelectorAll('.cs-comparison-matrix-step-text').length,
            matrixRow: document.querySelectorAll('.cs-comparison-matrix-row').length,
            matrixLabel: document.querySelectorAll('.cs-comparison-matrix-label').length,
            matrixLabelLogo: document.querySelectorAll('.cs-comparison-matrix-label-logo').length,
            matrixLabelName: document.querySelectorAll('.cs-comparison-matrix-label-name').length,
            matrixCell: document.querySelectorAll('.cs-comparison-matrix-cell').length,
            matrixCellStack: document.querySelectorAll('.cs-comparison-matrix-cell-stack').length,
            matrixCellNote: document.querySelectorAll('.cs-comparison-matrix-cell-note').length,
            stepZoom: document.querySelectorAll('.cs-comparison-matrix .cs-step-zoom').length,
            insightCallout: document.querySelectorAll('.cs-insight-callout').length,
            insightCalloutIcon: document.querySelectorAll('.cs-insight-callout-icon').length
          },
          pain: firstPain && {
            padding: painStyle.padding,
            gap: painStyle.gap,
            justifyContent: painStyle.justifyContent,
            border: painStyle.borderTopColor,
            shadow: painStyle.boxShadow,
            textColor: painQuoteTextStyle?.color,
            textSize: painQuoteTextStyle?.fontSize,
            textWeight: painQuoteTextStyle?.fontWeight,
            textLineHeight: painQuoteTextStyle?.lineHeight,
            textLetterSpacing: painQuoteTextStyle?.letterSpacing,
            metaDisplay: painQuoteMetaStyle?.display,
            metaGap: painQuoteMetaStyle?.gap,
            nameColor: painQuoteNameStyle?.color,
            lineColor: painQuoteLineStyle?.backgroundColor,
            roleColor: painQuoteRoleStyle?.color,
            roleLineHeight: painQuoteRoleStyle?.lineHeight,
            avatarWidth: painAvatarStyle?.width,
            avatarHeight: painAvatarStyle?.height,
            avatarRadius: painAvatarStyle?.borderRadius,
            avatarImgDisplay: painAvatarImgStyle?.display
          },
          reflect: firstReflect && {
            padding: reflectStyle.padding,
            border: reflectStyle.borderTopColor,
            shadow: reflectStyle.boxShadow,
            kickerBg: getComputedStyle(firstReflect.querySelector('.cs-card-kicker')).backgroundColor,
            kickerColor: getComputedStyle(firstReflect.querySelector('.cs-card-kicker')).color
          },
          decision: badDecision && goodDecision && {
            padding: badDecisionStyle.padding,
            border: badDecisionStyle.borderTopColor,
            shadow: badDecisionStyle.boxShadow,
            badHead: badHeadStyle.backgroundImage,
            goodHead: goodHeadStyle.backgroundImage,
            bodyPadding: badBodyStyle.padding,
            badStep: badStepStyle.backgroundColor,
            goodStep: goodStepStyle.backgroundColor,
            badOutcome: badOutcomeStyle.color,
            goodOutcome: goodOutcomeStyle.color
          },
          research: researchInfo && researchShot && researchMedia && {
            infoPadding: researchInfoStyle.padding,
            infoBorder: researchInfoStyle.borderTopColor,
            infoRadius: researchInfoStyle.borderRadius,
            infoShadow: researchInfoStyle.boxShadow,
            panelHeadPadding: researchPanelHeadStyle?.padding,
            panelHeadBg: researchPanelHeadStyle?.backgroundImage,
            panelHeadColor: researchPanelHeadStyle?.color,
            panelHeadSize: researchPanelHeadStyle?.fontSize,
            panelBodyPadding: researchPanelBodyStyle?.padding,
            panelBodyGap: researchPanelBodyStyle?.gap,
            panelTextColor: researchPanelTextStyle?.color,
            panelTextSize: researchPanelTextStyle?.fontSize,
            panelTextLineHeight: researchPanelTextStyle?.lineHeight,
            chipPadding: researchChipStyle?.padding,
            chipGap: researchChipStyle?.gap,
            chipBg: researchChipStyle?.backgroundColor,
            chipRadius: researchChipStyle?.borderRadius,
            chipLabelColor: researchChipLabelStyle?.color,
            chipBodyColor: researchChipBodyStyle?.color,
            brandGap: researchBrandLabelStyle?.gap,
            brandMarkWidth: researchBrandMarkStyle?.width,
            brandMarkHeight: researchBrandMarkStyle?.height,
            brandMarkRadius: researchBrandMarkStyle?.borderRadius,
            brandNameColor: researchBrandNameStyle?.color,
            brandNameSize: researchBrandNameStyle?.fontSize,
            shotPadding: researchShotStyle.padding,
            shotGap: researchShotStyle.gap,
            mediaBorder: researchMediaStyle.borderTopColor,
            mediaRadius: researchMediaStyle.borderRadius
          },
          iteration: iterationBoard && {
            padding: iterationBoardStyle.padding,
            gap: iterationBoardStyle.gap,
            border: iterationBoardStyle.borderTopColor,
            radius: iterationBoardStyle.borderRadius,
            shadow: iterationBoardStyle.boxShadow,
            headGap: iterationHeadStyle?.gap,
            headDirection: iterationHeadStyle?.flexDirection,
            badgeWidth: iterationBadgeStyle?.width,
            badgePadding: iterationBadgeStyle?.padding,
            badgeBg: iterationBadgeStyle?.backgroundColor,
            badgeSize: iterationBadgeStyle?.fontSize,
            badgeLineHeight: iterationBadgeStyle?.lineHeight,
            badgeWhiteSpace: iterationBadgeStyle?.whiteSpace,
            titleMinWidth: iterationTitleStyle?.minWidth,
            titleColor: iterationTitleStyle?.color,
            titleSize: iterationTitleStyle?.fontSize,
            titleLineHeight: iterationTitleStyle?.lineHeight,
            detailDirection: iterationDetailRowStyle?.flexDirection,
            detailGap: iterationDetailRowStyle?.gap,
            labelFlex: iterationDetailLabelStyle?.flex,
            labelColor: iterationDetailLabelStyle?.color,
            labelSize: iterationDetailLabelStyle?.fontSize,
            bodyColor: iterationDetailParagraphStyle?.color,
            bodySize: iterationDetailParagraphStyle?.fontSize,
            bodyLineHeight: iterationDetailParagraphStyle?.lineHeight
          },
          impactQuote: impactQuote && {
            padding: impactQuoteStyle.padding,
            gap: impactQuoteStyle.gap,
            justifyContent: impactQuoteStyle.justifyContent,
            border: impactQuoteStyle.borderTopColor,
            radius: impactQuoteStyle.borderRadius,
            background: impactQuoteStyle.backgroundColor,
            containerType: impactQuoteStyle.containerType,
            textColor: impactQuoteTextStyle?.color,
            textWeight: impactQuoteTextStyle?.fontWeight,
            metaGap: impactQuoteMetaStyle?.gap,
            nameColor: impactQuoteNameStyle?.color,
            lineColor: impactQuoteLineStyle?.backgroundColor,
            roleColor: impactQuoteRoleStyle?.color,
            roleSize: impactQuoteRoleStyle?.fontSize
          },
          roleNode: roleNode && {
            padding: roleNodeStyle.padding,
            gap: roleNodeStyle.gap,
            direction: roleNodeStyle.flexDirection,
            justifyContent: roleNodeStyle.justifyContent,
            border: roleNodeStyle.borderTopColor,
            radius: roleNodeStyle.borderRadius,
            background: roleNodeStyle.backgroundColor,
            titleAlign: roleTitleStyle?.textAlign,
            arrowWidth: roleArrowStyle?.width,
            arrowHeight: roleArrowStyle?.height,
            arrowTransform: roleArrowStyle?.transform
          },
          finalMedia: finalMedia && {
            margin: finalMediaStyle.margin
          },
          finalBanner: finalBanner && finalBannerKicker && finalBannerTitle && {
            padding: finalBannerStyle.padding,
            gap: finalBannerStyle.gap,
            radius: finalBannerStyle.borderRadius,
            background: finalBannerStyle.backgroundImage,
            color: finalBannerStyle.color,
            kickerColor: finalBannerKickerStyle.color,
            kickerSize: finalBannerKickerStyle.fontSize,
            titleSize: finalBannerTitleStyle.fontSize
          },
          impactMetric: impactMetricGrid && impactMetric && {
            columns: impactMetricGridStyle.gridTemplateColumns,
            gap: impactMetricGridStyle.gap,
            marginTop: impactMetricGridStyle.marginTop,
            padding: impactMetricStyle.padding,
            border: impactMetricStyle.borderTopColor,
            radius: impactMetricStyle.borderRadius,
            shadow: impactMetricStyle.boxShadow,
            valueColor: impactMetricValueStyle?.color,
            valueSize: impactMetricValueStyle?.fontSize,
            valueWeight: impactMetricValueStyle?.fontWeight,
            labelColor: impactMetricLabelStyle?.color,
            bodyColor: impactMetricBodyStyle?.color,
            bodySize: impactMetricBodyStyle?.fontSize
          },
          impactTable: impactTable && {
            border: impactTableStyle.borderTopColor,
            radius: impactTableStyle.borderRadius,
            shadow: impactTableStyle.boxShadow,
            fontSize: impactTableStyle.fontSize,
            headPadding: impactTableHeadCellStyle?.padding,
            headBg: impactTableHeadCellStyle?.backgroundColor,
            headColor: impactTableHeadCellStyle?.color,
            bodyHeadPadding: impactTableBodyHeadStyle?.padding,
            bodyHeadColor: impactTableBodyHeadStyle?.color,
            bodyCellPadding: impactTableBodyCellStyle?.padding,
            bodyCellColor: impactTableBodyCellStyle?.color,
            mutedColor: impactTableMutedStyle?.color,
            strongColor: impactTableStrongStyle?.color,
            strongWeight: impactTableStrongStyle?.fontWeight,
            positiveColor: impactTablePositiveStyle?.color,
            positiveWeight: impactTablePositiveStyle?.fontWeight
          },
          researchFlowBoard: researchFlowBoard && {
            padding: researchFlowBoardStyle.padding,
            gap: researchFlowBoardStyle.gap,
            marginTop: researchFlowBoardStyle.marginTop,
            border: researchFlowBoardStyle.borderTopColor,
            radius: researchFlowBoardStyle.borderRadius,
            background: researchFlowBoardStyle.backgroundColor,
            titleMargin: researchSubflowTitleStyle?.margin,
            titleColor: researchSubflowTitleStyle?.color,
            titleSize: researchSubflowTitleStyle?.fontSize,
            titleLineHeight: researchSubflowTitleStyle?.lineHeight
          },
          impactText: impactCompareLabel && impactMethod && {
            labelDisplay: impactCompareLabelStyle.display,
            labelMarginBottom: impactCompareLabelStyle.marginBottom,
            labelColor: impactCompareLabelStyle.color,
            methodMargin: impactMethodStyle.margin,
            methodColor: impactMethodStyle.color,
            methodSize: impactMethodStyle.fontSize
          },
          diagram: diagram && diagramLabel && diagramStrongLabel && diagramCurrency && {
            display: diagramStyle.display,
            width: diagramStyle.width,
            minWidth: diagramStyle.minWidth,
            overflow: diagramStyle.overflow,
            labelSize: diagramLabelStyle.fontSize,
            labelWeight: diagramLabelStyle.fontWeight,
            strongSize: diagramStrongLabelStyle.fontSize,
            strongWeight: diagramStrongLabelStyle.fontWeight,
            currencyFill: diagramCurrencyStyle.fill
          },
          video: videoButton && videoThumb && maskedVideo && {
            buttonPosition: videoButtonStyle.position,
            buttonDisplay: videoButtonStyle.display,
            thumbDisplay: videoThumbStyle.display,
            thumbAspectRatio: videoThumbStyle.aspectRatio,
            thumbObjectFit: videoThumbStyle.objectFit,
            maskedBackground: maskedVideoStyle.backgroundColor,
            maskSize: maskedVideoStyle.maskSize || maskedVideoStyle.webkitMaskSize
          },
          matrix: matrix && matrixHead && matrixStep && matrixStepNum && matrixRow && matrixLabel && matrixLabelName && matrixCell && stepZoom && insightCallout && insightCalloutIcon && {
            display: matrixStyle.display,
            direction: matrixStyle.flexDirection,
            padding: matrixStyle.padding,
            border: matrixStyle.borderTopColor,
            radius: matrixStyle.borderRadius,
            shadow: matrixStyle.boxShadow,
            headDisplay: matrixHeadStyle.display,
            headBg: matrixHeadStyle.backgroundImage,
            stepDisplay: matrixStepStyle.display,
            stepColor: matrixStepStyle.color,
            stepWeight: matrixStepStyle.fontWeight,
            stepNumBg: matrixStepNumStyle.backgroundColor,
            rowDisplay: matrixRowStyle.display,
            rowBorder: matrixRowStyle.borderTopColor,
            labelPosition: matrixLabelStyle.position,
            labelBg: matrixLabelStyle.backgroundColor,
            labelShadow: matrixLabelStyle.boxShadow,
            labelNameColor: matrixLabelNameStyle.color,
            cellDisplay: matrixCellStyle.display,
            noteColor: matrixNoteStyle?.color,
            stepZoomBorder: stepZoomStyle.borderTopColor,
            stepZoomBg: stepZoomStyle.backgroundColor,
            calloutDisplay: insightCalloutStyle.display,
            calloutBg: insightCalloutStyle.backgroundColor,
            calloutIconBg: insightCalloutIconStyle.backgroundColor
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
    result.oldCounts.pain !== 0 ||
    result.oldCounts.reflect !== 0 ||
    result.oldCounts.decision !== 0 ||
    result.oldCounts.researchInfo !== 0 ||
    result.oldCounts.exchange !== 0 ||
    result.oldCounts.iteration !== 0 ||
    result.oldCounts.iterationText !== 0 ||
    result.oldCounts.impactQuote !== 0 ||
    result.oldCounts.roleNode !== 0 ||
    result.oldCounts.finalMedia !== 0 ||
    result.oldCounts.impactMetric !== 0 ||
    result.oldCounts.impactMetricText !== 0 ||
    result.oldCounts.impactTable !== 0 ||
    result.oldCounts.problemGrid !== 0 ||
    result.oldCounts.reflectGrid !== 0 ||
    result.oldCounts.decisionGrid !== 0 ||
    result.oldCounts.spacing !== 0 ||
    result.oldCounts.researchFlowBoard !== 0 ||
    result.oldCounts.researchSubflowTitle !== 0 ||
    result.oldCounts.diagram !== 0 ||
    result.oldCounts.video !== 0 ||
    result.oldCounts.matrix !== 0 ||
    result.oldCounts.researchLayout !== 0 ||
    result.oldCounts.researchChip !== 0 ||
    result.oldCounts.researchBrandLabel !== 0 ||
    result.oldCounts.impactQuoteGrid !== 0 ||
    result.oldCounts.impactQuoteText !== 0 ||
    result.oldCounts.finalBanner !== 0 ||
    result.oldCounts.impactTextHelpers !== 0 ||
    result.oldCounts.roleFlow !== 0 ||
    result.oldCounts.reflectNum !== 0 ||
    result.oldCounts.painQuoteText !== 0 ||
    result.cardCounts.pain !== 6 ||
    result.cardCounts.painQuoteText !== 6 ||
    result.cardCounts.painQuoteMeta !== 6 ||
    result.cardCounts.painQuoteName !== 6 ||
    result.cardCounts.painQuoteLine !== 6 ||
    result.cardCounts.painQuoteRole !== 6 ||
    result.cardCounts.painAvatar !== 6 ||
    result.cardCounts.painAvatarImg !== 6 ||
    result.cardCounts.reflect !== 3 ||
    result.cardCounts.decision !== 2 ||
    result.cardCounts.decisionHead !== 2 ||
    result.cardCounts.decisionBody !== 2 ||
    result.cardCounts.decisionSteps !== 2 ||
    result.cardCounts.decisionStepItems !== 6 ||
    result.cardCounts.decisionOutcome !== 2 ||
    result.cardCounts.researchInfo !== 1 ||
    result.cardCounts.researchPanelHead !== 1 ||
    result.cardCounts.researchPanelBody !== 1 ||
    result.cardCounts.researchChip !== 2 ||
    result.cardCounts.researchChipLabel !== 2 ||
    result.cardCounts.researchChipBody !== 2 ||
    result.cardCounts.researchBrandLabel !== 3 ||
    result.cardCounts.researchBrandMark !== 3 ||
    result.cardCounts.researchBrandName !== 3 ||
    result.cardCounts.exchange !== 3 ||
    result.cardCounts.iteration !== 4 ||
    result.cardCounts.iterationHead !== 4 ||
    result.cardCounts.iterationBadge !== 4 ||
    result.cardCounts.iterationTitle !== 4 ||
    result.cardCounts.iterationDetailRow !== 4 ||
    result.cardCounts.iterationDetailLabel !== 4 ||
    result.cardCounts.iterationDetailBody !== 4 ||
    result.cardCounts.impactQuote !== 4 ||
    result.cardCounts.impactQuoteText !== 4 ||
    result.cardCounts.impactQuoteMeta !== 4 ||
    result.cardCounts.impactQuoteName !== 4 ||
    result.cardCounts.impactQuoteLine !== 4 ||
    result.cardCounts.impactQuoteRole !== 4 ||
    result.cardCounts.reflectKicker !== 3 ||
    result.cardCounts.roleNode !== 8 ||
    result.cardCounts.roleArrow !== 7 ||
    result.cardCounts.finalMedia !== 3 ||
    result.cardCounts.finalBanner !== 3 ||
    result.cardCounts.impactMetric !== 3 ||
    result.cardCounts.impactMetricValue !== 3 ||
    result.cardCounts.impactMetricLabel !== 3 ||
    result.cardCounts.impactMetricBody !== 3 ||
    result.cardCounts.impactTable !== 1 ||
    result.cardCounts.impactTableHeadCells !== 4 ||
    result.cardCounts.impactTableRows !== 3 ||
    result.cardCounts.impactTableMuted !== 3 ||
    result.cardCounts.impactTableStrong !== 3 ||
    result.cardCounts.impactTablePositive !== 3 ||
    result.cardCounts.impactCompareLabel !== 1 ||
    result.cardCounts.impactMethod !== 1 ||
    result.cardCounts.researchFlowBoard !== 2 ||
    result.cardCounts.researchSubflowTitle !== 2 ||
    result.cardCounts.diagram !== 2 ||
    result.cardCounts.diagramLabel !== 17 ||
    result.cardCounts.diagramStrongLabel !== 9 ||
    result.cardCounts.diagramCurrency !== 1 ||
    result.cardCounts.videoButton !== 3 ||
    result.cardCounts.videoThumb !== 3 ||
    result.cardCounts.maskedVideo !== 3 ||
    result.cardCounts.matrix !== 2 ||
    result.cardCounts.matrixHead !== 2 ||
    result.cardCounts.matrixCorner !== 2 ||
    result.cardCounts.matrixStep !== 5 ||
    result.cardCounts.matrixStepNum !== 5 ||
    result.cardCounts.matrixStepText !== 5 ||
    result.cardCounts.matrixRow !== 6 ||
    result.cardCounts.matrixLabel !== 6 ||
    result.cardCounts.matrixLabelLogo !== 6 ||
    result.cardCounts.matrixLabelName !== 6 ||
    result.cardCounts.matrixCell !== 15 ||
    result.cardCounts.matrixCellStack !== 1 ||
    result.cardCounts.matrixCellNote !== 1 ||
    result.cardCounts.stepZoom !== 16 ||
    result.cardCounts.insightCallout !== 2 ||
    result.cardCounts.insightCalloutIcon !== 2 ||
    !result.finalBanner?.background.includes("linear-gradient") ||
    result.impactText?.labelDisplay !== "block" ||
    result.diagram?.display !== "block" ||
    result.diagram?.overflow !== "visible" ||
    result.diagram?.labelSize !== "14px" ||
    result.diagram?.strongSize !== "16px" ||
    result.video?.buttonPosition !== "relative" ||
    result.video?.buttonDisplay !== "block" ||
    result.video?.thumbDisplay !== "block" ||
    result.video?.thumbObjectFit !== "cover" ||
    result.matrix?.display !== "flex" ||
    result.matrix?.direction !== "column" ||
    result.matrix?.headDisplay !== "grid" ||
    !result.matrix?.headBg.includes("linear-gradient") ||
    result.matrix?.stepDisplay !== "flex" ||
    result.matrix?.stepWeight !== "700" ||
    result.matrix?.rowDisplay !== "grid" ||
    result.matrix?.labelPosition !== "sticky" ||
    result.matrix?.cellDisplay !== "flex" ||
    result.matrix?.stepZoomBg !== "rgb(10, 19, 48)" ||
    result.matrix?.calloutDisplay !== "flex" ||
    !result.decision?.badHead.includes("linear-gradient") ||
    !result.decision?.goodHead.includes("linear-gradient") ||
    result.decision.badStep === "rgba(0, 0, 0, 0)" ||
    result.decision.goodStep === "rgba(0, 0, 0, 0)" ||
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
