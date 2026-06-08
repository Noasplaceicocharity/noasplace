import { notFound } from "next/navigation";
import type { Metadata } from "next";
import RoleDetail from "@/components/RoleDetail";
import { getRoleBySlug, roleSummaryPlainForMeta } from "@/lib/roles";

export const revalidate = 60;

type RoleDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: RoleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const role = await getRoleBySlug(slug);
  if (!role) {
    return { title: "Role not found | Noa's Place" };
  }
  return {
    title: `${role.roleName} | Join the Team | Noa's Place`,
    description:
      roleSummaryPlainForMeta(role.shortDescription) || "Opportunity at Noa's Place.",
  };
}

export default async function RoleDetailPage({ params }: RoleDetailPageProps) {
  const { slug } = await params;
  const role = await getRoleBySlug(slug);
  if (!role) {
    notFound();
  }
  return <RoleDetail role={role} />;
}
