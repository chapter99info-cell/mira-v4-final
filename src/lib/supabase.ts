import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** True when env is set so the dashboard can subscribe to live bookings. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * Shared anon client for realtime + public reads.
 * Keys come from Vite env only — never hardcode secrets.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;
