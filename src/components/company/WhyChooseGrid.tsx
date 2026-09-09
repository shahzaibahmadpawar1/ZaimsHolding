import Image from "next/image";
import { FadeIn, Stagger, StaggerItem } from "@/components/Motion";
import type { WhyChooseItem } from "@/lib/companyPages";

export default function WhyChooseGrid({
  items,
  companyName,
}: {
  items: WhyChooseItem[];
  companyName: string;
}) {
  return (
    <section id="why-choose" className="bg-mono-100 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="text-center">
          <p className="company-body text-sm font-bold uppercase tracking-[0.2em] text-brand-orange">
            — Why choose us —
          </p>
          <h2 className="company-display mt-3 text-3xl font-bold text-surface md:text-4xl">
            Why Clients Choose{" "}
            <span className="text-brand-orange">{companyName}</span>
          </h2>
        </FadeIn>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" delay={0.05}>
          {items.map((item) => (
            <StaggerItem key={item.title}>
              <article className="flex h-full flex-col rounded-2xl bg-surface p-6 shadow-soft">
                <Image
                  src={item.icon}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                  unoptimized
                />
                <h3 className="company-display mt-4 text-lg font-bold text-mono-90">
                  {item.title}
                </h3>
                <p className="company-body mt-3 text-[15px] leading-relaxed text-mono-70">
                  {item.body}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
