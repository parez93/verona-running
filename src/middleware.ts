/*
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname

    // Ignora api, _next, assets
    if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) {
        return
    }

    const defaultLocale = 'it'
    const locales = ['it', 'en']

    const pathnameLocale = pathname.split('/')[1]
    console.log('pathnameLocale', pathnameLocale)
    if (!locales.includes(pathnameLocale)) {
        const url = req.nextUrl.clone()
        url.pathname = `/${defaultLocale}${pathname}`
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next|favicon.ico).*)']
}
*/

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {DEFAULT_LOCALE, SUPPORTED_LOCALES} from "@/lib/kLocale";

const PUBLIC_FILE = /\.(.*)$/;


export function middleware(req: NextRequest) {
    console.log('src/middleware.ts called');
    const { pathname } = req.nextUrl;

    // Ignora file statici, API e immagini
    if (
        PUBLIC_FILE.test(pathname) ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next')
    ) {
        return NextResponse.next();
    }

    // Se il path include già una lingua (/it/... o /en/...), passa oltre
    const isLocalePath = SUPPORTED_LOCALES.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
    if (isLocalePath) {
        return NextResponse.next();
    }

    // Controlla cookie "lang" o header di preferenza linguistica
    const cookieLocale = req.cookies.get('lang')?.value;
    const browserLocale = req.headers
        .get('accept-language')
        ?.split(',')[0]
        .split('-')[0];

    const locale =
        SUPPORTED_LOCALES.includes(cookieLocale || '')
            ? cookieLocale
            : SUPPORTED_LOCALES.includes(browserLocale || '')
                ? browserLocale
                : DEFAULT_LOCALE;

    // Costruisci nuova URL con locale
    const newUrl = new URL(`/${locale}${pathname}`, req.url);
    return NextResponse.redirect(newUrl);
}

export const config = {
    matcher: [
        // Applica a tutte le pagine, escluso /api e file statici
        '/((?!api|_next|.*\\..*).*)',
    ],
};
