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
  address?: string;
  founded?: string;
  description: string;
  capabilities: string[];
  credentials: string[];
  highlights?: string[];
  clients?: string[];
  email?: string;
  phone?: string;
  website: string;
  /** @deprecated use brand.surface — kept for card tint utility classes */
  accent: string;
  brand: CompanyBrand;
};

export type LeadershipPerson = {
  name: string;
  role: string;
  company: string;
  companySlug?: CompanySlug;
  bio: string;
  /** Optional public source — omit for profiles not attributed to an external site */
  sourceUrl?: string;
};

/**
 * Leadership profiles for the group and operating companies.
 * NexGen names are as published on nxgens.com/about.
 * Dammam Laser CNC does not list named executives on its public About page.
 */
export const leadership: LeadershipPerson[] = [
  {
    name: "Adil Tasawar",
    role: "Founder & Managing Director",
    company: "Edge Steel KSA",
    companySlug: "edge-steel",
    bio: "With more than 15 years embedded in Saudi Arabia's industrial construction sector, Adil Tasawar leads with a hands-on approach across commercial strategy, major client relationships, and the technical decisions that determine outcomes on large-scale programmes.",
  },
  {
    name: "Eng. Hamad Zaman",
    role: "Leadership · NexGen Build",
    company: "NexGen Build",
    companySlug: "nexgen-build",
    bio: "20+ years of construction and industrial project management in Saudi Arabia. Recognized for driving structural execution and client-focused engineering solutions.",
    sourceUrl: "https://nxgens.com/about/",
  },
  {
    name: "Eng. Tariq Al-Ghamdi",
    role: "Leadership · NexGen Build",
    company: "NexGen Build",
    companySlug: "nexgen-build",
    bio: "15+ years managing integrated civil and industrial fabrication sites. Specialized in workflow efficiency, AWS welding compliance, and safety auditing.",
    sourceUrl: "https://nxgens.com/about/",
  },
  {
    name: "Eng. Sarah Al-Dosari",
    role: "Leadership · NexGen Build",
    company: "NexGen Build",
    companySlug: "nexgen-build",
    bio: "12+ years leading structural design, mechanical systems integration, and international engineering standards compliance for Saudi infrastructure projects.",
    sourceUrl: "https://nxgens.com/about/",
  },
];

