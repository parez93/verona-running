"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { login } from "@/app/(public)/signin/actions";
import {ROUTES} from "@/constants/routes";

export default function SignInForm() {
    const t = useTranslations("auth.login");

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>(
        {}
    );
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = (formData: FormData) => {
        const newErrors: typeof errors = {};
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function handleAction(formData: FormData) {
        setIsLoading(true);

        if (!validateForm(formData)) {
            setIsLoading(false);
            return;
        }

        try {
            await login(formData); // delega alla Server Action
        } catch (err) {
            const msg =
                err instanceof Error
                    ? err.message
                    : "Impossibile effettuare il login. Riprova.";
            toast.error("Accesso non riuscito", { description: msg });
            setIsLoading(false); // se errore, stop caricamento
        }
    }

    return (
        <form action={handleAction} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold">
                    {t("email_label")}
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("email_placeholder")}
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
                    {t("password_label")}
                </label>
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={t("password_placeholder")}
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
                    <span className="text-sm font-medium">{t("remember_me")}</span>
                </label>
                <Link
                    href="/forgot-password"
                    className="text-sm hover:underline font-semibold"
                >
                    {t("forgot_password_link")}
                </Link>
            </div>

            <div className=" text-[12px] text-[#595858]">
                <p className="mb-4">
                    Facendo clic su Continua accetti i Termini di servizio e l&#39;<Link href={ROUTES.privacypolicy()}>Informativa sulla privacy</Link> di Verona Running.
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
                        <span>Signing in...</span>
                    </div>
                ) : (
                    t("sign_in_button")
                )}
            </button>

            {/* Sign Up */}
            <div className="text-center">
                <p className="text-sm">
                    {t("no_account")}{" "}
                    <Link href={ROUTES.signup()} className="hover:underline font-semibold">
                        {t("sign_up_link")}
                    </Link>
                </p>
            </div>
        </form>
    );
}
