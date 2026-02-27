import { NextResponse } from 'next/server';
import { mailchimpConfig } from '@/lib/mailchimp';
import { createHash } from 'crypto';

const TAG_LETTER_TO_MP = 'Letter to MP';

export async function POST(request: Request) {
  try {
    if (!mailchimpConfig.apiKey || !mailchimpConfig.audienceId || !mailchimpConfig.serverPrefix) {
      console.error('Missing Mailchimp configuration');
      return NextResponse.json(
        { message: 'Mailing list is not configured' },
        { status: 503 }
      );
    }

    const { firstName, lastName, email } = (await request.json()) as {
      firstName?: string;
      lastName?: string;
      email?: string;
    };

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    const data = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName ?? '',
        LNAME: lastName ?? '',
      },
      tags: [TAG_LETTER_TO_MP],
    };

    const response = await fetch(
      `https://${mailchimpConfig.serverPrefix}.api.mailchimp.com/3.0/lists/${mailchimpConfig.audienceId}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `apikey ${mailchimpConfig.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    const responseText = await response.text();
    let responseData: { title?: string; detail?: string };
    try {
      responseData = JSON.parse(responseText);
    } catch {
      console.error('Failed to parse Mailchimp response:', responseText);
      return NextResponse.json(
        { message: 'Invalid response from mailing list' },
        { status: 500 }
      );
    }

    if (responseData.title === 'Member Exists') {
      const subscriberHash = createHash('md5')
        .update(email.toLowerCase())
        .digest('hex');

      const tagResponse = await fetch(
        `https://${mailchimpConfig.serverPrefix}.api.mailchimp.com/3.0/lists/${mailchimpConfig.audienceId}/members/${subscriberHash}/tags`,
        {
          method: 'POST',
          headers: {
            Authorization: `apikey ${mailchimpConfig.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tags: [{ name: TAG_LETTER_TO_MP, status: 'active' }],
          }),
        }
      );

      if (!tagResponse.ok) {
        console.error('Failed to add tag:', await tagResponse.text());
        return NextResponse.json(
          { message: 'Failed to update your preferences' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { message: 'You have been added to our email list with the Letter to MP tag.' },
        { status: 200 }
      );
    }

    if (!response.ok) {
      console.error('Mailchimp API error:', responseData);
      return NextResponse.json(
        { message: responseData.detail || responseData.title || 'Failed to join email list' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "You've been added to our email list. We'll keep you up to date with Noa's Place." },
      { status: 200 }
    );
  } catch (error) {
    console.error('Mailchimp letter-to-mp subscription error:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to join email list' },
      { status: 500 }
    );
  }
}
