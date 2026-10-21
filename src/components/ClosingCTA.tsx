"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useClientMotionReady, useInViewFailsafe } from "@/lib/useInViewFailsafe";

const ease = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, margin: "0px 0px -8% 0px", amount: 0.05 as const };

export default function ClosingCTA({
  title = "Built for the long term. Let's talk.",
  description = "Whether you're an investor, strategic partner, or operator exploring the group — we'd like to hear from you.",
  id = "contact-cta",
}: {
  title?: string;
  description?: string;
  id?: string;
}) {
  const reduce = useReducedMotion();
  const ready = useClientMotionReady();
  const { shown, onViewportEnter } = useInViewFailsafe();

  return (
    <section id={id} className="relative overflow-hidden bg-steel-hero bg-noise py-20 md:py-24">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-cyan/15 blur-3xl"
        animate={reduce ? undefined : { scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {!ready || reduce ? (
          <>
            <h2 className="font-display text-3xl font-bold tracking-tight text-surface text-balance md:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-base text-pretty text-surface/70 md:text-lg">{description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex rounded-full bg-surface px-6 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-mono-10 cursor-pointer"
              >
                Get in touch
              </Link>
              <Link
                href="/investors"
                className="inline-flex rounded-full border border-surface/30 px-6 py-3 text-sm font-semibold text-surface transition-colors hover:bg-surface/10 cursor-pointer"
              >
                Investor relations
              </Link>
            </div>
          </>
        ) : (
          <motion.div
            initial="hidden"
            animate={shown ? "show" : "hidden"}
            onViewportEnter={onViewportEnter}
            viewport={viewport}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.14 } },
            }}
          >
            <motion.h2
              className="font-display text-3xl font-bold tracking-tight text-surface text-balance md:text-4xl"
              variants={{
                hidden: { opacity: 1, y: 32 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease },
                },
              }}
            >
              {title}
            </motion.h2>
            <motion.p
              className="mt-4 text-base text-pretty text-surface/70 md:text-lg"
              variants={{
                hidden: { opacity: 1, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
            >
              {description}
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-3"
              variants={{
                hidden: { opacity: 1, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
              }}
            >
              <motion.div whileHover={reduce ? undefined : { scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className="inline-flex rounded-full bg-surface px-6 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-mono-10 cursor-pointer"
                >
                  Get in touch
                </Link>
              </motion.div>
              <motion.div whileHover={reduce ? undefined : { scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/investors"
                  className="inline-flex rounded-full border border-surface/30 px-6 py-3 text-sm font-semibold text-surface transition-colors hover:bg-surface/10 cursor-pointer"
                >
                  Investor relations
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
