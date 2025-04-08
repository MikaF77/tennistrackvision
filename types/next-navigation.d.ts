import 'next/navigation';

declare module 'next/navigation' {
  // Ajoute uniquement la déclaration de redirect s'il manque
  export function redirect(url: string): never;
}
