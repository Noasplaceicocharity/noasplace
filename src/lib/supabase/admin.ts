import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

/**
 * Server-only admin client using the service role key.
 * Use in API routes or server code when you need to bypass RLS.
 * Never expose SUPABASE_SERVICE_ROLE_KEY to the client.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      'Missing Supabase env: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set for admin client.'
    );
  }

  return createSupabaseClient<Database>(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
