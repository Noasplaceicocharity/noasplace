'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import type { TakeActionListItem, TakeActionType } from '@/lib/notion';

interface TakeActionClientProps {
  items: TakeActionListItem[];
  types: TakeActionType[];
}

const TYPE_ORDER: TakeActionType[] = ['LETTER_TO_MP', 'SURVEY'];

function typeBadgeLabel(type: TakeActionType): string {
  switch (type) {
    case 'LETTER_TO_MP':
      return 'Letter to MP';
    case 'SURVEY':
      return 'Survey';
    default:
      return type;
  }
}

function typeSectionDescription(type: TakeActionType): string {
  switch (type) {
    case 'LETTER_TO_MP':
      return 'We make it easy to send emails by giving you templates. Just enter your details and send.';
    case 'SURVEY':
      return 'Surveys gather facts to help our steering of matters when we take issues to MPs and decision makers.';
    default:
      return '';
  }
}

function ActionCard({ item, typeLabel }: { item: TakeActionListItem; typeLabel: string }) {
  return (
    <Link
      href={`/take-action/${item.slug}`}
      className="group block rounded-2xl bg-white shadow-sm border border-brand-100/30 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="p-6">
        <span className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-800 border border-brand-200/30">
          {typeLabel}
        </span>
        <h3 className="mt-4 text-xl font-extrabold text-brand-800 group-hover:text-brand-900 transition-colors leading-tight">
          {item.title}
        </h3>
        <p className="mt-3 text-ink/80 leading-relaxed text-base line-clamp-3">
          {item.summary || 'No summary.'}
        </p>
        <span className="mt-4 inline-flex items-center text-brand-800 group-hover:text-brand-900 font-bold text-sm">
          Take action
          <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default function TakeActionClient({ items, types }: TakeActionClientProps) {
  const searchParams = useSearchParams();
  const selectedType = searchParams.get('type') as TakeActionType | null;

  const itemsByType = useMemo(() => {
    const map = new Map<TakeActionType, TakeActionListItem[]>();
    for (const t of TYPE_ORDER) {
      map.set(t, []);
    }
    for (const item of items) {
      if (!selectedType || item.type === selectedType) {
        const list = map.get(item.type) ?? [];
        list.push(item);
        map.set(item.type, list);
      }
    }
    return map;
  }, [items, selectedType]);

  const sectionsToShow = useMemo(() => {
    return TYPE_ORDER.filter((t) => (itemsByType.get(t)?.length ?? 0) > 0);
  }, [itemsByType]);

  const hasAnyItems = sectionsToShow.length > 0;

  const filterUrl = (type: TakeActionType | null) =>
    type ? `/take-action?type=${encodeURIComponent(type)}` : '/take-action';

  return (
    <main className="bg-background text-ink">
      <section className="relative isolate min-h-[400px] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg
            className="absolute -left-12 top-12 h-32 w-32 rotate-[-12deg] text-[#6E3482]/40"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <path d="M70,35 C70,25 65,20 60,20 L40,20 C35,20 30,25 30,35 C30,40 25,45 20,45 C10,45 5,50 5,60 L5,80 C5,85 10,90 20,90 C25,90 30,95 30,100 C30,110 35,115 40,115 L60,115 C65,115 70,110 70,100 C70,95 75,90 80,90 C90,90 95,85 95,80 L95,60 C95,50 90,45 80,45 C75,45 70,40 70,35" />
          </svg>
          <svg
            className="absolute -right-12 top-20 h-28 w-44 rotate-12 text-[#40BFBF]/40"
            viewBox="0 0 100 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
          >
            <path d="M30,25 C30,15 35,10 45,10 C55,10 60,15 60,25 C60,35 55,40 45,40 C35,40 30,35 30,25 M70,25 C70,15 75,10 85,10 C95,10 100,15 100,25 C100,35 95,40 85,40 C75,40 70,35 70,25" />
          </svg>
          <div className="absolute right-1/4 top-1/4 size-6 rounded-full bg-[#6E3482]/30" />
          <div className="absolute left-1/3 bottom-1/3 size-5 rounded-full bg-[#40BFBF]/40" />
          <div className="absolute right-1/3 top-2/3 size-4 rounded-full bg-[#FFB800]/30" />
        </div>

        <div className="relative px-6 pt-16 pb-8 sm:pt-20 sm:pb-12">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-black text-brand-800 sm:text-5xl md:text-6xl mb-6">
              Take Action
            </h1>
            <p className="text-xl font-bold text-ink sm:text-2xl">
              Surveys and campaigns to make your voice heard
            </p>
            {types.length > 0 && (
              <nav className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Filter by action type">
                {types.map((type) => (
                  <Link
                    key={type}
                    href={selectedType === type ? '/take-action' : filterUrl(type)}
                    className={`inline-flex rounded-full px-4 py-2 text-sm font-medium transition-colors border ${
                      selectedType === type
                        ? 'bg-brand-800 text-white border-brand-800'
                        : 'bg-white/90 text-brand-800 hover:bg-brand-100 border-brand-100/30'
                    }`}
                  >
                    {typeBadgeLabel(type)}
                  </Link>
                ))}
              </nav>
            )}
            {selectedType && (
              <p className="mt-3 text-sm text-brand-800">
                Showing only: <span className="font-bold">{typeBadgeLabel(selectedType)}</span>
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white pt-8 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {!hasAnyItems ? (
            <div className="flex min-h-[320px] w-full flex-col items-center justify-center py-12 text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-100 mb-6">
                <svg className="h-12 w-12 text-brand-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-ink mb-2">
                {selectedType ? 'No actions match your filters' : 'No actions yet'}
              </h3>
              <p className="text-ink/60">
                {selectedType
                  ? 'Try changing or clearing the filters.'
                  : "Check back soon for new ways to take action."}
              </p>
              {selectedType && (
                <Link href="/take-action" className="inline-flex items-center mt-4 text-brand-800 hover:text-brand-900 underline">
                  ← View all actions
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-16">
              {sectionsToShow.map((type) => {
                const typeItems = itemsByType.get(type) ?? [];
                const label = typeBadgeLabel(type);
                const description = typeSectionDescription(type);
                return (
                  <section
                    key={type}
                    id={`section-${type}`}
                    className="scroll-mt-24"
                    aria-labelledby={`heading-${type}`}
                  >
                    <div className="mb-8">
                      <h2
                        id={`heading-${type}`}
                        className="text-2xl font-extrabold text-brand-800 sm:text-3xl"
                      >
                        {label}
                      </h2>
                      <p className="mt-2 text-ink/80 max-w-2xl">
                        {description}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {typeItems.map((item) => (
                        <ActionCard key={item.slug} item={item} typeLabel={label} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
