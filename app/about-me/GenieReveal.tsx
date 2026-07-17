"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { toCanvas } from "html-to-image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

/**
 * GenieReveal — macOS「神燈/genie」進場效果的網頁版（canvas 掃描線手法）。
 *
 * 架構參考 ui-layouts/mac-genie + Ciechan/BCGenieEffect 的關鍵設計：
 * 1. 【預拍快照並快取】掛載後在 requestIdleCallback 把卡片離屏 clone 拍成點陣圖，
 *    存起來。觸發時直接用快取 → 零延遲，避免「現拍要等 ~900ms 空白」。
 * 2. 【純 canvas rAF 變形】逐條掃描線把快照重畫到 canvas，每列左右/垂直位置用
 *    分列錯開的緩動算出漏斗收口。變形全程在 canvas drawImage（GPU、不碰 DOM）。
 * 3. 【乾淨換場】動畫結束先顯示真卡片、下一幀才清掉 canvas，避免背景白閃。
 *
 * 註：html-to-image 在 next/font 環境下「嵌入字型」那步會卡死，因此用 skipFonts；
 * clone 仍在 document 內渲染，實測字型呈現可接受。
 */

const DUR = 700; // 漏斗變形時長（ms）
const VIEWPORT_DOCK_CLASS = "genie-dock-icon--viewport";
const CARD_EDGE_DOCK_CLASS = "genie-dock-icon--card-edge";

type GenieRevealProps = {
  children: React.ReactNode;
  className?: string;
  dockIconSrc?: string;
  threshold?: number;
};

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const eioC = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const eIn2 = (t: number) => t * t;

