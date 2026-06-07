"use client";

import { useState, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { motion, Variants } from "framer-motion";

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

const spring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
  mass: 1,
};

const rootVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.96,
    y: 16,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: spring,
  },
  hover: {
    opacity: 1,
    scale: 1.02,
    y: 0,
    transition: spring,
  },
};

const avatarFrameVariants: Variants = {
  animate: {
    x: 0,
    y: 0,
    scale: 1,
    transition: spring,
  },
  hover: {
    x: 0,
    y: 0,
    scale: 1,
    transition: spring,
  },
};

const initialImageVariants: Variants = {
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: spring,
  },
  hover: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: spring,
  },
};

const hoverImageVariants: Variants = {
  animate: {
    opacity: 0,
    x: 0,
    y: 0,
    scale: 1,
    transition: spring,
  },
  hover: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: spring,
  },
};

const orbitGroupVariants: Variants = {
  animate: {
    rotate: 0,
    transition: spring,
  },
  hover: {
    rotate: -38,
    transition: spring,
  },
};

const badgeCounterRotateVariants: Variants = {
  animate: {
    rotate: 0,
    transition: spring,
  },
  hover: {
    rotate: 38,
    transition: spring,
  },
};

const badgeImageVariants: Variants = {
  animate: {
    opacity: 1,
    transition: spring,
  },
  hover: {
    opacity: 0,
    transition: spring,
  },
};

const badgeHoverImageVariants: Variants = {
  animate: {
    opacity: 0,
    transition: spring,
  },
  hover: {
    opacity: 1,
    transition: spring,
  },
};

const arrowImageVariants: Variants = {
  animate: {
    opacity: 0,
    transition: spring,
  },
  hover: {
    opacity: 1,
    transition: spring,
  },
};

type RippleCustomProperties = CSSProperties & {
  "--ripple-color": string;
  "--ripple-bg-color": string;
  "--ripple-shadow-color": string;
};

const rippleVariants: Variants = {
  animate: {
    "--ripple-color": "rgba(255, 255, 255, 0.65)",
    "--ripple-bg-color": "rgba(255, 255, 255, 0.12)",
    "--ripple-shadow-color": "rgba(255, 255, 255, 0.35)",
    transition: { duration: 0.3 }
  } as Variants[string],
  hover: {
    "--ripple-color": "rgba(253, 224, 71, 0.65)",
    "--ripple-bg-color": "rgba(253, 224, 71, 0.12)",
    "--ripple-shadow-color": "rgba(253, 224, 71, 0.35)",
    transition: { duration: 0.3 }
  } as Variants[string],
};

const ring1Variants: Variants = {
  animate: {
    scale: [0.98, 1.45],
    opacity: [0, 0.8, 0],
    transition: {
      duration: 2.5,
      ease: "easeOut" as const,
      repeat: Infinity,
      delay: 0,
    }
  }
};

const ring2Variants: Variants = {
  animate: {
    scale: [0.98, 1.45],
    opacity: [0, 0.8, 0],
    transition: {
      duration: 2.5,
      ease: "easeOut" as const,
      repeat: Infinity,
      delay: 1.25,
    }
  }
};

function ImageLayer({ src, variants }: { src: string; variants: Variants }) {
  return (
    <motion.span
      className="absolute inset-0 bg-contain bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${src})` }}
      variants={variants}
      aria-hidden="true"
    />
  );
}