export const companies: Company[] = [
  {
    slug: "nexgen-build",
    name: "NexGen Build",
    shortName: "NexGen",
    tagline: "Complete construction & fabrication for Saudi Arabia",
    role: "Construction & MEP systems",
    location: "Dammam & Jubail, Eastern Province",
    address: "Dammam, Saudi Arabia (Jubail facilities)",
    description:
      "End-to-end construction, industrial fabrication, and maintenance from foundation to finish. Six integrated divisions under one roof — general construction, electrical, HVAC, sanitary & plumbing, waterproofing & coatings, and fire protection — with Saudi Aramco vendor approval and Vision 2030–aligned delivery.",
    capabilities: [
      "General construction & civil works",
      "Electrical systems",
      "HVAC systems",
      "Sanitary & plumbing",
      "Waterproofing & coatings",
      "Fire protection systems",
      "Fiber laser & CNC fabrication (Dammam & Jubail workshops)",
      "AWS-certified welding (TIG, MIG, SMAW)",
    ],
    credentials: [
      "Saudi Aramco Approved Vendor #10119021",
      "Saudi Energy Registered Supplier (SAP Ariba)",
      "ISO 9001:2015 Certified",
      "AWS Certified Welding Processes",
    ],
    highlights: [
      "Six specialized service divisions, one contractor",
      "Workshop facilities in Dammam and Jubail",
      "<8% weld rejection rate (as published by NexGen)",
      "CNC precision within ±0.05mm tolerances (workshop capability)",
    ],
    email: "contact@Nxgens.com",
    phone: "+966-555-123-456",
    website: "https://nxgens.com/",
    accent: "bg-surface",
    brand: {
      logo: "/assets/logos/logo.png",
      logoWidth: 220,
      logoHeight: 78,
      primary: "#0f2744",
      accent: "#c9a227",
      surface: "#f7f1e8",
      heroFrom: "#0a1a2e",
      heroTo: "#0f2744",
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
    address: "Al-Khodariya Industrial Area, Dammam, Eastern Province, Saudi Arabia",
    description:
      "Based in Dammam, Dammam Laser CNC delivers precision laser cutting and CNC fabrication across metal, wood, and acrylic. Fiber lasers, CO₂ lasers, and CNC routers support heavy-duty industrial components through intricate decorative panels for construction, oil & gas, automotive, aerospace, and interior design clients.",
    capabilities: [
      "Fiber laser metal cutting (steel, stainless, aluminum)",
      "CO₂ laser cutting & engraving (wood, acrylic, plastic)",
      "Advanced CNC routing (2D & 3D)",
      "Architectural metal works",
      "Custom industrial parts fabrication",
      "Steel fabrication support",
      "Equipment rental, material supply & manpower solutions",
    ],
    credentials: ["SCA Certified Contractor", "VAT Registered", "SME Certified"],
    highlights: [
      "Serves construction, industrial manufacturing, oil & gas, automotive & aerospace, and interior design",
      "Working hours published as Saturday–Thursday, 07:00–19:00",
    ],
    email: "info@dammamlaser.com",
    phone: "0591259810",
    website: "https://dammamlaser.com/",
    accent: "bg-surface",
    brand: {
      logo: "/assets/logos/dammam-laser.png",
      logoWidth: 72,
      logoHeight: 68,
      primary: "#0f2744",
      accent: "#c9a227",
      surface: "#f7f1e8",
      heroFrom: "#0a1a2e",
      heroTo: "#0f2744",
      themeClass: "theme-dammam",
    },
  },
  {
    slug: "edge-steel",
    name: "Edge Steel KSA",
    shortName: "Edge Steel",
    tagline: "Precision steel. Built for Saudi Arabia.",
    role: "Steel fabrication",
    location: "Riyadh, KSA",
    address: "Riyadh, Saudi Arabia",
    founded: "2020",
    description:
      "Established in 2020 in Riyadh, Edge Steel KSA delivers structural and architectural steel fabrication, CNC fiber laser cutting (±0.1mm), weld assemblies, equipment rental, and material & manpower supply. SCA-certified work for government, defence, energy, and commercial clients across the Kingdom — 500+ projects completed as published on their site.",
    capabilities: [
      "Structural steel fabrication (beams, columns, trusses)",
      "CNC fiber laser cutting (±0.1mm tolerance)",
      "Decorative & architectural façade panels",
      "Weld assemblies & sub-frames",
      "Equipment rental (generators, excavators, cranes, forklifts, welding machines)",
      "Material & manpower supply",
    ],
    credentials: ["SCA Certified Contractor", "VAT Registered", "SME Certified"],
    highlights: [
      "500+ projects completed across the Kingdom (as published)",
      "15+ major government & enterprise clients (as published)",
      "Laser division commissioned 2022; fleet expansion 2024",
    ],
    clients: [
      "Ministry of Interior",
      "Saudi National Guard",
      "Siemens KSA",
      "Alfanar Projects",
      "Riyadh Metro",
      "Jadah Development",
      "SAPCQ",
      "Tarshid Energy",
    ],
    website: "https://edgesteelksa.com/en",
    accent: "bg-surface",
    brand: {
      logo: "/assets/logos/edge-steel.png",
      logoWidth: 160,
      logoHeight: 90,
      primary: "#0f2744",
      accent: "#c9a227",
      surface: "#f7f1e8",
      heroFrom: "#0a1a2e",
      heroTo: "#0f2744",
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
    icon: "/assets/icons/icon-construction.png",
  },
  {
    title: "Steel Fabrication",
    description:
      "Heavy structural members, architectural panels, and weld assemblies through Edge Steel KSA — built for demanding Saudi projects.",
    company: "Edge Steel KSA",
    icon: "/assets/icons/icon-steel.png",
  },
  {
    title: "Precision Manufacturing",
    description:
      "Laser and CNC fabrication through Dammam Laser CNC — tight-tolerance components and decorative metalwork.",
    company: "Dammam Laser CNC",
    icon: "/assets/icons/icon-precision.png",
  },
  {
    title: "Industrial Systems",
    description:
      "Electrical, HVAC, plumbing, waterproofing, and fire protection — integrated under NexGen so systems and structure stay coordinated.",
    company: "NexGen Build",
    icon: "/assets/icons/icon-systems.png",
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
