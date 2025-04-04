// app/components/NavMenu.tsx
'use client';

import Link from 'next/link';

export default function NavMenu() {
  return (
    <nav className="flex justify-between items-center mb-8">
      <h1 className="text-xl font-bold">🎾 TennisTrackVision</h1>
      <ul className="flex space-x-4">
        <li><Link href="/" className="hover:underline">Accueil</Link></li>
        <li><Link href="/mes-matchs" className="hover:underline">Mes matchs</Link></li>
        <li><Link href="/statistiques" className="hover:underline">Statistiques</Link></li>
        <li><Link href="/live" className="hover:underline">Live</Link></li>
      </ul>
    </nav>
  );
}
