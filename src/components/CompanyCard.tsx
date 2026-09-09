"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Company } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";

export default function CompanyCard({ company, index }: { company: Company; index?: number }) {
  const reduce = useReducedMotion();
  const { brand } = company;

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className="h-full"
    >
      <Link
        href={`/companies/${company.slug}`}
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-mono-20 p-7 md:p-8 transition-colors cursor-pointer ${brand.themeClass}`}
        style={{
          backgroundColor: brand.surface,
          borderColor: `color-mix(in srgb, ${brand.accent} 18%, #e2e8f0)`,
        }}
      >
        <motion.div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl"
          style={{ background: `color-mix(in srgb, ${brand.accent} 18%, transparent)` }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />

        <div className="relative mb-5 flex h-14 items-center">
          <Image
            src={brand.logo}
            alt=""
            width={brand.logoWidth}
            height={brand.logoHeight}
            className="h-11 w-auto max-w-[180px] object-contain object-left"
            unoptimized
          />
        </div>

        <div className="relative flex items-start justify-between gap-4">
          <div>
            {typeof index === "number" && (
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-wider"
                style={{ color: brand.accent }}
              >
                {String(index + 1).padStart(2, "0")}
              </p>
            )}
            <h3 className="company-display text-xl font-bold text-mono-90 transition-opacity group-hover:opacity-80 md:text-2xl">
              {company.name}
            </h3>
            <p className="company-body mt-1 text-sm font-medium text-mono-55">{company.role}</p>
          </div>
          <motion.span
            className="transition-colors"
            style={{ color: brand.accent }}
            whileHover={reduce ? undefined : { x: 2, y: -2 }}
          >
            <ArrowUpRight className="h-5 w-5" />
          </motion.span>
        </div>
        <p className="company-body relative mt-4 flex-1 text-[15px] leading-relaxed text-mono-70">
          {company.tagline}
        </p>
        <p className="company-body relative mt-6 text-sm text-mono-55">{company.location}</p>
      </Link>
    </motion.div>
  );
}
