# Take Action – Environment variables

Add this section to your `README.md` (or use as reference for `.env.local`).

## Take Action / Environment

The following environment variables are used by the **Take Action** feature (Notion-backed actions, Letter to MP, surveys).

| Variable | Required | Description |
|----------|----------|-------------|
| `NOTION_API_KEY` | Yes (for Take Action / Banner) | Notion integration token with access to the Take Action and Banner Bar databases. |
| `NOTION_DATABASE_ID` | Yes (for Take Action) | ID of the Notion database used for actions (Title, Slug, Status, Type, Tags, Summary, Body, EmailSubject, SurveyEmbed, etc.). |
| `NOTION_BANNER_DATABASE_ID` | No (for top banner) | ID of the Notion database for the top banner bar. Table: **Name** (title), **Banner text**, **Button text**, **Link**, **Published** (checkbox). If set and a row has Published checked, that banner is shown site-wide. |
| `RESEND_API_KEY` | Yes (for Letter to MP) | API key from [Resend](https://resend.com) for sending emails. |
| `RESEND_FROM_EMAIL` | Yes (for Letter to MP) | Sender address for letters, e.g. `Your Charity <campaign@yourdomain.org>`. |
| `TAKE_ACTION_TEST_TO_EMAIL` | No | If set, letter-to-MP emails are sent to this address instead of the MP (for testing). Leave unset in production. |

- All of these are **server-only** (do not prefix with `NEXT_PUBLIC_`).
- Keep `NOTION_API_KEY` and `RESEND_API_KEY` secret and out of version control.
