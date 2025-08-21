"use client";

import { useState } from "react";

type Item = { q: string; a: string };

const DEFAULTS: Item[] = [
  {
    q: "Is my donation secure?",
    a: "Yes. We use trusted payment providers and never store card details on our servers.",
  },
  {
    q: "Can I add Gift Aid?",
    a: "If you're a UK taxpayer, Gift Aid lets us claim an extra 25p for every £1 you give.",
  },
  {
    q: "Can I change or cancel my monthly donation?",
    a: "Absolutely. You can adjust or cancel at any time – no questions asked.",
  },
];

export default function Faq({ items = DEFAULTS }: { items?: Item[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-center text-2xl font-extrabold text-ink sm:text-3xl">Frequently asked questions</h2>
      <div className="mt-6 divide-y divide-brand-100 rounded-2xl bg-white ring-1 ring-brand-100">
        {items.map((item, idx) => {
          const open = openIndex === idx;
          return (
            <div key={idx} className="p-4 sm:p-5">
              <button
                className="flex w-full items-center justify-between gap-4 text-left"
                onClick={() => setOpenIndex(open ? null : idx)}
                aria-expanded={open}
              >
                <span className="text-sm font-semibold text-ink">{item.q}</span>
                <span className="text-ink/50">{open ? "–" : "+"}</span>
              </button>
              {open && (
                <p className="mt-2 text-sm leading-6 text-muted">{item.a}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


