// Mailchimp configuration
export const mailchimpConfig = {
  apiKey: process.env.MAILCHIMP_API_KEY,
  audienceId: process.env.MAILCHIMP_AUDIENCE_ID,
  serverPrefix: process.env.MAILCHIMP_SERVER_PREFIX,
};

// Validate Mailchimp configuration
if (!mailchimpConfig.apiKey || !mailchimpConfig.audienceId || !mailchimpConfig.serverPrefix) {
  throw new Error('Missing required Mailchimp configuration. Please check your .env.local file.');
}
