import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { Database } from '@/lib/supabase/types';
import { subscribeRecruitmentFormToMailchimp } from '@/lib/mailchimp';
import {
  cvAttachmentFromFile,
  sendVolunteerApplicationEmails,
} from '@/lib/recruitmentEmails';

const sendExperienceSchema = z.enum([
  'lived_experience',
  'basic_knowledge',
  'expert_knowledge',
  'no_knowledge',
]);

function parseBooleanField(value: FormDataEntryValue | null): boolean {
  return value === 'yes' || value === 'true' || value === 'on';
}

const MAX_CV_BYTES = 5 * 1024 * 1024;
const ALLOWED_CV_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const parsed = z
    .object({
      firstName: z.string().trim().min(1, 'First name is required'),
      lastName: z.string().trim().min(1, 'Last name is required'),
      email: z.string().trim().email('A valid email is required'),
      mobile: z.string().trim().min(1, 'Mobile number is required'),
      address: z.string().trim().min(1, 'Address is required'),
      sendExperience: sendExperienceSchema,
      consentContact: z.literal('yes'),
    })
    .safeParse({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      mobile: formData.get('mobile'),
      address: formData.get('address'),
      sendExperience: formData.get('sendExperience'),
      consentContact: formData.get('consentContact'),
    });

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? 'Validation failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const cvFile = formData.get('cv');
  const cvAttachment = await cvAttachmentFromFile(cvFile);
  let cvPath: string | null = null;

  if (cvFile instanceof File && cvFile.size > 0) {
    if (cvFile.size > MAX_CV_BYTES) {
      return NextResponse.json({ error: 'CV must be 5 MB or smaller' }, { status: 400 });
    }

    if (!ALLOWED_CV_TYPES.has(cvFile.type)) {
      return NextResponse.json(
        { error: 'CV must be a PDF or Word document' },
        { status: 400 }
      );
    }

    const extension = cvFile.name.split('.').pop()?.toLowerCase() ?? 'pdf';
    const storagePath = `${crypto.randomUUID()}.${extension}`;
    const admin = createAdminClient();
    const buffer = Buffer.from(await cvFile.arrayBuffer());

    const { error: uploadError } = await admin.storage
      .from('volunteer-cvs')
      .upload(storagePath, buffer, {
        contentType: cvFile.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('[volunteer] CV upload error:', uploadError);
      return NextResponse.json({ error: 'Failed to upload CV' }, { status: 500 });
    }

    cvPath = storagePath;
  }

  const payload: Database['public']['Tables']['volunteer_applications']['Insert'] = {
    first_name: parsed.data.firstName,
    last_name: parsed.data.lastName,
    email: parsed.data.email,
    mobile: parsed.data.mobile,
    address: parsed.data.address,
    send_experience: parsed.data.sendExperience,
    cv_path: cvPath,
    consent_contact: true,
    consent_news: parseBooleanField(formData.get('consentNews')),
  };

  const supabase = await createClient();
  const table = supabase.from('volunteer_applications') as unknown as {
    insert: (
      v: Database['public']['Tables']['volunteer_applications']['Insert']
    ) => Promise<{ error: { message: string } | null }>;
  };
  const { error: insertError } = await table.insert(payload);

  if (insertError) {
    console.error('[volunteer] insert error:', insertError);
    return NextResponse.json({ error: 'Failed to submit interest' }, { status: 500 });
  }

  const consentNews = parseBooleanField(formData.get('consentNews'));

  if (consentNews) {
    await subscribeRecruitmentFormToMailchimp({
      email: parsed.data.email,
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      mobile: parsed.data.mobile,
    });
  }

  await sendVolunteerApplicationEmails({
    firstName: parsed.data.firstName,
    lastName: parsed.data.lastName,
    email: parsed.data.email,
    mobile: parsed.data.mobile,
    address: parsed.data.address,
    sendExperience: parsed.data.sendExperience,
    consentNews,
    cv: cvAttachment,
  });

  return NextResponse.json({ success: true });
}
