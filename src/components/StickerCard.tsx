import { ReactNode } from "react";

type Props = {
  emoji: string;
  title: string;
  children: ReactNode;
  color?: "pink" | "purple" | "yellow" | "mint";
};

const COLOR_MAP = {
  pink: {
    bg: "bg-[#FFE5F1]",
    ring: "ring-[#FFC1DD]",
  },
  purple: {
    bg: "bg-brand-50",
    ring: "ring-brand-100",
  },
  yellow: {
    bg: "bg-[#FFF7D6]",
    ring: "ring-[#FFEFA8]",
  },
  mint: {
    bg: "bg-[#E7FFF3]",
    ring: "ring-[#C7F7E3]",
  },
};

export default function StickerCard({ emoji, title, children, color = "purple" }: Props) {
  const c = COLOR_MAP[color];
  return (
    <div className={`relative rounded-2xl ${c.bg} p-5 shadow-[0_6px_0_0_rgba(0,0,0,0.08)] ring-2 ${c.ring}`}>
      <div className="absolute -top-2 -right-2 rotate-6 rounded bg-white/70 px-2 py-1 text-xs font-bold text-ink/70 shadow ring-1 ring-black/5">★</div>
      <div className="inline-flex size-12 items-center justify-center rounded-xl bg-white/70 text-2xl">{emoji}</div>
      <h3 className="mt-3 text-lg font-extrabold text-ink">{title}</h3>
      <div className="mt-1 text-sm text-ink/80">{children}</div>
    </div>
  );
}


