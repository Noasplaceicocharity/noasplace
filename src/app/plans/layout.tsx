import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Strategic Plan Halifax | 3-Year Vision Noa's Place West Yorkshire",
  description: "Discover Noa's Place strategic plan for Halifax - our 3-year vision for an inclusive hub with sensory rooms, café, play areas & SEND support groups in West Yorkshire.",
  keywords: "Noa's Place strategic plan Halifax, 3 year plan West Yorkshire, inclusive hub plans Calderdale, sensory rooms Halifax, SEND support strategy Yorkshire, community hub development Halifax",
  openGraph: {
    title: "Our Strategic Plan Halifax | 3-Year Vision Noa's Place West Yorkshire",
    description: "Discover Noa's Place strategic plan for Halifax - our 3-year vision for an inclusive hub with sensory rooms, café, play areas & SEND support groups in West Yorkshire.",
    url: 'https://noasplace.org.uk/plans',
    type: 'website',
  },
  alternates: {
    canonical: 'https://noasplace.org.uk/plans'
  },
};

export default function PlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
