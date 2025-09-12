import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Plans | Noa's Place",
  description: "Discover our vision for an inclusive community hub with sensory rooms, café, play areas, and support groups. See how we'll support families before crisis hits.",
  openGraph: {
    title: "Our Plans | Noa's Place",
    description: "Discover our vision for an inclusive community hub with sensory rooms, café, play areas, and support groups. See how we'll support families before crisis hits.",
  },
};

export default function PlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
