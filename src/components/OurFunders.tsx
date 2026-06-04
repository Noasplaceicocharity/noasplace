import Image from "next/image";
import { FUNDERS } from "@/data/funders";

type OurFundersProps = {
  heading?: string;
  align?: "left" | "center";
  className?: string;
};

export default function OurFunders({
  heading = "Our funders",
  align = "center",
  className = "",
}: OurFundersProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`${isCenter ? "text-center" : ""} ${className}`}
      aria-label={heading}
    >
      <p className={`text-sm text-ink/60 ${isCenter ? "" : ""}`}>{heading}</p>
      <div
        className={`mt-3 flex flex-wrap items-center gap-6 sm:gap-8 ${
          isCenter ? "justify-center" : ""
        }`}
      >
        {FUNDERS.map((funder) => (
          <Image
            key={funder.src}
            src={funder.src}
            alt={funder.alt}
            width={funder.width}
            height={funder.height}
            className={funder.className}
          />
        ))}
      </div>
    </div>
  );
}
