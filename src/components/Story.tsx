"use client";

import { useCallback, useEffect, useMemo, useRef, useState, ReactElement } from "react";

type StoryStep = {
	id: string;
	title: string;
	content: ReactElement;
};

export default function Story() {
	const steps: StoryStep[] = useMemo(
		() => [
			{
				id: "questions",
				title: "Questions with no easy answers",
				content: (
					<div className="space-y-8">
						<h2 className="text-balance text-center text-3xl font-extrabold text-brand-800 sm:text-4xl md:text-5xl">
							Some stories don't begin with answers. Ours began with questions.
						</h2>
						<div className="mx-auto max-w-xl space-y-4 text-center">
							<div className="space-y-2 text-lg font-medium text-brand-800">
								<p>Why was everyday life so hard?</p>
								<p>Why was support so far away?</p>
								<p>Why were we told to wait when we desperately needed help?</p>
							</div>
							<p className="text-lg leading-relaxed text-ink/80">
								These questions echoed through our days and nights, as we watched our beautiful son struggle to navigate a world that wasn't built for him. We knew we needed help, but everywhere we turned, the answers seemed just out of reach.
							</p>
						</div>
					</div>
				),
			},
			{
				id: "isolation",
				title: "Isolation and Waiting",
				content: (
					<div className="space-y-6 text-lg leading-relaxed text-ink/80">
						<div className="mx-auto max-w-2xl space-y-6">
							<p>
								Like so many families, we found ourselves isolated — trying to cope on our own while waiting for assessments, services, and answers that always seemed out of reach. The days were exhausting, overwhelming, and at times lonely.
							</p>
							<p className="text-center font-medium text-brand-800">
								We discovered that isolation isn't just about being alone — it's about feeling unseen, unheard, and misunderstood by a world that keeps moving forward while your family's life feels frozen in time.
							</p>
							<p>
								Every day brought new challenges, and every night left us wondering if tomorrow would be the day help finally arrived. But tomorrow kept turning into next week, next month, next year.
							</p>
						</div>
					</div>
				),
			},
			{
				id: "strength",
				title: "Love and Strength",
				content: (
					<div className="space-y-6">
						<div className="mx-auto max-w-2xl space-y-6">
							<p className="text-lg leading-relaxed text-ink/80">
								But even in the hardest moments, there was love, joy, and courage. Our son, Noa, has shown us more strength, resilience, and wonder than we could ever put into words. He has taught us to see the world differently — and he has inspired us to make sure no other family feels the same isolation we did.
							</p>
							<p className="text-center text-xl font-medium text-brand-800">
								Through Noa's eyes, we learned that different isn't less — it's just different.
							</p>
							<p className="text-lg leading-relaxed text-ink/80">
								His determination to connect, to learn, to grow in his own unique way showed us that the problem wasn't him — it was a world that wasn't ready to embrace his way of being. We knew then that something had to change.
							</p>
						</div>
					</div>
				),
			},
			{
				id: "vision",
				title: "Our Vision",
				content: (
					<div className="space-y-6">
						<h3 className="text-center text-2xl font-bold text-brand-800 sm:text-3xl">
							That's why we're building Noa's Place.
						</h3>
						<div className="mx-auto max-w-2xl space-y-6">
							<p className="text-lg leading-relaxed text-ink/80">
								A safe, inclusive hub where children and adults with additional needs can play, learn, and belong. A place with sensory rooms, soft play, classrooms, a café, and even a charity shop — designed to bring safety, joy, and connection to families who need it most.
							</p>
							<p className="text-center text-xl font-medium text-brand-800">
								A community where everyone belongs, exactly as they are.
							</p>
							<p className="text-lg leading-relaxed text-ink/80">
								Where parents and carers find support, siblings are included, and no one feels invisible. Where understanding replaces judgment, and where families can find the help they need before reaching crisis point.
							</p>
						</div>
					</div>
				),
			},
			{
				id: "because",
				title: "Why this matters",
				content: (
					<div className="mx-auto max-w-2xl space-y-8">
						<div className="space-y-4 text-center">
							<h3 className="text-2xl font-bold text-brand-800">Because no child should feel left out.</h3>
							<h3 className="text-2xl font-bold text-brand-800">Because no parent should feel alone.</h3>
							<h3 className="text-2xl font-bold text-brand-800">Because help shouldn't come after the crisis — it should come before.</h3>
						</div>
						<p className="text-lg leading-relaxed text-center text-ink/80">
							Every child deserves to play, learn, and grow in a space that understands them. Every parent deserves support that arrives before the breaking point. Every family deserves to feel like they belong.
						</p>
					</div>
				),
			},
			{
				id: "hope",
				title: "Join Us",
				content: (
					<div className="mx-auto max-w-2xl space-y-6 text-center">
						<p className="text-xl font-medium text-brand-800">
							We're building this with faith, love, and determination.
						</p>
						<p className="text-lg leading-relaxed text-ink/80">
							Noa's Place isn't just a building — it's a promise to every family walking a similar path. A promise that says you're not alone, you're not invisible, and together we can create something beautiful.
						</p>
						<p className="text-xl font-medium italic text-brand-800">
							We'd love for you to stand with us as we make Noa's Place a reality.
						</p>
					</div>
				),
			},
		],
		[]
	);

	const [currentIndex, setCurrentIndex] = useState(0);
	const contentRef = useRef<HTMLDivElement | null>(null);

	const goTo = useCallback((index: number) => {
		setCurrentIndex((prev) => {
			const next = Math.max(0, Math.min(steps.length - 1, index));
			return next;
		});
	}, [steps.length]);

	const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
	const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

	// Keyboard navigation
	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === "ArrowRight") {
				goNext();
			}
			if (e.key === "ArrowLeft") {
				goPrev();
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [goNext, goPrev]);

	// Focus new content for screen readers
	useEffect(() => {
		contentRef.current?.focus();
	}, [currentIndex]);

	const progressPercent = ((currentIndex + 1) / steps.length) * 100;

	return (
		<div className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
			<div className="rounded-3xl bg-white/70 p-6 shadow-sm ring-1 ring-brand-100 backdrop-blur-sm">
				{/* Progress */}
				<div className="mb-6">
					<div className="h-2 w-full overflow-hidden rounded-full bg-brand-50">
						<div
							className="h-2 rounded-full bg-gradient-to-r from-brand-800 to-brand-500 transition-all duration-500"
							style={{ width: `${progressPercent}%` }}
						/>
					</div>
				</div>

				{/* Content */}
				<div
					ref={contentRef}
					tabIndex={-1}
					role="region"
					aria-live="polite"
					aria-label={`Story step ${currentIndex + 1} of ${steps.length}: ${steps[currentIndex].title}`}
					className="min-h-[240px]"
				>
					<div className="animate-fade-in">
						{steps[currentIndex].content}
					</div>
				</div>

				{/* Controls */}
				<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<button
						onClick={goPrev}
						disabled={currentIndex === 0}
						className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-brand-800 ring-1 ring-brand-100 transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-4 sm:py-2 sm:text-base"
						aria-label="Previous section"
					>
						<svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
							<path d="m15 18-6-6 6-6" />
						</svg>
						Previous
					</button>

					<div className="flex flex-wrap items-center justify-center gap-1.5 px-1 sm:gap-2">
						{steps.map((step, i) => (
							<button
								key={step.id}
								onClick={() => goTo(i)}
								className={`h-2 w-2 rounded-full transition ${
									i === currentIndex ? "scale-125 bg-brand-700" : "bg-brand-200 hover:bg-brand-300"
								}`}
								aria-label={`Go to step ${i + 1}: ${step.title}`}
							/>
						))}
					</div>

					{currentIndex === steps.length - 1 ? (
						<a
							href="#register-form"
							className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFB800] px-3 py-2 text-sm font-bold text-ink shadow-sm transition hover:bg-[#ffc533] sm:w-auto sm:px-4 sm:py-2 sm:text-base"
							aria-label="Approve our plans and go to the support form"
						>
							Approve Our Plans
							<svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
								<path d="m6 9 6 6 6-6" />
							</svg>
						</a>
					) : (
						<button
							onClick={goNext}
							className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFB800] px-3 py-2 text-sm font-bold text-ink shadow-sm transition hover:bg-[#ffc533] sm:w-auto sm:px-4 sm:py-2 sm:text-base"
							aria-label="Next section"
						>
							Next
							<svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
								<path d="m9 18 6-6-6-6" />
							</svg>
						</button>
					)}
				</div>
			</div>

			{/* Small helper text */}
			<p className="mt-4 text-center text-sm text-ink/60">
				Tip: Use your left and right arrow keys to navigate
			</p>
		</div>
	);
}

// Simple fade-in animation using Tailwind's arbitrary values
// Requires the project Tailwind config to allow arbitrary animate classes
// If not available, this will harmlessly be ignored by the browser

