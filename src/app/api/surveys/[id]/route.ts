import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: 'Survey ID required' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('surveys')
    .select('id, title, description, definition')
    .eq('id', id)
    .eq('active', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return NextResponse.json({ error: 'Survey not found' }, { status: 404 });
    }
    console.error('[surveys] GET error:', error);
    return NextResponse.json({ error: 'Failed to load survey' }, { status: 500 });
  }

  return NextResponse.json(data);
}
