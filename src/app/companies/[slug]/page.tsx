import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, MapPin, Check } from "lucide-react";
import CompanyHero from "@/components/CompanyHero";
import ClosingCTA from "@/components/ClosingCTA";
import CompanyTimeline from "@/components/company/CompanyTimeline";
import MissionBlock from "@/components/company/MissionBlock";
import PartnersStrip from "@/components/company/PartnersStrip";
import ProjectsShowcase from "@/components/company/ProjectsShowcase";
import ServiceDivisions from "@/components/company/ServiceDivisions";
import ServicesIndustries from "@/components/company/ServicesIndustries";
import WhyChooseGrid from "@/components/company/WhyChooseGrid";
import { FadeIn, Stagger, StaggerItem } from "@/components/Motion";
import { getCompanyPageExtras } from "@/lib/companyPages";
import { companies, getCompany, type CompanySlug } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) return { title: "Company" };
  return {
    title: company.name,
    description: company.description,
  };
}

export default async function CompanyDetailPage({ params }: Props) {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) notFound();

  const { brand } = company;
  const others = companies.filter((c) => c.slug !== company.slug);
  const extras = getCompanyPageExtras(company.slug);

  return (
    <div className={brand.themeClass}>
      <CompanyHero company={company} />

      <section id="details" className="bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 grid gap-12 lg:grid-cols-12">
          <FadeIn className="lg:col-span-4 space-y-6">
            <div>
              <p className="company-body text-xs font-semibold uppercase tracking-wider text-mono-45">
                Location
              </p>
              <p className="company-body mt-2 flex items-start gap-2 text-mono-90">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-brand-yellow" />
                <span>
                  {company.location}
                  {company.address ? (
                    <span className="mt-1 block text-sm text-mono-55">{company.address}</span>
                  ) : null}
                </span>
              </p>
            </div>
            {company.founded && (
              <div>
                <p className="company-body text-xs font-semibold uppercase tracking-wider text-mono-45">
                  Established
                </p>
                <p className="company-body mt-2 text-mono-90">{company.founded}</p>
              </div>
            )}
            {(company.email || company.phone) && (
              <div>
                <p className="company-body text-xs font-semibold uppercase tracking-wider text-mono-45">
                  Contact
                </p>
                {company.email ? (
                  <a
                    href={`mailto:${company.email}`}
                    className="company-body mt-2 block font-medium text-brand-teal hover:text-brand-yellow"
                  >
                    {company.email}
                  </a>
                ) : null}
                {company.phone ? (
                  <a
                    href={`tel:${company.phone.replace(/\s+/g, "")}`}
                    className="company-body mt-1 block text-mono-70 hover:text-brand-yellow"
                  >
                    {company.phone}
                  </a>
                ) : null}
              </div>
            )}
            <div>
              <p className="company-body text-xs font-semibold uppercase tracking-wider text-mono-45">
                External
              </p>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="company-body mt-2 inline-flex items-center gap-2 font-medium text-brand-teal hover:text-brand-yellow cursor-pointer"
              >
                {company.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </FadeIn>

          <div className="lg:col-span-8 space-y-12">
            <FadeIn>
              <h2 className="company-display text-2xl font-bold text-mono-90 mb-6">Capabilities</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {company.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="company-body flex items-start gap-3 rounded-xl border border-mono-20 px-4 py-3 text-[15px] text-mono-70"
                  >
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-brand-yellow" />
                    {cap}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn>
              <h2 className="company-display text-2xl font-bold text-mono-90 mb-6">Credentials</h2>
              <ul className="space-y-3">
                {company.credentials.map((cred) => (
                  <li
                    key={cred}
                    className="company-body border-l-2 border-brand-yellow pl-4 text-[15px] text-mono-70"
                  >
                    {cred}
                  </li>
                ))}
              </ul>
              <p className="company-body mt-4 text-sm text-mono-55">
                Credentials are those of {company.name}, not automatically of the wider group.
              </p>
            </FadeIn>

            {company.highlights && company.highlights.length > 0 ? (
              <FadeIn>
                <h2 className="company-display mb-6 text-2xl font-bold text-mono-90">
                  Published highlights
                </h2>
                <ul className="space-y-3">
                  {company.highlights.map((item) => (
                    <li
                      key={item}
                      className="company-body flex items-start gap-3 text-[15px] text-mono-70"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            ) : null}

            {company.clients && company.clients.length > 0 ? (
              <FadeIn>
                <h2 className="company-display mb-6 text-2xl font-bold text-mono-90">
                  Clients listed publicly
                </h2>
                <p className="company-body mb-4 text-sm text-mono-55">
                  Names below appear on {company.name}&apos;s public website.
                </p>
                <ul className="flex flex-wrap gap-2">
                  {company.clients.map((client) => (
                    <li
                      key={client}
                      className="company-body rounded-full border border-mono-20 px-3 py-1.5 text-sm text-mono-70"
                    >
                      {client}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            ) : null}
          </div>
        </div>
      </section>

      {extras.kind === "nexgen" ? (
        <>
          <WhyChooseGrid items={extras.data.whyChoose} companyName={company.shortName} />
          <ServiceDivisions items={extras.data.serviceDivisions} />
          <CompanyTimeline items={extras.data.milestones} />
        </>
      ) : null}

      {extras.kind === "edge" ? (
        <>
          <PartnersStrip
            intro={extras.data.partnersIntro}
            partners={extras.data.partners}
            stats={extras.data.partnerStats}
          />
          <ProjectsShowcase
            categories={extras.data.projectCategories}
            projects={extras.data.projects}
          />
          <CompanyTimeline
            items={extras.data.milestones}
            eyebrow="Timeline"
            title="Growth Journey"
          />
        </>
      ) : null}

      {extras.kind === "dammam" ? (
        <>
          <MissionBlock mission={extras.data.mission} />
          <ServicesIndustries
            services={extras.data.services}
            industries={extras.data.industries}
          />
        </>
      ) : null}

      <section id="related" className="border-t border-mono-20 py-16 md:py-20" style={{ background: brand.surface }}>
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <h2 className="mb-8 font-display text-2xl font-bold text-mono-90">Also in the group</h2>
          </FadeIn>
          <Stagger className="grid gap-4 md:grid-cols-2">
            {others.map((c) => (
              <StaggerItem key={c.slug}>
                <Link
                  href={`/companies/${c.slug as CompanySlug}`}
                  className={`group flex items-center gap-4 rounded-2xl border border-mono-20 bg-surface p-5 transition-colors hover:border-brand-cyan/40 cursor-pointer ${c.brand.themeClass}`}
                >
                  <div className="flex h-14 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-mono-10 px-2">
                    <Image
                      src={c.brand.logo}
                      alt=""
                      width={c.brand.logoWidth}
                      height={c.brand.logoHeight}
                      className="h-10 w-auto max-w-full object-contain"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold text-mono-90 group-hover:opacity-90">
                      {c.name}
                    </h3>
                    <p className="mt-1 text-sm text-mono-70">{c.tagline}</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <ClosingCTA
        title={`Talk with Zaims about ${company.shortName}`}
        description="Investors, partners, and operators — reach the holding for introductions and group-level conversations."
      />
    </div>
  );
}
