'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { ROUTES } from '@/lib/kRoutes';

export default function SignInForm() {
    const t = useTranslations('auth');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = (formData: FormData) => {
        const newErrors: typeof errors = {};
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!email) newErrors.email = t('validation.invalid_email');
        if (!password) newErrors.password = t('validation.required');

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        if (!validateForm(formData)) return setIsLoading(false);

        try {
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                body: JSON.stringify({
                    email: formData.get('email'),
                    password: formData.get('password'),
                    rememberMe: formData.get('rememberMe') === 'on',
                }),
                headers: { 'Content-Type': 'application/json' },
            });
            const result = await res.json();

            if (!res.ok) throw new Error(result.error || t('login_failed'));

            //toast.success(t('login_success'));
            window.location.href = ROUTES.dashboard();
        } catch (err) {
            toast.error(t('login_failed'), { description: err instanceof Error ? err.message : String(err) });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(new FormData(e.currentTarget));
            }}
            className="space-y-6"
        >
            {/* Email */}
            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold">
                    {t("login.email_label")}
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("login.email_placeholder")}
                    className={`w-full px-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-primary ${
                        errors.email ? "border-destructive bg-red-50" : "border-input"
                    }`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                    <p id="email-error" className="text-sm text-destructive" role="alert">
                        {errors.email}
                    </p>
                )}
            </div>

            {/* Password */}
            <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold">
                    {t("login.password_label")}
                </label>
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={t("login.password_placeholder")}
                        className={`w-full px-4 py-3 pr-12 border rounded-lg text-sm focus:ring-2 focus:ring-primary ${
                            errors.password ? "border-destructive bg-red-50" : "border-input"
                        }`}
                        aria-invalid={!!errors.password}
                        aria-describedby={errors.password ? "password-error" : undefined}
                        autoComplete="off"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                {errors.password && (
                    <p
                        id="password-error"
                        className="text-sm text-destructive"
                        role="alert"
                    >
                        {errors.password}
                    </p>
                )}
            </div>

            {/* Remember Me + Forgot */}
            <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        name="rememberMe"
                        className="w-4 h-4 text-primary border-input rounded"
                    />
                    <span className="text-sm font-medium">{t("login.remember_me")}</span>
                </label>
                <Link
                    href="/forgot-password"
                    className="text-sm hover:underline font-semibold"
                >
                    {t("login.forgot_password_link")}
                </Link>
            </div>
            {/* Terms agreement */}
            <div className="text-[12px] text-[#595858]">
                <p className="mb-4">
                    {t("login.terms_agreement.part1")}
                    <Link href={ROUTES.termsconditions()}>{t("login.terms_agreement.terms_of_service")}</Link>
                    {t("login.terms_agreement.part2")}
                    <Link href={ROUTES.privacypolicy()}>{t("login.terms_agreement.privacy_policy")}</Link>
                    {t("login.terms_agreement.part3")}
                    <Link href={ROUTES.cookiepolicy()}>{t("login.terms_agreement.cookie_policy")}</Link>.
                </p>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg disabled:opacity-50"
            >
                {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{t("login.signing_in")}</span>
                    </div>
                ) : (
                    t("login.sign_in_button")
                )}
            </button>

            {/* Sign Up */}
            <div className="text-center">
                <p className="text-sm">
                    {t("login.no_account")}{" "}
                    <Link href={ROUTES.signup()} className="hover:underline font-semibold">
                        {t("login.sign_up_link")}
                    </Link>
                </p>
            </div>
        </form>
    );
}
