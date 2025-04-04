// app/components/UserCard.tsx
import { User } from '@supabase/supabase-js';

export default function UserCard({ user }: { user: User | null }) {
  if (!user) {
    return (
      <div className="bg-white shadow-md p-6 rounded-md max-w-md mx-auto">
        <p>Utilisateur non connecté.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md p-6 rounded-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">👤 Joueur connecté</h2>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>Nom :</strong> {user.user_metadata?.last_name ?? '—'}</p>
      <p><strong>Prénom :</strong> {user.user_metadata?.first_name ?? '—'}</p>
    </div>
  );
}
