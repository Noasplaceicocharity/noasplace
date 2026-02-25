import { NextResponse } from 'next/server';
import { getTakeActionItems } from '@/lib/notion';
import type { TakeActionListItem } from '@/lib/notion';

export async function GET() {
  try {
    const items = await getTakeActionItems();
    const sorted = [...items].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    const letterToMp: TakeActionListItem | null =
      sorted.find((i) => i.type === 'LETTER_TO_MP') ?? null;
    const survey: TakeActionListItem | null =
      sorted.find((i) => i.type === 'SURVEY') ?? null;
    return NextResponse.json({ letterToMp, survey });
  } catch (error) {
    console.error('Error fetching featured take action:', error);
    return NextResponse.json(
      { letterToMp: null, survey: null },
      { status: 500 }
    );
  }
}
