"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { TextReveal, FadeIn } from "@/components/Motion";

/**
 * Site page hero — dark steel band by default (matches Why Zaims / holding chrome).
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  dark = true,
  actions,
  id = "overview",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  dark?: boolean;
  id?: string;
  actions?: { label: string; href: string; variant?: "primary" | "secondary" }[];
}) {
  const reduce = useReducedMotion();

  return (
    <section
      id={id}
      className={`relative overflow-hidden pt-24 pb-10 md:pt-28 md:pb-12 ${
        dark ? "bg-steel-hero text-surface bg-noise" : "bg-paper"
      }`}
    >
      {dark && (
        <>
          <motion.div
            className="pointer-events-none absolute -right-20 top-10 h-56 w-56 rounded-full bg-brand-yellow/15 blur-3xl md:h-72 md:w-72"
            animate={reduce ? undefined : { y: [0, 24, 0], x: [0, -12, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-brand-cyan/15 blur-3xl md:h-64 md:w-64"
            animate={reduce ? undefined : { y: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {eyebrow && (
          <motion.p
            className="mb-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-yellow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {eyebrow}
          </motion.p>
        )}
        <TextReveal
          text={title}
          className={`font-display text-3xl font-extrabold tracking-tight text-balance max-w-4xl sm:text-4xl md:text-5xl ${
            dark ? "text-surface" : "text-mono-90"
          }`}
          delay={0.08}
        />
        {description && (
          <FadeIn delay={0.15} y={12} className="mt-3.5">
            <p
              className={`max-w-2xl text-[15px] leading-relaxed text-pretty md:text-base ${
                dark ? "text-surface/75" : "text-mono-70"
              }`}
            >
              {description}
            </p>
          </FadeIn>
        )}
        {actions && actions.length > 0 && (
          <motion.div
            className="mt-6 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
          >
            {actions.map((a) => {
              const className =
                a.variant === "secondary"
                  ? dark
                    ? "rounded-full border border-surface/30 px-5 py-2.5 text-sm font-semibold text-surface hover:bg-surface/10 transition-colors cursor-pointer"
                    : "rounded-full border border-mono-30 px-5 py-2.5 text-sm font-semibold text-mono-90 hover:bg-mono-10 transition-colors cursor-pointer"
                  : dark
                    ? "rounded-full bg-surface px-5 py-2.5 text-sm font-semibold text-brand-primary hover:bg-mono-10 transition-colors cursor-pointer"
                    : "rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-surface hover:opacity-90 transition-opacity cursor-pointer";
              const external = a.href.startsWith("http");
              return external ? (
                <a
                  key={a.href + a.label}
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {a.label}
                </a>
              ) : (
                <Link key={a.href + a.label} href={a.href} className={className}>
                  {a.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
