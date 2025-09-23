import { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import SignUpForm from "@/components/signup/SignUpForm";
import AuthLayout from "@/components/authentication/AuthLayout";
import {Toaster} from "@/components/ui/sonner";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "meta.signup" });

    return {
        title: t("title"),
        description: t("description"),
        openGraph: {
            title: t("title"),
            description: t("description"),
            locale: locale,
        },
        twitter: {
            title: t("title"),
            description: t("description"),
        },
        alternates: {
            languages: {
                en: "/en/signup",
                it: "/it/signup",
            },
        },
    };
}

export default async function SignUpPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations("auth.signup");

    return (
        <AuthLayout>
            <div className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                        {t("title")}
                    </h1>
                    <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                        {t("subtitle")}
                    </p>
                </div>
                <SignUpForm />
                <Toaster />

            </div>
        </AuthLayout>
    );
}
