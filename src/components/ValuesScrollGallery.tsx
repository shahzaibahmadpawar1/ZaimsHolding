"use client";

import Image from "next/image";
import { useMemo, useState, useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import CompanyOrbit from "@/components/CompanyOrbit";

export type ValueGalleryItem = {
  title: string;
  desc: string;
  /** Path under /public, e.g. /assets/images/values-01.jpg */
  image: string;
};

/** Extra viewport height per value frame — scroll sensitivity between images */
const VH_PER_VALUE = 190;
/** Intro (orbit) frame — keep in step with between-image feel, not a full dead zone */
const VH_INTRO = 95;

/** Clear the fixed Line Menu TOC on the left (lg+) */
const COPY_INSET =
  "pl-6 sm:pl-8 md:pl-12 lg:pl-28 xl:pl-32";

function HeroBackdrop() {
  return (
    <div className="absolute inset-0 bg-steel-hero bg-noise">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%)",
        }}
      />
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-brand-yellow/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-1/3 h-96 w-96 rounded-full bg-brand-cyan/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-brand-teal/30 blur-3xl" />

      {/* Hero orbit illustration — right side */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] flex w-full max-w-xl items-center justify-center pr-4 opacity-95 sm:pr-8 lg:max-w-2xl lg:pr-16 xl:max-w-3xl">
        <div className="pointer-events-auto w-full scale-90 sm:scale-100 lg:scale-110">
          <CompanyOrbit />
        </div>
      </div>
    </div>
  );
}

