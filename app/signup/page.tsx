"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    // Sécurité : on nettoie les champs
    const cleanedEmail = email.trim().toLowerCase();
    const cleanedFirstName = firstName.trim();
    const cleanedLastName = lastName.trim();

    if (!cleanedEmail || !password || !cleanedFirstName || !cleanedLastName) {
      setError("Merci de remplir tous les champs.");
      return;
    }

    console.log("Tentative d'inscription avec :", {
      email: cleanedEmail,
      password,
    });

    // Étape 1 : Création de l'utilisateur Supabase
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: cleanedEmail,
      password,
    });

    if (signUpError) {
      console.error("Erreur Supabase auth.signUp:", signUpError);
      setError("Erreur d'inscription : " + signUpError.message);
      return;
    }

    const userId = signUpData.user?.id;
    if (!userId) {
      setError("Utilisateur créé mais ID introuvable.");
      return;
    }

    console.log("Utilisateur créé, insertion dans table users...");

    // Étape 2 : Insertion dans la table users
    const { error: insertError, status, data } = await supabase.from("users").insert([
      {
        id: userId,
        first_name: cleanedFirstName,
        last_name: cleanedLastName,
      },
    ]);

    console.log("Résultat de l'insertion :", { status, data, insertError });

    if (insertError) {
      setError("Utilisateur créé mais erreur lors de l'enregistrement du profil");
      console.error("Erreur d'insertion dans users:", insertError);
      return;
    }

    // Redirection après succès
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Inscription 🎾</h1>
      <div className="w-full max-w-sm space-y-4">
        <Input placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <Input placeholder="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button className="w-full" onClick={handleSignup}>S'inscrire</Button>
      </div>
    </div>
  );
}
