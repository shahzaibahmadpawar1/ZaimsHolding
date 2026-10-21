import Image from "next/image";
import { FadeIn, Stagger, StaggerItem } from "@/components/Motion";
import type { PartnerStat } from "@/lib/companyPages";

export default function PartnersStrip({
  intro,
  partners,
  stats,
}: {
  intro: string;
  partners: { name: string; logo: string }[];
  stats: PartnerStat[];
}) {
  return (
    <section id="partners" className="bg-mono-100 py-16 md:py-24">
      <div
        className="mx-auto max-w-6xl px-6"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <FadeIn className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="company-body text-sm font-bold uppercase tracking-[0.2em] text-brand-orange">
              Our partners
            </p>
            <h2 className="company-display mt-2 text-3xl font-bold uppercase text-surface md:text-4xl">
              Trusted by Industry Leaders
            </h2>
          </div>
          <p className="company-body max-w-md text-sm leading-relaxed text-surface/70 lg:text-right">
            {intro}
          </p>
        </FadeIn>

        <Stagger className="mt-10 grid grid-cols-2 border border-white/10 sm:grid-cols-4">
          {partners.map((partner) => (
            <StaggerItem key={partner.name}>
              <div className="group flex min-h-44 flex-col items-center justify-center gap-3 border border-white/10 bg-surface px-4 py-6 text-center">
                <div className="relative flex h-32 w-full items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={320}
                    height={128}
                    className="h-28 w-auto max-w-[90%] object-contain grayscale transition duration-300 group-hover:grayscale-0"
                    unoptimized
                  />
                </div>
                <p className="company-mono text-[10px] uppercase tracking-wider text-mono-55">
                  {partner.name}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-8 grid gap-4 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="company-display text-2xl font-bold text-brand-orange">{stat.value}</p>
              <p className="company-body mt-1 text-sm text-surface/75">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
