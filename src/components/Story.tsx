"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type StoryStep = {
	id: string;
	title: string;
	content: JSX.Element;
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
						<div className="mx-auto max-w-xl space-y-2 text-center text-lg font-medium text-brand-800">
							<p>Why won't he eat?</p>
							<p>Why is he screaming like he's in pain?</p>
							<p>Why won't he sleep?</p>
							<p>Why is he hurting himself?</p>
							<p>Why won't anyone help us?</p>
						</div>
					</div>
				),
			},
			{
				id: "daily-life",
				title: "Daily life behind closed doors",
				content: (
					<div className="space-y-6 text-lg leading-relaxed text-ink/80">
						<p>
							Our son, Noa, wasn't even two, but he had already faced more than most do in a
								lifetime. From the outside, he looked like any other toddler. But inside our home, every
								day is a battle to keep him safe, help him calm, and understand a world that clearly
								overwhelmed him.
						</p>
						<p>
							Noa throws himself onto the floor. He smashes his head against doors and walls. He tips
							over his food and refuses almost every texture except liquid. He doesn't speak, can't explain,
							and won't respond to his name. He often laughs when we tell him "no", not because he's
							being naughty, but because something in his world just doesn't connect the way it should.
						</p>
					</div>
				),
			},
			{
				id: "waiting",
				title: "Told to wait",
				content: (
					<div className="space-y-6">
						<p className="text-lg leading-relaxed text-ink/80">
							We went to doctors, hospitals, and health visitors desperate for help. But again and again,
							we were told,
						</p>
						<div className="space-y-1 text-center font-medium text-brand-800">
							<h3 className="text-2xl font-bold sm:text-3xl">"There's nothing we can do right now."</h3>
						</div>
					</div>
				),
			},
			{
				id: "holding-on",
				title: "Holding on",
				content: (
					<div className="space-y-2 text-center text-lg">
						<p>So we waited. And during that time, we cried in secret.</p>
						<p>Held our boy through bruising meltdowns.</p>
						<p>Watched him injure himself while we tried everything to protect him.</p>
						<p>Felt guilt, fear, grief, and love that never once wavered.</p>
					</div>
				),
			},
			{
				id: "extraordinary",
				title: "Noa is extraordinary",
				content: (
					<div className="space-y-6">
						<h3 className="text-center text-2xl font-bold text-brand-800 sm:text-3xl">
							Noa is extraordinary. He is kind, curious, gentle-hearted, and stronger than we can put into words.
						</h3>
						<p className="text-lg leading-relaxed text-ink/80">
							Despite everything, he laughs. He plays. He flaps with joy when he hears nursery rhymes and
							lights up when his toy dinosaurs are near. He's clever, creative, and full of wonder, he just
							experiences the world in a very different way.
						</p>
					</div>
				),
			},
			{
				id: "calling",
				title: "A bigger calling",
				content: (
					<div className="space-y-6">
						<h3 className="text-center text-2xl font-bold text-brand-800 sm:text-3xl">
							Out of our journey, full of pain and hope, we now feel called to do something bigger.
						</h3>
						<p className="text-lg leading-relaxed text-ink/80">
							We want to create a space where families like ours are not told to "wait." A place where
							children and adults with additional needs feel welcomed, understood, and free to just be.
							Where there are sensory rooms, soft play, a café, classrooms, and even a charity shop, all in
							one space. A hub of safety, joy, support and belonging, for the child melting down, for the
							parent on the edge, for the siblings watching, and for every carer walking this unseen road.
						</p>
					</div>
				),
			},
			{
				id: "because",
				title: "Why this matters",
				content: (
					<div className="space-y-4 text-center">
						<h3 className="text-2xl font-bold text-brand-800">Because no one should have to go through this alone.</h3>
						<h3 className="text-2xl font-bold text-brand-800">Because every Noa deserves to be celebrated.</h3>
						<h3 className="text-2xl font-bold text-brand-800">Because help shouldn't come after the crisis, it should come before.</h3>
					</div>
				),
			},
			{
				id: "hope",
				title: "Hope",
				content: (
					<p className="text-center text-lg font-medium italic text-ink/90">
						We're building this with faith, love, and the strength that Noa has shown us day after day.
						And we hope you'll stand with us as we do.
					</p>
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

