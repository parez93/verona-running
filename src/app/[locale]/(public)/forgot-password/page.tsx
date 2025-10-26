import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import AuthLayout from '@/components/layout/AuthLayout';
import { ForgotPasswordForm } from '@/components/forgot-password/ForgotPasswordForm';
import { getTranslations } from 'next-intl/server';

interface PageProps {
    params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'meta.forgot_password' });

    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            type: 'website',
            locale,
        },
        twitter: {
            card: 'summary',
            title: t('title'),
            description: t('description'),
        },
        alternates: {
            languages: {
                en: '/en/forgot-password',
                it: '/it/forgot-password',
            },
        },
    };
}

export default async function ForgotPasswordPage({ params }: PageProps) {
    const { locale } = await params;

    // Suspense-ready: carichiamo solo le traduzioni necessarie per il form
    const t = await getTranslations('auth.forgot_password' );

    return (
        <AuthLayout>
            <div className="space-y-6">
                <header className="space-y-2">
                    <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                        {t('title')}
                    </h1>
                    <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                        {t('subtitle')}
                    </p>
                </header>

                {/* Suspense wrapper per il form lato client */}
                <ForgotPasswordForm locale={locale} />
            </div>
        </AuthLayout>
    );
}
