"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

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
  const center = align === "center";
  const titleClass = dark ? "text-white" : "text-mono-90";
  const descClass = dark ? "text-white/70" : "text-mono-70";

  if (reduce) {
    return (
      <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
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

  return (
    <motion.div
      className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px", amount: 0.35 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.12 } },
      }}
    >
      {eyebrow && (
        <motion.p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent"
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
          }}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        className={`font-display text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-[2.75rem] ${titleClass}`}
        variants={{
          hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
          show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
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
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
          }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
