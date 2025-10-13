"use client";

import DownloadResource from "@/components/DownloadResource";
import Faq from "@/components/Faq";
import ImageModal from "@/components/ImageModal";
import MailchimpSubscribeForm from "@/components/MailchimpSubscribeForm";
import Squiggle from "@/components/Squiggle";
import StickerCard from "@/components/StickerCard";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [selectedSpace, setSelectedSpace] = useState<{
    id: string;
    image: { src: string; alt: string };
    title: string;
    description: string;
    features: string[];
  } | null>(null);
  
  const [showVideoModal, setShowVideoModal] = useState(false);

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
			<section className="relative min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100 overflow-hidden">

				<div className="relative px-6 pt-16 pb-16 sm:pt-20">
					<div className="mx-auto max-w-7xl">
						{/* "As seen on" badge */}
						<div className="mb-8">
						<a 
							href="https://www.bbc.co.uk/news/articles/c5yq4xx2yp2o"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-purple-200/50 hover:bg-white"
						>
							<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
							<span className="text-sm font-medium text-gray-700">As seen on BBC News</span>
						</a>
						</div>

						{/* Main content grid */}
						<div className="grid lg:grid-cols-3 gap-12 items-center">
							{/* Left side - Text and buttons */}
							<div className="lg:col-span-2 space-y-8">
								<h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
									Building a calm, inclusive hub for families with additional needs
								</h1>
								
								<p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
									Noa's Place exists so no parent has to shout to be heard. Sensory-first spaces, inclusive play, and a calm café for parents and carers.
								</p>

								{/* Buttons */}
								<div className="flex flex-col sm:flex-row gap-3">
									<Link
										href="#register-form"
										className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-6 py-3 text-base font-semibold text-white shadow-md hover:bg-purple-700 hover:shadow-lg transition duration-200"
									>
										Approve our plans
									</Link>
									<button
										onClick={() => setShowVideoModal(true)}
										className="inline-flex items-center justify-center rounded-lg bg-white border border-purple-600 px-6 py-3 text-base font-semibold text-purple-600 shadow-md hover:bg-purple-50 hover:shadow-lg transition duration-200"
									>
										Watch our story
									</button>
									<Link
										href="/interactive-tools"
										className="inline-flex items-center justify-center rounded-lg bg-yellow-400 px-6 py-3 text-base font-semibold text-gray-900 shadow-md hover:bg-yellow-500 hover:shadow-lg transition duration-200"
									>
										Try interactive tools
									</Link>
								</div>
							</div>

							{/* Right side - Video */}
							<div className="relative">
								<div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-gray-200 to-gray-400">
									<div className="absolute top-4 left-4 text-sm text-gray-600 font-medium">
										Parent and child hands in soft light
									</div>
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

						{/* Navigation cards */}
						<div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							<Link
								href="/plans"
								className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
							>
								<div className="relative h-32 overflow-hidden">
									<Image
										src="/images/all in one rooms.jpg"
										alt="Our Plans - Flexible event and activity spaces"
										fill
										className="object-cover transition-transform duration-300 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
								</div>
								<div className="p-6">
									<div className="text-2xl font-black text-purple-600 mb-2">Our Plans</div>
									<div className="text-sm font-medium text-gray-700">View our vision & plans</div>
								</div>
							</Link>
							<Link
								href="/blog"
								className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
							>
								<div className="relative h-32 overflow-hidden">
									<Image
										src="/images/family_photo_halifax_west_yorkshire.jpg"
										alt="Blog - Our latest stories and updates"
										fill
										className="object-cover transition-transform duration-300 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
								</div>
								<div className="p-6">
									<div className="text-2xl font-black text-purple-600 mb-2">Blog</div>
									<div className="text-sm font-medium text-gray-700">Read our latest stories</div>
								</div>
							</Link>
							<Link
								href="/interactive-tools"
								className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
							>
								<div className="relative h-32 overflow-hidden">
									<Image
										src="/images/interactive_tools_noas_place_halifax_primary_school.jpg"
										alt="Interactive Tools - Helpful tools for families"
										fill
										className="object-cover transition-transform duration-300 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
								</div>
								<div className="p-6">
									<div className="text-2xl font-black text-purple-600 mb-2">Interactive Tools</div>
									<div className="text-sm font-medium text-gray-700">Try our helpful tools</div>
								</div>
							</Link>
							<Link
								href="#dreamboard"
								className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
							>
								<div className="relative h-32 overflow-hidden">
									<Image
										src="/images/all play.jpg"
										alt="Our Dreamboard - See our vision"
										fill
										className="object-cover transition-transform duration-300 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
								</div>
								<div className="p-6">
									<div className="text-2xl font-black text-purple-600 mb-2">Our Dreamboard</div>
									<div className="text-sm font-medium text-gray-700">See our vision</div>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Video Modal */}
			{showVideoModal && (
				<div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
					<div className="relative w-full max-w-4xl">
						<button
							onClick={() => setShowVideoModal(false)}
							className="absolute -top-12 right-0 text-white hover:text-gray-300 transition duration-200"
						>
							<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M18 6L6 18M6 6l12 12"/>
							</svg>
						</button>
						<div className="relative aspect-video rounded-2xl overflow-hidden">
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





			

			

			{/* Image Gallery */}
			<section id="dreamboard" className="overflow-hidden bg-white py-24">
				<div className="mx-auto max-w-6xl px-6">
					<h2 className="text-center text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl mb-12">
						Our Dreamboard
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-center text-lg text-ink/80">
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

			{/* Free Resource Section */}
			<section className="overflow-hidden bg-brand-50/30 py-24">
				<div className="mx-auto max-w-4xl px-6">
					<DownloadResource />
				</div>
			</section>

			<section className="bg-brand-50/60 py-16">
				<div className="mx-auto max-w-4xl px-6">
					<div className="space-y-16">
						{/* Vision */}
						<div className="text-center">
							<h2 className="text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl">
								Our Vision
							</h2>
							<h3 className="mx-auto mt-6 max-w-2xl text-2xl font-bold text-brand-800 sm:text-3xl">
								A world where children, adults, and families of every ability can play, learn, and belong — together.
							</h3>
							<p className="mx-auto mt-4 max-w-2xl text-lg text-ink/80">
								At Noa's Place, we dream of a community where no one feels left out, and every family has a safe, welcoming space to grow, connect, and thrive.
							</p>
						</div>

						{/* Mission */}
						<div className="text-center">
							<h2 className="text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl">
								Our Mission
							</h2>
							<p className="mx-auto mt-6 text-lg text-ink/80">
								To create an inclusive community hub that provides:
							</p>
							<div className="mt-8 grid gap-6 sm:grid-cols-2">
								<div className="rounded-2xl bg-white/80 p-6 text-left shadow-sm ring-1 ring-brand-100">
									<h4 className="font-bold text-brand-800">Sensory & Play Spaces</h4>
									<p className="mt-2 text-ink/80">
										Sensory play and soft play spaces designed for neurodivergent and SEND children and adults.
									</p>
								</div>
								<div className="rounded-2xl bg-white/80 p-6 text-left shadow-sm ring-1 ring-brand-100">
									<h4 className="font-bold text-brand-800">Support & Connection</h4>
									<p className="mt-2 text-ink/80">
										Support and connection for families, carers, and the wider community.
									</p>
								</div>
								<div className="rounded-2xl bg-white/80 p-6 text-left shadow-sm ring-1 ring-brand-100">
									<h4 className="font-bold text-brand-800">Accessible Activities</h4>
									<p className="mt-2 text-ink/80">
										Accessible activities for everyone, from play sessions and classes to book clubs and social groups.
									</p>
								</div>
								<div className="rounded-2xl bg-white/80 p-6 text-left shadow-sm ring-1 ring-brand-100">
									<h4 className="font-bold text-brand-800">Hope & Belonging</h4>
									<p className="mt-2 text-ink/80">
										A place of hope and belonging, inspired by Noa's journey, where families never feel alone.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Interactive Tools Section */}
			<section className="bg-white py-24">
				<div className="mx-auto max-w-6xl px-6">
					<div className="text-center mb-16">
						<h2 className="text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl">
							Interactive Tools
						</h2>
						<p className="mx-auto mt-6 max-w-3xl text-lg text-ink/80">
							Empowering tools designed for children, teens, and adults with additional needs. 
							Create profiles, manage transitions, and develop coping strategies.
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						{/* Children Tools */}
						<div className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-102">
							<div className="relative h-80 overflow-hidden">
								<Image
									src="/images/interactive_tools_noas_place_halifax_primary_school.jpg"
									alt="Primary school children engaged in learning activities at Noa's Place Halifax"
									fill
									className="object-cover transition-transform duration-300 group-hover:scale-110"
									sizes="(max-width: 768px) 100vw, 33vw"
								/>
								<div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-80"></div>
								<div className="absolute inset-0 bg-black/20"></div>
							</div>
							
							<div className="absolute inset-0 flex items-center justify-center p-6">
								<div className="text-center text-white w-[240px]">
									<div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full mb-4 border border-white/30">
										<svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<circle cx="12" cy="6" r="3"/>
											<path d="M12 9v12"/>
											<path d="M8 14l8 0"/>
											<path d="M10 21l4 0"/>
											<path d="M9 12l6 0"/>
										</svg>
									</div>
									<h3 className="text-xl font-bold mb-3 drop-shadow-lg">For Children</h3>
									<p className="text-xs drop-shadow-md mb-4">Primary School Age (4-11 years)</p>
									<div className="space-y-1 text-xs drop-shadow-md mb-4">
										<div>• All About Me profiles</div>
										<div>• Feelings & coping tools</div>
										<div>• Sensory support guides</div>
									</div>
									<Link
										href="/interactive-tools?age=children"
										className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-xs font-semibold text-white border border-white/30 hover:bg-white/30 transition duration-200"
									>
										View Tools
										<svg className="ml-1 w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<path d="m9 18 6-6-6-6"/>
										</svg>
									</Link>
								</div>
							</div>
						</div>

						{/* Teens Tools */}
						<div className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-102">
							<div className="relative h-80 overflow-hidden">
								<Image
									src="/images/interactive_tools_noas_place_halifax_secondary_school.jpg"
									alt="Secondary school teenagers participating in interactive activities at Noa's Place Halifax"
									fill
									className="object-cover transition-transform duration-300 group-hover:scale-110"
									sizes="(max-width: 768px) 100vw, 33vw"
								/>
								<div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-80"></div>
								<div className="absolute inset-0 bg-black/20"></div>
							</div>
							
							<div className="absolute inset-0 flex items-center justify-center p-6">
								<div className="text-center text-white w-[240px]">
									<div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full mb-4 border border-white/30">
										<svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
											<circle cx="9" cy="7" r="4"/>
											<path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
											<path d="M16 3.13a4 4 0 0 1 0 7.75"/>
										</svg>
									</div>
									<h3 className="text-xl font-bold mb-3 drop-shadow-lg">For Teens</h3>
									<p className="text-xs drop-shadow-md mb-4">Secondary School Age (11-18 years)</p>
									<div className="space-y-1 text-xs drop-shadow-md mb-4">
										<div>• Transition planning</div>
										<div>• Bullying support</div>
										<div>• Sensory profiles</div>
									</div>
									<Link
										href="/interactive-tools?age=teens"
										className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-xs font-semibold text-white border border-white/30 hover:bg-white/30 transition duration-200"
									>
										View Tools
										<svg className="ml-1 w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<path d="m9 18 6-6-6-6"/>
										</svg>
									</Link>
								</div>
							</div>
						</div>

						{/* Adults Tools */}
						<div className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-102">
							<div className="relative h-80 overflow-hidden">
								<Image
									src="/images/interactive_tools_noas_place_halifax_adults.jpg"
									alt="Adults with additional needs using interactive tools and resources at Noa's Place Halifax"
									fill
									className="object-cover transition-transform duration-300 group-hover:scale-110"
									sizes="(max-width: 768px) 100vw, 33vw"
								/>
								<div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-80"></div>
								<div className="absolute inset-0 bg-black/20"></div>
							</div>
							
							<div className="absolute inset-0 flex items-center justify-center p-6">
								<div className="text-center text-white w-[240px]">
									<div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full mb-4 border border-white/30">
										<svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
											<circle cx="12" cy="7" r="4"/>
										</svg>
									</div>
									<h3 className="text-xl font-bold mb-3 drop-shadow-lg">For Adults</h3>
									<p className="text-xs drop-shadow-md mb-4">Adults of All Ages (18+ years)</p>
									<div className="space-y-1 text-xs drop-shadow-md mb-4">
										<div>• Healthcare profiles</div>
										<div>• Safety planning</div>
										<div>• Life transitions</div>
									</div>
									<Link
										href="/interactive-tools?age=adults"
										className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-xs font-semibold text-white border border-white/30 hover:bg-white/30 transition duration-200"
									>
										View Tools
										<svg className="ml-1 w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<path d="m9 18 6-6-6-6"/>
										</svg>
									</Link>
								</div>
							</div>
						</div>
					</div>

					<div className="text-center mt-12">
						<Link
							href="/interactive-tools"
							className="inline-flex items-center justify-center rounded-xl bg-[#FFB800] px-8 py-4 text-lg font-bold text-ink shadow-lg hover:bg-[#ffc533] hover:scale-105 transition duration-200"
						>
							Explore All Tools
							<svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
								<path d="m9 18 6-6-6-6"/>
							</svg>
						</Link>
					</div>
				</div>
			</section>

			{/* Support Form Section */}
			<section id="register-form" className="bg-brand-50/30 py-16">
				<div className="mx-auto max-w-4xl px-6">
					<div className="text-center">
						{/* Signature Count Card */}
						<div className="text-center mb-8">
							<div className="inline-block bg-white/90 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-xl border border-brand-200/50">
								<div className="text-5xl font-black text-brand-800 mb-3 tracking-tight">1,500+</div>
								<div className="text-lg text-brand-700 font-semibold">Join others who have added their name</div>
							</div>
						</div>

						<h2 className="text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl">
							Show Your Support
						</h2>
						<div className="mt-6 space-y-4 text-lg text-ink/80">
							<p>The overwhelming response shows just how much our community needs this space.</p>
							<p>Add your name to join hundreds of others who believe in our vision.</p>
							
							<p className="font-medium text-brand-800">Together, we're creating a safe, inclusive space for children, adults, and families of every ability.</p>
						</div>
					</div>

					<div className="mt-12">
						<div className="overflow-hidden rounded-2xl bg-white shadow-lg p-8">
							<MailchimpSubscribeForm />
						</div>
					</div>

					{/* Social Media Links */}
					<div className="mt-16 text-center">
						<h3 className="text-xl font-bold text-ink mb-6">Follow Our Journey</h3>
						<div className="flex items-center justify-center gap-4">
							<a
								href="https://www.facebook.com/noasplaceuk"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center rounded-full bg-[#1877F2] p-3 text-white hover:bg-[#166fe5] transition"
							>
								<span className="sr-only">Follow us on Facebook</span>
								<svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
								</svg>
							</a>
							<a
								href="https://www.instagram.com/noasplaceuk"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center rounded-full bg-[#E4405F] p-3 text-white hover:bg-[#d62e4c] transition"
							>
								<span className="sr-only">Follow us on Instagram</span>
								<svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
								</svg>
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Press Coverage Section */}
			<section className="py-12 bg-white/50">
				<div className="mx-auto max-w-4xl px-6">
					<div className="text-center mb-8">
						<div className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 mb-4">
							<div className="w-1 h-1 bg-purple-400 rounded-full"></div>
							As featured on
						</div>
					</div>
					<div className="flex items-center justify-center gap-8 md:gap-12 opacity-60 hover:opacity-80 transition-opacity duration-300">
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


			{/* Get in Touch Section */}
			<section id="contact" className="bg-white">
				<div className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
					<div className="text-center">
						<h2 className="text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl">
							Get in touch
						</h2>
						<p className="mx-auto mt-6 max-w-2xl text-lg text-ink/80">
							Have a question or want to get involved? We'd love to hear from you.
						</p>
						<div className="mt-8 flex items-center justify-center">
							<a
								href="mailto:hello@noasplace.org.uk"
								className="inline-flex items-center justify-center rounded-xl bg-[#FFB800] px-8 py-4 text-lg font-bold text-ink shadow-lg hover:bg-[#ffc533] hover:scale-105 transition duration-200"
							>
								Email hello@noasplace.org.uk
								<svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
									<path d="M4 4h16v16H4z"/>
									<path d="m22 6-10 7L2 6"/>
								</svg>
							</a>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}