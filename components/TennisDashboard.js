"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

export default function TennisDashboard() {
  const [stats, setStats] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/stats");
        const data = await res.json();
        setStats(data);
        setLastUpdate(new Date());
      } catch (error) {
        console.error("Erreur lors de la récupération des stats :", error);
      }
    };

    fetchStats();

    const interval = setInterval(() => {
      fetchStats();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-center">
        🎾 Statistiques TennisTrackVision
      </h1>

      {lastUpdate && (
        <p className="text-center text-sm text-gray-500">
          Dernière mise à jour : {lastUpdate.toLocaleTimeString("fr-FR")}
        </p>
      )}

      <div className="text-center mb-4">
        <span
          className={`inline-block w-3 h-3 rounded-full mr-2 ${
            stats.length > 0 ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
        <span className="text-sm text-gray-600">
          {stats.length > 0 ? "Statistiques reçues" : "Aucune donnée reçue"}
        </span>
      </div>

      {stats.length === 0 ? (
        <p className="text-center">Chargement des statistiques...</p>
      ) : (
        <>
          <div className="space-y-6">
            {stats.map((player) => (
              <div
                key={player.joueur}
                className="border rounded-xl p-5 shadow bg-white"
              >
                <h2 className="text-xl font-semibold mb-2">
                  🎽 Joueur {player.joueur}
                </h2>
                <ul className="text-gray-700 space-y-1">
                  <li>
                    ✅ Présence détectée :{" "}
                    <span className="font-semibold">
                      {player.presence_court ? "Oui" : "Non"}
                    </span>
                  </li>
                  <li>
                    🖼️ Frames détectées :{" "}
                    <span className="font-semibold">
                      {player.frames_detectees}
                    </span>
                  </li>
                  <li>
                    🏃‍♂️ Distance totale parcourue (px) :{" "}
                    <span className="font-semibold">
                      {player.distance_totale_pixels.toLocaleString("fr-FR")}
                    </span>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          {stats.length >= 2 && (
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4 text-center">
                🏃‍♂️ Distance parcourue comparée
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  layout="vertical"
                  data={stats.map((p) => ({
                    name: `Joueur ${p.joueur}`,
                    distance: p.distance_totale_pixels,
                  }))}
                  margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                >
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip
                    formatter={(value) =>
                      `${value.toLocaleString("fr-FR")} px`
                    }
                  />
                  <Bar dataKey="distance" fill="#3182ce">
                    <LabelList
                      dataKey="distance"
                      position="right"
                      formatter={(value) =>
                        `${value.toLocaleString("fr-FR")} px`
                      }
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
}
