import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseAdminKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const createClient = () => {
  return createBrowserClient(supabaseUrl!, supabaseKey!);
};

export const createAdminClient = () => {
  return createBrowserClient(supabaseUrl!, supabaseAdminKey!);
};
