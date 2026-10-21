import type { CompanySlug } from "@/lib/content";

export type WhyChooseItem = {
  title: string;
  body: string;
  icon: string;
};

export type ServiceDivision = {
  title: string;
  icon: string;
  whatWeDo: string;
  keyServices: string[];
  whyItMatters: string;
};

export type Milestone = {
  label: string;
  title: string;
  description: string;
  year?: string;
};

export type PartnerStat = {
  value: string;
  label: string;
};

export type ProjectItem = {
  title: string;
  categories: string[];
  featured?: boolean;
  summary?: string;
};

export type MissionContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
};

export type NamedItem = {
  title: string;
  description?: string;
};

export type NexgenPageContent = {
  whyChoose: WhyChooseItem[];
  serviceDivisions: ServiceDivision[];
  milestones: Milestone[];
};

export type EdgePageContent = {
  partnersIntro: string;
  partners: { name: string; logo: string }[];
  partnerStats: PartnerStat[];
  projectCategories: string[];
  projects: ProjectItem[];
  milestones: Milestone[];
};

export type DammamPageContent = {
  mission: MissionContent;
  services: NamedItem[];
  industries: NamedItem[];
};

export type PropipePageContent = {
  mission: MissionContent;
  services: NamedItem[];
  industries: NamedItem[];
};

export const nexgenPage: NexgenPageContent = {
  whyChoose: [
    {
      title: "Integrated Expertise",
      body: "One contractor handles six specialized services. You coordinate with us — we coordinate the details internally. This eliminates delays, ensures design compatibility, and simplifies project management.",
      icon: "/assets/icons/icon-trophy.webp",
    },
    {
      title: "Saudi Aramco Approved",
      body: "Approval as Saudi Aramco vendor #10119021 means we meet the Kingdom's most demanding standards. We're trusted with critical infrastructure.",
      icon: "/assets/icons/icon-shield.webp",
    },
    {
      title: "Certified Professional Teams",
      body: "Technical staff hold AWS welding certifications, electrical engineering qualifications, and industry-specific training. Experience meets credentials on every project.",
      icon: "/assets/icons/icon-check.webp",
    },
    {
      title: "Safety-First Approach",
      body: "We implement strict safety protocols on every job site. Safety compliance isn't negotiable — it's embedded in our operations.",
      icon: "/assets/icons/icon-shield.webp",
    },
    {
      title: "Transparent Communication",
      body: "We provide regular project updates, manage expectations clearly, and respond to client questions promptly. You always know project status.",
      icon: "/assets/icons/icon-group.webp",
    },
    {
      title: "Preventive Maintenance",
      body: "Beyond installation, we offer maintenance contracts that prevent costly emergency repairs and extend system lifespan.",
      icon: "/assets/icons/icon-timer.webp",
    },
  ],
  serviceDivisions: [
    {
      title: "General Construction",
      icon: "/assets/icons/icon-construction.webp",
      whatWeDo:
        "Our construction team executes complete structural projects from concept through handover. We manage site preparation, excavation, reinforced concrete foundations, structural steel framing, masonry work, and comprehensive civil site development.",
      keyServices: [
        "Site preparation & excavation",
        "Reinforced concrete foundations",
        "Structural steel framing",
        "Masonry & brickwork",
        "Paving & site finishing",
        "Full site infrastructure",
      ],
      whyItMatters:
        "We handle end-to-end construction delivery, eliminating the need to coordinate multiple contractors.",
    },
    {
      title: "Electrical Systems",
      icon: "/assets/icons/icon-systems.webp",
      whatWeDo:
        "Power distribution engineering, panel installations, and backup power networks designed and installed for industrial and commercial facilities.",
      keyServices: [
        "Power distribution design",
        "Panel & switchgear installation",
        "Backup power networks",
        "Lighting & controls",
        "Testing & commissioning",
      ],
      whyItMatters:
        "Electrical scope stays coordinated with HVAC, fire, and structural teams under one accountable contractor.",
    },
    {
      title: "HVAC Systems",
      icon: "/assets/icons/icon-systems.webp",
      whatWeDo:
        "Commercial HVAC duct design, central cooling systems, and VRF technology for reliable climate control across industrial and commercial buildings.",
      keyServices: [
        "Central cooling systems",
        "Duct design & installation",
        "VRF technology",
        "Energy-efficient HVAC design",
        "Commissioning & balancing",
      ],
      whyItMatters:
        "HVAC is planned with electrical and spatial constraints from day one — fewer clashes, fewer change orders.",
    },
    {
      title: "Sanitary & Plumbing",
      icon: "/assets/icons/icon-systems.webp",
      whatWeDo:
        "Complete plumbing and sanitary systems for industrial and commercial projects, including water-saving designs aligned with responsible building practice.",
      keyServices: [
        "Domestic water systems",
        "Drainage & sanitary networks",
        "Industrial piping",
        "Water-saving fixtures",
        "Inspection & handover",
      ],
      whyItMatters:
        "Plumbing interfaces with structure and MEP are resolved inside one team instead of across competing subcontractors.",
    },
    {
      title: "Waterproofing & Coatings",
      icon: "/assets/icons/icon-shield.webp",
      whatWeDo:
        "Roof membranes, foundation sealing, and protective coatings that extend structural life in demanding Saudi climates.",
      keyServices: [
        "Roof membrane systems",
        "Foundation waterproofing",
        "Protective coatings",
        "Remedial sealing",
        "Quality inspection",
      ],
      whyItMatters:
        "Protection of the building envelope is delivered as part of the same accountable construction package.",
    },
    {
      title: "Fire Protection Systems",
      icon: "/assets/icons/icon-systems.webp",
      whatWeDo:
        "Fire protection systems integrated with building design so code compliance and life safety are engineered into the project — not added as an afterthought.",
      keyServices: [
        "Fire detection & alarms",
        "Suppression systems",
        "Code-compliant design",
        "Integration with building systems",
        "Testing & certification support",
      ],
      whyItMatters:
        "Fire protection is coordinated with architectural and MEP layouts from the start, reducing code failures at handover.",
    },
  ],
  milestones: [
    {
      label: "Founded",
      title: "NexGen Build Company Established",
      description:
        "Company founded in Dammam, Saudi Arabia with a vision to deliver integrated construction solutions across six specialist divisions.",
    },
    {
      label: "Expansion",
      title: "Industrial & Workshop Capabilities",
      description:
        "Expanded precision fabrication with CNC laser cutting, machining, and metal works to serve construction, oil & gas, and architectural clients — with facilities in Dammam and Jubail.",
    },
    {
      label: "Saudi Aramco",
      title: "Approved Supplier Registration",
      description:
        "Registered as Saudi Aramco Approved Vendor #10119021, validating commitment to quality, safety, and compliance on critical Kingdom infrastructure.",
    },
  ],
};

