import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: "https",
              hostname: "pub-c3ec2fd741d449b6a04e144fa97c144b.r2.dev",
          },
      ],
  },
};

export default nextConfig;
