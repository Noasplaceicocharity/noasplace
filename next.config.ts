import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/roundtablelive",
        destination:
          "https://www.eventbrite.com/e/send-reform-what-families-needs-to-know-right-now-tickets-1985103122878?utm-campaign=social&utm-content=attendeeshare&utm-medium=discovery&utm-term=listing&utm-source=cp&aff=ebdsshcopyurl",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-c8d04e15fd394bb18ba7c7e5f0129c6b.r2.dev',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.marblism.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
