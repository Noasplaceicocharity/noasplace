import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { message: 'Valid email is required' },
        { status: 400 }
      );
    }

    const API_KEY = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY;
    const SERVER_PREFIX = process.env.NEXT_PUBLIC_MAILCHIMP_SERVER_PREFIX;
    const AUDIENCE_ID = process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID;
    const JOURNEY_TRIGGER = 'https://us2.api.mailchimp.com/3.0/customer-journeys/journeys/5413/steps/57854/actions/trigger';

    // First, add the contact to your audience
    const audienceResponse = await fetch(
      `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `apikey ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          tags: ['Resource Download - 10 Things Guide', 'download PDF'],
        }),
      }
    );

    if (!audienceResponse.ok) {
      const error = await audienceResponse.json();
      // If the member already exists, we can continue with triggering the journey
      if (error.title !== 'Member Exists') {
        throw new Error(error.detail || 'Failed to add to mailing list');
      }
    }

    try {
      // Try to trigger the journey to send the resource
      const journeyResponse = await fetch(JOURNEY_TRIGGER, {
        method: 'POST',
        headers: {
          Authorization: `apikey ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
        }),
      });

      if (!journeyResponse.ok) {
        console.error('Journey trigger failed but continuing');
      }
    } catch (error) {
      console.error('Journey trigger error but continuing:', error);
    }

    return NextResponse.json(
      { message: 'Successfully subscribed' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
