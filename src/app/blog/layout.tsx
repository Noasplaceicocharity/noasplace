import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Noa's Place",
  description: "Updates, stories, and resources from Noa's Place.",
  openGraph: {
    title: "Noa's Place Blog",
    description: "Updates, stories, and resources from Noa's Place.",
    type: "website",
  },
  alternates: { canonical: "https://noasplace.org.uk/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}


