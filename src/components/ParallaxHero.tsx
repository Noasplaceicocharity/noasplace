"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function ParallaxHero() {
  const skyRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Parallax effect for sky (moves slower)
      if (skyRef.current) {
        skyRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
      }

      // Parallax effect for clouds (moves faster, stays in section 1)
      if (cloudsRef.current && section1Ref.current) {
        const section1Height = section1Ref.current.offsetHeight;
        // Clouds only move within section 1
        if (scrollY < section1Height) {
          cloudsRef.current.style.transform = `translateY(${scrollY * 0.8}px)`;
        } else {
          // Lock clouds at their final position when section 1 ends
          cloudsRef.current.style.transform = `translateY(${section1Height * 0.8}px)`;
        }
      }

      // Parallax effect for city (moves slower)
      if (cityRef.current) {
        const cityOffset = windowHeight;
        if (scrollY >= cityOffset) {
          cityRef.current.style.transform = `translateY(${(scrollY - cityOffset) * 0.3}px)`;
        } else {
          cityRef.current.style.transform = `translateY(0px)`;
        }
      }

      // Text fade effect
      if (textRef.current) {
        const opacity = Math.max(0, 1 - scrollY / (windowHeight * 0.5));
        textRef.current.style.opacity = opacity.toString();
      }
    };

    // Use requestAnimationFrame for smoother scrolling
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative">
      {/* Section 1: Sky, Text, and Clouds */}
      <section ref={section1Ref} className="relative h-screen overflow-hidden">
        {/* Sky Background */}
        <div
          ref={skyRef}
          className="absolute inset-0 z-0"
          style={{ willChange: "transform" }}
        >
          <Image
            src="/paralax/sky.jpg"
            alt="Sky background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Welcome Text */}
        <div
          ref={textRef}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white text-center px-6 drop-shadow-2xl">
            Welcome to Noa&apos;s Place
          </h1>
        </div>

        {/* Clouds Overlay */}
        <div
          ref={cloudsRef}
          className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
          style={{ willChange: "transform" }}
        >
          <Image
            src="/paralax/clouds.png"
            alt="Clouds"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Section 2: City Background */}
      <section className="relative min-h-screen overflow-hidden">
        {/* City Background */}
        <div
          ref={cityRef}
          className="absolute inset-0 z-0"
          style={{ willChange: "transform" }}
        >
          <Image
            src="/paralax/city.jpg"
            alt="City background"
            fill
            className="object-cover"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl md:text-2xl lg:text-3xl text-white leading-relaxed drop-shadow-lg">
              We&apos;re building a new, inclusive community hub in Halifax, West Yorkshire, designed specifically for neurodivergent and disabled individuals and families. Our mission is to create calm, welcoming spaces where everyone can feel understood, connected, and truly at home.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

