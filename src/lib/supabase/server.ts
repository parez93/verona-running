// src/lib/supabase/server.ts
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import {createRouteHandlerClient, createServerComponentClient} from "@supabase/auth-helpers-nextjs";

export async function createSupabaseServerClient() {
    const cookieStore = await cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        for (const { name, value, options } of cookiesToSet) {
                            cookieStore.set(name, value, options)
                        }
                    } catch {
                        // Ignora errori se i cookie non possono essere impostati
                        // (es. in route handler GET)
                    }
                },
            },
        }
    )

    return supabase
}

export async function getSupabaseUser() {
    const cookieStore = await cookies()
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    return user
}
