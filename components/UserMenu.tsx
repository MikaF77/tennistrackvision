"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";

export default function UserMenu() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserEmail(user?.email || null);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleChangePassword = async () => {
    router.push("/change-password");
  };

  if (!userEmail) return null;

  return (
    <div className="relative">
      <Button onClick={() => setMenuOpen(!menuOpen)} variant="outline">
        {userEmail}
      </Button>
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded border z-10">
          <button
            onClick={handleChangePassword}
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            🔐 Modifier le mot de passe
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
          >
            🚪 Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}
