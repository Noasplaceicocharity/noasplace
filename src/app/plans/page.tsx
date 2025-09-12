"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ImageModal from "@/components/ImageModal";

export default function OurPlans() {
  const [selectedSpace, setSelectedSpace] = useState<{
    id: string;
    image: { src: string; alt: string };
    title: string;
    description: string;
    features: string[];
  } | null>(null);
  const spaces = [
    {
      id: "kids-sensory",
      image: {
        src: "/images/kids sensory rooms.jpg",
        alt: "Kids sensory room with soft play equipment and calming lights",
      },
      title: "Kids Sensory",
      description: "A safe, calming space designed specifically for children with sensory needs. Features include:",
      features: [
        "Soft play equipment and climbing frames",
        "Adjustable lighting and sound environments",
        "Tactile walls and interactive features",
        "Quiet corners for when it all gets too much",
      ],
    },
    {
      id: "adult-sensory",
      image: {
        src: "/images/adult sensory rooms.jpg",
        alt: "Adult sensory room designed for comfort and stimulation",
      },
      title: "Adult Sensory",
      description: "A dignified, age-appropriate space for adults to regulate, relax, and engage their senses:",
      features: [
        "Comfortable seating and relaxation areas",
        "Sensory equipment designed for adult users",
        "Customisable environment for individual needs",
        "Private spaces for one-to-one support",
      ],
    },
    {
      id: "indoor-playground",
      image: {
        src: "/images/all play.jpg",
        alt: "Indoor playground and soft play area",
      },
      title: "Indoor Playground",
      description: "An inclusive play space where children of all abilities can explore and have fun:",
      features: [
        "Accessible play equipment for all abilities",
        "Sensory-friendly zones and quiet areas",
        "Safe, padded surfaces throughout",
        "Adaptive equipment and support aids available",
      ],
    },
    {
      id: "event-spaces",
      image: {
        src: "/images/all in one rooms.jpg",
        alt: "Flexible event and activity spaces",
      },
      title: "Event Spaces",
      description: "Flexible spaces for community activities, workshops, and celebrations:",
      features: [
        "Adaptable rooms for various group sizes",
        "Fully accessible facilities and equipment",
        "Sensory-aware environment controls",
        "Perfect for classes, groups, and family events",
      ],
    },
    {
      id: "community-cafe",
      image: {
        src: "/images/cafe.jpg",
        alt: "Welcoming community café space",
      },
      title: "Cafe",
      description: "More than just a café – a welcoming hub where everyone belongs:",
      features: [
        "Sensory-friendly environment with quiet zones",
        "Accessible menus and dietary options",
        "Family-friendly seating and facilities",
        "Regular community events and meetups",
      ],
    },
    {
      id: "charity-shop",
      image: {
        src: "/images/charity shop.jpg",
        alt: "Our charity shop supporting the community",
      },
      title: "Charity Shop",
      description: "A sustainable way to support our community while finding treasures:",
      features: [
        "Quality pre-loved items at affordable prices",
        "Volunteer opportunities for all abilities",
        "Supported work experience placements",
        "Income generation to support our services",
      ],
    },
  ];

  return (
    <main className="bg-background text-ink">
      {/* Hero Section */}
      <section className="relative isolate min-h-[500px] overflow-hidden">
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
              Our Plans
            </h1>
            <p className="text-xl font-bold text-ink sm:text-2xl md:text-3xl mb-4">
              Building a hub where families thrive before crisis hits
            </p>
            <p className="text-lg text-ink/80 max-w-3xl mx-auto">
              We're creating an inclusive community space with sensory rooms, play areas, a welcoming café, and support groups — all designed to help families with additional needs flourish.
            </p>
          </div>
        </div>
      </section>

      {/* The Hub Concept Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl mb-6">
              The Hub Concept
            </h2>
            <p className="text-xl text-ink/80 max-w-4xl mx-auto">
              Imagine a place where every family with additional needs feels seen, supported, and understood. Where children and adults can explore, play, and grow in spaces designed just for them.
            </p>
          </div>

          {/* Hub Overview with Central Image */}
          <div className="relative mb-20">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl font-bold text-brand-800 mb-6">
                  A Safe Haven for Every Family
                </h3>
                <div className="space-y-4 text-lg text-ink/80">
                  <p>
                    <strong>Noa's Place won't just be a building — it will be a lifeline.</strong>
                  </p>
                  <p>
                    Our hub will bring together sensory rooms, play spaces, a community café, and support groups under one roof. Families will find respite, connection, and the tools they need to thrive.
                  </p>
                  <p className="font-medium text-brand-800">
                    No more waiting lists. No more feeling alone. Just immediate, understanding support when you need it most.
                  </p>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/noa_smiling_halifax_west_yorkshire.jpeg"
                  alt="Noa smiling - the inspiration behind our inclusive hub"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Spaces Grid */}
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-ink/80 mb-3">
            This is what we imagine Noa's Place will look like - a vibrant, inclusive space for everyone.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-center text-base text-brand-800 flex items-center justify-center gap-2 mb-12">
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 2H3v16h5v4l4-4h5l4-4V2zM12 7v4M12 15h.01" />
            </svg>
            Click any space to learn more about it
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {spaces.map((space) => (
              <button
                key={space.id}
                onClick={() => setSelectedSpace(space)}
                className="group relative aspect-[4/3] block overflow-hidden rounded-2xl bg-brand-50 lg:col-span-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-800 focus:ring-offset-2 transition duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <Image
                  src={space.image.src}
                  alt={space.image.alt}
                  width={600}
                  height={450}
                  className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
                    space.id === "event-spaces" ? "object-center scale-125 group-hover:scale-[1.35]" : ""
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-white group-hover:underline">
                    {space.title}
                  </span>
                  <span className="text-sm text-white/90 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm opacity-0 translate-y-2 transition duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    Click to learn more
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Modal */}
          {selectedSpace && (
            <ImageModal
              isOpen={true}
              onClose={() => setSelectedSpace(null)}
              image={selectedSpace.image}
              title={selectedSpace.title}
              description={selectedSpace.description}
              features={selectedSpace.features}
            />
          )}
        </div>
      </section>

      {/* Supporting Families Before Crisis Section */}
      <section className="bg-brand-50/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl mb-6">
              Support Before Crisis
            </h2>
            <p className="text-xl text-ink/80 max-w-4xl mx-auto">
              Early intervention changes everything. Our hub will be there from day one, not just when families reach breaking point.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="bg-white/80 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-brand-800 mb-3 flex items-center gap-3">
                  <div className="size-3 rounded-full bg-red-500" />
                  Current Reality
                </h3>
                <ul className="space-y-2 text-ink/80">
                  <li>• Families wait months for assessments</li>
                  <li>• Support only comes during crisis</li>
                  <li>• Parents feel isolated and overwhelmed</li>
                  <li>• Children miss critical development windows</li>
                </ul>
              </div>

              <div className="bg-white/80 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-brand-800 mb-3 flex items-center gap-3">
                  <div className="size-3 rounded-full bg-green-500" />
                  Our Approach
                </h3>
                <ul className="space-y-2 text-ink/80">
                  <li>• Immediate access to sensory support</li>
                  <li>• Early intervention and resources</li>
                  <li>• Connected community of understanding families</li>
                  <li>• Holistic support for the whole family</li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/family_photo_halifax_west_yorkshire.jpg"
                  alt="Families supporting each other - the community we're building"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Floating stats */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-lg border border-brand-100">
                <div className="text-center">
                  <div className="text-2xl font-black text-brand-800">1000s</div>
                  <div className="text-sm text-ink/70">Families already</div>
                  <div className="text-sm text-ink/70">showing support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Vision Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl mb-8">
            The Impact We'll Create
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            <div className="p-6">
              <div className="text-4xl font-black text-brand-800 mb-2">Every</div>
              <div className="text-sm text-ink/70">Family will feel welcomed</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-black text-brand-800 mb-2">Immediate</div>
              <div className="text-sm text-ink/70">Access when you need it</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-black text-brand-800 mb-2">0</div>
              <div className="text-sm text-ink/70">Waiting lists for support</div>
            </div>
          </div>

          <p className="text-xl text-brand-800 font-medium mb-8">
            Every family will know they belong. Every child will have space to grow. Every parent will find understanding.
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative bg-brand-50/30 py-24 overflow-hidden">
        {/* Background decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg className="absolute -right-12 top-12 h-32 w-32 rotate-12 text-[#6E3482]/20" viewBox="0 0 100 100" fill="currentColor">
            <path d="M70,35 C70,25 65,20 60,20 L40,20 C35,20 30,25 30,35 C30,40 25,45 20,45 C10,45 5,50 5,60 L5,80 C5,85 10,90 20,90 C25,90 30,95 30,100 C30,110 35,115 40,115 L60,115 C65,115 70,110 70,100 C70,95 75,90 80,90 C90,90 95,85 95,80 L95,60 C95,50 90,45 80,45 C75,45 70,40 70,35" />
          </svg>
          <div className="absolute left-1/4 top-1/3 size-6 rounded-full bg-[#40BFBF]/20" />
          <div className="absolute right-1/3 bottom-1/4 size-4 rounded-full bg-[#FFB800]/20" />
          <svg className="absolute left-1/3 bottom-1/3 h-12 w-12 rotate-[-15deg] text-[#FFB800]/20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2 L15,9 L22,9 L16,14 L18,21 L12,17 L6,21 L8,14 L2,9 L9,9 Z" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          {/* Signature Count Card */}
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-full border border-brand-100 shadow-sm mb-8">
            <div className="relative">
              <div className="bg-brand-50 rounded-full h-11 w-11 flex items-center justify-center">
                <span className="text-lg font-bold text-brand-800 tracking-tight">1000s</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-brand-200/50 rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-brand-800 font-semibold text-base">Supporters</span>
              <span className="text-brand-600 text-sm">joining our mission</span>
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl mb-6">
            Add Your Name to Show Your Support
          </h2>
          <p className="text-xl text-ink/80 mb-8 max-w-3xl mx-auto">
            Join thousands of families, professionals, and community members who believe every family deserves support before they reach crisis.
          </p>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-2xl mx-auto shadow-sm border border-brand-100">
            <p className="text-ink mb-4 font-medium">
              Your support helps us:
            </p>
            <div className="grid gap-3 sm:grid-cols-2 text-left text-ink/70">
              <div className="flex items-start gap-2">
                <div className="size-1.5 rounded-full bg-brand-600 mt-2 flex-shrink-0" />
                <span className="text-sm">Secure funding for the hub</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="size-1.5 rounded-full bg-brand-600 mt-2 flex-shrink-0" />
                <span className="text-sm">Show community demand to stakeholders</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="size-1.5 rounded-full bg-brand-600 mt-2 flex-shrink-0" />
                <span className="text-sm">Build momentum for our mission</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="size-1.5 rounded-full bg-brand-600 mt-2 flex-shrink-0" />
                <span className="text-sm">Create lasting change for families</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/#register-form"
              className="inline-flex items-center justify-center rounded-xl bg-[#FFB800] px-8 py-4 text-lg font-bold text-ink shadow-lg hover:bg-[#ffc533] hover:scale-105 transition duration-200"
            >
              Add Your Support Now
              <svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </Link>
            
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-xl border-2 border-brand-800 px-8 py-4 text-lg font-bold text-brand-800 hover:bg-brand-800 hover:text-white transition duration-200"
            >
              Learn More About Us
              <svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
