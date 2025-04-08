import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export default async function HomePage() {
  const supabase = createSupabaseServerClient();

  // 🔐 Récupération de l'utilisateur connecté
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // 👤 Récupération du profil dans la table `users`
  const { data: profile } = await supabase
    .from('users')
    .select('first_name, last_name')
    .eq('id', user.id)
    .single();

  // 📊 Statistiques
  const { count } = await supabase
    .from('matchs')
    .select('*', { count: 'exact', head: true });

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">🎾 TennisTrackVision</h1>
        <ul className="flex space-x-4 items-center">
          <li><Link href="/" className="hover:underline">Accueil</Link></li>
          <li><Link href="/mes-matchs" className="hover:underline">Mes matchs</Link></li>
          <li><Link href="/statistiques" className="hover:underline">Statistiques</Link></li>
          <li><Link href="/live" className="hover:underline">Live</Link></li>
          <li><LogoutButton /></li>
        </ul>
      </nav>

      <div className="bg-white shadow-md p-6 rounded-md mb-6 max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-2">👤 Joueur connecté</h2>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Nom :</strong> {profile?.last_name ?? '—'}</p>
        <p><strong>Prénom :</strong> {profile?.first_name ?? '—'}</p>
      </div>

      <div className="bg-white shadow-md p-6 rounded-md max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-2">📊 Statistiques générales</h2>
        <p>Nombre total de matchs dans la base : <strong>{count ?? 0}</strong></p>
      </div>
    </main>
  );
}
