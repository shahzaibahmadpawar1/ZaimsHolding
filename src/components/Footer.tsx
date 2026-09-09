"use client";

import Image from "next/image";
import Link from "next/link";
import { companies, footerLinks } from "@/lib/content";
import { FadeIn, Stagger, StaggerItem } from "@/components/Motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-mono-20 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <FadeIn>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Link href="/" className="inline-flex items-center" aria-label="Zaims Holding home">
                <Image
                  src="/assets/logos/zaimsLogo.png"
                  alt="Zaims Holding"
                  width={200}
                  height={56}
                  className="h-10 w-auto object-contain"
                  unoptimized
                />
              </Link>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-mono-70">
                An industrial holding company that owns and operates complementary construction and
                fabrication businesses across Saudi Arabia.
              </p>
            </div>

            <Stagger className="md:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-3" delay={0.08}>
              <StaggerItem>
                <p className="text-xs font-semibold uppercase tracking-wider text-mono-55">Company</p>
                <ul className="mt-4 space-y-2.5">
                  {footerLinks.company.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-[15px] text-mono-70 transition-colors hover:text-mono-90 cursor-pointer"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
              <StaggerItem>
                <p className="text-xs font-semibold uppercase tracking-wider text-mono-55">Portfolio</p>
                <ul className="mt-4 space-y-2.5">
                  {footerLinks.portfolio.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-[15px] text-mono-70 transition-colors hover:text-mono-90 cursor-pointer"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                  {companies.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/companies/${c.slug}`}
                        className="text-[15px] text-mono-70 transition-colors hover:text-mono-90 cursor-pointer"
                      >
                        {c.shortName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
              <StaggerItem>
                <p className="text-xs font-semibold uppercase tracking-wider text-mono-55">
                  Connect
                </p>
                <ul className="mt-4 space-y-2.5">
                  {footerLinks.connect.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="cursor-pointer text-[15px] text-mono-70 transition-colors hover:text-mono-90"
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

        <div className="mt-14 flex flex-col gap-5 border-t border-mono-20 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-brand-accent">
              © {year} Zaims Holding. All rights reserved.
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-mono-55">
              Saudi Aramco Vendor #10119021 | Saudi Energy Approved Supplier
            </p>
          </div>

          <div className="inline-flex items-center gap-2.5">
            <span className="text-sm text-mono-55">Developed by</span>
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
                className="h-7 w-auto object-contain"
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
