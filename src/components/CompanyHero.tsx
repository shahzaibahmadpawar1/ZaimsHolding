"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { FadeIn, TextReveal } from "@/components/Motion";
import type { Company } from "@/lib/content";

export default function CompanyHero({ company }: { company: Company }) {
  const reduce = useReducedMotion();
  const { brand } = company;

  return (
    <section
      id="overview"
      className={`relative overflow-hidden bg-noise pt-32 pb-16 md:pt-40 md:pb-20 ${brand.themeClass}`}
      style={{
        backgroundColor: brand.heroTo,
        backgroundImage: `
          radial-gradient(ellipse 70% 55% at 75% 35%, color-mix(in srgb, ${brand.accent} 28%, transparent) 0%, transparent 55%),
          linear-gradient(165deg, ${brand.heroFrom} 0%, ${brand.heroTo} 55%, color-mix(in srgb, ${brand.primary} 80%, #000) 100%)
        `,
      }}
    >
      {brand.themeClass === "theme-edge" && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.45) 3px, rgba(255,255,255,0.45) 4px)",
          }}
        />
      )}

      <motion.div
        className="pointer-events-none absolute -right-16 top-8 h-72 w-72 rounded-full blur-3xl"
        style={{ background: `color-mix(in srgb, ${brand.accent} 22%, transparent)` }}
        animate={reduce ? undefined : { y: [0, 22, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          className="mb-8 inline-flex items-center rounded-xl bg-white/95 px-3 py-2 shadow-soft"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Image
            src={brand.logo}
            alt={`${company.name} logo`}
            width={brand.logoWidth}
            height={brand.logoHeight}
            className="h-10 w-auto object-contain md:h-12"
            priority
            unoptimized
          />
        </motion.div>

        <motion.p
          className="mb-4 text-xs font-semibold uppercase tracking-[0.16em]"
          style={{ color: brand.accent }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {company.role}
        </motion.p>

        <TextReveal
          text={company.name}
          className="company-display text-4xl font-extrabold tracking-tight text-balance text-white max-w-4xl md:text-5xl lg:text-6xl"
          delay={0.08}
        />

        <FadeIn delay={0.15} y={12} className="mt-5">
          <p className="company-body max-w-2xl text-base leading-relaxed text-pretty text-white/75 md:text-lg">
            {company.description}
          </p>
        </FadeIn>

        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35 }}
        >
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="company-body rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer"
            style={{ backgroundColor: brand.accent }}
          >
            Visit website
          </a>
          <Link
            href="/companies"
            className="company-body rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 cursor-pointer"
          >
            All companies
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
