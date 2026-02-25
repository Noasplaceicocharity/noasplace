'use client';

import { useEffect, useState } from 'react';
import type {
  SurveyDefinition,
  SurveyQuestion,
  SurveySection,
  SurveyAnswers,
} from '@/lib/survey-types';

interface SurveyFormProps {
  surveyId: string;
}

interface FetchedSurvey {
  id: string;
  title: string;
  description: string | null;
  definition: SurveyDefinition | null;
}

function isSingleWithFollowUp(
  q: SurveyQuestion
): q is SurveyQuestion & { followUp?: { showWhenValue: string; questions: SurveyQuestion[] } } {
  return 'followUp' in q && q.followUp != null;
}

function QuestionBlockWithState({
  question,
  answers,
  setAnswer,
}: {
  question: SurveyQuestion;
  answers: SurveyAnswers;
  setAnswer: (id: string, v: string | string[]) => void;
}) {
  const value = answers[question.id];
  const showFollowUp =
    question.type === 'single' &&
    isSingleWithFollowUp(question) &&
    question.followUp &&
    value === question.followUp.showWhenValue;

  return (
    <div className="space-y-3">
      <label className="block">
        <span className="text-base font-semibold text-ink">{question.question}</span>
        {question.type === 'single' && 'options' in question && (
          <fieldset className="mt-3 space-y-2">
            {(question.options as string[]).map((opt) => (
              <label key={opt} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={opt}
                  checked={value === opt}
                  onChange={() => setAnswer(question.id, opt)}
                  className="h-4 w-4 border-brand-300 text-brand-800 focus:ring-brand-500"
                />
                <span className="text-ink/90">{opt}</span>
              </label>
            ))}
          </fieldset>
        )}
        {question.type === 'multi' && 'options' in question && (
          <fieldset className="mt-3 space-y-2">
            {(question.options as string[]).map((opt) => {
              const arr = Array.isArray(value) ? value : [];
              const checked = arr.includes(opt);
              return (
                <label key={opt} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    value={opt}
                    checked={checked}
                    onChange={() => {
                      if (checked) {
                        setAnswer(question.id, arr.filter((x) => x !== opt));
                      } else {
                        setAnswer(question.id, [...arr, opt]);
                      }
                    }}
                    className="h-4 w-4 border-brand-300 text-brand-800 focus:ring-brand-500 rounded"
                  />
                  <span className="text-ink/90">{opt}</span>
                </label>
              );
            })}
          </fieldset>
        )}
        {question.type === 'scale' && 'scaleLabels' in question && (
          <div className="mt-3">
            {question.scaleOptions && question.scaleOptions.length > 0 ? (
              <fieldset className="space-y-2">
                {question.scaleOptions.map((opt) => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name={question.id}
                      value={opt}
                      checked={value === opt}
                      onChange={() => setAnswer(question.id, opt)}
                      className="h-4 w-4 border-brand-300 text-brand-800 focus:ring-brand-500"
                    />
                    <span className="text-ink/90">{opt}</span>
                  </label>
                ))}
              </fieldset>
            ) : (
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm text-ink/70">{question.scaleLabels.min}</span>
                <div className="flex gap-2">
                  {Array.from(
                    { length: question.scaleSize ?? 5 },
                    (_, i) => i + 1
                  ).map((n) => (
                    <label key={n} className="cursor-pointer">
                      <input
                        type="radio"
                        name={question.id}
                        value={String(n)}
                        checked={value === String(n)}
                        onChange={() => setAnswer(question.id, String(n))}
                        className="sr-only peer"
                      />
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-brand-200 bg-white text-ink font-medium peer-checked:border-brand-800 peer-checked:bg-brand-100 peer-checked:text-brand-900">
                        {n}
                      </span>
                    </label>
                  ))}
                </div>
                <span className="text-sm text-ink/70">{question.scaleLabels.max}</span>
              </div>
            )}
          </div>
        )}
        {question.type === 'text' && (
          <textarea
            name={question.id}
            value={(value as string) ?? ''}
            onChange={(e) => setAnswer(question.id, e.target.value)}
            rows={4}
            className="mt-3 w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-ink placeholder:text-ink/50 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            placeholder="Your response..."
          />
        )}
      </label>
      {showFollowUp &&
        question.type === 'single' &&
        isSingleWithFollowUp(question) &&
        question.followUp?.questions.map((fq) => (
          <div key={fq.id} className="ml-6 mt-4 pl-4 border-l-2 border-brand-200">
            <QuestionBlockWithState
              question={fq}
              answers={answers}
              setAnswer={setAnswer}
            />
          </div>
        ))}
    </div>
  );
}

function SectionBlock({
  section,
  answers,
  setAnswer,
}: {
  section: SurveySection;
  answers: SurveyAnswers;
  setAnswer: (id: string, v: string | string[]) => void;
}) {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold text-brand-800 mb-6">{section.title}</h3>
      <div className="space-y-8">
        {section.questions.map((q) => (
          <QuestionBlockWithState
            key={q.id}
            question={q}
            answers={answers}
            setAnswer={setAnswer}
          />
        ))}
      </div>
    </div>
  );
}

export default function SurveyForm({ surveyId }: SurveyFormProps) {
  const [survey, setSurvey] = useState<FetchedSurvey | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const setAnswer = (id: string, v: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: v }));
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/surveys/${encodeURIComponent(surveyId)}`);
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setError(data.error || 'Survey not found');
          return;
        }
        const data = await res.json();
        if (!cancelled) setSurvey(data);
      } catch (e) {
        if (!cancelled) setError('Failed to load survey');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [surveyId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(`/api/surveys/${encodeURIComponent(surveyId)}/responses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setSubmitError(data.error || 'Submission failed');
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError('Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-brand-50/50 border border-brand-100/30 p-12 text-center">
        <p className="text-ink/80">Loading survey…</p>
      </div>
    );
  }
  if (error || !survey) {
    return (
      <div className="rounded-2xl bg-brand-50/50 border border-brand-100/30 p-8 text-center">
        <p className="text-ink/80">{error ?? 'Survey not available.'}</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-brand-50/50 border border-brand-100/30 p-10 text-center">
        <h3 className="text-xl font-bold text-brand-800 mb-3">Thank you</h3>
        <p className="text-ink/80">
          Your response has been recorded. We will use your feedback to present real parent voices to MPs and decision-makers.
        </p>
      </div>
    );
  }

  const def = survey.definition;
  if (!def || !def.sections?.length) {
    return (
      <div className="rounded-2xl bg-brand-50/50 border border-brand-100/30 p-8 text-center">
        <p className="text-ink/80">This survey has no questions configured.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-brand-100/30 bg-white">
      <div className="p-8 sm:p-10">
        {survey.title && (
          <h2 className="text-2xl font-black text-brand-800 mb-4">{survey.title}</h2>
        )}
        {def.introText && (
          <p className="text-ink/80 whitespace-pre-line mb-8">{def.introText}</p>
        )}
        <form onSubmit={handleSubmit}>
          {def.sections.map((section) => (
            <SectionBlock
              key={section.id}
              section={section}
              answers={answers}
              setAnswer={setAnswer}
            />
          ))}
          {submitError && (
            <p className="mb-4 text-red-600 text-sm">{submitError}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto rounded-xl bg-brand-800 px-8 py-4 font-bold text-white hover:bg-brand-900 disabled:opacity-60 transition-colors"
          >
            {submitting ? 'Submitting…' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
