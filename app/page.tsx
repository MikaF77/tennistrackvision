import TennisDashboard from "@/components/TennisDashboard";
import UserMenu from "@/components/UserMenu";

export default function HomePage() {
  return (
    <main className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Statistiques du Match 🎾</h1>
        <UserMenu /> {/* ✅ Menu utilisateur affiché en haut à droite */}
      </div>

      <TennisDashboard />
    </main>
  );
}
