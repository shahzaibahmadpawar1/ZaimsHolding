"use client";

/**
 * Line Menu - TOC (Framer Marketplace by Till Janek)
 * https://www.framer.com/marketplace/components/line-menu-toc/
 * https://framer.com/m/TOC-yhIYWQ.js@vXVcqW8M5tFBmJdzzAH5
 *
 * Default: thin lines only. Hover: line expands + label reveals.
 */

import { motion } from "motion/react";
import { useState } from "react";

export type TableOfContentProps = {
  variant?: "Desktop" | "Closed" | "1" | "2" | "3" | "4" | "5";
  title1?: string;
  link1?: string;
  title2?: string;
  link2?: string;
  title3?: string;
  link3?: string;
  title4?: string;
  link4?: string;
  title5?: string;
  link5?: string;
  lineColor?: string;
  lineRadius?: string;
  linkColor?: string;
  linkFontSize?: number;
  allLinksNewTab?: boolean;
  activeIndex?: number | null;
  style?: React.CSSProperties;
  className?: string;
};

type TocItem = { title: string; href: string };

const spring = { type: "spring" as const, bounce: 0.2, duration: 0.4 };

export default function TableOfContent({
  title1,
  link1,
  title2,
  link2,
  title3,
  link3,
  title4,
  link4,
  title5,
  link5,
  lineColor = "#B87333",
  lineRadius = "2px",
  linkColor = "#B87333",
  linkFontSize = 12,
  activeIndex = null,
  style,
  className = "",
}: TableOfContentProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [menuHot, setMenuHot] = useState(false);

  const items: TocItem[] = [
    title1 && link1 ? { title: title1, href: link1 } : null,
    title2 && link2 ? { title: title2, href: link2 } : null,
    title3 && link3 ? { title: title3, href: link3 } : null,
    title4 && link4 ? { title: title4, href: link4 } : null,
    title5 && link5 ? { title: title5, href: link5 } : null,
  ].filter(Boolean) as TocItem[];

  function scrollToHash(href: string) {
    if (!href.startsWith("#")) return;
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    }
  }

  return (
    <nav
      className={`flex flex-col ${className}`}
      style={style}
      onMouseEnter={() => setMenuHot(true)}
      onMouseLeave={() => {
        setHovered(null);
        setMenuHot(false);
      }}
      aria-label="Page sections"
    >
      {items.map((item, i) => {
        const active = hovered === i;
        const inView = activeIndex === i;
        const showLabel = menuHot && (hovered === null || active);
        const lineActive = active || (!menuHot && inView);

        return (
          <a
            key={`${item.href}-${item.title}`}
            href={item.href}
            className="flex items-center gap-2 no-underline cursor-pointer"
            style={{ height: menuHot ? 22 : 16 }}
            onMouseEnter={() => setHovered(i)}
            onClick={(e) => {
              if (item.href.startsWith("#")) {
                e.preventDefault();
                scrollToHash(item.href);
              }
            }}
          >
            <motion.span
              className="block h-[3px] flex-shrink-0"
              style={{
                backgroundColor: lineActive ? "#D4924A" : lineColor,
                borderRadius: lineRadius,
              }}
              animate={{
                width: active ? 24 : lineActive || (menuHot && hovered !== null) ? 18 : 12,
              }}
              transition={spring}
            />
            <motion.span
              className="overflow-hidden whitespace-nowrap uppercase"
              style={{
                fontFamily: 'ui-monospace, "Geist Mono", "SF Mono", Menlo, monospace',
                fontSize: linkFontSize,
                letterSpacing: "-0.02em",
                lineHeight: "1em",
                color: active ? "#D4924A" : linkColor,
              }}
              animate={{
                opacity: showLabel ? 1 : 0,
                maxWidth: showLabel ? 160 : 0,
                x: showLabel ? 0 : -4,
              }}
              transition={spring}
            >
              {item.title}
            </motion.span>
          </a>
        );
      })}
    </nav>
  );
}
