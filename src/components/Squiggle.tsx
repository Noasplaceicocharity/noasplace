type Props = {
  className?: string;
  colorClassName?: string; // Tailwind text-* class applied to stroke
  strokeWidth?: number;
  variant?: "wave" | "loop";
};

export default function Squiggle({ className, colorClassName = "text-brand-100", strokeWidth = 8, variant = "wave" }: Props) {
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === "wave" ? (
        <path className={colorClassName} d="M5,60 C25,10 75,90 95,40" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />
      ) : (
        <path className={colorClassName} d="M50,20 C20,20 20,80 50,80 C80,80 80,20 50,20 Z" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />
      )}
    </svg>
  );
}