function BadgeImage({ src, hoverSrc }: { src: string; hoverSrc: string }) {
  return (
    <>
      <ImageLayer src={src} variants={badgeImageVariants} />
      <ImageLayer src={hoverSrc} variants={badgeHoverImageVariants} />
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
  return (
    <motion.div
      className="relative h-full w-full"
      animate={{
        rotate: [-rotateRange, rotateRange, -rotateRange],
        scale: [1, scaleRange, 1],
      }}
      transition={{
        rotate: {
          duration,
          ease: "easeInOut",
          repeat: Infinity,
        },
        scale: {
          duration: scaleDuration,
          ease: "easeInOut",
          repeat: Infinity,
        },
      }}
    >
      <BadgeImage src={src} hoverSrc={hoverSrc} />
    </motion.div>
  );
}

function ArrowMark({ src }: { src: string }) {
  return (
    <motion.span
      className="block h-full w-full bg-contain bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${src})` }}
      variants={arrowImageVariants}
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
  const ref = useRef<HTMLDivElement | null>(null);

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
      if (ref.current && !ref.current.contains(target)) {
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

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-visible cursor-pointer ${className}`}
      style={{ width: 440, height: 427 }}
      initial="initial"
      animate={usesPressInteraction ? (isTapped ? "hover" : "animate") : "animate"}
      whileHover={usesPressInteraction ? undefined : "hover"}
      onClick={(e) => {
        if (usesPressInteraction) {
          e.stopPropagation();
          setIsTapped((prev) => !prev);
        }
      }}
      variants={rootVariants}
    >
      {/* Ripple effect - visible before and during hover, rendered behind avatar frame */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: 220,
          top: 215,
          width: 0,
          height: 0,
          "--ripple-color": "rgba(255, 255, 255, 0.65)",
          "--ripple-bg-color": "rgba(255, 255, 255, 0.12)",
          "--ripple-shadow-color": "rgba(255, 255, 255, 0.35)",
        } as RippleCustomProperties}
        variants={rippleVariants}
        aria-hidden="true"
      >
        <motion.div
          className="absolute rounded-full"
          style={{
            left: -135,
            top: -135,
            width: 270,
            height: 270,
            border: '2px solid var(--ripple-color)',
            background: 'radial-gradient(circle, var(--ripple-bg-color) 60%, transparent 100%)',
            boxShadow: '0 0 16px var(--ripple-shadow-color)',
          }}
          variants={ring1Variants}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            left: -135,
            top: -135,
            width: 270,
            height: 270,
            border: '2px solid var(--ripple-color)',
            background: 'radial-gradient(circle, var(--ripple-bg-color) 60%, transparent 100%)',
            boxShadow: '0 0 16px var(--ripple-shadow-color)',
          }}
          variants={ring2Variants}
        />
      </motion.div>

      <motion.div
        className="absolute overflow-visible"
        style={{ left: 50, top: 48, width: 340, height: 334 }}
        variants={avatarFrameVariants}
      >
        <motion.img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-contain object-center"
          variants={initialImageVariants}
        />
        <motion.img
          src={hoverImageSrc ?? imageSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-contain object-center"
          variants={hoverImageVariants}
        />
      </motion.div>

      <motion.div
        className="absolute"
        style={{ left: 220, top: 214, width: 0, height: 0 }}
        variants={orbitGroupVariants}
        aria-hidden="true"
      >
        <motion.div
          className={badgeClassName}
          style={polarPosition(222, badgeRadius, badgeSize)}
        >
          <motion.div
            className="relative h-full w-full"
            variants={badgeCounterRotateVariants}
          >
            <WobbleBadge
              src={drillIconSrc}
              hoverSrc={drillIconHoverSrc}
              rotateRange={9}
              duration={3.3}
              scaleRange={1.08}
              scaleDuration={2.8}
            />
          </motion.div>
        </motion.div>

        <div
          className="absolute"
          style={polarPosition(274, arrowRadius, arrowSize)}
        >
          <div className="h-full w-full" style={{ rotate: "10deg" }}>
            <ArrowMark src={arrowSrc} />
          </div>
        </div>

        <motion.div
          className={badgeClassName}
          style={polarPosition(0, badgeRadius, badgeSize)}
        >
          <motion.div
            className="relative h-full w-full"
            variants={badgeCounterRotateVariants}
          >
            <WobbleBadge
              src={groupIconSrc}
              hoverSrc={groupIconHoverSrc}
              rotateRange={11}
              duration={3.6}
              scaleRange={1.06}
              scaleDuration={3.1}
            />
          </motion.div>
        </motion.div>

        <div
          className="absolute"
          style={polarPosition(40, arrowRadius, arrowSize)}
        >
          <div className="h-full w-full" style={{ rotate: "150deg" }}>
            <ArrowMark src={arrowSrc} />
          </div>
        </div>

        <motion.div
          className={badgeClassName}
          style={polarPosition(112, badgeRadius, badgeSize)}
        >
          <motion.div
            className="relative h-full w-full"
            variants={badgeCounterRotateVariants}
          >
            <WobbleBadge
              src={lightbulbIconSrc}
              hoverSrc={lightbulbIconHoverSrc}
              rotateRange={10}
              duration={3.9}
              scaleRange={1.09}
              scaleDuration={3.4}
            />
          </motion.div>
        </motion.div>

        <div
          className="absolute"
          style={polarPosition(154, arrowRadius, arrowSize)}
        >
          <div className="h-full w-full" style={{ rotate: "-120deg" }}>
            <ArrowMark src={arrowSrc} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
