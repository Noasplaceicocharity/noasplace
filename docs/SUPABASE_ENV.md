# Supabase – Environment variables

Add these to `.env.local` (and to your deployment env, e.g. Vercel).

## Required for client and server (surveys, etc.)

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL, e.g. `https://xxxxx.supabase.co`. From **Project Settings → API** in the Supabase dashboard. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | The **anon** (public) key. Safe to use in the browser; RLS protects your data. From **Project Settings → API**. |

## Optional – admin / API routes only

| Variable | Required | Description |
|----------|----------|-------------|
| `SUPABASE_SERVICE_ROLE_KEY` | Only if using admin client | The **service_role** key. Server-only; never expose to the client. Use in API routes when you need to bypass RLS (e.g. inserting survey responses from the server). From **Project Settings → API**. |

- Keep `SUPABASE_SERVICE_ROLE_KEY` secret and out of version control.
- After adding the keys, restart the dev server (`npm run dev`).
