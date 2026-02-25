import Link from "next/link";
import type { BannerBarItem } from "@/lib/notion";

type Props = { banner: BannerBarItem };

export default function BannerBar({ banner }: Props) {
  const hasButton = Boolean(banner.buttonText?.trim() && banner.link?.trim());

  return (
    <div
      className="relative z-[60] w-full bg-brand-800 text-white"
      role="banner"
      aria-label="Site announcement"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6 lg:px-8">
        <p className="text-center font-body text-sm font-medium leading-snug text-white/95 sm:text-base">
          {banner.bannerText}
        </p>
        {hasButton && (
          <Link
            href={banner.link}
            className="shrink-0 rounded-md border-2 border-white/90 bg-white/10 px-4 py-1.5 font-ui text-sm font-semibold text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-brand-800"
          >
            {banner.buttonText}
          </Link>
        )}
      </div>
    </div>
  );
}
