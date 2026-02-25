import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTakeActionItemBySlug } from '@/lib/notion';
import SurveyBlock from './SurveyBlock';
import SurveyForm from './SurveyForm';
import LetterToMpClient from './LetterToMpClient';

interface TakeActionSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TakeActionSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getTakeActionItemBySlug(slug);
  if (!item) {
    return { title: 'Action not found' };
  }
  const description = item.summary.length > 160 ? item.summary.substring(0, 157) + '...' : item.summary;
  return {
    title: `${item.title} | Take Action | Noa's Place`,
    description,
    openGraph: {
      title: item.title,
      description,
      url: `https://noasplace.org.uk/take-action/${item.slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://noasplace.org.uk/take-action/${item.slug}`,
    },
  };
}

export default async function TakeActionSlugPage({ params }: TakeActionSlugPageProps) {
  const { slug } = await params;
  const item = await getTakeActionItemBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="bg-background text-ink">
      <section className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute right-1/4 top-1/4 size-6 rounded-full bg-[#6E3482]/30" />
          <div className="absolute left-1/3 bottom-1/3 size-5 rounded-full bg-[#40BFBF]/40" />
        </div>
        <div className="relative px-6 pt-16 pb-8 sm:pt-20 sm:pb-12">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/take-action"
              className="inline-flex items-center text-brand-600 hover:text-brand-800 transition-colors font-medium mb-6"
            >
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Take Action
            </Link>
            <h1 className="text-4xl font-black text-brand-800 sm:text-5xl mb-6">{item.title}</h1>
            {item.description && (
              <p className="text-ink/80 text-base leading-relaxed whitespace-pre-line max-w-3xl">
                {item.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white pt-8 pb-24">
        <div className="mx-auto max-w-4xl px-6">
          {item.type === 'SURVEY' && item.surveyId && (
            <SurveyForm surveyId={item.surveyId} />
          )}
          {item.type === 'SURVEY' && !item.surveyId && item.surveyEmbed && (
            <SurveyBlock surveyEmbed={item.surveyEmbed} />
          )}
          {item.type === 'SURVEY' && !item.surveyId && !item.surveyEmbed && (
            <div className="rounded-2xl bg-brand-50/50 border border-brand-100/30 p-8 text-center">
              <p className="text-ink/80">No survey linked. Add a Survey ID in Notion for this action.</p>
            </div>
          )}
          {item.type === 'LETTER_TO_MP' && (
            <LetterToMpClient
              action={{
                slug: item.slug,
                title: item.title,
                emailSubject: item.emailSubject,
                body: item.body,
              }}
            />
          )}
          {item.type !== 'SURVEY' && item.type !== 'LETTER_TO_MP' && (
            <div className="rounded-2xl bg-brand-50/50 border border-brand-100/30 p-8 text-center">
              <p className="text-ink/80">This action type is not supported yet.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
