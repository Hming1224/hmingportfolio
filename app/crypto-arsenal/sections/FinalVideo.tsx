"use client";

import { CSSProperties, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type FinalVideoLabels = {
  close: string;
  separator: string;
  zoom: string;
};

type FinalVideoProps = {
  src: string;
  label: string;
  labels: FinalVideoLabels;
  mask?: string;
};

type MaskedVideoStyle = CSSProperties & {
  "--ca-video-mask"?: string;
};

export default function FinalVideo({ src, label, labels, mask }: FinalVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const style: MaskedVideoStyle | undefined = mask
    ? { "--ca-video-mask": `url(${mask})` }
    : undefined;
  const videoClassName = mask
    ? "ca-final-video ca-final-video--masked"
    : "ca-final-video";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      video.muted = true;
      void video.play().catch(() => {
        // Some browsers defer autoplay until the user interacts with the page.
      });
    };

    if (!("IntersectionObserver" in window)) {
      play();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        className="ca-final-video-button"
        aria-label={`${labels.zoom}${labels.separator}${label}`}
        onClick={() => setIsOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsOpen(true);
          }
        }}
      >
        <video
          ref={videoRef}
          className={videoClassName}
          src={src}
          style={style}
          aria-label={label}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        <span className="cs-zoomable-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
          </svg>
        </span>
      </div>

      {isOpen ? createPortal(
        <div
          className="ca-final-video-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <p id={titleId} className="sr-only">
            {label}
          </p>
          <button
            type="button"
            className="cs-zoomable-lightbox-close"
            aria-label={labels.close}
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
          <div
            className="ca-final-video-lightbox-frame"
          >
            <video
              className={mask
                ? "ca-final-video-lightbox-media ca-final-video--masked"
                : "ca-final-video-lightbox-media"}
              src={src}
              style={style}
              aria-label={label}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  );
}
