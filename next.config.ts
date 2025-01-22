import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"]
  },
  images: {
    domains: ["i.imgur.com"]
  }
};

export default nextConfig;
