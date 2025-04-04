// app/layout.tsx
import './globals.css';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { ReactNode } from 'react';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="fr">
      <body className="bg-gray-100 min-h-screen">
        {/* On passe l'utilisateur via props ou context */}
        {children}
      </body>
    </html>
  );
}
