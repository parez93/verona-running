import React from "react";
import { useTranslations } from "next-intl";

const LegalReferencesFooter = () => {
    const t = useTranslations("cookiePolicy.legalReferencesFooter");

    return (
        <section className="font-body text-foreground">
            {/* Sezione finale del box definizioni */}
            <div>
                <hr className="border-border" />
                <div className="pt-6">
                    <h4 className="font-bold text-primary text-[13px] mb-3">
                        {t("title")}
                    </h4>
                    <p className="text-[13px] text-muted-foreground">
                        {t("text")}
                    </p>
                </div>
            </div>

            {/* Footer della pagina */}
            <footer className="mt-8 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground mb-4">
                    {t("lastUpdate")}
                </p>
            </footer>
        </section>
    );
};

export default LegalReferencesFooter;
