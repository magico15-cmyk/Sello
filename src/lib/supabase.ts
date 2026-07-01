import { createClient } from '@/lib/supabase/client';

// Re-export a singleton instance using our globalThis SSR client factory
// to ensure no duplicate GoTrueClient instances are ever created across the app.
export const supabase = createClient();
