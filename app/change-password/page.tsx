'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ChangePasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const supabase = createClient();
  const router = useRouter();

  const handleChangePassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setMessage('❌ ' + error.message);
    } else {
      setMessage('✅ Mot de passe mis à jour');
      setTimeout(() => router.push('/'), 1500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Modifier mon mot de passe</h1>
      <div className="w-full max-w-sm space-y-4">
        <Input
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {message && <p className="text-sm text-center">{message}</p>}
        <Button onClick={handleChangePassword}>
          Mettre à jour le mot de passe
        </Button>
      </div>
    </div>
  );
}
