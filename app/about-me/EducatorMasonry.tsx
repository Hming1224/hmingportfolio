"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

type EducatorItem = {
  badge: string;
  title: string;
  href: string | null;
  role: string;
  desc: string;
  date: string;
  image: string;
};

function preloadImages(urls: string[]) {
  return Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const image = new window.Image();
          image.src = src;
          image.onload = () => resolve();
          image.onerror = () => resolve();
        }),
    ),
  );
}

export default function EducatorMasonry({ items }: { items: EducatorItem[] }) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [imagesReady, setImagesReady] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const hasMounted = useRef(false);

  const educatorItems = useMemo(
    () =>
      items.map((item, index) => ({
        ...item,
        id: `${item.title}-${index}`,
      })),
    [items],
  );

  useEffect(() => {
    let isActive = true;

    preloadImages(educatorItems.map((item) => item.image)).then(() =>
      isActive ? setImagesReady(true) : undefined,
    );

    return () => {
      isActive = false;
    };
  }, [educatorItems]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasEntered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setHasEntered(true);
        observer.disconnect();
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.18,
      },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [containerRef, hasEntered]);

  useLayoutEffect(() => {
    if (!hasEntered || !imagesReady || educatorItems.length === 0) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    educatorItems.forEach((item, index) => {
      const selector = `[data-educator-key="${item.id}"]`;

      if (reduceMotion) {
        gsap.set(selector, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        });
        return;
      }

      if (!hasMounted.current) {
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            y: 150,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.82,
            ease: "power3.out",
            delay: index * 0.06,
          },
        );
        return;
      }

      gsap.to(selector, {
        opacity: 1,
        y: 0,
        duration: 0.58,
        ease: "power3.out",
        overwrite: "auto",
      });
    });

    hasMounted.current = true;
  }, [educatorItems, hasEntered, imagesReady]);

  return (
    <section ref={containerRef} className="educator-section educator-masonry">
      {educatorItems.map((item) => {
        const content = (
          <>
            <div className="educator-card-photo">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
            <div className="educator-card-body">
              <span className="educator-badge">{item.badge}</span>
              <h3>{item.title}</h3>
              <p className="educator-role">{item.role}</p>
              <div className="educator-reveal">
                <div className="educator-reveal-inner">
                  <p>{item.desc}</p>
                  <p className="educator-date">{item.date}</p>
                </div>
              </div>
            </div>
          </>
        );

        if (item.href) {
          return (
            <a
              className="educator-card"
              data-educator-key={item.id}
              href={item.href}
              key={item.id}
              rel="noopener noreferrer"
              target="_blank"
            >
              {content}
            </a>
          );
        }

        return (
          <article
            className="educator-card"
            data-educator-key={item.id}
            key={item.id}
            tabIndex={0}
          >
            {content}
          </article>
        );
      })}
    </section>
  );
}
