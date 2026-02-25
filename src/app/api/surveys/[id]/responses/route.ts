import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const submitSchema = z.object({
  answers: z.record(z.union([z.string(), z.array(z.string())])),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: surveyId } = await params;
  if (!surveyId) {
    return NextResponse.json({ error: 'Survey ID required' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = submitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed. answers must be an object.' },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { error: fetchError } = await supabase
    .from('surveys')
    .select('id')
    .eq('id', surveyId)
    .eq('active', true)
    .single();

  if (fetchError) {
    if (fetchError.code === 'PGRST116') {
      return NextResponse.json({ error: 'Survey not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Survey unavailable' }, { status: 500 });
  }

  const { error: insertError } = await supabase.from('survey_responses').insert({
    survey_id: surveyId,
    answers: parsed.data.answers as Record<string, unknown>,
  });

  if (insertError) {
    console.error('[surveys] POST responses error:', insertError);
    return NextResponse.json(
      { error: 'Failed to submit response' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
