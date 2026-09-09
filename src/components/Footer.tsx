"use client";

import Image from "next/image";
import Link from "next/link";
import { companies, footerLinks } from "@/lib/content";
import { FadeIn, Stagger, StaggerItem } from "@/components/Motion";

const headingClass =
  "text-sm font-bold uppercase tracking-wider text-brand-cyan";

export default function Footer() {
  const year = new Date().getFullYear();
  const portfolioLinks = [
    ...footerLinks.portfolio,
    ...companies.map((c) => ({ href: `/companies/${c.slug}`, label: c.shortName })),
  ];

  return (
    <footer className="border-t border-mono-20 bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-5 md:py-6">
        <FadeIn>
          <div className="grid gap-5 md:grid-cols-12 md:gap-5">
            <div className="md:col-span-4">
              <Link href="/" className="inline-flex items-center" aria-label="Zaims Holding home">
                <Image
                  src="/assets/logos/zaimsLogo.jpg"
                  alt="Zaims Holding"
                  width={400}
                  height={112}
                  className="h-16 w-auto object-contain"
                  unoptimized
                />
              </Link>
              <p className="mt-2 max-w-sm text-sm leading-snug text-mono-70">
                An industrial holding company that owns and operates complementary construction and
                fabrication businesses across Saudi Arabia.
              </p>
            </div>

            <Stagger
              className="md:col-span-8 grid grid-cols-2 gap-x-8 gap-y-5 sm:flex sm:flex-nowrap sm:justify-end sm:gap-10"
              delay={0.08}
            >
              <StaggerItem className="sm:shrink-0">
                <p className={headingClass}>Company</p>
                <ul className="mt-2 space-y-1">
                  {footerLinks.company.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-mono-70 transition-colors hover:text-brand-yellow cursor-pointer"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
              <StaggerItem className="sm:shrink-0">
                <p className={`${headingClass} text-center`}>Portfolio</p>
                <ul className="mt-2 grid grid-cols-2 gap-x-5 gap-y-1">
                  {portfolioLinks.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-mono-70 transition-colors hover:text-brand-yellow cursor-pointer"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
              <StaggerItem className="sm:shrink-0">
                <p className={headingClass}>Connect</p>
                <ul className="mt-2 space-y-1">
                  {footerLinks.connect.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="cursor-pointer text-sm text-mono-70 transition-colors hover:text-brand-yellow"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            </Stagger>
          </div>
        </FadeIn>

        <div className="mt-5 flex flex-col gap-2 border-t border-mono-20 pt-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium text-brand-yellow">
              © {year} Zaims Holding. All rights reserved.
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-mono-55">
              Saudi Aramco Vendor #10119021 | Saudi Energy Approved Supplier
            </p>
          </div>

          <div className="inline-flex items-center gap-2">
            <span className="text-xs text-mono-55">Powered by</span>
            <a
              href="https://nocastra.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center transition-opacity hover:opacity-80"
              aria-label="Nocastra — opens nocastra.com"
            >
              <Image
                src="/assets/logos/nocastraLogo.png"
                alt="Nocastra"
                width={148}
                height={36}
                className="h-6 w-auto object-contain"
                unoptimized
                priority
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
