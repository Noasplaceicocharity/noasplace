import SectionLanding from "@/components/SectionLanding";
import { getVacanciesByType } from "@/lib/vacancies-notion";

export const revalidate = 60;

export default async function TrusteesPage() {
  const vacancies = await getVacanciesByType("Trustee");

  return (
    <SectionLanding
      title="Trustee Opportunities"
      intro="Trustees play a vital role at Noa's Place by setting strategic direction, supporting robust governance and helping us grow sustainable support for SEND families. We welcome people with lived or professional experience who can commit their time and judgement with care."
      vacancies={vacancies}
      emptyLabel="No open trustee positions right now. Register your interest at:"
    />
  );
}
