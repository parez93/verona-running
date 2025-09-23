import { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import AuthLayout from '@/components/authentication/AuthLayout'
import {ForgotPasswordForm} from '@/components/authentication/ForgotPasswordForm'

interface PageProps {
    params: Promise<{
        locale: string
    }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'meta.forgot_password' })

    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            type: 'website',
            locale: locale,
        },
        twitter: {
            card: 'summary',
            title: t('title'),
            description: t('description'),
        },
        alternates: {
            languages: {
                en: "/en/forgot-password",
                it: "/it/forgot-password",
            },
        },
    }
}

export default async function ForgotPasswordPage({ params }: PageProps) {
    const { locale } = await params
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'auth.forgot_password' })

    return (
        <AuthLayout>
            <div className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                        {t('title')}
                    </h1>
                    <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                        {t('subtitle')}
                    </p>
                </div>
                <ForgotPasswordForm />
            </div>
        </AuthLayout>
    )
}
