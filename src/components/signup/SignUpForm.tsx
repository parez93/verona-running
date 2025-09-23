"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { signUpAction } from "@/app/(public)/signup/actions";
import {ROUTES} from "@/constants/routes";

export default function SignUpForm() {
    const t = useTranslations("auth.signup");
    const router = useRouter();
    const params = useParams();
    const locale = params.locale as string;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validateField = (name: string, value: string) => {
        switch (name) {
            case "name":
                return value.trim() === "" ? t("validation.nameRequired") : "";
            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value.trim() === "") return t("validation.emailRequired");
                if (!emailRegex.test(value)) return t("validation.emailInvalid");
                return "";
            case "password":
                if (value === "") return t("validation.passwordRequired");
                if (value.length < 8) return t("validation.passwordMinLength");
                return "";
            case "confirmPassword":
                if (value === "") return t("validation.confirmPasswordRequired");
                if (value !== formData.password)
                    return t("validation.passwordsDoNotMatch");
                return "";
            default:
                return "";
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }

        if (name === "password" && errors.confirmPassword) {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: "",
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            name: validateField("name", formData.name),
            email: validateField("email", formData.email),
            password: validateField("password", formData.password),
            confirmPassword: validateField(
                "confirmPassword",
                formData.confirmPassword
            ),
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((error) => error !== "");
        if (hasErrors) return;

        try {
            setIsLoading(true);

            const result = await signUpAction(
                formData.email.trim(),
                formData.password
            );

            if (!result.success) {
                toast.error(t("errors.registrationFailed"), {
                    description: result.message,
                });
                return;
            }

            if (result.needsConfirmation) {
                toast.success(t("success.confirmationNeeded"), {
                    description: t("success.checkEmail"),
                });
                router.push(ROUTES.signin());
                return;
            }

            toast.success(t("success.accountCreated"));
            router.push(ROUTES.events());
        } catch (err) {
            toast.error(t("errors.unexpectedError"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-[var(--primary-text)] mb-2"
                    >
                        {t("fields.name.label")}
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t("fields.name.placeholder")}
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                            errors.name
                                ? "border-red-500 bg-red-50"
                                : "border-[var(--input)] bg-white hover:border-gray-300"
                        }`}
                    />
                    {errors.name && (
                        <p
                            id="name-error"
                            role="alert"
                            className="mt-2 text-sm text-red-600"
                        >
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[var(--primary-text)] mb-2"
                    >
                        {t("fields.email.label")}
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t("fields.email.placeholder")}
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                            errors.email
                                ? "border-red-500 bg-red-50"
                                : "border-[var(--input)] bg-white hover:border-gray-300"
                        }`}
                    />
                    {errors.email && (
                        <p
                            id="email-error"
                            role="alert"
                            className="mt-2 text-sm text-red-600"
                        >
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-[var(--primary-text)] mb-2"
                    >
                        {t("fields.password.label")}
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder={t("fields.password.placeholder")}
                            autoComplete="off"
                            aria-invalid={errors.password ? "true" : "false"}
                            aria-describedby={errors.password ? "password-error" : undefined}
                            className={`w-full px-4 py-3 pr-12 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                                errors.password
                                    ? "border-red-500 bg-red-50"
                                    : "border-[var(--input)] bg-white hover:border-gray-300"
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={
                                showPassword
                                    ? t("fields.password.hidePassword")
                                    : t("fields.password.showPassword")
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.password && (
                        <p
                            id="password-error"
                            role="alert"
                            className="mt-2 text-sm text-red-600"
                        >
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-[var(--primary-text)] mb-2"
                    >
                        {t("fields.confirmPassword.label")}
                    </label>
                    <div className="relative">
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder={t("fields.confirmPassword.placeholder")}
                            autoComplete="off"
                            aria-invalid={errors.confirmPassword ? "true" : "false"}
                            aria-describedby={
                                errors.confirmPassword ? "confirm-password-error" : undefined
                            }
                            className={`w-full px-4 py-3 pr-12 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${
                                errors.confirmPassword
                                    ? "border-red-500 bg-red-50"
                                    : "border-[var(--input)] bg-white hover:border-gray-300"
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label={
                                showConfirmPassword
                                    ? t("fields.confirmPassword.hidePassword")
                                    : t("fields.confirmPassword.showPassword")
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                        >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p
                            id="confirm-password-error"
                            role="alert"
                            className="mt-2 text-sm text-red-600"
                        >
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[var(--primary)] text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            {t("buttons.creating")}
                        </>
                    ) : (
                        t("buttons.createAccount")
                    )}
                </button>

                {/* Link al login */}
                <div className="text-center">
                    <p className="text-[var(--secondary-text)]">
                        {t("loginPrompt")}{" "}
                        <Link
                            href={ROUTES.signin()}
                            className="text-[var(--link-text)] hover:underline font-medium transition-colors duration-200"
                        >
                            {t("loginLink")}
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
