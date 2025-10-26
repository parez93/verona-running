"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { ROUTES } from "@/lib/kRoutes";

// Action lato client per creare account (può chiamare la tua API /api/auth/signup)
async function signUpAction(email: string, password: string, surname: string, name: string) {
    try {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, name, surname }),
        });

        console.log('.....', res);
        if (!res.ok) {
            const result = await res.json();
            return { success: false, message: result?.error || "Errore imprevisto" };
        }

        return await res.json(); // { success: true, needsConfirmation: boolean }
    } catch (err: any) {
        return { success: false, message: err.message };
    }
}

export default function SignUpForm() {
    const t = useTranslations("auth.signup");
    const router = useRouter();
    const { locale } = useParams() as { locale: string };

    const [formData, setFormData] = useState({ name: "", surname: "", email: "", password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({ name: "", surname: "", email: "", password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validateField = (name: string, value: string) => {
        switch (name) {
            case "name": return value.trim() === "" ? t("validation.name_required") : "";
            case "surname": return value.trim() === "" ? t("validation.name_required") : "";
            case "email":
                if (value.trim() === "") return t("validation.email_required");
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t("validation.email_invalid");
                return "";
            case "password":
                if (value === "") return t("validation.password_required");
                if (value.length < 8) return t("validation.password_min_length");
                return "";
            case "confirmPassword":
                if (value === "") return t("validation.confirm_password_required");
                if (value !== formData.password) return t("validation.passwords_dont_match");
                return "";
            default: return "";
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name as keyof typeof errors]) setErrors(prev => ({ ...prev, [name]: "" }));
        if (name === "password" && errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: "" }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = Object.keys(formData).reduce((acc, key) => {
            acc[key as keyof typeof acc] = validateField(key, formData[key as keyof typeof formData]);
            return acc;
        }, {} as typeof errors);

        setErrors(newErrors);
        if (Object.values(newErrors).some(e => e)) return;

        try {
            setIsLoading(true);
            const result = await signUpAction(formData.email.trim(), formData.password, formData.surname, formData.name);

            //console.log(result)
            if (result?.success == false) {
                toast.error(t("errors.registration_failed"), { description: result.message });
                return;
            }

            if (result.needsConfirmation) {
                toast.success(t("success.verification_sent"), { description: t("success.account_created") });
            } else {
                toast.success(t("success.account_created"));
            }

            router.push(ROUTES.signin());
        } catch {
            toast.error(t("errors.registration_failed"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {["name","surname","email","password","confirmPassword"].map((field) => {
                const isPassword = field === "password";
                const isConfirm = field === "confirmPassword";
                const show = isPassword ? showPassword : isConfirm ? showConfirmPassword : undefined;
                return (
                    <div key={field}>
                        <label className="block text-sm font-medium mb-2">{t(`fields.${field}.label`)}</label>
                        <div className="relative">
                            <input
                                id={field}
                                name={field}
                                type={isPassword || isConfirm ? (show ? "text" : "password") : "text"}
                                value={formData[field as keyof typeof formData]}
                                onChange={handleInputChange}
                                placeholder={t(`fields.${field}.placeholder`)}
                                className={`w-full px-4 py-3 border rounded-lg ${
                                    errors[field as keyof typeof errors] ? "border-red-500 bg-red-50" : "border-gray-300"
                                }`}
                            />
                            {(isPassword || isConfirm) && (
                                <button
                                    type="button"
                                    onClick={() => isPassword ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    aria-label={show ? t(`fields.${field}.hidePassword`) : t(`fields.${field}.showPassword`)}
                                >
                                    {show ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            )}
                        </div>
                        {errors[field as keyof typeof errors] && (
                            <p className="mt-2 text-sm text-red-600">{errors[field as keyof typeof errors]}</p>
                        )}
                    </div>
                );
            })}

            <div className="text-[12px] text-[#595858] mb-4">
                <p>
                    {t("terms_agreement.part1")}
                    <Link href={ROUTES.termsconditions()}>{t("terms_agreement.terms_of_service")}</Link>
                    {t("terms_agreement.part2")}
                    <Link href={ROUTES.privacypolicy()}>{t("terms_agreement.privacy_policy")}</Link>
                    {t("terms_agreement.part3")}
                    <Link href={ROUTES.cookiepolicy()}>{t("terms_agreement.cookie_policy")}</Link>.
                </p>
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-primary text-white py-3 px-4 rounded-lg flex items-center justify-center">
                {isLoading ? <div className="animate-spin h-5 w-5 border-b-2 border-white mr-2 rounded-full"></div> : t("buttons.createAccount")}
            </button>

            <p className="text-center mt-2">
                {t("loginPrompt")} <Link href={ROUTES.signin()} className="text-blue-600 hover:underline">{t("loginLink")}</Link>
            </p>
        </form>
    );
}
