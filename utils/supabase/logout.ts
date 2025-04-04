utilssupabaselogout.ts
use server;

import { createSupabaseServerClient } from .server;
import { redirect } from nextnavigation;

export async function signOut() {
  const supabase = createSupabaseServerClient();
  await supabase.auth.signOut();

  redirect();  redirige vers la page d'accueil après déconnexion
}
