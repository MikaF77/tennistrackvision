'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Match } from '@/types/database';
import { format } from 'date-fns';

export default function MesMatchsPage() {
  const supabase = createClient();

  const [matchs, setMatchs] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMatchs = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Vous devez être connecté pour voir vos matchs.');
        return;
      }

      const { data, error } = await supabase
        .from('matchs')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setMatchs(data);
        if (data.length > 0) setSelectedMatch(data[0]);
      }
    };

    fetchMatchs();
  }, []);

  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">🎾 Mes matchs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Liste des matchs */}
        <div className="space-y-2">
          {matchs.map((match) => (
            <div
              key={match.id}
              className={`p-4 rounded-md shadow cursor-pointer hover:bg-gray-200 ${selectedMatch?.id === match.id ? 'bg-gray-300' : 'bg-white'}`}
              onClick={() => setSelectedMatch(match)}
            >
              <p className="font-semibold">Match du {format(new Date(match.date), 'dd/MM/yyyy')}</p>
              <p className="text-sm text-gray-600">Score : {match.score}</p>
            </div>
          ))}
        </div>

        {/* Détail du match */}
        <div className="bg-white p-4 rounded-md shadow min-h-[200px]">
          {selectedMatch ? (
            <>
              <h2 className="text-lg font-semibold mb-2">Détail du match</h2>
              <p><strong>Date :</strong> {format(new Date(selectedMatch.date), 'dd/MM/yyyy')}</p>
              <p><strong>Score :</strong> {selectedMatch.score}</p>
              {/* Ajoute ici d'autres infos comme adversaire, lieu, etc. si dispo */}
            </>
          ) : (
            <p>Sélectionne un match pour voir le détail.</p>
          )}
        </div>
      </div>
    </div>
  );
}
