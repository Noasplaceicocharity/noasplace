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
					<div className="space-y-6 sm:space-y-8">
						<h2 className="text-balance text-center text-2xl sm:text-3xl font-extrabold text-brand-800 md:text-4xl">
							Some stories don’t begin with answers. Ours began with waiting.
						</h2>
						<div className="mx-auto max-w-2xl space-y-4 sm:space-y-6">
							<p className="text-base sm:text-lg leading-relaxed text-ink/80">
								When our little boy, Noa, was still so young, we began to notice early signs that he was experiencing the world differently. He struggled with things that other children seemed to manage more easily, yet again and again, our concerns were dismissed.
							</p>
							<div className="text-center space-y-1 sm:space-y-2">
								<p className="text-lg sm:text-xl font-medium text-brand-800">We were told to wait.</p>
								<p className="text-base sm:text-lg font-medium text-brand-800">To wait for age milestones.</p>
								<p className="text-base sm:text-lg font-medium text-brand-800">To wait for services.</p>
								<p className="text-base sm:text-lg font-medium text-brand-800">To wait for support that always seemed just out of reach.</p>
							</div>
						</div>
					</div>
				),
			},
			{
				id: "isolation",
				title: "Isolation and Waiting",
				content: (
					<div className="space-y-6 sm:space-y-8">
						<div className="mx-auto max-w-2xl space-y-4 sm:space-y-6">
							<p className="text-base sm:text-lg leading-relaxed text-ink/80">
								Like so many families, we felt isolated, coping as best we could while carrying the weight of unanswered questions. We were exhausted, overwhelmed, and left wondering how long it would be before someone stepped in.
							</p>
							<p className="text-base sm:text-lg leading-relaxed text-ink/80">
								That is when we realised something important: the real struggle isn’t only about getting a diagnosis or therapies. It is about the silence in between — the waiting, the gap where families are left to cope alone.
							</p>
							<p className="text-center text-lg sm:text-xl font-medium text-brand-800">
								No family should have to face that silence by themselves.
							</p>
						</div>
					</div>
				),
			},
			{
				id: "vision",
				title: "Our Vision",
				content: (
					<div className="space-y-6 sm:space-y-8">
						<h3 className="text-center text-xl sm:text-2xl font-bold text-brand-800 sm:text-3xl">
							That is why we are building Noa’s Place.
						</h3>
						<div className="mx-auto max-w-2xl space-y-4 sm:space-y-6">
							<p className="text-base sm:text-lg leading-relaxed text-ink/80">
								A safe, inclusive hub where children and adults with additional needs are supported, celebrated, and given space to belong — not years from now, but today.
							</p>
							<p className="text-base sm:text-lg leading-relaxed text-ink/80">
								A place with sensory rooms, soft play, classrooms, a café, and even a charity shop, all designed to bring joy, relief, and connection to families before they reach breaking point.
							</p>
						</div>
					</div>
				),
			},
			{
				id: "because",
				title: "Why this matters",
				content: (
					<div className="mx-auto max-w-2xl space-y-4 sm:space-y-6">
						<div className="space-y-3 sm:space-y-4 text-center">
							<h3 className="text-lg sm:text-xl font-bold text-brand-800">Because help should not come after the crisis; it should come before.</h3>
							<h3 className="text-lg sm:text-xl font-bold text-brand-800">Because no child should feel left out.</h3>
							<h3 className="text-lg sm:text-xl font-bold text-brand-800">Because no parent should feel invisible.</h3>
						</div>
					</div>
				),
			},
			{
				id: "hope",
				title: "Join Us",
				content: (
					<div className="mx-auto max-w-2xl space-y-4 sm:space-y-6 text-center">
						<p className="text-base sm:text-lg leading-relaxed text-ink/80">
							We are building this with faith, love, and determination. Noa’s Place is not just a building; it is a promise that families do not have to wait alone.
						</p>
						<p className="text-lg sm:text-xl font-medium italic text-brand-800">
							And we would love for you to stand with us as we make it a reality.
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
		<div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-16">
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
					className="min-h-[300px] sm:h-[400px] flex items-center justify-center py-4"
				>
					<div className="animate-fade-in w-full">
						{steps[currentIndex].content}
					</div>
				</div>

				{/* Controls */}
				<div className="mt-6 sm:mt-8 flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-center sm:justify-between">
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

