'use client';

import { useEffect, useId } from 'react';
import { useLocale } from 'next-intl';
import type { Locale } from '../../../i18n/routing';
import { translateAdvantech } from '../i18n';

type Props = {
  tooltipLines: string[];
};

declare global {
  interface Window {
    __featureConnectorsPositioned?: number;
    __featureConnectorsSetup?: boolean;
    updateFeatureConnectors?: () => void;
  }
}

function centerX(rect: DOMRect, containerRect: DOMRect) {
  return rect.left + rect.width / 2 - containerRect.left;
}

function setConnectorImage(img: HTMLImageElement, left: number, width: number) {
  img.style.maxWidth = 'none';
  img.style.marginLeft = `${Math.round(left)}px`;
  img.style.width = `${Math.round(width)}px`;
  img.style.height = '';
}

function connectorOneSvg(width: number, delta: number) {
  const height = width * 211 / 482;
  const topX = width - 1;
  const bottomX = Math.max(1, Math.min(width - 1, width - delta));
  const scaleX = width / 482;
  const scaleY = height / 211;
  const radius = 24 * scaleX;
  const y1 = 81.5 * scaleY;
  const midY = 105.5 * scaleY;
  const y2 = 129.5 * scaleY;
  const path = [
    'M', topX, 1,
    'V', y1,
    'C', topX, y1 + 13 * scaleY, topX - radius / 2, midY, topX - radius, midY,
    'H', bottomX + radius,
    'C', bottomX + radius / 2, midY, bottomX, y2 - 13 * scaleY, bottomX, y2,
    'V', height - 1,
  ].join(' ');

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg width="${Math.round(width)}" height="${Math.round(height)}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${path}" stroke="#B3B3B3" stroke-width="2" stroke-linecap="square" stroke-linejoin="bevel"/></svg>`
  )}`;
}

function imageCenterXInConnector(row: Element | undefined, connectorRect: DOMRect) {
  const image = row?.querySelector<HTMLElement>('.cs-sol-fimg');
  if (!image) return null;
  return centerX(image.getBoundingClientRect(), connectorRect);
}

function nextConnectorWidth(rows: Element[], index: number, connectorRect: DOMRect) {
  const current = imageCenterXInConnector(rows[index + 1], connectorRect);
  const next = imageCenterXInConnector(rows[index + 2], connectorRect);
  if (current === null || next === null) return null;
  return Math.abs(next - current);
}

function setFirstConnectorImage(img: HTMLImageElement, left: number, width: number, delta: number) {
  if (!img.dataset.originalSrc) img.dataset.originalSrc = img.getAttribute('src') || '';
  img.src = connectorOneSvg(width, delta);
  setConnectorImage(img, left, width);
}

function restoreConnectorImage(img: HTMLImageElement) {
  if (img.dataset.originalSrc && img.getAttribute('src') !== img.dataset.originalSrc) {
    img.src = img.dataset.originalSrc;
  }
}

function updateFeatureConnectors() {
  const groups = document.querySelectorAll('.cs-sol-fgroup');
  const isMiddleDesktop = window.innerWidth >= 1025 && window.innerWidth < 1440;
  let positioned = 0;

  groups.forEach((group) => {
    const rows = Array.from(group.querySelectorAll('.cs-sol-fr'));
    const connectors = Array.from(group.querySelectorAll('.cs-sol-fconn'));

    connectors.forEach((connector, index) => {
      const topRow = rows[index];
      const bottomRow = rows[index + 1];
      const img = connector.querySelector<HTMLImageElement>('img');
      const topImage = topRow?.querySelector<HTMLElement>('.cs-sol-fimg');
      const bottomImage = bottomRow?.querySelector<HTMLElement>('.cs-sol-fimg');

      if (!topRow || !bottomRow || !img || !topImage || !bottomImage) return;

      const connectorRect = connector.getBoundingClientRect();
      const topRect = topImage.getBoundingClientRect();
      const bottomRect = bottomImage.getBoundingClientRect();

      if (!connectorRect.width || !topRect.width || !bottomRect.width) return;

      const topCx = centerX(topRect, connectorRect);
      const bottomCx = centerX(bottomRect, connectorRect);

      if (isMiddleDesktop && index === 0) {
        const visualWidth = nextConnectorWidth(rows, index, connectorRect) ?? Math.abs(topCx - bottomCx);
        setFirstConnectorImage(img, topCx - visualWidth, visualWidth, topCx - bottomCx);
      } else {
        restoreConnectorImage(img);
        setConnectorImage(img, Math.min(topCx, bottomCx), Math.abs(topCx - bottomCx));
      }

      positioned += 1;
    });
  });

  window.__featureConnectorsPositioned = positioned;
}

