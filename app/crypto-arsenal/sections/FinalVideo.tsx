"use client";

import { useEffect, useRef } from "react";

type FinalVideoProps = {
  src: string;
  label: string;
};

export default function FinalVideo({ src, label }: FinalVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <video
      ref={videoRef}
      className="ca-final-video"
      src={src}
      aria-label={label}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
    />
  );
}
