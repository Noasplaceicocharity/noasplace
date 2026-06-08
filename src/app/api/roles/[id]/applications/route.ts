import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { Database } from '@/lib/supabase/types';
import { subscribeRecruitmentFormToMailchimp } from '@/lib/mailchimp';
import {
  cvAttachmentFromFile,
  sendRoleApplicationEmails,
} from '@/lib/recruitmentEmails';
import {
  formatSensorySessionSelections,
  hasSensorySessionSelection,
  parseSensorySessionSelections,
  roleRequiresSensorySessionDates,
  sensorySessionSelectionsToColumns,
} from '@/lib/sensorySessions';

const sendExperienceSchema = z.enum(['lived_experience', 'basic_knowledge', 'professional']);

const MAX_CV_BYTES = 5 * 1024 * 1024;
const ALLOWED_CV_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

function parseBooleanField(value: FormDataEntryValue | null): boolean {
  return value === 'yes' || value === 'true' || value === 'on';
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: roleId } = await params;
  if (!roleId) {
    return NextResponse.json({ error: 'Role ID required' }, { status: 400 });
  }

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
      dbsHeld: z.enum(['yes', 'no']),
      sendExperience: sendExperienceSchema,
      consentContact: z.literal('yes'),
      consentNews: z.string().optional(),
    })
    .safeParse({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      mobile: formData.get('mobile'),
      address: formData.get('address'),
      dbsHeld: formData.get('dbsHeld'),
      sendExperience: formData.get('sendExperience'),
      consentContact: formData.get('consentContact'),
      consentNews: formData.get('consentNews'),
    });

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? 'Validation failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: role, error: roleError } = await supabase
    .from('roles')
    .select('id, status, role_name, slug')
    .eq('id', roleId)
    .eq('status', 'open')
    .single();

  if (roleError || !role) {
    return NextResponse.json({ error: 'Role not found or no longer open' }, { status: 404 });
  }

  const roleRow = role as { role_name: string; slug: string };
  const roleName = roleRow.role_name;
  const requiresSensorySessions = roleRequiresSensorySessionDates(roleRow.slug);
  const sensorySessionSelections = requiresSensorySessions
    ? parseSensorySessionSelections(formData)
    : null;

  if (requiresSensorySessions && !hasSensorySessionSelection(sensorySessionSelections!)) {
    return NextResponse.json(
      { error: 'Please select at least one session date' },
      { status: 400 }
    );
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
    const storagePath = `${roleId}/${crypto.randomUUID()}.${extension}`;
    const admin = createAdminClient();
    const buffer = Buffer.from(await cvFile.arrayBuffer());

    const { error: uploadError } = await admin.storage
      .from('role-cvs')
      .upload(storagePath, buffer, {
        contentType: cvFile.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('[roles] CV upload error:', uploadError);
      return NextResponse.json({ error: 'Failed to upload CV' }, { status: 500 });
    }

    cvPath = storagePath;
  }

  const payload: Database['public']['Tables']['role_applications']['Insert'] = {
    role_id: roleId,
    first_name: parsed.data.firstName,
    last_name: parsed.data.lastName,
    email: parsed.data.email,
    mobile: parsed.data.mobile,
    address: parsed.data.address,
    dbs_held: parsed.data.dbsHeld === 'yes',
    send_experience: parsed.data.sendExperience,
    cv_path: cvPath,
    consent_contact: true,
    consent_news: parseBooleanField(formData.get('consentNews')),
    ...(sensorySessionSelections
      ? sensorySessionSelectionsToColumns(sensorySessionSelections)
      : {}),
  };

  const table = supabase.from('role_applications') as unknown as {
    insert: (
      v: Database['public']['Tables']['role_applications']['Insert']
    ) => Promise<{ error: { message: string } | null }>;
  };
  const { error: insertError } = await table.insert(payload);

  if (insertError) {
    console.error('[roles] application insert error:', insertError);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
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

  await sendRoleApplicationEmails({
    roleName,
    firstName: parsed.data.firstName,
    lastName: parsed.data.lastName,
    email: parsed.data.email,
    mobile: parsed.data.mobile,
    address: parsed.data.address,
    dbsHeld: parsed.data.dbsHeld === 'yes',
    sendExperience: parsed.data.sendExperience,
    consentNews,
    sensorySessions: sensorySessionSelections
      ? formatSensorySessionSelections(sensorySessionSelections)
      : null,
    cv: cvAttachment,
  });

  return NextResponse.json({ success: true });
}