export const edgePage: EdgePageContent = {
  partnersIntro:
    "Delivering precision steel work for government, defence, energy, and infrastructure clients across the Kingdom of Saudi Arabia.",
  partners: [
    { name: "Ministry of Interior", logo: "/assets/logos/partners/ministry-of-interior.png" },
    { name: "Saudi National Guard", logo: "/assets/logos/partners/national-guard.png" },
    { name: "Siemens KSA", logo: "/assets/logos/partners/siemens.png" },
    { name: "Alfanar Projects", logo: "/assets/logos/partners/alfanar.png" },
    { name: "Riyadh Metro", logo: "/assets/logos/partners/riyadh-metro.png" },
    { name: "Jadah Development", logo: "/assets/logos/partners/jadah.png" },
    { name: "SAPCQ", logo: "/assets/logos/partners/sapcq.png" },
    { name: "Tarshid Energy", logo: "/assets/logos/partners/tarshid.png" },
  ],
  partnerStats: [
    { value: "SCA", label: "Certified Contractor" },
    { value: "VAT", label: "Registered" },
    { value: "SME", label: "Certified" },
    { value: "500+", label: "Projects Completed" },
  ],
  projectCategories: [
    "All Projects",
    "Structural",
    "Architectural",
    "Government",
    "Energy & Industrial",
    "Infrastructure",
  ],
  projects: [
    {
      title: "Ministry of Interior Regional Command Centre — Steel Framework",
      categories: ["Government", "Structural"],
      featured: true,
      summary:
        "Flagship structural steel delivery for a major government security infrastructure programme — representative of Edge Steel’s reach across Kingdom-scale projects.",
    },
    {
      title: "Commercial Tower Steel Framework",
      categories: ["Structural"],
      summary: "Structural steel for commercial tower construction.",
    },
    {
      title: "Decorative Metal Screens",
      categories: ["Architectural"],
      summary: "Precision architectural screens and decorative metalwork.",
    },
    {
      title: "Gold-Finish Façade Panels",
      categories: ["Laser Cutting", "Architectural"],
      summary: "CNC fiber laser façade panels with architectural finishes.",
    },
    {
      title: "Commercial Cladding",
      categories: ["Façade"],
      summary: "Commercial cladding packages for building envelopes.",
    },
  ],
  milestones: [
    {
      year: "2020",
      label: "Founded",
      title: "Edge Steel KSA launched in Riyadh",
      description:
        "Combining structural fabrication expertise with a precision-first delivery model for industrial and construction clients across the Kingdom.",
    },
    {
      year: "2021",
      label: "SCA Certification",
      title: "Saudi Contractors Authority certification",
      description:
        "Qualifying Edge Steel KSA for government-tier and defence-sector contract participation and reinforcing the compliance framework.",
    },
    {
      year: "2022",
      label: "Laser Division",
      title: "CNC fiber laser division commissioned",
      description:
        "Extending in-house capabilities to precision architectural panels, decorative façade screens, and tolerance-critical flat components.",
    },
    {
      year: "2023",
      label: "500+ Projects",
      title: "Crossed the 500-project threshold",
      description:
        "Confirming standing as a trusted fabrication partner across structural, architectural, and industrial applications throughout Saudi Arabia.",
    },
    {
      year: "2024",
      label: "Fleet Expansion",
      title: "Equipment rental fleet scaled",
      description:
        "Significant expansion of generators, excavators, cranes, forklifts, and welding machines to support full-service site operations for major contractors.",
    },
  ],
};

