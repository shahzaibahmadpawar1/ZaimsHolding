"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { companies, sectors } from "@/lib/content";

type Sector = (typeof sectors)[number];

function SectorCard({
  sector,
  index,
  isActive,
  isDimmed,
  canHover,
  onActivate,
  onDeactivate,
}: {
  sector: Sector;
  index: number;
  isActive: boolean;
  isDimmed: boolean;
  canHover: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const reduce = useReducedMotion();
  const company = companies.find((c) => c.name === sector.company);
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      onMouseEnter={() => {
        if (canHover) onActivate();
      }}
      onMouseLeave={() => {
        if (canHover) onDeactivate();
      }}
      onClick={() => {
        if (!canHover) {
          if (isActive) onDeactivate();
          else onActivate();
        }
      }}
      onFocus={() => {
        if (canHover) onActivate();
      }}
      onBlur={(e) => {
        if (!canHover) return;
        if (!e.currentTarget.contains(e.relatedTarget as Node)) onDeactivate();
      }}
      tabIndex={0}
      className={`group cursor-pointer rounded-xl border bg-white px-5 py-5 outline-none transition-[opacity,box-shadow,border-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-brand-cyan/50 md:px-6 md:py-6 ${
        isActive
          ? "-translate-y-1 border-brand-yellow/40 shadow-[0_14px_36px_rgba(18,51,84,0.12)]"
          : "border-mono-20 shadow-[0_8px_24px_rgba(18,51,84,0.06)]"
      } ${isDimmed ? "opacity-40" : "opacity-100"}`}
    >
      <div className="flex items-start gap-3">
        <Image
          src={sector.icon}
          alt=""
          width={56}
          height={56}
          className="h-12 w-12 shrink-0 object-contain md:h-14 md:w-14"
          unoptimized
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-yellow">
            {num}
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold text-brand-yellow md:text-[1.65rem]">
            {sector.title}
          </h3>
          <p className="mt-1 text-base font-semibold text-mono-90">
            Led through {sector.company}
          </p>
        </div>
      </div>

      <div
        className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          gridTemplateRows: isActive || reduce ? "1fr" : "0fr",
          opacity: isActive || reduce ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <p className="mt-3 text-sm leading-relaxed text-mono-70 md:text-[15px]">
            {sector.description}
          </p>
          {company ? (
            <Link
              href={`/companies/${company.slug}`}
              className="mt-4 inline-flex text-sm font-semibold text-brand-primary transition-colors hover:text-brand-yellow"
              onClick={(e) => e.stopPropagation()}
            >
              About {company.shortName} →
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function SectorsTimeline() {
  const [active, setActive] = useState<number | null>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div className="relative mx-auto max-w-5xl">
      <div
        className="pointer-events-none absolute bottom-8 left-1/2 top-8 hidden w-px -translate-x-1/2 bg-linear-to-b from-brand-yellow/20 via-brand-yellow/55 to-brand-yellow/20 md:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-6 left-2.5 top-6 w-px bg-linear-to-b from-brand-yellow/20 via-brand-yellow/55 to-brand-yellow/20 md:hidden"
        aria-hidden
      />

      <ol className="space-y-8 md:space-y-12">
        {sectors.map((sector, i) => {
          const isLeft = i % 2 === 0;
          const isActive = active === i;
          const isDimmed = active !== null && !isActive;

          return (
            <li key={sector.title} className="relative">
              <div className="hidden md:grid md:grid-cols-[1fr_2.5rem_1fr] md:items-start md:gap-6">
                <div className={isLeft ? "" : "pointer-events-none invisible"}>
                  {isLeft ? (
                    <SectorCard
                      sector={sector}
                      index={i}
                      isActive={isActive}
                      isDimmed={isDimmed}
                      canHover={canHover}
                      onActivate={() => setActive(i)}
                      onDeactivate={() => setActive(null)}
                    />
                  ) : null}
                </div>

                <div className="relative flex justify-center pt-7" aria-hidden>
                  <span
                    className={`h-3.5 w-3.5 rounded-full border-2 bg-surface transition-colors duration-500 ${
                      isActive
                        ? "border-brand-yellow bg-brand-yellow"
                        : "border-brand-yellow/80"
                    }`}
                  />
                </div>

                <div className={!isLeft ? "" : "pointer-events-none invisible"}>
                  {!isLeft ? (
                    <SectorCard
                      sector={sector}
                      index={i}
                      isActive={isActive}
                      isDimmed={isDimmed}
                      canHover={canHover}
                      onActivate={() => setActive(i)}
                      onDeactivate={() => setActive(null)}
                    />
                  ) : null}
                </div>
              </div>

              <div className="grid grid-cols-[1.5rem_1fr] items-start gap-4 md:hidden">
                <div className="relative flex justify-center pt-6" aria-hidden>
                  <span
                    className={`h-3 w-3 rounded-full border-2 bg-surface transition-colors duration-500 ${
                      isActive
                        ? "border-brand-yellow bg-brand-yellow"
                        : "border-brand-yellow/80"
                    }`}
                  />
                </div>
                <SectorCard
                  sector={sector}
                  index={i}
                  isActive={isActive}
                  isDimmed={isDimmed}
                  canHover={canHover}
                  onActivate={() => setActive(i)}
                  onDeactivate={() => setActive(null)}
                />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