function FullBleedImage({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <>
      <div className="absolute inset-0 bg-mono-100" />
      {!failed && (
        <Image
          src={src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          onError={() => setFailed(true)}
          unoptimized
          quality={100}
        />
      )}
    </>
  );
}

/** Sticky section title — stays put, does not fade with value slides */
function StickyIntroCopy() {
  return (
    <div
      className={`pointer-events-none absolute left-0 top-0 z-30 w-full max-w-lg pr-6 pt-24 md:pt-28 ${COPY_INSET}`}
    >
      <div className="[text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-yellow">
          Values
        </p>
        <h2 className="font-display text-2xl font-bold tracking-tight text-surface text-balance sm:text-3xl md:text-4xl">
          What we optimize for.
        </h2>
      </div>
    </div>
  );
}

function GallerySlide({
  item,
  valueIndex,
  frameStart,
  frameEnd,
  active,
  progress,
  valueCount,
  reduce,
}: {
  item: ValueGalleryItem;
  valueIndex: number;
  frameStart: number;
  frameEnd: number;
  active: boolean;
  progress: MotionValue<number>;
  valueCount: number;
  reduce: boolean | null;
}) {
  const span = Math.max(frameEnd - frameStart, 0.0001);
  const enter = frameStart + span * 0.12;
  const holdStart = frameStart + span * 0.22;
  const holdEnd = frameStart + span * 0.78;
  const exit = frameStart + span * 0.88;

  const opacity = useTransform(
    progress,
    [frameStart, enter, holdStart, holdEnd, exit, frameEnd],
    [0, 1, 1, 1, 1, 0],
  );
  const scale = useTransform(progress, [frameStart, holdStart, frameEnd], [1.03, 1, 1.02]);
  const textY = useTransform(progress, [frameStart, holdStart, holdEnd, frameEnd], [28, 0, 0, -28]);
  const textOpacity = useTransform(
    progress,
    [frameStart, holdStart, holdEnd, frameEnd],
    [0, 1, 1, 0],
  );

  if (reduce) {
    if (!active) return null;
    return (
      <div className="absolute inset-0">
        <FullBleedImage src={item.image} />
        <SlideCopy item={item} index={valueIndex} count={valueCount} />
      </div>
    );
  }

  return (
    <motion.div className="absolute inset-0" style={{ opacity }} aria-hidden={!active}>
      <motion.div className="absolute inset-0" style={{ scale }}>
        <FullBleedImage src={item.image} />
      </motion.div>
      <motion.div
        className="absolute inset-0 z-10 flex items-end md:items-center"
        style={{ opacity: textOpacity, y: textY }}
      >
        <SlideCopy item={item} index={valueIndex} count={valueCount} />
      </motion.div>
    </motion.div>
  );
}

function SlideCopy({
  item,
  index,
  count,
}: {
  item: ValueGalleryItem;
  index: number;
  count: number;
}) {
  return (
    <div
      className={`relative z-10 w-full max-w-xl pr-6 pb-20 pt-32 md:pb-0 md:pt-20 ${COPY_INSET}`}
    >
      <div className="max-w-md [text-shadow:0_2px_28px_rgba(0,0,0,0.55)]">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-yellow">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        <h3 className="font-display text-2xl font-bold tracking-tight text-surface text-balance sm:text-3xl md:text-4xl lg:text-5xl">
          {item.title}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-surface md:mt-4 md:text-base">
          {item.desc}
        </p>
      </div>
    </div>
  );
}

function ThumbRail({
  items,
  activeValue,
  progress,
  introEnd,
  reduce,
  onSelect,
}: {
  items: ValueGalleryItem[];
  activeValue: number;
  progress: MotionValue<number>;
  introEnd: number;
  reduce: boolean | null;
  onSelect: (valueIndex: number) => void;
}) {
  const y = useTransform(progress, [introEnd, 1], [0, -52 * (items.length - 1)]);

  return (
    <div className="pointer-events-none absolute inset-y-0 left-1/2 z-20 flex -translate-x-1/2 items-center">
      <div className="pointer-events-auto relative flex h-[min(70vh,520px)] w-16 items-center justify-center md:w-20">
        <motion.div className="relative flex flex-col gap-3" style={reduce ? undefined : { y }}>
          {items.map((item, i) => {
            const isActive = activeValue === i;
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => onSelect(i)}
                aria-label={`Show ${item.title}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative h-12 w-12 overflow-hidden rounded-xl border-2 transition-transform duration-300 md:h-14 md:w-14 ${
                  isActive
                    ? "scale-110 border-brand-yellow shadow-[0_0_0_2px_rgba(201,162,39,0.35)]"
                    : "border-white/50"
                }`}
              >
                <ThumbImage src={item.image} />
              </button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

function ThumbImage({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <>
      <div className="absolute inset-0 bg-mono-90" />
      {!failed && (
        <Image
          src={src}
          alt=""
          fill
          sizes="56px"
          className="object-cover"
          onError={() => setFailed(true)}
          unoptimized
        />
      )}
    </>
  );
}

/**
 * Scroll-driven values gallery inspired by Framer CMS Scroll Gallery:
 * https://www.framer.com/marketplace/components/cms-scroll-gallery/
 */
export default function ValuesScrollGallery({ items }: { items: ValueGalleryItem[] }) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeFrame, setActiveFrame] = useState(0);

  // Frame 0 = hero intro (no photo). Frames 1..n = value photos.
  // Intro is shorter so reaching the first image matches between-image sensitivity.
  const frameWeights = useMemo(
    () => [VH_INTRO, ...items.map(() => VH_PER_VALUE)],
    [items],
  );
  const totalWeight = useMemo(
    () => frameWeights.reduce((sum, w) => sum + w, 0),
    [frameWeights],
  );
  const frameStarts = useMemo(() => {
    const starts: number[] = [];
    let acc = 0;
    for (const w of frameWeights) {
      starts.push(acc / totalWeight);
      acc += w;
    }
    return starts;
  }, [frameWeights, totalWeight]);
  const frameEnds = useMemo(
    () => frameStarts.map((start, i) =>
      i + 1 < frameStarts.length ? frameStarts[i + 1] : 1,
    ),
    [frameStarts],
  );
  const frameCount = frameWeights.length;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let next = frameCount - 1;
    for (let i = 0; i < frameCount; i++) {
      if (v < frameEnds[i]) {
        next = i;
        break;
      }
    }
    setActiveFrame((prev) => (prev === next ? prev : next));
  });

  const scrollHeight = useMemo(() => `${totalWeight}vh`, [totalWeight]);

  const introEnd = frameEnds[0] ?? 0.2;
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, introEnd * 0.55, introEnd],
    [1, 1, 0],
  );

  const activeValue = activeFrame > 0 ? activeFrame - 1 : -1;

  const jumpToValue = (valueIndex: number) => {
    const el = trackRef.current;
    if (!el) return;
    const frameIndex = valueIndex + 1;
    const rect = el.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const span = el.offsetHeight - window.innerHeight;
    const mid =
      ((frameStarts[frameIndex] ?? 0) + (frameEnds[frameIndex] ?? 1)) / 2;
    const target = top + span * mid;
    window.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
  };

  if (reduce) {
    return (
      <div className="space-y-0">
        <div className="relative min-h-screen overflow-hidden">
          <HeroBackdrop />
          <StickyIntroCopy />
        </div>
        {items.map((item, index) => (
          <div key={item.title} className="relative min-h-screen overflow-hidden">
            <FullBleedImage src={item.image} />
            <StickyIntroCopy />
            <div className="absolute inset-0 z-10 flex items-end md:items-center">
              <SlideCopy item={item} index={index} count={items.length} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={trackRef} className="relative" style={{ height: scrollHeight }}>
      <div className="sticky top-0 h-svh overflow-hidden bg-mono-100">
        <motion.div className="absolute inset-0 z-0" style={{ opacity: heroOpacity }}>
          <HeroBackdrop />
        </motion.div>

        {items.map((item, valueIndex) => (
          <GallerySlide
            key={item.title}
            item={item}
            valueIndex={valueIndex}
            frameStart={frameStarts[valueIndex + 1] ?? 0}
            frameEnd={frameEnds[valueIndex + 1] ?? 1}
            active={activeFrame === valueIndex + 1}
            progress={scrollYProgress}
            valueCount={items.length}
            reduce={false}
          />
        ))}

        <StickyIntroCopy />

        <ThumbRail
          items={items}
          activeValue={activeValue}
          progress={scrollYProgress}
          introEnd={introEnd}
          reduce={false}
          onSelect={jumpToValue}
        />

        <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.2em] text-surface [text-shadow:0_1px_12px_rgba(0,0,0,0.65)]">
          Scroll
        </div>
      </div>
    </div>
  );
}
