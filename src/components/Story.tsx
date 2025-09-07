"use client";

import Image from "next/image";

export default function Story() {
	return (
		<div className="mx-auto max-w-7xl px-6 py-24">
			{/* Introduction */}
			<div className="text-center mb-16">
				<h2 className="text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl">
					Our Story
				</h2>
				<p className="mt-6 text-xl text-ink/80 max-w-3xl mx-auto">
					Some stories don't begin with answers. Ours began with waiting.
				</p>
			</div>

			{/* Story Sections */}
			<div className="space-y-24">
				{/* Section 1: The Beginning - Picture Left */}
				<div className="grid gap-12 lg:grid-cols-2 items-center">
					<div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
						<Image
							src="/images/noa_smiling_halifax_west_yorkshire.jpeg"
							alt="Noa smiling, showing his beautiful spirit"
							fill
							className="object-cover"
						/>
					</div>
					<div className="space-y-6">
						<h3 className="text-2xl font-bold text-brand-800 sm:text-3xl">
							The Beginning
						</h3>
						<div className="space-y-4 text-lg text-ink/80">
							<p>
								When our little boy, Noa, was still so young, we began to notice early signs that he was experiencing the world differently. He struggled with things that other children seemed to manage more easily, yet again and again, our concerns were dismissed.
							</p>
							<p>
								Like so many families, we were told to wait. To wait for age milestones. To wait for services. To wait for support that always seemed just out of reach.
							</p>
						</div>
					</div>
				</div>

				{/* Section 2: The Realisation - Picture Right */}
				<div className="grid gap-12 lg:grid-cols-2 items-center">
					<div className="relative aspect-[4/3] rounded-2xl overflow-hidden lg:order-2">
						<Image
							src="/images/noa_pointing_halifax_west_yorkshire.jpeg"
							alt="Noa pointing, showing his curiosity and engagement with the world"
							fill
							className="object-cover"
						/>
					</div>
					<div className="space-y-6 lg:order-1">
						<h3 className="text-2xl font-bold text-brand-800 sm:text-3xl">
							The Realisation
						</h3>
						<div className="space-y-4 text-lg text-ink/80">
							<p>
								Like so many families, we felt isolated, coping as best we could while carrying the weight of unanswered questions. We were exhausted, overwhelmed, and left wondering how long it would be before someone stepped in.
							</p>
							<p>
								That's when we realised something important: the real struggle isn't only about getting a diagnosis or therapies. It's about the silence in between — the waiting, the gap where families are left to cope alone.
							</p>
							<p className="font-medium text-brand-800">
								No family should have to face that silence by themselves.
							</p>
						</div>
					</div>
				</div>

				{/* Section 3: The Vision - Picture Left */}
				<div className="grid gap-12 lg:grid-cols-2 items-center">
					<div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
						<Image
							src="/images/family_photo_halifax_west_yorkshire.jpg"
							alt="Our family together, showing the love and connection that inspired Noa's Place"
							fill
							className="object-cover"
						/>
					</div>
					<div className="space-y-6">
						<h3 className="text-2xl font-bold text-brand-800 sm:text-3xl">
							That's Why We're Building Noa's Place
						</h3>
						<div className="space-y-4 text-lg text-ink/80">
							<p>
								A safe, inclusive hub where children and adults with additional needs are supported, celebrated, and given space to belong — not years from now, but today.
							</p>
							<p>
								A place with sensory rooms, soft play, classrooms, a café, and even a charity shop, all designed to bring joy, relief, and connection to families before they reach breaking point.
							</p>
						</div>
						<div className="pt-4">
							<div className="space-y-2 text-xl font-medium text-brand-800">
								<p>Because help should not come after the crisis; it should come before.</p>
								<p>Because no child should feel left out.</p>
								<p>Because no parent should feel invisible.</p>
							</div>
						</div>
					</div>
				</div>

				{/* Call to Action */}
				<div className="text-center max-w-3xl mx-auto">
					<p className="text-xl text-ink/80 mb-8">
						We are building this with faith, love, and determination. Noa's Place is not just a building; it is a promise that families do not have to wait alone.
					</p>
					<p className="text-2xl font-medium italic text-brand-800">
						And we would love for you to stand with us as we make it a reality.
					</p>
					<div className="mt-12">
						<a
							href="#register-form"
							className="inline-flex items-center justify-center rounded-xl bg-[#FFB800] px-8 py-4 text-lg font-bold text-ink shadow-lg hover:bg-[#ffc533] hover:scale-105 transition duration-200"
						>
							Approve Our Plans
							<svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
								<path d="m6 9 6 6 6-6"/>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}