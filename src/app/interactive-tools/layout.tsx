import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Tools | Noa's Place | Resources for SEND Families",
  description: "Helpful interactive tools and resources for children, teens, and families with additional needs in Halifax, West Yorkshire.",
  keywords: "SEND resources Halifax, interactive tools children, safety plan builder, bullying prevention, family support tools",
  openGraph: {
    title: "Interactive Tools | Noa's Place",
    description: "Helpful interactive tools and resources for children, teens, and families with additional needs.",
    url: 'https://noasplace.org.uk/interactive-tools',
  }
};

export default function InteractiveToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
