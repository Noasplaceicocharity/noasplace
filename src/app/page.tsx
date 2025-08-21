import DonationWidget from "@/components/DonationWidget";
import Faq from "@/components/Faq";
import Squiggle from "@/components/Squiggle";
import StickerCard from "@/components/StickerCard";
import Image from "next/image";

export default function Home() {
  return (
		<main className="bg-background text-ink">
			<section className="relative isolate min-h-[700px] overflow-hidden">
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

				<div className="relative px-6 pt-16 pb-0 sm:pt-20">
					<div className="relative">
						{/* Left adult */}
												<div className="absolute -left-16 -bottom-24 hidden lg:block">
        <Image
								src="/images/adults left.png"
								alt=""
								width={1000}
								height={1200}
								className="h-auto w-[500px] xl:w-[580px] 2xl:w-[660px]"
							/>
						</div>
						{/* Right kid */}
						<div className="absolute -right-16 -bottom-24 hidden lg:block xl:-right-24 2xl:-right-32">
            <Image
								src="/images/kids right.png"
								alt=""
								width={800}
								height={1000}
								className="h-auto w-[400px] xl:w-[480px] 2xl:w-[600px]"
							/>
        </div>
						{/* Center content */}
						<div className="relative mx-auto max-w-2xl text-center">
														<div className="flex justify-center">
          <Image
									src="/images/noas place logo.png"
									alt="Noa's Place"
									width={500}
									height={500}
									className="h-auto w-[400px] sm:w-[500px]"
									priority
								/>
							</div>
							<h1 className="mx-auto mt-16 max-w-4xl text-balance">
								<span className="block bg-gradient-to-r from-brand-800 to-brand-500 bg-clip-text text-4xl font-black text-transparent sm:text-6xl md:text-7xl">
									Help us build Noa's Place.
								</span>
								<span className="mt-6 block text-2xl font-bold leading-relaxed text-ink sm:text-3xl md:text-4xl">
									No one should feel left out.<br />
									No family should feel alone.
								</span>
							</h1>
							<div className="mt-12 mb-24 sm:mb-32 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
								<a
									href="#register-form"
									className="inline-flex items-center justify-center rounded-xl bg-[#FFB800] px-8 py-4 text-lg font-bold text-ink shadow-lg hover:bg-[#ffc533] hover:scale-105 transition duration-200"
								>
									Approve Our Plans
									<svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
										<path d="m6 9 6 6 6-6"/>
									</svg>
								</a>
								<a
									href="https://forms.gle/LXt8FCp61v4yiSXs9"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center justify-center rounded-xl bg-white/90 px-8 py-4 text-lg font-bold text-brand-800 shadow-lg ring-1 ring-brand-100 hover:bg-white hover:scale-105 transition duration-200"
								>
									Become a Board Member
									<svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
										<path d="M7 17L17 7M17 7H7M17 7V17"/>
									</svg>
								</a>
							</div>
						</div>
					</div>
				</div>

			</section>

			<section className="relative overflow-hidden bg-brand-50/30">
				<div className="pointer-events-none absolute inset-0">
					<svg className="absolute right-0 top-0 h-32 w-32 rotate-90 text-[#40BFBF]/20" viewBox="0 0 100 100" fill="currentColor">
						<path d="M70,35 C70,25 65,20 60,20 L40,20 C35,20 30,25 30,35 C30,40 25,45 20,45 C10,45 5,50 5,60 L5,80 C5,85 10,90 20,90 C25,90 30,95 30,100 C30,110 35,115 40,115 L60,115 C65,115 70,110 70,100 C70,95 75,90 80,90 C90,90 95,85 95,80 L95,60 C95,50 90,45 80,45 C75,45 70,40 70,35" />
					</svg>
					<div className="absolute left-1/4 top-1/3 size-4 rounded-full bg-[#FFB800]/20" />
					<div className="absolute right-1/3 bottom-1/4 size-3 rounded-full bg-[#6E3482]/20" />
				</div>
				
				<div className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
					<h2 className="text-balance text-center text-3xl font-extrabold text-brand-800 sm:text-4xl md:text-5xl">
						Some stories don't begin with answers. Ours began with questions.
					</h2>

					<div className="mt-12 space-y-8 text-lg leading-relaxed text-ink/80">
						<div className="mx-auto max-w-xl space-y-2 text-center font-medium text-brand-800">
							<p>Why won't he eat?</p>
							<p>Why is he screaming like he's in pain?</p>
							<p>Why won't he sleep?</p>
							<p>Why is he hurting himself?</p>
							<p>Why won't anyone help us?</p>
						</div>

						<p>
							Our son, Noa, wasn't even two, but he had already faced more than most do in a lifetime. From the outside, he looked like any other toddler. But inside our home, every day is a battle to keep him safe, help him calm, and understand a world that clearly overwhelmed him.
						</p>

						<p>
							Noa throws himself onto the floor. He smashes his head against doors and walls. He tips over his food and refuses almost every texture except liquid. He doesn't speak, can't explain, and won't respond to his name. He often laughs when we tell him "no", not because he's being naughty, but because something in his world just doesn't connect the way it should.
						</p>

						<p>
							We went to doctors, hospitals, and health visitors desperate for help. But again and again, we were told,
						</p>

						<div className="space-y-1 text-center font-medium text-brand-800">
							<h3 className="text-2xl font-bold sm:text-3xl">"There's nothing we can do right now."</h3>
						</div>

						<div className="space-y-2 text-center">
							<p>So we waited. And during that time, we cried in secret.</p>
							<p>Held our boy through bruising meltdowns.</p>
							<p>Watched him injure himself while we tried everything to protect him.</p>
							<p>Felt guilt, fear, grief, and love that never once wavered.</p>
						</div>

						<h3 className="text-center text-2xl font-bold text-brand-800 sm:text-3xl">
							Noa is extraordinary. He is kind, curious, gentle-hearted, and stronger than we can put into words.
						</h3>

						<p>
							Despite everything, he laughs. He plays. He flaps with joy when he hears nursery rhymes and lights up when his toy dinosaurs are near. He's clever, creative, and full of wonder, he just experiences the world in a very different way.
						</p>

						<h3 className="text-center text-2xl font-bold text-brand-800 sm:text-3xl">
							Out of our journey, full of pain and hope, we now feel called to do something bigger.
						</h3>

						<p>
							We want to create a space where families like ours are not told to "wait."<br />
							A place where children and adults with additional needs feel welcomed, understood, and free to just be.<br />
							Where there are sensory rooms, soft play, a café, classrooms, and even a charity shop, all in one space.<br />
							A hub of safety, joy, support and belonging, for the child melting down, for the parent on the edge, for the siblings watching, and for every carer walking this unseen road.
						</p>

						<div className="space-y-4 text-center">
							<h3 className="text-2xl font-bold text-brand-800">Because no one should have to go through this alone.</h3>
							<h3 className="text-2xl font-bold text-brand-800">Because every Noa deserves to be celebrated.</h3>
							<h3 className="text-2xl font-bold text-brand-800">Because help shouldn't come after the crisis, it should come before.</h3>
						</div>

						<p className="text-center font-medium italic">
							We're building this with faith, love, and the strength that Noa has shown us day after day.<br />
							And we hope you'll stand with us as we do.
						</p>
					</div>
				</div>
			</section>

			{/* Image Gallery */}
			<section className="overflow-hidden bg-white py-24">
				<div className="mx-auto max-w-6xl px-6">
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
						<a href="#kids-sensory" className="group relative aspect-[4/3] block overflow-hidden rounded-2xl bg-brand-50 lg:col-span-2">
							<Image
								src="/images/kids sensory rooms.jpg"
								alt="Kids sensory room with soft play equipment and calming lights"
								width={600}
								height={450}
								className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
							<span className="absolute bottom-4 left-4 text-lg font-bold text-white group-hover:underline">Kids Sensory</span>
						</a>
						<a href="#adult-sensory" className="group relative aspect-[4/3] block overflow-hidden rounded-2xl bg-brand-50 lg:col-span-2">
							<Image
								src="/images/adult sensory rooms.jpg"
								alt="Adult sensory room designed for comfort and stimulation"
								width={600}
								height={450}
								className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
							<span className="absolute bottom-4 left-4 text-lg font-bold text-white group-hover:underline">Adult Sensory</span>
						</a>
						<a href="#indoor-playground" className="group relative aspect-[4/3] block overflow-hidden rounded-2xl bg-brand-50 lg:col-span-2">
							<Image
								src="/images/all play.jpg"
								alt="Indoor playground and soft play area"
								width={600}
								height={450}
								className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
							<span className="absolute bottom-4 left-4 text-lg font-bold text-white group-hover:underline">Indoor Playground</span>
						</a>
						<a href="#event-spaces" className="group relative aspect-[4/3] block overflow-hidden rounded-2xl bg-brand-50 lg:col-span-2">
							<Image
								src="/images/all in one rooms.jpg"
								alt="Flexible event and activity spaces"
								width={800}
								height={600}
								className="absolute inset-0 h-full w-full object-cover object-center scale-125 transition duration-500 group-hover:scale-[1.35]"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
							<span className="absolute bottom-4 left-4 text-lg font-bold text-white group-hover:underline">Event Spaces</span>
						</a>
						<a href="#community-cafe" className="group relative aspect-[4/3] block overflow-hidden rounded-2xl bg-brand-50 lg:col-span-2">
							<Image
								src="/images/cafe.jpg"
								alt="Welcoming community café space"
								width={600}
								height={450}
								className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
							<span className="absolute bottom-4 left-4 text-lg font-bold text-white group-hover:underline">Community Café</span>
						</a>
						<a href="#charity-shop" className="group relative aspect-[4/3] block overflow-hidden rounded-2xl bg-brand-50 lg:col-span-2">
          <Image
								src="/images/charity shop.jpg"
								alt="Our charity shop supporting the community"
								width={600}
								height={450}
								className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
							<span className="absolute bottom-4 left-4 text-lg font-bold text-white group-hover:underline">Charity Shop</span>
						</a>
					</div>
				</div>
			</section>

			{/* Our Spaces */}
			<section className="bg-white py-24">
				<div className="mx-auto max-w-6xl px-6">
					<h2 className="text-center text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl">
						Our Spaces
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-center text-lg text-ink/80">
						Every space at Noa's Place is designed with purpose, accessibility, and community in mind.
					</p>

					<div className="mt-16 space-y-24">
												{/* Kids Sensory */}
						<div id="kids-sensory" className="scroll-mt-24">
							<div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
								<div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-50">
									<Image
										src="/images/kids sensory rooms.jpg"
										alt="Kids sensory room with soft play equipment and calming lights"
										fill
										className="object-cover"
									/>
								</div>
								<div className="flex flex-col justify-center">
									<h3 className="text-2xl font-bold text-brand-800 sm:text-3xl">Kids Sensory Room</h3>
									<div className="mt-6 space-y-4 text-lg text-ink/80">
										<p>A safe, calming space designed specifically for children with sensory needs. Features include:</p>
										<ul className="ml-6 list-disc space-y-2">
											<li>Soft play equipment and climbing frames</li>
											<li>Adjustable lighting and sound environments</li>
											<li>Tactile walls and interactive features</li>
											<li>Quiet corners for when it all gets too much</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						{/* Adult Sensory */}
						<div id="adult-sensory" className="scroll-mt-24">
							<div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
								<div className="flex flex-col justify-center order-2 lg:order-1">
									<h3 className="text-2xl font-bold text-brand-800 sm:text-3xl">Adult Sensory Room</h3>
									<div className="mt-6 space-y-4 text-lg text-ink/80">
										<p>A dignified, age-appropriate space for adults to regulate, relax, and engage their senses:</p>
										<ul className="ml-6 list-disc space-y-2">
											<li>Comfortable seating and relaxation areas</li>
											<li>Sensory equipment designed for adult users</li>
											<li>Customisable environment for individual needs</li>
											<li>Private spaces for one-to-one support</li>
										</ul>
									</div>
								</div>
								<div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-50 order-1 lg:order-2">
									<Image
										src="/images/adult sensory rooms.jpg"
										alt="Adult sensory room designed for comfort and stimulation"
										fill
										className="object-cover"
									/>
								</div>
							</div>
						</div>

						{/* Indoor Playground */}
						<div id="indoor-playground" className="scroll-mt-24">
							<div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
								<div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-50">
									<Image
										src="/images/all play.jpg"
										alt="Indoor playground and soft play area"
										fill
										className="object-cover"
									/>
								</div>
								<div className="flex flex-col justify-center">
									<h3 className="text-2xl font-bold text-brand-800 sm:text-3xl">Indoor Playground</h3>
									<div className="mt-6 space-y-4 text-lg text-ink/80">
										<p>An inclusive play space where children of all abilities can explore and have fun:</p>
										<ul className="ml-6 list-disc space-y-2">
											<li>Accessible play equipment for all abilities</li>
											<li>Sensory-friendly zones and quiet areas</li>
											<li>Safe, padded surfaces throughout</li>
											<li>Adaptive equipment and support aids available</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						{/* Event Spaces */}
						<div id="event-spaces" className="scroll-mt-24">
							<div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
								<div className="flex flex-col justify-center order-2 lg:order-1">
									<h3 className="text-2xl font-bold text-brand-800 sm:text-3xl">Event Spaces</h3>
									<div className="mt-6 space-y-4 text-lg text-ink/80">
										<p>Flexible spaces for community activities, workshops, and celebrations:</p>
										<ul className="ml-6 list-disc space-y-2">
											<li>Adaptable rooms for various group sizes</li>
											<li>Fully accessible facilities and equipment</li>
											<li>Sensory-aware environment controls</li>
											<li>Perfect for classes, groups, and family events</li>
										</ul>
									</div>
								</div>
								<div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-50 order-1 lg:order-2">
									<Image
										src="/images/all in one rooms.jpg"
										alt="Flexible event and activity spaces"
										fill
										className="object-cover object-center scale-125"
									/>
								</div>
							</div>
						</div>

						{/* Community Café */}
						<div id="community-cafe" className="scroll-mt-24">
							<div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
								<div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-50">
									<Image
										src="/images/cafe.jpg"
										alt="Welcoming community café space"
										fill
										className="object-cover"
									/>
								</div>
								<div className="flex flex-col justify-center">
									<h3 className="text-2xl font-bold text-brand-800 sm:text-3xl">Community Café</h3>
									<div className="mt-6 space-y-4 text-lg text-ink/80">
										<p>More than just a café – a welcoming hub where everyone belongs:</p>
										<ul className="ml-6 list-disc space-y-2">
											<li>Sensory-friendly environment with quiet zones</li>
											<li>Accessible menus and dietary options</li>
											<li>Family-friendly seating and facilities</li>
											<li>Regular community events and meetups</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						{/* Charity Shop */}
						<div id="charity-shop" className="scroll-mt-24">
							<div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
								<div className="flex flex-col justify-center order-2 lg:order-1">
									<h3 className="text-2xl font-bold text-brand-800 sm:text-3xl">Charity Shop</h3>
									<div className="mt-6 space-y-4 text-lg text-ink/80">
										<p>A sustainable way to support our community while finding treasures:</p>
										<ul className="ml-6 list-disc space-y-2">
											<li>Quality pre-loved items at affordable prices</li>
											<li>Volunteer opportunities for all abilities</li>
											<li>Supported work experience placements</li>
											<li>Income generation to support our services</li>
										</ul>
									</div>
								</div>
								<div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-50 order-1 lg:order-2">
									<Image
										src="/images/charity shop.jpg"
										alt="Our charity shop supporting the community"
										fill
										className="object-cover"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="bg-brand-50/60">
				<div className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
					<div className="space-y-20">
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

						{/* Vision Gallery */}
						<div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl">
          <Image
								src="/images/SEND spaces.jpg"
								alt="Our vision for Noa's Place - an inclusive community hub"
								width={1200}
								height={600}
								className="w-full"
								priority
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
						</div>

						{/* Mission */}
						<div className="text-center">
							<h2 className="text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl">
								Our Mission
							</h2>
							<p className="mx-auto mt-6 text-lg text-ink/80">
								To create an inclusive community hub in Halifax that provides:
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

			<section className="bg-white">
				<div className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
					<div className="space-y-20">
						{/* How You Can Help */}
						<div>
							<h2 className="text-center text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl">
								How You Can Help
							</h2>

							<div className="mt-8 grid gap-6 sm:grid-cols-2">
								<div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-brand-100">
									<div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-brand-50 text-2xl text-brand-800">📝</div>
									<h3 className="text-xl font-bold text-brand-800">Register to build Noa's Place</h3>
									<p className="mt-2 text-ink/80">Show your support by registering your interest in our vision.</p>
									<div className="mt-6">
										<a 
											href="#register-form"
											className="inline-flex w-full items-center justify-center rounded-xl bg-[#FFB800] px-6 py-3 text-lg font-bold text-ink shadow-lg hover:bg-[#ffc533] hover:scale-105 transition duration-200"
										>
											Add Your Name Today
											<svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
												<path d="m6 9 6 6 6-6"/>
											</svg>
										</a>
									</div>
								</div>
								<div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-brand-100">
									<div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-brand-50 text-2xl text-brand-800">💫</div>
									<h3 className="text-xl font-bold text-brand-800">Share our vision</h3>
									<p className="mt-2 text-ink/80">Help spread the word about Noa's Place.</p>
									<div className="mt-4 flex gap-3">
										<a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Join me in supporting Noa's Place - creating a safe, inclusive space for children, adults, and families of every ability in Halifax. Learn more:")}&url=${encodeURIComponent("https://noasplace.org")}`}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center justify-center rounded-full bg-[#1DA1F2] p-2 text-white hover:bg-[#1a8cd8] transition"
										>
											<svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
												<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
											</svg>
										</a>
										<a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://noasplace.org")}`}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center justify-center rounded-full bg-[#1877F2] p-2 text-white hover:bg-[#166fe5] transition"
										>
											<svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
												<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
											</svg>
										</a>
										<a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent("https://noasplace.org")}&title=${encodeURIComponent("Support Noa's Place")}&summary=${encodeURIComponent("Join me in supporting Noa's Place - creating a safe, inclusive space for children, adults, and families of every ability in Halifax.")}`}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center justify-center rounded-full bg-[#0A66C2] p-2 text-white hover:bg-[#095196] transition"
										>
											<svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
												<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
											</svg>
										</a>
									</div>
								</div>
								<div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-brand-100">
									<div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-brand-50 text-2xl text-brand-800">👥</div>
									<h3 className="text-xl font-bold text-brand-800">Become a Board Member</h3>
									<p className="mt-2 text-ink/80">Join our board and help shape the future of Noa's Place.</p>
									<div className="mt-6">
										<a 
											href="https://forms.gle/LXt8FCp61v4yiSXs9"
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex w-full items-center justify-center rounded-xl bg-[#FFB800] px-6 py-3 text-base font-bold text-ink shadow-lg hover:bg-[#ffc533] hover:scale-105 transition duration-200"
										>
											Apply Now
											<svg className="ml-2 size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
												<path d="M7 17L17 7M17 7H7M17 7V17"/>
											</svg>
										</a>
									</div>
								</div>
							</div>
						</div>

						{/* Join the Movement */}
						<div className="rounded-3xl bg-gradient-to-br from-brand-800 to-brand-500 p-8 text-center text-white sm:p-12">
							<h2 className="text-3xl font-extrabold sm:text-4xl">
								Join the Movement
							</h2>
							<p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
								This isn't just about building a centre. It's about creating a future of belonging for children, adults, and families who too often feel excluded.
							</p>
							<p className="mx-auto mt-6 max-w-2xl text-xl font-medium">
								With your help, Noa's Place will be a safe haven — full of joy, acceptance, and hope.
							</p>
						</div>
					</div>
    </div>
			</section>

			{/* Support Form Section */}
			<section id="register-form" className="bg-brand-50/30 py-24">
				<div className="mx-auto max-w-4xl px-6">
					<div className="text-center">
						<h2 className="text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl">
							Show Your Support
						</h2>
						<div className="mt-6 space-y-4 text-lg text-ink/80">
							<p>We're dreaming of something amazing for Halifax but we need to know the community wants it.</p>
							<p>Add your name today to show your support for Noa's Place.</p>
							<p className="font-medium text-brand-800">Together, we can create a safe, inclusive space for children, adults, and families of every ability.</p>
						</div>
					</div>

					<div className="mt-12">
						<div className="overflow-hidden rounded-2xl shadow-lg">
							<iframe 
								src="https://docs.google.com/forms/d/e/1FAIpQLSffbGfNPdb32UudXu8i_0NrIQ_S66ghh418GfNEyUepbGK0uA/viewform?embedded=true" 
								width="100%" 
								height="1600"
								className="w-full"
								loading="lazy"
								title="Support Noa's Place — Google Form"
								tabIndex={-1}
								style={{ 
									border: 0,
									height: '1600px',
									overflow: 'hidden'
								}}
								scrolling="no"
							>
								Loading…
							</iframe>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}