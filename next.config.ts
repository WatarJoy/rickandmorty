import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: '/rick_and_morty',
  images: {
    domains: ["rickandmortyapi.com"],
  },
};

export default nextConfig;
