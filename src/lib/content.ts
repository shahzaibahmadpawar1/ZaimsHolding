export type CompanySlug = "nexgen-build" | "dammam-laser" | "edge-steel";

/** Visual identity pulled from each operating company's public site. */
export type CompanyBrand = {
  logo: string;
  logoWidth: number;
  logoHeight: number;
  /** Primary brand / navy */
  primary: string;
  /** CTA / highlight accent */
  accent: string;
  /** Soft card / section tint */
  surface: string;
  /** Dark hero gradient stops */
  heroFrom: string;
  heroTo: string;
  /** CSS variable class applied on company pages */
  themeClass: string;
};

export type Company = {
  slug: CompanySlug;
  name: string;
  shortName: string;
  tagline: string;
  role: string;
  location: string;
  founded?: string;
  description: string;
  capabilities: string[];
  credentials: string[];
  website: string;
  /** @deprecated use brand.surface — kept for card tint utility classes */
  accent: string;
  brand: CompanyBrand;
};

export const companies: Company[] = [
  {
    slug: "nexgen-build",
    name: "NexGen Build",
    shortName: "NexGen",
    tagline: "Construction & integrated building systems",
    role: "Construction & MEP systems",
    location: "Dammam & Jubail, Eastern Province",
    description:
      "End-to-end construction and building systems under one roof — general construction, electrical, HVAC, plumbing, waterproofing, and fire protection. An approved Saudi Aramco vendor delivering critical infrastructure aligned with Vision 2030 standards.",
    capabilities: [
      "General construction & civil works",
      "Electrical systems",
      "HVAC systems",
      "Sanitary & plumbing",
      "Waterproofing & coatings",
      "Fire protection systems",
    ],
    credentials: [
      "Saudi Aramco Approved Vendor #10119021",
      "Saudi Energy Registered Supplier (SAP Ariba)",
      "ISO 9001 Certified",
      "AWS Certified Welding Processes",
    ],
    website: "https://nxgens.com/",
    accent: "bg-[#0d2545]/[0.05]",
    brand: {
      // nxgens.com — Barlow / Barlow Condensed, navy #0d2545, orange #e8601a
      logo: "/assets/logos/logo.png",
      logoWidth: 220,
      logoHeight: 78,
      primary: "#0d2545",
      accent: "#e8601a",
      surface: "rgba(13, 37, 69, 0.05)",
      heroFrom: "#071525",
      heroTo: "#0d2545",
      themeClass: "theme-nexgen",
    },
  },
  {
    slug: "dammam-laser",
    name: "Dammam Laser CNC",
    shortName: "Dammam Laser",
    tagline: "Precision laser cutting and CNC fabrication",
    role: "Precision manufacturing",
    location: "Dammam, Eastern Province",
    description:
      "Precision fabrication powered by fiber lasers, CO₂ technology, and CNC routing. From heavy-duty metal components to intricate decorative panels — steel, stainless, aluminum, wood, and acrylic.",
    capabilities: [
      "Fiber laser metal cutting",
      "CO₂ laser cutting & engraving",
      "Advanced CNC routing (2D & 3D)",
      "Architectural metal works",
      "Custom industrial parts",
    ],
    credentials: ["SCA Certified Contractor", "VAT Registered", "SME Certified"],
    website: "https://dammamlaser.com/",
    accent: "bg-[#e5b52a]/[0.08]",
    brand: {
      // dammamlaser.com — Inter, black + mustard gold #e5b52a / #c8991a
      logo: "/assets/logos/dammam-laser.png",
      logoWidth: 72,
      logoHeight: 68,
      primary: "#0a0a0a",
      accent: "#e5b52a",
      surface: "rgba(229, 181, 42, 0.08)",
      heroFrom: "#000000",
      heroTo: "#1a1a1a",
      themeClass: "theme-dammam",
    },
  },
  {
    slug: "edge-steel",
    name: "Edge Steel KSA",
    shortName: "Edge Steel",
    tagline: "Structural and architectural steel",
    role: "Steel fabrication",
    location: "Riyadh, KSA",
    founded: "2020",
    description:
      "Structural and architectural steel fabrication for commercial, government, and infrastructure clients across the Kingdom. Precision cutting, welding, and custom assemblies built to SCA and international standards.",
    capabilities: [
      "Structural steel fabrication",
      "Laser-cut decorative & façade panels",
      "Weld assemblies & sub-frames",
      "Equipment rental support",
      "Material & manpower supply",
    ],
    credentials: ["SCA Certified Contractor", "VAT Registered", "SME Certified"],
    website: "https://edgesteelksa.com/en",
    accent: "bg-[#ff5722]/[0.06]",
    brand: {
      // edgesteelksa.com — Sora + Space Mono, black + #ff5722
      logo: "/assets/logos/edge-steel.png",
      logoWidth: 160,
      logoHeight: 90,
      primary: "#0a0a0a",
      accent: "#ff5722",
      surface: "rgba(255, 87, 34, 0.06)",
      heroFrom: "#050505",
      heroTo: "#141414",
      themeClass: "theme-edge",
    },
  },
];

