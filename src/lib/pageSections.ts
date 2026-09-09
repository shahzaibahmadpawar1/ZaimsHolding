export type PageSection = { id: string; label: string };

/** In-page sections for the Line Menu TOC (max 5 links). */
export const pageSections: Record<string, PageSection[]> = {
  "/": [
    { id: "hero", label: "Intro" },
    { id: "vision", label: "Vision" },
    { id: "companies", label: "Companies" },
    { id: "sectors", label: "Sectors" },
    { id: "contact-cta", label: "Contact" },
  ],
  "/about": [
    { id: "overview", label: "Overview" },
    { id: "story", label: "Story" },
    { id: "values", label: "Values" },
    { id: "leadership", label: "Leadership" },
    { id: "footprint", label: "Footprint" },
  ],
  "/companies": [
    { id: "overview", label: "Overview" },
    { id: "portfolio", label: "Companies" },
    { id: "ownership", label: "Ownership" },
    { id: "contact-cta", label: "Contact" },
  ],
  "/companies/nexgen-build": [
    { id: "overview", label: "Overview" },
    { id: "details", label: "Details" },
    { id: "why-choose", label: "Why us" },
    { id: "services", label: "Services" },
    { id: "journey", label: "Journey" },
  ],
  "/companies/dammam-laser": [
    { id: "overview", label: "Overview" },
    { id: "details", label: "Details" },
    { id: "mission", label: "Mission" },
    { id: "services", label: "Services" },
    { id: "industries", label: "Industries" },
  ],
  "/companies/edge-steel": [
    { id: "overview", label: "Overview" },
    { id: "details", label: "Details" },
    { id: "partners", label: "Partners" },
    { id: "projects", label: "Projects" },
    { id: "journey", label: "Journey" },
  ],
  "/sectors": [
    { id: "overview", label: "Overview" },
    { id: "sectors", label: "Sectors" },
    { id: "holding", label: "Holding" },
    { id: "contact-cta", label: "Contact" },
  ],
  "/why-zaims": [
    { id: "overview", label: "Overview" },
    { id: "thesis", label: "Thesis" },
    { id: "portfolio", label: "Portfolio" },
    { id: "model", label: "Model" },
    { id: "contact-cta", label: "Contact" },
  ],
  "/comparison": [
    { id: "overview", label: "Overview" },
    { id: "table", label: "Compare" },
    { id: "fit", label: "Fit" },
    { id: "contact-cta", label: "Contact" },
  ],
  "/portfolio": [
    { id: "overview", label: "Overview" },
    { id: "work", label: "Work" },
    { id: "contact-cta", label: "Contact" },
  ],
  "/news": [
    { id: "overview", label: "Overview" },
    { id: "updates", label: "Updates" },
    { id: "contact-cta", label: "Contact" },
  ],
  "/investors": [
    { id: "overview", label: "Overview" },
    { id: "glance", label: "At a glance" },
    { id: "resources", label: "Resources" },
    { id: "contact-cta", label: "Contact" },
  ],
  "/contact": [
    { id: "overview", label: "Overview" },
    { id: "form", label: "Inquiry" },
  ],
};

export function getPageSections(pathname: string): PageSection[] {
  if (pageSections[pathname]) return pageSections[pathname];
  // Fallback for dynamic company routes
  if (pathname.startsWith("/companies/")) {
    return pageSections["/companies/nexgen-build"];
  }
  return [
    { id: "overview", label: "Overview" },
    { id: "contact-cta", label: "Contact" },
  ];
}
