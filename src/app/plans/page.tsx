"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import ImageModal from "@/components/ImageModal";
import { AnimatedScrollSection } from "@/components/AnimatedScrollSection";
import MailchimpSubscribeForm from "@/components/MailchimpSubscribeForm";

export default function OurPlans() {
  const [selectedSpace, setSelectedSpace] = useState<{
    id: string;
    image: { src: string; alt: string };
    title: string;
    description: string;
    features: string[];
  } | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [expandedPriority, setExpandedPriority] = useState<number | null>(null);
  const [showMailchimpPopup, setShowMailchimpPopup] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (showMailchimpPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMailchimpPopup]);
  const spaces = [
    {
      id: "kids-sensory",
      image: {
        src: "/dreamboard/Kids_sensory.jpg",
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
        src: "/dreamboard/adult_sensory.jpg",
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
        src: "/dreamboard/indoor_playground.jpg",
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
        src: "/dreamboard/event_spaces.jpg",
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
        src: "/dreamboard/cafe_space.jpg",
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
        src: "/dreamboard/charity_shop.jpg",
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
      <section className="relative min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_background.png"
            alt=""
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/70"></div>
        </div>

        {/* Decorative background elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative px-6 pt-24 pb-16 sm:pt-32 sm:pb-20 z-20">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-black text-brand-800 sm:text-5xl md:text-6xl mb-6 leading-tight">
              Our Strategic Plan
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-ink mb-4 leading-relaxed">
              A clear roadmap for the next three years
            </p>
            <p className="text-lg sm:text-xl text-ink/80 max-w-3xl mx-auto leading-relaxed">
              Our strategic plan outlines how we'll create an inclusive hub where neurodivergent and disabled individuals and families find understanding, connection, and community.
            </p>
          </div>
        </div>
      </section>


      {/* Strategic Priorities Section */}
      <AnimatedScrollSection>
        <section className="relative bg-gradient-to-b from-white via-brand-50/30 to-white py-24 overflow-x-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent"></div>
          
          {/* Strategy Road Image - Far Left Side, Full Height */}
          <div
            className="absolute top-0 bottom-0 left-0 w-[400px] lg:w-[500px] xl:w-[600px] hidden lg:block z-0"
            style={{ left: 0, marginLeft: 0 }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/plans/strategy road.png"
                alt="Strategic roadmap illustration"
                fill
                className="object-contain"
                style={{ objectPosition: 'left top' }}
                sizes="(max-width: 1024px) 400px, (max-width: 1280px) 500px, 600px"
              />
            </div>
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:pl-[550px] xl:pl-[650px]">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-3xl font-extrabold text-brand-800 sm:text-4xl md:text-5xl mb-6 tracking-tight"
              >
                Strategic Priorities for the Next 3 Years
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="text-xl text-ink/80 max-w-4xl mx-auto"
              >
                Our four strategic priorities will guide our work through 2029.
              </motion.p>
            </div>

            <div className="space-y-4">
              {[
                {
                  number: 1,
                  title: "Create an inclusive hub",
                  icon: "/images/plans/Create an Inclusive Hub.png",
                  description: "We will establish Noa's Place in a dedicated facility that serves as a safe, calm and inclusive place for families to come together.",
                  objectives: [
                    { title: "1.1 Strategic Plan", description: "Create a clear plan that guides our work and priorities." },
                    { title: "1.2 Secure Funding", description: "Raise funds to open and operate our own hub space." },
                    { title: "1.3 Physical Facility", description: "Find and set up a welcoming building for families." },
                  ]
                },
                {
                  number: 2,
                  title: "Provide opportunities that bring families together",
                  icon: "/images/plans/Provide opportunities that bring families together.png",
                  description: "We will develop resources and deliver programmes that create meaningful connection and a sense of belonging.",
                  objectives: [
                    { title: "2.1 Develop Resources", description: "Create simple resources to support families in daily life." },
                    { title: "2.2 Programme Delivery", description: "Offer groups, sessions and activities once the Hub is open." },
                  ]
                },
                {
                  number: 3,
                  title: "Build strong relationships with families and partners",
                  icon: "/images/plans/Build strong relationships with families and partners.png",
                  description: "We will involve families in shaping our work and develop collaborative partnerships with local organisations.",
                  objectives: [
                    { title: "3.1 Family Involvement", description: "Involve families in shaping what we do and how we do it." },
                    { title: "3.2 Collaborative Partnerships", description: "Work alongside schools, services, local authority teams, community organisations, businesses and local leaders." },
                  ]
                },
                {
                  number: 4,
                  title: "Ensure the hub is sustainable for the future",
                  icon: "/images/plans/Ensure the hub is sustainable for the future.png",
                  description: "We will establish strong foundations with clear governance, financial sustainability, and an inclusive staff community.",
                  objectives: [
                    { title: "4.1 Charity Status", description: "Complete steps to become a registered charity with a professional board." },
                    { title: "4.2 Financial Sustainability", description: "Follow charity regulations, keep clear accounts, and maintain up-to-date policies." },
                    { title: "4.3 Professional Operations", description: "Put clear policies in place and establish regular governance rhythm." },
                    { title: "4.4 Inclusive Staff Community", description: "Develop a supportive volunteer and staff team, including meaningful work opportunities for SEND individuals." },
                  ]
                },
              ].map((priority, index) => {
                const isExpanded = expandedPriority === priority.number;
                return (
                  <motion.div
                    key={priority.number}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                    className="group relative rounded-2xl bg-gradient-to-br from-white via-brand-50/50 to-white backdrop-blur-sm border-2 border-brand-100/30 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedPriority(isExpanded ? null : priority.number)}
                      className="w-full flex items-center gap-6 p-6 lg:p-8 text-left"
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-brand-300/20 to-transparent rounded-bl-full"></div>
                      <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-brand-200/20 to-transparent rounded-tr-full"></div>
                      
                      <div className="relative z-10 flex items-center gap-6 w-full">
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="relative size-16 lg:size-20 flex-shrink-0"
                        >
                          <Image
                            src={priority.icon}
                            alt={priority.title}
                            fill
                            className="object-contain"
                          />
                        </motion.div>
                        <h3 className="text-lg lg:text-xl xl:text-2xl font-bold text-brand-800 leading-snug flex-1">
                          {priority.title}
                        </h3>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <svg className="size-6 text-brand-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.div>
                      </div>
                    </button>
                    
                    <motion.div
                      initial={false}
                      animate={{ height: isExpanded ? "auto" : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 lg:px-8 pb-6 lg:pb-8 pt-0">
                        <div className="pt-4 border-t border-brand-100">
                          <p className="text-ink/80 mb-6 leading-relaxed">
                            {priority.description}
                          </p>
                          <div className="space-y-4">
                            {priority.objectives.map((obj, objIndex) => (
                              <motion.div
                                key={objIndex}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
                                transition={{ duration: 0.3, delay: objIndex * 0.05 }}
                                className="border-l-4 border-brand-800 pl-4"
                              >
                                <h4 className="font-semibold text-ink mb-1">{obj.title}</h4>
                                <p className="text-sm text-ink/70">{obj.description}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedScrollSection>

      {/* 3-Year Roadmap Section */}
      <AnimatedScrollSection>
        <section className="bg-gradient-to-b from-white via-brand-50/30 to-white py-24 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent"></div>
          <div className="mx-auto max-w-7xl px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-extrabold text-brand-800 sm:text-4xl md:text-5xl mb-6 tracking-tight">
                Our 3-Year Roadmap
              </h2>
              <p className="text-xl text-ink/80 max-w-4xl mx-auto leading-relaxed">
                Here's our journey over the next three years as we work towards creating an inclusive hub for every family.
              </p>
            </motion.div>

            {/* Interactive Year Tabs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex flex-wrap justify-center gap-4">
                {[1, 2, 3].map((year) => (
                  <motion.button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      selectedYear === year
                        ? "bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-lg"
                        : "bg-white/80 backdrop-blur-sm border-2 border-brand-100 text-brand-800 hover:bg-brand-50 hover:border-brand-200"
                    }`}
                  >
                    Year {year}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Roadmap Content */}
            <motion.div
              key={selectedYear}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-white via-brand-50/50 to-white rounded-3xl p-8 shadow-lg border-2 border-brand-100/30"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="size-16 rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-white flex items-center justify-center text-3xl font-bold shadow-lg">
                  {selectedYear}
                </div>
                <h3 className="text-3xl font-bold text-brand-800">Year {selectedYear}</h3>
              </div>
              <div className="relative w-full rounded-2xl overflow-hidden bg-white shadow-sm ring-2 ring-brand-100/50">
                <Image
                  src={`/3yearplan/year ${selectedYear}.jpg`}
                  alt={`Year ${selectedYear} roadmap for Noa's Place`}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>

            {/* Timeline Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex justify-center items-center gap-4"
            >
              <div className="flex gap-2">
                {[1, 2, 3].map((year) => (
                  <motion.div
                    key={year}
                    animate={{
                      width: selectedYear === year ? 32 : 8,
                      backgroundColor: selectedYear === year ? "#6E3482" : "#E7DBEF"
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-2 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedScrollSection>

      {/* The Hub Concept Section */}
      <AnimatedScrollSection>
        <section className="bg-gradient-to-b from-white via-brand-50/30 to-white py-24 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent"></div>
          <div className="mx-auto max-w-7xl px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-extrabold text-brand-800 sm:text-4xl md:text-5xl mb-6 tracking-tight">
                The Hub Concept
              </h2>
              <p className="text-xl text-ink/80 max-w-4xl mx-auto leading-relaxed">
                Imagine a place where every family with additional needs feels seen, supported, and understood. Where children and adults can explore, play, and grow in spaces designed just for them.
              </p>
            </motion.div>

            {/* Hub Overview with Central Image */}
            <div className="relative mb-20">
              <div className="grid gap-12 lg:grid-cols-2 items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  className="order-2 lg:order-1"
                >
                  <h3 className="text-2xl font-bold text-brand-800 mb-6">
                    A Safe Haven for Every Family
                  </h3>
                  <div className="space-y-4 text-lg text-ink/80 leading-relaxed">
                    <p>
                      <strong>Noa's Place won't just be a building, it will be a lifeline.</strong>
                    </p>
                    <p>
                      Our hub will bring together sensory rooms, play spaces, a community café, and support groups under one roof. Families will find respite, connection, and the tools they need to thrive.
                    </p>
                    <p className="font-medium text-brand-800">
                      No waiting lists. No more feeling alone. Just immediate, understanding support when you need it most.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="order-1 lg:order-2 relative"
                >
                  <Image
                    src="/images/The Hub Concept.jpg"
                    alt="The Hub Concept - our vision for an inclusive space"
                    width={1200}
                    height={800}
                    className="w-full h-auto rounded-3xl shadow-2xl ring-4 ring-white/50"
                  />
                </motion.div>
              </div>
            </div>

            {/* Spaces Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-ink/80 mb-3">
                This is what we imagine Noa's Place will look like - a vibrant, inclusive space for everyone.
              </p>
              <p className="mx-auto mt-3 max-w-2xl text-center text-base text-brand-800 flex items-center justify-center gap-2 mb-12 font-medium">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2H3v16h5v4l4-4h5l4-4V2zM12 7v4M12 15h.01" />
                </svg>
                Click any space to learn more about it
              </p>
            </motion.div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {spaces.map((space, index) => (
                <motion.button
                  key={space.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedSpace(space)}
                  className="group relative aspect-[4/3] block overflow-hidden rounded-3xl bg-brand-50 lg:col-span-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-brand-800/50 focus:ring-offset-4 transition-shadow duration-500 hover:shadow-2xl border-2 border-transparent hover:border-brand-200"
                >
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src={space.image.src}
                      alt={space.image.alt}
                      width={600}
                      height={450}
                      className={`transition-transform duration-700 ease-out ${
                        space.id === "event-spaces" 
                          ? "h-full w-full object-cover scale-150 object-top -translate-y-16 group-hover:scale-[1.65]" 
                          : "h-full w-full object-cover group-hover:scale-110"
                      }`}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <span className="text-xl font-bold text-white drop-shadow-lg group-hover:underline transition-all duration-300">
                      {space.title}
                    </span>
                    <span className="text-sm text-white bg-brand-800/90 px-4 py-2 rounded-full backdrop-blur-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 font-semibold">
                      Learn more →
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      </AnimatedScrollSection>

      {/* Supporting Families Before Crisis Section */}
      <AnimatedScrollSection>
        <section className="bg-gradient-to-b from-white via-brand-50/30 to-white py-24 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent"></div>
          <div className="mx-auto max-w-6xl px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-extrabold text-brand-800 sm:text-4xl md:text-5xl mb-6 tracking-tight">
                Support Before Crisis
              </h2>
              <p className="text-xl text-ink/80 max-w-4xl mx-auto leading-relaxed">
                Early intervention changes everything. Our hub will be there from day one, not just when families reach breaking point.
              </p>
            </motion.div>

            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="space-y-6"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group relative bg-gradient-to-br from-white via-red-50/30 to-white rounded-3xl p-6 shadow-lg border-2 border-red-100/30 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-200/20 to-transparent rounded-bl-full"></div>
                  <h3 className="text-lg font-bold text-brand-800 mb-3 flex items-center gap-3 relative z-10">
                    <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                    Current Reality
                  </h3>
                  <ul className="space-y-2 text-ink/80 relative z-10">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold mt-1">•</span>
                      <span>Families wait months for assessments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold mt-1">•</span>
                      <span>Support only comes during crisis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold mt-1">•</span>
                      <span>Parents feel isolated and overwhelmed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold mt-1">•</span>
                      <span>Children miss critical development windows</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="group relative bg-gradient-to-br from-white via-green-50/30 to-white rounded-3xl p-6 shadow-lg border-2 border-green-100/30 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-200/20 to-transparent rounded-bl-full"></div>
                  <h3 className="text-lg font-bold text-brand-800 mb-3 flex items-center gap-3 relative z-10">
                    <div className="size-3 rounded-full bg-green-500" />
                    Our Approach
                  </h3>
                  <ul className="space-y-2 text-ink/80 relative z-10">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-1">•</span>
                      <span>Immediate access to sensory support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-1">•</span>
                      <span>Early intervention and resources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-1">•</span>
                      <span>Connected community of understanding families</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-1">•</span>
                      <span>Holistic support for the whole family</span>
                    </li>
                  </ul>
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/50">
                  <Image
                    src="/images/family_photo_halifax_west_yorkshire.jpg"
                    alt="Families supporting each other - the community we're building"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Floating stats */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute -bottom-6 -right-6 bg-gradient-to-br from-white via-brand-50/80 to-white rounded-3xl p-4 shadow-2xl border-2 border-brand-100/50"
                >
                  <div className="text-center">
                    <div className="text-2xl font-black text-brand-800">1000s</div>
                    <div className="text-sm text-ink/70">Families already</div>
                    <div className="text-sm text-ink/70">showing support</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedScrollSection>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-br from-brand-800 via-brand-900 to-purple-900 py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Together, we can create a community where every family feels supported, seen, and valued. <strong>Your support makes a difference.</strong>
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => setShowMailchimpPopup(true)}
              className="inline-flex items-center justify-center rounded-xl bg-[#FFB800] px-8 py-4 text-lg font-bold text-ink shadow-lg hover:bg-[#ffc533] hover:scale-105 transition duration-200"
            >
              Support Our Vision
              <svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-bold text-white hover:bg-white/10 hover:border-white/50 transition duration-200"
            >
              Get in Touch
              <svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16v16H4z"/>
                <path d="m22 6-10 7L2 6"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Image Modal - Top Layer Popup */}
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

      {/* Mailchimp Popup Modal - Rendered via Portal */}
      {mounted && showMailchimpPopup && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowMailchimpPopup(false);
          }}
        >
          <div
            ref={containerRef}
            className="relative w-full max-w-2xl my-auto rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setShowMailchimpPopup(false)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 text-ink shadow ring-1 ring-brand-100 transition hover:bg-brand-50"
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="px-6 pb-6 pt-12 sm:px-8 sm:pb-8 sm:pt-14">
              <div className="mx-auto max-w-xl text-center">
                <h3 className="text-2xl font-bold text-brand-800">Join Our Mission</h3>
                <p className="mt-2 text-ink/80">
                  Show your support by joining our mailing list. We'll keep you updated on our progress and show how your support makes a difference.
                </p>
              </div>

              <div className="mt-6">
                <MailchimpSubscribeForm />
              </div>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setShowMailchimpPopup(false)}
                  className="text-sm font-medium text-ink/60 underline underline-offset-4 hover:text-ink"
                >
                  No thanks
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </main>
  );
}
