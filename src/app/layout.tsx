import type { Metadata } from "next";
import { Nunito, Inter } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-ui",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Noa's Place Halifax | Children's Charity & Family Support Centre West Yorkshire",
  description:
    "Noa's Place in Halifax, West Yorkshire is a leading children's charity providing safe spaces, warm meals, and family support services. Visit our welcoming centre for sensory rooms, SEND support, and community activities.",
  keywords: "children's charity Halifax, family support West Yorkshire, SEND support Halifax, sensory rooms Yorkshire, community centre Halifax, family activities West Yorkshire, charity donation Halifax",
  authors: [{ name: "Noa's Place" }],
  creator: "Noa's Place",
  publisher: "Noa's Place",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  category: "Non-profit Organization",
  icons: {
    icon: '/images/noas place logo.png',
    apple: '/images/noas place logo.png',
  },
  openGraph: {
    title: "Noa's Place - Halifax's Leading Children's Charity & Family Support Centre",
    description: "Supporting Halifax families with sensory rooms, SEND spaces, and community activities. No family should feel alone while they wait for support.",
    url: 'https://noasplace.org.uk',
    siteName: "Noa's Place",
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/images/socialsharing.jpg',
        width: 1200,
        height: 630,
        alt: "Noa's Place - Supporting families in Halifax, West Yorkshire"
      }
    ]
  },
  // Twitter card metadata will be added once social media accounts are set up
  alternates: {
    canonical: 'https://noasplace.org.uk'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Google verification will be added once Search Console is set up
  other: {
    'geo.region': 'GB-WYK',
    'geo.placename': 'Halifax, West Yorkshire',
    'og:region': 'West Yorkshire',
    'og:locality': 'Halifax'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NGO",
            "name": "Noa's Place",
            "description": "A children's charity and family support centre in Halifax, West Yorkshire, providing sensory rooms, SEND support, and community activities.",
            "url": "https://noasplace.org.uk",
            "logo": "https://noasplace.org.uk/images/noas place logo.png",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Halifax",
              "addressRegion": "West Yorkshire",
              "addressCountry": "GB"
            },
            "sameAs": [
              "https://www.facebook.com/NoasPlace",
              "https://www.linkedin.com/company/noas-place"
            ],
            "areaServed": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 53.7219,
                "longitude": -1.8658
              },
              "geoRadius": "20000"
            },
            "knowsAbout": [
              "Sensory Processing",
              "SEND Support",
              "Family Support",
              "Community Services",
              "Children's Charity",
              "Special Educational Needs"
            ],
            "keywords": "children's charity Halifax, family support West Yorkshire, SEND support Halifax, sensory rooms Yorkshire, community centre Halifax",
            "serviceType": [
              "Sensory Rooms",
              "SEND Support",
              "Family Support",
              "Community Activities",
              "Charity Shop",
              "Community Café"
            ]
          })}
        </script>
      </head>
      <body className={`${nunito.variable} ${inter.variable} antialiased bg-background text-foreground`}>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
