import { getRequestConfig } from 'next-intl/server';
import { it } from '@/messages/locales/it';
import { en } from '@/messages/locales/en';

type Locale = 'it' | 'en';

const allMessages: Record<Locale, typeof it> = { it, en };

export default getRequestConfig(({ locale }) => {
    // risolvi il locale e castalo come Locale
    const resolvedLocale = (locale ?? 'it') as Locale;

    const messages = allMessages[resolvedLocale]; // ✅ TypeScript OK

    return {
        locale: resolvedLocale,
        messages,
    };
});
