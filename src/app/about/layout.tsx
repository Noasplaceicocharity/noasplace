import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Noa's Place Halifax | Our Story & Mission West Yorkshire",
  description: "Learn about Noa's Place Halifax - a community-led charity creating an inclusive hub for SEND families in West Yorkshire. Discover our story, vision, trustees & impact.",
  keywords: "about Noa's Place Halifax, SEND charity West Yorkshire, neurodivergent support charity Calderdale, family support organisation Halifax, children's charity trustees Yorkshire, inclusive community hub Halifax",
  openGraph: {
    title: "About Noa's Place Halifax | Our Story & Mission West Yorkshire",
    description: "Learn about Noa's Place Halifax - a community-led charity creating an inclusive hub for SEND families in West Yorkshire. Discover our story, vision, trustees & impact.",
    url: 'https://noasplace.org.uk/about',
    type: 'website',
  },
  alternates: {
    canonical: 'https://noasplace.org.uk/about'
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

