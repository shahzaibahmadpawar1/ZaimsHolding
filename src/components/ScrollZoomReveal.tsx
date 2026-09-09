"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

const LEFT_LOGO = "/assets/logos/zaimsLogo.jpg";

const RIGHT_LOGOS = [
  { src: "/assets/logos/logo.png", alt: "NexGen Build" },
  { src: "/assets/logos/edge-steel.png", alt: "Edge Steel" },
  { src: "/assets/logos/dammam-laser.png", alt: "Dammam Laser" },
] as const;

type ScrollZoomRevealProps = {
  videoSrc?: string;
  fallbackSrc?: string;
};

export default function ScrollZoomReveal({
  videoSrc = "/assets/images/video2.mp4",
  fallbackSrc = "/assets/images/video1.mp4",
}: ScrollZoomRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [resolvedSrc, setResolvedSrc] = useState(videoSrc);
  const [rightIndex, setRightIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const width = useTransform(scrollYProgress, [0, 0.72], ["11rem", "100vw"]);
  const height = useTransform(scrollYProgress, [0, 0.72], ["4.25rem", "100svh"]);
  const radius = useTransform(scrollYProgress, [0, 0.35, 0.72, 1], [999, 40, 18, 0]);
  const sideOpacity = useTransform(scrollYProgress, [0, 0.55, 0.78], [1, 1, 0]);
  const sideGap = useTransform(scrollYProgress, [0, 0.72], [16, 28]);

  useEffect(() => {
    setResolvedSrc(videoSrc);
  }, [videoSrc]);

  useEffect(() => {
    let cancelled = false;

    const probe = async () => {
      if (!videoSrc || videoSrc === fallbackSrc) return;
      try {
        const res = await fetch(videoSrc, { method: "HEAD" });
        if (!cancelled && !res.ok && fallbackSrc) {
          setResolvedSrc(fallbackSrc);
        }
      } catch {
        if (!cancelled && fallbackSrc) setResolvedSrc(fallbackSrc);
      }
    };

    void probe();
    return () => {
      cancelled = true;
    };
  }, [videoSrc, fallbackSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.muted = true;
      void video.play().catch(() => {
        /* autoplay may be blocked until interaction */
      });
    };

    video.load();
    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
    };
  }, [resolvedSrc]);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setRightIndex((i) => (i + 1) % RIGHT_LOGOS.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, [reduce]);

  const videoEl = (
    <video
      ref={videoRef}
      key={resolvedSrc}
      className="absolute inset-0 h-full w-full object-cover"
      src={resolvedSrc}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      onError={() => {
        if (fallbackSrc && resolvedSrc !== fallbackSrc) {
          setResolvedSrc(fallbackSrc);
        }
      }}
    />
  );

  const leftLogo = (
    <div className="flex h-9 shrink-0 items-center sm:h-10 md:h-11">
      <Image
        src={LEFT_LOGO}
        alt="Zaims Holding"
        width={180}
        height={48}
        className="h-8 w-auto max-w-[9rem] object-contain object-left sm:h-9 sm:max-w-[10rem] md:h-10"
        unoptimized
        priority
      />
    </div>
  );

  const rightLogo = (
    <div className="relative flex h-9 w-[7.5rem] items-center justify-center sm:h-10 sm:w-36 md:h-11 md:w-40">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={RIGHT_LOGOS[rightIndex].src}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src={RIGHT_LOGOS[rightIndex].src}
            alt={RIGHT_LOGOS[rightIndex].alt}
            width={160}
            height={44}
            className="h-7 w-auto max-w-full object-contain sm:h-8 md:h-9"
            unoptimized
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );

  if (reduce) {
    return (
      <section className="relative bg-paper" aria-label="Sectors showreel">
        <div className="relative mx-auto flex max-w-5xl items-center justify-center gap-4 px-4">
          <div className="shrink-0">{leftLogo}</div>
          <div className="relative aspect-video max-h-[70svh] min-w-0 flex-1 overflow-hidden bg-mono-100 md:rounded-3xl">
            {videoEl}
          </div>
          <div className="shrink-0">{rightLogo}</div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[220vh] bg-paper"
      aria-label="Sectors showreel"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Expanding frame — logos ride on outer edges */}
          <motion.div
            className="relative will-change-[width,height]"
            style={{ width, height }}
          >
            <motion.div
              style={{ opacity: sideOpacity, marginRight: sideGap }}
              className="pointer-events-none absolute top-1/2 right-full z-20 -translate-y-1/2"
            >
              {leftLogo}
            </motion.div>

            <motion.div
              className="absolute inset-0 overflow-hidden bg-mono-100"
              style={{ borderRadius: radius }}
            >
              {videoEl}
            </motion.div>

            <motion.div
              style={{ opacity: sideOpacity, marginLeft: sideGap }}
              className="pointer-events-none absolute top-1/2 left-full z-20 -translate-y-1/2"
            >
              {rightLogo}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
