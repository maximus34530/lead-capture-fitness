import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const MISSING_ENV_MSG =
  "Supabase env vars are missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local in the project root, then fully stop and restart the dev server.";

const hasEnv = Boolean(supabaseUrl && supabaseAnonKey);

if (!hasEnv) {
  console.error(
    "[supabase]",
    MISSING_ENV_MSG,
    "\nVITE_SUPABASE_URL present:",
    Boolean(supabaseUrl),
    "\nVITE_SUPABASE_ANON_KEY present:",
    Boolean(supabaseAnonKey),
  );
}

function makeStubClient(): SupabaseClient {
  const stubError = { message: MISSING_ENV_MSG, name: "MissingEnvError" } as const;
  return {
    from: () => ({
      insert: async () => ({ data: null, error: stubError }),
      select: async () => ({ data: null, error: stubError }),
    }),
  } as unknown as SupabaseClient;
}

export const supabase: SupabaseClient = hasEnv
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : makeStubClient();

export type LeadInsert = {
  source: "hero" | "main";
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  country_code: string;
  dial_code: string;
  phone: string;
};
