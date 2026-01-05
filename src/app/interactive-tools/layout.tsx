import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Tools | Noa's Place Halifax - SEND Support Resources",
  description: "Free interactive tools for SEND families in Halifax & West Yorkshire. Create profiles, transition plans, sensory assessments & coping strategies for children, teens & adults.",
  keywords: "SEND interactive tools Halifax, neurodivergent support tools West Yorkshire, sensory profile tools Calderdale, transition planning Halifax, autism support tools Yorkshire, ADHD resources Halifax, family support tools West Yorkshire, SEND assessment tools Calderdale",
  openGraph: {
    title: "Interactive Tools | Noa's Place Halifax - SEND Support Resources",
    description: "Free interactive tools for SEND families in Halifax & West Yorkshire. Create profiles, transition plans, sensory assessments & coping strategies for children, teens & adults.",
    url: 'https://noasplace.org.uk/interactive-tools',
    type: 'website',
  },
  alternates: {
    canonical: 'https://noasplace.org.uk/interactive-tools'
  },
};

export default function InteractiveToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
