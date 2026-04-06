import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/experience/three_body_npe.pdf',
        destination: '/api/three-body-npe-pdf',
      },
    ];
  },
  reactCompiler: true,
};

export default nextConfig;
