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
      className={`relative overflow-hidden bg-steel-hero bg-noise pt-24 pb-10 md:pt-28 md:pb-12 ${brand.themeClass}`}
    >
      <motion.div
        className="pointer-events-none absolute -right-16 top-8 h-72 w-72 rounded-full bg-brand-cyan/20 blur-3xl"
        animate={reduce ? undefined : { y: [0, 22, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -left-12 bottom-0 h-56 w-56 rounded-full bg-brand-teal/25 blur-3xl"
        animate={reduce ? undefined : { y: [0, -16, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          className="mb-5 inline-flex items-center rounded-xl bg-surface px-3 py-2 shadow-soft"
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
          className="mb-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-yellow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {company.role}
        </motion.p>

        <TextReveal
          text={company.name}
          className="company-display text-3xl font-extrabold tracking-tight text-balance text-surface max-w-4xl sm:text-4xl md:text-5xl"
          delay={0.08}
        />

        <FadeIn delay={0.15} y={12} className="mt-3.5">
          <p className="company-body max-w-2xl text-[15px] leading-relaxed text-pretty text-surface/75 md:text-base">
            {company.description}
          </p>
        </FadeIn>

        <motion.div
          className="mt-6 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35 }}
        >
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="company-body rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold text-surface transition-opacity hover:opacity-90 cursor-pointer"
          >
            Visit website
          </a>
          <Link
            href="/companies"
            className="company-body rounded-full border border-surface/30 px-5 py-2.5 text-sm font-semibold text-surface transition-colors hover:bg-surface/10 cursor-pointer"
          >
            All companies
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
