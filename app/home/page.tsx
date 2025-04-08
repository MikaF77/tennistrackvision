import { createSupabaseServerClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const supabase = createSupabaseServerClient();

  // Récupère l'utilisateur connecté
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }
  

  // Récupère le nombre de matchs
  const { count } = await supabase
    .from('matchs')
    .select('*', { count: 'exact', head: true });

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      {/* Barre de navigation */}
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">🎾 TennisTrackVision</h1>
        <ul className="flex space-x-4">
          <li><Link href="/" className="hover:underline">Accueil</Link></li>
          <li><Link href="/mes-matchs" className="hover:underline">Mes matchs</Link></li>
          <li><Link href="/statistiques" className="hover:underline">Statistiques</Link></li>
          <li><Link href="/live" className="hover:underline">Live</Link></li>
          {currentUser && (
  <div className="text-center">
    <LogoutButton />
  </div>
)}
        </ul>
      </nav>

      {/* Fiche joueur */}
      <div className="bg-white shadow-md p-6 rounded-md mb-6 max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-2">👤 Joueur connecté</h2>
        <p><strong>Email :</strong> {currentUser?.email}</p>
        <p><strong>Nom :</strong> {currentUser?.user_metadata?.last_name || '—'}</p>
        <p><strong>Prénom :</strong> {currentUser?.user_metadata?.first_name || '—'}</p>
      </div>

      {/* Statistiques */}
      <div className="bg-white shadow-md p-6 rounded-md max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-2">📊 Statistiques générales</h2>
        <p>Nombre total de matchs dans la base : <strong>{count ?? 0}</strong></p>
      </div>
    </main>
  );
}