export default function GenieReveal({
  children,
  className = "",
  dockIconSrc = "/avatar/avatar-gray-dock.png",
  threshold = 0.05,
}: GenieRevealProps) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dockIconRef = useRef<HTMLDivElement | null>(null);
  // 快取：預拍好的快照、當時的尺寸與 pixelRatio
  const snapRef = useRef<{
    off: HTMLCanvasElement;
    w: number;
    h: number;
  } | null>(null);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const card = cardRef.current;
    const canvas = canvasRef.current;
    const dockIcon = dockIconRef.current;
    if (!outer || !card || !canvas || !dockIcon) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      card.style.visibility = "visible";
      dockIcon.style.display = "none";
      return;
    }

    let killed = false;
    let played = false;
    let pendingPlay = false; // 觸發時快照還沒好 → 標記，好了立刻播
    let rafId = 0;
    let placementRafId = 0;
    let placementTimer = 0;

    const updateDockPlacement = () => {
      if (killed) return;
      dockIcon.classList.remove(VIEWPORT_DOCK_CLASS);
      dockIcon.classList.remove(CARD_EDGE_DOCK_CLASS);
      const cardRect = card.getBoundingClientRect();
      if (cardRect.bottom - 18 > window.innerHeight) {
        dockIcon.classList.add(VIEWPORT_DOCK_CLASS);
      } else {
        dockIcon.classList.add(CARD_EDGE_DOCK_CLASS);
      }
    };

    const scheduleDockPlacement = () => {
      cancelAnimationFrame(placementRafId);
      placementRafId = requestAnimationFrame(updateDockPlacement);
    };

    updateDockPlacement();
    scheduleDockPlacement();
    placementTimer = window.setTimeout(updateDockPlacement, 500);
    if (document.fonts?.ready) {
      document.fonts.ready.then(scheduleDockPlacement).catch(() => {});
    }
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(scheduleDockPlacement)
        : null;
    resizeObserver?.observe(card);
    resizeObserver?.observe(outer);
    window.addEventListener("resize", scheduleDockPlacement);
    window.addEventListener("orientationchange", scheduleDockPlacement);

    // ── 1. 預拍快照（idle 時跑，使用者看不到）──────────────────────────────
    const takeSnapshot = async () => {
      const rect = card.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w === 0 || h === 0) return;

      const clone = card.cloneNode(true) as HTMLElement;
      clone.style.visibility = "visible";
      const holder = document.createElement("div");
      holder.style.cssText = `position:fixed;left:-10000px;top:0;width:${w}px;pointer-events:none;`;
      holder.appendChild(clone);
      document.body.appendChild(holder);

      try {
        if (document.fonts?.ready) await document.fonts.ready;
        const off = await toCanvas(clone, {
          pixelRatio: 1,
          cacheBust: false,
          skipFonts: true,
        });
        if (killed) return;
        snapRef.current = { off, w, h };
        if (pendingPlay) play();
      } catch (err) {
        console.error("[GenieReveal] snapshot failed:", err);
        if (!killed) outer.style.visibility = "visible";
      } finally {
        document.body.removeChild(holder);
      }
    };

    // ── 2. 播放漏斗變形（純 canvas + rAF）─────────────────────────────────
    const play = () => {
      if (played || killed) return;
      const snap = snapRef.current;
      if (!snap) {
        pendingPlay = true; // 快照還沒好，等好了再播
        return;
      }
      updateDockPlacement();
      played = true;

      const { off, w, h } = snap;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        outer.style.visibility = "visible";
        return;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const getDockTarget = () => {
        updateDockPlacement();
        const cardRect = card.getBoundingClientRect();
        const dockRect = dockIcon.getBoundingClientRect();
        // 漏斗吸入點 = 目前畫面上的 dock icon 下緣中心。
        // 字卡底部仍在 viewport 內時貼近卡片；超出 viewport 時貼近畫面下緣。
        return {
          dockX: clamp(dockRect.left + dockRect.width / 2 - cardRect.left, 0, w),
          dockY: clamp(dockRect.bottom - cardRect.top, 0, h),
        };
      };

      const renderGenie = (rawT: number, dockX: number, dockY: number) => {
        ctx.clearRect(0, 0, w, h);
        for (let y = 0; y < h; y++) {
          const r = y / h;
          const rowXStart = r * 0.65; // 越上面越晚水平展開 → 漏斗收口
          const xE = eioC(clamp((rawT - rowXStart) / (1 - rowXStart), 0, 1));
          const rowYStart = r * 0.2; // 越上面越晚爬升 → 流體吸附
          const yE = eIn2(clamp((rawT - rowYStart) / (1 - rowYStart), 0, 1));
          const left = lerp(dockX, 0, xE);
          const right = lerp(dockX, w, xE);
          const destY = lerp(dockY, y, yE);
          const rowW = right - left;
          if (rowW < 0.8) continue;
          ctx.drawImage(off, 0, y, w, 1, left, destY, rowW, 1);
        }
      };

      const playGenie = () => {
        const { dockX, dockY } = getDockTarget();
        // 真卡片隱藏、canvas 顯示，畫起始收合狀態
        canvas.style.display = "block";
        canvas.style.opacity = "1";
        card.style.visibility = "hidden";
        renderGenie(0, dockX, dockY);

        let start: number | null = null;
        const frame = (ts: number) => {
          if (killed) return;
          if (start === null) start = ts;
          const rawT = clamp((ts - start) / DUR, 0, 1);
          renderGenie(rawT, dockX, dockY);
          if (rawT < 1) {
            rafId = requestAnimationFrame(frame);
          } else {
            // 換場：真卡片直接接上 canvas 最後一幀，避免額外 opacity/scale
            // 動畫和 canvas 淡出互相疊加造成閃爍。
            card.style.visibility = "visible";
            gsap.to(canvas, {
              opacity: 0,
              duration: 0.16,
              ease: "power1.out",
              onComplete: () => {
                canvas.style.display = "none";
              },
            });
          }
        };
        rafId = requestAnimationFrame(frame);
      };

      const iconTimeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: playGenie,
      });

      iconTimeline
        .set(dockIcon, {
          opacity: 1,
          scale: 1,
          y: 0,
          transformOrigin: "center bottom",
        })
        .to(dockIcon, { y: -30, scale: 1.08, duration: 0.2 })
        .to(dockIcon, { y: 0, scale: 0.96, duration: 0.16, ease: "power2.in" })
        .to(dockIcon, { y: -20, scale: 1.05, duration: 0.16 })
        .to(dockIcon, { y: 0, scale: 1, duration: 0.14, ease: "power2.in" })
        .to(dockIcon, {
          opacity: 0,
          scale: 0.65,
          duration: 0.16,
          ease: "power1.out",
        });
    };

    // ── 預拍：頭貼 icon 先佔住畫面，快照稍微延後避免擋首屏 paint ─────────────
    const snapshotTimer = window.setTimeout(takeSnapshot, 120);

    // ── 觸發：滾到才播（首屏卡片一進視線即觸發）──────────────────────────
    const trigger = ScrollTrigger.create({
      trigger: outer,
      start: `top ${(1 - threshold) * 100}%`,
      once: true,
      onEnter: () => play(),
    });

    const firstScreenTimer = window.setTimeout(() => {
      const rect = outer.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) play();
    }, 180);

    return () => {
      killed = true;
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(placementRafId);
      trigger.kill();
      gsap.killTweensOf(canvas);
      gsap.killTweensOf(card);
      gsap.killTweensOf(dockIcon);
      clearTimeout(snapshotTimer);
      clearTimeout(firstScreenTimer);
      clearTimeout(placementTimer);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", scheduleDockPlacement);
      window.removeEventListener("orientationchange", scheduleDockPlacement);
    };
  }, [threshold]);

  return (
    <div
      ref={outerRef}
      className={className}
      style={{ position: "relative" }}
    >
      <div ref={cardRef} style={{ visibility: "hidden" }}>
        {children}
      </div>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "none",
          pointerEvents: "none",
        }}
      />
      <div ref={dockIconRef} className="genie-dock-icon" aria-hidden="true">
        {/* genie 動畫的起點，須在動畫觸發當下就緒；配合 preload + 同步解碼，
            走原檔省去優化往返（來源為 168px / 28KB 的 dock 專用圖）。 */}
        <Image
          src={dockIconSrc}
          alt=""
          width={68}
          height={68}
          preload
          unoptimized
          decoding="sync"
        />
      </div>
    </div>
  );
}
