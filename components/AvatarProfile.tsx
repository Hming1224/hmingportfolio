"use client";

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
    scale: 1.02,
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
    opacity: 0,
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
  const badgeClassName = "absolute";
  const badgeSize = 78;
  const arrowSize = 72;
  const badgeRadius = 160;
  const arrowRadius = 198;

  return (
    <motion.div
      className={`relative overflow-visible ${className}`}
      style={{ width: 440, height: 427 }}
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={rootVariants}
    >
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
