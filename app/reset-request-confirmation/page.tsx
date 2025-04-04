export default function ResetConfirmationPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">📮 Email envoyé</h1>
      <p className="text-center max-w-md text-gray-600">
        Si ton adresse email est bien enregistrée, tu vas recevoir un lien pour réinitialiser ton mot de passe.
      </p>
    </div>
  );
}