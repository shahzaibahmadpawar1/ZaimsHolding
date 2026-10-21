"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";
import { useClientMotionReady, useInViewFailsafe } from "@/lib/useInViewFailsafe";

const ease = [0.22, 1, 0.36, 1] as const;
/** Loose enough that sticky-hero cold loads still count as in-view. */
const viewport = { once: true, margin: "0px 0px -8% 0px", amount: 0.05 as const };

export function FadeIn({
  children,
  className = "",
  delay = 0,
  y = 36,
  x = 0,
  duration = 0.7,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const ready = useClientMotionReady();
  const { shown, onViewportEnter } = useInViewFailsafe();

  // SSR + first paint: always visible (never opacity 0 in HTML)
  if (reduce || !ready) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 1, y, x }}
      animate={shown ? { opacity: 1, y: 0, x: 0 } : { opacity: 1, y, x }}
      onViewportEnter={onViewportEnter}
      viewport={viewport}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
}) {
  const reduce = useReducedMotion();
  const ready = useClientMotionReady();
  const { shown, onViewportEnter } = useInViewFailsafe();

  const offset =
    direction === "up"
      ? { y: 40, x: 0 }
      : direction === "down"
        ? { y: -28, x: 0 }
        : direction === "left"
          ? { y: 0, x: 48 }
          : direction === "right"
            ? { y: 0, x: -48 }
            : { y: 0, x: 0 };

  const scale = direction === "scale" ? 0.92 : 1;

  if (reduce || !ready) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 1, ...offset, scale }}
      animate={
        shown
          ? { opacity: 1, y: 0, x: 0, scale: 1 }
          : { opacity: 1, ...offset, scale }
      }
      onViewportEnter={onViewportEnter}
      viewport={viewport}
      transition={{ duration: 0.75, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal className={className} delay={delay} direction="scale">
      {children}
    </Reveal>
  );
}

export function Stagger({
  children,
  className = "",
  delay = 0,
  stagger = 0.1,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const ready = useClientMotionReady();
  const { shown, onViewportEnter } = useInViewFailsafe();

  if (reduce || !ready) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={shown ? "show" : "hidden"}
      onViewportEnter={onViewportEnter}
      viewport={viewport}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 1, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function HeroMotion({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 1, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Split headline into words with staggered reveal */
export function TextReveal({
  text,
  className = "",
  delay = 0,
  as: Tag = "h1",
  inView = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
  inView?: boolean;
}) {
  const reduce = useReducedMotion();
  const ready = useClientMotionReady();
  const { shown, onViewportEnter } = useInViewFailsafe();
  const words = text.split(" ");

  if (reduce || !ready) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom mr-[0.28em] last:mr-0"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 1 }}
            {...(inView
              ? {
                  animate: shown ? { y: 0, opacity: 1 } : { y: "110%", opacity: 1 },
                  onViewportEnter,
                  viewport: { once: true, margin: "0px 0px -8% 0px", amount: 0.05 },
                }
              : {
                  animate: { y: 0, opacity: 1 },
                })}
            transition={{ duration: 0.65, delay: delay + i * 0.035, ease }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Parallax({
  children,
  className = "",
  offset = 80,
}: {
  children: ReactNode;
  className?: string;
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

export function HoverLift({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      whileTap={{ scale: 0.99 }}
    >
      {children}
    </motion.div>
  );
}

/** Decorative line that draws in as it enters the viewport */
export function DrawLine({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  const { shown, onViewportEnter } = useInViewFailsafe();
  if (reduce) return <div className={`h-px bg-mono-20 ${className}`} />;

  return (
    <motion.div
      className={`h-px origin-left bg-brand-accent/40 ${className}`}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: shown ? 1 : 0 }}
      onViewportEnter={onViewportEnter}
      viewport={{ once: true, margin: "0px 0px -8% 0px", amount: 0.05 }}
      transition={{ duration: 0.8, delay, ease }}
    />
  );
}
