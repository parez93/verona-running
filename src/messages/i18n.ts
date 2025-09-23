import {createNavigation} from 'next-intl/navigation';

export const locales = ['it', 'en'] as const;
export const defaultLocale = 'it' as const;

export const timeZone = 'Europe/Rome';

export type Locale = (typeof locales)[number];

export const {Link, redirect, usePathname, useRouter, getPathname} =
    createNavigation({locales});

export const config = {
    locales,
    defaultLocale,
    timeZone,
    localePrefix: 'always',
    localeDetection: true,
    pathnames: {
        '/': '/',
        '/login': '/login',
        '/signup': '/signup',
        '/forgot-password': '/forgot-password',
    }
} as const;
