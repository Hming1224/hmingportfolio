"use client";

import { useState, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import styles from "./AvatarProfile.module.css";

export interface AvatarProfileProps {
  imageSrc: string;
  hoverImageSrc?: string;
  imageAlt?: string;
  className?: string;
  drillIconSrc?: string;
  drillIconHoverSrc?: string;
  groupIconSrc?: string;
  groupIconHoverSrc?: string;
  lightbulbIconSrc?: string;
  lightbulbIconHoverSrc?: string;
  arrowSrc?: string;
}

type WobbleCustomProperties = CSSProperties & {
  "--wobble-range": number;
  "--wobble-rotate-dur": string;
  "--wobble-scale": number;
  "--wobble-scale-dur": string;
};

function ImageLayer({ src, className }: { src: string; className: string }) {
  return (
    <span
      className={`absolute inset-0 bg-contain bg-center bg-no-repeat ${className}`}
      style={{ backgroundImage: `url(${src})` }}
      aria-hidden="true"
    />
  );
}

function BadgeImage({ src, hoverSrc }: { src: string; hoverSrc: string }) {
  return (
    <>
      <ImageLayer src={src} className={styles.badgeImage} />
      <ImageLayer src={hoverSrc} className={styles.badgeHoverImage} />
    </>
  );
}

function WobbleBadge({
  src,
  hoverSrc,
  rotateRange,
  duration,
  scaleRange,
  scaleDuration,
}: {
  src: string;
  hoverSrc: string;
  rotateRange: number;
  duration: number;
  scaleRange: number;
  scaleDuration: number;
}) {
  // Two nested layers so rotate and scale run on independent periods
  // (a single element's transform can only be driven by one keyframe at a time).
  return (
    <div
      className={styles.wobbleRotate}
      style={
        {
          "--wobble-range": rotateRange,
          "--wobble-rotate-dur": `${duration}s`,
          "--wobble-scale": scaleRange,
          "--wobble-scale-dur": `${scaleDuration}s`,
        } as WobbleCustomProperties
      }
    >
      <div className={styles.wobbleScale}>
        <BadgeImage src={src} hoverSrc={hoverSrc} />
      </div>
    </div>
  );
}

function ArrowMark({ src }: { src: string }) {
  return (
    <span
      className={`block h-full w-full bg-contain bg-center bg-no-repeat ${styles.arrow}`}
      style={{ backgroundImage: `url(${src})` }}
      aria-hidden="true"
    />
  );
}

function polarPosition(angle: number, radius: number, size: number) {
  const radians = (angle * Math.PI) / 180;

  return {
    left: Math.cos(radians) * radius - size / 2,
    top: Math.sin(radians) * radius - size / 2,
    width: size,
    height: size,
  };
}

function shouldUsePressInteraction() {
  if (typeof window === "undefined") return false;

  const hasCoarsePrimaryPointer = window.matchMedia("(pointer: coarse)").matches;
  const cannotHover = window.matchMedia("(hover: none)").matches;
  const hasAnyHoverInput = window.matchMedia("(any-hover: hover)").matches;

  return hasCoarsePrimaryPointer && cannotHover && !hasAnyHoverInput;
}

export default function AvatarProfile({
  imageSrc,
  hoverImageSrc,
  imageAlt = "Profile avatar",
  className = "",
  drillIconSrc = "/avatar/designer-gray.png",
  drillIconHoverSrc = "/avatar/designer-color.png",
  groupIconSrc = "/avatar/coordinator-gray.png",
  groupIconHoverSrc = "/avatar/coordinator-color.png",
  lightbulbIconSrc = "/avatar/engineer-gray.png",
  lightbulbIconHoverSrc = "/avatar/engineer-color.png",
  arrowSrc = "/avatar/upper-right-arrow.png",
}: AvatarProfileProps) {
  const [usesPressInteraction, setUsesPressInteraction] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    const hoverQuery = window.matchMedia("(hover: none)");
    const anyHoverQuery = window.matchMedia("(any-hover: hover)");
    const updateInteractionMode = () => {
      setUsesPressInteraction(shouldUsePressInteraction());
      setIsTapped(false);
    };

    const timer = setTimeout(updateInteractionMode, 0);
    pointerQuery.addEventListener("change", updateInteractionMode);
    hoverQuery.addEventListener("change", updateInteractionMode);
    anyHoverQuery.addEventListener("change", updateInteractionMode);

    return () => {
      clearTimeout(timer);
      pointerQuery.removeEventListener("change", updateInteractionMode);
      hoverQuery.removeEventListener("change", updateInteractionMode);
      anyHoverQuery.removeEventListener("change", updateInteractionMode);
    };
  }, []);

  useEffect(() => {
    if (!isTapped || !usesPressInteraction) return;

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (rootRef.current && !rootRef.current.contains(target)) {
        setIsTapped(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [isTapped, usesPressInteraction]);

  const badgeClassName = "absolute";
  const badgeSize = 78;
  const arrowSize = 72;
  const badgeRadius = 160;
  const arrowRadius = 198;

  const isPressed = usesPressInteraction && isTapped;

  return (
    <div
      ref={rootRef}
      className={`${styles.root} relative overflow-visible cursor-pointer ${className}`}
      style={{ width: 440, height: 427 }}
      data-pressed={isPressed ? "true" : undefined}
      onClick={(e) => {
        if (usesPressInteraction) {
          e.stopPropagation();
          setIsTapped((prev) => !prev);
        }
      }}
    >
      {/* Ripple effect - visible before and during hover, rendered behind avatar frame */}
      <div
        className={`${styles.rippleContainer} absolute pointer-events-none`}
        style={{ left: 220, top: 215, width: 0, height: 0 }}
        aria-hidden="true"
      >
        <div className={styles.ring} />
        <div className={`${styles.ring} ${styles.ring2}`} />
      </div>

      <div
        className="absolute overflow-visible"
        style={{ left: 50, top: 48, width: 340, height: 334 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size cross-fade layer, next/image would complicate the object-contain overlay */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className={`absolute inset-0 h-full w-full object-contain object-center ${styles.initialImage}`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size cross-fade layer, next/image would complicate the object-contain overlay */}
        <img
          src={hoverImageSrc ?? imageSrc}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-contain object-center ${styles.hoverImage}`}
        />
      </div>

      <div
        className={`${styles.orbitGroup} absolute`}
        style={{ left: 220, top: 214, width: 0, height: 0 }}
        aria-hidden="true"
      >
        <div className={badgeClassName} style={polarPosition(222, badgeRadius, badgeSize)}>
          <div className={`${styles.badgeCounter} relative h-full w-full`}>
            <WobbleBadge
              src={drillIconSrc}
              hoverSrc={drillIconHoverSrc}
              rotateRange={9}
              duration={3.3}
              scaleRange={1.08}
              scaleDuration={2.8}
            />
          </div>
        </div>

        <div className="absolute" style={polarPosition(274, arrowRadius, arrowSize)}>
          <div className="h-full w-full" style={{ rotate: "10deg" }}>
            <ArrowMark src={arrowSrc} />
          </div>
        </div>

        <div className={badgeClassName} style={polarPosition(0, badgeRadius, badgeSize)}>
          <div className={`${styles.badgeCounter} relative h-full w-full`}>
            <WobbleBadge
              src={groupIconSrc}
              hoverSrc={groupIconHoverSrc}
              rotateRange={11}
              duration={3.6}
              scaleRange={1.06}
              scaleDuration={3.1}
            />
          </div>
        </div>

        <div className="absolute" style={polarPosition(40, arrowRadius, arrowSize)}>
          <div className="h-full w-full" style={{ rotate: "150deg" }}>
            <ArrowMark src={arrowSrc} />
          </div>
        </div>

        <div className={badgeClassName} style={polarPosition(112, badgeRadius, badgeSize)}>
          <div className={`${styles.badgeCounter} relative h-full w-full`}>
            <WobbleBadge
              src={lightbulbIconSrc}
              hoverSrc={lightbulbIconHoverSrc}
              rotateRange={10}
              duration={3.9}
              scaleRange={1.09}
              scaleDuration={3.4}
            />
          </div>
        </div>

        <div className="absolute" style={polarPosition(154, arrowRadius, arrowSize)}>
          <div className="h-full w-full" style={{ rotate: "-120deg" }}>
            <ArrowMark src={arrowSrc} />
          </div>
        </div>
      </div>
    </div>
  );
}
