import { notFound } from "next/navigation";
import type { Metadata } from "next";
import VacancyDetail from "@/components/VacancyDetail";
import { getVacancyBySlug, vacancySummaryPlainForMeta } from "@/lib/vacancies-notion";

export const revalidate = 60;

type LeadRoleDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: LeadRoleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const vacancy = await getVacancyBySlug(slug);
  if (!vacancy || vacancy.roleType !== "Staff" || vacancy.status !== "Open") {
    return { title: "Role not found | Noa's Place" };
  }
  return {
    title: `${vacancy.title} | Lead Roles | Noa's Place`,
    description:
      vacancySummaryPlainForMeta(vacancy.shortDescription) || "Lead role opportunity at Noa's Place.",
  };
}

export default async function LeadRoleDetailPage({ params }: LeadRoleDetailPageProps) {
  const { slug } = await params;
  const vacancy = await getVacancyBySlug(slug);
  if (!vacancy || vacancy.status !== "Open" || vacancy.roleType !== "Staff") {
    notFound();
  }
  return <VacancyDetail vacancy={vacancy} />;
}
