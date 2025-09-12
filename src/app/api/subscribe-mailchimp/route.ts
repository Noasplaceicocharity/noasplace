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

    // Parse request body
    const { firstName, lastName, email, mobile, userType } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !userType) {
      return NextResponse.json(
        { message: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Prepare subscriber data
    const data = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
        PHONE: mobile || '',
        USERTYPE: userType,
      },
      tags: ['Supporter', userType],
    };

    console.log('Attempting to subscribe user:', { email, userType });

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
        .update(email.toLowerCase())
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
            email_address: email,
            status_if_new: 'subscribed',
            merge_fields: {
              FNAME: firstName,
              LNAME: lastName,
              PHONE: mobile || '',
              USERTYPE: userType,
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
              { name: userType, status: 'active' }
            ]
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
