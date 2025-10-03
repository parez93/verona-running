import React from 'react';

const LegalReferencesFooter = () => {
    return (
        <section className="font-body text-foreground">
            {/* This section represents the final part of the definitions box */}
            <div>
                <hr className="border-border" />
                <div className="pt-6">
                    <h4 className="font-bold text-primary text-[13px] mb-3">Riferimenti legali</h4>
                    <p className="text-[13px] text-muted-foreground">
                        Ove non diversamente specificato, questa informativa privacy riguarda esclusivamente questo Sito Web.
                    </p>
                </div>
            </div>

            {/* This is the page footer */}
            <footer className="mt-8 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground mb-4">
                    Ultima modifica: 1 ottobre 2025
                </p>
            </footer>
        </section>
    );
};

export default LegalReferencesFooter;
