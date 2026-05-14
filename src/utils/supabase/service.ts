import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Service-role client — bypasses RLS for server-side operations.
 * NEVER expose this to the browser.
 *
 * Audits and leads are inserted server-side; the anon key will usually fail under RLS,
 * so `SUPABASE_SERVICE_ROLE_KEY` is required for persistence in Supabase.
 */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set.');
  }
  if (!serviceKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is not set. Add it to your deployment environment (and .env.local) so audits and leads can be written to Supabase.'
    );
  }

  return createSupabaseClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
