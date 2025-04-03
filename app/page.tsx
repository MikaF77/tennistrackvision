import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main>
      {user ? <p>Bienvenue {user.email}</p> : <p>Non connecté</p>}
    </main>
  )
}