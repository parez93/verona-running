"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import {ROUTES} from "@/constants/routes";

export const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState({ email: '' });

    const t = useTranslations('auth.forgot_password');
    const router = useRouter();
    const params = useParams();
    const locale = params.locale as string;

    const validateEmail = (email: string) => {
        if (!email.trim()) {
            return t('validation.email_required');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return t('validation.email_invalid');
        }
        return '';
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);

        // Clear error when user starts typing
        if (errors.email) {
            setErrors({ email: '' });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailError = validateEmail(email);
        if (emailError) {
            setErrors({ email: emailError });
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call - replace with actual implementation
            await new Promise(resolve => setTimeout(resolve, 2000));

            setIsSuccess(true);
            toast.success(t('messages.success'));
        } catch (error) {
            toast.error(t('messages.error'));
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="w-full max-w-md mx-auto space-y-6">
                <div className="text-center space-y-2">
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-[var(--primary-text)] font-[var(--font-heading)]">
                        {t('success.title')}
                    </h1>
                    <p className="text-[var(--secondary-text)] font-[var(--font-body)]">
                        {t('success.description')}
                    </p>
                </div>

                <Link
                    href={`/${locale}/login`}
                    className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-lg bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] hover:bg-opacity-80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                >
                    {t('actions.back_to_login')}
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="space-y-6">
{/*                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-[var(--primary-text)] font-[var(--font-heading)]">
                        {t('title')}
                    </h1>
                    <p className="text-[var(--secondary-text)] font-[var(--font-body)]">
                        {t('description')}
                    </p>
                </div>*/}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-[var(--primary-text)] font-[var(--font-body)]"
                        >
                            {t('fields.email.label')}
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder={t('fields.email.placeholder')}
                            className={`w-full px-4 py-3 border rounded-lg bg-white text-[var(--primary-text)] placeholder-[var(--color-muted-foreground)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                                errors.email ? 'border-red-500' : 'border-[var(--color-input)]'
                            }`}
                            disabled={isLoading}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && (
                            <p
                                id="email-error"
                                role="alert"
                                className="text-sm text-red-500 font-[var(--font-body)]"
                            >
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-dark-accent-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label={isLoading ? t('actions.sending') : t('actions.send_reset_email')}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                {t('actions.sending')}
                            </>
                        ) : (
                            t('actions.send_reset_link')
                        )}
                    </button>

                    <div className="text-center">
                        <Link
                            href={ROUTES.signin()}
                            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-lg bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] hover:bg-opacity-80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                        >
                            {t('actions.back_to_login')}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
