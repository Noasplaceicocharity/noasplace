import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Summer Sensory Sessions | Noa's Place Halifax",
  description:
    "Free summer sensory sessions for neurodivergent children and families in Halifax. Ages 4–11. Every Thursday 30 July–27 August 2026 at Little Stars Family Hub. Book your place.",
  keywords:
    "summer sensory sessions Halifax, SEND play sessions Calderdale, neurodivergent children activities West Yorkshire, free sensory sessions Halifax, Little Stars Family Hub, Noa's Place summer events",
  openGraph: {
    title: "Summer Sensory Sessions | Noa's Place Halifax",
    description:
      "Free, sensory-informed sessions for neurodivergent children and families. Ages 4–11. Thursdays through summer 2026 at Little Stars Family Hub, Halifax.",
    url: "https://noasplace.org.uk/summer",
    type: "website",
  },
  alternates: {
    canonical: "https://noasplace.org.uk/summer",
  },
};

export default function SummerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
