import { getUserMatchs } from "@/utils/supabase/matchs";

export default async function MesMatchsPage() {
  const matchs = await getUserMatchs();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎾 Mes Matchs</h1>
      {matchs.length === 0 ? (
        <p>Aucun match trouvé.</p>
      ) : (
        <ul className="space-y-2">
          {matchs.map((match) => (
            <li key={match.id} className="border p-4 rounded">
              <p>
                <strong>Match ID :</strong> {match.id}
              </p>
              <p>
                <strong>Joueur 1 :</strong> {match.joueur_1}
              </p>
              <p>
                <strong>Joueur 2 :</strong> {match.joueur_2}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
