import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/join-the-team/trustees",
        destination: "/join-the-team",
        permanent: true,
      },
      {
        source: "/join-the-team/lead-roles",
        destination: "/join-the-team",
        permanent: true,
      },
      {
        source: "/join-the-team/trustees/:slug",
        destination: "/join-the-team/roles/:slug",
        permanent: true,
      },
      {
        source: "/join-the-team/lead-roles/:slug",
        destination: "/join-the-team/roles/:slug",
        permanent: true,
      },
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
      {
        protocol: 'https',
        hostname: 'assets-global.website-files.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'uploads-ssl.webflow.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
