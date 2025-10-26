"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import {getTranslations} from "next-intl/server";
import {useTranslations} from "next-intl";

/**
 * CookieBanner Component
 *
 * Banner informativo GDPR "light" per cookie tecnici.
 * Mostra l'informativa solo al primo accesso e permette di chiuderla.
 * Lo stato viene salvato in localStorage senza utilizzare cookie.
 */
export default function CookieBanner() {
    const t = useTranslations("cookiePolicy.banner");
    const tCommon = useTranslations("common");

    // Stato per controllare la visibilità del banner
    const [isVisible, setIsVisible] = useState<boolean>(false)

    // Effetto per verificare se il banner è già stato chiuso in precedenza
    useEffect(() => {
        const bannerClosed = localStorage.getItem("cookieBannerClosed")

        // Mostra il banner solo se non è stato chiuso in precedenza
        if (!bannerClosed) {
            setIsVisible(true)
        }
    }, [])

    // Handler per chiudere il banner e salvare lo stato
    const handleClose = (): void => {
        setIsVisible(false)
        localStorage.setItem("cookieBannerClosed", "true")
    }

    // Non renderizzare nulla se il banner non deve essere visibile
    if (!isVisible) {
        return null
    }

    // Rendering del banner
    return (
        <div className="fixed bottom-4 inset-x-4 z-50 animate-in slide-in-from-bottom-5 duration-500">
            <div className="max-w-lg mx-auto bg-card shadow-lg rounded-xl p-4 border border-border">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Testo informativo */}
                    <p className="text-sm text-card-foreground leading-relaxed">
                        {t("p1")}
                        <Link
                            href="/cookie-policy"
                            className="underline hover:no-underline font-medium text-card-foreground hover:text-primary transition-colors"
                        >
                            {t("title")}
                        </Link>
                        .
                    </p>

                    {/* Pulsante Chiudi */}
                    <button
                        onClick={handleClose}
                        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors duration-200 whitespace-nowrap shadow-sm hover:shadow-md flex-shrink-0"
                        aria-label="Chiudi banner cookie"
                    >
                        <X className="h-4 w-4" />
                        <span>{tCommon("close")}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
