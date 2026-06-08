import { Resend } from 'resend';
import {
  renderAdminNotificationEmail,
  renderConfirmationEmail,
  type EmailDetailRow,
} from '@/lib/emailTemplate';

const DEFAULT_FROM = "Noa's Place <hello@noasplace.org.uk>";
const DEFAULT_NOTIFY_TO = 'volunteer@noasplace.org.uk';

export type EmailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

function getFromEmail(): string {
  return process.env.RECRUITMENT_FROM_EMAIL ?? process.env.RESEND_FROM_EMAIL ?? DEFAULT_FROM;
}

function getNotifyEmail(): string {
  const testTo = process.env.RECRUITMENT_TEST_TO_EMAIL;
  if (testTo?.trim()) return testTo.trim();
  return process.env.RECRUITMENT_NOTIFY_EMAIL ?? DEFAULT_NOTIFY_TO;
}

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function yesNo(value: boolean): string {
  return value ? 'Yes' : 'No';
}

function detailRowsToText(rows: EmailDetailRow[]): string {
  return rows.map((row) => `${row.label}: ${row.value}`).join('\n');
}

async function sendEmail(options: {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}): Promise<{ ok: boolean; error?: string }> {
  const resend = getResendClient();
  if (!resend) {
    console.error('[recruitment] Missing RESEND_API_KEY');
    return { ok: false, error: 'Email not configured' };
  }

  const { error } = await resend.emails.send({
    from: getFromEmail(),
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
    html: options.html,
    attachments: options.attachments?.map((attachment) => ({
      filename: attachment.filename,
      content: attachment.content,
      contentType: attachment.contentType,
    })),
  });

  if (error) {
    console.error('[recruitment] Resend error:', error);
    return { ok: false, error: error.message };
  }

  return { ok: true };
}

export async function cvAttachmentFromFile(
  file: FormDataEntryValue | null
): Promise<EmailAttachment | null> {
  if (!(file instanceof File) || file.size === 0) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  return {
    filename: file.name || 'cv.pdf',
    content: buffer,
    contentType: file.type || undefined,
  };
}

const ROLE_SEND_EXPERIENCE_LABELS: Record<string, string> = {
  lived_experience: 'Lived experience',
  basic_knowledge: 'Basic knowledge',
  professional: 'Professional',
};

const VOLUNTEER_SEND_EXPERIENCE_LABELS: Record<string, string> = {
  lived_experience: 'Lived experience',
  basic_knowledge: 'Basic knowledge',
  expert_knowledge: 'Expert knowledge',
  no_knowledge: 'No knowledge',
};

export async function sendRoleApplicationEmails(input: {
  roleName: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  address: string;
  dbsHeld: boolean;
  sendExperience: string;
  consentNews: boolean;
  cv?: EmailAttachment | null;
}): Promise<void> {
  const applicantName = `${input.firstName} ${input.lastName}`;
  const sendExperienceLabel =
    ROLE_SEND_EXPERIENCE_LABELS[input.sendExperience] ?? input.sendExperience;

  const adminRows: EmailDetailRow[] = [
    { label: 'Role', value: input.roleName },
    { label: 'Name', value: applicantName },
    { label: 'Email', value: input.email },
    { label: 'Mobile', value: input.mobile },
    { label: 'Address', value: input.address },
    { label: 'Current DBS held', value: yesNo(input.dbsHeld) },
    { label: 'SEND experience', value: sendExperienceLabel },
    { label: 'Happy to receive latest news', value: yesNo(input.consentNews) },
  ];

  const adminSubject = `You got an application for ${input.roleName}`;
  const adminText = [
    'A new application has been submitted.',
    '',
    detailRowsToText(adminRows),
    '',
    `CV attached: ${input.cv ? 'Yes' : 'No'}`,
  ].join('\n');

  const confirmationSubject = `Thank you for applying – ${input.roleName}`;
  const confirmationMessage = [
    `Thank you for applying for the ${input.roleName} role at Noa's Place.`,
    'We have received your application and will be in touch soon.',
    "Best wishes,\nThe Noa's Place team",
  ].join('\n\n');

  const notifyResult = await sendEmail({
    to: getNotifyEmail(),
    replyTo: input.email,
    subject: adminSubject,
    text: adminText,
    html: renderAdminNotificationEmail({
      title: adminSubject,
      preheader: `New application for ${input.roleName} from ${applicantName}`,
      intro: 'A new application has been submitted on the Noa\'s Place website.',
      detailRows: adminRows,
      cvAttached: Boolean(input.cv),
    }),
    attachments: input.cv ? [input.cv] : undefined,
  });

  const confirmResult = await sendEmail({
    to: input.email,
    subject: confirmationSubject,
    text: [`Dear ${input.firstName},`, '', confirmationMessage].join('\n'),
    html: renderConfirmationEmail({
      firstName: input.firstName,
      title: 'Thank you for applying',
      preheader: `We've received your application for ${input.roleName}`,
      message: confirmationMessage,
    }),
  });

  if (!notifyResult.ok || !confirmResult.ok) {
    console.error('[recruitment] Role application emails incomplete', {
      notifyOk: notifyResult.ok,
      confirmOk: confirmResult.ok,
      roleName: input.roleName,
    });
  }
}

