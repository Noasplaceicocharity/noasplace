import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Hub | Noa's Place | Our Vision for Halifax",
  description:
    "Discover the Noa's Place Hub we are building in Halifax, West Yorkshire: sensory rooms, inclusive play, a community café, event spaces, and more, designed with SEND families.",
  keywords:
    "Noa's Place hub Halifax, SEND community hub West Yorkshire, inclusive sensory space Calderdale, neurodivergent family hub, charity hub Halifax",
  openGraph: {
    title: "The Hub | Noa's Place | Our Vision for Halifax",
    description:
      "Our dream for a dedicated, sensory-aware community hub where neurodivergent and disabled people and their families can connect, belong, and thrive.",
    url: "https://noasplace.org.uk/the-hub",
    type: "website",
  },
  alternates: {
    canonical: "https://noasplace.org.uk/the-hub",
  },
};

export default function TheHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