function setupFeatureConnectors() {
  if (window.__featureConnectorsSetup) return;
  window.__featureConnectorsSetup = true;

  let rafId = 0;
  let timerId = 0;
  const runUpdate = () => {
    if (rafId) { window.cancelAnimationFrame(rafId); rafId = 0; }
    if (timerId) { window.clearTimeout(timerId); timerId = 0; }
    updateFeatureConnectors();
  };
  const scheduleUpdate = () => {
    if (rafId) window.cancelAnimationFrame(rafId);
    rafId = window.requestAnimationFrame(() => {
      rafId = window.requestAnimationFrame(runUpdate);
    });
    // 後備：某些情境（背景分頁／離屏渲染）會 throttle rAF 導致它不觸發，
    // 連接線就會卡在預設的左對齊位置。用 setTimeout 保證定位一定會跑到。
    if (timerId) window.clearTimeout(timerId);
    timerId = window.setTimeout(runUpdate, 120);
  };

  window.updateFeatureConnectors = updateFeatureConnectors;
  scheduleUpdate();
  window.addEventListener('resize', scheduleUpdate, { passive: true });
  window.setTimeout(scheduleUpdate, 250);
  window.setTimeout(scheduleUpdate, 750);

  document.querySelectorAll<HTMLImageElement>('.cs-sol-fconn img, .cs-sol-fimg img').forEach((img) => {
    if (!img.complete) img.addEventListener('load', scheduleUpdate, { once: true });
  });

  const observer = 'ResizeObserver' in window ? new ResizeObserver(scheduleUpdate) : null;
  if (observer) {
    document.querySelectorAll('.cs-sol-fgroup, .cs-sol-fr, .cs-sol-fimg').forEach((el) => {
      observer.observe(el);
    });
  }

  // 進入視窗時重算：首次載入的 rAF/timeout 可能在版面與圖片尚未定位完成時就跑過，
  // 之後缺少可靠的重算觸發，使用者滑到「最終 UI」區時連接線會停在錯誤（左偏）位置。
  // 用 IntersectionObserver 在每個 feature group 進入視窗時重算，確保以實際版面定位。
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) scheduleUpdate();
    }, { rootMargin: '300px 0px' });
    document.querySelectorAll('.cs-sol-fgroup').forEach((g) => io.observe(g));
  }
}

export default function AlarmLevelDemo({ tooltipLines }: Props) {
  const id = useId();
  const locale = useLocale() as Locale;
  const t = (text: string) => translateAdvantech(locale, text);

  useEffect(() => {
    setupFeatureConnectors();
  }, []);

  return (
    <div className="cs-alarm-demo">
      <input
        className="cs-alarm-mode cs-alarm-mode-default"
        id={`${id}-default`}
        name={`${id}-alarm-mode`}
        type="radio"
        defaultChecked
      />
      <input
        className="cs-alarm-mode cs-alarm-mode-hover"
        id={`${id}-hover`}
        name={`${id}-alarm-mode`}
        type="radio"
      />

      <div className="cs-alarm-toggle" role="group" aria-label={t("報警等級互動狀態")}>
        <label className="cs-alarm-toggle-btn cs-alarm-toggle-default" htmlFor={`${id}-default`}>
          <span>Default</span>
        </label>
        <label className="cs-alarm-toggle-btn cs-alarm-toggle-hover" htmlFor={`${id}-hover`}>
          <span>Hover</span>
        </label>
      </div>

      <div className="cs-alarm-panel cs-alarm-before">
        <div className="cs-alarm-state-row">
          <span className="cs-alarm-label">{t("報警等級")}</span>
          <span className="cs-alarm-help cs-alarm-help-muted">?</span>
          <span>{t("：")}</span>
          <span className="cs-alarm-chip cs-alarm-chip-danger">{t("嚴重")}</span>
        </div>
      </div>

      <span className="cs-alarm-arrow">→</span>

      <div className="cs-alarm-panel cs-alarm-after">
        <div className="cs-alarm-state-row">
          <span className="cs-alarm-label">{t("報警等級")}</span>
          <span className="cs-alarm-help-wrap">
            <span className="cs-alarm-help cs-alarm-help-active">?</span>
            <span className="cs-alarm-tip">
              {tooltipLines.map((line) => (
                <p key={line}>{t(line)}</p>
              ))}
              <span className="cs-alarm-tip-arrow" />
            </span>
          </span>
          <span>{t("：")}</span>
          <span className="cs-alarm-chip cs-alarm-chip-danger">{t("嚴重")}</span>
        </div>
      </div>
    </div>
  );
}
