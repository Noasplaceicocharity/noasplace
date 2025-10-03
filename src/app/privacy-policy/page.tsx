import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Noa's Place",
  description: "Learn about how Noa's Place collects, uses, and protects your personal data in compliance with UK GDPR and the Data Protection Act 2018.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="bg-background text-ink">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-ink mb-8">Privacy Policy</h1>
          
          <p className="text-lg text-ink/80 mb-8">
            <strong>Last updated:</strong> 1st January 2024
          </p>

          <p className="text-lg text-ink/80 mb-8">
            Noa's Place CIO ("we", "our", "us") is committed to protecting your personal data and respecting your privacy. This policy explains how we collect, use, and store your personal information in line with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-ink mb-4">1. Who we are</h2>
            <p className="text-lg text-ink/80 mb-4">
              We are Noa's Place CIO, a Charitable Incorporated Organisation registered in England and Wales. Our mission is to create an inclusive community hub for families, with a special focus on supporting neurodivergent children, young people, and adults.
            </p>
            <div className="bg-brand-50/50 p-6 rounded-lg border border-brand-200">
              <p className="text-lg text-brand-800 font-semibold">
                Contact us:<br />
                📧 hello@noasplace.org.uk
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-ink mb-4">2. Information we collect</h2>
            <p className="text-lg text-ink/80 mb-4">
              We may collect and process the following types of personal data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg text-ink/80 mb-4">
              <li>Contact details (name, email address, phone number, postal address)</li>
              <li>Supporter information (sign-ups, donations, Gift Aid declarations, event attendance, volunteering)</li>
              <li>Website usage data (via cookies and analytics tools such as Google Analytics and Meta Pixel)</li>
              <li>Communications (emails, messages, or feedback you provide to us)</li>
            </ul>
            <p className="text-lg text-ink/80">
              We will always collect the minimum amount of personal information necessary for our activities.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-ink mb-4">3. How we use your information</h2>
            <p className="text-lg text-ink/80 mb-4">
              We will only use your data where the law allows. Typically, we use your information to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg text-ink/80">
              <li>Keep you updated about Noa's Place and our activities (with your consent)</li>
              <li>Process donations, Gift Aid claims, or event registrations</li>
              <li>Manage volunteer and supporter relationships</li>
              <li>Improve our website and communications through analytics</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-ink mb-4">4. Our lawful bases for processing</h2>
            <p className="text-lg text-ink/80 mb-4">
              We rely on one or more of the following lawful bases under UK GDPR:
            </p>
            <div className="space-y-4">
              <div className="bg-brand-50/50 p-6 rounded-lg border border-brand-200">
                <h3 className="text-xl font-semibold text-brand-800 mb-2">Consent</h3>
                <p className="text-ink/80">where you have actively given permission (e.g., subscribing to our mailing list)</p>
              </div>
              <div className="bg-brand-50/50 p-6 rounded-lg border border-brand-200">
                <h3 className="text-xl font-semibold text-brand-800 mb-2">Contract</h3>
                <p className="text-ink/80">where processing is necessary to deliver a service or agreement you've entered into with us</p>
              </div>
              <div className="bg-brand-50/50 p-6 rounded-lg border border-brand-200">
                <h3 className="text-xl font-semibold text-brand-800 mb-2">Legal obligation</h3>
                <p className="text-ink/80">to meet our legal or regulatory duties (e.g., Gift Aid records)</p>
              </div>
              <div className="bg-brand-50/50 p-6 rounded-lg border border-brand-200">
                <h3 className="text-xl font-semibold text-brand-800 mb-2">Legitimate interests</h3>
                <p className="text-ink/80">for activities that are necessary to run and develop Noa's Place in a way that doesn't override your rights (e.g., improving communications)</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-ink mb-4">5. Who we share your data with</h2>
            <p className="text-lg text-ink/80 mb-4">
              We do not sell your data. We may share your information with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg text-ink/80 mb-4">
              <li>Service providers who help us run our website, communications, or fundraising (e.g., Mailchimp, web hosting providers)</li>
              <li>Regulators such as the Charity Commission or HMRC where legally required</li>
              <li>Event or campaign partners, only with your consent</li>
            </ul>
            <p className="text-lg text-ink/80">
              All third-party providers are required to comply with UK GDPR.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-ink mb-4">6. How long we keep your data</h2>
            <p className="text-lg text-ink/80 mb-4">
              We only keep personal data for as long as necessary:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg text-ink/80 mb-4">
              <li>Supporter records: up to 6 years after last contact (for Gift Aid/legal obligations)</li>
              <li>Mailing list subscriptions: until you unsubscribe</li>
              <li>Volunteer data: for the duration of involvement + 3 years</li>
            </ul>
            <p className="text-lg text-ink/80">
              After this, your data will be securely deleted or anonymised.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-ink mb-4">7. Your rights</h2>
            <p className="text-lg text-ink/80 mb-4">
              Under UK GDPR, you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg text-ink/80 mb-4">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate or incomplete data</li>
              <li>Request deletion of your data ("right to be forgotten")</li>
              <li>Withdraw consent at any time</li>
              <li>Object to or restrict processing in certain cases</li>
              <li>Request transfer of your data (data portability)</li>
            </ul>
            <p className="text-lg text-ink/80">
              To exercise your rights, please contact{" "}
              <a href="mailto:hello@noasplace.org.uk" className="text-brand-600 hover:text-brand-800 underline">
                hello@noasplace.org.uk
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-ink mb-4">8. Security of your data</h2>
            <p className="text-lg text-ink/80">
              We take appropriate technical and organisational measures to protect your data from loss, misuse, or unauthorised access.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-ink mb-4">9. Cookies and tracking</h2>
            <p className="text-lg text-ink/80">
              We use cookies and similar technologies (Google Analytics, Meta Pixel). For details, please see our{" "}
              <Link href="/cookie-policy" className="text-brand-600 hover:text-brand-800 underline">
                Cookies Policy
              </Link>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-ink mb-4">10. Changes to this policy</h2>
            <p className="text-lg text-ink/80">
              We may update this Privacy Policy from time to time. Any significant changes will be communicated on our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-ink mb-4">11. Complaints</h2>
            <p className="text-lg text-ink/80">
              If you have concerns about how we handle your data, please contact us. You also have the right to lodge a complaint with the Information Commissioner's Office (ICO):{" "}
              <a 
                href="https://www.ico.org.uk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-600 hover:text-brand-800 underline"
              >
                www.ico.org.uk
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
