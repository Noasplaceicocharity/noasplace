import type { Metadata } from "next";
import Script from "next/script";
import { cookies } from "next/headers";
import CookieConsent from "@/components/CookieConsent";
import Header from "@/components/Header";
import { Nunito, Inter } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";
import "../styles/notion.css";

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
  title: "Noa's Place | A Safe, Inclusive Hub for SEND Families",
  description:
    "Noa's Place is a new community project creating a safe, inclusive hub with sensory rooms, play spaces, and support for children, adults, and families with additional needs.",
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
    title: "Noa's Place | A Safe, Inclusive Hub for SEND Families",
    description: "Noa's Place will be a warm, inclusive hub for children, adults, and families with additional needs. With sensory rooms, play spaces, a calm café, and support groups. No family should have to reach crisis before they get support.",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const hasAnalyticsConsent = cookieStore.get('analytics_consent')?.value === 'granted';
  return (
    <html lang="en">
      <head>
        {hasAnalyticsConsent && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1086670053658224');
fbq('track', 'PageView');
              `}
            </Script>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-44FQT7M8RH"
              strategy="afterInteractive"
            />
            <Script id="ga-gtag" strategy="afterInteractive">
              {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);} 
  gtag('js', new Date());

  gtag('config', 'G-44FQT7M8RH');
              `}
            </Script>
          </>
        )}
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
        {hasAnalyticsConsent && (
          <noscript
            dangerouslySetInnerHTML={{
              __html:
                '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1086670053658224&ev=PageView&noscript=1" />',
            }}
          />
        )}
        <ScrollToTop />
        <Header />
        {children}
        <CookieConsent initiallyConsented={hasAnalyticsConsent} />
      </body>
    </html>
  );
}
