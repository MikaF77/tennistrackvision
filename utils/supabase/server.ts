import { createServerClient } from '@supabase/ssr'
import { cookies, headers } from 'next/headers'

export const createClient = () => {
  const cookieStore = cookies()
  const headerStore = headers()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
      },
      headers: () => headerStore,
    }
  )
}
