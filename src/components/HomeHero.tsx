"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

/**
 * Scroll hero inspired by Framer MokuHero:
 * https://www.framer.com/marketplace/components/mokuhero/
 *
 * Start: 1.png is full-bleed. On scroll it insets into a rounded card while
 * 2–5.jpg settle into a tight asymmetric grid around it.
 */

const CENTER = "/assets/images/1.png";
const GAP = "0.5rem";

/** Settled: center 56% × 80%, sides 20% — fills most of the viewport */
const SATELLITES = [
  {
    src: "/assets/images/2.jpg",
    alt: "Precision welding on site",
    className:
      "left-[calc(50%-28%-var(--hero-gap)-20%)] top-[calc(50%-40%)] h-[39%] w-[20%]",
    from: { x: -80, y: -40, rotate: -4 },
    to: { x: 0, y: 0, rotate: -1 },
  },
  {
    src: "/assets/images/3.jpg",
    alt: "Heavy fabrication work",
    className:
      "right-[calc(50%-28%-var(--hero-gap)-20%)] top-[calc(50%-40%)] h-[39%] w-[20%]",
    from: { x: 80, y: -40, rotate: 4 },
    to: { x: 0, y: 0, rotate: 1 },
  },
  {
    src: "/assets/images/4.jpg",
    alt: "Industrial plant structure",
    className:
      "left-[calc(50%-28%-var(--hero-gap)-20%)] bottom-[calc(50%-40%)] h-[39%] w-[20%]",
    from: { x: -80, y: 40, rotate: 3 },
    to: { x: 0, y: 0, rotate: 0.75 },
  },
  {
    src: "/assets/images/5.jpg",
    alt: "Kingdom industrial operations",
    className:
      "right-[calc(50%-28%-var(--hero-gap)-20%)] bottom-[calc(50%-40%)] h-[39%] w-[20%]",
    from: { x: 80, y: 40, rotate: -3 },
    to: { x: 0, y: 0, rotate: -0.75 },
  },
] as const;

function MagneticCTA({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 20 });
  const springY = useSpring(y, { stiffness: 280, damping: 20 });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.25);
    y.set(dy * 0.25);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    variant === "primary"
      ? "rounded-full bg-surface px-6 py-3.5 text-sm font-semibold text-brand-primary shadow-lg shadow-black/25"
      : "rounded-full border border-surface/35 bg-surface/10 px-6 py-3.5 text-sm font-semibold text-surface backdrop-blur-sm";

  return (
    <motion.div style={{ x: springX, y: springY }}>
      <Link
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`${base} inline-flex cursor-pointer transition-colors hover:opacity-95`}
      >
        {children}
      </Link>
    </motion.div>
  );
}

function Satellite({
  src,
  alt,
  className,
  from,
  to,
  progress,
}: {
  src: string;
  alt: string;
  className: string;
  from: { x: number; y: number; rotate: number };
  to: { x: number; y: number; rotate: number };
  progress: MotionValue<number>;
}) {
  const x = useTransform(progress, [0.06, 0.4, 1], [from.x, to.x, to.x]);
  const y = useTransform(progress, [0.06, 0.4, 1], [from.y, to.y, to.y]);
  const rotate = useTransform(progress, [0.06, 0.4, 1], [from.rotate, to.rotate, to.rotate]);
  // Fade in once, then stay fully opaque for the rest of the hero scroll
  const opacity = useTransform(progress, [0.04, 0.1, 1], [0, 1, 1]);
  const scale = useTransform(progress, [0.06, 0.4, 1], [0.92, 1, 1]);
  const radius = useTransform(progress, [0.06, 0.35, 1], [18, 28, 28]);

  return (
    <motion.div
      className={`absolute z-[1] overflow-hidden shadow-[0_16px_40px_rgba(11,18,32,0.16)] ${className}`}
      style={{ x, y, rotate, opacity, scale, borderRadius: radius }}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 40vw, 24vw" />
    </motion.div>
  );
}

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Inset from viewport edges: 0 → card margins, then hold (no further change)
  const insetX = useTransform(scrollYProgress, [0, 0.45, 1], [0, 22, 22]); // (100-56)/2
  const insetY = useTransform(scrollYProgress, [0, 0.45, 1], [0, 10, 10]); // (100-80)/2
  const centerTop = useTransform(insetY, (v) => `${v}%`);
  const centerBottom = useTransform(insetY, (v) => `${v}%`);
  const centerLeft = useTransform(insetX, (v) => `${v}%`);
  const centerRight = useTransform(insetX, (v) => `${v}%`);
  const centerRadius = useTransform(scrollYProgress, [0, 0.16, 0.45, 1], [0, 14, 28, 28]);
  const centerShadow = useTransform(
    scrollYProgress,
    [0, 0.12, 0.45, 1],
    [
      "0 0 0 rgba(11,18,32,0)",
      "0 12px 40px rgba(11,18,32,0.1)",
      "0 28px 80px rgba(11,18,32,0.2)",
      "0 28px 80px rgba(11,18,32,0.2)",
    ],
  );
  const paperOpacity = useTransform(scrollYProgress, [0, 0.12, 1], [0, 1, 1]);
  const noiseOpacity = useTransform(scrollYProgress, [0, 0.12, 1], [0, 0.4, 0.4]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [1, 0, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.22, 1], [0, 28, 28]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.16, 1], [1, 0, 0]);
  const copyPointer = useTransform(scrollYProgress, [0, 0.12, 1], ["auto", "none", "none"]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[240vh] bg-paper"
      aria-label="Zaims Holding hero"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,var(--surface)_0%,var(--paper)_70%)]"
          style={reduce ? { opacity: 1 } : { opacity: paperOpacity }}
        />
        <motion.div
          className="pointer-events-none absolute inset-0 bg-noise"
          style={reduce ? { opacity: 0.4 } : { opacity: noiseOpacity }}
        />

        <div
          className="relative h-full w-full"
          style={{ ["--hero-gap" as string]: GAP } as React.CSSProperties}
        >
          {!reduce &&
            SATELLITES.map((s) => (
              <Satellite
                key={s.src}
                src={s.src}
                alt={s.alt}
                className={s.className}
                from={s.from}
                to={s.to}
                progress={scrollYProgress}
              />
            ))}

          <motion.div
            className="absolute z-10 overflow-hidden will-change-[inset,border-radius]"
            style={
              reduce
                ? {
                    top: "10%",
                    bottom: "10%",
                    left: "22%",
                    right: "22%",
                    borderRadius: 28,
                    boxShadow: "0 28px 80px rgba(11,18,32,0.2)",
                  }
                : {
                    top: centerTop,
                    bottom: centerBottom,
                    left: centerLeft,
                    right: centerRight,
                    borderRadius: centerRadius,
                    boxShadow: centerShadow,
                  }
            }
          >
            <Image
              src={CENTER}
              alt="We build more than structures. We build trust."
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />

            <motion.div
              className="absolute inset-0 bg-linear-to-t from-brand-primary/45 via-transparent to-transparent"
              style={reduce ? { opacity: 0.4 } : { opacity: overlayOpacity }}
            />

            <motion.div
              className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-center justify-center gap-3 px-6 pb-[max(2rem,6vh)]"
              style={
                reduce
                  ? undefined
                  : { y: copyY, opacity: copyOpacity, pointerEvents: copyPointer }
              }
            >
              <h1 className="sr-only">Zaims Holding</h1>
              <MagneticCTA href="/companies">Explore our companies</MagneticCTA>
              <MagneticCTA href="/contact" variant="secondary">
                Get in touch
              </MagneticCTA>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
