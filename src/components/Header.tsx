"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { navItems, type NavItem } from "@/lib/content";

function linkIsActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function itemIsActive(pathname: string, item: NavItem) {
  if (linkIsActive(pathname, item.href)) return true;
  return item.children?.some((c) => linkIsActive(pathname, c.href)) ?? false;
}

function BrandLogo({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  if (compact) {
    return (
      <Image
        src="/assets/logos/zaimsLogo.jpg"
        alt="Zaims Holding"
        width={36}
        height={36}
        className={`h-8 w-8 object-contain ${className}`}
        priority
        unoptimized
      />
    );
  }

  return (
    <Image
      src="/assets/logos/zaimsLogo.jpg"
      alt="Zaims Holding"
      width={168}
      height={48}
      className={`h-8 w-auto max-w-full object-contain md:h-9 ${className}`}
      priority
      unoptimized
    />
  );
}

/**
 * Pill dropdown nav inspired by:
 * https://www.framer.com/marketplace/components/pill-dropdown-nav/
 */
export default function Header({ theme = "light" }: { theme?: "dark" | "light" }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setMobileExpanded(null);
  }, [pathname]);

  const isLightBackground = theme === "light" || scrolled;
  const linkColor = isLightBackground ? "rgba(26, 69, 112, 0.9)" : "rgba(247, 241, 232, 0.92)";
  const activePill = isLightBackground ? "rgba(26, 69, 112, 0.06)" : "rgba(247, 241, 232, 0.14)";
  const hoverClass = isLightBackground ? "hover:bg-black/5" : "hover:bg-surface/10";
  const dropdownBg = isLightBackground ? "rgba(247,241,232,0.98)" : "rgba(15, 39, 68, 0.96)";
  const dropdownBorder = isLightBackground ? "rgba(26,69,112,0.1)" : "rgba(247,241,232,0.14)";
  const dropdownText = isLightBackground ? "#1A4570" : "#F7F1E8";
  const dropdownMuted = isLightBackground ? "#5a6d82" : "rgba(247,241,232,0.65)";

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  const openDropdown = (label: string) => {
    clearCloseTimer();
    setOpenMenu(label);
  };

  return (
    <>
      <motion.nav
        aria-label="Primary"
        className="fixed top-4 left-1/2 z-50 hidden w-[min(72rem,calc(100%-1.5rem))] -translate-x-1/2 items-center gap-1 lg:top-5 lg:flex lg:w-[min(72rem,calc(100%-2rem))] lg:gap-2 xl:w-[min(72rem,calc(100%-3rem))]"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: 64,
          padding: "6px 6px 6px 16px",
          borderRadius: 9999,
          backgroundColor: scrolled
            ? "rgba(247,241,232,0.94)"
            : theme === "light"
              ? "rgba(247,241,232,0.78)"
              : "rgba(247,241,232,0.12)",
          backdropFilter: "blur(24px) saturate(160%)",
          boxShadow: scrolled ? "var(--shadow-nav)" : "none",
          border: scrolled
            ? "1px solid rgba(26,69,112,0.1)"
            : theme === "light"
              ? "1px solid rgba(26,69,112,0.1)"
              : "1px solid rgba(247,241,232,0.2)",
          transition: "background-color 0.3s, box-shadow 0.3s, border-color 0.3s",
        }}
      >
        <Link href="/" className="flex flex-shrink-0 items-center" aria-label="Zaims Holding home">
          <BrandLogo compact={!isLightBackground} />
        </Link>

        <div className="ml-1 flex min-w-0 flex-1 items-center justify-center gap-0 lg:gap-0.5">
          {navItems.map((item) => {
            const active = itemIsActive(pathname, item);
            const hasChildren = Boolean(item.children?.length);
            const isOpen = openMenu === item.label;

            if (!hasChildren) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative z-0 cursor-pointer whitespace-nowrap rounded-full px-2.5 py-2 font-medium transition-colors duration-200 hover:!text-brand-yellow xl:px-3.5 ${
                    active ? "" : hoverClass
                  }`}
                  style={{ fontSize: 14, lineHeight: 1, color: linkColor }}
                  onMouseEnter={() => setOpenMenu(null)}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{ backgroundColor: activePill }}
                      initial={{ scale: 0.72, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.7 }}
                    />
                  )}
                  {item.label}
                </Link>
              );
            }

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => openDropdown(item.label)}
                onMouseLeave={scheduleClose}
              >
                <Link
                  href={item.href}
                  aria-expanded={isOpen}
                  aria-haspopup="menu"
                  aria-controls={`${menuId}-${item.label}`}
                  aria-current={active ? "page" : undefined}
                  className={`relative z-0 inline-flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 font-medium transition-colors duration-200 hover:!text-brand-yellow xl:px-3.5 ${
                    active || isOpen ? "" : hoverClass
                  }`}
                  style={{ fontSize: 14, lineHeight: 1, color: linkColor }}
                  onClick={() => setOpenMenu(null)}
                >
                  {(active || isOpen) && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{ backgroundColor: activePill }}
                      initial={{ scale: 0.72, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.7 }}
                    />
                  )}
                  {item.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 opacity-60 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </Link>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`${menuId}-${item.label}`}
                      role="menu"
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-[calc(100%+14px)] left-1/2 z-50 min-w-[240px] -translate-x-1/2 overflow-hidden rounded-2xl p-1.5 shadow-[0_16px_40px_rgba(11,18,32,0.14)]"
                      style={{
                        backgroundColor: dropdownBg,
                        border: `1px solid ${dropdownBorder}`,
                        backdropFilter: "blur(20px)",
                      }}
                      onMouseEnter={clearCloseTimer}
                      onMouseLeave={scheduleClose}
                    >
                      {item.children!.map((child) => {
                        const childActive = linkIsActive(pathname, child.href);
                        return (
                          <Link
                            key={child.href + child.label}
                            href={child.href}
                            role="menuitem"
                            aria-current={childActive ? "page" : undefined}
                            className={`group block cursor-pointer rounded-xl px-3.5 py-2.5 transition-colors ${
                              childActive
                                ? isLightBackground
                                  ? "bg-mono-10"
                                  : "bg-surface/10"
                                : isLightBackground
                                  ? "hover:bg-mono-10"
                                  : "hover:bg-surface/10"
                            }`}
                            onClick={() => setOpenMenu(null)}
                          >
                            <span
                              className="block text-sm font-semibold transition-colors group-hover:!text-brand-yellow"
                              style={{ color: dropdownText }}
                            >
                              {child.label}
                            </span>
                            {child.description && (
                              <span
                                className="mt-0.5 block text-xs leading-snug"
                                style={{ color: dropdownMuted }}
                              >
                                {child.description}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <Link
          href="/contact"
          className="flex flex-shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-full bg-brand-primary px-4 py-2.5 text-sm font-semibold text-surface transition-opacity hover:opacity-90 xl:px-5"
        >
          Get in touch
        </Link>
      </motion.nav>

      {/* Mobile + tablet — keep pill fully inside the viewport */}
      <div className="fixed top-3 left-1/2 z-50 box-border flex w-[calc(100%-1.5rem)] max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center justify-between gap-2 overflow-hidden rounded-full border border-mono-20/80 bg-surface/90 px-3 py-2.5 shadow-soft backdrop-blur-xl sm:top-4 sm:w-[calc(100%-2rem)] sm:max-w-[calc(100vw-2rem)] sm:px-4 sm:py-3 lg:hidden">
        <Link
          href="/"
          className="flex min-w-0 flex-1 items-center overflow-hidden"
          aria-label="Zaims Holding home"
        >
          <BrandLogo className="h-6! w-auto max-w-full object-contain object-left sm:h-7!" />
        </Link>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full hover:bg-mono-10"
            >
              <Menu className="h-5 w-5 text-mono-90" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-[60] bg-mono-100/40 backdrop-blur-sm" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-[70] flex w-[min(100%,20rem)] flex-col overflow-y-auto bg-surface p-6 shadow-soft outline-none">
              <div className="mb-8 flex items-center justify-between">
                <Dialog.Title asChild>
                  <Link href="/" className="flex items-center" aria-label="Zaims Holding home">
                    <BrandLogo className="!h-8" />
                  </Link>
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Close menu"
                    className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-mono-10"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </Dialog.Close>
              </div>

              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const active = itemIsActive(pathname, item);
                  const hasChildren = Boolean(item.children?.length);
                  const expanded = mobileExpanded === item.label;

                  if (!hasChildren) {
                    return (
                      <Dialog.Close asChild key={item.label}>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={`cursor-pointer rounded-xl px-3 py-3 text-base font-medium text-mono-90 hover:bg-mono-10 ${
                            active ? "bg-mono-10" : ""
                          }`}
                        >
                          {item.label}
                        </Link>
                      </Dialog.Close>
                    );
                  }

                  return (
                    <div key={item.label} className="rounded-xl">
                      <div
                        className={`flex items-center rounded-xl hover:bg-mono-10 ${
                          active ? "bg-mono-10" : ""
                        }`}
                      >
                        <Dialog.Close asChild>
                          <Link
                            href={item.href}
                            aria-current={active ? "page" : undefined}
                            className="flex-1 cursor-pointer px-3 py-3 text-left text-base font-medium text-mono-90"
                          >
                            {item.label}
                          </Link>
                        </Dialog.Close>
                        <button
                          type="button"
                          aria-expanded={expanded}
                          aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label} submenu`}
                          className="inline-flex h-11 w-11 flex-shrink-0 cursor-pointer items-center justify-center rounded-xl text-mono-55 hover:bg-mono-10"
                          onClick={() => setMobileExpanded(expanded ? null : item.label)}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              expanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mb-2 ml-2 flex flex-col gap-0.5 border-l border-mono-20 pl-3">
                              {item.children!.map((child) => {
                                const childActive = linkIsActive(pathname, child.href);
                                return (
                                  <Dialog.Close asChild key={child.href + child.label}>
                                    <Link
                                      href={child.href}
                                      aria-current={childActive ? "page" : undefined}
                                      className={`cursor-pointer rounded-lg px-2.5 py-2 text-sm font-medium hover:bg-mono-10 ${
                                        childActive ? "bg-mono-10 text-mono-90" : "text-mono-70"
                                      }`}
                                    >
                                      {child.label}
                                    </Link>
                                  </Dialog.Close>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <Dialog.Close asChild>
                <Link
                  href="/contact"
                  className="mt-auto cursor-pointer rounded-full bg-brand-primary px-5 py-3 text-center text-sm font-semibold text-surface"
                >
                  Get in touch
                </Link>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </>
  );
}
