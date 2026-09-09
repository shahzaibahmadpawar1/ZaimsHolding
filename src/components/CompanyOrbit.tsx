"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { companies } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * ZAIMS orbital illustration used on the home hero and Values intro.
 */
export default function CompanyOrbit({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const positions = [
    { top: "8%", left: "58%", delay: 0.35 },
    { top: "42%", left: "78%", delay: 0.5 },
    { top: "72%", left: "48%", delay: 0.65 },
  ];

  return (
    <div className={`relative mx-auto h-[380px] w-full max-w-md lg:h-[440px] lg:max-w-none ${className}`}>
      <motion.div
        className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/15"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-accent/30"
        animate={reduce ? undefined : { rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 p-3 shadow-[0_0_40px_rgba(184,115,51,0.15)] backdrop-blur-md md:h-28 md:w-28 md:p-3.5"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
      >
        <Image
          src="/assets/logos/favicon.png"
          alt="Zaims"
          width={72}
          height={72}
          className="h-full w-full object-contain"
          unoptimized
        />
      </motion.div>

      {companies.map((c, i) => (
        <motion.div
          key={c.slug}
          className="absolute z-20"
          style={{ top: positions[i].top, left: positions[i].left }}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: positions[i].delay, ease }}
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, i % 2 === 0 ? -12 : 10, 0] }}
            transition={{ duration: 5.5 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            <Link
              href={`/companies/${c.slug}`}
              className="group flex min-w-[10rem] -translate-x-1/2 flex-col rounded-2xl border border-white/20 bg-white/10 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors hover:border-brand-accent/60 hover:bg-white/15 cursor-pointer"
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-1 font-display text-sm font-bold text-white">{c.shortName}</span>
              <span className="mt-0.5 line-clamp-1 text-[11px] text-white/55">{c.role}</span>
            </Link>
          </motion.div>
        </motion.div>
      ))}

      {!reduce && (
        <motion.div
          className="pointer-events-none absolute inset-x-[10%] top-0 z-0 h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent"
          animate={{ top: ["10%", "88%", "10%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}
