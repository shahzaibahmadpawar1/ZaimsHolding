"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import TableOfContent from "@/framer/TableOfContent";
import { getPageSections } from "@/lib/pageSections";

/**
 * Line Menu - TOC on every page
 * https://www.framer.com/marketplace/components/line-menu-toc/
 */
export default function SiteToc() {
  const pathname = usePathname();
  const sections = useMemo(() => getPageSections(pathname), [pathname]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible[0]?.target?.id) return;
        const idx = sections.findIndex((s) => s.id === visible[0].target.id);
        if (idx >= 0) setActiveIndex(idx);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [sections, pathname]);

  const padded = [...sections];
  while (padded.length < 5) padded.push({ id: "", label: "" });

  const [a, b, c, d, e] = padded;

  return (
    <aside
      aria-label="Page section navigation"
      className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block xl:left-6"
    >
      <div className="pointer-events-auto py-2 pl-1 pr-3">
        <TableOfContent
          key={pathname}
          variant="Desktop"
          title1={a.label || undefined}
          link1={a.id ? `#${a.id}` : undefined}
          title2={b.label || undefined}
          link2={b.id ? `#${b.id}` : undefined}
          title3={c.label || undefined}
          link3={c.id ? `#${c.id}` : undefined}
          title4={d.label || undefined}
          link4={d.id ? `#${d.id}` : undefined}
          title5={e.label || undefined}
          link5={e.id ? `#${e.id}` : undefined}
          activeIndex={activeIndex}
          lineColor="#B87333"
          linkColor="#B87333"
          linkFontSize={11}
          lineRadius="2px"
        />
      </div>
    </aside>
  );
}
