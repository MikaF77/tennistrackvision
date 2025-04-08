'use client';

import { useState } from 'react';

export function MatchViewer({ matchs }: { matchs: any[] }) {
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const selectedMatch = matchs.find((m) => m.id === selectedMatchId) ?? null;

  return (
    <div className="flex gap-6">
      {/* Liste des matchs */}
      <div className="w-1/3 space-y-2">
        <h2 className="font-semibold text-lg mb-2">Liste des matchs</h2>
        {matchs.map((match) => (
          <div
            key={match.id}
            onClick={() => setSelectedMatchId(match.id)}
            className={`cursor-pointer p-3 rounded shadow ${
              selectedMatchId === match.id
                ? 'bg-blue-100'
                : 'bg-white hover:bg-gray-200'
            }`}
          >
            <p className="font-medium">
              {new Date(match.date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">Score : {match.score}</p>
          </div>
        ))}
      </div>

      {/* Détail du match sélectionné */}
      <div className="flex-1 bg-white p-4 rounded shadow">
        {selectedMatch ? (
          <>
            <h2 className="text-xl font-semibold mb-2">📄 Détail du match</h2>
            <p>
              <strong>Date :</strong>{' '}
              {new Date(selectedMatch.date).toLocaleString()}
            </p>
            <p>
              <strong>Score :</strong> {selectedMatch.score}
            </p>
          </>
        ) : (
          <p>Sélectionnez un match pour voir les détails.</p>
        )}
      </div>
    </div>
  );
}
