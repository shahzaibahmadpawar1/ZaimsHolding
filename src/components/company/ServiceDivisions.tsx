"use client";

import { useState } from "react";
import Image from "next/image";
import { FadeIn } from "@/components/Motion";
import type { ServiceDivision } from "@/lib/companyPages";

export default function ServiceDivisions({ items }: { items: ServiceDivision[] }) {
  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0];

  return (
    <section id="services" className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="company-body text-sm font-bold uppercase tracking-[0.2em] text-brand-orange">
            — What we offer —
          </p>
          <h2 className="company-display mt-3 text-3xl font-bold text-mono-90 md:text-4xl">
            Our Six <span className="text-brand-orange">Service Divisions</span>
          </h2>
          <p className="company-body mt-4 text-[15px] leading-relaxed text-mono-70">
            Comprehensive construction and industrial solutions through six integrated specialist
            teams — faster completion, consistent quality, and single-point accountability.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-5">
            {items.map((item, i) => {
              const isActive = i === active;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`flex flex-col items-center rounded-2xl border px-3 py-4 text-center transition-all cursor-pointer ${
                    isActive
                      ? "border-mono-90 bg-surface shadow-soft"
                      : "border-brand-orange/30 bg-surface/60 hover:border-brand-orange/60"
                  }`}
                >
                  <Image
                    src={item.icon}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                    unoptimized
                  />
                  <span className="company-display mt-2 text-xs font-bold text-mono-90 sm:text-sm">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          <FadeIn key={current.title} className="lg:col-span-7">
            <article className="rounded-2xl border border-brand-orange/35 bg-surface p-6 shadow-soft md:p-8">
              <div className="flex items-center gap-3">
                <Image
                  src={current.icon}
                  alt=""
                  width={44}
                  height={44}
                  className="h-11 w-11 object-contain"
                  unoptimized
                />
                <h3 className="company-display text-2xl font-bold text-mono-90">{current.title}</h3>
              </div>

              <p className="company-body mt-6 text-xs font-bold uppercase tracking-wider text-brand-orange">
                What we do
              </p>
              <p className="company-body mt-2 text-[15px] leading-relaxed text-mono-70">
                {current.whatWeDo}
              </p>

              <p className="company-body mt-6 text-xs font-bold uppercase tracking-wider text-brand-orange">
                Key services
              </p>
              <ul className="company-body mt-2 space-y-1.5 text-[15px] text-mono-70">
                {current.keyServices.map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-xl border-l-4 border-brand-orange bg-mono-10/80 px-4 py-3">
                <p className="company-body text-[11px] font-bold uppercase tracking-wider text-mono-90">
                  Why it matters
                </p>
                <p className="company-body mt-1 text-sm leading-relaxed text-mono-70">
                  {current.whyItMatters}
                </p>
              </div>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
