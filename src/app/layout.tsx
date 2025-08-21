import type { Metadata } from "next";
import { Nunito, Inter } from "next/font/google";
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
  title: "Noa’s Place — A kinder world for kids | Donate today",
  description:
    "Noa’s Place is a kids’ charity creating safe spaces, warm meals, and joyful learning. Donate today to help children and families thrive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${inter.variable} antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
