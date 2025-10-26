import {NextIntlClientProvider} from "next-intl";
import { ReactNode } from "react";
import { en } from "@/messages/locales/en";
import { it } from "@/messages/locales/it";

type Locale = 'it' | 'en';
const allMessages: Record<Locale, typeof it> = { it, en };

interface LocaleLayoutProps {
    children: ReactNode;
    params: { locale: Locale };
}

// Tip override per evitare il bug su LayoutConfig
export default async function LocaleLayout(props: any) {
    const { children, params } = props as LocaleLayoutProps;
    const { locale } = params;

    const messages = allMessages[locale];

    return (
        <html lang={locale}>
        <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
