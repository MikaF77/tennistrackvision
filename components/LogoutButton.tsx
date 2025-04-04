// app/components/LogoutButton.tsx
"use client";

import { signOut } from "@/utils/supabase/logout";

export default function LogoutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Se déconnecter
      </button>
    </form>
  );
}
