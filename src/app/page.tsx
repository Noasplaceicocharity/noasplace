"use client";

import ImageModal from "@/components/ImageModal";
import Squiggle from "@/components/Squiggle";
import StickerCard from "@/components/StickerCard";
import { AnimatedScrollSection, ScrollProgressIndicator } from "@/components/AnimatedScrollSection";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import MailchimpSubscribeForm from "@/components/MailchimpSubscribeForm";
import { BlogPostMeta } from "@/lib/blog";

export default function Home() {
  const [selectedSpace, setSelectedSpace] = useState<{
    id: string;
    image: { src: string; alt: string };
    title: string;
    description: string;
    features: string[];
  } | null>(null);
  
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showMailchimpPopup, setShowMailchimpPopup] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [featuredBlog, setFeaturedBlog] = useState<BlogPostMeta | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedJourneyStep, setSelectedJourneyStep] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Fetch featured blog post
    fetch('/api/featured-blog')
      .then(res => res.json())
      .then(data => {
        if (data.post) {
          setFeaturedBlog(data.post);
        }
      })
      .catch(err => {
        console.error('Error fetching featured blog:', err);
      });
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroSectionRef.current) {
        const rect = heroSectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1
        setMousePosition({ x, y });
      }
    };

    const heroSection = heroSectionRef.current;
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove);
      return () => {
        heroSection.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  // Subtle parallax effects for depth
  const welcomeY = useTransform(scrollYProgress, [0, 0.25], [0, -30]);
  const dreamboardY = useTransform(scrollYProgress, [0.45, 0.65], [0, -25]);

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

  const journeySteps = [
    { step: 1, title: "The Vision & Strategy", status: "done", label: "Done", text: "Our vision, mission and 3-year strategic plan are in place to guide Noa's Place." },
    { step: 2, title: "Digital Community & Support Network", status: "done", label: "Done", text: "Our online community is growing with over 2,000 supporters and families connected." },
    { step: 3, title: "Listening to Families & Shaping the Hub", status: "progress", label: "In Progress", text: "Families are helping shape the future through conversations, feedback and co-design." },
    { step: 4, title: "Building Partnerships & Community Links", status: "progress", label: "In Progress", text: "We are connecting with schools, organisations and local partners to strengthen support for families." },
    { step: 5, title: "Becoming a Registered Charity", status: "progress", label: "In Progress", text: "Governance, trustees and charity registration steps are underway." },
    { step: 6, title: "Fundraising for the Noa's Place Hub", status: "next", label: "Next Step", text: "Securing funding to create a dedicated, sensory-aware space for families." },
    { step: 7, title: "Opening the Noa's Place Hub", status: "future", label: "Future Goal", text: "A calm, welcoming space where neurodivergent and disabled individuals and families can connect, belong and thrive." },
  ] as const;
  const activeJourneyStep = journeySteps.find((item) => item.step === selectedJourneyStep) ?? journeySteps[2];
  const completedJourneySteps = journeySteps.filter((item) => item.status === "done").length;

	return (
		<main className="bg-background text-ink">
			{/* Hero Section */}
			<section ref={heroSectionRef} className="relative min-h-[90vh] overflow-hidden">
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
					{/* Overlay for text readability */}
					<div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/60"></div>
				</div>
				
				{/* Decorative background elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
					<div className="absolute top-20 right-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"></div>
					<div className="absolute bottom-20 left-10 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-200/10 rounded-full blur-3xl"></div>
				</div>

				<div className="relative px-6 pt-8 pb-20 sm:pt-10 sm:pb-24 z-20">
					<div className="mx-auto max-w-7xl">
						{/* Main content grid */}
						<div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-center">
							{/* Left side - Text and buttons */}
							<div className="lg:col-span-2 space-y-8 animate-fade-in">
								<h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight max-w-2xl">
									Together we make space for every family to shine
								</h1>
								
								<p className="text-xl sm:text-2xl text-gray-700 leading-relaxed max-w-2xl">
									We're building a home for neurodiversity in West Yorkshire and we need your help to open the doors.
								</p>

								{/* Buttons */}
								<div className="flex flex-col sm:flex-row gap-3 pt-2">
									<button
										onClick={() => setShowMailchimpPopup(true)}
										className="inline-flex items-center justify-center rounded-lg bg-brand-800 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-brand-900 hover:shadow-lg hover:scale-105 transition-all duration-300"
									>
										Be a Founding Supporter
										<svg className="ml-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
										</svg>
									</button>
									<button
										onClick={() => setShowVideoModal(true)}
										className="inline-flex items-center justify-center rounded-lg bg-white border-2 border-brand-800 px-5 py-2.5 text-sm font-bold text-brand-800 shadow-md hover:bg-brand-50 hover:shadow-lg hover:scale-105 transition-all duration-300"
									>
										<svg className="mr-1.5 w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
											<path d="M8 5v14l11-7z"/>
										</svg>
										Watch our story
									</button>
									<Link
										href="/interactive-tools"
										className="inline-flex items-center justify-center rounded-lg bg-[#FFB800] px-5 py-2.5 text-sm font-bold text-gray-900 shadow-md hover:bg-[#ffc533] hover:shadow-lg hover:scale-105 transition-all duration-300"
									>
										Try interactive tools
										<svg className="ml-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
										</svg>
									</Link>
								</div>
							</div>

					{/* Right side - Image (hidden on mobile) */}
					<div className="relative hidden lg:block lg:mt-0">
						<div className="relative w-full h-[150px] lg:h-[190px] overflow-visible">
							<div 
								className="absolute inset-0 w-[250%] h-[250%] -left-[75%] -top-[75%] transition-transform duration-300 ease-out"
								style={{
									transform: `perspective(1000px) rotateY(${mousePosition.x * 8}deg) rotateX(${-mousePosition.y * 8}deg)`,
								}}
							>
								<Image
									src="/hero/hero-side.png"
									alt="Noa's Place - A welcoming community hub"
									fill
									className="object-contain"
									priority
								/>
							</div>
						</div>
					</div>
						</div>

						{/* Navigation cards - Blog 50%, Interactive Tools 25%, Dreamboard 25% */}
						<div className="mt-16 grid grid-cols-1 lg:grid-cols-4 gap-6">
							<Link
								href="/blog"
								className="group bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-white/50 lg:col-span-2"
							>
								<div className="relative h-52 overflow-hidden">
									{featuredBlog?.imageUrl ? (
										<Image
											src={featuredBlog.imageUrl}
											alt={featuredBlog.title}
											fill
											className="object-cover transition-transform duration-500 group-hover:scale-110"
										/>
									) : (
										<Image
											src="/images/family_photo_halifax_west_yorkshire.jpg"
											alt="Blog - Our latest stories and updates"
											fill
											className="object-cover transition-transform duration-500 group-hover:scale-110"
										/>
									)}
									<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
								</div>
								<div className="p-6">
									<div className="text-2xl font-black text-brand-800 mb-3 group-hover:text-brand-900 transition-colors">
										Blog
									</div>
									{featuredBlog?.excerpt ? (
										<p className="text-sm text-gray-600 line-clamp-3 mb-4">
											{featuredBlog.excerpt}
										</p>
									) : (
										<p className="text-sm text-gray-600 mb-4">
											Read our latest stories and updates.
										</p>
									)}
									<span className="inline-flex items-center text-sm font-semibold text-brand-800 group-hover:text-brand-900">
										Read more
										<svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
										</svg>
									</span>
								</div>
							</Link>
							<Link
								href="/interactive-tools"
								className="group bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-white/50 lg:col-span-1"
							>
								<div className="relative h-52 overflow-hidden">
									<Image
										src="/images/interactive_tools_noas_place_halifax_primary_school.jpg"
										alt="Interactive Tools - Helpful tools for families"
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
								</div>
								<div className="p-6">
									<div className="text-2xl font-black text-brand-800 mb-3 group-hover:text-brand-900 transition-colors">Interactive Tools</div>
									<p className="text-sm text-gray-600 mb-3">
										Safety plans, sensory profiles, transition planning and more free resources designed with neurodivergent families in mind.
									</p>
									<span className="inline-flex items-center text-sm font-semibold text-brand-800 group-hover:text-brand-900">
										Try our tools
										<svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
										</svg>
									</span>
								</div>
							</Link>
							<Link
								href="#dreamboard"
								className="group bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-white/50 lg:col-span-1"
							>
								<div className="relative h-52 overflow-hidden">
									<Image
										src="/dreamboard/indoor_playground.jpg"
										alt="Our Dreamboard - See our vision"
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
								</div>
								<div className="p-6">
									<div className="text-2xl font-black text-brand-800 mb-3 group-hover:text-brand-900 transition-colors">Our Dreamboard</div>
									<p className="text-sm text-gray-600 mb-3">
										Our vision for an inclusive community hub in West Yorkshire — sensory rooms, safe play spaces and a welcoming place for every family.
									</p>
									<span className="inline-flex items-center text-sm font-semibold text-brand-800 group-hover:text-brand-900">
										See our vision
										<svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
										</svg>
									</span>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Smooth Scrolling Animated Container */}
			<div ref={scrollContainerRef} className="relative">
				{/* Scroll Progress Indicator */}
				<ScrollProgressIndicator scrollYProgress={scrollYProgress} />

				{/* Welcome to Noa's Place Section */}
				<AnimatedScrollSection>
					<motion.section 
						style={{ y: welcomeY }}
						className="relative bg-gradient-to-b from-white via-brand-50/30 to-white py-28 overflow-hidden"
					>
						<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent"></div>
						<div className="mx-auto max-w-7xl px-6">
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
								{/* Left: text */}
								<div className="text-left order-2 lg:order-1">
									<motion.h2 
										initial={{ opacity: 0, scale: 0.9 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{ once: true, margin: "-100px" }}
										transition={{ duration: 0.6, ease: "easeOut" }}
										className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-ink mb-6 tracking-tight"
									>
										Welcome to Noa's Place
									</motion.h2>
									<motion.p 
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, margin: "-100px" }}
										transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
										className="text-xl sm:text-2xl text-ink/70 leading-relaxed"
									>
										We’re developing a new community hub in Halifax, West Yorkshire, designed specifically for the SEND community. Our mission is to provide a welcoming, sensory-aware environment where families can finally feel they belong.
									</motion.p>
								</div>
								{/* Right: video */}
								<motion.div
									initial={{ opacity: 0, y: 24 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-100px" }}
									transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
									className="order-1 lg:order-2"
								>
									<div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/50 bg-black">
										<video
											src="https://pub-c8d04e15fd394bb18ba7c7e5f0129c6b.r2.dev/The%20Story%20Behind%20Noa%E2%80%99s%20Place%20_%20A%20New%20Hope%20for%20Families%20with%20SEND.mp4"
											controls
											playsInline
											className="w-full h-full object-contain"
											aria-label="The Story Behind Noa's Place - A New Hope for Families with SEND"
										>
											Your browser does not support the video tag.
										</video>
									</div>
								</motion.div>
							</div>
						</div>
					</motion.section>
				</AnimatedScrollSection>

				{/* Image Gallery - Dreamboard */}
				<AnimatedScrollSection>
					<motion.section 
						id="dreamboard"
						style={{ y: dreamboardY }}
						className="relative overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-white py-28"
					>
						{/* Section divider */}
						<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent"></div>
						
						<div className="mx-auto max-w-7xl px-6">
							<motion.div 
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-100px" }}
								transition={{ duration: 0.6, ease: "easeOut" }}
								className="text-center mb-16"
							>
								<motion.h2 
									initial={{ opacity: 0, scale: 0.9 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, ease: "easeOut" }}
									className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-ink mb-6 tracking-tight"
								>
									Our Dreamboard
								</motion.h2>
								<motion.p 
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
									className="mx-auto max-w-3xl text-xl text-ink/70 leading-relaxed mb-4"
								>
									This is what we imagine Noa's Place will look like - a calm, welcoming space where every family can simply be themselves and shine.
								</motion.p>
								<motion.p 
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
									className="mx-auto max-w-2xl text-base text-brand-800 flex items-center justify-center gap-2 font-medium"
								>
									<svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<path d="M21 2H3v16h5v4l4-4h5l4-4V2zM12 7v4M12 15h.01" />
									</svg>
									Click any space to learn more about it
								</motion.p>
							</motion.div>

							{/* Progress tracker - compact interactive stepper */}
							<motion.div
								id="journey"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-50px" }}
								transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
								className="mb-10"
							>
								<div className="rounded-2xl border border-brand-200 bg-white/80 backdrop-blur-sm p-5 sm:p-6 shadow-lg">
									<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
										<h3 className="text-lg font-bold text-ink">Where we are on the journey</h3>
										<p className="text-sm text-ink/70">{completedJourneySteps} of {journeySteps.length} completed</p>
									</div>

									<div className="h-2 w-full rounded-full bg-gray-200 mb-4 overflow-hidden" role="progressbar" aria-valuenow={completedJourneySteps} aria-valuemin={0} aria-valuemax={journeySteps.length} aria-label="Journey progress">
										<div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${(completedJourneySteps / journeySteps.length) * 100}%` }} />
									</div>

									<div className="flex gap-2 overflow-x-auto pb-2 mb-4">
										{journeySteps.map((item) => (
											<button
												key={item.step}
												type="button"
												onClick={() => setSelectedJourneyStep(item.step)}
												aria-pressed={selectedJourneyStep === item.step}
												className={`shrink-0 inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-colors ${
													selectedJourneyStep === item.step
														? "border-brand-700 bg-brand-800 text-white"
														: "border-brand-200 bg-white text-ink hover:bg-brand-50"
												}`}
											>
												<span
													className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
														item.status === "done"
															? "bg-green-500 text-white"
															: item.status === "progress"
															? "bg-amber-400 text-amber-900"
															: item.status === "next"
															? "bg-blue-300 text-blue-900"
															: "bg-gray-200 text-gray-600"
													}`}
												>
													{item.status === "done" ? "✓" : item.step}
												</span>
												<span>Step {item.step}</span>
											</button>
										))}
									</div>

									<div className="rounded-xl border border-brand-100 bg-brand-50/50 p-4">
										<p className="text-xs uppercase tracking-wide text-ink/60 mb-1">{activeJourneyStep.label}</p>
										<p className="text-base sm:text-lg font-semibold text-ink">{activeJourneyStep.title}</p>
										<p className="mt-1 text-sm sm:text-base text-ink/80 leading-relaxed">{activeJourneyStep.text}</p>
									</div>
								</div>
							</motion.div>

							<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
								{spaces.map((space, index) => (
									<motion.button
										key={space.id}
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, margin: "-50px" }}
										transition={{ 
											duration: 0.6, 
											delay: index * 0.08, 
											ease: [0.16, 1, 0.3, 1] 
										}}
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
					</motion.section>
				</AnimatedScrollSection>

				{/* Three Year Strategic Plan */}
				<AnimatedScrollSection>
					<motion.section 
						className="relative bg-gradient-to-b from-white via-brand-50/30 to-white py-28 overflow-hidden"
					>
						<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent"></div>
						<div className="mx-auto max-w-4xl px-6">
							<motion.div 
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-100px" }}
								transition={{ duration: 0.6, ease: "easeOut" }}
								className="text-center"
							>
								<motion.h2 
									initial={{ opacity: 0, scale: 0.9 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, ease: "easeOut" }}
									className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-ink mb-6 tracking-tight"
								>
									Our Three Year Strategic Plan
								</motion.h2>
								<motion.p 
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
									className="mx-auto max-w-3xl text-xl text-ink/70 leading-relaxed mb-6"
								>
									We are currently in year one of our roadmap. Our strategic plan sets out our vision for the next three years. How we plan to grow, expand our services, and create a meaningful impact in our community.
								</motion.p>
								<motion.div 
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
								>
									<Link
										href="/plans"
										className="inline-flex items-center justify-center rounded-xl bg-brand-800 px-8 py-4 text-lg font-bold text-white shadow-md hover:bg-brand-900 hover:shadow-lg transition-all duration-300"
									>
										View Our Three Year Strategic Plan
										<svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
											<path d="m9 18 6-6-6-6"/>
										</svg>
									</Link>
								</motion.div>
							</motion.div>
						</div>
					</motion.section>
				</AnimatedScrollSection>
			</div>

			{/* Video Modal */}
			{showVideoModal && (
				<div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
					<div className="relative w-full max-w-5xl">
						<button
							onClick={() => setShowVideoModal(false)}
							className="absolute -top-14 right-0 text-white hover:text-gray-300 transition-all duration-300 hover:scale-110 bg-white/10 backdrop-blur-sm rounded-full p-2"
							aria-label="Close video"
						>
							<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
								<path d="M18 6L6 18M6 6l12 12"/>
							</svg>
						</button>
						<div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/20">
							<iframe
								title="The Story Behind Noa's Place"
								className="absolute inset-0 h-full w-full"
								src="https://www.youtube.com/embed/8hlXxMlXsyo?rel=0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								referrerPolicy="strict-origin-when-cross-origin"
								allowFullScreen
							/>
						</div>
					</div>
				</div>
			)}





			

			

			{/* Press Coverage Section */}
			<section className="relative py-10 border-t border-brand-100 bg-white">
				<div className="mx-auto max-w-5xl px-6">
					<p className="text-center text-xs font-medium uppercase tracking-wider text-ink/60 mb-8">
						As featured on
					</p>
					<div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-70 hover:opacity-100 transition-opacity duration-300">
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
								className="h-full w-auto object-contain filter grayscale"
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
								className="h-full w-auto object-contain filter grayscale"
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
								className="h-full w-auto object-contain filter grayscale"
							/>
						</a>
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
								className="h-full w-auto object-contain filter grayscale"
							/>
						</a>
					</div>
				</div>
			</section>

			{/* Call to Action Section */}
			<section className="bg-gradient-to-br from-brand-800 via-brand-900 to-purple-900 py-24 text-white">
				<div className="mx-auto max-w-4xl px-6 text-center">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
						Please help us make Noa&apos;s Place a reality
					</h2>
					<p className="text-xl text-white/90 mb-8 leading-relaxed">
						Together, we can create a community where every family feels supported, seen, and valued. <strong>Your support makes a difference.</strong>
					</p>
					<div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
						<button
							onClick={() => setShowMailchimpPopup(true)}
							className="inline-flex items-center justify-center rounded-lg bg-[#FFB800] px-5 py-2.5 text-sm font-bold text-ink shadow-md hover:bg-[#ffc533] hover:scale-105 transition duration-200"
						>
							Support Our Vision
							<svg className="ml-1.5 size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
								<path d="M5 12h14M12 5l7 7-7 7"/>
							</svg>
						</button>
						<Link
							href="/contact"
							className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/10 hover:border-white/50 transition duration-200"
						>
							Get in Touch
							<svg className="ml-1.5 size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
								<path d="M4 4h16v16H4z"/>
								<path d="m22 6-10 7L2 6"/>
							</svg>
						</Link>
						<a
							href="mailto:hello@noasplace.org.uk?subject=Partnership%20enquiry%20-%20Noa%27s%20Place&body=Hello%2C%0A%0AWe%20would%20like%20to%20explore%20partnering%20with%20Noa%27s%20Place.%0A%0AOrganisation%20name%3A%0A%0AHow%20we%27d%20like%20to%20partner%3A%0A%0AContact%20details%3A"
							className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/10 hover:border-white/50 transition duration-200"
						>
							Partner with us
							<svg className="ml-1.5 size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
								<path d="m22 6-10 7L2 6"/>
							</svg>
						</a>
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