export function getCompany(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

export const sectors = [
  {
    title: "Construction",
    description:
      "Turnkey structural and civil delivery through NexGen Build — from foundations to handover on industrial and commercial sites.",
    company: "NexGen Build",
  },
  {
    title: "Steel Fabrication",
    description:
      "Heavy structural members, architectural panels, and weld assemblies through Edge Steel KSA — built for demanding Saudi projects.",
    company: "Edge Steel KSA",
  },
  {
    title: "Precision Manufacturing",
    description:
      "Laser and CNC fabrication through Dammam Laser CNC — tight-tolerance components and decorative metalwork.",
    company: "Dammam Laser CNC",
  },
  {
    title: "Industrial Systems",
    description:
      "Electrical, HVAC, plumbing, waterproofing, and fire protection — integrated under NexGen so systems and structure stay coordinated.",
    company: "NexGen Build",
  },
];

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  /** Primary destination when the item is clicked (also used for active matching). */
  href: string;
  children?: NavChild[];
};

/**
 * Top nav — primary destinations + dropdowns for pages that are not top-level links.
 * Inspired by Framer Pill Dropdown Nav.
 */
export const navItems: NavItem[] = [
  {
    label: "Companies",
    href: "/companies",
    children: [
      {
        label: "All companies",
        href: "/companies",
        description: "Portfolio hub for the three operators",
      },
      {
        label: "NexGen Build",
        href: "/companies/nexgen-build",
        description: "Construction & MEP systems",
      },
      {
        label: "Dammam Laser CNC",
        href: "/companies/dammam-laser",
        description: "Precision laser & CNC fabrication",
      },
      {
        label: "Edge Steel KSA",
        href: "/companies/edge-steel",
        description: "Structural & architectural steel",
      },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      {
        label: "Our story",
        href: "/about",
        description: "Holding purpose and footprint",
      },
      {
        label: "Why Zaims",
        href: "/why-zaims",
        description: "Ownership thesis and model",
      },
      {
        label: "Comparison",
        href: "/comparison",
        description: "How we differ from other models",
      },
    ],
  },
  { label: "Sectors", href: "/sectors" },
  {
    label: "Insights",
    href: "/news",
    children: [
      {
        label: "News",
        href: "/news",
        description: "Updates from the group",
      },
      {
        label: "Track record",
        href: "/portfolio",
        description: "Selected work across companies",
      },
      {
        label: "Investors",
        href: "/investors",
        description: "Capital partner overview",
      },
    ],
  },
];

/** @deprecated Use navItems — kept for any residual imports */
export const navLinks = navItems.map(({ label, href }) => ({ label, href }));

export const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Why Zaims", href: "/why-zaims" },
    { label: "Comparison", href: "/comparison" },
  ],
  portfolio: [
    { label: "Our Companies", href: "/companies" },
    { label: "Track Record", href: "/portfolio" },
    { label: "Sectors", href: "/sectors" },
  ],
  /** Renamed from "stakeholders" — /stakeholders redirects to /investors; avoid duplicate naming. */
  connect: [
    { label: "Investors", href: "/investors" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
  ],
};
