import type { Metadata } from "next";
import Script from "next/script";
import { cookies } from "next/headers";
import CookieConsent from "@/components/CookieConsent";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BannerBar from "@/components/BannerBar";
import { getPublishedBannerBar } from "@/lib/notion";
import FacebookGroupPopup from "@/components/FacebookGroupPopup";
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
  title: "Noa's Place Halifax | SEND Support & Sensory Rooms West Yorkshire",
  description:
    "Noa's Place Halifax - Creating an inclusive community hub with sensory rooms, SEND support, and family services in West Yorkshire. Supporting neurodivergent children, adults & families.",
  keywords: "SEND support Halifax, sensory rooms West Yorkshire, neurodivergent support Calderdale, family support Halifax, children's charity West Yorkshire, autism support Halifax, ADHD support Yorkshire, inclusive community hub Halifax, special needs support Calderdale, disability services Halifax, family activities West Yorkshire, charity Halifax, sensory processing support Yorkshire",
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
    title: "Noa's Place Halifax | SEND Support & Sensory Rooms West Yorkshire",
    description: "Noa's Place Halifax - Creating an inclusive community hub with sensory rooms, SEND support, and family services in West Yorkshire. Supporting neurodivergent children, adults & families.",
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
  twitter: {
    card: 'summary_large_image',
    title: "Noa's Place Halifax | SEND Support & Sensory Rooms West Yorkshire",
    description: "Creating an inclusive community hub with sensory rooms, SEND support, and family services in Halifax, West Yorkshire.",
    images: ['/images/socialsharing.jpg'],
  },
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
  other: {
    'geo.region': 'GB-WYK',
    'geo.placename': 'Halifax, West Yorkshire',
    'geo.position': '53.7219;-1.8658',
    'ICBM': '53.7219, -1.8658',
    'og:region': 'West Yorkshire',
    'og:locality': 'Halifax',
    'og:postal-code': 'HX',
    'place:location:latitude': '53.7219',
    'place:location:longitude': '-1.8658',
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const hasAnalyticsConsent = cookieStore.get('analytics_consent')?.value === 'granted';
  const banner = await getPublishedBannerBar();

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
        {banner && <BannerBar banner={banner} />}
        <Header />
        {children}
        <Footer />
        <CookieConsent initiallyConsented={hasAnalyticsConsent} />
        <FacebookGroupPopup triggerPercent={10} />
      </body>
    </html>
  );
}
