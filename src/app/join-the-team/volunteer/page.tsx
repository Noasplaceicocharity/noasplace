import Link from "next/link";
import VolunteerInterestForm from "@/components/VolunteerInterestForm";

export default function VolunteerPage() {
  return (
    <main className="bg-background py-10 text-ink sm:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/join-the-team"
          className="inline-flex items-center text-sm font-semibold text-brand-800 underline-offset-2 hover:underline"
        >
          Back to Join the Team
        </Link>

        <h1 className="mt-4 text-4xl font-black text-brand-900 sm:text-5xl">Volunteer with Us</h1>
        <p className="mt-4 max-w-3xl text-lg text-ink/85">
          Volunteering with Noa&apos;s Place is flexible and meaningful. From one-off events to
          regular sessions, volunteers help create welcoming spaces where SEND children, young people
          and families can thrive. We are always open to new volunteers.
        </p>

        <VolunteerInterestForm />
      </div>
    </main>
  );
}
