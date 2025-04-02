"use client";

import { useEffect, useState } from "react";

const donneesSimulees = [
  {
    joueur: 1,
    presence_court: true,
    frames_detectées: 187,
    distance_totale_pixels: 6830,
  },
  {
    joueur: 2,
    presence_court: true,
    frames_detectées: 190,
    distance_totale_pixels: 8450,
  },
];

export default function TennisDashboard() {
  const [stats, setStats] = useState(null);
  const [heureMaj, setHeureMaj] = useState("");
  const [connexionErreur, setConnexionErreur] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/stats");
        if (!response.ok) throw new Error("Erreur de réponse");

        const data = await response.json();
        if (data.length === 0) throw new Error("Aucune donnée reçue");

        setStats(data);
        setConnexionErreur(false);
      } catch (error) {
        console.warn("Connexion au backend échouée, données simulées utilisées.");
        setStats(donneesSimulees);
        setConnexionErreur(true);
      }

      const now = new Date();
      const heures = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const secondes = now.getSeconds().toString().padStart(2, "0");
      setHeureMaj(`${heures}:${minutes}:${secondes}`);
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 text-center">
      <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md shadow mb-4 text-sm">
        ⚠️ Données simulées – affichage de test uniquement
      </div>

      <h2 className="text-3xl font-bold mb-2">
        🎾 Statistiques TennisTrackVision
      </h2>
      <p className="text-sm mb-4">Dernière mise à jour : {heureMaj}</p>
      {connexionErreur ? (
        <p className="text-red-500">🔴 Aucune donnée reçue (affichage simulé)</p>
      ) : (
        <p className="text-green-600">🟢 Statistiques reçues</p>
      )}

      {stats ? (
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {stats.map((stat) => (
            <div
              key={stat.joueur}
              className="border rounded-xl p-4 text-left shadow-md bg-white"
            >
              <h3 className="text-xl font-bold mb-2">🥎 Joueur {stat.joueur}</h3>
              <p>✅ Présence détectée : {stat.presence_court ? "Oui" : "Non"}</p>
              <p>🖼️ Frames détectées : {stat.frames_detectées}</p>
              <p>
                🏃‍♂️ Distance totale parcourue (px) :{" "}
                <strong>{stat.distance_totale_pixels.toLocaleString()}</strong>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Chargement des statistiques...</p>
      )}
    </div>
  );
}
