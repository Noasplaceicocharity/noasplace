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
