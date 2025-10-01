import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Noa's Place",
  description: "Learn about how Noa's Place uses cookies and similar technologies on our website in compliance with UK GDPR and PECR regulations.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiePolicy() {
  return (
    <main className="bg-background text-ink">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-ink mb-8">Cookies Policy</h1>
          
          <p className="text-lg text-ink/80 mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-GB', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>

          <p className="text-lg text-ink/80 mb-8">
            This Cookies Policy explains how Noa's Place CIO ("we", "our", "us") uses cookies and similar technologies on our website in compliance with the UK GDPR, the Data Protection Act 2018, and the Privacy and Electronic Communications Regulations (PECR).
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-ink mb-4">1. What are cookies?</h2>
            <p className="text-lg text-ink/80">
              Cookies are small text files stored on your device when you visit a website. They are widely used to make websites work, to improve efficiency, and to provide information to site owners.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-ink mb-4">2. Types of cookies we use</h2>
            <p className="text-lg text-ink/80 mb-4">
              We use the following categories of cookies:
            </p>
            
            <div className="space-y-4">
              <div className="bg-brand-50/50 p-6 rounded-lg border border-brand-200">
                <h3 className="text-xl font-semibold text-brand-800 mb-2">Strictly Necessary Cookies</h3>
                <p className="text-ink/80">
                  Required for the website to function properly (e.g., security, form submissions, accessibility). These cannot be turned off.
                </p>
              </div>
              
              <div className="bg-brand-50/50 p-6 rounded-lg border border-brand-200">
                <h3 className="text-xl font-semibold text-brand-800 mb-2">Performance & Analytics Cookies (Google Analytics)</h3>
                <p className="text-ink/80">
                  Help us understand how visitors use our website (for example, which pages are visited most often) so we can improve user experience.
                </p>
              </div>
              
              <div className="bg-brand-50/50 p-6 rounded-lg border border-brand-200">
                <h3 className="text-xl font-semibold text-brand-800 mb-2">Marketing & Advertising Cookies (Meta Pixel)</h3>
                <p className="text-ink/80">
                  Allow us to measure the effectiveness of our campaigns and deliver more relevant advertising on platforms such as Facebook and Instagram.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-ink mb-4">3. Legal basis for using cookies</h2>
            <p className="text-lg text-ink/80">
              For non-essential cookies (analytics and marketing), we rely on your consent. You can provide or withdraw your consent at any time using the cookie banner on our website. Essential cookies are always active, as they are necessary for the operation of the site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-ink mb-4">4. Managing your cookie preferences</h2>
            <p className="text-lg text-ink/80">
              You can manage or update your cookie preferences at any time through the cookie banner on our website. You may also disable cookies through your browser settings, but please note this may affect site functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-ink mb-4">5. Updates to this policy</h2>
            <p className="text-lg text-ink/80">
              We may update this Cookies Policy from time to time to reflect changes in law, technology, or our practices. Any updates will be posted on this page with a revised "last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-ink mb-4">6. Contact us</h2>
            <p className="text-lg text-ink/80 mb-4">
              If you have any questions about this policy or our use of cookies, please contact us at:
            </p>
            <div className="bg-brand-50/50 p-6 rounded-lg border border-brand-200">
              <p className="text-lg text-brand-800 font-semibold">
                📧 hello@noasplace.org.uk
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
