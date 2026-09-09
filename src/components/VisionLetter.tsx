"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/Motion";
import { companies } from "@/lib/content";

function SketchArrow() {
  const reduce = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 220 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-6 ml-8 hidden w-44 text-mono-90 md:block lg:w-52"
      aria-hidden
      initial={reduce ? false : { opacity: 0, pathLength: 0 }}
      whileInView={reduce ? undefined : { opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.25 }}
    >
      <motion.path
        d="M8 48 C 70 62, 130 8, 198 22"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        fill="none"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={reduce ? undefined : { pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M186 10 L202 22 L184 30"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={reduce ? undefined : { opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: 1.1 }}
      />
    </motion.svg>
  );
}

export default function VisionLetter() {
  return (
    <section id="vision" className="bg-paper py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left — Tiny-style headline column */}
          <Reveal direction="right" className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-mono-55">
              Our Vision
            </p>
            <h2 className="font-display text-[2rem] font-bold leading-[1.15] tracking-tight text-mono-90 text-balance sm:text-4xl lg:text-[2.65rem]">
              We built Zaims to be the industrial partner{" "}
              <span className="text-brand-primary">we wish the Kingdom had.</span>
            </h2>
            <SketchArrow />
          </Reveal>

          {/* Right — letter card */}
          <Reveal direction="left" delay={0.12} className="lg:col-span-7">
            <article className="rounded-2xl border border-mono-20/80 bg-white p-8 shadow-letter md:p-10 lg:p-12">
              <p className="mb-6 font-display text-lg font-semibold text-mono-90 md:text-xl">
                Partners —
              </p>

              <div className="space-y-5 text-[15px] leading-[1.7] text-mono-70 md:text-base">
                <p>
                  Saudi infrastructure doesn&apos;t fail for lack of ambition. It fails when steel,
                  fabrication, and systems sit in separate silos — different owners, different
                  standards, different timelines, and nobody accountable for the whole.
                </p>
                <p>
                  We watched projects lose months to coordination gaps. Specs rewritten midstream.
                  Finger-pointing at handover.
                </p>

                <p className="-mx-2 rounded-md bg-[#E8EEF5] px-2 py-1.5 font-semibold text-mono-90 md:-mx-2.5 md:px-2.5">
                  So we made a list of everything that structure gets wrong and built a holding
                  company that does none of it.
                </p>

                <p>Today, Zaims holds three complementary operating companies:</p>

                <ul className="space-y-2.5">
                  {companies.map((c) => (
                    <li key={c.slug} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-mono-90" />
                      <span>
                        <Link
                          href={`/companies/${c.slug}`}
                          className="font-semibold text-mono-90 underline decoration-mono-30 underline-offset-4 transition-colors hover:decoration-brand-primary cursor-pointer"
                        >
                          {c.name}
                        </Link>
                        <span className="text-mono-55"> — {c.tagline}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                <p>
                  They work together by design. One ownership structure. Shared quality discipline.
                  Long-term capital that doesn&apos;t force a flip.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap items-end justify-between gap-4 border-t border-mono-20 pt-8">
                <div>
                  <p className="font-display text-sm font-bold tracking-wide text-mono-90">
                    Zaims Holding
                  </p>
                  <p className="mt-1 text-sm text-mono-55">Operators & long-term owners</p>
                </div>
                <Link
                  href="/about"
                  className="text-sm font-semibold text-brand-primary transition-colors hover:text-brand-accent cursor-pointer"
                >
                  Read our full story →
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