export async function sendVolunteerApplicationEmails(input: {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  address: string;
  sendExperience: string;
  consentNews: boolean;
  cv?: EmailAttachment | null;
}): Promise<void> {
  const applicantName = `${input.firstName} ${input.lastName}`;
  const sendExperienceLabel =
    VOLUNTEER_SEND_EXPERIENCE_LABELS[input.sendExperience] ?? input.sendExperience;

  const adminRows: EmailDetailRow[] = [
    { label: 'Application type', value: 'Volunteer interest' },
    { label: 'Name', value: applicantName },
    { label: 'Email', value: input.email },
    { label: 'Mobile', value: input.mobile },
    { label: 'Address', value: input.address },
    { label: 'SEND experience', value: sendExperienceLabel },
    { label: 'Happy to be contacted', value: 'Yes' },
    { label: 'Happy to receive latest news', value: yesNo(input.consentNews) },
  ];

  const adminSubject = 'You got an application for Volunteering';
  const adminText = [
    'A new volunteer interest form has been submitted.',
    '',
    detailRowsToText(adminRows),
    '',
    `CV attached: ${input.cv ? 'Yes' : 'No'}`,
  ].join('\n');

  const confirmationSubject = "Thank you for applying to volunteer with Noa's Place";
  const confirmationMessage = [
    "Thank you for registering your interest in volunteering with Noa's Place.",
    'We have received your application and will be in touch soon.',
    "Best wishes,\nThe Noa's Place team",
  ].join('\n\n');

  const notifyResult = await sendEmail({
    to: getNotifyEmail(),
    replyTo: input.email,
    subject: adminSubject,
    text: adminText,
    html: renderAdminNotificationEmail({
      title: adminSubject,
      preheader: `New volunteer application from ${applicantName}`,
      intro: 'A new volunteer interest form has been submitted on the Noa\'s Place website.',
      detailRows: adminRows,
      cvAttached: Boolean(input.cv),
    }),
    attachments: input.cv ? [input.cv] : undefined,
  });

  const confirmResult = await sendEmail({
    to: input.email,
    subject: confirmationSubject,
    text: [`Dear ${input.firstName},`, '', confirmationMessage].join('\n'),
    html: renderConfirmationEmail({
      firstName: input.firstName,
      title: 'Thank you for volunteering',
      preheader: "We've received your volunteer application",
      message: confirmationMessage,
    }),
  });

  if (!notifyResult.ok || !confirmResult.ok) {
    console.error('[recruitment] Volunteer application emails incomplete', {
      notifyOk: notifyResult.ok,
      confirmOk: confirmResult.ok,
    });
  }
}
