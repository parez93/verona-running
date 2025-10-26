// src/lib/supabase/auth/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {createSupabaseServerClient} from "@/lib/supabase/server";

// Se vuoi proteggere solo alcune rotte:
const PROTECTED_ROUTES = ['/dashboard', '/profile', '/settings']

export async function middleware(req: NextRequest) {
    console.log('auth/middleware.ts called')
    const { pathname } = req.nextUrl

    // Controlla se la route è protetta
    const isProtected = PROTECTED_ROUTES.some((route) =>
        pathname.startsWith(route)
    )

    if (!isProtected) return NextResponse.next()

    // ✅ Crea client Supabase
    const supabase = await createSupabaseServerClient()

    // ✅ Recupera utente
    const {
        data: { user },
    } = await supabase.auth.getUser()

    // ❌ Nessun utente → redirect al login
    if (!user) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/signin'
        redirectUrl.searchParams.set('redirectTo', pathname)
        return NextResponse.redirect(redirectUrl)
    }

    // ✅ Utente autenticato → continua
    return NextResponse.next()
}

// Opzionale: limita il middleware solo ad alcune route
export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*'],
}
