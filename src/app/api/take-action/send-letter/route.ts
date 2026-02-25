import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { getTakeActionItemBySlug } from '@/lib/notion';
import { getMpEmail, isValidUkPostcode } from '@/lib/mpLookup';
import { renderTemplate } from '@/lib/templateRenderer';
import { checkRateLimit } from '@/lib/rateLimit';

const sendLetterSchema = z.object({
  slug: z.string().min(1).max(200),
  firstName: z.string().min(1).max(200),
  lastName: z.string().min(1).max(200),
  postcode: z.string().min(1).max(10),
  addressLine1: z.string().min(1).max(300),
  email: z.string().email().max(320),
});

export async function POST(request: Request) {
  const identifier = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown';
  const allowed = await checkRateLimit(identifier);
  if (!allowed) {
    return NextResponse.json({ message: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body.' }, { status: 400 });
  }

  const parsed = sendLetterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Validation failed. Check required fields and length limits.' }, { status: 400 });
  }

  const { slug, firstName, lastName, postcode, addressLine1, email } = parsed.data;

  if (!isValidUkPostcode(postcode)) {
    return NextResponse.json({ message: 'Please enter a valid UK postcode.' }, { status: 400 });
  }

  const action = await getTakeActionItemBySlug(slug);
  if (!action) {
    return NextResponse.json({ message: 'Action not found.' }, { status: 404 });
  }
  if (action.type !== 'LETTER_TO_MP') {
    return NextResponse.json({ message: 'This action does not support sending a letter.' }, { status: 400 });
  }

  const mpResult = await getMpEmail(postcode);
  if (!mpResult) {
    return NextResponse.json({ message: 'We could not find an email for your MP. Please check your postcode.' }, { status: 400 });
  }

  const templateData: Record<string, string> = {
    firstName,
    lastName,
    firstname: firstName,
    lastname: lastName,
    lasname: lastName,
    postcode,
    addressLine1,
    address: addressLine1,
    email,
    mpName: mpResult.mpName,
  };

  const subject = renderTemplate(action.emailSubject, templateData);
  const bodyText = renderTemplate(action.body, templateData);

  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  const testTo = process.env.TAKE_ACTION_TEST_TO_EMAIL;

  if (!apiKey || !fromEmail) {
    console.error('Send letter: missing RESEND_API_KEY or RESEND_FROM_EMAIL');
    return NextResponse.json({ message: 'Email is not configured.' }, { status: 500 });
  }

  const toEmail = testTo && testTo.length > 0 ? testTo : mpResult.email;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject,
      text: bodyText,
    });

    if (error) {
      console.error('Send letter error:', { slug, timestamp: new Date().toISOString(), success: false });
      return NextResponse.json({ message: 'Failed to send letter. Please try again.' }, { status: 500 });
    }

    console.info('Send letter success:', { slug, timestamp: new Date().toISOString(), success: true });
    return NextResponse.json({ message: 'Letter sent successfully.' }, { status: 200 });
  } catch (err) {
    console.error('Send letter exception:', { slug, timestamp: new Date().toISOString(), success: false }, err);
    return NextResponse.json({ message: 'Failed to send letter. Please try again.' }, { status: 500 });
  }
}
