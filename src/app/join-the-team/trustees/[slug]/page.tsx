import { notFound } from "next/navigation";
import type { Metadata } from "next";
import VacancyDetail from "@/components/VacancyDetail";
import { getVacancyBySlug, vacancySummaryPlainForMeta } from "@/lib/vacancies-notion";

export const revalidate = 60;

type TrusteeDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: TrusteeDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const vacancy = await getVacancyBySlug(slug);
  if (!vacancy || vacancy.roleType !== "Trustee" || vacancy.status !== "Open") {
    return { title: "Role not found | Noa's Place" };
  }
  return {
    title: `${vacancy.title} | Trustee Opportunities | Noa's Place`,
    description:
      vacancySummaryPlainForMeta(vacancy.shortDescription) || "Trustee opportunity at Noa's Place.",
  };
}

export default async function TrusteeDetailPage({ params }: TrusteeDetailPageProps) {
  const { slug } = await params;
  const vacancy = await getVacancyBySlug(slug);
  if (!vacancy || vacancy.status !== "Open" || vacancy.roleType !== "Trustee") {
    notFound();
  }
  return <VacancyDetail vacancy={vacancy} />;
}