export const dammamPage: DammamPageContent = {
  mission: {
    eyebrow: "Mission",
    title: "Our Mission",
    paragraphs: [
      "Our mission is simple yet powerful: deliver precision, versatility, and outstanding customer service. Using state-of-the-art fiber lasers, CO₂ lasers, and CNC routers, we expertly handle various materials — including steel, stainless steel, aluminum, wood, acrylic, and plastics. Whether your project requires industrial-grade metal components, bespoke architectural designs, or intricate decorative pieces, our team ensures precise execution to your exact specifications.",
      "We proudly serve clients in construction, industrial manufacturing, oil & gas, automotive, aerospace, and interior design sectors. With every project, our focus remains on exceptional quality, rapid turnaround, and complete client satisfaction.",
    ],
  },
  services: [
    {
      title: "Fiber Laser Metal Cutting",
      description: "Steel, stainless steel, and aluminum cut with unmatched accuracy.",
    },
    {
      title: "CO₂ Laser Cutting and Engraving",
      description: "Wood, acrylic, and plastic creations for branding and décor.",
    },
    {
      title: "Advanced CNC Routing",
      description: "Complex 2D and 3D designs precisely machined for any application.",
    },
    {
      title: "Architectural Metal Works",
      description: "Decorative panels, stair railings, gates, and custom structural elements.",
    },
    {
      title: "Custom Industrial Parts",
      description: "End-to-end fabrication of industrial components to specification.",
    },
  ],
  industries: [
    { title: "Construction & Infrastructure" },
    { title: "Industrial Manufacturing" },
    { title: "Oil & Gas Sector" },
    { title: "Automotive & Aerospace" },
    { title: "Interior Design & Architecture" },
  ],
};

export const propipePage: PropipePageContent = {
  mission: {
    eyebrow: "Mission",
    title: "Our Mission",
    paragraphs: [
      "To provide quality fabrication, installation, and erection of structural steel and process equipment at competitive prices. ProPipe commits to excellence and value in structural solutions and machine-shop activities — delivering exceptional quality, predictable outcomes, and mutually beneficial relationships.",
      "Established in 2003, Pro Pipe International Contracting Co. has grown into a trusted provider of fabrication, engineering, civil, and industrial services in the Kingdom of Saudi Arabia. Managed by professionals with over 20 years of structural steel industry experience, the company supports oil & gas and industrial operations with on-site leak sealing, bolting, and portable machining that keep plants running without costly downtime.",
    ],
  },
  services: [
    {
      title: "Metal Fabrication & Engineering",
      description: "Metal structures created through cutting, bending, and assembling processes.",
    },
    {
      title: "Pipeline Services",
      description:
        "Industrial piping, pipeline fabrication, and mechanical general contracting from design to completion.",
    },
    {
      title: "Comprehensive Welding Services",
      description: "Premium welding using advanced processes including FCAW, SMAW, and more.",
    },
    {
      title: "Heat Exchanger Service",
      description:
        "Maintenance, performance testing, and repair for industrial heat exchangers.",
    },
    {
      title: "CNC & Manual Machining",
      description:
        "Tight-tolerance components from a fully equipped machine shop with specialized capabilities.",
    },
    {
      title: "Maintenance & Online Leak Repair",
      description:
        "Specialized online leak services for boilers, heaters, and power plants — plus hydraulic bolting and flange tools.",
    },
    {
      title: "Erection & Installation",
      description:
        "Erection and installation for pre-fabricated buildings and equipment, including PEB erection and structure dismantling.",
    },
    {
      title: "Water & Sewage Plants",
      description:
        "Maintenance and installation for water and sewage treatment facilities and water networks.",
    },
    {
      title: "CNC Laser Cutting",
      description: "High-precision CNC laser cutting and processing across multiple materials.",
    },
    {
      title: "Car Parking Shades",
      description:
        "Fabrication and installation of car parking shades for stability and long-term performance.",
    },
  ],
  industries: [
    { title: "Oil & Gas" },
    { title: "Power & Petrochemical" },
    { title: "Heavy Engineering" },
    { title: "Water & Sewage Infrastructure" },
  ],
};

export function getCompanyPageExtras(slug: CompanySlug) {
  switch (slug) {
    case "nexgen-build":
      return { kind: "nexgen" as const, data: nexgenPage };
    case "edge-steel":
      return { kind: "edge" as const, data: edgePage };
    case "dammam-laser":
      return { kind: "dammam" as const, data: dammamPage };
    case "pro-pipe":
      return { kind: "propipe" as const, data: propipePage };
  }
}
