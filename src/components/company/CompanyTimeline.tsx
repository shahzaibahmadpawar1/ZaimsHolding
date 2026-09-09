import { FadeIn, Stagger, StaggerItem } from "@/components/Motion";
import type { Milestone } from "@/lib/companyPages";

export default function CompanyTimeline({
  items,
  eyebrow = "Our journey",
  title = "Key Milestones",
}: {
  items: Milestone[];
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section id="journey" className="relative overflow-hidden bg-surface py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center font-display text-[16vw] font-bold leading-none text-mono-90/[0.04]"
        aria-hidden
      >
        JOURNEY
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        <FadeIn className="text-center">
          <p className="company-body text-sm font-bold uppercase tracking-[0.2em] text-brand-orange">
            — {eyebrow} —
          </p>
          <h2 className="company-display mt-3 text-3xl font-bold text-mono-90 md:text-4xl">
            {title.includes(" ") ? (
              <>
                {title.split(" ")[0]}{" "}
                <span className="text-brand-orange">{title.split(" ").slice(1).join(" ")}</span>
              </>
            ) : (
              title
            )}
          </h2>
        </FadeIn>

        <div className="relative mt-14">
          <div
            className="pointer-events-none absolute bottom-4 left-4 top-4 w-px bg-brand-orange/40 md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          />

          <Stagger className="space-y-8 md:space-y-10">
            {items.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <StaggerItem key={`${item.label}-${item.title}`}>
                  <div className="relative grid grid-cols-[2rem_1fr] items-start gap-4 md:grid-cols-[1fr_2rem_1fr] md:gap-6">
                    <div
                      className={`hidden md:block ${isLeft ? "" : "pointer-events-none invisible"}`}
                    >
                      {isLeft ? <MilestoneCard item={item} /> : null}
                    </div>

                    <div className="relative z-10 flex justify-center pt-5" aria-hidden>
                      <span className="h-3.5 w-3.5 rounded-full border-2 border-brand-orange bg-surface" />
                    </div>

                    <div className={`hidden md:block ${!isLeft ? "" : "pointer-events-none invisible"}`}>
                      {!isLeft ? <MilestoneCard item={item} /> : null}
                    </div>

                    <div className="md:hidden">
                      <MilestoneCard item={item} />
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function MilestoneCard({ item }: { item: Milestone }) {
  return (
    <article className="rounded-2xl border border-mono-20 bg-paper px-5 py-5 shadow-soft">
      {item.year ? (
        <p className="company-body text-xs font-bold uppercase tracking-wider text-brand-orange">
          {item.year}
        </p>
      ) : null}
      <p className="company-body text-sm font-bold text-brand-orange">{item.label}</p>
      <h3 className="company-display mt-1 text-lg font-bold text-mono-90">{item.title}</h3>
      <p className="company-body mt-2 text-sm leading-relaxed text-mono-70">{item.description}</p>
    </article>
  );
}
