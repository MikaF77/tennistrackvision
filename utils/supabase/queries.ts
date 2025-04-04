import { createClient } from "./client";

export async function getUserMatchs() {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Erreur récupération utilisateur :", userError);
    return [];
  }

  const { data, error } = await supabase
    .from("matchs")
    .select("*")
    .or(`joueur_1.eq.${user.id},joueur_2.eq.${user.id}`)
    .order("date", { ascending: false });

  if (error) {
    console.error("Erreur récupération matchs :", error);
    return [];
  }

  return data;
}
