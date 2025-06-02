import type { NextConfig } from "next";

<<<<<<< HEAD
const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)$/,
  options: {
    // THIS enables frontmatter as named exports:
    frontmatter: true,
  },
});

const nextConfig: NextConfig = withMDX({
  experimental: {
    // ppr: true,
    // reactCompiler: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/a/09ir0bgwfb/**",
      },
    ],
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});
=======
const nextConfig: NextConfig = {
  /* config options here */
};
>>>>>>> origin/migration

export default nextConfig;
