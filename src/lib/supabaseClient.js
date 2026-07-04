import { createClient } from '@supabase/supabase-js'

// Кейін .env файлына нақты Supabase URL мен anon key қосасың:
// VITE_SUPABASE_URL=https://xxxx.supabase.co
// VITE_SUPABASE_ANON_KEY=xxxx

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export const isSupabaseConfigured = Boolean(supabase)
