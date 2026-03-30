import { NextResponse } from 'next/server';
import { mailchimpConfig } from '@/lib/mailchimp';
import { createHash } from 'crypto';

export async function POST(request: Request) {
  try {
    // Validate environment variables
    if (!mailchimpConfig.apiKey || !mailchimpConfig.audienceId || !mailchimpConfig.serverPrefix) {
      console.error('Missing Mailchimp configuration:', {
        hasApiKey: !!mailchimpConfig.apiKey,
        hasAudienceId: !!mailchimpConfig.audienceId,
        hasServerPrefix: !!mailchimpConfig.serverPrefix
      });
      throw new Error('Mailchimp configuration is missing');
    }

    // Parse request body — email is required; other fields default for compact signup bars
    const body = await request.json();
    const { firstName, lastName, email, mobile, userType } = body as Record<string, string | undefined>;

    const trimmedEmail = typeof email === 'string' ? email.trim() : '';
    if (!trimmedEmail) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const resolvedFirstName =
      typeof firstName === 'string' && firstName.trim() ? firstName.trim() : 'Blog';
    const resolvedLastName =
      typeof lastName === 'string' && lastName.trim() ? lastName.trim() : 'Reader';
    const resolvedUserType =
      typeof userType === 'string' && userType.trim()
        ? userType.trim()
        : 'Community supporter / local resident';

    // Prepare subscriber data
    const data = {
      email_address: trimmedEmail,
      status: 'subscribed',
      merge_fields: {
        FNAME: resolvedFirstName,
        LNAME: resolvedLastName,
        PHONE: typeof mobile === 'string' ? mobile : '',
        USERTYPE: resolvedUserType,
      },
      tags: ['Supporter', resolvedUserType],
    };

    console.log('Attempting to subscribe user:', { email: trimmedEmail, userType: resolvedUserType });

    // Make request to Mailchimp
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

    // Get response data
    const responseText = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      console.error('Failed to parse Mailchimp response:', responseText);
      throw new Error('Invalid response from Mailchimp');
    }

    // Handle existing subscribers
    if (responseData.title === 'Member Exists') {
      // Calculate MD5 hash of lowercase email for Mailchimp
      const subscriberHash = createHash('md5')
        .update(trimmedEmail.toLowerCase())
        .digest('hex');

      // First update the member's information
      const updateResponse = await fetch(
        `https://${mailchimpConfig.serverPrefix}.api.mailchimp.com/3.0/lists/${mailchimpConfig.audienceId}/members/${subscriberHash}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `apikey ${mailchimpConfig.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email_address: trimmedEmail,
            status_if_new: 'subscribed',
            merge_fields: {
              FNAME: resolvedFirstName,
              LNAME: resolvedLastName,
              PHONE: typeof mobile === 'string' ? mobile : '',
              USERTYPE: resolvedUserType,
            },
          }),
        }
      );

      if (!updateResponse.ok) {
        console.error('Failed to update member:', await updateResponse.text());
        throw new Error('Failed to update member information');
      }

      // Then update their tags
      const tagResponse = await fetch(
        `https://${mailchimpConfig.serverPrefix}.api.mailchimp.com/3.0/lists/${mailchimpConfig.audienceId}/members/${subscriberHash}/tags`,
        {
          method: 'POST',
          headers: {
            Authorization: `apikey ${mailchimpConfig.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tags: [
              { name: 'Supporter', status: 'active' },
              { name: resolvedUserType, status: 'active' },
            ],
          }),
        }
      );

      if (!tagResponse.ok) {
        console.error('Failed to update tags:', await tagResponse.text());
        throw new Error('Failed to update member tags');
      }

      return NextResponse.json(
        { message: 'Subscription updated successfully' },
        { status: 200 }
      );
    }

    // Handle unsuccessful responses
    if (!response.ok) {
      console.error('Mailchimp API error:', responseData);
      throw new Error(responseData.detail || responseData.title || 'Failed to subscribe');
    }

    // Return success response
    return NextResponse.json(
      { message: 'Successfully subscribed' },
      { status: 200 }
    );
  } catch (error) {
    // Log the full error
    console.error('Mailchimp subscription error:', error);
    
    // Return appropriate error message
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
