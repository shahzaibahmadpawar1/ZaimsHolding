"use client";

import { motion, useReducedMotion } from "motion/react";
import { useClientMotionReady, useInViewFailsafe } from "@/lib/useInViewFailsafe";

const ease = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, margin: "0px 0px -8% 0px", amount: 0.05 as const };

function StaticHeading({
  eyebrow,
  title,
  description,
  center,
  titleClass,
  descClass,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center: boolean;
  titleClass: string;
  descClass: string;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-yellow">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-[2.75rem] ${titleClass}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed text-pretty md:text-lg ${descClass}`}>
          {description}
        </p>
      )}
    </div>
  );
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  const reduce = useReducedMotion();
  const ready = useClientMotionReady();
  const { shown, onViewportEnter } = useInViewFailsafe();
  const center = align === "center";
  const titleClass = dark ? "text-surface" : "text-mono-90";
  const descClass = dark ? "text-surface/70" : "text-mono-70";

  if (reduce || !ready) {
    return (
      <StaticHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
        center={center}
        titleClass={titleClass}
        descClass={descClass}
      />
    );
  }

  return (
    <motion.div
      className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
      initial="hidden"
      animate={shown ? "show" : "hidden"}
      onViewportEnter={onViewportEnter}
      viewport={viewport}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.12 } },
      }}
    >
      {eyebrow && (
        <motion.p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-yellow"
          variants={{
            hidden: { opacity: 1, y: 12 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
          }}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        className={`font-display text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-[2.75rem] ${titleClass}`}
        variants={{
          hidden: { opacity: 1, y: 28 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease },
          },
        }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className={`mt-4 text-base leading-relaxed text-pretty md:text-lg ${descClass}`}
          variants={{
            hidden: { opacity: 1, y: 18 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
          }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
