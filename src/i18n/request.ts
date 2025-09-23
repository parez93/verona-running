import { getRequestConfig } from 'next-intl/server';
/*import { locales } from '../messages/i18n';

export default getRequestConfig(async ({ locale }) => {
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale as any)) {
        return {
            messages: {},
            timeZone: 'Europe/Rome'
        };
    }

    return {
        messages: (await import(`../messages/${locale}.json`)).default,
        timeZone: 'Europe/Rome'
    };
});*/


export default getRequestConfig(async () => {
    // Static for now, we'll change this later
    const locale = 'it';

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
