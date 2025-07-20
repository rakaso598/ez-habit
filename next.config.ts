import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PWA 최적화
  experimental: {
    optimizePackageImports: ["react", "react-dom"],
  },
  // 이미지 최적화
  images: {
    formats: ["image/webp", "image/avif"],
  },
  // 압축 설정
  compress: true,
  // PWA 관련 헤더
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
