// ═══════════════════════════════════════════════════════
// utils/firebase.ts — Supabase client (keperluan pengganti Firebase)
// ═══════════════════════════════════════════════════════

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const extra = (Constants.expoConfig?.extra ?? {}) as Record<string, string | undefined>;
const SUPABASE_URL =
  process.env.EXPO_PUBLIC_SUPABASE_URL || extra.EXPO_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || extra.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    "Supabase environment variables not set: EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY"
  );
}

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Backwards-compatible exports used by the app
export const auth = supabase.auth;
export const storage = supabase.storage;
export const db = supabase; // use `db` name where code expects a db client

export default supabase;
