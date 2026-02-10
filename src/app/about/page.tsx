"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatedScrollSection } from "@/components/AnimatedScrollSection";
import MailchimpSubscribeForm from "@/components/MailchimpSubscribeForm";

export default function AboutUs() {
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
  return (
    <main className="bg-background text-ink">
      {/* Hero Section - Start with Your Why */}
      <section className="relative isolate min-h-[500px] overflow-hidden">
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
              About Noa's Place
            </h1>
            <p className="text-2xl sm:text-3xl font-bold text-ink mb-4 leading-relaxed">
              No family should have to reach crisis before they get support.
            </p>
            <p className="text-lg sm:text-xl text-ink/80 max-w-3xl mx-auto leading-relaxed">
              We create welcoming spaces where neurodivergent and disabled individuals and families find understanding, connection, and community. You're welcome exactly as you are.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <AnimatedScrollSection>
        <section id="our-story" className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-brand-800 sm:text-4xl md:text-5xl mb-4">
                Our Story
              </h2>
              <p className="text-xl text-ink/80 max-w-3xl mx-auto">
                Behind every charity is a story. Here's ours.
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-2 items-center mb-16">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/8hlXxMlXsyo"
                  title="YouTube video player"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-brand-800 sm:text-3xl">
                  How It All Began
                </h3>
                <div className="space-y-4 text-lg text-ink/80 leading-relaxed">
                  <p>
                    <strong>Noa's Place is a new community-led project inspired by our little boy, Noa.</strong>
                  </p>
                  <p>
                    Noa has complex sensory and developmental needs, and like so many families, we found ourselves navigating long NHS waiting lists, confusing systems, and feeling completely alone while trying to cope.
                  </p>
                  <p className="font-semibold text-brand-800 text-xl">
                    We don't want any other family to go through what we did.
                  </p>
                  <p>
                    What began as a small family's struggle has grown into a vision for change. We've learned that <strong>early support prevents crisis</strong>, and that <strong>every family deserves a place to belong</strong>, not years from now, but today.
                  </p>
                </div>
              </div>
            </div>

            {/* Story Growth Timeline */}
            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto mt-16">
              <div className="text-center p-6 rounded-2xl bg-brand-50/50 border-2 border-brand-100/50">
                <div className="text-4xl font-black text-brand-800 mb-3">2025</div>
                <p className="text-ink/80 font-medium">The vision was born from our family's experience</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-brand-50/50 border-2 border-brand-100/50">
                <div className="text-4xl font-black text-brand-800 mb-3">1000+</div>
                <p className="text-ink/80 font-medium">People already supporting our plans</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-brand-50/50 border-2 border-brand-100/50">
                <div className="text-4xl font-black text-brand-800 mb-3">Next</div>
                <p className="text-ink/80 font-medium">Building our inclusive hub in Halifax</p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedScrollSection>

      {/* Why We Exist Section */}
      <section className="bg-brand-50/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-brand-800 sm:text-4xl">
                Why We Exist
              </h2>
              <div className="space-y-4 text-lg text-ink/80 leading-relaxed">
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
                    It prevents trauma, reduces crisis intervention, and helps families <strong>thrive, not just survive</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] ml-0 lg:ml-24 scale-100 lg:scale-[2] w-full">
              <Image
                src="/images/testimonials.png"
                alt="Testimonials from families supported by Noa's Place"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <AnimatedScrollSection>
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-brand-800 sm:text-4xl md:text-5xl mb-4">
                Our Impact
              </h2>
              <p className="text-xl text-ink/80 max-w-3xl mx-auto">
                We're building something that matters. Here's what we've achieved so far.
              </p>
            </div>

            {/* Impact Stats */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto mb-16">
              <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-white via-purple-50/50 to-pink-50/50 border-2 border-purple-100/50 shadow-lg">
                <div className="text-5xl font-black text-brand-800 mb-3">1000+</div>
                <p className="text-ink/80 font-medium">People supporting our vision</p>
              </div>
              <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-white via-brand-50/80 to-yellow-50/50 border-2 border-brand-100/30 shadow-lg">
                <div className="text-5xl font-black text-brand-800 mb-3">6</div>
                <p className="text-ink/80 font-medium">Dedicated trustees</p>
              </div>
              <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-white via-purple-50/50 to-pink-50/50 border-2 border-purple-100/50 shadow-lg">
                <div className="text-5xl font-black text-brand-800 mb-3">4+</div>
                <p className="text-ink/80 font-medium">Press features</p>
              </div>
              <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-white via-brand-50/80 to-yellow-50/50 border-2 border-brand-100/30 shadow-lg">
                <div className="text-5xl font-black text-brand-800 mb-3">1</div>
                <p className="text-ink/80 font-medium">Clear mission: belonging for all</p>
              </div>
            </div>

            {/* Press Coverage */}
            <div className="bg-brand-50/30 rounded-3xl p-8 md:p-12">
              <h3 className="text-2xl font-bold text-brand-800 mb-6 text-center">
                As Featured On
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-70 hover:opacity-100 transition-opacity duration-300">
                <a 
                  href="https://www.bbc.co.uk/news/articles/c5yq4xx2yp2o"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative h-12 w-auto hover:scale-105 transition-transform duration-200"
                >
                  <Image
                    src="/images/BBC_News_Logo.png"
                    alt="BBC News"
                    width={150}
                    height={48}
                    className="h-full w-auto object-contain filter grayscale hover:grayscale-0 transition-all"
                  />
                </a>
                <a 
                  href="https://www.halifaxcourier.co.uk/news/people/families-are-left-isolated-and-it-can-feel-like-a-storm-ripponden-family-launch-vision-for-noas-place-5304261"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative h-12 w-auto hover:scale-105 transition-transform duration-200"
                >
                  <Image
                    src="/images/halifaxcourier.webp"
                    alt="Halifax Courier"
                    width={150}
                    height={48}
                    className="h-full w-auto object-contain filter grayscale hover:grayscale-0 transition-all"
                  />
                </a>
                <a 
                  href="https://www.examinerlive.co.uk/news/west-yorkshire-news/halifax-family-absolutely-blown-away-32400258?int_source=nba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative h-12 w-auto hover:scale-105 transition-transform duration-200"
                >
                  <Image
                    src="/images/yorkshirelive.png"
                    alt="Yorkshire Live"
                    width={150}
                    height={48}
                    className="h-full w-auto object-contain filter grayscale hover:grayscale-0 transition-all"
                  />
                </a>
                <a 
                  href="https://www.yorkshirepost.co.uk/community/calderdale-family-launch-vision-for-inclusive-hub-for-children-and-adults-with-additional-needs-5291748"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative h-12 w-auto hover:scale-105 transition-transform duration-200"
                >
                  <Image
                    src="/images/yorkshirepost.png"
                    alt="Yorkshire Post"
                    width={150}
                    height={48}
                    className="h-full w-auto object-contain filter grayscale hover:grayscale-0 transition-all"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
      </AnimatedScrollSection>

      {/* Vision & Mission Section */}
      <AnimatedScrollSection>
        <section id="our-vision" className="bg-gradient-to-b from-white via-brand-50/40 to-white py-24 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent"></div>
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-brand-800 sm:text-4xl md:text-5xl mb-4">
                Our Vision & Mission
              </h2>
              <p className="text-xl text-ink/80 max-w-3xl mx-auto">
                What drives us forward every single day.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
              {/* Vision */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-white via-purple-50/50 to-pink-50/50 backdrop-blur-sm border-2 border-purple-100/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-400/20 to-transparent rounded-tr-full"></div>
                
                <div className="relative z-10">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-800 mb-6">
                    Our Vision
                  </h3>
                  <p className="text-lg text-ink/80 leading-relaxed font-medium">
                    We create welcoming spaces where neurodivergent and disabled individuals and families find understanding, connection, and community. <strong>You're welcome exactly as you are.</strong> This is a place where everyone can simply be themselves and shine.
                  </p>
                </div>
              </motion.div>

              {/* Mission */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-white via-brand-50/80 to-yellow-50/50 backdrop-blur-sm border-2 border-brand-100/30 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-brand-400/20 to-transparent rounded-br-full"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-yellow-400/20 to-transparent rounded-tl-full"></div>
                
                <div className="relative z-10">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-800 mb-6">
                    Our Mission
                  </h3>
                  <p className="text-lg text-ink/80 leading-relaxed font-medium">
                    Our mission is to create calm, inclusive, and sensory aware spaces thoughtfully designed for neurodivergent and disabled individuals and families. <strong>We listen, we understand, and we respond with kindness</strong>, building a supportive community where no one is ever left to face challenges alone.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Strapline */}
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block p-8 rounded-3xl bg-gradient-to-br from-brand-800 to-brand-900 text-white shadow-2xl">
                <p className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight">
                  Together we make space for every family to <span className="text-[#FFB800]">shine</span>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedScrollSection>

      {/* Our Values Section */}
      <section id="our-values" className="bg-brand-50/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-brand-800 sm:text-4xl md:text-5xl mb-4">
              Our Values
            </h2>
            <p className="text-xl text-ink/80 max-w-4xl mx-auto">
              These core values guide everything we do at Noa's Place.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5 max-w-6xl mx-auto">
            {[
              { name: "Kindness", image: "/images/values/Kindness.png", description: "We meet every family with patience, compassion and warmth." },
              { name: "Belonging", image: "/images/values/belonging.png", description: "No one should feel alone here. Everyone has a place." },
              { name: "Listening", image: "/images/values/Listening.png", description: "Families and individuals help shape what we do and how we do it." },
              { name: "Calm", image: "/images/values/calm.png", description: "We create gentle, sensory-considerate spaces where people can breathe." },
              { name: "Growth", image: "/images/values/growth.png", description: "We support small steps, personal strengths and long-term flourishing." },
            ].map((value, index) => (
              <motion.div
                key={value.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col items-center p-8 rounded-3xl bg-gradient-to-br from-white via-brand-50/50 to-white backdrop-blur-sm border-2 border-brand-100/30 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-brand-300/20 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-brand-200/20 to-transparent rounded-tr-full"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative mb-6 size-28">
                    <Image
                      src={value.image}
                      alt={value.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-brand-800 mb-2">{value.name}</h3>
                  <p className="text-ink/80 text-sm text-center">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <AnimatedScrollSection>
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-brand-800 sm:text-4xl md:text-5xl mb-4">
                What We Will Offer
              </h2>
              <p className="text-xl text-ink/80 max-w-3xl mx-auto">
                A welcoming hub designed with families in mind.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {[
                { title: "Sensory Rooms & Quiet Spaces", description: "Explore specially designed sensory environments and peaceful areas for regulation and calm." },
                { title: "Accessible Indoor Play", description: "Enjoy an inclusive play area where children of all abilities can explore and have fun together." },
                { title: "Community Café", description: "Find calm and connection in our welcoming café space for parents and carers." },
                { title: "Support Groups & Workshops", description: "Join peer networks, attend workshops, and connect with other families who understand." },
                { title: "Resources & Guidance", description: "Access helpful resources and support before reaching crisis point." },
                { title: "A Place to Belong", description: "Know that you are seen, supported, and never alone in your journey." },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-br from-white via-brand-50/50 to-white backdrop-blur-sm border-2 border-brand-100/30 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-brand-300/20 to-transparent rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-brand-200/20 to-transparent rounded-tr-full"></div>
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-brand-800 mb-2">{item.title}</h3>
                    <p className="text-ink/80">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedScrollSection>

      {/* Meet Our Trustees Section */}
      <section id="trustees" className="bg-brand-50/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-brand-800 sm:text-4xl md:text-5xl mb-4">
              Meet Our Trustees
            </h2>
            <p className="text-lg text-ink/80 max-w-3xl mx-auto">
              Our dedicated board brings together diverse expertise and shared passion for supporting families with additional needs.
            </p>
          </div>

          {/* Co-Chairs */}
          <div className="grid gap-8 sm:grid-cols-2 mb-12">
            {[
              {
                name: "Megan Taylor",
                role: "Co-Chair",
                image: "/images/trustees/Megan_Taylor_trustee_noas_place_halifax_west_yorkshire.jpg",
                description: "A neurodiverse parent of two neurodiverse children with expertise in academic research, marketing, and funding. Megan understands first-hand the challenges families face navigating SEN support."
              },
              {
                name: "Laura Maroney",
                role: "Co-Chair",
                image: "/images/trustees/Laura_Maroney_trustee_noas_place_halifax_west_yorkshire.jpg",
                description: "With years of experience in neurodiversity and inclusion, Laura is passionate about ensuring every child and family feels included, supported, and empowered."
              }
            ].map((trustee, index) => (
              <motion.div
                key={trustee.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-br from-white via-brand-50/50 to-white backdrop-blur-sm border-2 border-brand-100/30 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-brand-300/20 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-brand-200/20 to-transparent rounded-tr-full"></div>
                <div className="relative z-10">
                  <div className="relative mx-auto mb-4 size-32 overflow-hidden rounded-full ring-4 ring-white/50">
                    <Image
                      src={trustee.image}
                      alt={`${trustee.name} - ${trustee.role}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-brand-800 text-lg">{trustee.name}</h3>
                  <span className="mt-2 inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">{trustee.role}</span>
                  <p className="text-ink/80 text-sm mt-3 max-w-sm mx-auto">{trustee.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trustees */}
          <div className="grid gap-8 sm:grid-cols-2">
            {[
              {
                name: "Dr. Sophia Bentley",
                role: "Trustee",
                image: "/images/trustees/Sophia_Bentley_trustee_noas_place_halifax_west_yorkshire.jpg",
                description: "Educational and Child Psychologist and founder of Find A Way CIC. As a mum of two, Sophia combines professional expertise with personal understanding, always keeping families at the centre."
              },
              {
                name: "Mathew Atkinson",
                role: "Trustee",
                image: "/images/trustees/Mathew_Atkinson_trustee_noas_place_halifax_west_yorkshire.jpg",
                description: "Chief Executive Officer of The Priestley Academy Trust, serving over 2,500 children. A father of two, Mathew brings education leadership and strategic governance experience."
              },
              {
                name: "Nicole Owen",
                role: "Trustee",
                image: "/images/trustees/Nicole_Owen_trustee_noas_place_halifax_west_yorkshire.jpg",
                description: "Chartered Accountant and Head of Finance with expertise in commercial strategy and operations. As a mum to a two year old, Nicole is passionate about creating inclusive spaces where every child can thrive."
              }
            ].map((trustee, index) => (
              <motion.div
                key={trustee.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-br from-white via-brand-50/50 to-white backdrop-blur-sm border-2 border-brand-100/30 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-brand-300/20 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-brand-200/20 to-transparent rounded-tr-full"></div>
                <div className="relative z-10">
                  <div className="relative mx-auto mb-4 size-32 overflow-hidden rounded-full ring-4 ring-white/50">
                    <Image
                      src={trustee.image}
                      alt={`${trustee.name} - ${trustee.role}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-brand-800 text-lg">{trustee.name}</h3>
                  <span className="mt-2 inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">{trustee.role}</span>
                  <p className="text-ink/80 text-sm mt-3 max-w-sm mx-auto">{trustee.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
