// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    disableStaticImages: true, // Add this line to disable static image imports
  },
};

export default nextConfig;