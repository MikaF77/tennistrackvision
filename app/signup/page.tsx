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
  const [error, setError] = useState("");

  const handleSignup = async () => {
  setError("");
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    setError(error.message);
  } else if (data.user && !data.user.email_confirmed_at) {
    router.push("/confirmation");
  } else {
    router.push("/");
  }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Créer un compte 🎾</h1>
      <div className="w-full max-w-sm space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button className="w-full" onClick={handleSignup}>
          S'inscrire
        </Button>
      </div>
    </div>
  );
}
