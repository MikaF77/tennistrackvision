// types/database.d.ts

// Ajoutez ici vos définitions de types ou interfaces pour votre base de données.
// Par exemple, pour un match dans votre application :

export interface Match {
  id: number;
  date: string;
  joueur1: string;
  joueur2: string;
  score?: string;
  // Ajoutez d'autres propriétés selon vos besoins.
}
