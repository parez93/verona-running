import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SignInForm from "@/components/signin/SignInForm";
import AuthLayout from "@/components/authentication/AuthLayout";
import { Toaster } from "@/components/ui/sonner";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "meta.login" });

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
                en: "/en",
                it: "/it",
            },
        },
    };
}

export default async function LoginPage({ params }: Props) {
    const { locale } = await params;

    const t = await getTranslations("auth.login");

    return (
        <AuthLayout>
            <div className="w-full max-w-sm mx-auto space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                        {t("title")}
                    </h1>
                    <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                        {t("subtitle")}
                    </p>
                </div>
                <SignInForm />
                <Toaster />
            </div>
        </AuthLayout>
    );
}
