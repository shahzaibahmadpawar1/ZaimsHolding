import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export → `out/` after `npm run build`
  output: "export",
  // Folder-style URLs (`/about/index.html`) work better on Apache/cPanel static hosts
  trailingSlash: true,
  images: {
    // Required for static export (no image optimization server)
    unoptimized: true,
  },
};

export default nextConfig;
