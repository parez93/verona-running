// src/lib/supabase/auth.ts
import {redirect} from 'next/navigation'
import {createSupabaseServerClient} from './server'

export async function getUserSession() {
    const supabase = await createSupabaseServerClient()
    const {data} = await supabase.auth.getSession()
    return data.session
}

export async function requireUser() {
    const session = await getUserSession()
    if (!session?.user) redirect('/signin')
    return session.user
}
