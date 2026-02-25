import { parseSurveyEmbedSrc } from '@/lib/surveyEmbed';

interface SurveyBlockProps {
  surveyEmbed: string;
}

export default function SurveyBlock({ surveyEmbed }: SurveyBlockProps) {
  const parsed = parseSurveyEmbedSrc(surveyEmbed);
  if (!parsed) {
    return (
      <div className="rounded-2xl bg-brand-50/50 border border-brand-100/30 p-8 text-center">
        <p className="text-ink/80">This survey is not available at the moment. Please try again later.</p>
      </div>
    );
  }
  return (
    <div className="rounded-2xl overflow-hidden border border-brand-100/30 bg-white">
      <iframe
        src={parsed.src}
        title="Survey"
        className="w-full min-h-[500px] border-0"
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  );
}
