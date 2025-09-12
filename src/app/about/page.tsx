import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Noa's Place",
  description: "Learn about Noa's Place - a community-led project creating a safe, inclusive hub for children, adults, and families with additional needs in Halifax, West Yorkshire.",
  openGraph: {
    title: "About Us | Noa's Place",
    description: "Learn about Noa's Place - a community-led project creating a safe, inclusive hub for children, adults, and families with additional needs in Halifax, West Yorkshire.",
  },
};

export default function AboutUs() {
  return (
    <main className="bg-background text-ink">
      {/* Hero Section */}
      <section className="relative isolate min-h-[400px] overflow-hidden">
        {/* Background decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Top left puzzle piece */}
          <svg className="absolute -left-12 top-12 h-32 w-32 rotate-[-12deg] text-[#6E3482]/40" viewBox="0 0 100 100" fill="currentColor">
            <path d="M70,35 C70,25 65,20 60,20 L40,20 C35,20 30,25 30,35 C30,40 25,45 20,45 C10,45 5,50 5,60 L5,80 C5,85 10,90 20,90 C25,90 30,95 30,100 C30,110 35,115 40,115 L60,115 C65,115 70,110 70,100 C70,95 75,90 80,90 C90,90 95,85 95,80 L95,60 C95,50 90,45 80,45 C75,45 70,40 70,35" />
          </svg>
          {/* Top right infinity */}
          <svg className="absolute -right-12 top-20 h-28 w-44 rotate-12 text-[#40BFBF]/40" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="8">
            <path d="M30,25 C30,15 35,10 45,10 C55,10 60,15 60,25 C60,35 55,40 45,40 C35,40 30,35 30,25 M70,25 C70,15 75,10 85,10 C95,10 100,15 100,25 C100,35 95,40 85,40 C75,40 70,35 70,25" />
          </svg>
          {/* Bottom left squiggle */}
          <svg className="absolute -left-8 bottom-32 h-24 w-44 text-[#FFB800]/40" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="6">
            <path d="M0,15 Q25,0 50,15 T100,15" strokeLinecap="round" />
          </svg>
          {/* Scattered dots */}
          <div className="absolute right-1/4 top-1/4 size-6 rounded-full bg-[#6E3482]/30" />
          <div className="absolute left-1/3 bottom-1/3 size-5 rounded-full bg-[#40BFBF]/40" />
          <div className="absolute right-1/3 top-2/3 size-4 rounded-full bg-[#FFB800]/30" />
          {/* Stars */}
          <svg className="absolute right-1/4 bottom-1/4 h-12 w-12 rotate-12 text-[#FFB800]/40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2 L15,9 L22,9 L16,14 L18,21 L12,17 L6,21 L8,14 L2,9 L9,9 Z" />
          </svg>
          <svg className="absolute left-1/3 top-1/3 h-10 w-10 -rotate-12 text-[#6E3482]/30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2 L15,9 L22,9 L16,14 L18,21 L12,17 L6,21 L8,14 L2,9 L9,9 Z" />
          </svg>
        </div>

         <div className="relative px-6 pt-16 pb-8 sm:pt-20 sm:pb-12">
           <div className="mx-auto max-w-4xl text-center">
             <h1 className="text-4xl font-black text-brand-800 sm:text-5xl md:text-6xl mb-6">
               About Us
             </h1>
             <p className="text-xl font-bold text-ink sm:text-2xl">
               No family should have to reach crisis before they get support.
             </p>
           </div>
         </div>
       </section>

       {/* Our Story Section */}
       <section id="our-story" className="bg-white pt-8 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center mb-16">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/family_photo_halifax_west_yorkshire.jpg"
                alt="Our family together, showing the love and connection that inspired Noa's Place"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-brand-800 sm:text-4xl">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-ink/80">
                <p>
                  <strong>Noa's Place is a new community-led project inspired by our little boy, Noa.</strong>
                </p>
                <p>
                  Noa has complex sensory and developmental needs — and like so many families, we found ourselves navigating long NHS waiting lists, confusing systems, and feeling completely alone while trying to cope.
                </p>
                <p className="font-medium text-brand-800">
                  We don't want any other family to go through what we did.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Vision Section */}
       <section id="our-vision" className="bg-brand-50/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl mb-6">
              Our Vision
            </h2>
            <p className="text-xl text-ink/80 max-w-4xl mx-auto">
              Noa's Place will be a safe, inclusive hub where children, adults, and families with additional needs can:
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <div className="text-center p-6 bg-white/80 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-brand-800 mb-2">Sensory Rooms & Quiet Spaces</h3>
              <p className="text-ink/80">Explore specially designed sensory environments and peaceful areas for regulation and calm.</p>
            </div>
            
            <div className="text-center p-6 bg-white/80 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-brand-800 mb-2">Accessible Indoor Play</h3>
              <p className="text-ink/80">Enjoy an inclusive play area where children of all abilities can explore and have fun together.</p>
            </div>
            
            <div className="text-center p-6 bg-white/80 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-brand-800 mb-2">Community Café</h3>
              <p className="text-ink/80">Find calm and connection in our welcoming café space for parents and carers.</p>
            </div>
            
            <div className="text-center p-6 bg-white/80 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-brand-800 mb-2">Support Groups & Workshops</h3>
              <p className="text-ink/80">Join peer networks, attend workshops, and connect with other families who understand.</p>
            </div>
            
            <div className="text-center p-6 bg-white/80 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-brand-800 mb-2">Resources & Guidance</h3>
              <p className="text-ink/80">Access helpful resources and support before reaching crisis point.</p>
            </div>
            
            <div className="text-center p-6 bg-white/80 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-brand-800 mb-2">A Place to Belong</h3>
              <p className="text-ink/80">Know that you are seen, supported, and never alone in your journey.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-xl font-medium text-brand-800">
              We want families to know they are seen, supported, and not alone.
            </p>
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
                Why It Matters
              </h2>
              <div className="space-y-4 text-lg text-ink/80">
                <p><strong>Across the UK, families are facing:</strong></p>
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="text-brand-800 font-bold mt-1">•</span>
                    <span>Long waiting lists for assessments and support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-800 font-bold mt-1">•</span>
                    <span>Isolation and carer burnout</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-800 font-bold mt-1">•</span>
                    <span>Limited help until things reach breaking point</span>
                  </li>
                </ul>
                <div className="pt-4 space-y-4">
                  <p className="text-xl font-bold text-brand-800">
                    Early, holistic support changes everything.
                  </p>
                  <p>
                    It prevents trauma, reduces crisis intervention, and helps families thrive — not just survive.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/noa_smiling_halifax_west_yorkshire.jpeg"
                alt="Noa smiling, showing his beautiful spirit that inspired Noa's Place"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

       {/* Trustee Section */}
       <section id="trustees" className="bg-brand-50/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl">
              Meet Our Trustees
            </h2>
            <p className="mt-6 text-lg text-ink/80 max-w-3xl mx-auto">
              Our dedicated board of trustees brings together diverse expertise and shared passion for supporting families with additional needs.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            <div className="text-center">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 mx-auto max-w-[200px]">
                <Image
                  src="/images/trustees/Laura_Maroney_trustee_noas_place_halifax_west_yorkshire.jpg"
                  alt="Laura Maroney - Trustee"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold text-brand-800 text-lg">Laura Maroney</h3>
              <p className="text-ink/80 text-sm mt-2 max-w-sm mx-auto">
                With years of experience in neurodiversity and inclusion, Laura is passionate about ensuring every child and family feels included, supported, and empowered.
              </p>
            </div>

            <div className="text-center">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 mx-auto max-w-[200px]">
                <Image
                  src="/images/trustees/Mathew_Atkinson_trustee_noas_place_halifax_west_yorkshire.jpg"
                  alt="Mathew Atkinson - Trustee"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold text-brand-800 text-lg">Mathew Atkinson</h3>
              <p className="text-ink/80 text-sm mt-2 max-w-sm mx-auto">
                Chief Executive Officer of The Priestley Academy Trust, serving over 2,500 children. A father of two, Mathew brings education leadership and strategic governance experience.
              </p>
            </div>

            <div className="text-center">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 mx-auto max-w-[200px]">
                <Image
                  src="/images/trustees/Megan_Taylor_trustee_noas_place_halifax_west_yorkshire.jpg"
                  alt="Megan Taylor - Trustee"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold text-brand-800 text-lg">Megan Taylor</h3>
              <p className="text-ink/80 text-sm mt-2 max-w-sm mx-auto">
                A neurodiverse parent of two neurodiverse children with expertise in academic research, marketing, and funding. Megan understands first-hand the challenges families face navigating SEN support.
              </p>
            </div>

            <div className="text-center">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 mx-auto max-w-[200px]">
                <Image
                  src="/images/trustees/Nicole_Owen_trustee_noas_place_halifax_west_yorkshire.jpg"
                  alt="Nicole Owen - Trustee"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold text-brand-800 text-lg">Nicole Owen</h3>
              <p className="text-ink/80 text-sm mt-2 max-w-sm mx-auto">
                Chartered Accountant and Head of Finance with expertise in commercial strategy and operations. As a mum to a two-year-old, Nicole is passionate about creating inclusive spaces where every child can thrive.
              </p>
            </div>

            <div className="text-center">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 mx-auto max-w-[200px]">
                <Image
                  src="/images/trustees/Sophia_Bentley_trustee_noas_place_halifax_west_yorkshire.jpg"
                  alt="Sophia Bentley - Trustee"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold text-brand-800 text-lg">Dr. Sophia Bentley</h3>
              <p className="text-ink/80 text-sm mt-2 max-w-sm mx-auto">
                Educational and Child Psychologist and founder of Find A Way CIC. As a mum of two, Sophia combines professional expertise with personal understanding, always keeping families at the centre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl mb-8">
            Join Our Mission
          </h2>
          <p className="text-lg text-ink/80 mb-8">
            Together, we can create a community where every family feels supported, seen, and valued.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/#register-form"
              className="inline-flex items-center justify-center rounded-xl bg-[#FFB800] px-8 py-4 text-lg font-bold text-ink shadow-lg hover:bg-[#ffc533] hover:scale-105 transition duration-200"
            >
              Support Our Vision
              <svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <a
              href="mailto:hello@noasplace.org.uk"
              className="inline-flex items-center justify-center rounded-xl border-2 border-brand-800 px-8 py-4 text-lg font-bold text-brand-800 hover:bg-brand-800 hover:text-white transition duration-200"
            >
              Get in Touch
              <svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16v16H4z"/>
                <path d="m22 6-10 7L2 6"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
