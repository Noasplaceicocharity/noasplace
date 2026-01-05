"use client";

import DownloadResource from "@/components/DownloadResource";
import Faq from "@/components/Faq";
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
  const visionY = useTransform(scrollYProgress, [0.15, 0.35], [0, -20]);
  const missionY = useTransform(scrollYProgress, [0.25, 0.45], [0, -20]);
  const valuesY = useTransform(scrollYProgress, [0.35, 0.55], [0, -15]);
  const dreamboardY = useTransform(scrollYProgress, [0.45, 0.65], [0, -25]);
  const planY = useTransform(scrollYProgress, [0.55, 0.75], [0, -20]);

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

				<div className="relative px-6 pt-24 pb-20 sm:pt-32 sm:pb-24 z-20">
					<div className="mx-auto max-w-7xl">
						{/* "As seen on" badge */}
						<div className="mb-10 animate-fade-in">
							<a 
								href="https://www.bbc.co.uk/news/articles/c5yq4xx2yp2o"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm border border-purple-200/50 hover:bg-white hover:shadow-md hover:scale-105 transition-all duration-300"
							>
								<div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
								<span className="text-sm font-semibold text-gray-700">As seen on BBC News</span>
							</a>
						</div>

						{/* Main content grid */}
						<div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-center">
							{/* Left side - Text and buttons */}
							<div className="lg:col-span-2 space-y-8 animate-fade-in">
								<h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight">
									Together we make space for every family to{" "}
									<span className="animate-shine">shine</span>
								</h1>
								
								<p className="text-xl sm:text-2xl text-gray-700 leading-relaxed max-w-2xl">
									We create welcoming spaces where neurodivergent and disabled individuals and families find understanding, connection, and community. You're welcome exactly as you are.
								</p>

								{/* Buttons */}
								<div className="flex flex-col sm:flex-row gap-4 pt-2">
									<button
										onClick={() => setShowMailchimpPopup(true)}
										className="inline-flex items-center justify-center rounded-xl bg-brand-800 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-brand-900 hover:shadow-xl hover:scale-105 transition-all duration-300"
									>
										Support Us
										<svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
										</svg>
									</button>
									<button
										onClick={() => setShowVideoModal(true)}
										className="inline-flex items-center justify-center rounded-xl bg-white border-2 border-brand-800 px-8 py-4 text-base font-bold text-brand-800 shadow-md hover:bg-brand-50 hover:shadow-lg hover:scale-105 transition-all duration-300"
									>
										<svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
											<path d="M8 5v14l11-7z"/>
										</svg>
										Watch our story
									</button>
									<Link
										href="/interactive-tools"
										className="inline-flex items-center justify-center rounded-xl bg-[#FFB800] px-8 py-4 text-base font-bold text-gray-900 shadow-lg hover:bg-[#ffc533] hover:shadow-xl hover:scale-105 transition-all duration-300"
									>
										Try interactive tools
										<svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
										</svg>
									</Link>
								</div>
							</div>

					{/* Right side - Image */}
					<div className="relative lg:mt-0">
						<div className="relative w-full h-[500px] lg:h-[600px] overflow-visible">
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

						{/* Navigation cards */}
						<div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							<button
								onClick={() => setShowMailchimpPopup(true)}
								className="group bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-white/50 text-left"
							>
								<div className="relative h-40 overflow-hidden">
									<Image
										src="/images/family_photo_halifax_west_yorkshire.jpg"
										alt="Support Us - Help us make this dream a reality"
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
								</div>
								<div className="p-6">
									<div className="text-2xl font-black text-brand-800 mb-2 group-hover:text-brand-900 transition-colors">Support Us</div>
									<div className="text-sm font-medium text-gray-600">Help us make this dream a reality</div>
								</div>
							</button>
							<Link
								href="/blog"
								className="group bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-white/50"
							>
								<div className="relative h-40 overflow-hidden">
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
									<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
								</div>
								{/* Container for the content sections */}
								<div className="relative overflow-hidden">
									{/* White content section that lifts on hover */}
									<div className="p-6 bg-white/90 backdrop-blur-md group-hover:-translate-y-full transition-transform duration-300 ease-out relative z-10">
										<div className="text-2xl font-black text-brand-800 mb-2 group-hover:text-brand-900 transition-colors">
											Blog
										</div>
										<div className="text-sm font-medium text-gray-600">
											Read our latest blog
										</div>
									</div>
									{/* Hidden title that appears on hover */}
									{featuredBlog?.title && (
										<div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-md transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
											<div className="text-sm font-medium text-gray-600 line-clamp-2">
												{featuredBlog.title}
											</div>
										</div>
									)}
								</div>
							</Link>
							<Link
								href="/interactive-tools"
								className="group bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-white/50"
							>
								<div className="relative h-40 overflow-hidden">
									<Image
										src="/images/interactive_tools_noas_place_halifax_primary_school.jpg"
										alt="Interactive Tools - Helpful tools for families"
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
								</div>
								<div className="p-6">
									<div className="text-2xl font-black text-brand-800 mb-2 group-hover:text-brand-900 transition-colors">Interactive Tools</div>
									<div className="text-sm font-medium text-gray-600">Try our helpful tools</div>
								</div>
							</Link>
							<Link
								href="#dreamboard"
								className="group bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-white/50"
							>
								<div className="relative h-40 overflow-hidden">
									<Image
										src="/dreamboard/indoor_playground.jpg"
										alt="Our Dreamboard - See our vision"
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
								</div>
								<div className="p-6">
									<div className="text-2xl font-black text-brand-800 mb-2 group-hover:text-brand-900 transition-colors">Our Dreamboard</div>
									<div className="text-sm font-medium text-gray-600">See our vision</div>
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
							<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
								{/* Text Content */}
								<div className="text-center lg:text-left">
									<motion.h2 
										initial={{ opacity: 0, scale: 0.9 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{ once: true, margin: "-100px" }}
										transition={{ duration: 0.6, ease: "easeOut" }}
										className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-ink mb-8 tracking-tight"
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
										We're building a new, inclusive community hub in Halifax, West Yorkshire, designed specifically for neurodivergent and disabled individuals and families. Our mission is to create calm, welcoming spaces where everyone can feel understood, connected, and truly at home.
									</motion.p>
								</div>
								
								{/* Family Photo */}
								<motion.div
									initial={{ opacity: 0, x: 30 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true, margin: "-100px" }}
									transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
									className="relative"
								>
									<div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/50">
										<Image
											src="/images/family_photo_halifax_west_yorkshire.jpg"
											alt="Family at Noa's Place - A welcoming community for neurodivergent and disabled individuals and families"
											fill
											className="object-cover"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
									</div>
								</motion.div>
							</div>
						</div>
					</motion.section>
				</AnimatedScrollSection>

				{/* Vision & Mission Section */}
				<AnimatedScrollSection>
					<motion.section 
						style={{ y: visionY }}
						className="relative bg-gradient-to-b from-white via-brand-50/40 to-white py-32 overflow-hidden"
					>
						{/* Decorative background elements */}
						<div className="absolute inset-0 overflow-hidden pointer-events-none">
							<div className="absolute top-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
							<div className="absolute bottom-20 left-10 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
							<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-200/10 rounded-full blur-3xl"></div>
						</div>
						
						<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent"></div>
						<div className="relative mx-auto max-w-7xl px-6">
							{/* Vision & Mission Combined */}
							<div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-24">
								{/* Vision */}
								<motion.div 
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-100px" }}
									transition={{ duration: 0.6, ease: "easeOut" }}
									whileHover={{ y: -8 }}
									className="group relative flex flex-col p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-white via-purple-50/50 to-pink-50/50 backdrop-blur-sm border-2 border-purple-100/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
								>
									{/* Decorative corner accent */}
									<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-transparent rounded-bl-full"></div>
									<div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-400/20 to-transparent rounded-tr-full"></div>
									
									<div className="relative z-10">
										<motion.div 
											initial={{ scale: 0, rotate: -180 }}
											whileInView={{ scale: 1, rotate: 0 }}
											viewport={{ once: true }}
											transition={{ duration: 0.5, type: "spring" }}
											className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300"
										>
											<svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
											</svg>
										</motion.div>
										<motion.h2 
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true, margin: "-100px" }}
											transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
											className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-800 mb-6 tracking-tight"
										>
											Our Vision
										</motion.h2>
										<motion.p 
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true, margin: "-100px" }}
											transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
											className="text-xl text-ink/80 leading-relaxed font-medium"
										>
											We create welcoming spaces where neurodivergent and disabled individuals and families find understanding, connection, and community. You're welcome exactly as you are. This is a place where everyone can simply be themselves and shine.
										</motion.p>
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
									{/* Decorative corner accent */}
									<div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-brand-400/20 to-transparent rounded-br-full"></div>
									<div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-yellow-400/20 to-transparent rounded-tl-full"></div>
									
									<div className="relative z-10">
										<motion.div 
											initial={{ scale: 0, rotate: -180 }}
											whileInView={{ scale: 1, rotate: 0 }}
											viewport={{ once: true }}
											transition={{ duration: 0.5, type: "spring", delay: 0.1 }}
											className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300"
										>
											<svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
										</motion.div>
										<motion.h2 
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true, margin: "-100px" }}
											transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
											className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-800 mb-6 tracking-tight"
										>
											Our Mission
										</motion.h2>
										<motion.p 
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true, margin: "-100px" }}
											transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
											className="text-xl text-ink/80 leading-relaxed font-medium"
										>
											Our mission is to create calm, inclusive, and sensory aware spaces thoughtfully designed for neurodivergent and disabled individuals and families. We listen, we understand, and we respond with kindness, building a supportive community where no one is ever left to face challenges alone.
										</motion.p>
									</div>
								</motion.div>
							</div>

							{/* Values */}
							<motion.div 
								style={{ y: valuesY }}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-100px" }}
								transition={{ duration: 0.6, ease: "easeOut" }}
								className="text-center"
							>
								<motion.div 
									initial={{ scale: 0, rotate: -180 }}
									whileInView={{ scale: 1, rotate: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, type: "spring" }}
									className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 mb-6 shadow-lg"
								>
									<svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
									</svg>
								</motion.div>
								<motion.h2 
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-100px" }}
									transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
									className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-800 mb-6 tracking-tight"
								>
									Our Values
								</motion.h2>
								<motion.p 
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-100px" }}
									transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
									className="mx-auto max-w-2xl text-xl text-ink/80 font-medium mb-16"
								>
									These values guide everything we do and shape how we support families.
								</motion.p>
								<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
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
											className="group relative flex flex-col items-center p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-white via-brand-50/50 to-white backdrop-blur-sm border-2 border-brand-100/30 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
										>
											{/* Decorative corner accent */}
											<div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-brand-300/20 to-transparent rounded-bl-full"></div>
											<div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-brand-200/20 to-transparent rounded-tr-full"></div>
											
											<div className="relative z-10 flex flex-col items-center">
												<motion.div 
													className="relative w-28 h-28 mb-6"
													whileHover={{ scale: 1.1, rotate: 5 }}
													transition={{ type: "spring", stiffness: 300 }}
												>
													<Image
														src={value.image}
														alt={value.name}
														fill
														className="object-contain"
													/>
												</motion.div>
												<h3 className="text-xl font-bold text-brand-800 mb-3">{value.name}</h3>
												<p className="text-sm text-ink/70 text-center leading-relaxed">
													{value.description}
												</p>
											</div>
										</motion.div>
									))}
								</div>
							</motion.div>
						</div>
					</motion.section>
				</AnimatedScrollSection>

				{/* Support Us Section */}
				<AnimatedScrollSection>
					<motion.section 
						className="relative bg-gradient-to-b from-white via-brand-50/60 to-white py-28 overflow-hidden"
					>
						{/* Subtle decorative background elements */}
						<div className="absolute inset-0 overflow-hidden pointer-events-none">
							<div className="absolute top-20 right-10 w-72 h-72 bg-purple-200/15 rounded-full blur-3xl"></div>
							<div className="absolute bottom-20 left-10 w-96 h-96 bg-yellow-200/15 rounded-full blur-3xl"></div>
						</div>
						
						<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent"></div>
						<div className="relative mx-auto max-w-5xl px-6">
							<motion.div 
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-100px" }}
								transition={{ duration: 0.6, ease: "easeOut" }}
								className="text-center mb-12"
							>
								<motion.div 
									initial={{ scale: 0, rotate: -180 }}
									whileInView={{ scale: 1, rotate: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, type: "spring" }}
									className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 mb-6 shadow-lg"
								>
									<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
									</svg>
								</motion.div>
								
								<motion.h2 
									initial={{ opacity: 0, scale: 0.9 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, ease: "easeOut" }}
									className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-800 mb-6 tracking-tight"
								>
									Help Us Make This Dream A Reality
								</motion.h2>
								
								<motion.p 
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
									className="mx-auto max-w-3xl text-xl text-ink/70 leading-relaxed mb-8"
								>
									Join our community and help us build an inclusive hub where every family feels supported, seen, and valued.
								</motion.p>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-100px" }}
								transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
								className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border-2 border-brand-100/50"
							>
								<MailchimpSubscribeForm />
							</motion.div>

							<motion.div 
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
								className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
							>
								<Link
									href="/plans"
									className="inline-flex items-center justify-center rounded-lg bg-brand-800 px-6 py-3 text-base font-semibold text-white shadow-md hover:bg-brand-900 transition-colors duration-200"
								>
									View Our Three Year Plan
									<svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<path d="M5 12h14M12 5l7 7-7 7"/>
									</svg>
								</Link>
								<Link
									href="/about#trustees"
									className="inline-flex items-center justify-center rounded-lg border-2 border-brand-800 px-6 py-3 text-base font-semibold text-brand-800 hover:bg-brand-50 transition-colors duration-200"
								>
									Meet the Trustees
									<svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
										<circle cx="9" cy="7" r="4"/>
										<path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
									</svg>
								</Link>
							</motion.div>
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

				{/* Three Year Strategy Plan - Featured Section */}
				<AnimatedScrollSection>
					<motion.section 
						style={{ y: planY }}
						className="relative bg-gradient-to-br from-brand-800 via-brand-900 to-purple-900 py-32 overflow-hidden"
					>
						{/* Decorative background elements */}
						<div className="absolute inset-0 overflow-hidden pointer-events-none">
							<motion.div 
								animate={{ 
									scale: [1, 1.2, 1],
									opacity: [0.1, 0.15, 0.1]
								}}
								transition={{ 
									duration: 8,
									repeat: Infinity,
									ease: "easeInOut"
								}}
								className="absolute top-10 right-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"
							/>
							<motion.div 
								animate={{ 
									scale: [1, 1.1, 1],
									opacity: [0.1, 0.12, 0.1]
								}}
								transition={{ 
									duration: 6,
									repeat: Infinity,
									ease: "easeInOut",
									delay: 1
								}}
								className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-pink-400/10 rounded-full blur-3xl"
							/>
							<motion.div 
								animate={{ 
									scale: [1, 1.15, 1],
									opacity: [0.05, 0.08, 0.05]
								}}
								transition={{ 
									duration: 10,
									repeat: Infinity,
									ease: "easeInOut",
									delay: 2
								}}
								className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"
							/>
						</div>

						<div className="relative mx-auto max-w-6xl px-6">
							<motion.div 
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-100px" }}
								transition={{ duration: 0.6, ease: "easeOut" }}
								className="text-center"
							>
								<motion.div 
									initial={{ scale: 0, rotate: -180 }}
									whileInView={{ scale: 1, rotate: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
									className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-sm mb-8 border-2 border-white/20"
								>
									<svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
									</svg>
								</motion.div>
								
								<motion.h2 
									initial={{ opacity: 0, y: 20, scale: 0.95 }}
									whileInView={{ opacity: 1, y: 0, scale: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
									className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight"
								>
									Our Three Year Strategic Plan
								</motion.h2>
								<motion.p 
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
									className="mx-auto max-w-3xl text-2xl text-white/90 leading-relaxed mb-12 font-medium"
								>
									Discover our vision for the next three years. See how we're planning to grow, expand our services, and create a meaningful impact in our community.
								</motion.p>
								<motion.div 
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
									className="flex flex-col sm:flex-row items-center justify-center gap-4"
								>
									<motion.div
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.95 }}
									>
										<Link
											href="/plans"
											className="inline-flex items-center justify-center rounded-xl bg-[#FFB800] px-12 py-6 text-xl font-bold text-ink shadow-2xl hover:bg-[#ffc533] hover:shadow-3xl transition-all duration-300"
										>
											View Our Three Year Strategic Plan
											<svg className="ml-3 size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
												<path d="m9 18 6-6-6-6"/>
											</svg>
										</Link>
									</motion.div>
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





			

			

			{/* Free Resource Section */}
			<section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-50/40 to-white py-28">
				<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent"></div>
				<div className="mx-auto max-w-5xl px-6">
					<DownloadResource />
				</div>
			</section>

			{/* Interactive Tools Section */}
			<section className="relative bg-gradient-to-b from-brand-50/30 via-white to-white py-28">
				<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent"></div>
				<div className="mx-auto max-w-7xl px-6">
					<div className="text-center mb-20">
						<h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-ink mb-6 tracking-tight">
							Interactive Tools
						</h2>
						<p className="mx-auto max-w-3xl text-xl text-ink/70 leading-relaxed">
							Supportive tools designed for children, teens, and adults. Create profiles, manage transitions, and develop coping strategies that work for you.
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						{/* Children Tools */}
						<div className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-2 border-transparent hover:border-brand-200">
							<div className="relative h-96 overflow-hidden">
								<Image
									src="/images/interactive_tools_noas_place_halifax_primary_school.jpg"
									alt="Primary school children engaged in learning activities at Noa's Place Halifax"
									fill
									className="object-cover transition-transform duration-700 group-hover:scale-110"
									sizes="(max-width: 768px) 100vw, 33vw"
								/>
								<div className="absolute inset-0 bg-gradient-to-br from-blue-600/85 to-cyan-600/85"></div>
								<div className="absolute inset-0 bg-black/10"></div>
							</div>
							
							<div className="absolute inset-0 flex items-center justify-center p-8">
								<div className="text-center text-white">
									<div className="inline-flex items-center justify-center w-16 h-16 bg-white/25 backdrop-blur-md rounded-2xl mb-6 border border-white/30 group-hover:scale-110 transition-transform duration-300">
										<svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<circle cx="12" cy="6" r="3"/>
											<path d="M12 9v12"/>
											<path d="M8 14l8 0"/>
											<path d="M10 21l4 0"/>
											<path d="M9 12l6 0"/>
										</svg>
									</div>
									<h3 className="text-2xl font-bold mb-3 drop-shadow-lg">For Children</h3>
									<p className="text-sm drop-shadow-md mb-6 font-medium">Primary School Age (4-11 years)</p>
									<div className="space-y-2 text-sm drop-shadow-md mb-6 text-left max-w-xs mx-auto">
										<div className="flex items-center gap-2">
											<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
											All About Me profiles
										</div>
										<div className="flex items-center gap-2">
											<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
											Feelings & coping tools
										</div>
										<div className="flex items-center gap-2">
											<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
											Sensory support guides
										</div>
									</div>
									<Link
										href="/interactive-tools?age=children"
										className="inline-flex items-center justify-center bg-white/25 backdrop-blur-md px-6 py-3 rounded-xl text-sm font-bold text-white border-2 border-white/40 hover:bg-white/35 hover:scale-105 transition-all duration-300"
									>
										View Tools
										<svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
											<path d="m9 18 6-6-6-6"/>
										</svg>
									</Link>
								</div>
							</div>
						</div>

						{/* Teens Tools */}
						<div className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-2 border-transparent hover:border-brand-200">
							<div className="relative h-96 overflow-hidden">
								<Image
									src="/images/interactive_tools_noas_place_halifax_secondary_school.jpg"
									alt="Secondary school teenagers participating in interactive activities at Noa's Place Halifax"
									fill
									className="object-cover transition-transform duration-700 group-hover:scale-110"
									sizes="(max-width: 768px) 100vw, 33vw"
								/>
								<div className="absolute inset-0 bg-gradient-to-br from-purple-600/85 to-pink-600/85"></div>
								<div className="absolute inset-0 bg-black/10"></div>
							</div>
							
							<div className="absolute inset-0 flex items-center justify-center p-8">
								<div className="text-center text-white">
									<div className="inline-flex items-center justify-center w-16 h-16 bg-white/25 backdrop-blur-md rounded-2xl mb-6 border border-white/30 group-hover:scale-110 transition-transform duration-300">
										<svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
											<circle cx="9" cy="7" r="4"/>
											<path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
											<path d="M16 3.13a4 4 0 0 1 0 7.75"/>
										</svg>
									</div>
									<h3 className="text-2xl font-bold mb-3 drop-shadow-lg">For Teens</h3>
									<p className="text-sm drop-shadow-md mb-6 font-medium">Secondary School Age (11-18 years)</p>
									<div className="space-y-2 text-sm drop-shadow-md mb-6 text-left max-w-xs mx-auto">
										<div className="flex items-center gap-2">
											<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
											Transition planning
										</div>
										<div className="flex items-center gap-2">
											<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
											Bullying support
										</div>
										<div className="flex items-center gap-2">
											<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
											Sensory profiles
										</div>
									</div>
									<Link
										href="/interactive-tools?age=teens"
										className="inline-flex items-center justify-center bg-white/25 backdrop-blur-md px-6 py-3 rounded-xl text-sm font-bold text-white border-2 border-white/40 hover:bg-white/35 hover:scale-105 transition-all duration-300"
									>
										View Tools
										<svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
											<path d="m9 18 6-6-6-6"/>
										</svg>
									</Link>
								</div>
							</div>
						</div>

						{/* Adults Tools */}
						<div className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-2 border-transparent hover:border-brand-200">
							<div className="relative h-96 overflow-hidden">
								<Image
									src="/images/interactive_tools_noas_place_halifax_adults.jpg"
									alt="Adults with additional needs using interactive tools and resources at Noa's Place Halifax"
									fill
									className="object-cover transition-transform duration-700 group-hover:scale-110"
									sizes="(max-width: 768px) 100vw, 33vw"
								/>
								<div className="absolute inset-0 bg-gradient-to-br from-green-600/85 to-emerald-600/85"></div>
								<div className="absolute inset-0 bg-black/10"></div>
							</div>
							
							<div className="absolute inset-0 flex items-center justify-center p-8">
								<div className="text-center text-white">
									<div className="inline-flex items-center justify-center w-16 h-16 bg-white/25 backdrop-blur-md rounded-2xl mb-6 border border-white/30 group-hover:scale-110 transition-transform duration-300">
										<svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
											<circle cx="12" cy="7" r="4"/>
										</svg>
									</div>
									<h3 className="text-2xl font-bold mb-3 drop-shadow-lg">For Adults</h3>
									<p className="text-sm drop-shadow-md mb-6 font-medium">Adults of All Ages (18+ years)</p>
									<div className="space-y-2 text-sm drop-shadow-md mb-6 text-left max-w-xs mx-auto">
										<div className="flex items-center gap-2">
											<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
											Healthcare profiles
										</div>
										<div className="flex items-center gap-2">
											<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
											Safety planning
										</div>
										<div className="flex items-center gap-2">
											<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
											Life transitions
										</div>
									</div>
									<Link
										href="/interactive-tools?age=adults"
										className="inline-flex items-center justify-center bg-white/25 backdrop-blur-md px-6 py-3 rounded-xl text-sm font-bold text-white border-2 border-white/40 hover:bg-white/35 hover:scale-105 transition-all duration-300"
									>
										View Tools
										<svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
											<path d="m9 18 6-6-6-6"/>
										</svg>
									</Link>
								</div>
							</div>
						</div>
					</div>

					<div className="text-center mt-16">
						<Link
							href="/interactive-tools"
							className="inline-flex items-center justify-center rounded-xl bg-[#FFB800] px-10 py-5 text-lg font-bold text-ink shadow-xl hover:bg-[#ffc533] hover:shadow-2xl hover:scale-105 transition-all duration-300"
						>
							Explore All Tools
							<svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
								<path d="m9 18 6-6-6-6"/>
							</svg>
						</Link>
					</div>
				</div>
			</section>

			{/* Press Coverage Section */}
			<section className="relative py-20 bg-gradient-to-b from-brand-50/30 to-white">
				<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent"></div>
				<div className="mx-auto max-w-5xl px-6">
					<div className="text-center mb-12">
						<div className="inline-flex items-center gap-3 text-base font-semibold text-brand-800 mb-6 px-4 py-2 bg-brand-100/50 rounded-full">
							<div className="w-2 h-2 bg-brand-600 rounded-full animate-pulse"></div>
							As featured on
						</div>
					</div>
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
