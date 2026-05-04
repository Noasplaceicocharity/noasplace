import { notFound } from "next/navigation";
import type { Metadata } from "next";
import VacancyDetail from "@/components/VacancyDetail";
import { getVacancyBySlug, vacancySummaryPlainForMeta } from "@/lib/vacancies-notion";

export const revalidate = 60;

type VolunteerDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: VolunteerDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const vacancy = await getVacancyBySlug(slug);
  if (!vacancy || vacancy.roleType !== "Volunteer" || vacancy.status !== "Open") {
    return { title: "Role not found | Noa's Place" };
  }
  return {
    title: `${vacancy.title} | Volunteer with Us | Noa's Place`,
    description:
      vacancySummaryPlainForMeta(vacancy.shortDescription) || "Volunteer opportunity at Noa's Place.",
  };
}

export default async function VolunteerDetailPage({ params }: VolunteerDetailPageProps) {
  const { slug } = await params;
  const vacancy = await getVacancyBySlug(slug);
  if (!vacancy || vacancy.status !== "Open" || vacancy.roleType !== "Volunteer") {
    notFound();
  }
  return <VacancyDetail vacancy={vacancy} />;
}
