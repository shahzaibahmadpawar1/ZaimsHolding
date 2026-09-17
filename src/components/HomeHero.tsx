  "use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

/** Settled satellites — % of viewport; paired with responsive center inset */
const SATELLITES = [
  {
    src: "/assets/images/2.jpg",
    alt: "Precision welding on site",
    className:
      "left-[max(0.5rem,calc(50%-var(--hero-center-half)-var(--hero-gap)-var(--hero-side-w)))] top-[calc(50%-40%)] h-[39%] w-[var(--hero-side-w)]",
    from: { x: -48, y: -28, rotate: -4 },
    to: { x: 0, y: 0, rotate: -1 },
  },
  {
    src: "/assets/images/3.jpg",
    alt: "Heavy fabrication work",
    className:
      "right-[max(0.5rem,calc(50%-var(--hero-center-half)-var(--hero-gap)-var(--hero-side-w)))] top-[calc(50%-40%)] h-[39%] w-[var(--hero-side-w)]",
    from: { x: 48, y: -28, rotate: 4 },
    to: { x: 0, y: 0, rotate: 1 },
  },
  {
    src: "/assets/images/4.jpg",
    alt: "Industrial plant structure",
    className:
      "left-[max(0.5rem,calc(50%-var(--hero-center-half)-var(--hero-gap)-var(--hero-side-w)))] bottom-[calc(50%-40%)] h-[39%] w-[var(--hero-side-w)]",
    from: { x: -48, y: 28, rotate: 3 },
    to: { x: 0, y: 0, rotate: 0.75 },
  },
  {
    src: "/assets/images/5.jpg",
    alt: "Kingdom industrial operations",
    className:
      "right-[max(0.5rem,calc(50%-var(--hero-center-half)-var(--hero-gap)-var(--hero-side-w)))] bottom-[calc(50%-40%)] h-[39%] w-[var(--hero-side-w)]",
    from: { x: 48, y: 28, rotate: -3 },
    to: { x: 0, y: 0, rotate: -0.75 },
  },
] as const;

function useHeroLayout() {
  const [layout, setLayout] = useState({
    showSides: true,
    /** Horizontal inset % when settled → center width = 100 - 2*inset */
    insetX: 24,
    sideW: "21%",
    centerHalf: "26%",
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) {
        // Narrow phones — tighter center, visible side tiles
        setLayout({ showSides: true, insetX: 27, sideW: "23%", centerHalf: "23%" });
      } else if (w < 768) {
        setLayout({ showSides: true, insetX: 25, sideW: "22%", centerHalf: "25%" });
      } else if (w < 1024) {
        setLayout({ showSides: true, insetX: 24, sideW: "21%", centerHalf: "26%" });
      } else if (w < 1280) {
        // 14" / small laptop
        setLayout({ showSides: true, insetX: 26, sideW: "22%", centerHalf: "24%" });
      } else if (w < 1536) {
        setLayout({ showSides: true, insetX: 24, sideW: "20%", centerHalf: "26%" });
      } else {
        setLayout({ showSides: true, insetX: 22, sideW: "20%", centerHalf: "28%" });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return layout;
}

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
      ? "rounded-full bg-surface px-5 py-3 text-sm font-semibold text-brand-primary shadow-lg shadow-black/25 sm:px-6 sm:py-3.5"
      : "rounded-full border border-surface/35 bg-surface/10 px-5 py-3 text-sm font-semibold text-surface backdrop-blur-sm sm:px-6 sm:py-3.5";

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
  const opacity = useTransform(progress, [0.04, 0.1, 1], [0, 1, 1]);
  const scale = useTransform(progress, [0.06, 0.4, 1], [0.92, 1, 1]);
  const radius = useTransform(progress, [0.06, 0.35, 1], [18, 28, 28]);

  return (
    <motion.div
      className={`absolute z-[1] overflow-hidden shadow-[0_16px_40px_rgba(11,18,32,0.16)] ${className}`}
      style={{ x, y, rotate, opacity, scale, borderRadius: radius }}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes="22vw" />
    </motion.div>
  );
}

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { showSides, insetX, sideW, centerHalf } = useHeroLayout();
  const insetXTarget = useMotionValue(insetX);

  useEffect(() => {
    insetXTarget.set(insetX);
  }, [insetX, insetXTarget]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const insetXMotion = useTransform([scrollYProgress, insetXTarget], ([p, settled]) => {
    const progress = Number(p);
    const target = Number(settled);
    if (progress <= 0) return 0;
    if (progress >= 0.45) return target;
    return (progress / 0.45) * target;
  });
  const insetY = useTransform(scrollYProgress, [0, 0.45, 1], [0, 10, 10]);
  const centerTop = useTransform(insetY, (v) => `${v}%`);
  const centerBottom = useTransform(insetY, (v) => `${v}%`);
  const centerLeft = useTransform(insetXMotion, (v) => `${v}%`);
  const centerRight = useTransform(insetXMotion, (v) => `${v}%`);
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
      className="relative h-[220vh] bg-paper md:h-[240vh]"
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
          className="relative h-full w-full overflow-hidden"
          style={
            {
              ["--hero-gap" as string]: GAP,
              ["--hero-side-w" as string]: sideW,
              ["--hero-center-half" as string]: centerHalf,
            } as React.CSSProperties
          }
        >
          {showSides &&
            SATELLITES.map((s) =>
              reduce ? (
                <div
                  key={s.src}
                  className={`absolute z-[1] overflow-hidden rounded-[1.5rem] shadow-[0_16px_40px_rgba(11,18,32,0.16)] ${s.className}`}
                >
                  <Image src={s.src} alt={s.alt} fill className="object-cover" sizes="24vw" />
                </div>
              ) : (
                <Satellite
                  key={s.src}
                  src={s.src}
                  alt={s.alt}
                  className={s.className}
                  from={s.from}
                  to={s.to}
                  progress={scrollYProgress}
                />
              ),
            )}

          <motion.div
            className="absolute z-10 overflow-hidden will-change-[inset,border-radius]"
            style={
              reduce
                ? {
                    top: "10%",
                    bottom: "10%",
                    left: `${insetX}%`,
                    right: `${insetX}%`,
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
            {/*
              Mobile only: crop toward the right so the baked-in headline stays in frame.
              md+ (tablet / laptop / desktop): balanced center crop.
            */}
            <Image
              src={CENTER}
              alt="We build more than structures. We build trust."
              fill
              priority
              className="object-cover object-[63%_23%] md:object-center"
              sizes="100vw"
            />

            <motion.div
              className="absolute inset-0 bg-linear-to-t from-brand-primary/45 via-transparent to-transparent"
              style={reduce ? { opacity: 0.4 } : { opacity: overlayOpacity }}
            />

            <motion.div
              className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-center justify-center gap-2.5 px-4 pb-[max(1.25rem,4.5vh)] sm:gap-3 sm:px-6 sm:pb-[max(2rem,6vh)]"
              style={
                reduce
                  ? undefined
                  : { y: copyY, opacity: copyOpacity, pointerEvents: copyPointer }
              }
            >
              <h1 className="sr-only">Zaims Holding — We build more than structures. We build trust.</h1>
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
