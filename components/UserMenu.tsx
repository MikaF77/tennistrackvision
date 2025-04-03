'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function UserMenu() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUserEmail(data.user.email);
      }
    };
    getUser();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="relative text-right ml-auto mr-4 mt-2">
      {userEmail && (
        <div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full shadow-sm"
          >
            👤 {userEmail}
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg z-50">
              <button
                onClick={() => router.push('/change-password')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                🔒 Modifier mon mot de passe
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                🚪 Se déconnecter
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}