import SectionLanding from "@/components/SectionLanding";
import { getVacanciesByType } from "@/lib/vacancies-notion";

export const revalidate = 60;

export default async function LeadRolesPage() {
  const vacancies = await getVacanciesByType("Staff");

  return (
    <SectionLanding
      title="Lead Roles"
      introLead="Ready to step forward and take ownership?"
      intro={`Lead roles at Noa's Place are for people who want to lead the way. They can be paid or volunteer. You'll be a key part of a values-led team focused on practical, compassionate support. These aren't just "extra hands" roles; they're opportunities to shape our culture, drive our partnerships, and ensure SEND families in Halifax get the right help, right when they need it.`}
      vacancies={vacancies}
      emptyLabel="No open lead roles right now. Register your interest at:"
    />
  );
}
