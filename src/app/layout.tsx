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
  title: "Noa's Place — A kinder world for kids | Donate today",
  description:
    "Noa's Place is a kids' charity creating safe spaces, warm meals, and joyful learning. Donate today to help children and families thrive.",
  icons: {
    icon: '/images/noas place logo.png',
    apple: '/images/noas place logo.png',
  },
  openGraph: {
    title: "Noa's Place",
    description: "No family should feel alone while they wait for support",
    images: [
      {
        url: '/images/socialsharing.jpg',
        width: 1200,
        height: 630,
        alt: "Noa's Place - Supporting families in need"
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Noa's Place",
    description: "No family should feel alone while they wait for support",
    images: ['/images/socialsharing.jpg']
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${inter.variable} antialiased bg-background text-foreground`}>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
