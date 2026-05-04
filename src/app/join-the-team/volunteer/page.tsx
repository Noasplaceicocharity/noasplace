import SectionLanding from "@/components/SectionLanding";
import { getVacanciesByType } from "@/lib/vacancies-notion";

export const revalidate = 60;

export default async function VolunteerPage() {
  const vacancies = await getVacanciesByType("Volunteer");

  return (
    <SectionLanding
      title="Volunteer with Us"
      intro="Volunteering with Noa's Place is flexible and meaningful. From one-off events to regular sessions, volunteers help create welcoming spaces where SEND children, young people and families can thrive."
      vacancies={vacancies}
      emptyLabel="No open volunteer opportunities right now. Register your interest at:"
    />
  );
}
