// utils/supabase/matchs.ts
"use server";

import { createSupabaseServerClient } from "@/utils/supabase/server";

export async function getUserMatchs() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: matchs, error } = await supabase
    .from("matchs")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false });

  if (error) throw error;

  return matchs;
}
