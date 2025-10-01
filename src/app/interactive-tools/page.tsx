"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function InteractiveTools() {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string | null>(null);
  const [hasUserSelected, setHasUserSelected] = useState(false);

  const toolsByAge = {
    children: [
      {
        id: "all-about-me-child",
        title: "All About Me",
        description: "Create a profile to share with teachers, nurses, and new people about who you are",
        icon: (
          <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
            <path d="M12 2v5"/>
            <path d="M17 7l-5 5"/>
            <path d="M7 7l5 5"/>
          </svg>
        ),
        href: "/interactive-tools/all-about-me-child",
        isAvailable: true,
        ageGroup: "children"
      },
      {
        id: "bullying-help-child",
        title: "When Someone Is Unkind",
        description: "Simple tools to help children understand and deal with unkind behaviour, with help from parents and carers",
        icon: (
          <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="M9 12l2 2 4-4"/>
          </svg>
        ),
        href: "/interactive-tools/bullying-help",
        isAvailable: true,
        ageGroup: "children"
      },
      {
        id: "feelings-situations-child",
        title: "My Feelings",
        description: "Help children understand how they feel in different situations with pictures and simple words",
        icon: (
          <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
          </svg>
        ),
        href: "/interactive-tools/my-feelings",
        isAvailable: true,
        ageGroup: "children"
      },
      {
        id: "transitions-child",
        title: "My Transitions",
        description: "Help children understand and prepare for new things happening in their life with pictures and simple activities",
        icon: (
          <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 7L9 19l-5.5-5.5"/>
            <path d="M21 7l-6-6"/>
            <path d="M9 19l6 6"/>
            <circle cx="12" cy="12" r="1"/>
          </svg>
        ),
        href: "/interactive-tools/my-transitions",
        isAvailable: true,
        ageGroup: "children"
      },
      {
        id: "sensory-overload-child",
        title: "My Sensory World",
        description: "Help children identify what triggers sensory overload and what helps them feel calm and comfortable",
        icon: (
          <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
            <path d="M20.2 7.8L16 12l4.2 4.2M3.8 7.8L8 12l-4.2 4.2"/>
          </svg>
        ),
        href: "/interactive-tools/sensory-overload",
        isAvailable: true,
        ageGroup: "children"
      },
      {
        id: "coming-soon-child",
        title: "Coming Soon",
        description: "More tools for primary school age children are being developed",
        icon: (
          <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14"/>
          </svg>
        ),
        href: "#",
        isAvailable: false,
        ageGroup: "children"
      },
    ],
    teens: [
      {
        id: "all-about-me-teen",
        title: "All About Me Profile",
        description: "Create a comprehensive profile to share with teachers, employers, and support services",
        icon: (
          <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            <path d="M8 3.13a4 4 0 0 0 0 7.75"/>
          </svg>
        ),
        href: "/interactive-tools/all-about-me-teen",
        isAvailable: true,
        ageGroup: "teens"
      },
      {
        id: "bullying-support-teen",
        title: "Bullying Support Tool",
        description: "Assess your situation, understand your options, and create an action plan to deal with bullying",
        icon: (
          <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="M9 9h.01"/>
            <path d="M15 9h.01"/>
            <path d="M8 13a4 4 0 1 0 8 0"/>
          </svg>
        ),
        href: "/interactive-tools/bullying-support",
        isAvailable: true,
        ageGroup: "teens"
      },
      {
        id: "transitions-teen",
        title: "Transition Planning",
        description: "Plan and prepare for life changes with structured assessment and goal setting",
        icon: (
          <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 7L9 19l-5.5-5.5"/>
            <path d="M21 7l-6-6"/>
            <path d="M9 19l6 6"/>
            <path d="M12 12h.01"/>
          </svg>
        ),
        href: "/interactive-tools/transition-planning",
        isAvailable: true,
        ageGroup: "teens"
      },
      {
        id: "sensory-overload-teen",
        title: "My Sensory Profile",
        description: "Identify your sensory triggers and develop personalised strategies for managing sensory overload",
        icon: (
          <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
            <path d="M20.2 7.8L16 12l4.2 4.2M3.8 7.8L8 12l-4.2 4.2"/>
          </svg>
        ),
        href: "/interactive-tools/sensory-overload-teen",
        isAvailable: true,
        ageGroup: "teens"
      },
      {
        id: "coming-soon-teen",
        title: "Coming Soon",
        description: "More tools for secondary school students are being developed",
        icon: (
          <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14"/>
          </svg>
        ),
        href: "#",
        isAvailable: false,
        ageGroup: "teens"
      }
    ],
    adults: [
      {
        id: "all-about-me-adult",
        title: "All About Me Profile",
        description: "Comprehensive personal profile for sharing with healthcare providers, support services, and new contacts",
        icon: (
          <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        ),
        href: "/interactive-tools/all-about-me-adult",
        isAvailable: true,
        ageGroup: "adults"
      },
      {
        id: "transitions-adult", 
        title: "Life Transitions Support",
        description: "Comprehensive planning tool for adults with additional needs facing life changes and transitions",
        icon: (
          <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 7L9 19l-5.5-5.5M21 7l-6-6M9 19l6 6"/>
            <circle cx="12" cy="12" r="2"/>
          </svg>
        ),
        href: "/interactive-tools/life-transitions",
        isAvailable: true,
        ageGroup: "adults"
      },
      {
        id: "sensory-profile-adult",
        title: "Sensory Profile",
        description: "Comprehensive sensory assessment tool to identify triggers and develop personalised coping strategies",
        icon: (
          <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
            <path d="M20.2 7.8L16 12l4.2 4.2M3.8 7.8L8 12l-4.2 4.2"/>
          </svg>
        ),
        href: "/interactive-tools/sensory-profile-adult",
        isAvailable: true,
        ageGroup: "adults"
      },
      {
        id: "coming-soon-adult",
        title: "Coming Soon",
        description: "More resources and tools for adults are in development",
        icon: (
          <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14"/>
          </svg>
        ),
        href: "#",
        isAvailable: false,
        ageGroup: "adults"
      }
    ]
  };

  const ageGroups = [
    {
      id: "children",
      title: "Children",
      subtitle: "Primary School Age (4-11 years)",
      description: "Interactive tools designed specifically for primary school children",
      color: "from-blue-500 to-cyan-500",
      image: "/images/interactive_tools_noas_place_halifax_primary_school.jpg",
      imageAlt: "Primary school children engaged in learning activities at Noa's Place Halifax",
      icon: (
        <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="6" r="3"/>
          <path d="M12 9v12"/>
          <path d="M8 14l8 0"/>
          <path d="M10 21l4 0"/>
          <path d="M9 12l6 0"/>
        </svg>
      ),
    },
    {
      id: "teens",
      title: "Teens",
      subtitle: "Secondary School Age (11-18 years)",
      description: "Tools and resources tailored for teenagers and young people",
      color: "from-purple-500 to-pink-500",
      image: "/images/interactive_tools_noas_place_halifax_secondary_school.jpg",
      imageAlt: "Secondary school teenagers participating in interactive activities at Noa's Place Halifax",
      icon: (
        <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      id: "adults",
      title: "Adults",
      subtitle: "Adults of All Ages (18+ years)",
      description: "Resources and support tools for adults with additional needs",
      color: "from-green-500 to-emerald-500",
      image: "/images/interactive_tools_noas_place_halifax_adults.jpg",
      imageAlt: "Adults with additional needs using interactive tools and resources at Noa's Place Halifax",
      icon: (
        <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
    }
  ];

  return (
    <main className="bg-background text-ink">
      {/* Hero Section */}
      <section className="relative isolate min-h-[400px] overflow-hidden">
        {/* Background decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg className="absolute -left-12 top-12 h-32 w-32 rotate-[-12deg] text-[#6E3482]/40" viewBox="0 0 100 100" fill="currentColor">
            <path d="M70,35 C70,25 65,20 60,20 L40,20 C35,20 30,25 30,35 C30,40 25,45 20,45 C10,45 5,50 5,60 L5,80 C5,85 10,90 20,90 C25,90 30,95 30,100 C30,110 35,115 40,115 L60,115 C65,115 70,110 70,100 C70,95 75,90 80,90 C90,90 95,85 95,80 L95,60 C95,50 90,45 80,45 C75,45 70,40 70,35" />
          </svg>
          <svg className="absolute -right-12 top-20 h-28 w-44 rotate-12 text-[#40BFBF]/40" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="8">
            <path d="M30,25 C30,15 35,10 45,10 C55,10 60,15 60,25 C60,35 55,40 45,40 C35,40 30,35 30,25 M70,25 C70,15 75,10 85,10 C95,10 100,15 100,25 C100,35 95,40 85,40 C75,40 70,35 70,25" />
          </svg>
          <div className="absolute right-1/4 top-1/4 size-6 rounded-full bg-[#6E3482]/30" />
          <div className="absolute left-1/3 bottom-1/3 size-5 rounded-full bg-[#40BFBF]/40" />
          <svg className="absolute right-1/4 bottom-1/4 h-12 w-12 rotate-12 text-[#FFB800]/40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2 L15,9 L22,9 L16,14 L18,21 L12,17 L6,21 L8,14 L2,9 L9,9 Z" />
          </svg>
        </div>

        <div className="relative px-6 pt-16 pb-8 sm:pt-20 sm:pb-12">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-black text-brand-800 sm:text-5xl md:text-6xl mb-6">
              Interactive Tools
            </h1>
            <p className="text-xl font-bold text-ink sm:text-2xl md:text-3xl mb-4">
              Age-appropriate resources for children, teens, and adults
            </p>
            <p className="text-lg text-ink/80 max-w-3xl mx-auto">
              Discover interactive tools organised by age group to support individuals and families with additional needs at every stage of life.
            </p>
          </div>
        </div>
      </section>

      {/* Age Group Selection */}
      <section className="py-8 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-ink mb-4">
              Choose who you're looking for help for:
            </h2>
            <p className="text-ink/70">
              Select an age group to see the relevant tools and resources
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {ageGroups.map((ageGroup) => (
              <button
                key={ageGroup.id}
                onClick={() => {
                  setSelectedAgeGroup(selectedAgeGroup === ageGroup.id ? null : ageGroup.id);
                  setHasUserSelected(true);
                  
                  // Scroll to tools section after a brief delay to allow state update
                  setTimeout(() => {
                    const toolsSection = document.getElementById('tools-section');
                    if (toolsSection) {
                      toolsSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }, 100);
                }}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
                  selectedAgeGroup === ageGroup.id
                    ? 'ring-4 ring-brand-500 shadow-xl scale-105'
                    : 'hover:shadow-lg hover:scale-102'
                }`}
              >
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={ageGroup.image}
                    alt={ageGroup.imageAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${ageGroup.color} ${
                    selectedAgeGroup === ageGroup.id ? 'opacity-90' : 'opacity-80'
                  }`}></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="text-center text-white">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full mb-2 border border-white/30">
                      <span className="text-white scale-75">
                        {ageGroup.icon}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-1 drop-shadow-lg">
                      {ageGroup.title}
                    </h3>
                    <p className="text-xs drop-shadow-md">
                      {ageGroup.subtitle}
                    </p>
                  </div>
                </div>
                
                {selectedAgeGroup === ageGroup.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {selectedAgeGroup && (
            <div className="text-center mt-6">
              <button
                onClick={() => {
                  setSelectedAgeGroup(null);
                  setHasUserSelected(true);
                  
                  // Scroll to tools section after a brief delay to allow state update
                  setTimeout(() => {
                    const toolsSection = document.getElementById('tools-section');
                    if (toolsSection) {
                      toolsSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }, 100);
                }}
                className="text-brand-600 hover:text-brand-800 font-medium text-sm underline"
              >
                Show all age groups
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Tools by Age Group */}
      <section id="tools-section" className="py-16">
        <div className="mx-auto max-w-7xl px-6 space-y-16">
          {!hasUserSelected ? (
            <div className="text-center py-16">
              <div className="max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-ink mb-4">
                  Select an age group above to see relevant tools
                </h3>
                <p className="text-ink/70 text-lg">
                  Choose from Children, Teens, or Adults to view the interactive tools designed specifically for that age group.
                </p>
              </div>
            </div>
          ) : (
            <div className="transition-all duration-500 ease-in-out">
              {ageGroups
                .filter(ageGroup => !selectedAgeGroup || ageGroup.id === selectedAgeGroup)
                .map((ageGroup, index) => (
              <div key={ageGroup.id} className="space-y-8">
              {/* Age Group Header */}
              <div className="relative rounded-3xl overflow-hidden bg-white shadow-lg border border-brand-100/20 mb-8">
                {/* Background Image */}
                <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
                  <Image
                    src={ageGroup.image}
                    alt={ageGroup.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Gradient overlay for text readability */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${ageGroup.color} opacity-80`}></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
                  <div className="text-center text-white max-w-full">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 sm:mb-6 border border-white/30">
                      <span className="text-white scale-75 sm:scale-100">
                        {ageGroup.icon}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2 drop-shadow-lg leading-tight">
                      {ageGroup.title}
                    </h2>
                    <p className="text-sm sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 drop-shadow-md leading-tight">
                      {ageGroup.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm lg:text-base max-w-2xl mx-auto drop-shadow-md font-medium leading-relaxed">
                      {ageGroup.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tools Grid for this age group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {toolsByAge[ageGroup.id as keyof typeof toolsByAge].map((tool) => {
                  if (tool.isAvailable) {
                    return (
                      <Link
                        key={tool.id}
                        href={tool.href}
                        className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 lg:p-8 border border-brand-100/20 hover:border-brand-200 hover:-translate-y-1"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-brand-100 rounded-full mb-4 sm:mb-6 group-hover:bg-brand-200 transition-colors duration-300">
                            <span className="text-brand-800 scale-75 sm:scale-90 lg:scale-100">
                              {tool.icon}
                            </span>
                          </div>
                          
                          <h3 className="text-lg sm:text-xl font-bold text-ink mb-3 sm:mb-4 group-hover:text-brand-800 transition-colors duration-300 leading-tight">
                            {tool.title}
                          </h3>
                          
                          <p className="text-sm sm:text-base text-ink/70 mb-4 sm:mb-6 leading-relaxed">
                            {tool.description}
                          </p>
                          
                          <div className="mt-auto">
                            <span className="inline-flex items-center gap-2 text-brand-800 font-medium group-hover:gap-3 transition-all duration-300 text-sm sm:text-base">
                              Get Started
                              <svg className="size-3 sm:size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"/>
                                <path d="M12 5l7 7-7 7"/>
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  } else {
                    return (
                      <div
                        key={tool.id}
                        className="bg-gray-50 rounded-2xl shadow-sm p-8 border border-gray-200"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                            <span className="text-gray-400">
                              {tool.icon}
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-500 mb-4">
                            {tool.title}
                          </h3>
                          
                          <p className="text-gray-400 mb-6 leading-relaxed">
                            {tool.description}
                          </p>
                          
                          <span className="inline-flex items-center gap-2 text-xs bg-gray-200 text-gray-500 px-3 py-2 rounded-full font-medium">
                            <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"/>
                              <polyline points="12,6 12,12 16,14"/>
                            </svg>
                            Coming Soon
                          </span>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>

              {/* Divider between age groups (except for the last one) */}
              {index < ageGroups.length - 1 && (
                <div className="flex items-center justify-center pt-8">
                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent"></div>
                </div>
              )}
              </div>
              ))
            }
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
