import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
