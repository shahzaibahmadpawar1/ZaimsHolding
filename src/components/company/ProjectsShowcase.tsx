import { FadeIn, Stagger, StaggerItem } from "@/components/Motion";
import type { ProjectItem } from "@/lib/companyPages";

export default function ProjectsShowcase({
  categories,
  projects,
}: {
  categories: string[];
  projects: ProjectItem[];
}) {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p !== featured);

  return (
    <section id="projects" className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <p className="company-body text-sm font-bold uppercase tracking-[0.2em] text-brand-orange">
            Projects
          </p>
          <h2 className="company-display mt-2 text-3xl font-bold uppercase text-mono-90 md:text-4xl">
            500+ Projects.{" "}
            <span className="text-brand-orange">Every One</span> Delivered.
          </h2>
          <p className="company-body mt-4 max-w-3xl text-[15px] leading-relaxed text-mono-70">
            From government security infrastructure to hospitality façades, industrial skid bases to
            landmark metro structures — a selection of the project types that define Edge Steel
            KSA&apos;s reach across the Kingdom.
          </p>
        </FadeIn>

        <div className="mt-8 flex flex-wrap gap-2 border-y border-mono-20 py-3">
          {categories.map((cat, i) => (
            <span
              key={cat}
              className={`company-mono text-xs uppercase tracking-wider ${
                i === 0
                  ? "border-b-2 border-brand-orange pb-0.5 font-bold text-mono-90"
                  : "text-mono-55"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        {featured ? (
          <FadeIn className="mt-10 overflow-hidden rounded-2xl border border-mono-20 bg-surface">
            <div className="grid md:grid-cols-2">
              <div className="relative min-h-56 bg-mono-100 md:min-h-72">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(232,96,26,0.35),transparent_55%)]" />
                <span className="absolute left-4 top-4 rounded bg-brand-orange px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-surface">
                  Featured project
                </span>
                <div className="absolute inset-0 flex items-end p-6">
                  <p className="company-display text-lg font-bold uppercase text-surface/90">
                    Flagship delivery
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <p className="company-mono text-xs uppercase tracking-wider text-brand-orange">
                  {featured.categories.join(" · ")}
                </p>
                <h3 className="company-display mt-3 text-2xl font-bold uppercase text-mono-90">
                  {featured.title}
                </h3>
                {featured.summary ? (
                  <p className="company-body mt-4 text-[15px] leading-relaxed text-mono-70">
                    {featured.summary}
                  </p>
                ) : null}
              </div>
            </div>
          </FadeIn>
        ) : null}

        <Stagger className="mt-6 grid gap-4 sm:grid-cols-2">
          {rest.map((project) => (
            <StaggerItem key={project.title}>
              <article className="rounded-2xl border border-mono-20 bg-surface p-5">
                <p className="company-mono text-[10px] uppercase tracking-wider text-brand-orange">
                  {project.categories.join(" · ")}
                </p>
                <h3 className="company-display mt-2 text-lg font-bold uppercase text-mono-90">
                  {project.title}
                </h3>
                {project.summary ? (
                  <p className="company-body mt-2 text-sm leading-relaxed text-mono-70">
                    {project.summary}
                  </p>
                ) : null}
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
