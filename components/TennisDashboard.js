"use client";

import { useEffect, useState } from "react";

const donneesSimulees = [
  {
    joueur: 1,
    nom: "Lucas Martin",
    photo: "https://randomuser.me/api/portraits/men/11.jpg",
    presence_court: true,
    frames_detectées: 187,
    distance_totale_pixels: 6830,
    sets_gagnés: 1,
  },
  {
    joueur: 2,
    nom: "Antoine Leroy",
    photo: "https://randomuser.me/api/portraits/men/15.jpg",
    presence_court: true,
    frames_detectées: 190,
    distance_totale_pixels: 8450,
    sets_gagnés: 1,
  },
];

const scoreGlobalSimulé = "6-4 / 4-6 / 2-0";

export default function TennisDashboard() {
  const [stats, setStats] = useState(null);
  const [heureMaj, setHeureMaj] = useState("");
  const [connexionErreur, setConnexionErreur] = useState(false);
  const [scoreMatch, setScoreMatch] = useState(scoreGlobalSimulé);

  const fetchStats = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/stats");
      if (!response.ok) throw new Error("Erreur de réponse");

      const data = await response.json();
      if (data.length === 0) throw new Error("Aucune donnée reçue");

      setStats(data);
      setConnexionErreur(false);
    } catch (error) {
      console.warn("Connexion échouée, données simulées utilisées.");
      setStats(donneesSimulees);
      setConnexionErreur(true);
      setScoreMatch(scoreGlobalSimulé);
    }

    const now = new Date();
    setHeureMaj(
      `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`
    );
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 text-center">
      <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md shadow mb-4 text-sm">
        ⚠️ Données simulées – affichage de test uniquement
      </div>

      <h2 className="text-3xl font-bold mb-2">🎾 Statistiques TennisTrackVision</h2>
      <p className="text-sm mb-4">Dernière mise à jour : {heureMaj}</p>

      <button
        onClick={fetchStats}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow mb-6"
      >
        🔄 Actualiser manuellement
      </button>

      {connexionErreur ? (
        <p className="text-red-500">🔴 Aucune donnée reçue (affichage simulé)</p>
      ) : (
        <p className="text-green-600">🟢 Statistiques reçues</p>
      )}

      {stats ? (
        <div className="grid md:grid-cols-3 gap-6 mt-6 items-center">
          {/* Joueur 1 */}
          <div className="border rounded-xl p-4 text-left shadow-md bg-white flex flex-col items-center">
            <img
              src={stats[0].photo}
              alt={`Photo de ${stats[0].nom}`}
              className="w-24 h-24 rounded-full mb-2 object-cover shadow"
            />
            <h3 className="text-lg font-semibold mb-1">{stats[0].nom}</h3>
            <div className="w-full mt-2 space-y-1 text-sm text-gray-700">
              <p>✅ Présence détectée : {stats[0].presence_court ? "Oui" : "Non"}</p>
              <p>🖼️ Frames détectées : {stats[0].frames_detectées}</p>
              <p>
                🏃‍♂️ Distance parcourue (px) :{" "}
                <strong>{stats[0].distance_totale_pixels.toLocaleString()}</strong>
              </p>
              <p>🏆 Sets gagnés : {stats[0].sets_gagnés}</p>
            </div>
          </div>

          {/* Score au centre */}
          <div className="text-center">
            <p className="text-xl font-bold mb-2">🎯 Score du match</p>
            <p className="text-2xl text-blue-700 font-semibold bg-gray-100 rounded px-4 py-2 inline-block shadow">
              {scoreMatch}
            </p>
          </div>

          {/* Joueur 2 */}
          <div className="border rounded-xl p-4 text-left shadow-md bg-white flex flex-col items-center">
            <img
              src={stats[1].photo}
              alt={`Photo de ${stats[1].nom}`}
              className="w-24 h-24 rounded-full mb-2 object-cover shadow"
            />
            <h3 className="text-lg font-semibold mb-1">{stats[1].nom}</h3>
            <div className="w-full mt-2 space-y-1 text-sm text-gray-700">
              <p>✅ Présence détectée : {stats[1].presence_court ? "Oui" : "Non"}</p>
              <p>🖼️ Frames détectées : {stats[1].frames_detectées}</p>
              <p>
                🏃‍♂️ Distance parcourue (px) :{" "}
                <strong>{stats[1].distance_totale_pixels.toLocaleString()}</strong>
              </p>
              <p>🏆 Sets gagnés : {stats[1].sets_gagnés}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Chargement des statistiques...</p>
      )}
    </div>
  );
}
