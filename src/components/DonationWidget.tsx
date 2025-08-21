"use client";

import { useMemo, useState } from "react";

type Frequency = "once" | "monthly";

export default function DonationWidget({ donationUrl }: { donationUrl?: string }) {
  const [frequency, setFrequency] = useState<Frequency>("once");
  const [amount, setAmount] = useState<number | "">(25);

  const amounts = useMemo(() => [10, 25, 50, 100], []);

  const donateHref = useMemo(() => {
    const base = donationUrl ?? "#";
    const amt = amount === "" ? 0 : amount;
    const sep = base.includes("?") ? "&" : "?";
    return `${base}${base === "#" ? "" : `${sep}amount=${amt}&frequency=${frequency}`}`;
  }, [amount, frequency, donationUrl]);

  const canDonate = amount !== "" && Number(amount) > 0;

  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-xl ring-1 ring-brand-100 sm:p-6">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={`rounded-lg px-3 py-2 text-sm font-semibold ring-1 ring-inset transition ${
            frequency === "once"
              ? "bg-brand-800 text-white ring-brand-800"
              : "bg-white text-ink ring-brand-100 hover:bg-brand-50"
          }`}
          onClick={() => setFrequency("once")}
          aria-pressed={frequency === "once"}
        >
          One-off
        </button>
        <button
          type="button"
          className={`rounded-lg px-3 py-2 text-sm font-semibold ring-1 ring-inset transition ${
            frequency === "monthly"
              ? "bg-brand-800 text-white ring-brand-800"
              : "bg-white text-ink ring-brand-100 hover:bg-brand-50"
          }`}
          onClick={() => setFrequency("monthly")}
          aria-pressed={frequency === "monthly"}
        >
          Monthly
        </button>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
        {amounts.map((value) => {
          const selected = amount !== "" && Number(amount) === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setAmount(value)}
              className={`rounded-xl px-3 py-3 text-center text-sm font-semibold transition ring-1 ${
                selected
                  ? "bg-brand-800 text-white ring-brand-800"
                  : "bg-white text-ink ring-brand-100 hover:bg-brand-50"
              }`}
              aria-pressed={selected}
            >
              £{value}
            </button>
          );
        })}
        <div className="col-span-4 sm:col-span-1">
          <label className="sr-only" htmlFor="custom-amount">Custom amount</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">£</span>
            <input
              id="custom-amount"
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full rounded-xl border-0 bg-white px-6 py-3 text-sm text-ink ring-1 ring-brand-100 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="Custom"
              value={amount === "" ? "" : amount}
              onChange={(e) => {
                const v = e.target.value.replace(/[^0-9]/g, "");
                setAmount(v === "" ? "" : Number(v));
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted">Secure payments • Cancel anytime • Gift Aid eligible</p>
        <a
          href={donateHref}
          aria-disabled={!canDonate}
          className={`inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold shadow-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
            canDonate
              ? "bg-brand-800 text-white shadow-brand-800/20 hover:bg-brand-900"
              : "bg-brand-100 text-brand-800/60 cursor-not-allowed"
          }`}
        >
          {frequency === "monthly" ? "Start monthly gift" : "Donate now"}
        </a>
      </div>
    </div>
  );
}


