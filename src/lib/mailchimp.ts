import { createHash } from 'crypto';

// Mailchimp configuration
export const mailchimpConfig = {
  apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY,
  audienceId: process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID,
  serverPrefix: process.env.NEXT_PUBLIC_MAILCHIMP_SERVER_PREFIX,
};

// Helper flag to indicate whether configuration is present. Avoid throwing at module load to prevent build-time failures.
export const isMailchimpConfigured = Boolean(
  mailchimpConfig.apiKey && mailchimpConfig.audienceId && mailchimpConfig.serverPrefix
);

export const MAILCHIMP_TAG_RECRUITMENT_FORM = 'recruitment form';

type MailchimpSubscribeInput = {
  email: string;
  firstName: string;
  lastName: string;
  mobile?: string;
  tags: string[];
};

function subscriberHash(email: string): string {
  return createHash('md5').update(email.trim().toLowerCase()).digest('hex');
}

async function applyMailchimpTags(email: string, tags: string[]): Promise<boolean> {
  const { apiKey, audienceId, serverPrefix } = mailchimpConfig;
  const response = await fetch(
    `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash(email)}/tags`,
    {
      method: 'POST',
      headers: {
        Authorization: `apikey ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tags: tags.map((name) => ({ name, status: 'active' as const })),
      }),
    }
  );

  if (!response.ok) {
    console.error('[mailchimp] Failed to apply tags:', await response.text());
    return false;
  }

  return true;
}

export async function subscribeToMailchimpAudience(
  input: MailchimpSubscribeInput
): Promise<{ ok: boolean; error?: string }> {
  if (!isMailchimpConfigured) {
    console.warn('[mailchimp] Not configured, skipping subscription');
    return { ok: false, error: 'Not configured' };
  }

  const { apiKey, audienceId, serverPrefix } = mailchimpConfig;
  const trimmedEmail = input.email.trim();

  const createResponse = await fetch(
    `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
    {
      method: 'POST',
      headers: {
        Authorization: `apikey ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: trimmedEmail,
        status: 'subscribed',
        merge_fields: {
          FNAME: input.firstName,
          LNAME: input.lastName,
          PHONE: input.mobile ?? '',
        },
        tags: input.tags,
      }),
    }
  );

  const responseText = await createResponse.text();
  let responseData: { title?: string; detail?: string };
  try {
    responseData = JSON.parse(responseText) as { title?: string; detail?: string };
  } catch {
    console.error('[mailchimp] Invalid response:', responseText);
    return { ok: false, error: 'Invalid response from Mailchimp' };
  }

  if (responseData.title === 'Member Exists') {
    const updateResponse = await fetch(
      `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash(trimmedEmail)}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `apikey ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: trimmedEmail,
          status_if_new: 'subscribed',
          merge_fields: {
            FNAME: input.firstName,
            LNAME: input.lastName,
            PHONE: input.mobile ?? '',
          },
        }),
      }
    );

    if (!updateResponse.ok) {
      console.error('[mailchimp] Failed to update member:', await updateResponse.text());
      return { ok: false, error: 'Failed to update member' };
    }

    const tagsApplied = await applyMailchimpTags(trimmedEmail, input.tags);
    return tagsApplied ? { ok: true } : { ok: false, error: 'Failed to apply tags' };
  }

  if (!createResponse.ok) {
    console.error('[mailchimp] API error:', responseData);
    return { ok: false, error: responseData.detail || responseData.title || 'Subscribe failed' };
  }

  return { ok: true };
}

export async function subscribeRecruitmentFormToMailchimp(input: {
  email: string;
  firstName: string;
  lastName: string;
  mobile?: string;
}): Promise<void> {
  const result = await subscribeToMailchimpAudience({
    ...input,
    tags: [MAILCHIMP_TAG_RECRUITMENT_FORM],
  });

  if (!result.ok) {
    console.error('[mailchimp] Recruitment form subscription failed', {
      email: input.email,
      error: result.error,
    });
  }
}
