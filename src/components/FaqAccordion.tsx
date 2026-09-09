"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export type FaqItem = {
  q: string;
  a: string;
  image?: string;
};

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [canHover, setCanHover] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <ul className="border-y border-mono-20">
      {items.map((item, i) => {
        const isActive = active === i;
        const isDimmed = active !== null && !isActive;
        const num = String(i + 1).padStart(2, "0");

        return (
          <li
            key={item.q}
            className="border-b border-mono-20 last:border-b-0"
            onMouseEnter={() => {
              if (canHover) setActive(i);
            }}
            onMouseLeave={() => {
              if (canHover) setActive(null);
            }}
          >
            <button
              type="button"
              aria-expanded={isActive}
              onClick={() => {
                if (!canHover) setActive(isActive ? null : i);
              }}
              onFocus={() => {
                if (canHover) setActive(i);
              }}
              onBlur={(e) => {
                if (!canHover) return;
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setActive(null);
                }
              }}
              className={`group flex w-full cursor-pointer items-start gap-4 py-5 text-left transition-opacity duration-300 md:gap-6 md:py-6 ${
                isDimmed ? "opacity-35" : "opacity-100"
              }`}
            >
              <span
                className={`w-10 shrink-0 font-display text-2xl font-semibold tabular-nums transition-colors duration-300 md:w-12 md:text-3xl ${
                  isActive ? "text-mono-90" : "text-mono-30"
                }`}
              >
                {num}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-4">
                  <span
                    className={`font-display text-lg font-semibold leading-snug transition-colors duration-300 md:text-xl ${
                      isActive ? "text-mono-90" : "text-mono-70"
                    }`}
                  >
                    {item.q}
                  </span>

                  <span
                    className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 md:h-10 md:w-10 ${
                      isActive
                        ? "bg-brand-primary text-white"
                        : "bg-mono-20 text-mono-70 group-hover:bg-brand-primary group-hover:text-white"
                    }`}
                    aria-hidden
                  >
                    <ArrowRight
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isActive ? "rotate-90" : ""
                      }`}
                    />
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {isActive ? (
                    <motion.div
                      key="body"
                      initial={
                        reduce
                          ? false
                          : { height: 0, opacity: 0, filter: "blur(4px)" }
                      }
                      animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                      exit={
                        reduce
                          ? undefined
                          : { height: 0, opacity: 0, filter: "blur(4px)" }
                      }
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-4 pb-1 pt-4 sm:flex-row sm:items-start sm:gap-5">
                        {item.image ? (
                          <div className="relative h-28 w-full shrink-0 overflow-hidden sm:h-24 sm:w-36">
                            <Image
                              src={item.image}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="144px"
                              unoptimized
                            />
                          </div>
                        ) : null}
                        <p className="max-w-2xl text-[15px] leading-relaxed text-mono-70 md:text-base">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
