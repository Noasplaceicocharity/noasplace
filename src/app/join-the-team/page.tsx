import Link from "next/link";
import AlwaysOpenVolunteerCard from "@/components/AlwaysOpenVolunteerCard";
import RoleCard from "@/components/RoleCard";
import { getOpenRoles } from "@/lib/roles";

export const revalidate = 60;

export default async function JoinTheTeamPage() {
  const openRoles = await getOpenRoles();

  return (
    <main className="bg-background py-10 text-ink sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-brand-900 sm:text-5xl">Join the Team</h1>
        <p className="mt-5 max-w-3xl text-lg text-ink/85">
          At Noa&apos;s Place, every role helps children and families in the SEND community feel seen,
          supported and included. Whether you bring strategic leadership, professional expertise or time
          to volunteer, your contribution can make a lasting difference.
        </p>

        <p className="mt-6">
          <Link
            href="/join-the-team/volunteer"
            className="font-semibold text-brand-800 underline-offset-2 hover:underline"
          >
            Interested in volunteering? Register your interest →
          </Link>
        </p>

        <section className="mt-16" aria-labelledby="open-opportunities-heading">
          <h2 id="open-opportunities-heading" className="text-3xl font-bold text-brand-900">
            Open opportunities
          </h2>
          {openRoles.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {openRoles.map((role) => (
                <RoleCard key={role.id} role={role} />
              ))}
              <AlwaysOpenVolunteerCard />
            </div>
          ) : (
            <div className="mt-8">
              <p className="text-ink/85">
                We don&apos;t have any open opportunities right now. Check back soon, or register your
                interest as a volunteer.
              </p>
              <div className="mt-6 max-w-xl">
                <AlwaysOpenVolunteerCard />
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
