import type { Metadata } from "next";

const PDF_BASE =
  "https://pub-c8d04e15fd394bb18ba7c7e5f0129c6b.r2.dev/Policies";

const POLICY_PDFS = [
  {
    label: "Code of conduct",
    href: `${PDF_BASE}/Code%20of%20Conduct%20-%20Noa%27s%20Place%20CIO.pdf`,
  },
  {
    label: "Financial Controls",
    href: `${PDF_BASE}/Financial%20Controls%20Policy%20(1).pdf`,
  },
  {
    label: "Whistleblowing",
    href: `${PDF_BASE}/Noa%27s%20Place%20CIO%20Whistleblowing%20Policy%20(1).pdf`,
  },
  {
    label: "Conflict of interest",
    href: `${PDF_BASE}/Noa%E2%80%99s%20Place%20CIO%20-%20Conflict%20of%20Interest%20Policy%20(1).pdf`,
  },
  {
    label: "Data protection",
    href: `${PDF_BASE}/Noa%E2%80%99s%20Place%20CIO%20-%20Data%20Protection%20%26%20Privacy%20Policy%20(1).pdf`,
  },
  {
    label: "Health and safety",
    href: `${PDF_BASE}/Noa%E2%80%99s%20Place%20CIO%20-%20Health%20%26%20Safety%20Policy%20(1).pdf`,
  },
  {
    label: "Reserves",
    href: `${PDF_BASE}/Noa%E2%80%99s%20Place%20CIO%20-%20Reserves%20Policy%20(1).pdf`,
  },
  {
    label: "Safeguarding",
    href: `${PDF_BASE}/Noa%E2%80%99s%20Place%20CIO%20-%20Safeguarding%20Policy%20(Children%20%26%20Adults%20at%20Risk)%20(2).pdf`,
  },
  {
    label: "Equality, diversity and inclusion (EDI)",
    href: `${PDF_BASE}/Noa%E2%80%99s%20Place%20-%20Equality%2C%20Diversity%20%26%20Inclusion%20Policy%20(1).pdf`,
  },
  {
    label: "Complaints and feedback",
    href: `${PDF_BASE}/Complaints%20%26%20Feedback%20Policy%20-%20Noa%27s%20Place%20CIO.pdf`,
  },
] as const;

export const metadata: Metadata = {
  title: "Policies | Noa's Place CIO",
  description:
    "Download Noa's Place CIO policies as PDFs — safeguarding, EDI, complaints, code of conduct, data protection, and more.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Policies | Noa's Place CIO",
    description:
      "Download Noa's Place CIO policies as PDFs — safeguarding, EDI, complaints, governance, and more.",
    url: "https://noasplace.org.uk/policies",
    type: "website",
  },
  alternates: {
    canonical: "https://noasplace.org.uk/policies",
  },
};

export default function PoliciesPage() {
  return (
    <main className="bg-background text-ink">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <h1 className="mb-4 text-4xl font-bold text-ink">Our policies</h1>
        <p className="mb-10 text-lg text-ink/80">
          Key governance and organisational policies are published here as PDF
          documents. Each link opens in a new tab.
        </p>
        <ul className="space-y-4">
          {POLICY_PDFS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-brand-800 underline decoration-brand-800/30 underline-offset-4 transition hover:text-brand-900 hover:decoration-brand-800"
              >
                {item.label}
                <span className="ml-2 text-sm font-normal text-ink/60">
                  (PDF)
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
