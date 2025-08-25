// Mailchimp configuration
export const mailchimpConfig = {
  apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY,
  audienceId: process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID,
  serverPrefix: process.env.NEXT_PUBLIC_MAILCHIMP_SERVER_PREFIX,
};

// Validate Mailchimp configuration
if (!mailchimpConfig.apiKey || !mailchimpConfig.audienceId || !mailchimpConfig.serverPrefix) {
  throw new Error('Missing required Mailchimp configuration. Please check your .env.local file.');
}
