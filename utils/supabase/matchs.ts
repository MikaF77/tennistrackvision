"use server";

import { createClient } from "@/utils/supabase/server";

export async function getUserMatchs() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("matchs")
    .select("*")
    .or("joueur_1.eq.${user_id},joueur_2.eq.${user_id}");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
