"use client";

import TennisDashboard from "@/components/TennisDashboard";

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
        🎾 Statistiques TennisTrackVision
      </h1>
      <p style={{ color: "#555" }}>
        Suivi des déplacements des joueurs, directement à partir des vidéos analysées.
      </p>

      <div style={{ marginTop: "2rem" }}>
        <TennisDashboard />
      </div>
    </main>
  );
}
