"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { TextReveal, FadeIn } from "@/components/Motion";

export default function PageHero({
  eyebrow,
  title,
  description,
  dark = false,
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
      className={`relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20 ${
        dark ? "bg-steel-hero text-white bg-noise" : "bg-paper"
      }`}
    >
      {dark && (
        <>
          <motion.div
            className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-brand-accent/15 blur-3xl"
            animate={reduce ? undefined : { y: [0, 24, 0], x: [0, -12, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl"
            animate={reduce ? undefined : { y: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {eyebrow && (
          <motion.p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {eyebrow}
          </motion.p>
        )}
        <TextReveal
          text={title}
          className={`font-display text-4xl font-extrabold tracking-tight text-balance max-w-4xl md:text-5xl lg:text-6xl ${
            dark ? "text-white" : "text-mono-90"
          }`}
          delay={0.08}
        />
        {description && (
          <FadeIn delay={0.15} y={12} className="mt-5">
            <p
              className={`max-w-2xl text-base leading-relaxed text-pretty md:text-lg ${
                dark ? "text-white/75" : "text-mono-70"
              }`}
            >
              {description}
            </p>
          </FadeIn>
        )}
        {actions && actions.length > 0 && (
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
          >
            {actions.map((a) => {
              const className =
                a.variant === "secondary"
                  ? dark
                    ? "rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors cursor-pointer"
                    : "rounded-full border border-mono-30 px-6 py-3 text-sm font-semibold text-mono-90 hover:bg-mono-10 transition-colors cursor-pointer"
                  : dark
                    ? "rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-primary hover:bg-white/90 transition-colors cursor-pointer"
                    : "rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity cursor-pointer";
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
