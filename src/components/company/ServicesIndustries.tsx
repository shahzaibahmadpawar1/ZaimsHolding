import { FadeIn, Stagger, StaggerItem } from "@/components/Motion";
import type { NamedItem } from "@/lib/companyPages";

export default function ServicesIndustries({
  services,
  industries,
}: {
  services: NamedItem[];
  industries: NamedItem[];
}) {
  return (
    <>
      <section id="services" className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <p className="company-body text-sm font-bold uppercase tracking-[0.2em] text-brand-yellow">
              Who we are
            </p>
            <h2 className="company-display mt-2 text-3xl font-bold text-mono-90 md:text-4xl">
              Our <span className="text-brand-yellow">Services</span>
            </h2>
            <p className="company-body mt-4 max-w-2xl text-[15px] leading-relaxed text-mono-70">
              From precision laser cutting to large-scale steel fabrication — end-to-end industrial
              solutions with a focus on quality across Saudi Arabia.
            </p>
          </FadeIn>

          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <article className="h-full rounded-2xl border border-mono-20 bg-surface p-6">
                  <h3 className="company-display text-lg font-bold text-mono-90">{service.title}</h3>
                  {service.description ? (
                    <p className="company-body mt-3 text-sm leading-relaxed text-mono-70">
                      {service.description}
                    </p>
                  ) : null}
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="industries" className="border-t border-mono-20 bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <p className="company-body text-sm font-bold uppercase tracking-[0.2em] text-brand-yellow">
              Industries
            </p>
            <h2 className="company-display mt-2 text-3xl font-bold text-mono-90 md:text-4xl">
              Industries We <span className="text-brand-yellow">Serve</span>
            </h2>
            <p className="company-body mt-4 max-w-2xl text-[15px] leading-relaxed text-mono-70">
              Precision laser cutting and CNC fabrication powering projects from heavy industrial
              components to intricate architectural designs.
            </p>
          </FadeIn>

          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <StaggerItem key={industry.title}>
                <article className="rounded-2xl border border-mono-20 bg-paper px-5 py-6">
                  <h3 className="company-display text-lg font-bold text-mono-90">{industry.title}</h3>
                  <p className="company-body mt-2 text-xs font-semibold uppercase tracking-wider text-brand-yellow">
                    Certified contractor
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
