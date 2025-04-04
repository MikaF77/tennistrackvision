"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import TennisDashboard from "@/components/TennisDashboard";
import UserMenu from "@/components/UserMenu";

export default function StatsPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/"); // pas connecté → on redirige
      } else {
        setLoading(false); // connecté → on affiche le dashboard
      }
    };

    checkSession();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="absolute top-4 right-4">
        <UserMenu />
      </div>
      <h1 className="text-2xl font-bold mb-6">Statistiques du Match 🎾</h1>
      <TennisDashboard />
    </main>
  );
}
