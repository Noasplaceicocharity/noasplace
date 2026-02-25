import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getMpEmail, isValidUkPostcode } from '@/lib/mpLookup';

const lookupMpSchema = z.object({
  postcode: z.string().min(1).max(10),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body.' }, { status: 400 });
  }

  const parsed = lookupMpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Please provide a valid postcode.' }, { status: 400 });
  }

  const { postcode } = parsed.data;

  if (!isValidUkPostcode(postcode)) {
    return NextResponse.json(
      { message: 'Please enter a valid UK postcode.' },
      { status: 400 }
    );
  }

  const mpResult = await getMpEmail(postcode);
  if (!mpResult) {
    return NextResponse.json(
      { message: "We couldn't find an MP with a contact email for that postcode. Please check and try again." },
      { status: 404 }
    );
  }

  return NextResponse.json({ mpName: mpResult.mpName, mpEmail: mpResult.email });
}
