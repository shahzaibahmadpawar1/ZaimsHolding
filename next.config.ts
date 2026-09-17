import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Node.js hosting (cPanel) — do not use `output: "export"`
  images: {
    // Avoid native `sharp` issues on many shared hosts
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/platforms", destination: "/companies", permanent: true },
      { source: "/services", destination: "/sectors", permanent: true },
      { source: "/resources", destination: "/news", permanent: true },
      { source: "/stakeholders", destination: "/investors", permanent: true },
    ];
  },
};

export default nextConfig;
