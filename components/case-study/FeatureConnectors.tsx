"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __featureConnectorsPositioned?: number;
    __featureConnectorsSetup?: boolean;
    __featureConnectorsScheduleUpdate?: () => void;
    updateFeatureConnectors?: () => void;
  }
}

function centerX(rect: DOMRect, containerRect: DOMRect) {
  return rect.left + rect.width / 2 - containerRect.left;
}

function setConnectorImage(img: HTMLImageElement, left: number, width: number) {
  img.style.maxWidth = "none";
  img.style.marginLeft = `${Math.round(left)}px`;
  img.style.width = `${Math.round(width)}px`;
  img.style.height = "";
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
    "M", topX, 1,
    "V", y1,
    "C", topX, y1 + 13 * scaleY, topX - radius / 2, midY, topX - radius, midY,
    "H", bottomX + radius,
    "C", bottomX + radius / 2, midY, bottomX, y2 - 13 * scaleY, bottomX, y2,
    "V", height - 1,
  ].join(" ");

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg width="${Math.round(width)}" height="${Math.round(height)}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${path}" stroke="#B3B3B3" stroke-width="2" stroke-linecap="square" stroke-linejoin="bevel"/></svg>`,
  )}`;
}

function imageCenterXInConnector(row: Element | undefined, connectorRect: DOMRect) {
  const image = row?.querySelector<HTMLElement>(".cs-feature-row-media");
  if (!image) return null;
  return centerX(image.getBoundingClientRect(), connectorRect);
}

function nextConnectorWidth(rows: Element[], index: number, connectorRect: DOMRect) {
  const current = imageCenterXInConnector(rows[index + 1], connectorRect);
  const next = imageCenterXInConnector(rows[index + 2], connectorRect);
  if (current === null || next === null) return null;
  return Math.abs(next - current);
}

function setFirstConnectorImage(
  img: HTMLImageElement,
  left: number,
  width: number,
  delta: number,
) {
  if (!img.dataset.originalSrc) img.dataset.originalSrc = img.getAttribute("src") || "";
  img.src = connectorOneSvg(width, delta);
  setConnectorImage(img, left, width);
}

function restoreConnectorImage(img: HTMLImageElement) {
  if (img.dataset.originalSrc && img.getAttribute("src") !== img.dataset.originalSrc) {
    img.src = img.dataset.originalSrc;
  }
}

function updateFeatureConnectors() {
  const groups = document.querySelectorAll(".cs-sol-fgroup");
  const isMiddleDesktop = window.innerWidth >= 1025 && window.innerWidth < 1440;
  let positioned = 0;

  groups.forEach((group) => {
    const rows = Array.from(group.querySelectorAll(".cs-feature-row"));
    const connectors = Array.from(group.querySelectorAll(".cs-sol-fconn"));

    connectors.forEach((connector, index) => {
      const topRow = rows[index];
      const bottomRow = rows[index + 1];
      const img = connector.querySelector<HTMLImageElement>("img");
      const topImage = topRow?.querySelector<HTMLElement>(".cs-feature-row-media");
      const bottomImage = bottomRow?.querySelector<HTMLElement>(".cs-feature-row-media");

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

export function setupFeatureConnectors() {
  if (window.__featureConnectorsSetup) {
    window.__featureConnectorsScheduleUpdate?.();
    return;
  }
  window.__featureConnectorsSetup = true;

  let rafId = 0;
  let timerId = 0;
  const runUpdate = () => {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }
    if (timerId) {
      window.clearTimeout(timerId);
      timerId = 0;
    }
    updateFeatureConnectors();
  };
  const scheduleUpdate = () => {
    if (rafId) window.cancelAnimationFrame(rafId);
    rafId = window.requestAnimationFrame(() => {
      rafId = window.requestAnimationFrame(runUpdate);
    });
    if (timerId) window.clearTimeout(timerId);
    timerId = window.setTimeout(runUpdate, 120);
  };

  window.updateFeatureConnectors = updateFeatureConnectors;
  window.__featureConnectorsScheduleUpdate = scheduleUpdate;
  scheduleUpdate();
  window.addEventListener("resize", scheduleUpdate, { passive: true });
  window.addEventListener("load", scheduleUpdate, { passive: true });
  window.setTimeout(scheduleUpdate, 250);
  window.setTimeout(scheduleUpdate, 750);
  window.setTimeout(scheduleUpdate, 1500);

  document.fonts?.ready.then(scheduleUpdate).catch(() => {});

  document.querySelectorAll<HTMLImageElement>(".cs-sol-fconn img, .cs-feature-row-media img").forEach((img) => {
    img.addEventListener("load", scheduleUpdate);
    if ("decode" in img) {
      img.decode().then(scheduleUpdate).catch(() => {});
    }
  });

  const observer = "ResizeObserver" in window ? new ResizeObserver(scheduleUpdate) : null;
  if (observer) {
    document.querySelectorAll(".cs-sol-fgroup, .cs-feature-row, .cs-feature-row-media, .cs-feature-zoom-trigger").forEach((el) => {
      observer.observe(el);
    });
  }

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) scheduleUpdate();
    }, { rootMargin: "500px 0px" });
    document.querySelectorAll(".cs-sol-fgroup").forEach((g) => io.observe(g));
  }
}

export default function FeatureConnectors() {
  useEffect(() => {
    setupFeatureConnectors();
  }, []);

  return (
    <span
      aria-hidden="true"
      data-feature-connectors
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        overflow: "hidden",
        opacity: 0,
        pointerEvents: "none",
      }}
    />
  );
}
