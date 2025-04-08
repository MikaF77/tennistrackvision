// next-navigation.d.ts
declare module 'next/navigation' {
  // Vous pouvez réexporter les autres types si besoin,
  // ici nous ajoutons uniquement la déclaration manquante pour redirect.
  export function redirect(url: string): never;
}
