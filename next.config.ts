import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: '/rickandmorty',
  images: {
    domains: ["rickandmortyapi.com"],
  },
};

export default nextConfig;
