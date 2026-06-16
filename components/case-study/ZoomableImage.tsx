"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

type ZoomableImageLabels = {
  close: string;
  separator: string;
  zoom: string;
};

type ZoomableImageProps = {
  alt: string;
  className?: string;
  height: number;
  imageClassName?: string;
  labels: ZoomableImageLabels;
  lightboxMode?: "default" | "fullscreen";
  sizes?: string;
  src: string;
  width: number;
};

export default function ZoomableImage({
  alt,
  className,
  height,
  imageClassName,
  labels,
  lightboxMode = "default",
  sizes,
  src,
  width,
}: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

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
      <button
        type="button"
        className={`cs-zoomable-image${className ? ` ${className}` : ""}`}
        aria-label={`${labels.zoom}${labels.separator}${alt}`}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          unoptimized
          className={`cs-zoomable-image-media${imageClassName ? ` ${imageClassName}` : ""}`}
        />
        <span className="cs-zoomable-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
          </svg>
        </span>
      </button>

      {isOpen ? createPortal(
        <div
          className={`cs-zoomable-lightbox${lightboxMode === "fullscreen" ? " is-fullscreen" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <p id={titleId} className="sr-only">
            {alt}
          </p>
          <button
            type="button"
            className="cs-zoomable-lightbox-close"
            aria-label={labels.close}
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            unoptimized
            className="cs-zoomable-lightbox-image"
            priority={false}
          />
        </div>,
        document.body,
      ) : null}
    </>
  );
}
