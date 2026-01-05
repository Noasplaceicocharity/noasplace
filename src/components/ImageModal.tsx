"use client";

import Image from "next/image";
import { useEffect } from "react";

interface ImageModalProps {
	isOpen: boolean;
	onClose: () => void;
	image: { src: string; alt: string };
	title: string;
	description: string;
	features: string[];
}

export default function ImageModal({
	isOpen,
	onClose,
	image,
	title,
	description,
	features,
}: ImageModalProps) {
	// Handle escape key press
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-white/20 backdrop-blur-md animate-fade-in"
			onClick={onClose}
		>
			<div
				className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-brand-100/50"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 z-10 text-ink/80 hover:text-brand-800 transition-all duration-300 hover:scale-110 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-lg border border-brand-100/40"
					aria-label="Close modal"
				>
					<svg
						className="w-6 h-6"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M18 6L6 18M6 6l12 12" />
					</svg>
				</button>

				{/* Image */}
				<div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-t-3xl">
					<Image
						src={image.src}
						alt={image.alt}
						fill
						className="object-cover"
						priority
					/>
				</div>

				{/* Content */}
				<div className="p-6 sm:p-8 md:p-10">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-800 mb-4 tracking-tight">
						{title}
					</h2>
					<p className="text-lg sm:text-xl text-ink/70 mb-6 leading-relaxed">
						{description}
					</p>
					<ul className="space-y-3">
						{features.map((feature, index) => (
							<li
								key={index}
								className="flex items-start gap-3 text-base sm:text-lg text-ink/80"
							>
								<svg
									className="w-5 h-5 sm:w-6 sm:h-6 text-brand-800 mt-0.5 flex-shrink-0"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
								<span>{feature}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

