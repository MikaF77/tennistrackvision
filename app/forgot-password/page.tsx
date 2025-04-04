'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetRequest = async () => {
    setMessage('');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/change-password`,
    });

    if (error) {
      setMessage(`❌ ${error.message}`);
    } else {
      router.push('/reset-request-confirmation');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Mot de passe oublié 🔒</h1>
      <div className="w-full max-w-sm space-y-4">
        <Input
          type="email"
          placeholder="Votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {message && <p className="text-sm text-center">{message}</p>}
        <Button onClick={handleResetRequest}>
          Envoyer le lien de réinitialisation
        </Button>
      </div>
    </div>
  );
}
