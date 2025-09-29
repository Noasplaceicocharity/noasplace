"use client";

import { useState } from "react";
import SafetyPlanBuilder from "@/components/SafetyPlanBuilder";
import FeelingsCopingPlan from "@/components/FeelingsCopingPlan";
import TransitionPlan from "@/components/TransitionPlan";

export default function InteractiveTools() {
  const [activeTool, setActiveTool] = useState<string>("safety-plan");

  const tools = [
    {
      id: "safety-plan",
      title: "Anti-Bullying Safety Plan",
      description: "Interactive worksheet for teens to create their personal anti-bullying safety plan",
      icon: (
        <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      isAvailable: true,
    },
    {
      id: "feelings-coping",
      title: "Feelings & Coping Plan",
      description: "Help teens understand their emotions and create personalised coping strategies",
      icon: (
        <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
      isAvailable: true,
    },
    {
      id: "transition-plan",
      title: "Transition Plan",
      description: "Reduce anxiety for SEND individuals transitioning to something new",
      icon: (
        <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 7L9 19l-5.5-5.5M21 7l-6-6M9 19l6 6"/>
        </svg>
      ),
      isAvailable: true,
    },
    {
      id: "coming-soon-1",
      title: "Coming Soon",
      description: "More interactive tools and resources are on the way",
      icon: (
        <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>
      ),
      isAvailable: false,
    },
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
              Helpful resources for children, teens, and families
            </p>
            <p className="text-lg text-ink/80 max-w-3xl mx-auto">
              Explore our collection of interactive tools designed to support young people and families with additional needs.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Navigation */}
      <section className="bg-white border-b border-brand-100/30">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => tool.isAvailable && setActiveTool(tool.id)}
                disabled={!tool.isAvailable}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition duration-200 ${
                  activeTool === tool.id && tool.isAvailable
                    ? "bg-brand-800 text-white"
                    : tool.isAvailable
                    ? "bg-brand-50 text-brand-800 hover:bg-brand-100"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                <span className={activeTool === tool.id && tool.isAvailable ? "text-white" : "text-current"}>
                  {tool.icon}
                </span>
                <span>{tool.title}</span>
                {!tool.isAvailable && (
                  <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                )}
              </button>
            ))}
          </div>
          
          {/* Tool Description */}
          <div className="mt-6 text-center">
            <p className="text-ink/80 max-w-2xl mx-auto">
              {tools.find(tool => tool.id === activeTool)?.description}
            </p>
          </div>
        </div>
      </section>

      {/* Active Tool Content */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          {activeTool === "safety-plan" && <SafetyPlanBuilder />}
          {activeTool === "feelings-coping" && <FeelingsCopingPlan />}
          {activeTool === "transition-plan" && <TransitionPlan />}
          
          {activeTool === "coming-soon-1" && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-100 rounded-full mb-6">
                <svg className="size-10 text-brand-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-ink mb-4">More Tools Coming Soon!</h3>
              <p className="text-ink/80 max-w-2xl mx-auto">
                We're working on additional interactive tools and resources to support families with additional needs. 
                Check back soon for updates!
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
